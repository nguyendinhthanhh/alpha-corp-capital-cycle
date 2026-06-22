import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuizAIMessage } from '../src/learning/ai.js';
import { getQuestionById } from '../src/learning/questionBank.js';

test('quiz hint prompt omits verified answer when includeCorrectAnswer is false', () => {
  const question = getQuestionById('q01-money-capital-start');
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
  const question = getQuestionById('q01-money-capital-start');
  const prompt = buildQuizAIMessage({
    question,
    selectedAnswer: 'a',
    action: 'quiz-explanation',
    includeCorrectAnswer: true,
  });

  assert.match(prompt, /Đáp án đúng đã xác minh/i);
  assert.match(prompt, /Question ID: q01-money-capital-start/i);
});

