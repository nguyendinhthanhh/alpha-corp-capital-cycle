import { LEARNING_STORAGE_KEY, createDefaultLearningProfile, migrateLearningProfile } from './engine.js';

function hasWindow() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function loadLearningProfile() {
  if (!hasWindow()) {
    return createDefaultLearningProfile();
  }

  try {
    const raw = window.localStorage.getItem(LEARNING_STORAGE_KEY);
    if (!raw) {
      return createDefaultLearningProfile();
    }

    return migrateLearningProfile(JSON.parse(raw));
  } catch {
    return createDefaultLearningProfile();
  }
}

export function saveLearningProfile(profile) {
  if (!hasWindow()) {
    return;
  }

  try {
    window.localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore write errors and keep UI responsive.
  }
}

export function clearLearningProfile() {
  if (!hasWindow()) {
    return;
  }
  window.localStorage.removeItem(LEARNING_STORAGE_KEY);
}

export function exportLearningProfile(profile) {
  return JSON.stringify(profile, null, 2);
}
