import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { storyModeChapters } from '../data/storyData';
import SectionHeader from '../components/shared/SectionHeader';
import { getScrollBehavior } from '../utils/motion';
import { useAI } from '../ai/useAI';
import { buildAIContext } from '../ai/buildAIContext';
import './StoryMode.css';

const StoryMode = () => {
  const [activeChapter, setActiveChapter] = useState(storyModeChapters[0].number);
  const reduceMotion = useReducedMotion();
  const { setPageContext } = useAI();

  useEffect(() => {
    const chapter = storyModeChapters.find((item) => item.number === activeChapter) || storyModeChapters[0];

    setPageContext(
      buildAIContext({
        route: '/story',
        appState: {
          pageName: 'Hanh trinh von',
          sectionId: `chapter-${chapter.number}`,
          sectionTitle: chapter.title,
          chapterTitle: chapter.title,
          activeStage: {
            id: String(chapter.stage || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            index: Number(chapter.number) - 1,
            formula: chapter.stage,
            title: chapter.title,
          },
          sourceLabels: ['caseData.storyChapters'],
          relevantConceptIds: ['capital-circuit', 'capital-turnover', 'surplus-value'],
        },
        selectedContent: {
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
          chapterSummary: chapter.summary,
          chapterTheory: chapter.theory,
          chapterEvidence: chapter.evidence,
        },
      }),
    );
  }, [activeChapter, setPageContext]);

  useEffect(() => {
    const sections = storyModeChapters
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

  const progressValue = storyModeChapters.findIndex((chapter) => chapter.number === activeChapter) + 1;

  return (
    <div className="route-shell story-page">
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
              {progressValue} / {storyModeChapters.length}
            </strong>
          </div>

          <div className="story-progress-track" aria-hidden="true">
            <span style={{ transform: `scaleY(${progressValue / storyModeChapters.length})` }} />
          </div>

          <nav className="story-nav" aria-label="Điều hướng chương">
            {storyModeChapters.map((chapter) => (
              <button
                key={chapter.number}
                type="button"
                className={`story-nav-item ${activeChapter === chapter.number ? 'is-active' : ''}`}
                onClick={() =>
                  document.getElementById(`chapter-${chapter.number}`)?.scrollIntoView({
                    behavior: reduceMotion ? 'auto' : getScrollBehavior(),
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
          {storyModeChapters.map((chapter, index) => (
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
