import { ChevronLeft, ChevronRight } from 'lucide-react';
import { labChapters } from '../../data/capitalLabData';
import './GuidedPanel.css';

export const GuidedPanel = ({ activeChapter, prevChapter, nextChapter, mode }) => {
  if (mode !== 'guided') return null;

  const currentChapterIndex = labChapters.findIndex(c => c.id === activeChapter);
  const chapter = labChapters[currentChapterIndex];

  if (!chapter) return null;

  const isFirst = currentChapterIndex === 0;
  const isLast = currentChapterIndex === labChapters.length - 1;

  return (
    <div className="guided-panel" role="region" aria-live="polite" aria-atomic="true">
      <div className="guided-panel-content" tabIndex={0}>
        <span className="eyebrow">{chapter.eyebrow}</span>
        <h2>{chapter.title}</h2>
        <p className="chapter-desc">{chapter.description}</p>
        
        <div className="theory-note">
          <span className="detail-label">Lý luận MLN122:</span>
          <p>{chapter.theory}</p>
        </div>

        <div className="takeaway-note">
          <span className="detail-label">Takeaway:</span>
          <p>{chapter.takeaway}</p>
        </div>
      </div>

      <div className="guided-panel-footer">
        <button 
          className="btn btn-secondary" 
          onClick={prevChapter}
          disabled={isFirst}
          aria-label="Quay lại chặng trước"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          Quay lại
        </button>
        <button 
          className="btn btn-primary" 
          onClick={nextChapter}
          disabled={isLast}
          aria-label="Tiếp tục chặng tiếp theo"
        >
          Tiếp tục
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
