import { motion } from 'framer-motion';
import './ChapterRail.css';

export const ChapterRail = ({ chapters, activeChapter, onNavigate }) => {
  return (
    <div className="chapter-rail">
      <div className="chapter-rail-container">
        {chapters.map((chapter, index) => {
          const isActive = chapter.id === activeChapter;
          const chapterOrder = chapters.map(ch => ch.id);
          const activeIndex = chapterOrder.indexOf(activeChapter);
          const isCompleted = index < activeIndex;

          return (
            <button
              key={chapter.id}
              className={`rail-chapter ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onNavigate(chapter.id)}
              title={chapter.title}
            >
              <div className="rail-chapter-number">
                {String(chapter.number).padStart(2, '0')}
              </div>
              <div className="rail-chapter-label">{chapter.symbol}</div>
              
              {isActive && (
                <motion.div
                  className="rail-active-indicator"
                  layoutId="rail-active"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="rail-progress-line">
        <div 
          className="rail-progress-fill"
          style={{ 
            height: `${((chapters.findIndex(ch => ch.id === activeChapter) + 1) / chapters.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};
