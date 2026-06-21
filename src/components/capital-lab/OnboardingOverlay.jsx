import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen } from 'lucide-react';
import './OnboardingOverlay.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const childVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const OnboardingOverlay = ({ onStart }) => {
  const btnRef = useRef(null);
  const [showGuide, setShowGuide] = useState(false);
  const guideTimerRef = useRef(null);

  // Auto-focus CTA
  useEffect(() => {
    const timer = setTimeout(() => {
      btnRef.current?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // ESC key triggers onStart
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  const handleToggleGuide = useCallback(() => {
    setShowGuide(true);
    // Auto-hide after 4 seconds
    if (guideTimerRef.current) clearTimeout(guideTimerRef.current);
    guideTimerRef.current = setTimeout(() => {
      setShowGuide(false);
    }, 4000);
  }, []);

  useEffect(() => {
    return () => {
      if (guideTimerRef.current) clearTimeout(guideTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      className="onboarding-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="onboarding-hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="onboarding-eyebrow" variants={childVariants}>
          TRẢI NGHIỆM TƯƠNG TÁC MLN122
        </motion.span>

        <motion.h1 className="onboarding-heading" variants={childVariants}>
          10.000 tỷ đồng đang mắc kẹt trong thành phố này
        </motion.h1>

        <motion.p className="onboarding-description" variants={childVariants}>
          Theo dấu dòng vốn từ khoản vay, đầu vào sản xuất, ba tòa tháp phần thô
          đến điểm đứt gãy H' → T'.
        </motion.p>

        <motion.div className="onboarding-actions" variants={childVariants}>
          <button
            ref={btnRef}
            className="onboarding-cta-primary"
            onClick={onStart}
            aria-label="Bắt đầu nhiệm vụ — phòng mô phỏng dòng vốn"
          >
            <Play size={20} aria-hidden="true" />
            <span>Bắt đầu nhiệm vụ</span>
          </button>

          <button
            className="onboarding-cta-secondary"
            onClick={handleToggleGuide}
            aria-label="Xem hướng dẫn sử dụng"
          >
            <BookOpen size={16} aria-hidden="true" />
            <span>Xem hướng dẫn</span>
          </button>
        </motion.div>

        {showGuide && (
          <motion.ul
            className="onboarding-guide-list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <li>Cuộn hoặc nhấn <strong>Tiếp tục</strong> để chuyển nhiệm vụ</li>
            <li>Nhấn vào <strong>node 3D</strong> để xem giải thích chi tiết</li>
            <li>Quan sát điểm đứt gãy <strong>H' → T'</strong> để hiểu khủng hoảng</li>
          </motion.ul>
        )}

        <motion.p className="onboarding-hint" variants={childVariants}>
          Cuộn để chuyển nhiệm vụ · Nhấn node để phân tích
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
