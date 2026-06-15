import { motion } from 'framer-motion';
import { Landmark, Briefcase } from 'lucide-react';
import Section from '../shared/Section';
import SectionHeader from '../shared/SectionHeader';
import './ProfitInterestSection.css';

const ProfitInterestSection = () => {
  return (
    <Section className="profit-section" id="profit" bgColor="var(--surface-secondary)">
        <SectionHeader
          eyebrow="Phân chia Giá trị thặng dư"
          title="Lợi nhuận (p) & Lợi tức (z)"
          subtitle="Khi Alpha Corp tạo ra lợi nhuận từ dự án, khoản tiền đó không thuộc về họ toàn bộ. Nó bị xâu xé bởi các bên tham gia theo tỷ lệ quyền lực vốn."
        />

        <div className="profit-workspace">
          <div className="profit-visual">
            <div className="value-block total-m">
              <div className="block-header">
                <strong>Tổng Giá trị Thặng dư (m)</strong>
                <span>Do công nhân xây dựng tạo ra</span>
              </div>
              <div className="block-body">
                <div className="split-arrow down"></div>
                <div className="split-branches">
                  {/* Entrepreneur Profit */}
                  <div className="branch p-branch">
                    <div className="branch-line"></div>
                    <motion.div 
                      className="value-node node-p"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <Briefcase size={24} className="node-icon" />
                      <h4>Lợi nhuận Doanh nghiệp</h4>
                      <span className="symbol">p<sub>doanh nghiệp</sub></span>
                      <p>Phần Alpha Corp giữ lại để đắp vào vốn tự có, thưởng cho ban giám đốc hoặc tái sản xuất.</p>
                    </motion.div>
                  </div>

                  {/* Interest */}
                  <div className="branch z-branch">
                    <div className="branch-line"></div>
                    <motion.div 
                      className="value-node node-z"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <Landmark size={24} className="node-icon" />
                      <h4>Lợi tức Ngân hàng</h4>
                      <span className="symbol">z</span>
                      <p>Phần Alpha Corp phải cắt ra trả cho ngân hàng vì đã dùng 10.000 tỷ vốn vay.</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profit-theory">
            <div className="theory-card">
              <h3>Bản chất của Lợi tức (z)</h3>
              <p>Lợi tức thực chất là <strong>một phần của giá trị thặng dư</strong> mà nhà tư bản đi vay (Alpha Corp) phải nhường lại cho nhà tư bản cho vay (Ngân hàng) để được quyền sử dụng vốn.</p>
              <div className="equation">0 &lt; z &lt; p&#x0304;</div>
              <p className="text-sm text-muted mt-2">Lợi tức luôn lớn hơn 0 và nhỏ hơn tỷ suất lợi nhuận bình quân.</p>
            </div>

            <div className="theory-card crisis-context">
              <h3>Khi Khủng hoảng xảy ra</h3>
              <ul className="crisis-list">
                <li>
                  <AlertCircleIcon />
                  <div>
                    <strong>m = 0 (Chưa hiện thực hóa)</strong>
                    <span>Vì không bán được nhà, giá trị thặng dư nằm im trong gạch ngói.</span>
                  </div>
                </li>
                <li>
                  <AlertCircleIcon />
                  <div>
                    <strong>z vẫn lớn hơn 0</strong>
                    <span>Dù không có doanh thu, lãi vay (z) vẫn cộng dồn hàng ngày (Lãi mẹ đẻ lãi con).</span>
                  </div>
                </li>
                <li>
                  <AlertCircleIcon />
                  <div>
                    <strong>p âm</strong>
                    <span>Doanh nghiệp phải lấy vốn tự có (hoặc đi vay nóng) để trả lãi, dẫn đến cụt vốn và phá sản.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
  );
};

const AlertCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

export default ProfitInterestSection;
