import { motion } from 'framer-motion';
import { revealVariants } from '../../utils/motion';
import './SectionHeader.css';

const SectionHeader = ({ eyebrow, title, subtitle, align = 'center', className = '' }) => {
  return (
    <div className={`section-header text-${align} ${className}`}>
      {eyebrow && (
        <motion.span className="section-eyebrow text-small" variants={revealVariants.fade}>
          {eyebrow}
        </motion.span>
      )}
      <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
        <motion.h2 className="section-title text-h2" variants={revealVariants.maskItem}>
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <motion.p className="section-subtitle text-body-large" variants={revealVariants.item}>
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
