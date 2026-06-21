import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './NodeDetailPanel.css';

export const NodeDetailPanel = ({ node, stakeholder, onClose }) => {
  const item = node || stakeholder;
  if (!item) return null;

  const isStakeholder = !!stakeholder;

  return (
    <AnimatePresence>
      <motion.div
        className="node-detail-panel"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="panel-header">
          <div>
            <span className="eyebrow">
              {isStakeholder ? 'Chủ thể liên quan' : 'Node kinh tế'}
            </span>
            <h3>{item.title}</h3>
          </div>
          <button
            className="panel-close-btn"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        <div className="panel-content">
          {node && (
            <>
              <div className="detail-section">
                <span className="detail-label">Ký hiệu</span>
                <p className="detail-value">{node.key}</p>
              </div>

              <div className="detail-section">
                <span className="detail-label">Mô tả</span>
                <p>{node.description}</p>
              </div>

              <div className="detail-section">
                <span className="detail-label">Vai trò trong chu kỳ</span>
                <p>{node.detail}</p>
              </div>
            </>
          )}

          {stakeholder && (
            <>
              <div className="detail-section">
                <span className="detail-label">Vai trò</span>
                <p className="detail-value">{stakeholder.role}</p>
              </div>

              <div className="detail-section">
                <span className="detail-label">Ảnh hưởng thông thường</span>
                <p>{stakeholder.impact}</p>
              </div>

              <div className="detail-section crisis-effect">
                <span className="detail-label">Tác động khủng hoảng</span>
                <p>{stakeholder.crisisEffect}</p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
