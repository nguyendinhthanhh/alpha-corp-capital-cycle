import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertTriangle, Building, Wallet, TrendingDown } from 'lucide-react';
import Section from '../shared/Section';
import './HeroSection.css';

const HeroSection = ({ isCrisis, onToggleCrisis }) => {
  // Stagger variants for left content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <Section id="hero" className="hero-section" containerClass="container hero-grid-2col" bgColor="var(--page-background)">
        {/* Left Column: Content */}
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
            Theo dấu quá trình chuyển hóa của tư bản trong dự án Alpha Corp và khám phá vì sao một doanh nghiệp sở hữu khối tài sản lớn nhưng vẫn rơi vào khủng hoảng thanh khoản trầm trọng.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <button className="btn btn-primary" onClick={() => document.getElementById('capital-journey')?.scrollIntoView({behavior: 'smooth'})}>
              Theo dõi Hành trình vốn <ArrowRight size={18} className="ml-2" />
            </button>
            <button className={`btn btn-crisis-toggle ${isCrisis ? 'active' : ''}`} onClick={onToggleCrisis}>
              <AlertTriangle size={18} className="mr-2" /> 
              {isCrisis ? 'Tắt Khủng hoảng' : 'Kích hoạt Khủng hoảng'}
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
                <span className="metric-label">Hiện trạng (H')</span>
                <strong className="metric-value">3 tháp xây dở dang</strong>
              </div>
            </div>
            <div className="metric-item">
              <TrendingDown size={20} className={`metric-icon ${isCrisis ? 'red' : 'navy'}`} />
              <div>
                <span className="metric-label">Điểm nghẽn thanh khoản</span>
                <strong className="metric-value">H&apos; &rarr; T&apos;</strong>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual */}
        <div className="hero-visual">
          <div className="visual-container">
            {/* Base Buildings */}
            <motion.div 
              className={`visual-buildings ${isCrisis ? 'in-crisis' : ''}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="building-silhouette b1"></div>
              <div className="building-silhouette b2"></div>
              <div className="building-silhouette b3"></div>
            </motion.div>

            {/* Capital Flow Track */}
            <div className={`capital-flow-track ${isCrisis ? 'crisis-active' : ''}`}>
              {/* Nodes */}
              <div className="flow-node node-t active">
                <span className="node-label tooltip-trigger" data-tooltip="Tư bản Tiền tệ (Vốn vay)">T</span>
              </div>
              <div className="flow-node node-h active">
                <span className="node-label tooltip-trigger" data-tooltip="Tư liệu sản xuất & Sức lao động">H</span>
              </div>
              <div className="flow-node node-sx active">
                <span className="node-label tooltip-trigger" data-tooltip="Quá trình sản xuất (Thi công)">SX</span>
              </div>
              <div className="flow-node node-hp active">
                <span className="node-label tooltip-trigger" data-tooltip="Tư bản hàng hóa (Tháp phần thô)">H&apos;</span>
              </div>
              <div className={`flow-node node-tp ${isCrisis ? 'disabled' : 'active'}`}>
                <span className="node-label tooltip-trigger" data-tooltip="Tiền thu về (Bán hàng)">T&apos;</span>
              </div>

              {/* Paths */}
              <div className="flow-path path-1">
                <motion.div className="path-fill" 
                  initial={{ width: "0%" }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 0.6, delay: 0.5 }} 
                />
              </div>
              <div className="flow-path path-2">
                <motion.div className="path-fill" 
                  initial={{ width: "0%" }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 0.6, delay: 1.1 }} 
                />
              </div>
              <div className="flow-path path-3">
                <motion.div className="path-fill" 
                  initial={{ width: "0%" }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 0.6, delay: 1.7 }} 
                />
              </div>
              <div className={`flow-path path-4 ${isCrisis ? 'blocked' : ''}`}>
                <motion.div className={`path-fill ${isCrisis ? 'error' : ''}`} 
                  initial={{ width: "0%" }} 
                  animate={{ width: isCrisis ? "40%" : "100%" }} 
                  transition={{ duration: 0.4, delay: isCrisis ? 0 : 2.3 }} 
                />
                
                <AnimatePresence>
                  {isCrisis && (
                    <motion.div 
                      className="block-marker"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <AlertTriangle size={24} color="var(--red-500)" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Floating Layers */}
            <motion.div className="layer-card layer-money"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              10.000 Tỷ đồng
            </motion.div>
            
            <motion.div className="layer-card layer-assets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              Vật liệu, Máy móc, Nhân công
            </motion.div>

            <motion.div className="layer-card layer-goods"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.7 }}
            >
              3 Tòa tháp dở dang
            </motion.div>

            <AnimatePresence>
              {isCrisis && (
                <motion.div className="layer-card layer-crisis-alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertTriangle size={16} className="mr-2" /> Thanh khoản đóng băng!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>
  );
};

export default HeroSection;
