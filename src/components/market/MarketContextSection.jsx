import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, TrendingUp, ArrowDownCircle, AlertCircle } from 'lucide-react';
import Section from '../shared/Section';
import SectionHeader from '../shared/SectionHeader';
import './MarketContextSection.css';

const MarketContextSection = ({ isCrisis, onSetCrisis }) => {
  const [creditTight, setCreditTight] = useState(false);
  const [highInterest, setHighInterest] = useState(false);
  const [lowDemand, setLowDemand] = useState(false);

  // Sync with global crisis state
  useEffect(() => {
    if (isCrisis) {
      // eslint-disable-next-line
      setCreditTight(true);
      setHighInterest(true);
      setLowDemand(true);
    } else {
      // eslint-disable-next-line
      setCreditTight(false);
      setHighInterest(false);
      setLowDemand(false);
    }
  }, [isCrisis]);

  // Update global crisis if all 3 are toggled on manually
  useEffect(() => {
    if (creditTight && highInterest && lowDemand && !isCrisis) {
      onSetCrisis(true);
    } else if ((!creditTight || !highInterest || !lowDemand) && isCrisis) {
      onSetCrisis(false);
    }
  }, [creditTight, highInterest, lowDemand, isCrisis, onSetCrisis]);

  // Calculate flow strength based on toggles
  const activeCount = [creditTight, highInterest, lowDemand].filter(Boolean).length;
  const flowStrength = 100 - (activeCount * 30); // 100, 70, 40, 10
  
  return (
    <Section className="market-context-section" id="market-context" bgColor="var(--surface-primary)">
        <SectionHeader
          eyebrow="Bối cảnh Vĩ mô"
          title="Nguyên nhân đóng băng thị trường"
          subtitle="Khám phá lý do thời gian lưu thông kéo dài, khiến sản phẩm (H') không thể thực hiện giá trị (T'). Sản xuất đã diễn ra, nhưng giao dịch bị đình trệ."
        />

        <div className="market-grid">
          {/* Controls */}
          <div className="market-controls">
            <h3 className="panel-title">Tác động thị trường</h3>
            
            <button 
              className={`control-btn ${creditTight ? 'active' : ''}`}
              onClick={() => setCreditTight(!creditTight)}
            >
              <div className="control-icon"><Lock size={20} /></div>
              <div className="control-text">
                <strong>Siết tín dụng</strong>
                <span>Ngân hàng hạn chế cho vay</span>
              </div>
            </button>

            <button 
              className={`control-btn ${highInterest ? 'active' : ''}`}
              onClick={() => setHighInterest(!highInterest)}
            >
              <div className="control-icon"><TrendingUp size={20} /></div>
              <div className="control-text">
                <strong>Tăng lãi suất</strong>
                <span>Chi phí vay vốn đắt đỏ</span>
              </div>
            </button>

            <button 
              className={`control-btn ${lowDemand ? 'active' : ''}`}
              onClick={() => setLowDemand(!lowDemand)}
            >
              <div className="control-icon"><ArrowDownCircle size={20} /></div>
              <div className="control-text">
                <strong>Sức mua giảm sút</strong>
                <span>Người dân không đủ tiền mua nhà</span>
              </div>
            </button>
          </div>

          {/* Visualizer */}
          <div className="market-visualizer">
            <div className={`flow-visualization ${activeCount > 0 ? 'impacted' : ''}`}>
              <div className="market-node supply-node">
                <BuildingIcon />
                <span>Nguồn cung (H&apos;)</span>
              </div>
              
              <div className="flow-bridge">
                <div className="bridge-track">
                  <motion.div 
                    className="bridge-fill"
                    animate={{ width: `${flowStrength}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                  
                  {/* Particles */}
                  <motion.div 
                    className="particle"
                    animate={{ 
                      x: [0, 200],
                      opacity: flowStrength > 10 ? [0, 1, 0] : 0
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 200 / flowStrength,
                      ease: "linear"
                    }}
                  />
                </div>
                <div className="bridge-status">
                  Thanh khoản: {flowStrength}%
                </div>
              </div>

              <div className="market-node demand-node">
                <WalletIcon />
                <span>Cầu (T&apos;)</span>
              </div>
            </div>

            <div className="theory-explanation">
              <h4>
                {activeCount === 0 && "Trạng thái lý tưởng"}
                {activeCount === 1 && "Bắt đầu tắc nghẽn"}
                {activeCount === 2 && "Rủi ro thanh khoản cao"}
                {activeCount === 3 && "Đứt gãy hoàn toàn"}
              </h4>
              <p>
                {activeCount === 0 && "Dòng vốn lưu thông thông suốt. Thời gian lưu thông (H' -> T') ngắn. Sản phẩm nhanh chóng được hiện thực hóa giá trị."}
                {activeCount === 1 && "Thời gian lưu thông bắt đầu kéo dài. Dòng vốn T' quay về chậm lại, ảnh hưởng đến khả năng tái sản xuất của Alpha Corp."}
                {activeCount === 2 && "Hàng hóa tồn kho tăng. Giá trị thặng dư tiềm năng bị đóng băng trong bê tông cốt thép. Doanh nghiệp chịu áp lực trả lãi."}
                {activeCount === 3 && "Hoàn toàn mất thanh khoản. Tuần hoàn tư bản bị đứt đoạn. Đây là khuyết tật điển hình của kinh tế thị trường khi cung cầu không gặp nhau."}
              </p>
            </div>
            
            {activeCount === 3 && (
              <motion.div 
                className="crisis-alert-box"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={20} className="mr-2" />
                <span><strong>Khủng hoảng:</strong> Điểm H' &rarr; T' bị khóa chặt.</span>
              </motion.div>
            )}
          </div>
        </div>
      </Section>
  );
};

// SVG Icons to keep components clean
const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const WalletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
  </svg>
);

export default MarketContextSection;
