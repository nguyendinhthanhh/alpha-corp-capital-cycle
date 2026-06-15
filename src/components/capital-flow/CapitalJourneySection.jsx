import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { flowNodes } from '../../data/caseData';
import './CapitalJourneySection.css';

const CapitalJourneySection = () => {
  const [activeNodeId, setActiveNodeId] = useState(flowNodes[0].id);
  
  const activeNode = flowNodes.find(n => n.id === activeNodeId) || flowNodes[0];

  return (
    <section id="capital-journey" className="journey-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Giai đoạn 02</span>
          <h2 className="section-title">Hành trình 10.000 tỷ đồng</h2>
          <p className="section-subtitle">
            Theo dõi sự chuyển hóa hình thái tư bản từ tiền tệ ban đầu qua sản xuất, và cách rủi ro được tích tụ ở mỗi khâu.
          </p>
        </div>

        <div className="journey-interactive">
          {/* Flow Path UI */}
          <div className="journey-flow-path">
            {flowNodes.map((node, index) => {
              const isActive = node.id === activeNodeId;
              
              return (
                <div key={node.id} className="flow-step">
                  <button 
                    className={`step-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveNodeId(node.id)}
                    aria-pressed={isActive}
                  >
                    <div className="step-circle">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <span className="step-label">{node.label}</span>
                    <span className="step-form">{node.capitalForm}</span>
                  </button>
                  {index < flowNodes.length - 1 && (
                    <div className={`step-connector ${isActive ? 'active-after' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Details Panel */}
          <div className="journey-details-panel">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="details-content"
              >
                <div className="details-header">
                  <h3>{activeNode.label}</h3>
                  <span className="form-badge">{activeNode.capitalForm}</span>
                </div>
                
                <div className="details-grid">
                  <div className="detail-box">
                    <span className="detail-eyebrow">Hoạt động thực tế</span>
                    <p>{activeNode.activity}</p>
                  </div>
                  
                  <div className="detail-box theory-box">
                    <span className="detail-eyebrow">Lý luận MLN122</span>
                    <p>{activeNode.theory}</p>
                  </div>
                  
                  <div className="detail-box risk-box">
                    <span className="detail-eyebrow">Điểm rủi ro</span>
                    <p>{activeNode.risk}</p>
                  </div>
                </div>

                <div className="details-footer">
                  <Link to="/knowledge" className="learn-more-link">
                    Xem lý luận chi tiết về {activeNode.capitalForm} <ExternalLink size={16} className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapitalJourneySection;
