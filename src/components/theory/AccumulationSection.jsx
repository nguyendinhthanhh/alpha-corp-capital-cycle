import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, TrendingUp, AlertTriangle } from 'lucide-react';
import Section from '../shared/Section';
import Atmosphere from '../shared/Atmosphere';
import SectionHeader from '../shared/SectionHeader';
import './AccumulationSection.css';

const AccumulationSection = ({ isCrisis }) => {
  const [cycleCount, setCycleCount] = useState(0);

  // Auto increment cycles in normal mode
  useEffect(() => {
    if (isCrisis) return;
    
    const interval = setInterval(() => {
      setCycleCount(prev => prev + 1);
    }, 3000); // 1 cycle every 3s
    
    return () => clearInterval(interval);
  }, [isCrisis]);

  // Reset cycles if crisis hits
  useEffect(() => {
    if (isCrisis) {
      // eslint-disable-next-line
      setCycleCount(0);
    }
  }, [isCrisis]);

  return (
    <Section className="accumulation-section" id="accumulation" bgColor="transparent">
        <Atmosphere variant="theory" isCrisis={isCrisis} />
        <SectionHeader
          eyebrow="Quy mô sản xuất"
          title="Tái sản xuất & Tích lũy Tư bản"
          subtitle="Biến một phần giá trị thặng dư thành tư bản phụ thêm để mở rộng quy mô. Nhưng quá trình này chỉ có thể diễn ra nếu H' chuyển hóa thành công thành T'."
        />

        <div className="accumulation-workspace">
          {/* Left: Cycle Animation */}
          <div className="accumulation-visualizer">
            <div className={`production-machine ${isCrisis ? 'broken' : ''}`}>
              <div className="machine-core">
                {isCrisis ? (
                  <AlertTriangle size={48} className="text-red" />
                ) : (
                  <RefreshCcw size={48} className="text-teal spin-animation" />
                )}
              </div>
              <div className="machine-label">
                {isCrisis ? "Ngưng trệ hoàn toàn" : "Bộ máy Tái sản xuất mở rộng"}
              </div>
            </div>

            <div className="cycles-counter">
              <span className="counter-label">Số chu kỳ đã hoàn thành:</span>
              <span className={`counter-number ${isCrisis ? 'text-red' : 'text-teal'}`}>
                {cycleCount}
              </span>
            </div>

            {/* Scale visualizer */}
            <div className="scale-visualizer">
              <div className="scale-buildings">
                {[...Array(Math.min(5, cycleCount + 1))].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="scale-building"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ height: `${40 + i * 20}px` }}
                  />
                ))}
              </div>
              <p className="scale-caption">
                {isCrisis 
                  ? "Quy mô bị thu hẹp do mất vốn (Phá sản)." 
                  : "Quy mô tăng dần qua từng chu kỳ nhờ Tích lũy (Tư bản hóa m)."}
              </p>
            </div>
          </div>

          {/* Right: Theory Explanation */}
          <div className="accumulation-theory">
            <div className="theory-card">
              <h3>Tái sản xuất giản đơn</h3>
              <p>Quá trình sản xuất lặp lại với quy mô như cũ. Toàn bộ giá trị thặng dư (m) bị nhà tư bản tiêu dùng cá nhân.</p>
              <div className="formula-box">T &rarr; H ...SX... H&apos; &rarr; T&apos;</div>
            </div>

            <div className="theory-card highlight">
              <div className="card-badge"><TrendingUp size={14} className="mr-1" /> Mở rộng</div>
              <h3>Tích lũy Tư bản (Tái sản xuất mở rộng)</h3>
              <p>Biến một phần giá trị thặng dư (m) thành tư bản phụ thêm. Nếu Alpha Corp bán được nhà, họ sẽ trích lợi nhuận để xây dự án lớn hơn.</p>
              <div className="formula-box">T &rarr; H ...SX... H&apos; &rarr; T&apos; <span className="text-teal font-bold ml-2">(T&apos; &gt; T)</span></div>
            </div>

            <div className={`theory-card crisis-box ${isCrisis ? 'active' : ''}`}>
              <h3>Đứt gãy Tái sản xuất</h3>
              <p>Khủng hoảng thanh khoản khiến doanh nghiệp không thể thu hồi tư bản ứng trước (T), chưa nói đến giá trị thặng dư (m). Quá trình tái sản xuất bị đình chỉ, tư bản hao mòn vô hình và hữu hình.</p>
            </div>
          </div>
        </div>
      </Section>
  );
};

export default AccumulationSection;
