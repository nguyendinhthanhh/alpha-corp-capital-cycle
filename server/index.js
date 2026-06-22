import { createServer } from 'node:http';
import { env } from './config/env.js';
import { toPublicError } from './middleware/errorHandler.js';
import { assertRateLimit } from './middleware/rateLimit.js';
import { handleAIChat } from './routes/aiChat.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...corsHeaders,
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request, maxBytes = 256_000) {
  let received = 0;
  const chunks = [];

  for await (const chunk of request) {
    received += chunk.length;
    if (received > maxBytes) {
      const error = new Error('Request body qua lon.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error('JSON payload khong hop le.');
    error.statusCode = 400;
    throw error;
  }
}

const server = createServer(async (request, response) => {
  const requestPath = new URL(request.url || '/', 'http://localhost').pathname;

  if (request.method === 'OPTIONS') {
    response.writeHead(204, corsHeaders);
    response.end();
    return;
  }

  if (request.method === 'POST' && requestPath === '/api/dev/verify-question') {
    try {
      const body = await readJsonBody(request);
      if (!body.id || !body.status) {
        return sendJson(response, 400, { error: 'Missing id or status' });
      }
      
      const fs = await import('fs');
      const path = await import('path');
      const qbPath = path.resolve(process.cwd(), 'src/learning/questionBank.js');
      let content = fs.readFileSync(qbPath, 'utf8');
      
      // We look for the question block: id: 'q-id' and then replace its verificationStatus
      // A naive regex to replace the status of a specific question:
      const idMatch = new RegExp(`id:\\s*'${body.id}'`);
      const blockStart = content.search(idMatch);
      if (blockStart !== -1) {
        const afterBlock = content.substring(blockStart);
        const statusMatch = afterBlock.match(/verificationStatus:\s*'([^']+)'/);
        if (statusMatch) {
          const globalMatchStart = blockStart + statusMatch.index;
          const globalMatchEnd = globalMatchStart + statusMatch[0].length;
          const newStatusLine = `verificationStatus: '${body.status}'`;
          content = content.substring(0, globalMatchStart) + newStatusLine + content.substring(globalMatchEnd);
          fs.writeFileSync(qbPath, content, 'utf8');
          return sendJson(response, 200, { success: true });
        }
      }
      return sendJson(response, 404, { error: 'Question or status field not found' });
    } catch (e) {
      console.error(e);
      return sendJson(response, 500, { error: e.message });
    }
  }

  if (request.method !== 'POST' || requestPath !== '/api/ai/chat') {
    sendJson(response, 404, { error: 'Not found.' });
    return;
  }

  try {
    assertRateLimit(request);
    const body = await readJsonBody(request);
    const payload = await handleAIChat(body);
    sendJson(response, 200, payload);
  } catch (error) {
    const publicError = toPublicError(error);
    if (publicError.statusCode >= 500) {
      console.error('[ai-server]', error?.code || 'server_error', error?.message || error);
    }
    sendJson(response, publicError.statusCode, publicError.payload);
  }
});

server.listen(env.port, () => {
  console.log(`[ai-server] listening on http://localhost:${env.port} with provider ${env.provider}`);
});
