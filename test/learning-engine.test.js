import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyQuestionResult,
  createDefaultLearningProfile,
  getDailyChallenge,
  migrateLearningProfile,
  selectAdaptiveQuestion,
  updateStreak,
  gradeQuestion,
} from '../src/learning/engine.js';
import { getQuestionById, verifiedQuestionBank } from '../src/learning/questionBank.js';

test('gradeQuestion scores single-choice correctly', () => {
  const question = getQuestionById('q01-money-capital-start');
  const result = gradeQuestion(question, 'c');
  assert.equal(result.status, 'correct');
  assert.equal(result.isCorrect, true);
});

test('gradeQuestion supports multiple-choice partial and full scoring', () => {
  const question = getQuestionById('q13-profit-vs-interest');

  const partial = gradeQuestion(question, ['a', 'b']);
  assert.equal(partial.status, 'partial');
  assert.equal(partial.isCorrect, false);

  const full = gradeQuestion(question, ['a', 'b', 'd']);
  assert.equal(full.status, 'correct');
  assert.equal(full.isCorrect, true);
});

test('gradeQuestion supports ordering questions', () => {
  const question = getQuestionById('q14-order-cycle');
  const correct = gradeQuestion(question, ['t', 'h', 'sx', 'hp', 'tp']);
  const incorrect = gradeQuestion(question, ['t', 'sx', 'h', 'hp', 'tp']);

  assert.equal(correct.status, 'correct');
  assert.equal(incorrect.status, 'incorrect');
});

test('applyQuestionResult creates review item and mastery updates for incorrect answers', () => {
  const profile = createDefaultLearningProfile();
  const question = getQuestionById('q10-assets-vs-cash');
  const { profile: nextProfile, result } = applyQuestionResult({
    profile,
    question,
    response: 'a',
    hintsUsed: 0,
    responseTimeMs: 4000,
  });

  assert.equal(result.status, 'incorrect');
  assert.equal(nextProfile.reviewQueue.length, 1);
  assert.equal(nextProfile.reviewQueue[0].questionId, question.id);
  assert.ok(nextProfile.mastery.liquidity.masteryScore <= 2);
});

test('selectAdaptiveQuestion prioritizes same concept after an incorrect attempt', () => {
  const profile = createDefaultLearningProfile();
  const nextQuestion = selectAdaptiveQuestion({
    questions: verifiedQuestionBank,
    profile,
    answeredQuestionIds: ['q10-assets-vs-cash'],
    lastAttempt: {
      questionId: 'q10-assets-vs-cash',
      conceptIds: ['liquidity', 'commodity-capital'],
      difficulty: 2,
      resultStatus: 'incorrect',
    },
  });

  assert.ok(nextQuestion.conceptIds.includes('liquidity') || nextQuestion.conceptIds.includes('commodity-capital'));
});

test('getDailyChallenge is stable for the same day and changes on the next day', () => {
  const dayOne = getDailyChallenge('2026-06-22T00:00:00.000Z');
  const sameDay = getDailyChallenge('2026-06-22T23:59:59.000Z');
  const nextDay = getDailyChallenge('2026-06-23T00:00:00.000Z');

  assert.equal(dayOne.id, sameDay.id);
  assert.notEqual(dayOne.id, nextDay.id);
});

test('updateStreak increments only on consecutive days', () => {
  const first = updateStreak(undefined, '2026-06-20');
  const second = updateStreak(first, '2026-06-21');
  const breakDay = updateStreak(second, '2026-06-25');

  assert.equal(first.current, 1);
  assert.equal(second.current, 2);
  assert.equal(breakDay.current, 1);
  assert.equal(breakDay.longest, 2);
});

test('migrateLearningProfile tolerates corrupted shapes', () => {
  const profile = migrateLearningProfile({
    version: 0,
    streak: { current: 2, completedDates: 'oops' },
    mastery: null,
    reviewQueue: [{ questionId: 'q01', createdAt: '2026-06-22T00:00:00.000Z' }],
  });

  assert.equal(Array.isArray(profile.streak.completedDates), true);
  assert.equal(Array.isArray(profile.reviewQueue), true);
  assert.equal(typeof profile.mastery, 'object');
  assert.equal(profile.version, 1);
});

