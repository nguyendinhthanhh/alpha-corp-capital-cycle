import { academicConcepts, getConceptById, tokenize } from './knowledgeBase.js';

const uniqueById = (concepts) => {
  const seen = new Set();
  return concepts.filter((concept) => {
    if (!concept?.id || seen.has(concept.id)) {
      return false;
    }

    seen.add(concept.id);
    return true;
  });
};

function scoreConcept(concept, queryTokens, input) {
  let score = 0;

  for (const activeId of input.activeConceptIds || []) {
    if (activeId === concept.id) {
      score += 18;
    }
  }

  for (const token of queryTokens) {
    if (concept.searchText.includes(token)) {
      score += 4;
    }

    if ((concept.aliases || []).some((alias) => alias.toLowerCase() === token)) {
      score += 8;
    }
  }

  const quizConceptIds = input.context?.quiz?.conceptIds || [];
  if (quizConceptIds.includes(concept.id)) {
    score += 10;
  }

  if (input.context?.selectedStakeholder?.name && concept.searchText.includes(input.context.selectedStakeholder.name.toLowerCase())) {
    score += 5;
  }

  if (input.context?.economicState === 'crisis' && ['liquidity', 'circulation-time', 'market'].includes(concept.id)) {
    score += 6;
  }

  if (input.action === 'it-analogy' && concept.itAnalogy) {
    score += 3;
  }

  if (input.context?.simulation?.liquidityState && concept.id === 'liquidity') {
    score += 7;
  }

  return score;
}

export function retrieveKnowledge(input = {}) {
  const queryTokens = tokenize(
    [
      input.query,
      input.route,
      input.context?.pageName,
      input.context?.sectionTitle,
      input.context?.activeStage?.title,
      input.context?.capitalLab?.chapterTitle,
      input.context?.quiz?.question,
      input.context?.simulation?.scenario,
      input.context?.selectedStakeholder?.name,
    ]
      .filter(Boolean)
      .join(' '),
  );

  const ranked = academicConcepts
    .map((concept) => ({
      concept,
      score: scoreConcept(concept, queryTokens, input),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.concept);

  const direct = uniqueById(ranked).slice(0, Math.max(3, Math.min(input.limit || 6, 6)));
  const related = uniqueById(
    direct.flatMap((concept) => (concept.relatedConceptIds || []).map((id) => getConceptById(id)).filter(Boolean)),
  );

  return uniqueById([...direct, ...related]).slice(0, Math.max(3, Math.min(input.limit || 6, 6)));
}
