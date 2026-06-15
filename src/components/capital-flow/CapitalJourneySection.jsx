import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storyChapters } from '../../data/alphaCorpStory';
import Section from '../shared/Section';
import SectionHeader from '../shared/SectionHeader';
import './CapitalJourneySection.css';

const CapitalJourneySection = ({ isCrisis }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const containerRef = useRef(null);

  const activeNode = storyChapters[activeStepIndex];

  // Auto-progress slightly if crisis is toggled, just to show interaction
  useEffect(() => {
    if (isCrisis && activeStepIndex < 6) {
      // eslint-disable-next-line
      setActiveStepIndex(6); // Jump to Crisis chapter
    }
  }, [isCrisis, activeStepIndex]);

  const handleNext = () => {
    if (activeStepIndex < storyChapters.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  return (
    <Section id="capital-journey" className="journey-section">
        <SectionHeader
          eyebrow="Hồ sơ chi tiết"
          title="Hành trình 10.000 tỷ đồng"
          subtitle="Theo dấu sự chuyển hóa của tư bản từ lúc vay ngân hàng cho đến khi đóng băng thành 3 tòa tháp phần thô dở dang."
        />

        <div className="journey-workspace" ref={containerRef}>
          {/* Path Visualizer */}
          <div className="journey-visualizer">
            <svg className="journey-svg-path" viewBox="0 0 100 800" preserveAspectRatio="none">
              <path 
                d="M 50,20 L 50,780" 
                className="path-bg" 
                fill="none" 
                stroke="var(--border-light)" 
                strokeWidth="4" 
              />
              <motion.path 
                d="M 50,20 L 50,780" 
                className="path-fill" 
                fill="none" 
                stroke={isCrisis && activeStepIndex >= 6 ? "var(--red-500)" : "var(--teal-500)"} 
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: (activeStepIndex + 1) / storyChapters.length }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>

            <div className="journey-nodes">
              {storyChapters.map((node, index) => {
                const isCompleted = index < activeStepIndex;
                const isActive = index === activeStepIndex;
                const isRiskNode = index >= 6;
                
                return (
                  <button 
                    key={node.id} 
                    className={`node-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isCrisis && isRiskNode ? 'danger' : ''}`}
                    onClick={() => setActiveStepIndex(index)}
                    style={{ top: `${(index / (storyChapters.length - 1)) * 100}%` }}
                  >
                    <span className="node-dot">
                      {isCompleted && !isRiskNode && <CheckCircle2 size={14} />}
                      {isCrisis && isRiskNode && isActive && <AlertCircle size={14} />}
                      {(!isCompleted || (isRiskNode && !isCrisis)) && !isActive && <div className="inner-dot" />}
                    </span>
                    <div className="node-label-wrap">
                      <span className="node-label-title">{node.title}</span>
                      <span className="node-label-concept">{node.concept}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Panel */}
          <div className="journey-details">
            <div className="journey-progress-bar">
              <div className="progress-text">Chặng {activeStepIndex + 1} / {storyChapters.length}</div>
              <div className="nav-buttons">
                <button className="nav-btn" onClick={handlePrev} disabled={activeStepIndex === 0}>
                  <ChevronLeft size={20} />
                </button>
                <button className="nav-btn" onClick={handleNext} disabled={activeStepIndex === storyChapters.length - 1}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`active-detail-card ${isCrisis && activeStepIndex >= 6 ? 'crisis-mode' : ''}`}
              >
                <div className="card-header">
                  <span className="concept-badge">{activeNode.concept}</span>
                  <h3>{activeNode.title}</h3>
                </div>

                <div className="card-body">
                  <div className="info-block">
                    <span className="block-label">Thực trạng Alpha Corp</span>
                    <p className="block-content highlight">{activeNode.desc}</p>
                  </div>

                  <div className="info-block theory-block">
                    <span className="block-label">Lý luận MLN122</span>
                    <p className="block-content">{activeNode.theory}</p>
                  </div>
                </div>

                <div className="card-footer">
                  <Link to="/knowledge" className="learn-link">
                    Đọc thêm trong Từ điển khái niệm <ExternalLink size={16} className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>
  );
};

export default CapitalJourneySection;
