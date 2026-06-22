import { conceptLabelMap, conceptMapOrder } from './concepts.js';
import { dailyChallengeQuestionIds, getQuestionById } from './questionBank.js';

export const LEARNING_PROFILE_VERSION = 1;

export const LEARNING_STORAGE_KEY = 'alpha-corp-learning-profile-v1';

const DAY_MS = 24 * 60 * 60 * 1000;

const DIFFICULTY_SCORE = {
  1: 6,
  2: 9,
  3: 12,
  4: 15,
  5: 18,
};

export const achievementDefinitions = [
  {
    id: 'flow-tracker',
    title: 'Theo dấu dòng vốn',
    description: 'Làm đúng nhiều câu về tuần hoàn và chu chuyển tư bản.',
  },
  {
    id: 'breakpoint-spotter',
    title: 'Phát hiện điểm đứt gãy',
    description: 'Nhận ra đúng cụm vấn đề H’ → T’ và thanh khoản.',
  },
  {
    id: 'liquidity-realism',
    title: 'Không nhầm tài sản với tiền mặt',
    description: 'Làm tốt nhóm câu về thanh khoản và tiêu thụ hàng hóa.',
  },
  {
    id: 'debater',
    title: 'Nhà phản biện',
    description: 'Hoàn thành 5 lượt Debate Arena.',
  },
  {
    id: 'explainer',
    title: 'Người giải thích',
    description: 'Hoàn thành Explain It Back ít nhất một lần.',
  },
  {
    id: 'cycle-restorer',
    title: 'Khôi phục chu kỳ',
    description: 'Hoàn thành ít nhất một Case Mission.',
  },
  {
    id: 'review-keeper',
    title: 'Ôn tập bền vững',
    description: 'Hoàn thành review ở nhiều ngày khác nhau.',
  },
];

const createDefaultStreak = () => ({
  current: 0,
  longest: 0,
  lastCompletedDate: null,
  completedDates: [],
});

