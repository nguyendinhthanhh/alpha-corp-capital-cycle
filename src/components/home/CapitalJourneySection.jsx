import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, CircleDashed, Factory, Landmark, ShieldAlert } from 'lucide-react';
import { flowNodes } from '../../data/caseData';
import { FadeIn } from './MotionReveal';

const CapitalJourneySection = () => {
  const [selectedId, setSelectedId] = useState(flowNodes[0].id);
  const selectedNode = flowNodes.find((node) => node.id === selectedId) ?? flowNodes[0];
  const topStages = [
    { label: 'T', icon: Landmark },
    { label: 'H', icon: ArrowRightLeft },
    { label: 'SX', icon: Factory },
    { label: "H'", icon: CircleDashed },
    { label: "T'", icon: ShieldAlert },
  ];

  return (
    <section id="capital-journey" className="content-section section-light">
      <FadeIn className="section-heading">
        <span className="kicker">Section 02</span>
        <h2>Hành trình của 10.000 tỷ đồng</h2>
        <p>
          Chạm vào từng node để xem hình thái tư bản, hoạt động kinh tế, kiến thức MLN122 và rủi ro
          tích tụ ở mỗi khâu.
        </p>
      </FadeIn>

      <div className="journey-shell">
        <div className="journey-rail-shell">
          <div className="journey-stage-band">
            {topStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.label} className="journey-stage-pill">
                  <Icon size={15} />
                  <span>{stage.label}</span>
                </div>
              );
            })}
          </div>

          <div className="journey-rail">
          {flowNodes.map((node, index) => (
            <button
              key={node.id}
              type="button"
              className={`journey-node ${selectedId === node.id ? 'is-active' : ''}`}
              onClick={() => setSelectedId(node.id)}
            >
              <span className="journey-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{node.label}</strong>
                <p>{node.capitalForm}</p>
              </div>
            </button>
          ))}
          </div>
        </div>

        <FadeIn className="journey-detail forensic-panel light-panel" delay={0.08}>
          <div className="panel-header">
            <span className="eyebrow">Node đang xem</span>
            <strong>{selectedNode.label}</strong>
          </div>

          <div className="journey-detail-hero">
            <span className="status-chip is-info">{selectedNode.capitalForm}</span>
            <motion.div
              className="journey-pulse"
              layoutId="journey-pulse"
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            />
          </div>

          <div className="detail-grid">
            <div>
              <span className="detail-label">Hình thái tư bản</span>
              <p>{selectedNode.capitalForm}</p>
            </div>
            <div>
              <span className="detail-label">Hoạt động kinh tế</span>
              <p>{selectedNode.activity}</p>
            </div>
            <div>
              <span className="detail-label">Kiến thức MLN122</span>
              <p>{selectedNode.theory}</p>
            </div>
            <div>
              <span className="detail-label">Nguy cơ</span>
              <p>{selectedNode.risk}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CapitalJourneySection;
