import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Building, Wallet, TrendingDown } from 'lucide-react';
import Section from '../shared/Section';
import { scrollToSectionById } from '../../utils/motion';
import './HeroSection.css';

const HeroSection = ({ isCrisis, onToggleCrisis }) => {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <Section
      id="hero"
      className="hero-section"
      containerClass="container hero-grid-2col"
      bgColor="var(--page-background)"
    >
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-eyebrow text-small" variants={itemVariants}>
          NGHIÊN CỨU TÌNH HUỐNG MLN122
        </motion.div>

        <motion.h1 className="hero-heading text-display" variants={itemVariants}>
          Khi 10.000 tỷ đồng không thể quay trở lại
        </motion.h1>

        <motion.p className="hero-intro text-body-large text-secondary" variants={itemVariants}>
          Theo dấu quá trình chuyển hóa của tư bản trong dự án Alpha Corp và khám phá vì sao
          một doanh nghiệp sở hữu khối tài sản lớn nhưng vẫn rơi vào khủng hoảng thanh khoản
          trầm trọng.
        </motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>
          <button
            className="btn btn-primary"
            onClick={() => scrollToSectionById('capital-journey')}
          >
            Theo dõi hành trình vốn <ArrowRight size={18} className="ml-2" />
          </button>
          <button className={`btn btn-crisis-toggle ${isCrisis ? 'active' : ''}`} onClick={onToggleCrisis}>
            <AlertTriangle size={18} className="mr-2" />
            {isCrisis ? 'Tắt khủng hoảng' : 'Kích hoạt khủng hoảng'}
          </button>
        </motion.div>

        <motion.div className="hero-metrics" variants={itemVariants}>
          <div className="metric-item">
            <Wallet size={20} className="metric-icon gold" />
            <div>
              <span className="metric-label">Vốn khởi điểm (T)</span>
              <strong className="metric-value">10.000 tỷ vay mượn</strong>
            </div>
          </div>
          <div className="metric-item">
            <Building size={20} className="metric-icon teal" />
            <div>
              <span className="metric-label">Hiện trạng (H&apos;)</span>
              <strong className="metric-value">3 tháp xây dở dang</strong>
            </div>
          </div>
          <div className="metric-item">
            <TrendingDown size={20} className={`metric-icon ${isCrisis ? 'red' : 'navy'}`} />
            <div>
              <span className="metric-label">Điểm nghẽn thanh khoản</span>
              <strong className="metric-value">H&apos; -&gt; T&apos;</strong>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-visual">
        <div className="visual-container">
          <motion.div
            className={`visual-buildings ${isCrisis ? 'in-crisis' : ''}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 0.8, ease: 'easeOut' }}
          >
            <div className="building-silhouette b1" />
            <div className="building-silhouette b2" />
            <div className="building-silhouette b3" />
          </motion.div>

          <div className={`capital-flow-track ${isCrisis ? 'crisis-active' : ''}`}>
            <div className="flow-node node-t active">
              <span className="node-label tooltip-trigger" data-tooltip="Tư bản tiền tệ (vốn vay)">
                T
              </span>
            </div>
            <div className="flow-node node-h active">
              <span className="node-label tooltip-trigger" data-tooltip="Tư liệu sản xuất và sức lao động">
                H
              </span>
            </div>
            <div className="flow-node node-sx active">
              <span className="node-label tooltip-trigger" data-tooltip="Quá trình sản xuất (thi công)">
                SX
              </span>
            </div>
            <div className="flow-node node-hp active">
              <span className="node-label tooltip-trigger" data-tooltip="Tư bản hàng hóa (tháp phần thô)">
                H&apos;
              </span>
            </div>
            <div className={`flow-node node-tp ${isCrisis ? 'disabled' : 'active'}`}>
              <span className="node-label tooltip-trigger" data-tooltip="Tiền thu về (bán hàng)">
                T&apos;
              </span>
            </div>

            <div className="flow-path path-1">
              <motion.div
                className="path-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.18 }}
              />
            </div>
            <div className="flow-path path-2">
              <motion.div
                className="path-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.38 }}
              />
            </div>
            <div className="flow-path path-3">
              <motion.div
                className="path-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.58 }}
              />
            </div>
            <div className={`flow-path path-4 ${isCrisis ? 'blocked' : ''}`}>
              <motion.div
                className={`path-fill ${isCrisis ? 'error' : ''}`}
                initial={{ width: '0%' }}
                animate={{ width: isCrisis ? '42%' : '100%' }}
                transition={{ duration: 0.42, delay: isCrisis ? 0 : 0.78 }}
              />

              <AnimatePresence>
                {isCrisis && (
                  <motion.div
                    className="block-marker"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={reduceMotion ? { duration: 0.01 } : { duration: 0.32, type: 'spring' }}
                  >
                    <AlertTriangle size={24} color="var(--red-500)" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="layer-card layer-money"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.18 }}
          >
            10.000 tỷ đồng
          </motion.div>

          <motion.div
            className="layer-card layer-assets"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.38 }}
          >
            Vật liệu, máy móc, nhân công
          </motion.div>

          <motion.div
            className="layer-card layer-goods"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.58 }}
          >
            3 tòa tháp dở dang
          </motion.div>

          <AnimatePresence>
            {isCrisis && (
              <motion.div
                className="layer-card layer-crisis-alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
              >
                <AlertTriangle size={16} className="mr-2" /> Thanh khoản đóng băng
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
