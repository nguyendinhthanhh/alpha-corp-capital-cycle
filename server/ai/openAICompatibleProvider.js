import { env } from '../config/env.js';

export function createOpenAICompatibleProvider() {
  return {
    async generate(input) {
      const startedAt = Date.now();
      const response = await fetch(`${env.baseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.apiKey}`,
        },
        body: JSON.stringify({
          model: env.model,
          temperature: 0.3,
          max_tokens: env.maxOutputTokens,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: input.systemPrompt },
            ...input.messages,
            { role: 'user', content: input.userPrompt },
          ],
        }),
        signal: input.signal,
      });

      if (response.status === 401) {
        const error = new Error('Provider tra ve 401. Kiem tra AI_API_KEY o backend.');
        error.statusCode = 502;
        error.code = 'provider_auth_failed';
        throw error;
      }

      if (response.status === 429) {
        const error = new Error('Provider dang gioi han toc do. Hay thu lai sau.');
        error.statusCode = 502;
        error.code = 'provider_rate_limited';
        throw error;
      }

      if (!response.ok) {
        const bodyText = await response.text();
        const error = new Error(`Provider error ${response.status}: ${bodyText.slice(0, 240)}`);
        error.statusCode = 502;
        error.code = 'provider_request_failed';
        throw error;
      }

      const payload = await response.json();
      const content = payload?.choices?.[0]?.message?.content;
      return {
        text: typeof content === 'string' ? content : JSON.stringify(content),
        providerMeta: {
          requestId: response.headers.get('x-request-id') || undefined,
          model: payload?.model || env.model,
          latencyMs: Date.now() - startedAt,
        },
      };
    },
  };
}
