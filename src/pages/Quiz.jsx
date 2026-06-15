import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Award, BookOpen } from 'lucide-react';
import { quizQuestions } from '../data/caseData';
import './Quiz.css';

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect = idx === quizQuestions[currentQ].answer;
    setFeedback({
      correct: isCorrect,
      text: quizQuestions[currentQ].explain,
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
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
  };

  return (
    <div className="quiz-page">
      <div className="container">
        <header className="page-header text-center">
          <span className="page-eyebrow">Đánh giá kiến thức</span>
          <h1 className="page-title">Trắc nghiệm tổng hợp</h1>
          <p className="page-subtitle">
            Bộ 15 câu hỏi bám sát kiến thức Session 8, 10, 11, 13 và đối chiếu trực tiếp với tình huống thực tế của Alpha Corp.
          </p>
        </header>

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
                {/* Progress Bar */}
                <div className="quiz-progress">
                  <div className="progress-info">
                    <span className="question-count">Câu {currentQ + 1} / {quizQuestions.length}</span>
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

                {/* Question */}
                <div className="quiz-question-area">
                  <h2 className="question-text">{quizQuestions[currentQ].q}</h2>
                </div>

                {/* Options */}
                <div className="quiz-options">
                  {quizQuestions[currentQ].options.map((option, idx) => {
                    const isCorrect = idx === quizQuestions[currentQ].answer;
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
                        {selected !== null && isCorrect && <CheckCircle2 className="option-icon text-green" />}
                        {isSelected && !isCorrect && <XCircle className="option-icon text-red" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`quiz-feedback ${feedback.correct ? 'is-correct' : 'is-incorrect'}`}
                    >
                      <div className="feedback-header">
                        {feedback.correct ? (
                          <><CheckCircle2 size={20} /> <strong>Chính xác!</strong></>
                        ) : (
                          <><XCircle size={20} /> <strong>Chưa chính xác!</strong></>
                        )}
                      </div>
                      <p>{feedback.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next Button */}
                {selected !== null && (
                  <div className="quiz-actions">
                    <button className="btn btn-primary" onClick={handleNext}>
                      {currentQ < quizQuestions.length - 1 ? (
                        <>Câu tiếp theo <ArrowRight size={18} className="ml-2" /></>
                      ) : (
                        <>Xem kết quả <Award size={18} className="ml-2" /></>
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
                </div>

                <div className="result-analysis">
                  <p className="analysis-intro">
                    Nếu bạn chưa đạt điểm tối đa, hãy ôn tập lại các khái niệm trọng tâm sau:
                  </p>
                  <div className="focus-areas">
                    <div className="focus-card">
                      <BookOpen size={24} className="text-teal mb-3" />
                      <h4>Bản chất của tư bản</h4>
                      <p>Không phải mọi tài sản đều là tư bản. Nó phải vận động và tạo ra giá trị thặng dư.</p>
                    </div>
                    <div className="focus-card">
                      <BookOpen size={24} className="text-teal mb-3" />
                      <h4>Điều kiện thời gian</h4>
                      <p>Thời gian lưu thông kéo dài tại khâu H&apos; &rarr; T&apos; sẽ bóp nghẹt thanh khoản và làm đứt gãy chu kỳ.</p>
                    </div>
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
