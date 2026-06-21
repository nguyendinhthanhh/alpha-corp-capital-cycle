const API_ENDPOINT = '/api/ai/chat';

export async function sendTutorRequest({ messages = [], pageContext = {}, action = null, signal } = {}) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, pageContext, action }),
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
