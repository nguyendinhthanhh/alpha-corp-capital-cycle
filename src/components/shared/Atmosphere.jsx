import { motion, useScroll, useTransform } from "framer-motion";
import { prefersReducedMotion } from "../../utils/motion";
import "./Atmosphere.css";

const Atmosphere = ({ variant = "default", isCrisis = false }) => {
  const { scrollYProgress } = useScroll();
  const reduceMotion = prefersReducedMotion();

  // Gentle parallax for floating elements
  const driftY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -80],
  );
  const driftYReverse = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 80],
  );

  return (
    <div
      className={`atmosphere-container variant-${variant} ${isCrisis ? "is-crisis" : ""}`}
    >
      {/* Layer 1 & 4: Gradient and Tint handled in CSS */}
      <div className="atmosphere-layer-tint" />

      {/* Layer 2 & 3: Texture and Semantic Visual */}
      {variant === "hero" && (
        <>
          <div className="texture-grid" />
          <motion.div className="drift-layer" style={{ y: driftY }}>
            <svg
              className="blueprint-lines"
              viewBox="0 0 800 600"
              preserveAspectRatio="none"
            >
              <path
                d="M 100 0 L 100 600 M 300 0 L 300 600 M 500 0 L 500 600"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
                opacity="0.05"
              />
              <path
                d="M 0 200 L 800 200 M 0 400 L 800 400"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
                opacity="0.05"
              />
            </svg>
          </motion.div>
        </>
      )}

      {variant === "market" && (
        <>
          <div className="texture-contour" />
          <motion.div className="drift-layer" style={{ y: driftYReverse }}>
            <svg
              className="market-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 100 Q 30 80 50 50 T 100 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.045"
              />
              <path
                d="M 0 80 Q 40 90 60 40 T 100 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.022"
              />
            </svg>
          </motion.div>
        </>
      )}

      {variant === "production" && (
        <>
          <div className="texture-blueprint" />
        </>
      )}

      {variant === "turnover" && (
        <>
          <div className="texture-turnover-grid" />
          <motion.div
            className="drift-layer"
            style={{ rotate: reduceMotion ? 0 : driftYReverse }}
          >
            <svg
              className="turnover-cycle-bg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              style={{
                opacity: 0.03,
                width: "58%",
                height: "58%",
                margin: "21%",
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.42"
                strokeDasharray="2 4"
              />
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                opacity="0.18"
              />
              <path
                d="M 50 5 A 45 45 0 0 1 95 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.22"
              />
            </svg>
          </motion.div>
        </>
      )}

      {variant === "impact" && (
        <>
          <div className="texture-network" />
          <div className="pulse-rings">
            <div className="ring r1" />
            <div className="ring r2" />
            <div className="ring r3" />
          </div>
        </>
      )}

      {variant === "theory" && (
        <>
          <div className="texture-academic" />
          <div className="watermarks">
            <span className="wm">T — H</span>
            <span className="wm">...SX...</span>
            <span className="wm">H' — T'</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Atmosphere;
