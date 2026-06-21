import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import './ChapterPanel.css';

export const ChapterPanel = ({ 
  chapter, 
  chapters,
  onNext, 
  onPrevious,
  onTriggerCrisis,
  state,
  canTriggerCrisis
}) => {
  if (!chapter) return null;

  const currentIndex = chapters.findIndex(ch => ch.id === chapter.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < chapters.length - 1;

  return (
    <motion.div
      className="chapter-panel"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      key={chapter.id}
    >
      <div className="chapter-panel-header">
        <span className="chapter-eyebrow">{chapter.eyebrow}</span>
        <div className="chapter-symbol">{chapter.symbol}</div>
      </div>

      <h2 className="chapter-title">{chapter.title}</h2>

      <div className="chapter-content">
        <div className="chapter-section">
          <span className="section-label">Trường hợp Alpha Corp</span>
          <p>{chapter.description}</p>
        </div>

        <div className="chapter-section">
          <span className="section-label">Lý luận MLN122</span>
          <p>{chapter.theory}</p>
        </div>

        {chapter.takeaway && (
          <div className="chapter-takeaway">
            <span className="takeaway-label">Điểm then chốt</span>
            <p>{chapter.takeaway}</p>
          </div>
        )}
      </div>

      <div className="chapter-controls">
        <button
          className="btn btn-secondary chapter-nav-btn"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <ChevronLeft size={18} />
          <span>Quay lại</span>
        </button>

        {canTriggerCrisis && state === 'normal' && (
          <button
            className="btn btn-danger chapter-crisis-btn"
            onClick={onTriggerCrisis}
          >
            <Zap size={18} />
            <span>Kích hoạt khủng hoảng</span>
          </button>
        )}

        {state === 'crisis' && chapter.id === 'crisis' && (
          <div className="crisis-indicator">
            <div className="crisis-pulse" />
            <span>Khủng hoảng đang diễn ra</span>
          </div>
        )}

        <button
          className="btn btn-primary chapter-nav-btn"
          onClick={onNext}
          disabled={!hasNext}
        >
          <span>Tiếp tục</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="chapter-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / chapters.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          Chặng {chapter.number} / {chapters.length}
        </span>
      </div>
    </motion.div>
  );
};
