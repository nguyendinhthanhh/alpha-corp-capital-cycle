import { env } from '../config/env.js';

const responseSchema = {
  type: 'object',
  properties: {
    answer: { type: 'string' },
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
  },
  required: ['answer'],
};

const MAX_RETRIES = 2;
const RETRY_DELAYS = [1000, 3000];

function isRetryable(status) {
  return status === 429 || status === 503;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createGeminiNativeProvider() {
  return {
    async generate(input) {
      const startedAt = Date.now();
      const requestBody = JSON.stringify({
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
      });

      let lastError = null;

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        if (attempt > 0) {
          const waitMs = RETRY_DELAYS[attempt - 1] || 3000;
          console.log(`[gemini] Retry ${attempt}/${MAX_RETRIES} after ${waitMs}ms...`);
          await delay(waitMs);
        }

        let response;
        try {
          response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.model)}:generateContent?key=${encodeURIComponent(env.apiKey)}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: requestBody,
              signal: input.signal,
            },
          );
        } catch (fetchError) {
          if (fetchError?.name === 'AbortError') {
            throw fetchError;
          }
          lastError = fetchError;
          console.error(`[gemini] Fetch failed (attempt ${attempt + 1}):`, fetchError?.message);
          continue;
        }

        if (response.status === 401) {
          const bodyText = await response.text().catch(() => '');
          console.error('[gemini] Auth failed 401:', bodyText.slice(0, 300));
          const error = new Error('Gemini tra ve 401. Kiem tra GEMINI_API_KEY o backend.');
          error.statusCode = 502;
          error.code = 'provider_auth_failed';
          throw error;
        }

        if (isRetryable(response.status) && attempt < MAX_RETRIES) {
          const bodyText = await response.text().catch(() => '');
          console.warn(`[gemini] Got ${response.status} (attempt ${attempt + 1}):`, bodyText.slice(0, 200));
          lastError = new Error(`Gemini ${response.status}`);
          lastError.code = response.status === 429 ? 'provider_rate_limited' : 'provider_request_failed';
          continue;
        }

        if (response.status === 429) {
          const error = new Error('Gemini dang gioi han toc do. Hay thu lai sau.');
          error.statusCode = 502;
          error.code = 'provider_rate_limited';
          throw error;
        }

        if (!response.ok) {
          const bodyText = await response.text().catch(() => '');
          console.error(`[gemini] Error ${response.status}:`, bodyText.slice(0, 300));
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
      }

      // All retries exhausted
      const error = new Error(lastError?.message || 'Gemini request that bai sau nhieu lan thu.');
      error.statusCode = 502;
      error.code = lastError?.code || 'provider_request_failed';
      throw error;
    },
  };
}

