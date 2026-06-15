import { useState, useEffect } from 'react';
import { PauseCircle, PlayCircle, Clock, Map, AlertTriangle } from 'lucide-react';
import Section from '../shared/Section';
import SectionHeader from '../shared/SectionHeader';
import './ConditionSplitSection.css';

const timeStages = [
  { id: 't-h', label: 'Mua đầu vào (T -> H)' },
  { id: 'sx', label: 'Sản xuất (...SX...)' },
  { id: 'h-prime', label: 'Hoàn thành phần thô (H\')' },
  { id: 'consume', label: 'Bán nhà (H\' -> T\')' },
  { id: 't-prime', label: 'Thu hồi tiền (T\')' },
  { id: 'new-cycle', label: 'Chu kỳ mới (T2)' }
];

const ConditionSplitSection = ({ isCrisis }) => {
  const [blockedStageId, setBlockedStageId] = useState(null);

  // Sync with global crisis state
  useEffect(() => {
    if (isCrisis) {
      // eslint-disable-next-line
      setBlockedStageId('consume');
    } else {
      // eslint-disable-next-line
      setBlockedStageId(null);
    }
  }, [isCrisis]);

  const handleToggleBlock = (stageId) => {
    if (isCrisis) return; // Prevent unlocking if in global crisis
    
    if (blockedStageId === stageId) {
      setBlockedStageId(null);
    } else {
      setBlockedStageId(stageId);
    }
  };

  return (
    <Section className="condition-section" id="conditions" bgColor="var(--surface-secondary)">
        <SectionHeader
          eyebrow="Cơ sở lý luận 02"
          title="Không gian và Thời gian"
          subtitle="Tuần hoàn tư bản chỉ có thể tiến hành bình thường khi thỏa mãn hai điều kiện thiết yếu và phải tuân thủ cùng lúc."
        />

        <div className="split-screen">
          {/* Left: Space */}
          <div className="split-panel space-panel">
            <div className="panel-heading">
              <Map size={24} className="panel-icon" />
              <h3>Điều kiện về Không gian</h3>
              <p>Tổng tư bản phải được phân chia hợp lý để đồng thời tồn tại ở cả ba hình thái.</p>
            </div>
            
            <div className="space-visual">
              <div className={`space-zone zone-t ${isCrisis ? 'empty' : ''}`}>
                <div className="zone-content">
                  <span className="zone-label">Tư bản tiền tệ</span>
                  <span className="zone-desc">Dự phòng & Thanh toán</span>
                </div>
              </div>
              <div className="space-zone zone-sx">
                <div className="zone-content">
                  <span className="zone-label">Tư bản sản xuất</span>
                  <span className="zone-desc">Máy móc & Thi công</span>
                </div>
              </div>
              <div className={`space-zone zone-h ${isCrisis ? 'overloaded' : ''}`}>
                <div className="zone-content">
                  <span className="zone-label">Tư bản hàng hóa</span>
                  <span className="zone-desc">Thành phẩm chờ bán</span>
                </div>
              </div>
              
              <div className="space-connection c-1"></div>
              <div className="space-connection c-2"></div>
              <div className="space-connection c-3"></div>
            </div>
            
            <div className={`panel-footer ${isCrisis ? 'crisis-footer' : ''}`}>
              {isCrisis ? (
                <p><AlertTriangle size={16} className="inline-icon" /> Không gian bị méo mó: 100% vốn bị chôn vào khối bê tông H', quỹ tiền tệ T cạn kiệt hoàn toàn.</p>
              ) : (
                <p>Nếu dồn toàn bộ vốn vào một hình thái, chuỗi cung ứng bị đứt gãy ngay lập tức.</p>
              )}
            </div>
          </div>

          {/* Right: Time */}
          <div className="split-panel time-panel">
            <div className="panel-heading">
              <Clock size={24} className="panel-icon" />
              <h3>Điều kiện về Thời gian</h3>
              <p>Các giai đoạn phải nối tiếp nhau liên tục. Nhấn vào một khâu để thử làm gián đoạn.</p>
            </div>
            
            <div className="time-visual">
              <div className="timeline-track">
                {timeStages.map((stage, index) => {
                  const isBlocked = blockedStageId === stage.id;
                  const blockedIndex = timeStages.findIndex(s => s.id === blockedStageId);
                  const isAffected = blockedIndex !== -1 && index > blockedIndex;
                  
                  return (
                    <div key={stage.id} className={`time-stage ${isAffected ? 'affected' : ''}`}>
                      <div className="time-line-segment" />
                      
                      <button 
                        className={`time-node-btn ${isBlocked ? 'blocked' : ''} ${isAffected ? 'dimmed' : ''} ${isCrisis ? 'locked' : ''}`}
                        onClick={() => handleToggleBlock(stage.id)}
                        disabled={isCrisis}
                      >
                        <div className="node-indicator">
                          {isBlocked ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                        </div>
                        <span className="node-text">{stage.label}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`panel-footer ${blockedStageId ? 'crisis-footer' : ''}`}>
              <p>
                {blockedStageId 
                  ? "Khi một giai đoạn dừng lại, tất cả các khâu phía sau đều bị vô hiệu hóa, tuần hoàn đứt đoạn."
                  : "Dòng thời gian đang thông suốt, tư bản chuyển hóa nhịp nhàng qua các giai đoạn."}
              </p>
            </div>
          </div>
        </div>
      </Section>
  );
};

export default ConditionSplitSection;
