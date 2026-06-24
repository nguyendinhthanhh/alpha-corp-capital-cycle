import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink, ChevronRight } from "lucide-react";
import Section from "../shared/Section";
import { alphaCorpVideo } from "../../data/videoConfig";
import { scrollToSectionById, prefersReducedMotion } from "../../utils/motion";
import "./VideoCaseStudySection.css";

// ============================================
// Configurable values extracted to constants
// ============================================
const YOUTUBE_EMBED_URL = `${alphaCorpVideo.embedBase}${alphaCorpVideo.id}`;
const YOUTUBE_WATCH_URL = alphaCorpVideo.url;
const YOUTUBE_TITLE = alphaCorpVideo.title;

const LEARNING_POINTS = [
  "Nhận diện dòng vốn T – H … SX … H' – T'",
  "Phân tích điểm tắc nghẽn H' → T'",
  "Phân biệt tài sản, giá trị và thanh khoản",
];

// ============================================
// Lazy YouTube Player sub-component
// ============================================
const LazyYouTubePlayer = ({ onLoadError }) => {
  const [loadError, setLoadError] = useState(false);

  const handleError = useCallback(() => {
    setLoadError(true);
    onLoadError?.();
  }, [onLoadError]);

  if (loadError) {
    return (
      <div className="video-cover" style={{ position: "absolute", inset: 0 }}>
        <div className="video-cover-gradient" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.85rem",
            padding: "1.5rem",
            textAlign: "center",
            zIndex: 2,
          }}
        >
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
            Không thể tải video trực tiếp.
          </p>
          <a
            href={YOUTUBE_WATCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="video-cta-secondary"
            style={{ display: "inline-flex" }}
          >
            <ExternalLink size={15} />
            Xem trên YouTube
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      className="video-iframe"
      src={`${YOUTUBE_EMBED_URL}?autoplay=1&rel=0&modestbranding=1`}
      title={YOUTUBE_TITLE}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      onError={handleError}
    />
  );
};

// ============================================
// Cover State sub-component
// ============================================
const VideoCover = ({ isVisible, onActivate }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Try local cover first, fallback to YouTube maxres, then hq
    const img = new Image();
    img.onload = () => setThumbnailSrc(alphaCorpVideo.localCover);
    img.onerror = () => {
      // Try YouTube maxresdefault
      const img2 = new Image();
      img2.onload = () => setThumbnailSrc(alphaCorpVideo.thumbnails.maxres);
      img2.onerror = () => {
        // Final fallback to hqdefault
        const img3 = new Image();
        img3.onload = () => setThumbnailSrc(alphaCorpVideo.thumbnails.hq);
        img3.onerror = () => setImgError(true);
        img3.src = alphaCorpVideo.thumbnails.hq;
      };
      img2.src = alphaCorpVideo.thumbnails.maxres;
    };
    img.src = alphaCorpVideo.localCover;
  }, []);

  const coverVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="video-cover"
      variants={coverVariants}
      initial="hidden"
      animate="visible"
    >
      <button
        className="video-cover"
        onClick={onActivate}
        aria-label="Xem phim phân tích tình huống Alpha Corp"
        type="button"
        style={{
          position: "absolute",
          inset: 0,
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: "pointer",
          borderRadius: "1.2rem",
        }}
      >
        {thumbnailSrc && !imgError ? (
          <img
            className="video-cover-thumbnail"
            src={thumbnailSrc}
            alt={`Ảnh bìa: ${YOUTUBE_TITLE}`}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--navy-900)",
            }}
          />
        )}
        <div className="video-cover-gradient" />
        <div className="video-cover-play" aria-hidden="true">
          <Play fill="currentColor" stroke="none" />
        </div>
        <div className="video-cover-label" aria-hidden="true">
          XEM PHIM PHÂN TÍCH
        </div>
        <div className="video-cover-formula" aria-hidden="true">
          <span className="formula-gold">T</span>
          <span className="formula-arrow"> → </span>
          <span className="formula-normal">H</span>
          <span className="formula-arrow"> → </span>
          <span className="formula-normal">SX</span>
          <span className="formula-arrow"> → </span>
          <span className="formula-normal">H'</span>
          <span className="formula-break">╳</span>
          <span className="formula-break">T'</span>
        </div>
      </button>
    </motion.div>
  );
};

