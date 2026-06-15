import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { storyChapters } from '../data/caseData';
import SectionHeader from '../components/shared/SectionHeader';

const StoryMode = () => {
  const [activeChapter, setActiveChapter] = useState(storyChapters[0].number);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = storyChapters
      .map((chapter) => document.getElementById(`chapter-${chapter.number}`))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.dataset.chapter) {
          setActiveChapter(visible.target.dataset.chapter);
        }
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: [0.2, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const progressValue = storyChapters.findIndex((chapter) => chapter.number === activeChapter) + 1;

  return (
    <div className="route-shell pt-24 pb-20 bg-[var(--page-background)]">
      <div className="container story-layout">
        <SectionHeader
          eyebrow="Vụ việc"
          title="Dòng thời gian của một chu kỳ tư bản bị gãy"
          subtitle="Đây là phiên bản kể chuyện tuyến tính để dùng trực tiếp khi thuyết trình. Mỗi chương gắn một bước của vụ việc với một khái niệm MLN122 và một trạng thái của capital flow."
          align="left"
        />

        <aside className="story-sidebar forensic-panel">
          <div className="panel-header">
            <span className="eyebrow">Chapter Navigation</span>
            <strong>
              {progressValue} / {storyChapters.length}
            </strong>
          </div>

          <div className="story-progress-track" aria-hidden="true">
            <span style={{ transform: `scaleY(${progressValue / storyChapters.length})` }} />
          </div>

          <nav className="story-nav" aria-label="Điều hướng chương">
            {storyChapters.map((chapter) => (
              <button
                key={chapter.number}
                type="button"
                className={`story-nav-item ${activeChapter === chapter.number ? 'is-active' : ''}`}
                onClick={() =>
                  document.getElementById(`chapter-${chapter.number}`)?.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : 'smooth',
                    block: 'start',
                  })
                }
              >
                <span>{chapter.number}</span>
                <strong>{chapter.title}</strong>
              </button>
            ))}
          </nav>
        </aside>

        <div className="story-chapter-list">
          {storyChapters.map((chapter, index) => (
            <motion.section
              id={`chapter-${chapter.number}`}
              data-chapter={chapter.number}
              key={chapter.number}
              className={`story-chapter-card ${activeChapter === chapter.number ? 'is-active' : ''}`}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="story-chapter-meta">
                <span className="story-chapter-number">{chapter.number}</span>
                <span className="status-chip is-info">{chapter.stage}</span>
              </div>

              <div className="story-chapter-main">
                <div>
                  <h2>{chapter.title}</h2>
                  <p>{chapter.summary}</p>
                </div>

                <div className="story-evidence-panel">
                  <div>
                    <span className="detail-label">Khái niệm MLN122</span>
                    <strong>{chapter.theory}</strong>
                  </div>
                  <div>
                    <span className="detail-label">Evidence Panel</span>
                    <p>{chapter.evidence}</p>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryMode;
