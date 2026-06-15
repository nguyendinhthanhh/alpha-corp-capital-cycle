import { useState } from 'react';
import { Banknote, Building, HardHat, Orbit, TrendingDown, Landmark, Ban, OctagonAlert } from 'lucide-react';
import { timelineSteps } from '../../data/caseData';
import { FadeIn, StaggerGroup, StaggerItem } from './MotionReveal';

const CaseTimelineSection = () => {
  const [activeStep, setActiveStep] = useState(timelineSteps[2]);
  const timelineIcons = [Banknote, Building, HardHat, Orbit, TrendingDown, Landmark, Ban, OctagonAlert];

  return (
    <section id="case-file" className="content-section section-dark">
      <FadeIn className="section-heading">
        <span className="kicker">Section 01</span>
        <h2>Hồ sơ vụ việc</h2>
        <p>
          Timeline này nối từng biến cố của Alpha Corp với trạng thái tương ứng trong công thức tuần
          hoàn tư bản, để thấy chính xác dòng tiền đã đứt ở đâu.
        </p>
      </FadeIn>

      <div className="timeline-layout">
        <StaggerGroup className="timeline-grid premium-timeline-grid">
          {timelineSteps.map((step, index) => {
            const Icon = timelineIcons[index];
            const isActive = activeStep.order === step.order;

            return (
              <StaggerItem key={step.order}>
                <button
                  type="button"
                  className={`timeline-step premium-timeline-step ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveStep(step)}
                  onFocus={() => setActiveStep(step)}
                  onClick={() => setActiveStep(step)}
                >
                  <div className="timeline-marker-wrap">
                    <div className="timeline-marker-icon">
                      <Icon size={18} />
                    </div>
                    <div className="timeline-marker">{step.order}</div>
                  </div>
                  <div>
                    <div className="timeline-stage">{step.stage}</div>
                    <h3>{step.title}</h3>
                    <p>{step.note}</p>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <FadeIn className="timeline-spotlight forensic-panel" delay={0.12}>
          <div className="panel-header">
            <span className="eyebrow">Spotlight</span>
            <strong>{activeStep.title}</strong>
          </div>
          <div className="timeline-spotlight-body">
            <span className="status-chip is-info">{activeStep.stage}</span>
            <p>{activeStep.note}</p>
            <div className="spotlight-takeaway">
              <span className="detail-label">Takeaway</span>
              <strong>
                {activeStep.stage.includes("H'") || activeStep.stage.includes("T'")
                  ? "Dòng tiền đứt khi lưu thông không hoàn tất bước H' → T'."
                  : 'Mỗi khâu trước đó chỉ chuẩn bị điều kiện cho điểm nghẽn bùng lên.'}
              </strong>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CaseTimelineSection;