// ============================================
// Signature Animation: Formula Line Drawing
// ============================================
const FormulaAnimation = () => {
  const reducedMotion = prefersReducedMotion();

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.18 + 0.15, duration: 0.35, ease: "easeOut" },
    }),
  };

  const breakVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.95, duration: 0.3, ease: "easeOut" },
    },
  };

  if (reducedMotion) return null;

  return (
    <div className="video-case-study-bg" aria-hidden="true">
      <div className="blueprint-grid" />

      {/* Formula nodes */}
      {["T", "H", "SX", "H'", "T'"].map((label, i) => (
        <motion.div
          key={label}
          className={`formula-node node-${label.toLowerCase().replace("'", "p")}`}
          custom={i}
          variants={nodeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {label}
        </motion.div>
      ))}

      {/* Break marker × */}
      <motion.div
        className="break-marker"
        variants={breakVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        ×
      </motion.div>

      {/* Fluid formula line */}
      <div className="capital-formula-line" />

      {/* Animated line overlay — SVG mask-style */}
      <svg
        style={{
          position: "absolute",
          top: "12rem",
          left: 0,
          right: 0,
          width: "100%",
          height: "2px",
          pointerEvents: "none",
          opacity: 0.08,
        }}
        viewBox="0 0 1000 2"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 120 1 L 300 1 L 500 1 L 680 1 M 740 1 L 860 1"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      </svg>
    </div>
  );
};

// ============================================
// Main Video Case Study Section
// ============================================
const VideoCaseStudySection = ({ isCrisis = false }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handleActivate = useCallback(() => {
    setIsActivated(true);
  }, []);

  const handleIframeError = useCallback(() => {
    setIframeError(true);
  }, []);

  const handleScrollToJourney = useCallback(() => {
    scrollToSectionById("capital-journey");
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 0.12,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <Section
      className={`video-case-study-section ${isCrisis ? "is-crisis" : ""}`}
      id="video-case-study"
      bgColor="transparent"
    >
      <FormulaAnimation />

      <div className="video-case-study-grid">
        {/* Left Column: Content */}
        <div className="video-content-col">
          <motion.div
            className="video-eyebrow"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <span className="eyebrow-dot" />
            PHIM TÀI LIỆU NGẮN · MLN122
          </motion.div>

          <motion.h2
            className="video-heading"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            Alpha Corp và điểm đứt gãy trong tuần hoàn tư bản
          </motion.h2>

          <motion.p
            className="video-description"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            Theo dấu khoản vốn vay 10.000 tỷ đồng qua các hình thái T, H, SX, H'
            và T', từ quá trình xây dựng ba tòa tháp phần thô đến khi dòng vốn
            bị mắc kẹt vì thị trường đóng băng.
          </motion.p>

          <motion.div
            className="video-key-statement"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <p>
              Có tài sản chưa chắc có thanh khoản; có giá trị chưa chắc đã được
              thực hiện thành tiền.
            </p>
          </motion.div>

          <motion.ul
            className="video-learning-points"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            {LEARNING_POINTS.map((point) => (
              <li key={point}>
                <span className="point-marker" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="video-ctas"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
          >
            <button
              className="video-cta-primary"
              type="button"
              onClick={handleActivate}
              aria-label="Phát video Alpha Corp và điểm đứt gãy trong tuần hoàn tư bản"
            >
              <Play size={16} className="cta-icon" />
              Xem video
            </button>
            <a
              className="video-cta-secondary"
              href={YOUTUBE_WATCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mở video trên YouTube trong tab mới"
            >
              <ExternalLink size={15} />
              Mở trên YouTube
              <ChevronRight size={14} className="arrow-icon" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Video Player */}
        <div className="video-player-col">
          <div className="video-player-wrapper">
            {isActivated && !iframeError ? (
              <LazyYouTubePlayer onLoadError={handleIframeError} />
            ) : (
              <VideoCover isVisible onActivate={handleActivate} />
            )}
          </div>

          {/* Post-video navigation */}
          <button
            type="button"
            className="video-post-nav"
            onClick={handleScrollToJourney}
            aria-label="Tiếp tục khám phá hành trình dòng vốn"
          >
            <p>Tiếp tục khám phá hành trình dòng vốn</p>
            <ChevronRight size={20} className="nav-arrow" />
          </button>

          {/* Source disclosure */}
          <div className="video-source-disclosure">
            <span>
              Video được xây dựng từ tài liệu môn MLN122 và tình huống giả định
              Alpha Corp, với NotebookLM hỗ trợ tổng hợp và trình bày.
            </span>
            <a href="/sources" className="source-link">
              Xem nguồn và cách sử dụng AI →
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default VideoCaseStudySection;
