import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gauge, SlidersHorizontal } from 'lucide-react';
import { FadeIn } from './MotionReveal';

const previewRows = [
  ['Tiền dự phòng', 'Giữ nhịp thanh khoản khi lưu thông kéo dài'],
  ['Tư liệu sản xuất', 'Khóa vốn vào đầu vào cố định và vật liệu'],
  ['Chi phí xây dựng', 'Quyết định tốc độ hoàn thiện phần thô'],
  ['Tiền lương', 'Duy trì sức lao động và năng lực sản xuất'],
  ['Hàng hóa bất động sản', "Nơi vốn bị kẹt khi H' không bán được"],
  ['Lãi vay và nghĩa vụ thanh toán', 'Áp lực phải có tiền quay lại đúng hạn'],
];

const SimulatorPreviewSection = () => {
  return (
    <section className="content-section section-dark">
      <FadeIn className="section-heading">
        <span className="kicker">Section 06</span>
        <h2>Thử cứu Alpha Corp</h2>
        <p>
          Trang mô phỏng đầy đủ giữ nguyên logic cốt lõi nhưng được neo lại vào các biến số học thuật:
          dự phòng, tư liệu sản xuất, lương, hàng hóa bất động sản và nghĩa vụ thanh toán.
        </p>
      </FadeIn>

      <div className="preview-shell">
        <FadeIn className="preview-list forensic-panel" delay={0.08}>
          <div className="preview-topline">
            <div className="preview-badge">
              <SlidersHorizontal size={16} />
              <span>Capital mix</span>
            </div>
            <div className="preview-badge">
              <Gauge size={16} />
              <span>Liquidity gauge</span>
            </div>
          </div>
          {previewRows.map(([label, note]) => (
            <div key={label} className="preview-row">
              <div>
                <strong>{label}</strong>
                <motion.div
                  className="preview-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(22, label.length * 4)}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p>{note}</p>
            </div>
          ))}
        </FadeIn>

        <div className="preview-cta">
          <FadeIn className="forensic-panel" delay={0.14}>
            <div className="panel-header">
              <span className="eyebrow">Action</span>
              <strong>Bắt đầu mô phỏng phân bổ vốn</strong>
            </div>
            <div className="sim-preview-gauge">
              <div className="gauge-arc">
                <div className="gauge-core">
                  <span className="detail-label">Risk state</span>
                  <strong>Căng nhưng cứu được</strong>
                </div>
              </div>
              <p>
                Tự điều chỉnh tỷ lệ vốn để kiểm tra xem doanh nghiệp có đủ sức chịu một giai đoạn thị
                trường đóng băng hay không.
              </p>
            </div>
            <Link className="btn btn-primary" to="/simulators">
              Đi tới mô phỏng
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default SimulatorPreviewSection;
