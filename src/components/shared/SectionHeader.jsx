import { motion } from 'framer-motion';
import { revealVariants } from '../../utils/motion';
import './SectionHeader.css';

const SectionHeader = ({ eyebrow, title, subtitle, align = 'center', className = '' }) => {
  return (
    <motion.div 
      className={`section-header text-${align} ${className}`}
      variants={revealVariants.item}
    >
      {eyebrow && <span className="section-eyebrow text-small">{eyebrow}</span>}
      <h2 className="section-title text-h2">{title}</h2>
      {subtitle && <p className="section-subtitle text-body-large">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeader;
