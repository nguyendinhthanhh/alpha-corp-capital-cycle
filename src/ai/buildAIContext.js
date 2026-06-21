import { getConceptById } from './knowledgeBase';
import { retrieveRelevantConcepts } from './retrieveRelevantConcepts';

const dedupe = (items) => [...new Set(items.filter(Boolean))];

const mergeContext = (base = {}, next = {}) => {
  const merged = { ...base, ...next };

  merged.relevantConceptIds = dedupe([
    ...(base.relevantConceptIds || []),
    ...(next.relevantConceptIds || []),
  ]);

  merged.sourceLabels = dedupe([
    ...(base.sourceLabels || []),
    ...(next.sourceLabels || []),
  ]);

  return merged;
};

export function buildAIContext({ route, appState = {}, selectedContent = {}, userAction = null } = {}) {
  const pageContext = mergeContext(
    {
      route,
      pageName: route || 'Unknown',
    },
    mergeContext(appState, selectedContent),
  );

  pageContext.userAction = userAction;

  const queryFragments = [
    pageContext.pageName,
    pageContext.sectionTitle,
    pageContext.chapterTitle,
    pageContext.activeStage?.title,
    pageContext.activeStage?.formula,
    pageContext.quiz?.question,
    pageContext.simulation?.scenario,
    pageContext.capitalLab?.chapterTitle,
    pageContext.selectedStakeholder?.name,
    pageContext.currentQuestion?.question,
    userAction,
  ]
    .filter(Boolean)
    .join(' ');

  const relevantConcepts = retrieveRelevantConcepts({
    query: queryFragments,
    pageContext,
    limit: 5,
  });

  const relatedConceptIds = dedupe([
    ...pageContext.relevantConceptIds,
    ...relevantConcepts.map((concept) => concept.id),
    ...(pageContext.quiz?.conceptIds || []),
  ]);

  const relatedConceptsDetailed = relatedConceptIds.map((id) => getConceptById(id)).filter(Boolean);

  return {
    ...pageContext,
    route,
    relevantConcepts: relatedConceptsDetailed,
    sourceLabels: dedupe([
      ...pageContext.sourceLabels,
      ...relatedConceptsDetailed.flatMap((concept) => concept.sourceLabels || []),
    ]),
  };
}
