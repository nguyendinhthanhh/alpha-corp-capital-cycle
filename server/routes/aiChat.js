import { env } from '../config/env.js';
import { assertProviderConfig } from '../config/env.js';
import { buildCaseContextText } from '../ai/caseContext.js';
import { sanitizePageContext } from '../ai/contextBuilder.js';
import { buildDemoResponse, buildFallbackResponse } from '../ai/fallbackAnalyzer.js';
import { createAIProvider } from '../ai/providerFactory.js';
import { retrieveKnowledge } from '../ai/knowledgeRetriever.js';
import { normalizeAIResponse, tryParseJson } from '../ai/responseSchema.js';
import { buildPromptEnvelope, buildSystemPrompt } from '../ai/systemPrompt.js';
import { getSuggestedActions } from '../ai/suggestedActions.js';
import { validateChatRequest } from '../middleware/validateRequest.js';

function decodeJsonString(rawValue = '') {
  try {
    return JSON.parse(`"${rawValue}"`);
  } catch {
    return rawValue.replace(/\\"/g, '"').replace(/\\n/g, '\n');
  }
}

function salvageJsonLikePayload(raw) {
  const text = String(raw || '');
  const answerMatch = text.match(/"answer"\s*:\s*"((?:\\.|[^"\\])*)"/);

  if (!answerMatch) {
    return null;
  }

  const conceptMatches = [...text.matchAll(/\{\s*"id"\s*:\s*"((?:\\.|[^"\\])*)"\s*,\s*"label"\s*:\s*"((?:\\.|[^"\\])*)"\s*\}/g)];
  const sourceMatches = [...text.matchAll(/"sourceLabels"\s*:\s*\[((?:.|\n|\r)*?)\]/g)];
  const extractedSources = sourceMatches[0]?.[1]
    ? [...sourceMatches[0][1].matchAll(/"((?:\\.|[^"\\])*)"/g)].map((match) => decodeJsonString(match[1]))
    : [];

  return {
    answer: decodeJsonString(answerMatch[1]),
    sections: [],
    relatedConcepts: conceptMatches.slice(0, 3).map((match) => ({
      id: decodeJsonString(match[1]),
      label: decodeJsonString(match[2]),
    })),
    sourceLabels: extractedSources,
    suggestedActions: [],
    fallbackUsed: false,
  };
}

function safeJsonParse(raw) {
  try {
    return tryParseJson(raw);
  } catch {
    return salvageJsonLikePayload(raw) || {
      answer: String(raw || '').trim(),
      sections: [],
      relatedConcepts: [],
      sourceLabels: [],
      suggestedActions: [],
      fallbackUsed: false,
    };
  }
}

function selectConversation(messages) {
  return messages.slice(-10).map((message) => ({
    role: message.role,
    content: message.content.trim().slice(0, env.maxInputChars),
  }));
}

function buildConversationText(messages) {
  return messages
    .map((message) => `${message.role === 'assistant' ? 'ASSISTANT' : 'USER'}: ${message.content}`)
    .join('\n');
}

export async function handleAIChat(body) {
  validateChatRequest(body);

  const pageContext = sanitizePageContext(body.pageContext);
  const action = typeof body.action === 'string' ? body.action : null;
  const conversation = selectConversation(body.messages);
  const latestUserMessage = [...conversation].reverse().find((message) => message.role === 'user')?.content || '';
  const retrievedConcepts = retrieveKnowledge({
    query: latestUserMessage,
    activeConceptIds: pageContext.relevantConceptIds,
    route: pageContext.route,
    action,
    limit: 6,
    context: pageContext,
  });

  const sourceLabels = [
    ...new Set([
      ...pageContext.sourceLabels,
      ...retrievedConcepts.flatMap((concept) => concept.sourceLabels || []),
    ]),
  ];

  if (env.demoMode) {
    return normalizeAIResponse(
      buildDemoResponse({ pageContext, retrievedConcepts, sourceLabels }),
      {
        route: pageContext.route,
        allowedSourceLabels: sourceLabels,
        fallbackSourceLabels: sourceLabels,
      },
    );
  }

  assertProviderConfig();

  const provider = createAIProvider();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.requestTimeoutMs);

  try {
    const result = await provider.generate({
      systemPrompt: buildSystemPrompt(),
      userPrompt: buildPromptEnvelope({
        retrievedConcepts,
        caseContextText: buildCaseContextText(),
        pageContext,
        conversationText: buildConversationText(conversation),
        action,
        userQuery: latestUserMessage,
      }),
      messages: conversation,
      signal: controller.signal,
    });

    const parsed = safeJsonParse(result.text);
    return normalizeAIResponse(
      {
        ...parsed,
        providerMeta: result.providerMeta,
        suggestedActions:
          Array.isArray(parsed?.suggestedActions) && parsed.suggestedActions.length > 0
            ? parsed.suggestedActions
            : getSuggestedActions(pageContext.route),
        fallbackUsed: false,
      },
      {
        route: pageContext.route,
        allowedSourceLabels: sourceLabels,
        fallbackSourceLabels: sourceLabels,
      },
    );
  } catch (error) {
    if (error?.name === 'AbortError') {
      const timeoutError = new Error('Provider AI bi timeout.');
      timeoutError.statusCode = 502;
      timeoutError.code = 'provider_timeout';
      throw timeoutError;
    }

    if (['provider_auth_failed', 'provider_rate_limited', 'provider_request_failed'].includes(error?.code)) {
      throw error;
    }

    return normalizeAIResponse(
      buildFallbackResponse({
        pageContext,
        retrievedConcepts,
        sourceLabels,
        action,
      }),
      {
        route: pageContext.route,
        allowedSourceLabels: sourceLabels,
        fallbackSourceLabels: sourceLabels,
      },
    );
  } finally {
    clearTimeout(timeout);
  }
}
