// Shared Motion Tokens and Variants

export const motionTokens = {
  micro: 0.18,
  fast: 0.28,
  normal: 0.42,
  section: 0.62,
  story: 0.85,
  easing: {
    out: [0.22, 1, 0.36, 1],
    inOut: [0.65, 0, 0.35, 1],
  },
};

export const PENDING_HOME_SECTION_STORAGE_KEY = "alpha-home-section-target";

export const revealVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionTokens.micro,
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
        duration: motionTokens.normal,
        ease: motionTokens.easing.out
      }
    }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: motionTokens.fast,
        ease: "linear"
      }
    }
  },
  maskItem: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.section,
        ease: motionTokens.easing.out
      }
    }
  }
};

export const transitionDefaults = {
  micro: { duration: motionTokens.micro, ease: motionTokens.easing.out },
  ui: { duration: motionTokens.fast, ease: motionTokens.easing.out },
  section: { duration: motionTokens.section, ease: motionTokens.easing.out },
  story: { duration: motionTokens.story, ease: motionTokens.easing.out }
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getScrollBehavior = () => (prefersReducedMotion() ? 'auto' : 'smooth');

const getLenisScroller = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.__appLenis ?? null;
};

export const scrollToY = (top) => {
  if (typeof window === 'undefined') {
    return;
  }

  const target = Math.max(0, top);
  const lenis = getLenisScroller();

  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target, {
      duration: 0.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    return;
  }

  window.scrollTo({
    top: target,
    behavior: getScrollBehavior(),
  });
};

export const scrollToPageTop = () => {
  scrollToY(0);
};

const getHeaderOffset = () => {
  if (typeof window === 'undefined') {
    return 112;
  }

  const rootStyles = window.getComputedStyle(document.documentElement);
  const cssHeaderOffset = parseFloat(rootStyles.getPropertyValue('--header-offset'));
  return Number.isFinite(cssHeaderOffset) ? cssHeaderOffset + 40 : 152;
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

  scrollToY(top);
};
