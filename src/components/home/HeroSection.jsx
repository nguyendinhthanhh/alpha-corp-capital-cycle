import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Building2, Landmark, ShieldAlert, Wallet } from 'lucide-react';
import { caseStatus, heroFlowStages } from '../../data/caseData';
import { FadeIn, StaggerGroup, StaggerItem } from './MotionReveal';

const HeroSection = ({ crisisActive, onToggleCrisis }) => {
  const [activeStage, setActiveStage] = useState(heroFlowStages[0].key);
  const reduceMotion = useReducedMotion();

  const stageIcons = {
    T: Wallet,
    H: Landmark,
    SX: Building2,
    "H'": ShieldAlert,
    "T'": ArrowRight,
  };

  return (
    <section className="hero-grid">
      <FadeIn className="hero-copy" y={40}>
        <span className="kicker">Hồ sơ khủng hoảng 001</span>
        <h1>10.000 tỷ đồng đã mắc kẹt ở đâu?</h1>
        <p className="hero-intro">
          Alpha Corp đã chuyển khoản vốn vay thành đất đai, máy móc, vật liệu, sức lao động và ba
          tòa tháp phần thô. Cú sốc đến khi thị trường không còn hấp thụ được H&apos;, khiến dòng vốn
          dừng lại ngay trước khi quay về T&apos;.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#case-file">
            Mở hồ sơ điều tra
          </a>
          <button type="button" className="btn btn-secondary" onClick={onToggleCrisis}>
            {crisisActive ? 'Đặt lại trạng thái vận hành' : 'Kích hoạt khủng hoảng'}
          </button>
        </div>

        <div className="hero-micro-grid">
          <div className="hero-mini-card">
            <span className="detail-label">Điểm điều tra chính</span>
            <strong>H&apos; không thực hiện được giá trị</strong>
            <p>Phần lớn vốn bị đóng băng trong bất động sản và công trình dở dang.</p>
          </div>
          <div className="hero-mini-card">
            <span className="detail-label">Tác động tức thì</span>
            <strong>Thanh khoản chuyển từ căng sang nguy cấp</strong>
            <p>Lãi vay, lương và chu kỳ tiếp theo đều phụ thuộc vào việc T&apos; có hình thành hay không.</p>
          </div>
        </div>

        <div className="hero-alert-row">
          <div className="inline-status">
            <span className={`status-chip ${crisisActive ? 'is-danger' : 'is-safe'}`}>
              {crisisActive ? 'Thanh khoản: nguy cấp' : 'Thanh khoản: có vùng đệm'}
            </span>
          </div>
          <p className="hero-caption">
            Tư bản chỉ hoàn tất chu kỳ khi <strong>giá trị hàng hóa quay lại thành tiền mặt</strong>.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="hero-diagram forensic-panel" delay={0.1}>
        <div className="panel-header">
          <span className="eyebrow">Dòng tuần hoàn trung tâm</span>
          <strong>T – H … SX … H&apos; – T&apos;</strong>
        </div>

        <div className="hero-diagram-stage">
          <div className={`capital-track is-premium ${crisisActive ? 'is-crisis' : ''}`}>
            {heroFlowStages.map((stage, index) => {
              const Icon = stageIcons[stage.key];
              const isHot = activeStage === stage.key;

              return (
                <motion.button
                  key={stage.key}
                  type="button"
                  className={`track-node track-card ${isHot ? 'is-active' : ''} ${
                    stage.key === "H'" && crisisActive ? 'is-danger' : ''
                  } ${stage.key === "T'" && crisisActive ? 'is-muted' : ''}`}
                  onHoverStart={() => setActiveStage(stage.key)}
                  onFocus={() => setActiveStage(stage.key)}
                  onClick={() => setActiveStage(stage.key)}
                  whileHover={reduceMotion ? {} : { y: -4 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="track-symbol">
                    <Icon size={18} />
                    <em>{stage.key}</em>
                  </span>
                  <div>
                    <strong>{stage.title}</strong>
                    <p>{stage.detail}</p>
                  </div>
                  {index < heroFlowStages.length - 1 && (
                    <div className={`track-link ${index === heroFlowStages.length - 2 && crisisActive ? 'is-blocked' : ''}`}>
                      <motion.span
                        animate={
                          reduceMotion
                            ? {}
                            : crisisActive
                              ? { opacity: 0.35 }
                              : { x: ['-12%', '12%'], opacity: [0.15, 1, 0.15] }
                        }
                        transition={reduceMotion ? {} : { duration: 1.8, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          <motion.div
            className={`flow-warning ${crisisActive ? 'is-visible' : ''}`}
            initial={false}
            animate={crisisActive ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <AlertTriangle size={18} />
            <div>
              <strong>{crisisActive ? 'Không thể thực hiện giá trị hàng hóa' : 'Dòng lưu thông còn hoạt động'}</strong>
              <p>
                {crisisActive
                  ? "Mũi tên H' → T' bị khóa, khiến thanh khoản sụt mạnh và chu kỳ kế tiếp không thể mở."
                  : 'Từng khâu vẫn còn nối được với nhau, nên T’ có khả năng quay lại thành vốn tiền tệ.'}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="diagram-events">
          <div className={`event-line ${crisisActive ? 'is-danger' : ''}`}>
            <span>H&apos; → T&apos;</span>
            <p>
              {crisisActive
                ? 'Không thể thực hiện giá trị hàng hóa, dòng vốn dừng lại ngay trước khi quay về tiền mặt.'
                : 'Hàng hóa còn khả năng được tiêu thụ, chu kỳ kế tiếp vẫn có cửa tái khởi động.'}
            </p>
          </div>
          <div className="event-meta">
            <span className={`status-chip ${crisisActive ? 'is-danger' : 'is-info'}`}>
              {crisisActive ? 'Nghĩa vụ trả lãi: cảnh báo' : 'Nghĩa vụ trả lãi: trong kiểm soát'}
            </span>
            <span className={`status-chip ${crisisActive ? 'is-danger' : 'is-info'}`}>
              {crisisActive ? 'Tiền lương: cảnh báo' : 'Tiền lương: đang duy trì'}
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn className="hero-status forensic-panel" delay={0.16}>
        <div className="panel-header">
          <span className="eyebrow">Trạng thái vụ việc</span>
          <strong>Live Case Status</strong>
        </div>

        <StaggerGroup className="status-rows premium-status-rows">
          {caseStatus.map((item) => (
            <StaggerItem key={item.label}>
              <div className="status-row status-row-premium">
                <span>{item.label}</span>
                <strong className={`tone-${item.tone}`}>{item.value}</strong>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </FadeIn>
    </section>
  );
};

export default HeroSection;
