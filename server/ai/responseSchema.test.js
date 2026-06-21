import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeAIResponse } from './responseSchema.js';

test('normalizeAIResponse keeps only allowed source labels', () => {
  const response = normalizeAIResponse(
    {
      answer: 'Tra loi',
      sourceLabels: ['Case Alpha Corp', 'Bia dat'],
      suggestedActions: [],
      relatedConcepts: [],
      fallbackUsed: false,
    },
    {
      route: '/',
      allowedSourceLabels: ['Case Alpha Corp'],
      fallbackSourceLabels: ['Case Alpha Corp'],
    },
  );

  assert.deepEqual(response.sourceLabels, ['Case Alpha Corp']);
});
