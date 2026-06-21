import { MessageSquareText, X } from 'lucide-react';
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
      aria-label={isOpen ? 'Dong AI chat' : 'Mo AI chat'}
      title="AI chat"
      onContextMenu={(event) => {
        event.preventDefault();
        toggleTutor();
      }}
    >
      <span className="ai-fab-icon">{isOpen ? <X size={18} /> : <MessageSquareText size={18} />}</span>
      <span className="ai-fab-copy">
        <strong>{isOpen ? 'Dong chat' : 'AI chat'}</strong>
        <span>{isOpen ? 'Tap de dong' : 'Hoi theo trang'}</span>
      </span>
    </button>
  );
}
