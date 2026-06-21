import { analyzeWithRules } from './fallbackAnalyzer';

const cleanUrl = (value) => (value ? value.trim().replace(/\/$/, '') : '');

export async function sendTutorRequest({ messages = [], pageContext = {}, action = null } = {}) {
  const endpoint = cleanUrl(import.meta.env.VITE_AI_CHAT_URL || import.meta.env.VITE_AI_ENDPOINT || '/api/ai-chat');

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, pageContext, action }),
      });

      if (!response.ok) {
        throw new Error(`AI endpoint returned ${response.status}`);
      }

      const payload = await response.json();
      if (payload?.answer) {
        return {
          ...payload,
          fallbackUsed: false,
        };
      }
    } catch (error) {
      console.warn('AI Capital Tutor endpoint unavailable, falling back to rules.', error);
    }
  }

  return analyzeWithRules({ messages, pageContext, action });
}
