import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Award, BookOpen, AlertCircle } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import SectionHeader from '../components/shared/SectionHeader';
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
      lesson: quizQuestions[currentQ].lesson
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
                {/* Progress Bar */}
                <div className="quiz-progress">
                  <div className="progress-info">
                    <span className="question-count">
                      <span className="level-badge">{quizQuestions[currentQ].level}</span> 
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

                {/* Question */}
                <div className="quiz-question-area">
                  <h2 className="question-text">{quizQuestions[currentQ].question}</h2>
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
                      {feedback.lesson && (
                        <div className="theory-lesson-box mt-4 p-3 bg-white/50 rounded-md border border-black/10 text-sm flex items-start gap-2">
                          <AlertCircle size={16} className="text-teal-600 mt-0.5 shrink-0" />
                          <span><strong>Ghi nhớ:</strong> {feedback.lesson}</span>
                        </div>
                      )}
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
                  <p className="score-message">
                    {score >= 12 ? "Tuyệt vời! Bạn nắm rất vững lý luận và biết cách áp dụng vào thực tế." : 
                     score >= 8 ? "Khá tốt! Tuy nhiên, bạn nên ôn tập thêm các câu hỏi phân tích." : 
                     "Bạn cần ôn tập lại toàn bộ kiến thức về Tuần hoàn tư bản."}
                  </p>
                </div>

                <div className="result-analysis">
                  <p className="analysis-intro">
                    Nếu bạn chưa đạt điểm tối đa, hãy ôn tập lại các khái niệm trọng tâm sau trong trang Từ điển Khái niệm:
                  </p>
                  <div className="focus-areas">
                    <div className="focus-card">
                      <BookOpen size={24} className="text-teal mb-3" />
                      <h4>3 Hình thái & 3 Giai đoạn</h4>
                      <p>Tư bản không phải là một vật, mà là một sự vận động liên tục qua: Tiền tệ, Sản xuất, Hàng hóa.</p>
                    </div>
                    <div className="focus-card">
                      <BookOpen size={24} className="text-teal mb-3" />
                      <h4>Thời gian Chu chuyển</h4>
                      <p>Thời gian lưu thông (H&apos; &rarr; T&apos;) quyết định sự sống còn. Bán được nhà mới có tiền để duy trì chu kỳ mới.</p>
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
