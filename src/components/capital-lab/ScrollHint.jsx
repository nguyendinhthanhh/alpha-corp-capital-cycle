import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './ScrollHint.css';

export const ScrollHint = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="scroll-hint"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 2 
      }}
    >
      <span className="scroll-hint-text">Cuộn để khám phá</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ChevronDown size={20} />
      </motion.div>
    </motion.div>
  );
};
