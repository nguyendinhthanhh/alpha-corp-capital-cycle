import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  ChevronUp,
  CircleHelp,
  Loader2,
  MessageSquareText,
  PanelRightClose,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  X,
} from 'lucide-react';
import { useAI } from '../../ai/useAI';
import { getContextualActions } from '../../ai/contextualActions';
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

  const blocks = String(text)
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean);

  return blocks.map((block, blockIndex) => {
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

    const formulaLike = /[A-Z][A-Z'0-9\s\-–>]+/.test(block) && /->|→|H'|T'|SX/.test(block);

    return (
      <p key={`block-${blockIndex}`} className={formulaLike ? 'ai-formula-line' : ''}>
        {inline(block)}
      </p>
    );
  });
};

const ContextRow = ({ label, value }) => (
  <div className="ai-context-row">
    <span className="ai-context-label">{label}</span>
    <strong>{value || 'Chua co du lieu'}</strong>
  </div>
);

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`ai-message ${isUser ? 'is-user' : 'is-assistant'}`}>
      <div className="ai-message-badge">
        {isUser ? <MessageSquareText size={14} /> : <Bot size={14} />}
        <span>{isUser ? 'Ban' : 'AI Capital Tutor'}</span>
      </div>

      <div className="ai-message-body">
        {formatText(message.content)}
      </div>

      {!isUser && message.sections?.length > 0 && (
        <div className="ai-message-sections">
          {message.sections.map((section) => (
            <div key={section.title} className="ai-mini-card">
              <span className="ai-mini-card-title">{section.title}</span>
              <div className="ai-mini-card-content">{formatText(section.content)}</div>
            </div>
          ))}
        </div>
      )}

      {!isUser && message.relatedConcepts?.length > 0 && (
        <div className="ai-chip-row">
          {message.relatedConcepts.map((concept) => (
            <span key={concept.id} className="ai-chip">
              {concept.label}
            </span>
          ))}
        </div>
      )}

      {!isUser && message.sourceLabels?.length > 0 && (
        <div className="ai-source-row">
          <span className="ai-source-label">Nguon:</span>
          {message.sourceLabels.map((label) => (
            <span key={label} className="ai-source-pill">
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export function AITutorDrawer() {
  const {
    isOpen,
    isCollapsed,
    isLoading,
    error,
    messages,
    pageContext,
    viewContext,
    closeTutor,
    collapseTutor,
    toggleContext,
    resetConversation,
    sendMessage,
  } = useAI();

  const [draft, setDraft] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedActions = useMemo(
    () => getContextualActions(pageContext),
    [pageContext],
  );

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

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
            className="ai-tutor-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTutor}
          />

          <motion.aside
            className={`ai-tutor-shell ${isCollapsed ? 'is-collapsed' : ''}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label="AI Capital Tutor"
          >
            <div className="ai-tutor-header">
              <div className="ai-tutor-title-block">
                <div className="ai-tutor-eyebrow">
                  <Sparkles size={14} />
                  <span>AI Capital Tutor</span>
                </div>
                <h2>Tro ly phan tich dong von</h2>
                <p>Context-aware, dua tren du lieu da kiem chung trong du an.</p>
              </div>

              <div className="ai-tutor-header-actions">
                <button type="button" className="ai-icon-btn" onClick={toggleContext} aria-pressed={viewContext}>
                  <CircleHelp size={18} />
                  <span>Xem context</span>
                </button>
                <button type="button" className="ai-icon-btn" onClick={resetConversation}>
                  <RotateCcw size={18} />
                  <span>Reset</span>
                </button>
                <button type="button" className="ai-icon-btn" onClick={collapseTutor}>
                  <PanelRightClose size={18} />
                  <span>Dong</span>
                </button>
                <button type="button" className="ai-close-btn" onClick={closeTutor} aria-label="Dong AI Tutor">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="ai-context-strip">
              <span className="ai-context-pill">{pageContext.pageName || 'Tong quan'}</span>
              <span className="ai-context-pill is-muted">{pageContext.sectionTitle || pageContext.chapterTitle || pageContext.quiz?.question || 'Khong co section ro rang'}</span>
              {pageContext.route && <span className="ai-context-pill is-route">{pageContext.route}</span>}
            </div>

            <div className="ai-suggestion-row">
              {suggestedActions.map((action) => (
                <button key={action.id} type="button" className="ai-suggestion-chip" onClick={() => handleAction(action)}>
                  {action.label}
                </button>
              ))}
            </div>

            {viewContext && (
              <div className="ai-context-panel">
                <div className="ai-context-panel-header">
                  <strong>Xem context AI dang dung</strong>
                  <button type="button" className="ai-icon-btn compact" onClick={toggleContext}>
                    <ChevronUp size={16} />
                    <span>Dong</span>
                  </button>
                </div>

                <div className="ai-context-grid">
                  <ContextRow label="Route" value={pageContext.route} />
                  <ContextRow label="Page" value={pageContext.pageName} />
                  <ContextRow label="Section" value={pageContext.sectionTitle || pageContext.chapterTitle} />
                  <ContextRow label="Mission" value={pageContext.activeMission || pageContext.capitalLab?.chapterTitle} />
                  <ContextRow label="Quiz" value={pageContext.quiz?.question || pageContext.currentQuestion?.question} />
                  <ContextRow label="Simulation" value={pageContext.simulation?.scenario} />
                </div>

                <div className="ai-context-tags">
                  {pageContext.relevantConceptIds?.map((id) => (
                    <span key={id} className="ai-context-tag">
                      {id}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="ai-message-list" ref={scrollRef}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="ai-message is-assistant">
                  <div className="ai-message-badge">
                    <Loader2 size={14} className="spin" />
                    <span>AI dang phan tich</span>
                  </div>
                  <p className="ai-loading-copy">Dang tim khung giai thich tu khoa hoc thuat da kiem chung.</p>
                </div>
              )}
            </div>

            {error && (
              <div className="ai-error-banner">
                <ShieldAlert size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="ai-footer-note">
              <span>Khong co API key o frontend. Neu chua cau hinh backend, AI se dung fallback rule-based.</span>
            </div>

            <form className="ai-composer" onSubmit={handleSubmit}>
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hoi theo context hien tai..."
                rows={3}
              />
              <div className="ai-composer-actions">
                <button type="button" className="ai-icon-btn compact" onClick={() => setDraft('')}>
                  <X size={16} />
                  <span>Xoa</span>
                </button>
                <button type="submit" className="ai-send-btn" disabled={isLoading || !draft.trim()}>
                  <Send size={16} />
                  <span>Gui</span>
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
