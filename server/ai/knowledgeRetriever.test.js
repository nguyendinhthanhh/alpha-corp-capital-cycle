import test from 'node:test';
import assert from 'node:assert/strict';
import { retrieveKnowledge } from './knowledgeRetriever.js';

test('retrieveKnowledge prioritizes active concept ids', () => {
  const result = retrieveKnowledge({
    query: 'dong von dang ket o H prime',
    activeConceptIds: ['commodity-capital'],
    route: '/capital-lab',
    context: {
      route: '/capital-lab',
      relevantConceptIds: ['commodity-capital'],
    },
  });

  assert.ok(result.some((concept) => concept.id === 'commodity-capital'));
});
