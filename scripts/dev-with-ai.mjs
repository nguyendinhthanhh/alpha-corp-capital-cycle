import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadEnvValue(key) {
  const filePaths = [path.join(rootDir, '.env.local'), path.join(rootDir, '.env')];

  for (const filePath of filePaths) {
    if (!existsSync(filePath)) {
      continue;
    }

    const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const cleaned = trimmed.startsWith('export ') ? trimmed.slice(7).trim() : trimmed;
      const separatorIndex = cleaned.indexOf('=');
      if (separatorIndex <= 0) {
        continue;
      }

      const currentKey = cleaned.slice(0, separatorIndex).trim();
      if (currentKey !== key) {
        continue;
      }

      return cleaned.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    }
  }

  return undefined;
}

function getAiServerPort() {
  const configured =
    process.env.AI_SERVER_PORT ||
    process.env.AI_PROXY_PORT ||
    loadEnvValue('AI_SERVER_PORT') ||
    loadEnvValue('AI_PROXY_PORT');

  const port = Number(configured || 8787);
  return Number.isFinite(port) ? port : 8787;
}

async function isPortInUse(port) {
  return new Promise((resolve, reject) => {
    const tester = createServer();

    tester.once('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        resolve(true);
        return;
      }

      reject(error);
    });

    tester.once('listening', () => {
      tester.close(() => resolve(false));
    });

    tester.listen(port);
  });
}

const aiServerPort = getAiServerPort();

const commands = [
  {
    name: 'ai-server',
    command: 'node',
    args: ['server/index.js'],
  },
  {
    name: 'vite',
    command: 'npm',
    args: ['run', 'dev:client'],
  },
];

const children = [];
let shuttingDown = false;

const stop = (signal = 'SIGINT') => {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
};

const activeCommands = [...commands];
if (await isPortInUse(aiServerPort)) {
  console.log(`[dev] Port ${aiServerPort} is already in use. Reusing the existing AI server.`);
  activeCommands.shift();
}

for (const entry of activeCommands) {
  const child = spawn(entry.command, entry.args, {
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code, signal) => {
    if (!shuttingDown) {
      console.log(`[${entry.name}] exited with code ${code ?? 'null'} signal ${signal ?? 'null'}`);
      stop(signal || 'SIGINT');
      process.exit(code ?? 0);
    }
  });

  children.push(child);
}

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));
