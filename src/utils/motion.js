// Shared Framer Motion Variants

export const revealVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] // motion-ease-in-out
      }
    }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "linear"
      }
    }
  }
};

export const transitionDefaults = {
  micro: { duration: 0.15, ease: [0, 0, 0.2, 1] },
  ui: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  section: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  story: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
};
