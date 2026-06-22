import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  applyQuestionResult,
  buildLearningOverview,
  createDefaultLearningProfile,
  getDailyChallenge,
  getDueReviewItems,
  migrateLearningProfile,
  normalizeDateInput,
  selectAdaptiveQuestion,
  unlockAchievements,
  updateStreak,
} from './engine';
import { clearLearningProfile, exportLearningProfile, loadLearningProfile, saveLearningProfile } from './storage.js';
import { getQuestionById, verifiedQuestionBank } from './questionBank.js';
import { LearningContext } from './LearningContext.js';

function ensureProfile(source) {
  return migrateLearningProfile(source || createDefaultLearningProfile());
}

export function LearningProvider({ children }) {
  const [profile, setProfile] = useState(() => ensureProfile(loadLearningProfile()));

  useEffect(() => {
    saveLearningProfile(profile);
  }, [profile]);

  const submitQuestion = useCallback((params) => {
    const timestamp = params.timestamp || new Date().toISOString();
    const applied = applyQuestionResult({
      profile,
      ...params,
      timestamp,
    });
    setProfile(applied.profile);
    return applied;
  }, [profile]);

  const completeMeaningfulActivity = useCallback((activityType, activityDate = new Date(), payload = {}) => {
    const normalizedDate = normalizeDateInput(activityDate);
    let activityId = '';
    if (activityType === 'daily') activityId = `daily:${normalizedDate}`;
    if (activityType === 'review') activityId = `review:${normalizedDate}`;
    if (activityType === 'quiz-set') activityId = `quiz-set:${normalizedDate}:${payload.sessionId || 'default'}`;
    if (activityType === 'mission') activityId = `mission:${normalizedDate}`;

    setProfile((current) => {
      if (!activityId || current.completedActivities.includes(activityId)) {
        return current;
      }
      const next = {
        ...current,
        completedActivities: [...current.completedActivities, activityId],
        streak: updateStreak(current.streak, normalizedDate),
      };
      next.achievements = unlockAchievements(next);
      return next;
    });
  }, []);

  const recordDailyAttempt = useCallback((questionId, resultStatus, dateInput = new Date()) => {
    const createdAt = new Date(dateInput).toISOString();
    setProfile((current) => {
      const dailyId = normalizeDateInput(dateInput);
      const existing = current.dailyHistory.find((item) => item.date === dailyId);
      const nextHistory = existing
        ? current.dailyHistory.map((item) =>
            item.date === dailyId ? { ...item, questionId, resultStatus, createdAt } : item,
          )
        : [{ date: dailyId, questionId, resultStatus, createdAt }, ...current.dailyHistory];

      const next = {
        ...current,
        dailyHistory: nextHistory.slice(0, 45),
        lastActiveAt: createdAt,
      };

      next.achievements = unlockAchievements(next);
      return next;
    });
  }, []);

  const recordMissionAttempt = useCallback((attempt) => {
    setProfile((current) => {
      const next = {
        ...current,
        missionHistory: [{ ...attempt, createdAt: attempt.createdAt || new Date().toISOString() }, ...current.missionHistory].slice(0, 30),
        missionDraft: null,
      };

      if (attempt.completed) {
        const day = normalizeDateInput(attempt.createdAt || new Date());
        next.completedActivities = [...new Set([...next.completedActivities, `mission:${day}`])];
        next.streak = updateStreak(next.streak, day);
      }

      next.achievements = unlockAchievements(next);
      return next;
    });
  }, []);

  const saveMissionDraft = useCallback((draft) => {
    setProfile((current) => ({
      ...current,
      missionDraft: draft,
      lastActiveAt: new Date().toISOString(),
    }));
  }, []);

  const recordDebateAttempt = useCallback((entry) => {
    setProfile((current) => {
      const next = {
        ...current,
        debateHistory: [{ ...entry, createdAt: entry.createdAt || new Date().toISOString() }, ...current.debateHistory].slice(0, 50),
      };
      next.achievements = unlockAchievements(next);
      return next;
    });
  }, []);

  const recordExplainBack = useCallback((entry) => {
    setProfile((current) => {
      const next = {
        ...current,
        explainBackHistory: [{ ...entry, createdAt: entry.createdAt || new Date().toISOString() }, ...current.explainBackHistory].slice(0, 40),
      };
      next.achievements = unlockAchievements(next);
      return next;
    });
  }, []);

  const resetProfile = useCallback(() => {
    clearLearningProfile();
    setProfile(createDefaultLearningProfile());
  }, []);

  const dueReviewItems = useMemo(() => getDueReviewItems(profile), [profile]);
  const overview = useMemo(() => buildLearningOverview(profile), [profile]);
  const dailyChallenge = useMemo(() => getDailyChallenge(new Date()), []);

  const getAdaptiveQuestion = useCallback((answeredQuestionIds = [], lastAttempt = null) => {
    return selectAdaptiveQuestion({
      questions: verifiedQuestionBank,
      profile,
      answeredQuestionIds,
      lastAttempt,
    });
  }, [profile]);

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      overview,
      dailyChallenge,
      dueReviewItems,
      verifiedQuestionBank,
      getQuestionById,
      getAdaptiveQuestion,
      submitQuestion,
      recordDailyAttempt,
      recordMissionAttempt,
      saveMissionDraft,
      recordDebateAttempt,
      recordExplainBack,
      completeMeaningfulActivity,
      exportProgress: () => exportLearningProfile(profile),
      resetProfile,
    }),
    [
      completeMeaningfulActivity,
      dailyChallenge,
      dueReviewItems,
      getAdaptiveQuestion,
      overview,
      profile,
      recordDailyAttempt,
      recordDebateAttempt,
      recordExplainBack,
      recordMissionAttempt,
      resetProfile,
      saveMissionDraft,
      submitQuestion,
    ],
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}
