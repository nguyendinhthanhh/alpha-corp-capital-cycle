const API_ENDPOINT = '/api/ai/chat';
const MAX_API_MESSAGES = 6;

export async function sendTutorRequest({ messages = [], pageContext = {}, action = null, signal } = {}) {
  const trimmedMessages = messages.slice(-MAX_API_MESSAGES);

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: trimmedMessages, pageContext, action }),
    signal,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload?.error || `AI endpoint returned ${response.status}`);
    error.statusCode = response.status;
    throw error;
  }

  if (!payload?.answer) {
    throw new Error('AI response khong hop le.');
  }

  return payload;
}
