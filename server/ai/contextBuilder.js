const clampString = (value, maxLength = 240) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
};

const safeObject = (value) => (value && typeof value === 'object' && !Array.isArray(value) ? value : {});
const unique = (values) => [...new Set((values || []).filter(Boolean))];

export function sanitizePageContext(pageContext = {}) {
  const source = safeObject(pageContext);
  const activeStage = safeObject(source.activeStage);
  const selectedStakeholder = safeObject(source.selectedStakeholder);
  const capitalLab = safeObject(source.capitalLab);
  const simulation = safeObject(source.simulation);
  const quiz = safeObject(source.quiz);

  return {
    route: clampString(source.route || '/', 120) || '/',
    pageName: clampString(source.pageName || 'Trang hien tai', 120) || 'Trang hien tai',
    sectionId: clampString(source.sectionId, 120),
    sectionTitle: clampString(source.sectionTitle, 160),
    activeStage: activeStage.id
      ? {
          id: clampString(activeStage.id, 120),
          index: Number.isFinite(activeStage.index) ? activeStage.index : null,
          formula: clampString(activeStage.formula, 120),
          title: clampString(activeStage.title, 160),
          capitalForm: clampString(activeStage.capitalForm, 120),
        }
      : null,
    economicState: ['normal', 'warning', 'crisis', 'recovery'].includes(source.economicState)
      ? source.economicState
      : null,
    selectedStakeholder: selectedStakeholder.id
      ? {
          id: clampString(selectedStakeholder.id, 120),
          name: clampString(selectedStakeholder.name, 120),
        }
      : null,
    capitalLab: capitalLab.chapterId
      ? {
          chapterId: clampString(capitalLab.chapterId, 120),
          chapterIndex: Number.isFinite(capitalLab.chapterIndex) ? capitalLab.chapterIndex : null,
          chapterTitle: clampString(capitalLab.chapterTitle, 160),
          mode: ['guided', 'explore'].includes(capitalLab.mode) ? capitalLab.mode : 'guided',
        }
      : null,
    simulation: simulation.scenario || simulation.allocations
      ? {
          scenario: clampString(simulation.scenario, 120),
          allocations: safeObject(simulation.allocations),
          liquidityState: clampString(simulation.liquidityState, 120),
          continuityState: clampString(simulation.continuityState, 120),
          commodityConcentration: Number.isFinite(simulation.commodityConcentration)
            ? simulation.commodityConcentration
            : null,
          circulationState: clampString(simulation.circulationState, 120),
        }
      : null,
    quiz: quiz.question
      ? {
          questionId: clampString(quiz.questionId, 120),
          question: clampString(quiz.question, 500),
          options: Array.isArray(quiz.options) ? quiz.options.map((item) => clampString(item, 180)).filter(Boolean) : [],
          selectedAnswer: clampString(quiz.selectedAnswer, 180),
          isCorrect: typeof quiz.isCorrect === 'boolean' ? quiz.isCorrect : null,
          attemptCount: Number.isFinite(quiz.attemptCount) ? quiz.attemptCount : null,
          conceptIds: Array.isArray(quiz.conceptIds) ? unique(quiz.conceptIds.map((item) => clampString(item, 120))) : [],
        }
      : null,
    relevantConceptIds: Array.isArray(source.relevantConceptIds)
      ? unique(source.relevantConceptIds.map((item) => clampString(item, 120)))
      : [],
    sourceLabels: Array.isArray(source.sourceLabels)
      ? unique(source.sourceLabels.map((item) => clampString(item, 120)))
      : [],
  };
}

export function buildContextSummary(pageContext) {
  const parts = [
    pageContext.pageName,
    pageContext.activeStage?.title,
    pageContext.capitalLab?.chapterTitle,
    pageContext.selectedStakeholder?.name,
    pageContext.economicState === 'crisis' ? 'Khung hoang dang hoat dong' : '',
  ].filter(Boolean);

  return parts.join(' · ');
}
