import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFile } from './loadEnv.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

await Promise.all([
  loadEnvFile(path.join(rootDir, '.env.local')),
  loadEnvFile(path.join(rootDir, '.env')),
]);

const toBoolean = (value, fallback = false) => {
  if (value == null || value === '') {
    return fallback;
  }

  return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase());
};

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const trim = (value, fallback = '') => {
  const normalized = String(value ?? '').trim();
  return normalized || fallback;
};

const providerFromLegacyGemini = () => {
  if (trim(process.env.GEMINI_API_KEY) || trim(process.env.GOOGLE_API_KEY)) {
    return 'gemini-native';
  }

  return 'openai-compatible';
};

export const env = {
  rootDir,
  port: toNumber(process.env.AI_SERVER_PORT || process.env.AI_PROXY_PORT, 8787),
  provider: trim(process.env.AI_PROVIDER, providerFromLegacyGemini()),
  baseUrl: trim(process.env.AI_BASE_URL),
  apiKey: trim(process.env.AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
  model: trim(
    process.env.AI_MODEL || process.env.GEMINI_MODEL,
    process.env.AI_PROVIDER === 'openai-compatible' ? '' : 'gemini-2.5-flash',
  ),
  demoMode: toBoolean(process.env.AI_DEMO_MODE, false),
  requestTimeoutMs: toNumber(process.env.AI_REQUEST_TIMEOUT_MS, 30000),
  maxOutputTokens: toNumber(process.env.AI_MAX_OUTPUT_TOKENS, 800),
  maxInputChars: toNumber(process.env.AI_MAX_INPUT_CHARS, 4000),
  maxMessages: toNumber(process.env.AI_MAX_MESSAGES, 12),
  rateLimitWindowMs: toNumber(process.env.AI_RATE_LIMIT_WINDOW_MS, 60000),
  rateLimitMaxRequests: toNumber(process.env.AI_RATE_LIMIT_MAX_REQUESTS, 24),
};

export function assertProviderConfig() {
  if (env.demoMode) {
    return;
  }

  if (!env.apiKey) {
    const error = new Error('Chưa cấu hình AI provider. Hãy kiểm tra AI_API_KEY và AI_MODEL ở backend.');
    error.statusCode = 503;
    error.code = 'provider_not_configured';
    throw error;
  }

  if (!env.model) {
    const error = new Error('Chưa cấu hình AI model ở backend.');
    error.statusCode = 503;
    error.code = 'model_not_configured';
    throw error;
  }

  if (env.provider === 'openai-compatible' && !env.baseUrl) {
    const error = new Error('Chưa cấu hình AI_BASE_URL cho provider OpenAI-compatible.');
    error.statusCode = 503;
    error.code = 'base_url_not_configured';
    throw error;
  }
}
