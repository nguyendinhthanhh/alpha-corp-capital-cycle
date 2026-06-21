import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import './RecoveryChallenge.css';

export const RecoveryChallenge = ({ 
  controls, 
  values, 
  onValueChange,
  state
}) => {
  const isRecovered = state === 'recovery';

  const getControlStatus = (control) => {
    const value = values[control.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())];
    if (value >= control.optimal.min && value <= control.optimal.max) {
      return 'optimal';
    }
    return 'warning';
  };

  return (
    <motion.div
      className="recovery-challenge"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="recovery-header">
        <div>
          <span className="eyebrow">Thách thức khôi phục</span>
          <h3>Điều chỉnh điều kiện tuần hoàn</h3>
          <p>Cân bằng ba yếu tố để khôi phục dòng H' → T'</p>
        </div>

        {isRecovered && (
          <div className="recovery-badge">
            <CheckCircle size={20} />
            <span>Đã khôi phục</span>
          </div>
        )}
      </div>

      <div className="recovery-controls-grid">
        {controls.map((control) => {
          const key = control.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          const value = values[key];
          const status = getControlStatus(control);

          return (
            <div key={control.id} className={`recovery-control ${status}`}>
              <div className="control-header">
                <label htmlFor={control.id}>
                  {control.label}
                  {status === 'optimal' && <CheckCircle size={14} />}
                  {status === 'warning' && <AlertCircle size={14} />}
                </label>
                <span className="control-value">
                  {value}{control.unit}
                </span>
              </div>

              <input
                id={control.id}
                type="range"
                min={control.min}
                max={control.max}
                value={value}
                onChange={(e) => onValueChange(key, parseInt(e.target.value))}
                className="control-slider"
              />

              <div className="control-range">
                <span>{control.min}{control.unit}</span>
                <span className="optimal-range">
                  Tối ưu: {control.optimal.min}–{control.optimal.max}{control.unit}
                </span>
                <span>{control.max}{control.unit}</span>
              </div>

              <p className="control-description">{control.description}</p>
            </div>
          );
        })}
      </div>

      <div className="recovery-note">
        <TrendingUp size={16} />
        <p>
          <strong>Lưu ý:</strong> Mô hình giáo dục phục vụ học tập, không phải công cụ tư vấn tài chính.
        </p>
      </div>
    </motion.div>
  );
};