export function createDefaultLearningProfile() {
  const now = new Date().toISOString();
  return {
    version: LEARNING_PROFILE_VERSION,
    createdAt: now,
    lastActiveAt: now,
    mastery: {},
    completedActivities: [],
    reviewQueue: [],
    streak: createDefaultStreak(),
    achievements: [],
    quizHistory: [],
    missionHistory: [],
    dailyHistory: [],
    debateHistory: [],
    explainBackHistory: [],
    missionDraft: null,
  };
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function ensureObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

export function normalizeDateInput(input = new Date()) {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

export function addDays(dateInput, days) {
  const date = new Date(dateInput);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

function getMasteryLevel(score) {
  if (score >= 80) return 5;
  if (score >= 60) return 4;
  if (score >= 40) return 3;
  if (score >= 20) return 2;
  return 1;
}

export function getConceptMasteryRecord(record = {}, conceptId) {
  const safe = ensureObject(record);
  return {
    conceptId,
    attempts: Number(safe.attempts) || 0,
    correct: Number(safe.correct) || 0,
    incorrect: Number(safe.incorrect) || 0,
    hintUsed: Number(safe.hintUsed) || 0,
    currentLevel: Number(safe.currentLevel) || 1,
    masteryScore: Number(safe.masteryScore) || 0,
    lastReviewedAt: safe.lastReviewedAt || null,
    nextReviewAt: safe.nextReviewAt || null,
  };
}

export function migrateLearningProfile(rawProfile) {
  const base = createDefaultLearningProfile();
  const source = ensureObject(rawProfile);
  const version = Number(source.version) || 0;

  const migrated = {
    ...base,
    ...source,
    version: LEARNING_PROFILE_VERSION,
    mastery: ensureObject(source.mastery),
    completedActivities: ensureArray(source.completedActivities),
    reviewQueue: ensureArray(source.reviewQueue),
    streak: {
      ...createDefaultStreak(),
      ...ensureObject(source.streak),
      completedDates: ensureArray(source.streak?.completedDates),
    },
    achievements: ensureArray(source.achievements),
    quizHistory: ensureArray(source.quizHistory),
    missionHistory: ensureArray(source.missionHistory),
    dailyHistory: ensureArray(source.dailyHistory),
    debateHistory: ensureArray(source.debateHistory),
    explainBackHistory: ensureArray(source.explainBackHistory),
    missionDraft: source.missionDraft && typeof source.missionDraft === 'object' ? source.missionDraft : null,
  };

  if (version <= 0) {
    migrated.reviewQueue = migrated.reviewQueue.map((item) => ({
      reviewCount: 0,
      status: 'new',
      nextReviewAt: addDays(item.createdAt || new Date().toISOString(), 1),
      ...item,
    }));
  }

  return migrated;
}

function normalizeResponseValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim().toLowerCase()).sort();
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return String(value ?? '').trim().toLowerCase();
}

function arraysEqual(left = [], right = []) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

function evaluateShortAnswer(question, response) {
  const normalized = normalizeResponseValue(response);
  const acceptedKeywords = ensureArray(question.correctAnswer);
  if (!normalized || typeof normalized !== 'string') {
    return { status: 'incorrect', isCorrect: false, scoreFraction: 0 };
  }

  const matched = acceptedKeywords.filter((keyword) => normalized.includes(String(keyword).toLowerCase()));
  if (matched.length === acceptedKeywords.length) {
    return { status: 'correct', isCorrect: true, scoreFraction: 1 };
  }
  if (matched.length >= Math.max(1, Math.ceil(acceptedKeywords.length / 2))) {
    return { status: 'partial', isCorrect: false, scoreFraction: 0.55 };
  }
  return { status: 'incorrect', isCorrect: false, scoreFraction: 0 };
}

export function gradeQuestion(question, response) {
  if (!question) {
    return { status: 'incorrect', isCorrect: false, scoreFraction: 0 };
  }

  if (question.type === 'ordering') {
    const expected = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.map((item) => String(item).trim().toLowerCase())
      : [];
    const received = Array.isArray(response)
      ? response.map((item) => String(item).trim().toLowerCase())
      : [];
    const isCorrect = arraysEqual(received, expected);
    return { status: isCorrect ? 'correct' : 'incorrect', isCorrect, scoreFraction: isCorrect ? 1 : 0 };
  }

  const normalizedExpected = normalizeResponseValue(question.correctAnswer);
  const normalizedResponse = normalizeResponseValue(response);

  if (question.type === 'multiple-choice') {
    if (!Array.isArray(normalizedResponse)) {
      return { status: 'incorrect', isCorrect: false, scoreFraction: 0 };
    }

    const expected = normalizedExpected;
    const correctSelected = normalizedResponse.filter((value) => expected.includes(value)).length;
    const incorrectSelected = normalizedResponse.filter((value) => !expected.includes(value)).length;
    const fraction = Math.max(0, (correctSelected - incorrectSelected) / expected.length);

    if (arraysEqual(normalizedResponse, expected)) {
      return { status: 'correct', isCorrect: true, scoreFraction: 1 };
    }

    if (fraction >= 0.5) {
      return { status: 'partial', isCorrect: false, scoreFraction: Number(fraction.toFixed(2)) };
    }

    return { status: 'incorrect', isCorrect: false, scoreFraction: 0 };
  }

  if (question.type === 'short-answer') {
    return evaluateShortAnswer(question, response);
  }

  const isCorrect = normalizedResponse === normalizedExpected;
  return { status: isCorrect ? 'correct' : 'incorrect', isCorrect, scoreFraction: isCorrect ? 1 : 0 };
}

function deriveErrorType(question, response) {
  if (!question) {
    return 'Chưa xác định được lỗi';
  }

  if (typeof response === 'string' && question.commonWrongReasons?.[response]) {
    return question.commonWrongReasons[response];
  }

  const conceptLabel = conceptLabelMap[question.conceptIds?.[0]];
  if (question.conceptIds?.includes('spatial-condition')) {
    return 'Nhầm điều kiện không gian với câu chuyện chỉ tăng tài sản.';
  }
  if (question.conceptIds?.includes('temporal-condition')) {
    return 'Chưa xác định đúng chỗ chu kỳ bị chậm hoặc đứt theo thời gian.';
  }
  if (question.conceptIds?.includes('liquidity')) {
    return 'Nhầm tài sản với khả năng chuyển thành tiền đúng lúc.';
  }
  if (question.conceptIds?.includes('commodity-capital')) {
    return 'Nhầm H’ với T’ hoặc xem hàng hóa như tiền mặt sẵn có.';
  }

  return conceptLabel ? `Cần ôn lại khái niệm ${conceptLabel.toLowerCase()}.` : 'Cần ôn lại khái niệm liên quan.';
}

export function updateMasteryRecord(record, { question, result, hintsUsed = 0, responseTimeMs = 0, timestamp }) {
  const current = getConceptMasteryRecord(record, question?.conceptIds?.[0] || record?.conceptId || 'unknown');
  const difficultyPoints = DIFFICULTY_SCORE[question.difficulty] || 10;

  let delta = 0;
  if (result.status === 'correct') delta = difficultyPoints;
  if (result.status === 'partial') delta = Math.round(difficultyPoints * 0.45);
  if (result.status === 'incorrect') delta = -Math.max(4, Math.round(difficultyPoints * 0.5));

  delta -= Math.min(3, hintsUsed) * 3;
  if (result.status === 'incorrect' && responseTimeMs > 0 && responseTimeMs < 8000) {
    delta -= 2;
  }
  if (result.status === 'correct' && hintsUsed === 0 && responseTimeMs > 0 && responseTimeMs < 16000) {
    delta += 2;
  }

  const masteryScore = Math.max(0, Math.min(100, current.masteryScore + delta));

  return {
    ...current,
    attempts: current.attempts + 1,
    correct: current.correct + (result.status === 'correct' ? 1 : 0),
    incorrect: current.incorrect + (result.status === 'incorrect' ? 1 : 0),
    hintUsed: current.hintUsed + hintsUsed,
    masteryScore,
    currentLevel: getMasteryLevel(masteryScore),
    lastReviewedAt: timestamp,
    nextReviewAt:
      result.status === 'incorrect'
        ? addDays(timestamp, 1)
        : result.status === 'partial'
          ? addDays(timestamp, 1)
          : current.incorrect > current.correct
            ? addDays(timestamp, 3)
            : null,
  };
}

function updateReviewItem(existingItem, { question, response, result, timestamp }) {
  const base = existingItem || {
    questionId: question.id,
    conceptIds: question.conceptIds,
    wrongAnswer: String(Array.isArray(response) ? response.join(', ') : response ?? ''),
    errorType: deriveErrorType(question, response),
    createdAt: timestamp,
    reviewCount: 0,
    status: 'new',
    lastReviewedAt: null,
    nextReviewAt: addDays(timestamp, 1),
  };

  if (result.status === 'incorrect' || result.status === 'partial') {
    return {
      ...base,
      wrongAnswer: String(Array.isArray(response) ? response.join(', ') : response ?? ''),
      errorType: deriveErrorType(question, response),
      reviewCount: base.reviewCount + 1,
      status: base.reviewCount > 0 ? 'learning' : 'new',
      lastReviewedAt: timestamp,
      nextReviewAt: addDays(timestamp, 1),
    };
  }

  const nextReviewCount = base.reviewCount + 1;
  if (nextReviewCount >= 4) {
    return {
      ...base,
      reviewCount: nextReviewCount,
      status: 'mastered',
      lastReviewedAt: timestamp,
      nextReviewAt: null,
    };
  }

  const spacingDays = nextReviewCount >= 3 ? 7 : 3;
  return {
    ...base,
    reviewCount: nextReviewCount,
    status: 'learning',
    lastReviewedAt: timestamp,
    nextReviewAt: addDays(timestamp, spacingDays),
  };
}

export function getDueReviewItems(profile, now = new Date()) {
  const nowDate = new Date(now);
  return ensureArray(profile.reviewQueue)
    .filter((item) => item.status !== 'mastered')
    .filter((item) => {
      if (!item.nextReviewAt) return true;
      return new Date(item.nextReviewAt) <= nowDate;
    });
}

export function updateStreak(streak, completedDateInput) {
  const completedDate = normalizeDateInput(completedDateInput);
  const current = {
    ...createDefaultStreak(),
    ...ensureObject(streak),
    completedDates: ensureArray(streak?.completedDates),
  };

  if (current.lastCompletedDate === completedDate) {
    return current;
  }

  const previousDate = current.lastCompletedDate ? new Date(current.lastCompletedDate) : null;
  const nextDate = new Date(completedDate);
  let nextCurrent = 1;

  if (previousDate) {
    const diffDays = Math.round((nextDate.getTime() - previousDate.getTime()) / DAY_MS);
    nextCurrent = diffDays === 1 ? current.current + 1 : 1;
  }

  const completedDates = [...new Set([...current.completedDates, completedDate])];
  return {
    current: nextCurrent,
    longest: Math.max(current.longest, nextCurrent),
    lastCompletedDate: completedDate,
    completedDates,
  };
}

function getConceptQuestionMetrics(history, conceptIds) {
  return ensureArray(history).filter((item) =>
    ensureArray(item.conceptIds).some((conceptId) => conceptIds.includes(conceptId)),
  );
}

export function unlockAchievements(profile) {
  const achievements = new Set(ensureArray(profile.achievements));

  if (getConceptQuestionMetrics(profile.quizHistory, ['capital-circuit', 'capital-turnover']).filter((item) => item.resultStatus === 'correct').length >= 3) {
    achievements.add('flow-tracker');
  }

  if (getConceptQuestionMetrics(profile.quizHistory, ['liquidity', 'commodity-capital']).filter((item) => item.resultStatus === 'correct').length >= 3) {
    achievements.add('liquidity-realism');
  }

  if (getConceptQuestionMetrics(profile.quizHistory, ['liquidity', 'temporal-condition']).filter((item) => item.resultStatus === 'correct').length >= 2) {
    achievements.add('breakpoint-spotter');
  }

  if (ensureArray(profile.debateHistory).length >= 5) {
    achievements.add('debater');
  }

  if (ensureArray(profile.explainBackHistory).length >= 1) {
    achievements.add('explainer');
  }

  if (ensureArray(profile.missionHistory).some((item) => item.completed)) {
    achievements.add('cycle-restorer');
  }

  const reviewDays = new Set(
    ensureArray(profile.completedActivities)
      .filter((item) => item.startsWith('review:'))
      .map((item) => item.split(':')[1]),
  );

  if (reviewDays.size >= 3) {
    achievements.add('review-keeper');
  }

  return [...achievements];
}

function markActivityCompleted(profile, activityId, completedDate) {
  if (profile.completedActivities.includes(activityId)) {
    return profile;
  }

  return {
    ...profile,
    completedActivities: [...profile.completedActivities, activityId],
    streak: updateStreak(profile.streak, completedDate),
  };
}

export function applyQuestionResult({
  profile,
  question,
  response,
  hintsUsed = 0,
  responseTimeMs = 0,
  timestamp = new Date().toISOString(),
  activityType = 'quiz',
  activityId,
}) {
  const result = gradeQuestion(question, response);
  const nextProfile = {
    ...profile,
    lastActiveAt: timestamp,
    mastery: { ...profile.mastery },
    reviewQueue: [...ensureArray(profile.reviewQueue)],
    quizHistory: [...ensureArray(profile.quizHistory)],
  };

  question.conceptIds.forEach((conceptId) => {
    nextProfile.mastery[conceptId] = updateMasteryRecord(nextProfile.mastery[conceptId], {
      question,
      result,
      hintsUsed,
      responseTimeMs,
      timestamp,
    });
  });

  const reviewIndex = nextProfile.reviewQueue.findIndex((item) => item.questionId === question.id);
  const updatedReviewItem = updateReviewItem(nextProfile.reviewQueue[reviewIndex], {
    question,
    response,
    result,
    timestamp,
  });

  if (reviewIndex >= 0) {
    nextProfile.reviewQueue.splice(reviewIndex, 1, updatedReviewItem);
  } else if (result.status !== 'correct') {
    nextProfile.reviewQueue.unshift(updatedReviewItem);
  }

  if (updatedReviewItem.status === 'mastered' && reviewIndex >= 0) {
    nextProfile.reviewQueue.splice(reviewIndex, 1, updatedReviewItem);
  }

  nextProfile.quizHistory.unshift({
    questionId: question.id,
    conceptIds: question.conceptIds,
    difficulty: question.difficulty,
    resultStatus: result.status,
    hintsUsed,
    responseTimeMs,
    createdAt: timestamp,
    activityType,
  });
  nextProfile.quizHistory = nextProfile.quizHistory.slice(0, 120);

  const completionTriggers = {
    quiz: `quiz:${normalizeDateInput(timestamp)}:${question.id}`,
    review: null,
    daily: `daily:${normalizeDateInput(timestamp)}`,
  };

  let profileAfterCompletion = nextProfile;
  if (activityId) {
    profileAfterCompletion = markActivityCompleted(nextProfile, activityId, normalizeDateInput(timestamp));
  } else if (completionTriggers[activityType]) {
    profileAfterCompletion = markActivityCompleted(nextProfile, completionTriggers[activityType], normalizeDateInput(timestamp));
  }

  profileAfterCompletion.achievements = unlockAchievements(profileAfterCompletion);

  return {
    profile: profileAfterCompletion,
    result,
    reviewItem: updatedReviewItem,
  };
}

function getAverageMasteryForConcept(profile, conceptId) {
  return getConceptMasteryRecord(profile.mastery?.[conceptId], conceptId).masteryScore;
}

function buildQuestionPriority(question, profile, answeredIds, lastAttempt) {
  const alreadySeen = answeredIds.has(question.id) ? -80 : 0;
  const conceptScores = question.conceptIds.map((conceptId) => getAverageMasteryForConcept(profile, conceptId));
  const weakestSignal = conceptScores.length ? 100 - Math.min(...conceptScores) : 50;
  let adaptiveSignal = 0;

  if (lastAttempt?.questionId && lastAttempt?.conceptIds?.some((conceptId) => question.conceptIds.includes(conceptId))) {
    if (lastAttempt.resultStatus === 'incorrect') {
      adaptiveSignal += question.difficulty <= lastAttempt.difficulty ? 30 : -10;
    }
    if (lastAttempt.resultStatus === 'correct') {
      adaptiveSignal += question.difficulty >= lastAttempt.difficulty ? 18 : 4;
    }
  }

  const reviewPressure = question.conceptIds.some((conceptId) =>
    ensureArray(profile.reviewQueue).some((item) => item.status !== 'mastered' && item.conceptIds.includes(conceptId)),
  )
    ? 14
    : 0;

  return weakestSignal + adaptiveSignal + reviewPressure + alreadySeen;
}

export function selectAdaptiveQuestion({ questions, profile, answeredQuestionIds = [], lastAttempt = null, targetConceptId = null }) {
  const answeredIds = new Set(answeredQuestionIds);
  const candidates = ensureArray(questions)
    .filter((question) => question.verificationStatus === 'verified')
    .filter((question) => !targetConceptId || question.conceptIds.includes(targetConceptId))
    .sort((left, right) => {
      const priorityDelta =
        buildQuestionPriority(right, profile, answeredIds, lastAttempt) -
        buildQuestionPriority(left, profile, answeredIds, lastAttempt);
      if (priorityDelta !== 0) {
        return priorityDelta;
      }
      return left.id.localeCompare(right.id);
    });

  return candidates[0] || null;
}

export function getDailyChallenge(dateInput = new Date(), questions = null) {
  const date = new Date(dateInput);
  const dayIndex = Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / DAY_MS);
  
  if (questions && Array.isArray(questions)) {
    const verified = questions.filter(q => q.verificationStatus === 'verified');
    if (verified.length === 0) return null;
    const index = Math.abs(dayIndex) % verified.length;
    return verified[index];
  }

  // Production fallback
  if (!dailyChallengeQuestionIds || dailyChallengeQuestionIds.length === 0) return null;
  const index = Math.abs(dayIndex) % dailyChallengeQuestionIds.length;
  const questionId = dailyChallengeQuestionIds[index];
  const q = getQuestionById(questionId);
  if (!q || q.verificationStatus !== 'verified') return null;
  return q;
}

