import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertTriangle, Building, Wallet, TrendingDown } from 'lucide-react';
import Section from '../shared/Section';
import Atmosphere from '../shared/Atmosphere';
import { scrollToSectionById, motionTokens, prefersReducedMotion } from '../../utils/motion';
import './HeroSection.css';

const HeroSection = ({ isCrisis, onToggleCrisis }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionTokens.micro,
        delayChildren: 0.1,
      },
    },
  };

  const maskItemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: motionTokens.section, ease: motionTokens.easing.out },
    },
  };

  const fadeItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: motionTokens.normal, ease: motionTokens.easing.out },
    },
  };

  return (
    <Section
      id="hero"
      className="hero-section"
      containerClass="container hero-grid-2col"
      bgColor="transparent"
    >
      <Atmosphere variant="hero" isCrisis={isCrisis} />
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div style={{ overflow: 'hidden' }}>
          <motion.div className="hero-eyebrow text-small" variants={maskItemVariants}>
            NGHIÊN CỨU TÌNH HUỐNG MLN122
          </motion.div>
        </div>

        <div style={{ overflow: 'hidden', paddingBottom: '0.2em' }}>
          <motion.h1 className="hero-heading text-display" variants={maskItemVariants}>
            Khi 10.000 tỷ đồng không thể quay trở lại
          </motion.h1>
        </div>

        <motion.p className="hero-intro text-body-large text-secondary" variants={fadeItemVariants}>
          Theo dấu quá trình chuyển hóa của tư bản trong dự án Alpha Corp và khám phá vì sao
          một doanh nghiệp sở hữu khối tài sản lớn nhưng vẫn rơi vào khủng hoảng thanh khoản
          trầm trọng.
        </motion.p>

        <motion.div className="hero-actions" variants={fadeItemVariants}>
          <button
            className="btn btn-primary btn-magnetic"
            onClick={() => scrollToSectionById('capital-journey')}
          >
            <span>Theo dõi hành trình vốn</span> <ArrowRight size={18} className="ml-2 btn-arrow" />
          </button>
          <button className={`btn btn-crisis-toggle ${isCrisis ? 'active' : ''}`} onClick={onToggleCrisis}>
            <AlertTriangle size={18} className="mr-2" />
            {isCrisis ? 'Tắt khủng hoảng' : 'Kích hoạt khủng hoảng'}
          </button>
        </motion.div>

        <motion.div className="hero-metrics" variants={fadeItemVariants}>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Signature Effect 2: Blueprint to Building */}
            <BlueprintBuilding width={80} height={180} delay={0.2} />
            <BlueprintBuilding width={100} height={230} delay={0.4} />
            <BlueprintBuilding width={85} height={160} delay={0.6} />
          </motion.div>

          <div className={`capital-flow-track ${isCrisis ? 'crisis-active' : ''}`}>
            <div className="flow-node node-t active">
              T
              <motion.div className="layer-card layer-money" initial={{ opacity: 0, y: 10, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} transition={{ duration: 0.35, delay: 0.8 }}>10.000 tỷ đồng</motion.div>
            </div>
            <div className="flow-node node-h active">H</div>
            <div className="flow-node node-sx active">
              SX
              <motion.div className="layer-card layer-assets" initial={{ opacity: 0, y: 10, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} transition={{ duration: 0.35, delay: 1.0 }}>Vật liệu, máy móc, nhân công</motion.div>
            </div>
            <div className="flow-node node-hp active">
              H&apos;
              <motion.div className="layer-card layer-goods" initial={{ opacity: 0, y: 10, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} transition={{ duration: 0.35, delay: 1.2 }}>3 tòa tháp dở dang</motion.div>
            </div>
            <div className={`flow-node node-tp ${isCrisis ? 'disabled' : 'active'}`}>T&apos;</div>

            <div className="flow-path path-1">
              <motion.div className="path-fill" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 0.6, delay: 0.8 }} />
            </div>
            <div className="flow-path path-2">
              <motion.div className="path-fill" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 0.6, delay: 1.0 }} />
            </div>
            <div className="flow-path path-3">
              <motion.div className="path-fill" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 0.6, delay: 1.2 }} />
            </div>
            <div className={`flow-path path-4 ${isCrisis ? 'blocked' : ''}`}>
              <motion.div
                className={`path-fill ${isCrisis ? 'error' : ''}`}
                initial={{ width: '0%' }}
                animate={{ width: isCrisis ? '42%' : '100%' }}
                transition={{ duration: 0.42, delay: isCrisis ? 0 : 1.4 }}
              />

              <AnimatePresence>
                {isCrisis && (
                  <motion.div
                    className="block-marker"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.32, type: 'spring' }}
                  >
                    <AlertTriangle size={24} color="var(--red-500)" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>



          {/* Signature Effect 3: Market Shock Transition Sequence */}
          <AnimatePresence>
            {isCrisis && (
              <motion.div
                className="crisis-sequence"
                initial="hidden" animate="visible" exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} className="layer-crisis-alert"><AlertTriangle size={14} className="mr-2"/> Tín dụng bị siết</motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} className="layer-crisis-alert"><AlertTriangle size={14} className="mr-2"/> Lãi suất tăng</motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} className="layer-crisis-alert"><AlertTriangle size={14} className="mr-2"/> Sức mua giảm</motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

const BlueprintBuilding = ({ width, height, delay }) => {
  const isReduced = prefersReducedMotion();
  return (
    <motion.svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible', margin: '0 0.5rem' }}>
      <motion.path
        d={`M 0 ${height} L 0 20 L ${width/2} 0 L ${width} 20 L ${width} ${height} Z`}
        fill="rgba(255,255,255,0.06)"
        stroke="var(--border-strong)"
        strokeWidth="2"
        initial={isReduced ? { pathLength: 1, fillOpacity: 1 } : { pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: 1.2, delay, ease: 'easeOut' },
          fillOpacity: { duration: 0.8, delay: delay + 0.8 }
        }}
      />
      <motion.path
        d={`M 10 ${height} L 10 30 M ${width/2} 10 L ${width/2} ${height} M ${width-10} ${height} L ${width-10} 30`}
        stroke="var(--teal-700)"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={isReduced ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1, delay: delay + 0.4 }}
      />
    </motion.svg>
  );
};

export default HeroSection;
