import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './CrisisSequence.css';

const crisisSteps = [
  "01 Tín dụng bị siết",
  "02 Lãi suất tăng",
  "03 Sức mua giảm",
  "04 H' không bán được",
  "05 T' không hình thành"
];

export const CrisisSequence = ({ state, crisisStep, setCrisisStep }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isActive = state === 'warning' || state === 'crisis';

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(isActive);
    }, 0);

    if (!isActive) {
      return () => clearTimeout(showTimer);
    }

    if (crisisStep < crisisSteps.length) {
      const timer = setTimeout(() => {
        setCrisisStep(prev => prev + 1);
      }, 800); // Sequence runs every 800ms

      return () => {
        clearTimeout(showTimer);
        clearTimeout(timer);
      };
    }

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isActive, crisisStep, setCrisisStep]);

  return (
    <AnimatePresence>
      {isVisible && isActive && (
        <motion.div 
          className="crisis-sequence"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {crisisSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              className={`crisis-step ${idx < crisisStep ? 'active' : ''} ${idx === crisisStep - 1 ? 'current' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: idx <= crisisStep ? 1 : 0, x: idx <= crisisStep ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              {step}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