export function getMasteryStateLabel(score) {
  if (score >= 80) return 'Thành thạo trong phạm vi website';
  if (score >= 60) return 'Đã hiểu';
  if (score >= 35) return 'Đang học';
  if (score > 0) return 'Cần ôn';
  return 'Chưa học';
}

export function buildLearningOverview(profile) {
  const concepts = conceptMapOrder.map((conceptId) => {
    const record = getConceptMasteryRecord(profile.mastery?.[conceptId], conceptId);
    return {
      conceptId,
      score: record.masteryScore,
      label: conceptLabelMap[conceptId] || conceptId,
      state: getMasteryStateLabel(record.masteryScore),
      attempts: record.attempts,
    };
  });

  const attempted = concepts.filter((concept) => concept.attempts > 0);
  const averageScore = concepts.length
    ? Math.round(concepts.reduce((sum, item) => sum + item.score, 0) / concepts.length)
    : 0;

  const strongest = [...attempted].sort((left, right) => right.score - left.score)[0] || null;
  const weakest = [...attempted].sort((left, right) => left.score - right.score)[0] || null;

  return {
    progressPercent: averageScore,
    concepts,
    strongest,
    weakest,
    dueReviews: getDueReviewItems(profile).length,
    totalQuestionsAnswered: ensureArray(profile.quizHistory).length,
  };
}
