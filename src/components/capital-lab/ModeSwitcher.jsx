import { motion } from 'framer-motion';
import { Navigation, Compass } from 'lucide-react';
import './ModeSwitcher.css';

export const ModeSwitcher = ({ mode, onModeChange }) => {
  return (
    <div className="mode-switcher">
      <button
        className={`mode-option ${mode === 'guided' ? 'active' : ''}`}
        onClick={() => onModeChange('guided')}
        title="Chế độ hướng dẫn"
      >
        <Navigation size={18} />
        <span>Hướng dẫn</span>
      </button>
      
      <button
        className={`mode-option ${mode === 'explore' ? 'active' : ''}`}
        onClick={() => onModeChange('explore')}
        title="Tự do khám phá"
      >
        <Compass size={18} />
        <span>Khám phá</span>
      </button>

      <motion.div
        className="mode-indicator"
        animate={{
          x: mode === 'guided' ? 0 : '100%'
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};
