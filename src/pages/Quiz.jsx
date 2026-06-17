import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCcw,
  Award,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import SectionHeader from '../components/shared/SectionHeader';
import './Quiz.css';

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [mistakeConcepts, setMistakeConcepts] = useState([]);

  const currentQuestion = quizQuestions[currentQ];
  const questionText = currentQuestion.question ?? currentQuestion.q;
  const questionLevel =
    currentQuestion.level ?? questionText.match(/\(([^)]+)\)/)?.[1] ?? 'MLN122';
  const normalizedOptions = currentQuestion.options.map((option) =>
    option.replace(/^[A-D]\.\s*/, ''),
  );

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect = idx === currentQuestion.answer;
    setFeedback({
      correct: isCorrect,
      text: currentQuestion.explain,
      lesson: currentQuestion.lesson ?? currentQuestion.concept,
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
      return;
    }

    if (currentQuestion.concept) {
      setMistakeConcepts((prev) =>
        prev.includes(currentQuestion.concept) ? prev : [...prev, currentQuestion.concept],
      );
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
    setFeedback(null);
    setMistakeConcepts([]);
  };

  const suggestedConcepts = mistakeConcepts.slice(0, 3);

  return (
    <div className="quiz-page">
      <div className="container">
        <SectionHeader
          eyebrow="Đánh giá kiến thức"
          title="Trắc nghiệm MLN122"
          subtitle="Bộ 15 câu hỏi phân cấp bám sát kiến thức Session 6-13, đối chiếu trực tiếp với tình huống thực tế của Alpha Corp."
        />

        <div className="quiz-container">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="quiz-card"
              >
                <div className="quiz-progress">
                  <div className="progress-info">
                    <span className="question-count">
                      <span className="level-badge">{questionLevel}</span>
                      Câu {currentQ + 1} / {quizQuestions.length}
                    </span>
                    <span className="current-score">Điểm: {score}</span>
                  </div>
                  <div className="progress-bar-bg">
                    <motion.div
                      className="progress-bar-fill"
                      initial={{ width: `${(currentQ / quizQuestions.length) * 100}%` }}
                      animate={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="quiz-question-area">
                  <h2 className="question-text">{questionText}</h2>
                </div>

                <div className="quiz-options">
                  {normalizedOptions.map((option, idx) => {
                    const isCorrect = idx === currentQuestion.answer;
                    const isSelected = selected === idx;

                    let stateClass = '';
                    if (selected !== null) {
                      if (isCorrect) stateClass = 'correct';
                      else if (isSelected) stateClass = 'incorrect';
                      else stateClass = 'disabled';
                    }

                    return (
                      <button
                        key={idx}
                        className={`option-btn ${stateClass}`}
                        onClick={() => handleSelect(idx)}
                        disabled={selected !== null}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                        <span className="option-text">{option}</span>
                        {selected !== null && isCorrect && (
                          <CheckCircle2 className="option-icon text-green" />
                        )}
                        {isSelected && !isCorrect && <XCircle className="option-icon text-red" />}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`quiz-feedback ${feedback.correct ? 'is-correct' : 'is-incorrect'}`}
                    >
                      <div className="feedback-header">
                        {feedback.correct ? (
                          <>
                            <CheckCircle2 size={20} /> <strong>Chính xác</strong>
                          </>
                        ) : (
                          <>
                            <XCircle size={20} /> <strong>Chưa chính xác</strong>
                          </>
                        )}
                      </div>
                      <p>{feedback.text}</p>
                      {feedback.lesson && (
                        <div className="theory-lesson-box">
                          <AlertCircle size={16} className="text-teal shrink-0" />
                          <span>
                            <strong>Khái niệm cần nhớ:</strong> {feedback.lesson}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {selected !== null && (
                  <div className="quiz-actions">
                    <button className="btn btn-primary" onClick={handleNext}>
                      {currentQ < quizQuestions.length - 1 ? (
                        <>
                          Câu tiếp theo <ArrowRight size={18} className="ml-2" />
                        </>
                      ) : (
                        <>
                          Xem kết quả <Award size={18} className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="quiz-result-card"
              >
                <div className="result-header">
                  <Award size={64} className="result-medal text-gold" />
                  <h2>Hoàn thành bài kiểm tra</h2>
                  <div className="final-score">
                    <span className="score-number">{score}</span>
                    <span className="score-total">/ {quizQuestions.length}</span>
                  </div>
                  <p className="score-message">
                    {score >= 12
                      ? 'Tuyệt vời. Bạn nắm rất vững lý luận và biết cách áp dụng vào thực tế.'
                      : score >= 8
                        ? 'Khá tốt. Tuy nhiên bạn nên ôn tập thêm các câu hỏi phân tích.'
                        : 'Bạn cần ôn tập lại toàn bộ kiến thức về tuần hoàn tư bản.'}
                  </p>
                </div>

                <div className="result-analysis">
                  <p className="analysis-intro">
                    {suggestedConcepts.length
                      ? 'Những khái niệm bạn còn vấp nhiều nhất:'
                      : 'Bạn đã hoàn thành trọn bộ câu hỏi. Hãy dùng trang Lý luận để ôn tập lại phần muốn thuyết trình sắc hơn.'}
                  </p>
                  <div className="focus-areas">
                    {(suggestedConcepts.length
                      ? suggestedConcepts
                      : ['Tuần hoàn tư bản', "H' -> T'", 'Thời gian chu chuyển']
                    ).map((concept) => (
                      <div className="focus-card" key={concept}>
                        <BookOpen size={24} className="text-teal mb-3" />
                        <h4>{concept}</h4>
                        <p>
                          Mở lại trang Lý luận để xem định nghĩa, ví dụ Alpha Corp và hậu quả
                          của khái niệm này trong chu kỳ T - H ... SX ... H&apos; - T&apos;.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="result-actions">
                  <button className="btn btn-secondary" onClick={handleReset}>
                    <RefreshCcw size={18} className="mr-2" /> Làm lại từ đầu
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
