import { getSuggestedActions } from './suggestedActions.js';

const safeText = (value, maxLength = 4000) => (typeof value === 'string' ? value.trim().slice(0, maxLength) : '');
const arrayOf = (value) => (Array.isArray(value) ? value : []);

function stripCodeFences(value) {
  return String(value || '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
}

export function tryParseJson(value) {
  const cleaned = stripCodeFences(value).replace(/,\s*([\]}])/g, '$1');
  return JSON.parse(cleaned);
}

export function normalizeAIResponse(payload, context = {}) {
  const allowedSourceLabels = new Set(arrayOf(context.allowedSourceLabels).filter(Boolean));
  const fallbackSourceLabels = arrayOf(context.fallbackSourceLabels).filter(Boolean);
  const answer = safeText(payload?.answer, 6000);

  if (!answer) {
    throw new Error('AI response missing answer text.');
  }

  const sections = arrayOf(payload?.sections)
    .map((section) => ({
      title: safeText(section?.title, 160),
      content: safeText(section?.content, 1600),
    }))
    .filter((section) => section.title && section.content);

  const relatedConcepts = arrayOf(payload?.relatedConcepts)
    .map((concept) => ({
      id: safeText(concept?.id, 120),
      label: safeText(concept?.label, 160),
    }))
    .filter((concept) => concept.id && concept.label);

  const sourceLabels = [
    ...new Set(
      arrayOf(payload?.sourceLabels)
        .map((label) => safeText(label, 160))
        .filter((label) => label && allowedSourceLabels.has(label)),
    ),
  ];

  const suggestedActions = arrayOf(payload?.suggestedActions)
    .map((action) => ({
      id: safeText(action?.id, 120),
      label: safeText(action?.label, 160),
    }))
    .filter((action) => action.id && action.label);

  return {
    answer,
    sections,
    relatedConcepts,
    sourceLabels: sourceLabels.length > 0 ? sourceLabels : fallbackSourceLabels,
    suggestedActions: suggestedActions.length > 0 ? suggestedActions : getSuggestedActions(context.route),
    providerMeta: payload?.providerMeta && typeof payload.providerMeta === 'object'
      ? {
          requestId: safeText(payload.providerMeta.requestId, 160),
          model: safeText(payload.providerMeta.model, 160),
          latencyMs: Number.isFinite(payload.providerMeta.latencyMs) ? payload.providerMeta.latencyMs : undefined,
        }
      : undefined,
    fallbackUsed: Boolean(payload?.fallbackUsed),
    demoMode: Boolean(payload?.demoMode),
  };
}
