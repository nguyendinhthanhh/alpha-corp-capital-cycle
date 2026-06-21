import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { labMissions } from '../../data/capitalLabData';
import './GuidedPanel.css';

const contentVariants = {
  enter: { opacity: 0, y: 6 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

export const GuidedPanel = ({ activeMission, prevChapter, nextChapter, mode }) => {
  if (mode !== 'guided') return null;

  const currentIndex = labMissions.findIndex(m => m.id === activeMission);
  const mission = labMissions[currentIndex];

  if (!mission) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === labMissions.length - 1;

  return (
    <div
      className="guided-panel"
      role="region"
      aria-label="Bảng nhiệm vụ hướng dẫn"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mission.id}
          className="guided-panel-content"
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          tabIndex={0}
        >
          <span className="gp-eyebrow">
            NHIỆM VỤ {mission.number} / 6
          </span>

          <h2 className="gp-title">{mission.title}</h2>

          <p className="gp-description">{mission.description}</p>

          <div className="gp-theory-box">
            <span className="gp-box-label">LÝ LUẬN MLN122</span>
            <p>{mission.theory}</p>
          </div>

          <div className="gp-takeaway-box">
            <span className="gp-box-label">TAKEAWAY</span>
            <p>{mission.takeaway}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="guided-panel-footer">
        <button
          className="gp-nav-btn"
          onClick={prevChapter}
          disabled={isFirst}
          aria-label="Quay lại nhiệm vụ trước"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Quay lại</span>
        </button>

        <button
          className="gp-nav-btn gp-nav-btn--next"
          onClick={nextChapter}
          disabled={isLast}
          aria-label="Tiếp tục nhiệm vụ tiếp theo"
        >
          <span>Tiếp tục</span>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
