import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { theoryTopics } from '../../data/caseData';
import { FadeIn } from './MotionReveal';

const TheorySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTopic = theoryTopics[activeIndex];

  return (
    <section className="content-section section-light">
      <FadeIn className="section-heading">
        <span className="kicker">Section 05</span>
        <h2>Giải mã bằng lý luận</h2>
        <p>
          Mỗi khái niệm dưới đây được neo vào đúng tình huống của Alpha Corp để không biến phần lý
          thuyết thành một danh sách định nghĩa rời rạc.
        </p>
      </FadeIn>

      <div className="theory-shell">
        <div className="theory-accordion">
          {theoryTopics.map((topic, index) => {
            const open = activeIndex === index;
            return (
              <button
                key={topic.title}
                type="button"
                className={`theory-accordion-item ${open ? 'is-open' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="theory-accordion-head">
                  <strong>{topic.title}</strong>
                  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      className="theory-accordion-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{topic.definition}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <FadeIn className="theory-feature forensic-panel light-panel" delay={0.08}>
          <div className="panel-header">
            <span className="eyebrow">Knowledge Card</span>
            <strong>{activeTopic.title}</strong>
          </div>

          <div className="theory-feature-body">
            <div className="formula-callout">
              <span className="detail-label">Formula focus</span>
              <strong>T – H … SX … H&apos; – T&apos;</strong>
            </div>

            <div className="theory-block">
              <span className="detail-label">Định nghĩa ngắn</span>
              <p>{activeTopic.definition}</p>
            </div>
            <div className="theory-block">
              <span className="detail-label">Ví dụ Alpha Corp</span>
              <p>{activeTopic.example}</p>
            </div>
            <div className="theory-block">
              <span className="detail-label">Hậu quả</span>
              <p>{activeTopic.consequence}</p>
            </div>
            <div className="memory-line">
              <span>Ghi nhớ</span>
              <strong>{activeTopic.memory}</strong>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TheorySection;
