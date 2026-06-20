import { motion } from 'framer-motion';
import { revealVariants } from '../../utils/motion';

const Section = ({ 
  children, 
  id, 
  className = '', 
  containerClass = 'container',
  containerProps = {},
  bgColor = 'var(--page-background)',
  ...props 
}) => {
  return (
    <motion.section 
      id={id}
      className={`section-padding ${className}`}
      style={{ backgroundColor: bgColor }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={revealVariants.container}
      {...props}
    >
      <div className={containerClass} {...containerProps}>
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
