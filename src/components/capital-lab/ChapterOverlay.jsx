import { motion, AnimatePresence } from 'framer-motion';
import './ChapterOverlay.css';

export const ChapterOverlay = ({ chapter, isVisible }) => {
  if (!chapter) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="chapter-overlay"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {chapter.eyebrow && (
            <span className="eyebrow">{chapter.eyebrow}</span>
          )}
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
          {chapter.theory && (
            <div className="theory-note">
              <span className="detail-label">Lý luận MLN122</span>
              <p>{chapter.theory}</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
