import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cascadeActors } from '../../data/caseData';
import './ImpactMapSection.css';

const ImpactMapSection = () => {
  const [activeActorId, setActiveActorId] = useState(cascadeActors[0].id);
  const activeActor = cascadeActors.find(a => a.id === activeActorId);

  return (
    <section className="impact-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Hiệu ứng dây chuyền</span>
          <h2 className="section-title">Khủng hoảng lan truyền</h2>
          <p className="section-subtitle">
            Một điểm gãy ở lưu thông (H&apos; &rarr; T&apos;) không chỉ làm sụp đổ một chu kỳ, mà lan rộng ra toàn bộ hệ sinh thái.
          </p>
        </div>

        <div className="impact-map-container">
          <div className="map-visual">
            <div className="map-center">
              <div className="center-node">
                H&apos; &#x2715; T&apos;
                <span>Điểm nghẽn</span>
              </div>
            </div>
            
            <div className="map-nodes">
              {cascadeActors.map((actor, index) => {
                const isActive = actor.id === activeActorId;
                const angle = (index * 360) / cascadeActors.length;
                // Position nodes in a circle
                const x = Math.cos((angle - 90) * (Math.PI / 180)) * 140;
                const y = Math.sin((angle - 90) * (Math.PI / 180)) * 140;

                return (
                  <div key={actor.id} className="actor-node-wrapper" style={{ transform: `translate(${x}px, ${y}px)` }}>
                    <button 
                      className={`actor-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveActorId(actor.id)}
                    >
                      {actor.name}
                    </button>
                    {/* Connection Line */}
                    <div className={`connection-line ${isActive ? 'active' : ''}`} 
                      style={{ 
                        transform: `rotate(${angle + 90}deg)`,
                        width: '100px',
                        left: '-50px',
                        top: '50%'
                      }} 
                    />
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
                className="impact-detail-card"
              >
                <h3>{activeActor.name}</h3>
                
                <div className="impact-group">
                  <span className="impact-label">Ảnh hưởng trực tiếp</span>
                  <p>{activeActor.direct}</p>
                </div>
                
                <div className="impact-group">
                  <span className="impact-label">Ảnh hưởng gián tiếp</span>
                  <p>{activeActor.indirect}</p>
                </div>
                
                <div className="impact-group">
                  <span className="impact-label">Mối liên hệ thị trường</span>
                  <p>{activeActor.relation}</p>
                </div>

                <div className="lesson-box">
                  <span className="lesson-label">Góc nhìn lý luận</span>
                  <p>{activeActor.lesson}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMapSection;
