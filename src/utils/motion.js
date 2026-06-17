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

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getScrollBehavior = () => (prefersReducedMotion() ? 'auto' : 'smooth');

const getHeaderOffset = () => {
  if (typeof window === 'undefined') {
    return 96;
  }

  const rootStyles = window.getComputedStyle(document.documentElement);
  const cssHeaderHeight = parseFloat(rootStyles.getPropertyValue('--header-height'));
  return Number.isFinite(cssHeaderHeight) ? cssHeaderHeight + 24 : 104;
};

export const scrollToSectionById = (id) => {
  if (typeof window === 'undefined') {
    return;
  }

  const section = document.getElementById(id);
  if (!section) {
    return;
  }

  const preferredTarget =
    section.querySelector('.section-header') ||
    section.querySelector('h1, h2, h3');

  const anchor = preferredTarget || section;
  const top = window.scrollY + anchor.getBoundingClientRect().top - getHeaderOffset();

  window.scrollTo({
    top: Math.max(0, top),
    behavior: getScrollBehavior(),
  });
};
