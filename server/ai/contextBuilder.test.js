import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizePageContext } from './contextBuilder.js';

test('sanitizePageContext normalizes page context shape', () => {
  const context = sanitizePageContext({
    route: '/quiz',
    pageName: 'Kiem tra',
    quiz: {
      question: 'H prime la gi?',
      options: ['A', 'B'],
      conceptIds: ['commodity-capital', 'commodity-capital'],
    },
    relevantConceptIds: ['commodity-capital', 'commodity-capital'],
  });

  assert.equal(context.route, '/quiz');
  assert.deepEqual(context.relevantConceptIds, ['commodity-capital']);
  assert.deepEqual(context.quiz.conceptIds, ['commodity-capital']);
});
