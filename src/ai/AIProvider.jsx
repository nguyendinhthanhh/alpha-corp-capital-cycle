import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { clearTutorState, loadTutorState, saveTutorState } from './tutorStorage';
import { sendTutorRequest } from './tutorClient';
import { TutorContext } from './TutorContext';

const MAX_MESSAGES = 24;
let messageCounter = 0;

const buildWelcomeMessage = () => ({
  id: `welcome-${Date.now()}`,
  role: 'assistant',
  content:
    'AI Capital Tutor se tra loi theo knowledge base da kiem chung cua du an va context thuc te cua trang hien tai. Neu provider AI that loi, he thong se ghi ro khi dang dung phan tich du phong.',
  sourceLabels: ['Verified academic context'],
  fallbackUsed: false,
});

const defaultState = {
  isOpen: false,
  isCollapsed: false,
  isLoading: false,
  error: null,
  messages: [buildWelcomeMessage()],
  pageContext: {
    route: '/',
    pageName: 'Tong quan',
    relevantConceptIds: ['capital-circuit', 'money-capital'],
    sourceLabels: ['Case Alpha Corp'],
  },
  currentAction: null,
  viewContext: false,
};

const createMessage = (role, content, extra = {}) => ({
  id: `${role}-${Date.now()}-${messageCounter += 1}`,
  role,
  content,
  ...extra,
});

const trimMessages = (messages) => messages.slice(-MAX_MESSAGES);

const uniqueBy = (items, getKey) => {
  const seen = new Set();
  return (items || []).filter((item) => {
    const key = getKey(item);
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

const mergeContext = (current, next = {}) => ({
  ...current,
  ...next,
  relevantConceptIds: [...new Set([...(current.relevantConceptIds || []), ...(next.relevantConceptIds || [])])],
  sourceLabels: [...new Set([...(current.sourceLabels || []), ...(next.sourceLabels || [])])],
});

export function AIProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = loadTutorState();
    const savedMessages = saved?.messages?.length ? saved.messages : null;
    const hasUserMessages = savedMessages?.some((message) => message.role === 'user');
    const messages =
      savedMessages && (hasUserMessages || savedMessages.length > 1)
        ? savedMessages
        : defaultState.messages;

    return saved
      ? {
          ...defaultState,
          ...saved,
          messages,
        }
      : defaultState;
  });

  const [lastRequest, setLastRequest] = useState({
    prompt: '',
    action: null,
  });

  const abortControllerRef = useRef(null);

  useEffect(() => {
    saveTutorState({
      isCollapsed: state.isCollapsed,
      messages: trimMessages(state.messages),
      pageContext: state.pageContext,
      currentAction: state.currentAction,
      viewContext: state.viewContext,
    });
  }, [state.isCollapsed, state.messages, state.pageContext, state.currentAction, state.viewContext]);

  const setPageContext = useCallback((nextContext) => {
    setState((current) => ({
      ...current,
      pageContext: mergeContext(current.pageContext, nextContext),
    }));
  }, []);

  const openTutor = useCallback(() => {
    setState((current) => ({ ...current, isOpen: true, isCollapsed: false }));
  }, []);

  const closeTutor = useCallback(() => {
    setState((current) => ({ ...current, isOpen: false, isCollapsed: false, viewContext: false }));
  }, []);

  const collapseTutor = useCallback(() => {
    setState((current) => ({ ...current, isOpen: false, isCollapsed: true, viewContext: false }));
  }, []);

  const toggleTutor = useCallback(() => {
    setState((current) => ({ ...current, isOpen: !current.isOpen, isCollapsed: false }));
  }, []);

  const toggleContext = useCallback(() => {
    setState((current) => ({ ...current, viewContext: !current.viewContext }));
  }, []);

  const resetConversation = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setState((current) => ({
      ...current,
      messages: [buildWelcomeMessage()],
      currentAction: null,
      error: null,
      isLoading: false,
    }));
    clearTutorState();
  }, []);

  const abortCurrentRequest = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setState((current) => ({
      ...current,
      isLoading: false,
      error: 'Da dung request hien tai.',
    }));
  }, []);

  const sendMessage = useCallback(async (message, action = null) => {
    const content = typeof message === 'string' ? message.trim() : '';
    if (!content || state.isLoading) {
      return;
    }

    const currentPageContext = state.pageContext;
    const currentMessages = state.messages;
    const userMessage = createMessage('user', content, { action });
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLastRequest({
      prompt: content,
      action,
    });

    setState((current) => {
      if (current.isLoading) {
        return current;
      }

      return {
        ...current,
        isOpen: true,
        isCollapsed: false,
        isLoading: true,
        error: null,
        currentAction: action,
        messages: trimMessages([...current.messages, userMessage]),
      };
    });

    const nextMessages = trimMessages([...currentMessages, userMessage]).map(({ role, content: messageContent }) => ({
      role,
      content: messageContent,
    }));

    const attemptRequest = () =>
      sendTutorRequest({
        messages: nextMessages,
        pageContext: currentPageContext,
        action,
        signal: controller.signal,
      });

    try {
      let response;
      try {
        response = await attemptRequest();
      } catch (firstError) {
        if (firstError?.name === 'AbortError') {
          throw firstError;
        }
        // One automatic retry for transient network / server errors
        response = await attemptRequest();
      }

      const assistantMessage = createMessage('assistant', response.answer, {
        sections: response.sections,
        relatedConcepts: uniqueBy(response.relatedConcepts, (concept) => concept?.id),
        sourceLabels: [...new Set((response.sourceLabels || []).filter(Boolean))],
        suggestedActions: response.suggestedActions || [],
        fallbackUsed: response.fallbackUsed === true,
        demoMode: response.demoMode === true,
        providerMeta: response.providerMeta,
      });

      setState((current) => ({
        ...current,
        isLoading: false,
        messages: trimMessages([...current.messages, assistantMessage]),
        currentAction: action,
        error: null,
      }));
    } catch (error) {
      if (error?.name === 'AbortError') {
        return;
      }

      const errorMessage = error?.message || 'Khong the tao phan hoi. Hay thu lai.';
      setState((current) => ({
        ...current,
        isLoading: false,
        error: errorMessage,
      }));

      // Auto-clear error after 8 seconds so users aren't stuck
      setTimeout(() => {
        setState((current) =>
          current.error === errorMessage ? { ...current, error: null } : current,
        );
      }, 8000);
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  }, [state.isLoading, state.messages, state.pageContext]);

  const retryLastMessage = useCallback(async () => {
    if (!lastRequest.prompt || state.isLoading) {
      return;
    }

    await sendMessage(lastRequest.prompt, lastRequest.action);
  }, [lastRequest.action, lastRequest.prompt, sendMessage, state.isLoading]);

  const value = useMemo(
    () => ({
      ...state,
      lastRequest,
      setPageContext,
      openTutor,
      closeTutor,
      collapseTutor,
      toggleTutor,
      toggleContext,
      resetConversation,
      abortCurrentRequest,
      retryLastMessage,
      sendMessage,
    }),
    [
      state,
      lastRequest,
      setPageContext,
      openTutor,
      closeTutor,
      collapseTutor,
      toggleTutor,
      toggleContext,
      resetConversation,
      abortCurrentRequest,
      retryLastMessage,
      sendMessage,
    ],
  );

  return <TutorContext.Provider value={value}>{children}</TutorContext.Provider>;
}
