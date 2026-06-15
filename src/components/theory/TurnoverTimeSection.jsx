import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingDown } from 'lucide-react';
import Section from '../shared/Section';
import SectionHeader from '../shared/SectionHeader';
import './TurnoverTimeSection.css';

const TurnoverTimeSection = ({ isCrisis }) => {
  const [productionTime, setProductionTime] = useState(30);
  const [circulationTime, setCirculationTime] = useState(20);

  useEffect(() => {
    if (isCrisis) {
      // eslint-disable-next-line
      setCirculationTime(90); // Khủng hoảng làm tăng đột biến thời gian lưu thông
    } else {
      // eslint-disable-next-line
      setCirculationTime(20);
    }
  }, [isCrisis]);

  const totalTime = productionTime + circulationTime;
  const turnsPerYear = Math.max(0, (365 / totalTime).toFixed(1));

  return (
    <Section className="turnover-section" id="turnover" bgColor="var(--page-background)">
        <SectionHeader
          eyebrow="Tốc độ vận động"
          title="Thời gian Chu chuyển"
          subtitle="Thời gian tư bản thực hiện một vòng tuần hoàn. Thời gian lưu thông càng dài, tốc độ chu chuyển càng chậm, tỷ suất lợi nhuận càng giảm."
        />

        <div className="turnover-workspace">
          <div className="turnover-controls">
            <div className="control-card">
              <div className="control-header">
                <h3>Thời gian Sản xuất</h3>
                <span>{productionTime} ngày</span>
              </div>
              <p className="control-desc">Thời gian thực tế đổ bê tông, xây dựng phần thô và hoàn thiện.</p>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={productionTime} 
                onChange={(e) => setProductionTime(parseInt(e.target.value))}
                className="custom-range slider-navy"
                disabled={isCrisis}
              />
            </div>

            <div className={`control-card ${isCrisis ? 'crisis-highlight' : ''}`}>
              <div className="control-header">
                <h3>Thời gian Lưu thông</h3>
                <span className={isCrisis ? 'text-red' : ''}>{circulationTime} ngày</span>
              </div>
              <p className="control-desc">Thời gian mua vật liệu và thời gian chờ khách hàng mua nhà.</p>
              <input 
                type="range" 
                min="10" 
                max="200" 
                value={circulationTime} 
                onChange={(e) => !isCrisis && setCirculationTime(parseInt(e.target.value))}
                className={`custom-range ${isCrisis ? 'slider-red disabled' : 'slider-gold'}`}
                disabled={isCrisis}
              />
            </div>
          </div>

          <div className="turnover-results">
            <div className="result-metrics">
              <div className="metric-box">
                <span className="metric-label">Tổng thời gian 1 vòng</span>
                <strong className="metric-value">{totalTime} <small>ngày</small></strong>
              </div>
              <div className="metric-box">
                <span className="metric-label">Số vòng quay / năm</span>
                <strong className={`metric-value ${turnsPerYear < 2 ? 'text-red' : 'text-teal'}`}>
                  {turnsPerYear} <small>vòng</small>
                </strong>
              </div>
            </div>

            <div className="turnover-visual">
              <div className="cycle-ring-container">
                <svg viewBox="0 0 100 100" className="cycle-ring">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-light)" strokeWidth="8" />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke={circulationTime > 50 ? "var(--red-500)" : "var(--teal-500)"}
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * turnsPerYear / 12)} // Max 12 turns
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    animate={{ 
                      strokeDashoffset: 251.2 - (251.2 * turnsPerYear / 12),
                      stroke: circulationTime > 50 ? "var(--red-500)" : "var(--teal-500)"
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="ring-center">
                  <Clock size={24} className={circulationTime > 50 ? 'text-red' : 'text-teal'} />
                </div>
              </div>
              
              <div className="theory-insight">
                {circulationTime > 50 ? (
                  <>
                    <TrendingDown size={20} className="text-red mr-2" />
                    <p><strong>Khủng hoảng lưu thông:</strong> Hàng hóa không bán được làm kéo dài thời gian lưu thông. Vòng quay tư bản chậm lại, doanh nghiệp không thể thu hồi vốn để bắt đầu chu kỳ mới.</p>
                  </>
                ) : (
                  <p>Thời gian lưu thông ngắn giúp tư bản quay vòng nhanh, tăng tỷ suất lợi nhuận hàng năm (p').</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
  );
};

export default TurnoverTimeSection;
