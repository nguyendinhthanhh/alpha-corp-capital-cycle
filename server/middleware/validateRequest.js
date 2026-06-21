import { env } from '../config/env.js';

const allowedRoles = new Set(['user', 'assistant']);
const allowedActions = new Set([
  'explain',
  'simplify',
  'it-analogy',
  'analyze-stage',
  'analyze-simulation',
  'quiz-hint',
  'quiz-explanation',
  'evaluate-answer',
  'debate-prep',
  'summarize',
]);

export function validateChatRequest(body) {
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  if (messages.length === 0) {
    const error = new Error('Request chat phai co it nhat 1 message.');
    error.statusCode = 400;
    throw error;
  }

  if (messages.length > env.maxMessages) {
    const error = new Error(`Conversation vuot qua gioi han ${env.maxMessages} messages.`);
    error.statusCode = 400;
    throw error;
  }

  for (const message of messages) {
    if (!message || typeof message !== 'object') {
      const error = new Error('Message khong hop le.');
      error.statusCode = 400;
      throw error;
    }

    if (!allowedRoles.has(message.role)) {
      const error = new Error('Frontend khong duoc gui system role.');
      error.statusCode = 400;
      throw error;
    }

    if (typeof message.content !== 'string' || !message.content.trim()) {
      const error = new Error('Message content khong hop le.');
      error.statusCode = 400;
      throw error;
    }

    if (message.content.length > env.maxInputChars) {
      const error = new Error(`Message vuot qua gioi han ${env.maxInputChars} ky tu.`);
      error.statusCode = 400;
      throw error;
    }
  }

  if (body?.action != null && (!allowedActions.has(body.action) || typeof body.action !== 'string')) {
    const error = new Error('Action khong hop le.');
    error.statusCode = 400;
    throw error;
  }

  if (!body?.pageContext || typeof body.pageContext !== 'object' || Array.isArray(body.pageContext)) {
    const error = new Error('pageContext khong hop le.');
    error.statusCode = 400;
    throw error;
  }
}
