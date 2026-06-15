import { useState } from 'react';
import { motion } from 'framer-motion';
import { PauseCircle, PlayCircle, Clock, Map } from 'lucide-react';
import './ConditionSplitSection.css';

const timeStages = [
  { id: 't-h', label: 'Mua đầu vào' },
  { id: 'sx', label: 'Sản xuất' },
  { id: 'h-prime', label: 'Hình thành hàng hóa' },
  { id: 'consume', label: 'Tiêu thụ' },
  { id: 't-prime', label: 'Thu hồi tiền' },
  { id: 'new-cycle', label: 'Bắt đầu chu kỳ mới' }
];

const ConditionSplitSection = () => {
  const [blockedStageId, setBlockedStageId] = useState(null);

  const handleToggleBlock = (stageId) => {
    if (blockedStageId === stageId) {
      setBlockedStageId(null);
    } else {
      setBlockedStageId(stageId);
    }
  };

  return (
    <section className="condition-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Hai điều kiện thiết yếu</span>
          <h2 className="section-title">Không gian và Thời gian</h2>
          <p className="section-subtitle">
            Tuần hoàn tư bản chỉ có thể tiến hành bình thường khi thỏa mãn hai điều kiện liên tục.
          </p>
        </div>

        <div className="split-screen">
          {/* Left: Space */}
          <div className="split-panel space-panel">
            <div className="panel-heading">
              <Map size={24} className="panel-icon" />
              <h3>Điều kiện về Không gian</h3>
              <p>Tổng tư bản phải được phân chia hợp lý để đồng thời tồn tại ở cả ba hình thái.</p>
            </div>
            
            <div className="space-visual">
              <div className="space-zone zone-t">
                <div className="zone-content">
                  <span className="zone-label">Tư bản tiền tệ</span>
                  <span className="zone-desc">Dự phòng & Thanh toán</span>
                </div>
              </div>
              <div className="space-zone zone-sx">
                <div className="zone-content">
                  <span className="zone-label">Tư bản sản xuất</span>
                  <span className="zone-desc">Máy móc & Vật liệu đang thi công</span>
                </div>
              </div>
              <div className="space-zone zone-h">
                <div className="zone-content">
                  <span className="zone-label">Tư bản hàng hóa</span>
                  <span className="zone-desc">Thành phẩm chờ bán</span>
                </div>
              </div>
              
              <div className="space-connection c-1"></div>
              <div className="space-connection c-2"></div>
              <div className="space-connection c-3"></div>
            </div>
            
            <div className="panel-footer">
              <p>Nếu dồn toàn bộ vốn vào sản xuất (thiếu tiền mặt) hoặc ứ đọng ở hàng hóa, chu kỳ sẽ bị đứt gãy ngay lập tức.</p>
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
                        className={`time-node-btn ${isBlocked ? 'blocked' : ''} ${isAffected ? 'dimmed' : ''}`}
                        onClick={() => handleToggleBlock(stage.id)}
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

            <div className="panel-footer">
              <p>
                {blockedStageId 
                  ? "Khi một giai đoạn dừng lại, tất cả các khâu phía sau đều bị vô hiệu hóa, tiền không thể quay về."
                  : "Dòng thời gian đang thông suốt, tư bản chuyển hóa nhịp nhàng qua các giai đoạn."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConditionSplitSection;
