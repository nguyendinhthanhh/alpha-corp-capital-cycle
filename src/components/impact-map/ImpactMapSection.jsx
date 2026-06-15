import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stakeholders } from '../../data/stakeholderImpacts';
import { AlertCircle } from 'lucide-react';
import Section from '../shared/Section';
import SectionHeader from '../shared/SectionHeader';
import './ImpactMapSection.css';

const ImpactMapSection = ({ isCrisis }) => {
  const [activeActorId, setActiveActorId] = useState(stakeholders[0].id);
  const activeActor = stakeholders.find(a => a.id === activeActorId);

  // Auto-select based on crisis
  useEffect(() => {
    if (isCrisis) {
      // eslint-disable-next-line
      setActiveActorId('alpha');
    }
  }, [isCrisis]);

  return (
    <Section className="impact-section" id="impact" bgColor="var(--surface-primary)">
        <SectionHeader
          eyebrow="Hiệu ứng dây chuyền"
          title="Khủng hoảng lan truyền"
          subtitle="Một điểm gãy ở lưu thông (H' → T') không chỉ làm sụp đổ Alpha Corp, mà tạo hiệu ứng domino lên toàn bộ mạng lưới kinh tế."
        />

        <div className="impact-map-container">
          <div className="map-visual">
            <div className={`map-center ${isCrisis ? 'pulsing-danger' : ''}`}>
              <div className="center-node">
                H&apos; &#x2715; T&apos;
                <span>Điểm đứt gãy</span>
              </div>
            </div>
            
            <div className={`map-nodes ${isCrisis ? 'crisis-active' : ''}`}>
              {stakeholders.map((actor, index) => {
                const isActive = actor.id === activeActorId;
                const angle = (index * 360) / stakeholders.length;
                // Position nodes in a circle
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * 160;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * 160;

                return (
                  <div key={actor.id}>
                    {/* Connection Line */}
                    <div className={`connection-line ${isActive ? 'active' : ''} ${isCrisis ? 'danger' : ''}`} 
                      style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '160px',
                        transformOrigin: 'left center',
                        transform: `rotate(${angle - 90}deg)`
                      }} 
                    />
                    <div className="actor-node-wrapper" style={{ transform: `translate(${x}px, ${y}px)` }}>
                      <button 
                        className={`actor-btn ${isActive ? 'active' : ''} ${isCrisis ? 'danger' : ''}`}
                        onClick={() => setActiveActorId(actor.id)}
                      >
                        {actor.name}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="map-details">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeActor.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`impact-detail-card ${isCrisis ? 'crisis-mode' : ''}`}
              >
                <div className="card-header-flex">
                  <h3>{activeActor.name}</h3>
                  {isCrisis && <AlertCircle size={24} className="text-red" />}
                </div>
                
                <div className="impact-group">
                  <span className="impact-label">Hậu quả trực tiếp</span>
                  <p className="impact-content">
                    {isCrisis ? activeActor.impact : "Trong trạng thái bình thường, đối tượng này vẫn duy trì các hoạt động thu chi ổn định. Nhấp nút 'Kích hoạt Khủng hoảng' ở đầu trang để xem điều gì xảy ra."}
                  </p>
                </div>
                
                <div className="lesson-box">
                  <span className="lesson-label">Khuyết tật thị trường</span>
                  <p>Trong nền kinh tế thị trường, tuần hoàn tư bản của từng doanh nghiệp không độc lập mà đan xen vào nhau thành tổng tuần hoàn tư bản xã hội. Sự sụp đổ của mắt xích Alpha Corp tất yếu dẫn đến khủng hoảng lan truyền.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>
  );
};

export default ImpactMapSection;
