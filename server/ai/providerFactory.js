import { env } from '../config/env.js';
import { createGeminiNativeProvider } from './geminiNativeProvider.js';
import { createOpenAICompatibleProvider } from './openAICompatibleProvider.js';

export function createAIProvider() {
  if (env.provider === 'gemini-native') {
    return createGeminiNativeProvider();
  }

  return createOpenAICompatibleProvider();
}
