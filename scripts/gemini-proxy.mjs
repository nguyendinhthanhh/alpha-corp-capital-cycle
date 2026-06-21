import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.AI_PROXY_PORT || 8787);
const model = (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim();

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  return readFile(filePath, 'utf8').then((raw) => {
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const cleaned = trimmed.startsWith('export ') ? trimmed.slice(7).trim() : trimmed;
      const equalsIndex = cleaned.indexOf('=');
      if (equalsIndex <= 0) continue;

      const key = cleaned.slice(0, equalsIndex).trim();
      if (!key || process.env[key] !== undefined) continue;

      let value = cleaned.slice(equalsIndex + 1).trim();
      const isQuoted =
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"));

      if (isQuoted) {
        value = value.slice(1, -1);
        value = value
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t')
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'")
          .replace(/\\\\/g, '\\');
      }

      process.env[key] = value;
    }
  });
}

await Promise.all([loadEnvFile(path.join(rootDir, '.env.local')), loadEnvFile(path.join(rootDir, '.env'))]);

const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').trim();

const responseSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string',
      description: 'Concise Vietnamese answer tailored to the current page context.',
    },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
        },
        required: ['title', 'content'],
      },
    },
    relatedConcepts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
        },
        required: ['id', 'label'],
      },
    },
    sourceLabels: {
      type: 'array',
      items: { type: 'string' },
    },
    suggestedActions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          prompt: { type: 'string' },
        },
        required: ['id', 'label', 'prompt'],
      },
    },
    fallbackUsed: {
      type: 'boolean',
    },
  },
  required: ['answer', 'sections', 'relatedConcepts', 'sourceLabels', 'suggestedActions', 'fallbackUsed'],
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...corsHeaders,
  });
  response.end(JSON.stringify(payload));
};

const readJsonBody = async (request, maxBytes = 256_000) => {
  let received = 0;
  const chunks = [];

  for await (const chunk of request) {
    received += chunk.length;
    if (received > maxBytes) {
      const error = new Error('Request body too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error('Invalid JSON payload.');
    error.statusCode = 400;
    throw error;
  }
};

const stripCodeFences = (value) =>
  String(value || '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

const safeJsonParse = (value) => {
  const cleaned = stripCodeFences(value);
  return JSON.parse(cleaned);
};

const toGeminiRole = (role) => {
  if (role === 'assistant') return 'model';
  return 'user';
};

const summarizeContext = (pageContext = {}, action = null) => {
  const compact = {
    route: pageContext.route || '/',
    pageName: pageContext.pageName || 'Unknown',
    sectionTitle: pageContext.sectionTitle || null,
    chapterTitle: pageContext.chapterTitle || null,
    activeMission: pageContext.activeMission || null,
    selectedStakeholder: pageContext.selectedStakeholder?.name || null,
    quizQuestion: pageContext.quiz?.question || pageContext.currentQuestion?.question || null,
    simulationScenario: pageContext.simulation?.scenario || null,
    capitalLabChapter: pageContext.capitalLab?.chapterTitle || null,
    relevantConceptIds: pageContext.relevantConceptIds || [],
    sourceLabels: pageContext.sourceLabels || [],
    action,
  };

  return JSON.stringify(compact, null, 2);
};

const buildSystemInstruction = (pageContext, action) => `
You are AI Capital Tutor for an educational web app about capital circulation and Alpha Corp.
Use only the provided project context plus verified academic knowledge. Do not invent facts.
Do not give financial advice, investment recommendations, or unsupported claims.

Reply in Vietnamese and keep the answer concise, practical, and context-aware.
When the user asks for advice or buying/selling guidance, refuse briefly and redirect to explanation or analysis.

Return a single JSON object with this exact shape:
{
  "answer": string,
  "sections": [{"title": string, "content": string}],
  "relatedConcepts": [{"id": string, "label": string}],
  "sourceLabels": [string],
  "suggestedActions": [{"id": string, "label": string, "prompt": string}],
  "fallbackUsed": boolean
}

Current action: ${action || 'none'}
Current page context:
${summarizeContext(pageContext, action)}
`.trim();

const normalizeResponse = (payload, pageContext) => {
  const ensureArray = (value) => (Array.isArray(value) ? value : []);
  const safeText = (value) => (typeof value === 'string' ? value.trim() : '');
  const fallbackSourceLabels = ensureArray(pageContext.sourceLabels).filter(Boolean);

  const answer = safeText(payload?.answer);
  const sections = ensureArray(payload?.sections)
    .map((section) => ({
      title: safeText(section?.title),
      content: safeText(section?.content),
    }))
    .filter((section) => section.title && section.content);
  const relatedConcepts = ensureArray(payload?.relatedConcepts)
    .map((concept) => ({
      id: safeText(concept?.id),
      label: safeText(concept?.label),
    }))
    .filter((concept) => concept.id && concept.label);
  const sourceLabels = [...new Set([...ensureArray(payload?.sourceLabels).filter(Boolean), ...fallbackSourceLabels])];
  const suggestedActions = ensureArray(payload?.suggestedActions)
    .map((action) => ({
      id: safeText(action?.id),
      label: safeText(action?.label),
      prompt: safeText(action?.prompt),
    }))
    .filter((action) => action.id && action.label && action.prompt);

  if (!answer) {
    throw new Error('Gemini response did not contain answer text.');
  }

  return {
    answer,
    sections,
    relatedConcepts,
    sourceLabels,
    suggestedActions,
    fallbackUsed: Boolean(payload?.fallbackUsed),
  };
};

const requestBodyForGemini = ({ messages, pageContext, action }) => ({
  systemInstruction: {
    parts: [{ text: buildSystemInstruction(pageContext, action) }],
  },
  contents: (Array.isArray(messages) ? messages : [])
    .filter((message) => message && typeof message.content === 'string' && message.content.trim())
    .map((message) => ({
      role: toGeminiRole(message.role),
      parts: [{ text: message.content }],
    })),
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema,
    temperature: 0.35,
    maxOutputTokens: 900,
  },
});

const server = createServer(async (request, response) => {
  const requestPath = new URL(request.url || '/', 'http://localhost').pathname;

  if (request.method === 'OPTIONS') {
    response.writeHead(204, corsHeaders);
    response.end();
    return;
  }

  if (request.method !== 'POST' || requestPath !== '/api/ai-chat') {
    sendJson(response, 404, { error: 'Not found.' });
    return;
  }

  if (!apiKey) {
    sendJson(response, 500, {
      error: 'GEMINI_API_KEY is not configured.',
    });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const pageContext = body.pageContext && typeof body.pageContext === 'object' ? body.pageContext : {};
    const action = typeof body.action === 'string' ? body.action : null;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBodyForGemini({ messages, pageContext, action })),
      },
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Gemini request failed with ${geminiResponse.status}: ${errorText.slice(0, 300)}`);
    }

    const geminiPayload = await geminiResponse.json();
    const rawText = geminiPayload?.candidates?.[0]?.content?.parts?.map((part) => part?.text || '').join('').trim();
    if (!rawText) {
      throw new Error('Gemini returned an empty response.');
    }

    const parsed = normalizeResponse(safeJsonParse(rawText), pageContext);
    sendJson(response, 200, parsed);
  } catch (error) {
    console.error('[ai-proxy]', error);
    sendJson(response, error?.statusCode || 502, {
      error: error?.message || 'Gemini proxy failed.',
    });
  }
});

server.listen(port, () => {
  console.log(`[ai-proxy] listening on http://localhost:${port} using ${model}`);
});
