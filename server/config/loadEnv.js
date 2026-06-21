import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const raw = await readFile(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const cleaned = trimmed.startsWith('export ') ? trimmed.slice(7).trim() : trimmed;
    const separatorIndex = cleaned.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = cleaned.slice(0, separatorIndex).trim();
    if (!key || process.env[key] !== undefined) {
      continue;
    }

    let value = cleaned.slice(separatorIndex + 1).trim();
    const isQuoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));

    if (isQuoted) {
      value = value.slice(1, -1);
      value = value
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\');
    }

    process.env[key] = value;
  }
}
