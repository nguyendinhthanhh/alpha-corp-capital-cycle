import { useCallback, useEffect, useMemo, useState } from 'react';
import { getContextualActions } from './contextualActions';
import { sendTutorRequest } from './tutorClient';
import { clearTutorState, loadTutorState, saveTutorState } from './tutorStorage';
import { TutorContext } from './TutorContext';
const MAX_MESSAGES = 24;

const buildWelcomeMessage = () => ({
  id: `welcome-${Date.now()}`,
  role: 'assistant',
  content:
    'Mình là AI Capital Tutor. Mình chỉ dùng kiến thức học thuật đã kiểm chứng trong dự án này để giải thích, phân tích mô phỏng, hỗ trợ quiz và liên hệ Alpha Corp. Nếu bạn muốn, hãy dùng một gợi ý ngắn hoặc hỏi trực tiếp theo ngữ cảnh hiện tại.',
  sourceLabels: ['Verified academic context'],
  fallbackUsed: true,
});

const defaultState = {
  isOpen: false,
  isCollapsed: false,
  isLoading: false,
  error: null,
  messages: [buildWelcomeMessage()],
  pageContext: {
    route: '/',
    pageName: 'Tổng quan',
    relevantConceptIds: ['capital-circuit', 'money-capital'],
    sourceLabels: ['Case Alpha Corp'],
  },
  currentAction: null,
  viewContext: false,
};

const createMessage = (role, content, extra = {}) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
  ...extra,
});

const trimMessages = (messages) => messages.slice(-MAX_MESSAGES);

const mergeContext = (current, next = {}) => ({
  ...current,
  ...next,
  relevantConceptIds: [...new Set([...(current.relevantConceptIds || []), ...(next.relevantConceptIds || [])])],
  sourceLabels: [...new Set([...(current.sourceLabels || []), ...(next.sourceLabels || [])])],
});

export function AIProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = loadTutorState();
    return saved
      ? {
          ...defaultState,
          ...saved,
          messages: saved.messages?.length ? saved.messages : defaultState.messages,
        }
      : defaultState;
  });

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
    setState((current) => ({
      ...current,
      messages: [buildWelcomeMessage()],
      currentAction: null,
      error: null,
    }));
    clearTutorState();
  }, []);

  const sendMessage = useCallback(async (message, action = null) => {
    const content = typeof message === 'string' ? message.trim() : '';
    if (!content) return;

    let userMessage = null;

    setState((current) => {
      if (current.isLoading) {
        return current;
      }

      userMessage = createMessage('user', content, { action });

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

    if (!userMessage) {
      return;
    }

    const currentPageContext = state.pageContext;
    const currentMessages = trimMessages([...state.messages, userMessage]).map(({ role, content: msgContent }) => ({
      role,
      content: msgContent,
    }));

    try {
      const response = await sendTutorRequest({
        messages: currentMessages,
        pageContext: currentPageContext,
        action,
      });

      const assistantMessage = createMessage('assistant', response.answer, {
        sections: response.sections,
        relatedConcepts: response.relatedConcepts,
        sourceLabels: response.sourceLabels,
        suggestedActions: response.suggestedActions || getContextualActions(currentPageContext),
        fallbackUsed: response.fallbackUsed !== false,
      });

      setState((current) => ({
        ...current,
        isLoading: false,
        messages: trimMessages([...current.messages, assistantMessage]),
        currentAction: action,
        error: null,
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        isLoading: false,
        error: error?.message || 'Khong the tao phan hoi.',
        messages: trimMessages([
          ...current.messages,
          createMessage('assistant', 'Khong the ket noi AI. He thong dang hien thi phan phan tich hoc thuat da duoc nhom kiem chung.', {
            fallbackUsed: true,
            sourceLabels: ['Verified academic context'],
          }),
        ]),
      }));
    }
  }, [state.messages, state.pageContext]);

  const value = useMemo(
    () => ({
      ...state,
      setPageContext,
      openTutor,
      closeTutor,
      collapseTutor,
      toggleTutor,
      toggleContext,
      resetConversation,
      sendMessage,
    }),
    [
      state,
      setPageContext,
      openTutor,
      closeTutor,
      collapseTutor,
      toggleTutor,
      toggleContext,
      resetConversation,
      sendMessage,
    ],
  );

  return <TutorContext.Provider value={value}>{children}</TutorContext.Provider>;
}
