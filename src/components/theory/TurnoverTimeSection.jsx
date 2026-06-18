import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingDown } from 'lucide-react';
import Section from '../shared/Section';
import Atmosphere from '../shared/Atmosphere';
import SectionHeader from '../shared/SectionHeader';
import './TurnoverTimeSection.css';

const TurnoverTimeSection = ({ isCrisis }) => {
  const [productionTime, setProductionTime] = useState(30);
  const [userCirculationTime, setUserCirculationTime] = useState(20);

  const circulationTime = isCrisis ? 150 : userCirculationTime;

  const totalTime = productionTime + circulationTime;
  const turnsPerYear = Math.max(0, (365 / totalTime).toFixed(1));

  return (
    <Section className="turnover-section" id="turnover" bgColor="transparent">
      <Atmosphere variant="turnover" isCrisis={isCrisis} />
      <SectionHeader
        eyebrow="Tốc độ vận động"
        title="Thời gian Chu chuyển"
        subtitle="Thời gian tư bản thực hiện một vòng tuần hoàn. Thời gian lưu thông càng dài, tốc độ chu chuyển càng chậm."
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
              type="range" min="10" max="100" 
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
            <p className="control-desc">Thời gian mua bán và thu tiền về.</p>
            <input 
              type="range" min="10" max="200" 
              value={circulationTime} 
              onChange={(e) => !isCrisis && setUserCirculationTime(parseInt(e.target.value))}
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
            <div className="cycle-ring-container" style={{ position: 'relative' }}>
              <svg viewBox="0 0 100 100" className="cycle-ring" style={{ position: 'absolute', inset: 0 }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-light)" strokeWidth="6" />
                {/* Production Arc */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--navy-600)" strokeWidth="6" 
                  strokeDasharray={`${(productionTime/totalTime)*251.2} 251.2`} 
                  strokeDashoffset="0" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dasharray 0.3s' }} />
                {/* Circulation Arc */}
                <circle cx="50" cy="50" r="40" fill="none" stroke={circulationTime > 50 ? "var(--red-500)" : "var(--gold-500)"} strokeWidth="6" 
                  strokeDasharray={`${(circulationTime/totalTime)*251.2} 251.2`} 
                  strokeDashoffset={`${-(productionTime/totalTime)*251.2}`} transform="rotate(-90 50 50)" style={{ transition: 'all 0.3s' }} />
              </svg>
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: totalTime / 15 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px #fff' }} />
              </motion.div>

              <div className="ring-center" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={24} className={circulationTime > 50 ? 'text-red' : 'text-teal'} />
              </div>
            </div>
            
            <div className="theory-insight">
              {circulationTime > 50 ? (
                <>
                  <TrendingDown size={20} className="text-red mr-2 shrink-0" />
                  <p><strong>Khủng hoảng lưu thông:</strong> Hàng hóa đóng băng làm kéo dài thời gian lưu thông. Vòng quay chậm lại rõ rệt.</p>
                </>
              ) : (
                <p>Thời gian lưu thông ngắn giúp tư bản quay vòng nhanh, sinh lời liên tục.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TurnoverTimeSection;
