import { useLayoutEffect, useRef, useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { capitalJourneyFlowNodes, capitalJourneySteps } from '../../data/storyData';
import Section from '../shared/Section';
import Atmosphere from '../shared/Atmosphere';
import SectionHeader from '../shared/SectionHeader';
import './CapitalJourneySection.css';

const CapitalJourneySection = ({ isCrisis }) => {
  const crisisStartIndex = 5;
  const totalSteps = capitalJourneySteps.length;
  const eyebrow = 'H\u1ed3 s\u01a1 chi ti\u1ebft';
  const title = 'H\u00e0nh tr\u00ecnh 10.000 t\u1ef7 \u0111\u1ed3ng';
  const subtitle =
    'Theo d\u1ea5u s\u1ef1 chuy\u1ec3n h\u00f3a c\u1ee7a t\u01b0 b\u1ea3n t\u1eeb l\u00fac vay ng\u00e2n h\u00e0ng cho \u0111\u1ebfn khi \u0111\u00f3ng b\u0103ng th\u00e0nh 3 t\u00f2a th\u00e1p ph\u1ea7n th\u00f4 d\u1edf dang.';
  const progressLabel = 'Ch\u1eb7ng';
  const alphaCorpLabel = 'Th\u1ef1c tr\u1ea1ng Alpha Corp';
  const theoryLabel = 'L\u00fd lu\u1eadn MLN122';
  const learnMoreLabel = '\u0110\u1ecdc th\u00eam trong T\u1eeb \u0111i\u1ec3n kh\u00e1i ni\u1ec7m';
  const timelineRef = useRef(null);
  const dotRefs = useRef([]);
  const [railMetrics, setRailMetrics] = useState({
    axisLeft: 0,
    axisTop: 0,
    axisHeight: 0,
    progressHeight: 0,
  });
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const effectiveStepIndex =
    isCrisis && activeStepIndex < crisisStartIndex ? crisisStartIndex : activeStepIndex;
  const activeNode = capitalJourneySteps[effectiveStepIndex];

  const handleNext = () => {
    if (effectiveStepIndex < capitalJourneySteps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (effectiveStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1);
    }
  };

  useLayoutEffect(() => {
    const timelineEl = timelineRef.current;

    if (!timelineEl || dotRefs.current.length === 0) {
      return undefined;
    }

    let frame = 0;
    let resizeObserver = null;

    const measureRail = () => {
      const firstDot = dotRefs.current[0];
      const lastDot = dotRefs.current[totalSteps - 1];
      const activeDot = dotRefs.current[effectiveStepIndex];

      if (!timelineEl || !firstDot || !lastDot || !activeDot) {
        return;
      }

      const timelineRect = timelineEl.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();
      const activeRect = activeDot.getBoundingClientRect();

      const firstCenterY = firstRect.top + firstRect.height / 2 - timelineRect.top;
      const lastCenterY = lastRect.top + lastRect.height / 2 - timelineRect.top;
      const activeCenterY = activeRect.top + activeRect.height / 2 - timelineRect.top;
      const firstCenterX = firstRect.left + firstRect.width / 2 - timelineRect.left;

      setRailMetrics({
        axisLeft: firstCenterX,
        axisTop: firstCenterY,
        axisHeight: Math.max(0, lastCenterY - firstCenterY),
        progressHeight: Math.max(2, activeCenterY - firstCenterY),
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measureRail);
    };

    scheduleMeasure();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleMeasure);
      resizeObserver.observe(timelineEl);
    } else {
      window.addEventListener('resize', scheduleMeasure);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [effectiveStepIndex, totalSteps, isCrisis]);

  return (
    <Section id="capital-journey" className="journey-section" bgColor="transparent">
      <Atmosphere variant="market" isCrisis={isCrisis} />
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="journey-workspace">
        <div className="journey-visualizer" ref={timelineRef}>
          <div
            className="journey-axis"
            aria-hidden="true"
            style={{
              '--journey-axis-left': `${railMetrics.axisLeft}px`,
              '--journey-axis-top': `${railMetrics.axisTop}px`,
              '--journey-axis-height': `${railMetrics.axisHeight}px`,
              '--journey-progress-height': `${railMetrics.progressHeight}px`,
            }}
          >
            <span className="journey-axis-base" />
            <span className="journey-axis-progress" />
          </div>
          <div className="journey-nodes">
            {capitalJourneySteps.map((node, index) => {
              const isCompleted = index < effectiveStepIndex;
              const isActive = index === effectiveStepIndex;
              const isRiskNode = index >= crisisStartIndex;

              return (
                <button
                  key={node.id}
                  type="button"
                  className={`node-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isCrisis && isRiskNode ? 'danger' : ''}`}
                  onClick={() => setActiveStepIndex(index)}
                  style={{ '--node-progress': totalSteps > 1 ? index / (totalSteps - 1) : 0 }}
                >
                  <span className="node-rail" aria-hidden="true">
                    <span
                      className="dot-position-wrapper"
                      ref={(el) => {
                        dotRefs.current[index] = el;
                      }}
                    >
                      <span className="node-dot">
                        {isCompleted && !isRiskNode && <CheckCircle2 size={14} />}
                        {isCrisis && isRiskNode && isActive && <AlertCircle size={14} />}
                        {(!isCompleted || (isRiskNode && !isCrisis)) && !isActive && <div className="inner-dot" />}
                      </span>
                    </span>
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

        <div className="journey-details">
          <div className="journey-progress-bar">
            <div className="progress-text">{progressLabel} {effectiveStepIndex + 1} / {capitalJourneySteps.length}</div>
            <div className="nav-buttons">
              <button className="nav-btn" onClick={handlePrev} disabled={effectiveStepIndex === 0}>
                <ChevronLeft size={20} />
              </button>
              <button
                className="nav-btn"
                onClick={handleNext}
                disabled={effectiveStepIndex === capitalJourneySteps.length - 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            className={`detail-card-wrapper active-step ${isCrisis && effectiveStepIndex >= crisisStartIndex ? 'crisis-mode' : ''}`}
          >
            <div className="detail-body">
              <div className="card-header">
                <span className="concept-badge">{activeNode.concept}</span>
                <h3>{activeNode.title}</h3>
                <span className="stage-state-pill">{activeNode.stateLabel}</span>
              </div>

              <div className="mini-flow" aria-label="Chu kỳ tư bản rút gọn">
                {capitalJourneyFlowNodes.map((node, index) => {
                  const isCompleted = index < activeNode.flowIndex;
                  const isActive = index === activeNode.flowIndex;

                  return (
                    <span key={node.key} className="mini-flow-step">
                      <span
                        className={`mini-flow-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                        title={node.title}
                      >
                        {node.key}
                      </span>
                      {index < capitalJourneyFlowNodes.length - 1 && (
                        <span
                          className={`mini-flow-connector ${isCompleted ? 'completed' : ''} ${
                            isActive ? 'active' : ''
                          } ${
                            index === 3
                              ? effectiveStepIndex >= 7
                                ? 'resolved'
                                : effectiveStepIndex >= 6
                                  ? 'active bottleneck'
                                  : ''
                              : ''
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  );
                })}
              </div>

              <div className="current-state-line">
                <span className="block-label">Hình thái hiện tại</span>
                <p className="block-content">{activeNode.stateLabel}</p>
              </div>

              <div className="card-body">
                <div className="analysis-grid">
                  <div className="analysis-card">
                    <span className="block-label">{alphaCorpLabel}</span>
                    <p className="block-content highlight">{activeNode.desc}</p>
                  </div>
                  <div className="analysis-card">
                    <span className="block-label">{theoryLabel}</span>
                    <p className="block-content">{activeNode.theory}</p>
                  </div>
                </div>

                <div className="takeaway-card">
                  <span className="block-label">Điểm then chốt</span>
                  <p className="block-content">{activeNode.takeaway}</p>
                </div>

                <div className="transition-card">
                  <span className="block-label">{activeNode.transitionLabel}</span>
                  <p className="block-content transition-emphasis">{activeNode.transitionCondition}</p>
                </div>

              </div>
            </div>

            <div className="card-footer">
              <Link to="/knowledge" className="learn-link">
                {learnMoreLabel} <ExternalLink size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CapitalJourneySection;
