import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultLearningProfile } from '../src/learning/engine.js';
import {
  clearLearningProfile,
  exportLearningProfile,
  loadLearningProfile,
  saveLearningProfile,
} from '../src/learning/storage.js';

function mockWindow() {
  const store = new Map();
  global.window = {
    localStorage: {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => store.set(key, value),
      removeItem: (key) => store.delete(key),
    },
  };
  return store;
}

test('storage can save and load a learning profile', () => {
  mockWindow();
  const profile = createDefaultLearningProfile();
  profile.achievements.push('flow-tracker');

  saveLearningProfile(profile);
  const loaded = loadLearningProfile();

  assert.deepEqual(loaded.achievements, ['flow-tracker']);
});

test('storage recovers from corrupted JSON by returning default profile', () => {
  const store = mockWindow();
  store.set('alpha-corp-learning-profile-v1', '{bad json');

  const loaded = loadLearningProfile();
  assert.equal(loaded.version, 1);
  assert.deepEqual(loaded.achievements, []);
});

test('storage clear removes profile and export returns JSON', () => {
  const store = mockWindow();
  const profile = createDefaultLearningProfile();
  saveLearningProfile(profile);
  clearLearningProfile();

  assert.equal(store.get('alpha-corp-learning-profile-v1'), undefined);
  assert.doesNotThrow(() => JSON.parse(exportLearningProfile(profile)));
});

