import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { quickQuiz } from '../../data/caseData';
import { FadeIn, StaggerGroup, StaggerItem } from './MotionReveal';

const QuickQuizSection = () => {
  return (
    <section className="content-section section-light">
      <FadeIn className="section-heading">
        <span className="kicker">Section 07</span>
        <h2>Kiểm tra nhanh</h2>
        <p>
          Ba câu hỏi demo này giữ cho người xem bám được trọng tâm trước khi chuyển sang bài kiểm tra
          đầy đủ.
        </p>
      </FadeIn>

      <div className="quick-quiz-shell">
        <div className="quiz-progress-panel">
          <span className="detail-label">Preview progress</span>
          <div className="quiz-progress-track">
            <motion.span
              initial={{ scaleX: 0.2 }}
              whileInView={{ scaleX: 0.68 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <StaggerGroup className="quick-quiz-list">
          {quickQuiz.map((item, index) => (
            <StaggerItem key={item.question}>
              <article className="quick-quiz-item premium-quiz-item">
                <span className="quick-quiz-order">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="quick-quiz-cta">
          <Link className="btn btn-primary" to="/quiz">
            Làm bài kiểm tra đầy đủ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickQuizSection;
