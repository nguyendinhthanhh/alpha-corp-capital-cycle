import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuizAIMessage } from '../src/learning/ai.js';
import { verifiedFixtureQuestions } from './fixtures/verifiedQuestions.js';

test('quiz hint prompt omits verified answer when includeCorrectAnswer is false', () => {
  const question = verifiedFixtureQuestions[0];
  const prompt = buildQuizAIMessage({
    question,
    selectedAnswer: 'a',
    action: 'quiz-hint',
    includeCorrectAnswer: false,
  });

  assert.match(prompt, /Không được tiết lộ đáp án đúng trực tiếp/i);
  assert.doesNotMatch(prompt, /Đáp án đúng đã xác minh/i);
});

test('quiz explanation prompt can include verified answer after user has answered', () => {
  const question = verifiedFixtureQuestions[0];
  const prompt = buildQuizAIMessage({
    question,
    selectedAnswer: 'a',
    action: 'quiz-explanation',
    includeCorrectAnswer: true,
  });

  assert.match(prompt, /Đáp án đúng đã xác minh/i);
  assert.match(prompt, /Question ID: test-q1-capital-circuit/i);
});

