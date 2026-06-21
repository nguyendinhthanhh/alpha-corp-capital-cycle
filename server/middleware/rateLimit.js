import { env } from '../config/env.js';

const buckets = new Map();

export function assertRateLimit(request) {
  const now = Date.now();
  const forwardedFor = request.headers['x-forwarded-for'];
  const ip = String(Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor || request.socket.remoteAddress || 'local')
    .split(',')[0]
    .trim();

  const bucket = buckets.get(ip);
  if (!bucket || now - bucket.windowStart >= env.rateLimitWindowMs) {
    buckets.set(ip, {
      windowStart: now,
      count: 1,
    });
    return;
  }

  if (bucket.count >= env.rateLimitMaxRequests) {
    const error = new Error('Ban gui qua nhieu request. Hay thu lai sau.');
    error.statusCode = 429;
    throw error;
  }

  bucket.count += 1;
}
