import { Sparkles, X } from 'lucide-react';
import { useAI } from '../../ai/useAI';
import './AITutorTrigger.css';

export function AITutorTrigger() {
  const { openTutor, closeTutor, isOpen, toggleTutor } = useAI();

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
      aria-label={isOpen ? 'Đóng AI Capital Tutor' : 'Mở AI Capital Tutor'}
      title="Hỏi AI Capital Tutor"
      onContextMenu={(event) => {
        event.preventDefault();
        toggleTutor();
      }}
    >
      <span className="ai-fab-icon">{isOpen ? <X size={18} /> : <Sparkles size={18} />}</span>
      <span className="ai-fab-label">{isOpen ? 'Đóng AI' : 'Hỏi AI'}</span>
    </button>
  );
}

