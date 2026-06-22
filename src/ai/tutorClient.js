const API_ENDPOINT = '/api/ai/chat';
const MAX_API_MESSAGES = 6;
const CLIENT_TIMEOUT_MS = 6000;

export async function sendTutorRequest({ messages = [], pageContext = {}, action = null, signal } = {}) {
  const trimmedMessages = messages.slice(-MAX_API_MESSAGES);
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), CLIENT_TIMEOUT_MS);
  const requestSignal = signal ? AbortSignal.any([signal, timeoutController.signal]) : timeoutController.signal;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: trimmedMessages, pageContext, action }),
      signal: requestSignal,
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
  } catch (error) {
    if (timeoutController.signal.aborted && !signal?.aborted) {
      throw new Error(`AI request timeout sau ${CLIENT_TIMEOUT_MS / 1000}s.`, { cause: error });
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
