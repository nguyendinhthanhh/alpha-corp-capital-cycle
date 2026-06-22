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
import { verifiedFixtureQuestions } from './fixtures/verifiedQuestions.js';

test('gradeQuestion scores single-choice correctly', () => {
  const question = verifiedFixtureQuestions.find(q => q.id === 'test-q1-capital-circuit');
  const result = gradeQuestion(question, 'c');
  assert.equal(result.status, 'incorrect'); // 'a' is correct, so 'c' is incorrect
  const correctResult = gradeQuestion(question, 'a');
  assert.equal(correctResult.status, 'correct');
  assert.equal(correctResult.isCorrect, true);
});

test('gradeQuestion supports multiple-choice partial and full scoring', () => {
  const question = verifiedFixtureQuestions.find(q => q.id === 'test-q3-profit');

  const partial = gradeQuestion(question, ['a', 'b']);
  assert.equal(partial.status, 'partial');
  assert.equal(partial.isCorrect, false);

  const full = gradeQuestion(question, ['a', 'b', 'd']);
  assert.equal(full.status, 'correct');
  assert.equal(full.isCorrect, true);
});

test('gradeQuestion supports ordering questions', () => {
  const question = verifiedFixtureQuestions.find(q => q.id === 'test-q4-order');
  const correct = gradeQuestion(question, ['t', 'h', 'sx', 'hp', 'tp']);
  const incorrect = gradeQuestion(question, ['t', 'sx', 'h', 'hp', 'tp']);

  assert.equal(correct.status, 'correct');
  assert.equal(incorrect.status, 'incorrect');
});

test('applyQuestionResult creates review item and mastery updates for incorrect answers', () => {
  const profile = createDefaultLearningProfile();
  const question = verifiedFixtureQuestions.find(q => q.id === 'test-q2-spatial-condition');
  const { profile: nextProfile, result } = applyQuestionResult({
    profile,
    question,
    response: 'c', // incorrect
    hintsUsed: 0,
    responseTimeMs: 4000,
  });

  assert.equal(result.status, 'incorrect');
  assert.equal(nextProfile.reviewQueue.length, 1);
  assert.equal(nextProfile.reviewQueue[0].questionId, question.id);
  assert.ok(nextProfile.mastery['spatial-condition'].masteryScore <= 2);
});

test('selectAdaptiveQuestion prioritizes same concept after an incorrect attempt', () => {
  const profile = createDefaultLearningProfile();
  const nextQuestion = selectAdaptiveQuestion({
    questions: verifiedFixtureQuestions,
    profile,
    answeredQuestionIds: ['test-q1-capital-circuit'],
    lastAttempt: {
      questionId: 'test-q1-capital-circuit',
      conceptIds: ['capital-circuit'],
      difficulty: 1,
      resultStatus: 'incorrect',
    },
  });

  assert.ok(nextQuestion !== null);
  assert.ok(nextQuestion.conceptIds.includes('capital-circuit') || nextQuestion.conceptIds.includes('spatial-condition'));
});

test('selectAdaptiveQuestion handles empty bank safely', () => {
  const profile = createDefaultLearningProfile();
  const nextQuestion = selectAdaptiveQuestion({
    questions: [],
    profile,
    answeredQuestionIds: [],
    lastAttempt: null,
  });
  assert.equal(nextQuestion, null);
});

test('getDailyChallenge is stable for the same day and changes on the next day', () => {
  const dayOne = getDailyChallenge('2026-06-22T00:00:00.000Z', verifiedFixtureQuestions);
  const sameDay = getDailyChallenge('2026-06-22T23:59:59.000Z', verifiedFixtureQuestions);
  const nextDay = getDailyChallenge('2026-06-23T00:00:00.000Z', verifiedFixtureQuestions);

  assert.equal(dayOne.id, sameDay.id);
  assert.notEqual(dayOne.id, nextDay.id);
});

test('getDailyChallenge handles empty bank safely', () => {
  const emptyDaily = getDailyChallenge('2026-06-22T00:00:00.000Z', []);
  assert.equal(emptyDaily, null);
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
  });

  assert.equal(profile.version, 1);
  assert.equal(profile.streak.current, 2);
  assert.ok(Array.isArray(profile.streak.completedDates));
  assert.ok(typeof profile.mastery === 'object');
});
