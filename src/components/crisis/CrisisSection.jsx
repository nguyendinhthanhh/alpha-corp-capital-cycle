import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, RefreshCcw } from 'lucide-react';
import Section from '../shared/Section';
import SectionHeader from '../shared/SectionHeader';
import './CrisisSection.css';

const CrisisSection = () => {
  const [isCrisisActive, setIsCrisisActive] = useState(false);

  return (
    <Section className="crisis-section theme-navy" id="crisis">
        <SectionHeader
          eyebrow="Điểm đứt gãy"
          title="Điểm đứt gãy không nằm ở việc thiếu tài sản"
          subtitle="Nó nằm ở việc giá trị hàng hóa không được thực hiện trên thị trường. Thanh khoản là khả năng quay về tiền, không phải quy mô của tài sản."
        />

        <div className="crisis-interactive">
          <div className="crisis-visual-area">
            {/* Base Flow: T -> H -> SX -> H' -> T' */}
            <div className="crisis-flow">
              <div className="c-node">T</div>
              <div className="c-connector"></div>
              <div className="c-node">H</div>
              <div className="c-connector"></div>
              <div className="c-node">SX</div>
              <div className="c-connector"></div>
              <div className="c-node hp-node">H&apos;</div>
              
              <div className={`c-connector final-connector ${isCrisisActive ? 'is-blocked' : ''}`}>
                {!isCrisisActive && (
                  <motion.div 
                    className="moving-capital"
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                {isCrisisActive && (
                  <motion.div 
                    className="crisis-marker"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    X
                  </motion.div>
                )}
              </div>
              
              <div className={`c-node tp-node ${isCrisisActive ? 'is-locked' : ''}`}>
                T&apos;
              </div>
            </div>
            
            {/* Status indicators */}
            <div className="crisis-status-row">
              <div className={`status-pill ${isCrisisActive ? 'danger' : 'safe'}`}>
                {isCrisisActive ? 'Thị trường đóng băng' : 'Thị trường ổn định'}
              </div>
              <div className={`status-pill ${isCrisisActive ? 'danger' : 'safe'}`}>
                {isCrisisActive ? 'Thanh khoản: Nguy cấp' : 'Thanh khoản: Có dòng tiền'}
              </div>
            </div>
          </div>

          <div className="crisis-control-area">
            <button 
              className={`btn ${isCrisisActive ? 'btn-secondary-inverse' : 'btn-danger'}`}
              onClick={() => setIsCrisisActive(!isCrisisActive)}
            >
              {isCrisisActive ? (
                <><RefreshCcw size={18} className="mr-2" /> Khôi phục thị trường</>
              ) : (
                <><TrendingDown size={18} className="mr-2" /> Kích hoạt cú sốc thị trường</>
              )}
            </button>
            
            <div className="explanation-panel">
              <AnimatePresence mode="wait">
                {!isCrisisActive ? (
                  <motion.div 
                    key="calm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="exp-content calm"
                  >
                    <h4>Trước khủng hoảng</h4>
                    <ul>
                      <li>Dòng vốn luân chuyển liên tục qua các hình thái.</li>
                      <li>Hàng hóa (H&apos;) được thị trường hấp thụ tốt.</li>
                      <li>Tiền bán hàng quay về (T&apos;) giúp thanh toán lãi vay và tái sản xuất.</li>
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="crisis"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="exp-content crisis"
                  >
                    <h4>Sau cú sốc thị trường</h4>
                    <ul>
                      <li>Tín dụng bị siết, lãi suất tăng, sức mua suy giảm.</li>
                      <li>Hàng hóa tồn tại nhưng <strong>thời gian lưu thông kéo dài</strong>.</li>
                      <li>H&apos; không chuyển thành T&apos;. Chu kỳ tiếp theo bị gián đoạn.</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Section>
  );
};

export default CrisisSection;
