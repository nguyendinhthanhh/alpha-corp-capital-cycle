import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, AlertCircle, Building, Wallet, TrendingDown } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  // Stagger variants for left content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.5, // Start after visual animation
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
    <section className="hero-section">
      <div className="container hero-grid-2col">
        {/* Left Column: Content */}
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-eyebrow" variants={itemVariants}>
            NGHIÊN CỨU TÌNH HUỐNG MLN122
          </motion.div>
          
          <motion.h1 className="hero-heading" variants={itemVariants}>
            Khi 10.000 tỷ đồng không thể quay trở lại
          </motion.h1>
          
          <motion.p className="hero-intro" variants={itemVariants}>
            Theo dấu quá trình chuyển hóa của tư bản trong dự án Alpha Corp và khám phá vì sao một doanh nghiệp sở hữu nhiều tài sản vẫn có thể rơi vào khủng hoảng thanh khoản.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <button className="btn btn-primary" onClick={() => document.getElementById('crisis')?.scrollIntoView({behavior: 'smooth'})}>
              Bắt đầu điều tra <ArrowRight size={18} className="ml-2" />
            </button>
            <button className="btn btn-secondary" onClick={() => document.getElementById('capital-journey')?.scrollIntoView({behavior: 'smooth'})}>
              <PlayCircle size={18} className="mr-2" /> Khám phá dòng tuần hoàn
            </button>
          </motion.div>
          
          <motion.div className="hero-metrics" variants={itemVariants}>
            <div className="metric-item">
              <Wallet size={20} className="metric-icon gold" />
              <div>
                <span className="metric-label">Vốn vay</span>
                <strong className="metric-value">10.000 tỷ đồng</strong>
              </div>
            </div>
            <div className="metric-item">
              <Building size={20} className="metric-icon teal" />
              <div>
                <span className="metric-label">Công trình</span>
                <strong className="metric-value">3 tòa tháp phần thô</strong>
              </div>
            </div>
            <div className="metric-item">
              <TrendingDown size={20} className="metric-icon red" />
              <div>
                <span className="metric-label">Điểm tắc nghẽn</span>
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
              className="visual-buildings"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="building-silhouette b1"></div>
              <div className="building-silhouette b2"></div>
              <div className="building-silhouette b3"></div>
            </motion.div>

            {/* Capital Flow Track */}
            <div className="capital-flow-track">
              {/* Nodes */}
              <div className="flow-node node-t">
                <span className="node-label tooltip-trigger" data-tooltip="Tư bản tiền tệ">T</span>
              </div>
              <div className="flow-node node-h">
                <span className="node-label tooltip-trigger" data-tooltip="Tư liệu sản xuất & Sức lao động">H</span>
              </div>
              <div className="flow-node node-sx">
                <span className="node-label tooltip-trigger" data-tooltip="Quá trình sản xuất">SX</span>
              </div>
              <div className="flow-node node-hp">
                <span className="node-label tooltip-trigger" data-tooltip="Tư bản hàng hóa">H&apos;</span>
              </div>
              <div className="flow-node node-tp disabled">
                <span className="node-label tooltip-trigger" data-tooltip="Tiền thu về (Đứt gãy)">T&apos;</span>
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
              <div className="flow-path path-4 blocked">
                <motion.div className="path-fill error" 
                  initial={{ width: "0%" }} 
                  animate={{ width: "40%" }} 
                  transition={{ duration: 0.4, delay: 2.3 }} 
                />
                <motion.div 
                  className="block-marker"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 2.7, type: "spring" }}
                >
                  <AlertCircle size={24} color="var(--red-500)" />
                </motion.div>
              </div>
            </div>
            
            {/* Floating Layers */}
            <motion.div className="layer-card layer-money"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              10.000 Tỷ
            </motion.div>
            
            <motion.div className="layer-card layer-assets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              Đất, Máy móc, Nhân công
            </motion.div>

            <motion.div className="layer-card layer-goods"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.7 }}
            >
              3 Tòa tháp dở dang
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
