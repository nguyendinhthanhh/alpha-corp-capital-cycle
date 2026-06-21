import { spawn } from 'node:child_process';

const commands = [
  {
    name: 'ai-proxy',
    command: 'node',
    args: ['scripts/gemini-proxy.mjs'],
  },
  {
    name: 'vite',
    command: 'npm',
    args: ['run', 'dev'],
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

for (const entry of commands) {
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
