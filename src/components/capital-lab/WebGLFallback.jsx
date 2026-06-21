import { AlertCircle, ArrowDown } from 'lucide-react';
import './WebGLFallback.css';
import { capitalNodes } from '../../data/capitalLabData';

export const WebGLFallback = ({ onToggle3D, isSupported }) => {
  return (
    <div className="webgl-fallback">
      <div className="fallback-content">
        <div className="fallback-header">
          {isSupported ? (
            <h2 style={{ color: 'var(--teal-400)' }}>Sơ đồ chu kỳ 2D</h2>
          ) : (
            <>
              <AlertCircle size={24} className="text-warning" />
              <h2>Phiên bản 2D (WebGL không khả dụng)</h2>
            </>
          )}
        </div>
        <p className="fallback-desc">
          {isSupported 
            ? "Bạn đang xem sơ đồ dòng vốn ở dạng 2D trực diện."
            : "Trình duyệt của bạn không hỗ trợ WebGL. Sơ đồ 2D dưới đây giúp bạn tiếp tục theo dõi nội dung."}
        </p>

        <div className="fallback-flow">
          {capitalNodes.map((node, index) => (
            <div key={node.id} className="fallback-step">
              <div className="fallback-node" style={{ borderColor: node.color }}>
                <div className="node-key" style={{ color: node.color }}>{node.key}</div>
                <h3 className="node-title">{node.title}</h3>
                <p className="node-desc">{node.description}</p>
                <div className="node-detail">{node.detail}</div>
              </div>
              {index < capitalNodes.length - 1 && (
                <div className="fallback-arrow">
                  <ArrowDown size={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center mt-8">
          {isSupported && (
            <button className="btn btn-primary" onClick={onToggle3D}>
              Quay lại 3D
            </button>
          )}
          <a href="/" className="btn btn-secondary">
            Về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};
