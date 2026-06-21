import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Monitor,
  LayoutDashboard,
  RotateCcw,
  Zap,
  Play
} from 'lucide-react';
import './LabNavigation.css';

export const LabNavigation = ({
  mode,
  setMode,
  state,
  activeMission,
  onTriggerCrisis,
  onReset,
  onToggle2D
}) => {
  const showCrisisBtn = activeMission === 'crisis' && state === 'normal';

  return (
    <div className="lab-nav" role="toolbar" aria-label="Điều khiển phòng lab">
      <div className="lab-nav-bar">
        {/* Mode Toggle Group */}
        <div className="ln-mode-group" role="radiogroup" aria-label="Chế độ hiển thị">
          <button
            className={`ln-mode-btn ${mode === 'guided' ? 'ln-mode-btn--active' : ''}`}
            onClick={() => setMode('guided')}
            role="radio"
            aria-checked={mode === 'guided'}
            title="Chế độ Hướng dẫn"
          >
            <Compass size={16} aria-hidden="true" />
          </button>
          <button
            className={`ln-mode-btn ${mode === 'explore' ? 'ln-mode-btn--active' : ''}`}
            onClick={() => setMode('explore')}
            role="radio"
            aria-checked={mode === 'explore'}
            title="Tự do Khám phá"
          >
            <Monitor size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Divider */}
        <div className="ln-divider" aria-hidden="true" />

        {/* 2D Toggle */}
        <button
          className="ln-icon-btn"
          onClick={onToggle2D}
          title="Xem sơ đồ 2D"
          aria-label="Chuyển đổi chế độ 2D"
        >
          <LayoutDashboard size={16} aria-hidden="true" />
        </button>

        {/* Reset */}
        <button
          className="ln-icon-btn"
          onClick={onReset}
          title="Đặt lại từ đầu"
          aria-label="Đặt lại phòng lab"
        >
          <RotateCcw size={16} aria-hidden="true" />
        </button>

        {/* Crisis Trigger */}
        <AnimatePresence>
          {showCrisisBtn && (
            <motion.button
              className="ln-crisis-btn"
              onClick={onTriggerCrisis}
              initial={{ opacity: 0, scale: 0.85, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.85, width: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Kích hoạt cú sốc thị trường"
            >
              <Zap size={16} aria-hidden="true" />
              <span>Kích hoạt cú sốc</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* State Indicators */}
        {state === 'crisis' && (
          <div className="ln-state-badge ln-state-badge--crisis" role="status">
            <span className="ln-pulse" />
            <span>Đứt gãy</span>
          </div>
        )}

        {state === 'recovery' && (
          <div className="ln-state-badge ln-state-badge--recovery" role="status">
            <Play size={14} aria-hidden="true" />
            <span>Đã khôi phục</span>
          </div>
        )}
      </div>
    </div>
  );
};
