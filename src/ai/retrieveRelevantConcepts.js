import { conceptSearchTokens } from './knowledgeBase';

const normalize = (value = '') =>
  String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const scoreConcept = (concept, query, pageContext) => {
  let score = 0;
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const queryTokens = normalizedQuery.split(' ').filter(Boolean);

  if (concept.searchIndex.includes(normalizedQuery)) {
    score += 12;
  }

  queryTokens.forEach((token) => {
    if (concept.searchIndex.includes(token)) {
      score += 3;
    }
  });

  const contextTokens = [
    pageContext?.pageName,
    pageContext?.sectionTitle,
    pageContext?.chapterTitle,
    pageContext?.activeMission,
    pageContext?.activeStage?.title,
    pageContext?.activeStage?.formula,
    pageContext?.quiz?.question,
    pageContext?.simulation?.scenario,
    pageContext?.capitalLab?.chapterTitle,
    pageContext?.selectedStakeholder?.name,
  ]
    .filter(Boolean)
    .map(normalize);

  contextTokens.forEach((token) => {
    if (token && concept.searchIndex.includes(token)) {
      score += 2;
    }
  });

  if (pageContext?.relevantConceptIds?.includes(concept.id)) {
    score += 8;
  }

  if (pageContext?.sourceLabels?.some((label) => concept.sourceLabels.includes(label))) {
    score += 3;
  }

  if (pageContext?.chapterTitle && normalize(concept.name).includes(normalize(pageContext.chapterTitle))) {
    score += 4;
  }

  return score;
};

export function retrieveRelevantConcepts({ query = '', pageContext = {}, limit = 4 } = {}) {
  const ranked = conceptSearchTokens
    .map((concept) => ({ ...concept, score: scoreConcept(concept, query, pageContext) }))
    .filter((concept) => concept.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length > 0) {
    return ranked.slice(0, limit);
  }

  const fallback = pageContext?.relevantConceptIds
    ?.map((id) => conceptSearchTokens.find((concept) => concept.id === id))
    .filter(Boolean);

  return (fallback || []).slice(0, limit);
}

