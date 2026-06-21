import { motion } from 'framer-motion';
import { RotateCcw, Zap, Play, Compass, Monitor, LayoutDashboard } from 'lucide-react';
import './LabNavigation.css';

export const LabNavigation = ({ 
  mode,
  setMode,
  state,
  activeChapter,
  onTriggerCrisis,
  onReset,
  onToggle2D
}) => {
  return (
    <div className="lab-navigation">
      <div className="lab-controls">
        {/* Mode Toggle */}
        <div className="mode-toggle">
          <button 
            className={`btn btn-icon ${mode === 'guided' ? 'active' : ''}`}
            onClick={() => setMode('guided')}
            title="Chế độ Hướng dẫn"
          >
            <Compass size={18} />
          </button>
          <button 
            className={`btn btn-icon ${mode === 'explore' ? 'active' : ''}`}
            onClick={() => setMode('explore')}
            title="Tự do Khám phá"
          >
            <Monitor size={18} />
          </button>
        </div>

        <div className="divider" />

        {/* 2D Toggle */}
        <button className="btn btn-secondary btn-icon" onClick={onToggle2D} title="Xem sơ đồ 2D">
          <LayoutDashboard size={18} />
        </button>

        <button
          className="btn btn-secondary btn-icon"
          onClick={onReset}
          title="Đặt lại từ đầu"
        >
          <RotateCcw size={18} />
        </button>

        {state === 'normal' && ['shock', 'crisis', 'ripple', 'recovery'].includes(activeChapter) && (
          <motion.button
            className="btn btn-primary lab-control-btn crisis-btn"
            onClick={onTriggerCrisis}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Zap size={18} />
            <span>Kích hoạt khủng hoảng</span>
          </motion.button>
        )}

        {state === 'crisis' && (
          <div className="state-indicator crisis">
            <div className="state-pulse" />
            <span>Đứt gãy thanh khoản</span>
          </div>
        )}

        {state === 'recovery' && (
          <div className="state-indicator recovery">
            <Play size={16} />
            <span>Chu kỳ đã khôi phục</span>
          </div>
        )}
      </div>

      {mode === 'explore' && (
        <div className="lab-instructions">
          <span>Kéo để xoay</span>
          <span>·</span>
          <span>Nhấn node để phân tích</span>
        </div>
      )}
    </div>
  );
};
