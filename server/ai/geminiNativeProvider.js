import { env } from '../config/env.js';

const responseSchema = {
  type: 'object',
  properties: {
    answer: { type: 'string' },
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
        },
        required: ['id', 'label'],
      },
    },
    fallbackUsed: { type: 'boolean' },
  },
  required: ['answer', 'relatedConcepts', 'sourceLabels', 'suggestedActions', 'fallbackUsed'],
};

export function createGeminiNativeProvider() {
  return {
    async generate(input) {
      const startedAt = Date.now();
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.model)}:generateContent?key=${encodeURIComponent(env.apiKey)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: input.systemPrompt }],
            },
            contents: [
              ...input.messages.map((message) => ({
                role: message.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: message.content }],
              })),
              { role: 'user', parts: [{ text: input.userPrompt }] },
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: env.maxOutputTokens,
              responseMimeType: 'application/json',
              responseSchema,
            },
          }),
          signal: input.signal,
        },
      );

      if (response.status === 401) {
        const error = new Error('Gemini tra ve 401. Kiem tra GEMINI_API_KEY o backend.');
        error.statusCode = 502;
        error.code = 'provider_auth_failed';
        throw error;
      }

      if (response.status === 429) {
        const error = new Error('Gemini dang gioi han toc do. Hay thu lai sau.');
        error.statusCode = 502;
        error.code = 'provider_rate_limited';
        throw error;
      }

      if (!response.ok) {
        const bodyText = await response.text();
        const error = new Error(`Gemini error ${response.status}: ${bodyText.slice(0, 240)}`);
        error.statusCode = 502;
        error.code = 'provider_request_failed';
        throw error;
      }

      const payload = await response.json();
      const text = payload?.candidates?.[0]?.content?.parts?.map((part) => part?.text || '').join('').trim();
      if (!text) {
        const error = new Error('Gemini tra ve response rong.');
        error.statusCode = 502;
        error.code = 'provider_empty_response';
        throw error;
      }

      return {
        text,
        providerMeta: {
          requestId: response.headers.get('x-request-id') || undefined,
          model: env.model,
          latencyMs: Date.now() - startedAt,
        },
      };
    },
  };
}
