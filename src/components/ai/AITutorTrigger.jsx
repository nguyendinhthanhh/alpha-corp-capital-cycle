import { Bot, X } from 'lucide-react';
import { useAI } from '../../ai/useAI';
import './AITutorTrigger.css';

export function AITutorTrigger() {
  const { openTutor, closeTutor, isOpen } = useAI();

  const handleClick = () => {
    if (isOpen) {
      closeTutor();
      return;
    }
    openTutor();
  };

  return (
    <button
      type="button"
      className={`ai-fab ${isOpen ? 'is-open' : ''}`}
      onClick={handleClick}
      aria-label={isOpen ? 'Đóng AI Chat' : 'Mở AI Chat'}
      title="AI Capital Tutor"
    >
      <span className="ai-fab-glow" />
      <span className="ai-fab-icon">
        {isOpen ? <X size={20} /> : <Bot size={20} />}
      </span>
      <span className="ai-fab-label">{isOpen ? 'Đóng' : 'AI Chat'}</span>
    </button>
  );
}
