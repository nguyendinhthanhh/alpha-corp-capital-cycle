import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { capitalForms } from '../../data/capitalFlowStages';
import Section from '../shared/Section';
import SectionHeader from '../shared/SectionHeader';
import './ThreeFormsSection.css';

const ThreeFormsSection = ({ isCrisis }) => {
  const [allocation, setAllocation] = useState({
    money: 20,
    production: 30,
    commodity: 50
  });

  // Force bad allocation on crisis
  useEffect(() => {
    if (isCrisis) {
      // eslint-disable-next-line
      setAllocation({
        money: 0,
        production: 10,
        commodity: 90
      });
    } else {
      // eslint-disable-next-line
      setAllocation({
        money: 20,
        production: 70,
        commodity: 10
      });
    }
  }, [isCrisis]);

  const handleDrag = (type, newValue) => {
    if (isCrisis) return; // Lock in crisis mode

    let { money, production, commodity } = allocation;
    
    // Simple logic to keep total at 100
    if (type === 'money') {
      const diff = newValue - money;
      money = newValue;
      commodity = Math.max(0, commodity - diff);
      if (money + production + commodity !== 100) {
        production = 100 - money - commodity;
      }
    } else if (type === 'production') {
      const diff = newValue - production;
      production = newValue;
      commodity = Math.max(0, commodity - diff);
      if (money + production + commodity !== 100) {
        money = 100 - production - commodity;
      }
    } else if (type === 'commodity') {
      const diff = newValue - commodity;
      commodity = newValue;
      money = Math.max(0, money - diff);
      if (money + production + commodity !== 100) {
        production = 100 - money - commodity;
      }
    }

    setAllocation({ money, production, commodity });
  };

  const isLiquidityLow = allocation.money < 10 || allocation.commodity > 80;

  return (
    <Section className="three-forms-section" id="three-forms">
        <SectionHeader
          eyebrow="Cơ sở lý luận"
          title="Ba Hình thái Tư bản"
          subtitle="Kéo thanh trượt để điều chỉnh sự phân bổ vốn của Alpha Corp. Lưu ý: Cần phải chia nhỏ tổng tư bản để nó đồng thời tồn tại ở cả 3 hình thái."
        />

        <div className="forms-workspace">
          {/* Theory Panel */}
          <div className="forms-theory">
            {capitalForms.map(form => (
              <div key={form.id} className="form-card">
                <div className={`form-color-bar bg-${form.color}`}></div>
                <div className="form-content">
                  <h3>{form.name}</h3>
                  <p><strong>Nhiệm vụ:</strong> {form.role}</p>
                  <p className="text-muted">{form.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Allocator */}
          <div className="forms-allocator">
            <h3 className="allocator-title">Mô phỏng Phân bổ Vốn</h3>
            
            <div className="allocation-sliders">
              {/* Money Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <span>Tư bản Tiền tệ (Thanh khoản)</span>
                  <strong>{allocation.money}%</strong>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={allocation.money}
                  onChange={(e) => handleDrag('money', parseInt(e.target.value))}
                  disabled={isCrisis}
                  className={`custom-range slider-teal ${isCrisis ? 'disabled' : ''}`}
                />
              </div>

              {/* Production Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <span>Tư bản Sản xuất</span>
                  <strong>{allocation.production}%</strong>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={allocation.production}
                  onChange={(e) => handleDrag('production', parseInt(e.target.value))}
                  disabled={isCrisis}
                  className={`custom-range slider-navy ${isCrisis ? 'disabled' : ''}`}
                />
              </div>

              {/* Commodity Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <span>Tư bản Hàng hóa (Tồn kho)</span>
                  <strong>{allocation.commodity}%</strong>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={allocation.commodity}
                  onChange={(e) => handleDrag('commodity', parseInt(e.target.value))}
                  disabled={isCrisis}
                  className={`custom-range slider-gold ${isCrisis ? 'disabled' : ''}`}
                />
              </div>
            </div>

            {/* Visual Bar */}
            <div className="visual-allocation-bar">
              <motion.div 
                className="alloc-segment bg-teal" 
                animate={{ width: `${allocation.money}%` }} 
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="alloc-segment bg-navy" 
                animate={{ width: `${allocation.production}%` }} 
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="alloc-segment bg-gold" 
                animate={{ width: `${allocation.commodity}%` }} 
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Feedback */}
            <div className={`allocation-feedback ${isLiquidityLow ? 'danger' : 'safe'}`}>
              {isLiquidityLow ? (
                <>
                  <AlertTriangle size={20} className="mr-2" />
                  <div>
                    <strong>Cảnh báo thanh khoản!</strong>
                    <p>Quá nhiều vốn bị "chôn" trong hàng hóa hoặc sản xuất. Doanh nghiệp không còn tiền mặt để trả lãi vay và bắt đầu chu kỳ mới.</p>
                  </div>
                </>
              ) : (
                <>
                  <TrendingDown size={20} className="mr-2" style={{ transform: 'rotate(180deg)' }} />
                  <div>
                    <strong>Phân bổ hợp lý</strong>
                    <p>Đảm bảo được điều kiện về Không gian: Có đủ tiền mặt dự phòng trong khi vẫn duy trì sản xuất và có hàng hóa chờ bán.</p>
                  </div>
                </>
              )}
            </div>

            {isCrisis && (
              <div className="crisis-lock-overlay">
                <p>Thị trường đóng băng đã khóa chặt phân bổ vốn của Alpha Corp.</p>
              </div>
            )}
          </div>
        </div>
      </Section>
  );
};

export default ThreeFormsSection;
