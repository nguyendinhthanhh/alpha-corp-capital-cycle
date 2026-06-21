import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  ChevronDown,
  ChevronUp,
  OctagonX,
  RotateCcw,
  Send,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { getContextualActions } from '../../ai/contextualActions';
import { useAI } from '../../ai/useAI';
import './AITutorDrawer.css';

const formatText = (text) => {
  if (!text) return [];

  const inline = (value) => {
    const parts = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[(.*?)\]\((https?:\/\/[^\s)]+)\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(value)) !== null) {
      if (match.index > lastIndex) {
        parts.push(value.slice(lastIndex, match.index));
      }

      if (match[0].startsWith('**')) {
        parts.push(<strong key={`${match.index}-strong`}>{match[0].slice(2, -2)}</strong>);
      } else if (match[0].startsWith('`')) {
        parts.push(<code key={`${match.index}-code`}>{match[0].slice(1, -1)}</code>);
      } else {
        const label = match[2] || match[1] || match[3];
        const href = match[3];
        parts.push(
          <a key={`${match.index}-link`} href={href} target="_blank" rel="noreferrer">
            {label}
          </a>,
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < value.length) {
      parts.push(value.slice(lastIndex));
    }

    return parts.length ? parts : [value];
  };

  return String(text)
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((block, blockIndex) => {
      const lines = block.split('\n');
      const listItems = lines.filter((line) => /^\s*[-*]\s+/.test(line));
      const numberedItems = lines.filter((line) => /^\s*\d+\.\s+/.test(line));

      if (listItems.length > 0) {
        return (
          <ul key={`block-${blockIndex}`} className="ai-text-list">
            {listItems.map((item, itemIndex) => (
              <li key={`${blockIndex}-${itemIndex}`}>{inline(item.replace(/^\s*[-*]\s+/, ''))}</li>
            ))}
          </ul>
        );
      }

      if (numberedItems.length > 0) {
        return (
          <ol key={`block-${blockIndex}`} className="ai-text-list">
            {numberedItems.map((item, itemIndex) => (
              <li key={`${blockIndex}-${itemIndex}`}>{inline(item.replace(/^\s*\d+\.\s+/, ''))}</li>
            ))}
          </ol>
        );
      }

      const formulaLike = /[A-Z][A-Z'0-9\s\->]+/.test(block) && /->|H'|T'|SX/.test(block);

      return (
        <p key={`block-${blockIndex}`} className={formulaLike ? 'ai-formula-line' : ''}>
          {inline(block)}
        </p>
      );
    });
};

const TypingIndicator = () => (
  <div className="ai-typing-indicator">
    <span className="ai-typing-dot" />
    <span className="ai-typing-dot" />
    <span className="ai-typing-dot" />
  </div>
);

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const [showDetails, setShowDetails] = useState(false);

  const relatedConcepts = Array.isArray(message.relatedConcepts)
    ? message.relatedConcepts
        .filter((concept, index, array) =>
          concept?.id && array.findIndex((item) => item?.id === concept.id) === index,
        )
        .slice(0, 3)
    : [];

  const hasSections = !isUser && message.sections?.length > 0;
  const hasChips = !isUser && relatedConcepts.length > 0;
  const hasDetails = hasSections || hasChips;

  return (
    <motion.div
      className={`ai-msg ${isUser ? 'ai-msg--user' : 'ai-msg--bot'}`}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    >
      {!isUser && (
        <div className="ai-msg-avatar">
          <Bot size={14} />
        </div>
      )}

      <div className="ai-msg-content">
        {message.fallbackUsed && (
          <div className="ai-fallback-badge">
            {message.demoMode ? 'Che do demo' : 'Phan tich du phong'}
          </div>
        )}
        <div className="ai-msg-body">{formatText(message.content)}</div>

        {hasDetails && (
          <>
            <button
              type="button"
              className="ai-detail-toggle"
              onClick={() => setShowDetails((value) => !value)}
            >
              {showDetails ? 'An chi tiet' : 'Xem chi tiet'}
              {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            {showDetails && (
              <motion.div
                className="ai-msg-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {hasSections && (
                  <div className="ai-msg-sections">
                    {message.sections.map((section) => (
                      <div key={section.title} className="ai-section-card">
                        <span className="ai-section-title">{section.title}</span>
                        <div className="ai-section-body">{formatText(section.content)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {hasChips && (
                  <div className="ai-chips">
                    {relatedConcepts.map((concept, index) => (
                      <span key={`${concept.id}-${index}`} className="ai-chip">
                        {concept.label}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

const ContextRow = ({ label, value }) => (
  <div className="ai-ctx-row">
    <span className="ai-ctx-key">{label}</span>
    <span className="ai-ctx-val">{value || '—'}</span>
  </div>
);

const ContextPanel = ({ pageContext, onClose }) => (
  <motion.div
    className="ai-ctx-panel"
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="ai-ctx-header">
      <span className="ai-ctx-title">
        <Zap size={12} />
        Context dang dung
      </span>
      <button type="button" className="ai-btn-icon" onClick={onClose}>
        <ChevronUp size={14} />
      </button>
    </div>
    <div className="ai-ctx-grid">
      <ContextRow label="Route" value={pageContext.route} />
      <ContextRow label="Page" value={pageContext.pageName} />
      <ContextRow label="Section" value={pageContext.sectionTitle} />
      <ContextRow label="Stage" value={pageContext.activeStage?.title || pageContext.activeStage?.formula} />
      <ContextRow label="State" value={pageContext.economicState} />
      <ContextRow label="Stakeholder" value={pageContext.selectedStakeholder?.name} />
      <ContextRow label="Capital Lab" value={pageContext.capitalLab?.chapterTitle} />
      <ContextRow label="Simulation" value={pageContext.simulation?.scenario} />
      <ContextRow label="Quiz" value={pageContext.quiz?.question} />
    </div>
    {pageContext.relevantConceptIds?.length > 0 && (
      <div className="ai-ctx-tags">
        {pageContext.relevantConceptIds.map((id) => (
          <span key={id} className="ai-ctx-tag">{id}</span>
        ))}
      </div>
    )}
  </motion.div>
);

export function AITutorDrawer() {
  const {
    isOpen,
    isLoading,
    error,
    messages,
    pageContext,
    viewContext,
    closeTutor,
    toggleContext,
    resetConversation,
    abortCurrentRequest,
    retryLastMessage,
    sendMessage,
  } = useAI();

  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedActions = useMemo(() => getContextualActions(pageContext), [pageContext]);
  const contextSummary = useMemo(
    () => [
      pageContext.pageName,
      pageContext.activeStage?.title || pageContext.activeStage?.formula,
      pageContext.capitalLab?.chapterTitle,
      pageContext.economicState === 'crisis' ? 'Khung hoang dang hoat dong' : '',
    ].filter(Boolean).join(' · '),
    [pageContext],
  );

  useEffect(() => {
    if (!isOpen) return;
    const element = scrollRef.current;
    if (element) {
      requestAnimationFrame(() => {
        element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeTutor();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeTutor, isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const prompt = draft.trim();
    if (!prompt) return;
    setDraft('');
    await sendMessage(prompt, null);
  };

  const handleAction = async (action) => {
    await sendMessage(action.prompt, action.id);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="ai-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeTutor}
          />

          <motion.aside
            className="ai-drawer"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            role="dialog"
            aria-modal="false"
            aria-label="AI Capital Tutor"
          >
            <div className="ai-header">
              <div className="ai-header-left">
                <div className="ai-header-avatar">
                  <Sparkles size={16} />
                </div>
                <div className="ai-header-info">
                  <h2>AI Capital Tutor</h2>
                  <span className="ai-header-status">
                    <span className="ai-status-dot" />
                    {isLoading ? 'Dang goi AI' : 'San sang'} · {pageContext.pageName || 'Tong quan'}
                  </span>
                </div>
              </div>

              <div className="ai-header-actions">
                <button
                  type="button"
                  className="ai-btn-icon"
                  onClick={toggleContext}
                  aria-pressed={viewContext}
                  title="Xem context"
                >
                  {viewContext ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button
                  type="button"
                  className="ai-btn-icon"
                  onClick={resetConversation}
                  title="Reset conversation"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  className="ai-btn-icon ai-btn-close"
                  onClick={closeTutor}
                  aria-label="Dong"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="ai-context-indicator">
              <span>Dang phan tich:</span>
              <strong>{contextSummary || pageContext.pageName || 'Context hien tai'}</strong>
              <button type="button" className="ai-context-button" onClick={toggleContext}>
                Xem context AI dang dung
              </button>
            </div>

            <AnimatePresence>
              {viewContext && (
                <ContextPanel pageContext={pageContext} onClose={toggleContext} />
              )}
            </AnimatePresence>

            <div className="ai-messages" ref={scrollRef}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="ai-msg ai-msg--bot">
                  <div className="ai-msg-avatar">
                    <Bot size={14} />
                  </div>
                  <div className="ai-msg-content">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="ai-error" role="alert">
                <span>{error}</span>
              </div>
            )}

            {messages.length <= 1 && (
              <div className="ai-suggestions">
                {suggestedActions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    className="ai-suggestion"
                    onClick={() => handleAction(action)}
                  >
                    <Sparkles size={12} />
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            <form className="ai-composer" onSubmit={handleSubmit}>
              <div className="ai-composer-wrap">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhap cau hoi, Enter de gui..."
                  rows={1}
                />
                <button
                  type="submit"
                  className="ai-send"
                  disabled={isLoading || !draft.trim()}
                  aria-label="Gui"
                >
                  <Send size={16} />
                </button>
              </div>

              <div className="ai-composer-actions">
                <button type="button" className="ai-inline-action" onClick={resetConversation}>
                  <RotateCcw size={14} />
                  Clear
                </button>
                <button type="button" className="ai-inline-action" onClick={retryLastMessage} disabled={isLoading}>
                  Retry
                </button>
                <button type="button" className="ai-inline-action" onClick={abortCurrentRequest} disabled={!isLoading}>
                  <OctagonX size={14} />
                  Stop
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
