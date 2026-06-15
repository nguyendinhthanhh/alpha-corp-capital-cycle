import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Landmark, HardHat, Package, Home, Shield } from 'lucide-react';
import { cascadeActors } from '../../data/caseData';
import { FadeIn } from './MotionReveal';

const cascadeSteps = [
  "H' không bán được",
  'Không thu hồi được tiền',
  'Không trả được lãi',
  'Không mua được vật liệu',
  'Nợ lương công nhân',
  'Dừng dự án tiếp theo',
  'Tái sản xuất bị gián đoạn',
];

const CascadeSection = () => {
  const [selectedActor, setSelectedActor] = useState(cascadeActors[0]);
  const actorIcons = {
    alpha: Building2,
    bank: Landmark,
    workers: HardHat,
    suppliers: Package,
    buyers: Home,
    state: Shield,
  };

  return (
    <section className="content-section section-dark">
      <FadeIn className="section-heading">
        <span className="kicker">Section 04</span>
        <h2>Hiệu ứng dây chuyền</h2>
        <p>
          Từ một điểm nghẽn ở lưu thông, tác động lan ra toàn bộ mạng lưới liên quan đến vốn, lao
          động, tín dụng và tái sản xuất.
        </p>
      </FadeIn>

      <div className="cascade-shell">
        <FadeIn className="cascade-map forensic-panel" delay={0.08}>
          <div className="network-core">
            <div className="network-core-node">
              <span className="detail-label">Điểm nghẽn trung tâm</span>
              <strong>H&apos; → T&apos; bị khóa</strong>
              <p>Giá trị hàng hóa không quay lại thành tiền mặt.</p>
            </div>
          </div>

          {cascadeSteps.map((step, index) => (
            <motion.div
              key={step}
              className="cascade-step premium-cascade-step"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span className="cascade-order">{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </motion.div>
          ))}
        </FadeIn>

        <div className="cascade-actors">
          <div className="actor-list">
            {cascadeActors.map((actor) => {
              const Icon = actorIcons[actor.id];

              return (
              <motion.button
                key={actor.id}
                type="button"
                className={`actor-pill ${selectedActor.id === actor.id ? 'is-active' : ''}`}
                onClick={() => setSelectedActor(actor)}
                whileHover={{ y: -2 }}
              >
                <Icon size={14} />
                {actor.name}
              </motion.button>
              );
            })}
          </div>

          <FadeIn className="forensic-panel" delay={0.12}>
            <div className="panel-header">
              <span className="eyebrow">Tác động theo chủ thể</span>
              <strong>{selectedActor.name}</strong>
            </div>
            <p>{selectedActor.impact}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CascadeSection;
