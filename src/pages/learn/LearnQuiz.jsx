import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Compass, RefreshCcw, Sparkles, Target } from 'lucide-react';
import { buildAIContext } from '../../ai/buildAIContext';
import { useAI } from '../../ai/useAI';
import { buildQuizAIMessage, runLearningAI } from '../../learning/ai';
import { getConceptMeta } from '../../learning/concepts';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';
import { QuestionCard } from './QuestionCard';

const QUIZ_SET_SIZE = 6;

function buildResultLabel(status) {
  if (status === 'correct') return 'Đúng';
  if (status === 'partial') return 'Đúng một phần';
  return 'Chưa chính xác';
}

export default function LearnQuiz() {
  const { getAdaptiveQuestion, submitQuestion, overview, completeMeaningfulActivity } = useLearning();
  const { setPageContext } = useAI();
  const [answeredIds, setAnsweredIds] = useState([]);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(() => getAdaptiveQuestion([], null));
  const [feedback, setFeedback] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [, setSessionSerial] = useState(1);
  const sessionIdRef = useRef('quiz-session-1');
  const startedAtRef = useRef(0);

  const primaryConcept = currentQuestion?.conceptIds?.[0];
  const masteryScore = primaryConcept ? overview.concepts.find((item) => item.conceptId === primaryConcept)?.score || 0 : 0;
  const strongestConcept = overview.strongest?.label || 'Chưa có';
  const weakestConcept = overview.weakest?.label || 'Chưa có';

  useEffect(() => {
    if (!currentQuestion) return;

    startedAtRef.current = performance.now();

    setPageContext(
      buildAIContext({
        route: '/learn/quiz',
        appState: {
          pageName: 'Adaptive Quiz Arena',
          quiz: {
            questionId: currentQuestion.id,
            question: currentQuestion.prompt,
            options: currentQuestion.options?.map((item) => item.label) || [],
            conceptIds: currentQuestion.conceptIds,
            attemptCount: (lastAttempt?.questionId === currentQuestion.id ? lastAttempt.attemptCount : 0) || 0,
            selectedAnswer: feedback?.selectedAnswer || '',
            isCorrect: feedback?.result?.isCorrect ?? null,
          },
          sourceLabels: currentQuestion.sourceLabels,
          relevantConceptIds: currentQuestion.conceptIds,
        },
      }),
    );
  }, [currentQuestion, feedback?.result?.isCorrect, feedback?.selectedAnswer, lastAttempt?.attemptCount, lastAttempt?.questionId, setPageContext]);

  const advanceQuestion = () => {
    const nextAnswered = currentQuestion ? [...answeredIds, currentQuestion.id] : answeredIds;
    if (sessionCount >= QUIZ_SET_SIZE) {
      completeMeaningfulActivity('quiz-set', new Date(), { sessionId: sessionIdRef.current });
      setSessionComplete(true);
      setAnsweredIds(nextAnswered);
      return;
    }

    const nextQuestion = getAdaptiveQuestion(nextAnswered, lastAttempt);
    setAnsweredIds(nextAnswered);
    setCurrentQuestion(nextQuestion);
    setFeedback(null);
    setAiInsight(null);
    setAiLoading(false);
    setHintsUsed(0);
    startedAtRef.current = Date.now();
  };

  const handleSubmit = (response) => {
    const responseTimeMs = Math.round(performance.now() - startedAtRef.current);
    const applied = submitQuestion({
      question: currentQuestion,
      response,
      hintsUsed,
      responseTimeMs,
      activityType: 'quiz',
    });

    const selectedAnswer = Array.isArray(response)
      ? response.join(', ')
      : typeof response === 'boolean'
        ? response
          ? 'Đúng'
          : 'Sai'
        : String(response);

    const attempt = {
      questionId: currentQuestion.id,
      conceptIds: currentQuestion.conceptIds,
      difficulty: currentQuestion.difficulty,
      resultStatus: applied.result.status,
      attemptCount: (lastAttempt?.questionId === currentQuestion.id ? lastAttempt.attemptCount : 0) + 1,
    };

    setLastAttempt(attempt);
    setFeedback({ ...applied, selectedAnswer });
    setSessionCount((current) => current + 1);
  };

  const handleAIAction = async (action, label, includeCorrectAnswer = false) => {
    if (!currentQuestion) return;
    setAiLoading(true);
    try {
      const response = await runLearningAI({
        route: '/learn/quiz',
        action,
        pageContext: {
          pageName: 'Adaptive Quiz Arena',
          relevantConceptIds: currentQuestion.conceptIds,
          sourceLabels: currentQuestion.sourceLabels,
          quiz: {
            questionId: currentQuestion.id,
            question: currentQuestion.prompt,
            options: currentQuestion.options?.map((item) => item.label) || [],
            selectedAnswer: feedback?.selectedAnswer || '',
            attemptCount: lastAttempt?.attemptCount || 0,
            conceptIds: currentQuestion.conceptIds,
          },
        },
        prompt: buildQuizAIMessage({
          question: currentQuestion,
          selectedAnswer: feedback?.selectedAnswer || '',
          attemptCount: lastAttempt?.attemptCount || 0,
          currentMastery: masteryScore,
          action,
          includeCorrectAnswer,
        }),
      });
      if (action === 'quiz-hint') {
        setHintsUsed((current) => current + 1);
      }
      setAiInsight({ ...response, label });
    } finally {
      setAiLoading(false);
    }
  };

  const resetSession = () => {
    setAnsweredIds([]);
    setLastAttempt(null);
    setCurrentQuestion(getAdaptiveQuestion([], null));
    setFeedback(null);
    setAiInsight(null);
    setSessionCount(0);
    setSessionComplete(false);
    setHintsUsed(0);
    setSessionSerial((current) => {
      const next = current + 1;
      sessionIdRef.current = `quiz-session-${next}`;
      return next;
    });
  };

  const conceptBadges = useMemo(
    () =>
      currentQuestion?.conceptIds.map((conceptId) => getConceptMeta(conceptId)?.label || conceptId) || [],
    [currentQuestion],
  );

  return (
    <LearningRouteFrame
      eyebrow="Adaptive Quiz Arena"
      title="Quiz thích ứng theo mastery hiện tại"
      subtitle="Không phải chuỗi câu cố định. Câu tiếp theo được chọn theo concept bạn vừa mạnh lên hoặc còn nhầm."
      variant="compact"
      actions={
        <div className="learn-inline-actions">
          <span className="status-chip is-info">Set {sessionCount + 1}/{QUIZ_SET_SIZE}</span>
          <span className="status-chip">Chọn đáp án để chấm ngay</span>
          <span className="status-chip">Hint đã dùng: {hintsUsed}</span>
        </div>
      }
    >
      {sessionComplete ? (
        <div className="learn-result-panel">
          <h2>Hoàn thành một quiz set</h2>
          <p>Set này đã được tính là một hoạt động học có ý nghĩa cho streak. Bước hợp lý tiếp theo là review hoặc mở progress map.</p>
          <div className="learn-inline-actions">
            <button type="button" className="btn btn-primary" onClick={resetSession}>
              <RefreshCcw size={16} />
              Làm set mới
            </button>
            <Link to="/learn/review" className="btn btn-secondary">
              Mở review queue
            </Link>
            <Link to="/learn/progress" className="btn btn-secondary">
              Xem progress
            </Link>
          </div>
        </div>
      ) : currentQuestion ? (
        <div className="learn-quiz-grid">
          <div className="learn-quiz-main">
            <section className="learn-quiz-overview-card">
              <div className="learn-quiz-overview-copy">
                <span className="learn-panel-label">Trọng tâm câu hiện tại</span>
                <h2>{getConceptMeta(primaryConcept)?.label || 'Khái niệm trọng tâm'}</h2>
                <p>
                  Quiz này ưu tiên kéo đúng chỗ bạn đang yếu, không chỉ cộng thêm số câu đã làm.
                </p>
              </div>
              <div className="learn-quiz-overview-metrics">
                <div className="learn-quiz-mini-stat">
                  <Target size={16} className="text-teal" />
                  <div>
                    <span>Mastery node</span>
                    <strong>{masteryScore}%</strong>
                  </div>
                </div>
                <div className="learn-quiz-mini-stat">
                  <Compass size={16} className="text-gold" />
                  <div>
                    <span>Điểm yếu nên kéo lên</span>
                    <strong>{weakestConcept}</strong>
                  </div>
                </div>
              </div>
            </section>

            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onSubmit={handleSubmit}
              feedback={feedback}
              autoSubmitOnChoice
              submitLabel="Chấm câu trả lời"
            />

            <section className="learn-quiz-context-strip">
              <div className="learn-concept-chips">
                {conceptBadges.map((conceptLabel) => (
                  <span key={conceptLabel} className="status-chip">
                    {conceptLabel}
                  </span>
                ))}
              </div>
              <div className="learn-quiz-support-text">
                <span>Điểm mạnh hiện tại: {strongestConcept}</span>
                <span>Review tới hạn: {overview.dueReviews}</span>
              </div>
            </section>

            {feedback && (
              <div className={`learn-feedback-panel state-${feedback.result.status}`}>
                <div className="panel-header">
                  <h2>{buildResultLabel(feedback.result.status)}</h2>
                  <span className="status-chip">{feedback.result.scoreFraction * 100}% weight</span>
                </div>
                <p>{currentQuestion.explanation}</p>
                <div className="formula-box learn-formula-box">T → H → SX → H’ ⇢ T’</div>
                <div className="learn-feedback-grid">
                  <div className="learn-insight-box">
                    <span className="learn-panel-label">Liên hệ Alpha Corp</span>
                    <p>{currentQuestion.alphaCorpConnection}</p>
                  </div>
                  {feedback.reviewItem?.errorType && feedback.result.status !== 'correct' && (
                    <div className="learn-insight-box">
                      <span className="learn-panel-label">Điểm nhầm chính</span>
                      <p>{feedback.reviewItem.errorType}</p>
                    </div>
                  )}
                </div>
                <div className="learn-inline-actions">
                  <Link to="/story" className="btn btn-secondary">Xem phần lý luận</Link>
                  <button type="button" className="btn btn-primary" onClick={advanceQuestion}>
                    Câu tiếp theo
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="learn-sidebar learn-quiz-sidebar">
            <div className="learn-dashboard-card learn-quiz-coach-card">
              <div className="panel-header">
                <h2>Quiz Coach</h2>
                <Bot size={18} className="text-teal" />
              </div>
              <div className="learn-quiz-rail-stats">
                <div className="learn-quiz-rail-stat">
                  <span className="learn-panel-label">Mastery node</span>
                  <strong className="learn-mastery-number">{masteryScore}%</strong>
                  <p>{primaryConcept ? getConceptMeta(primaryConcept)?.label || primaryConcept : 'Chưa có concept chính.'}</p>
                </div>
                <div className="learn-quiz-rail-stat">
                  <span className="learn-panel-label">Ghi chú AI</span>
                  <p>Hint không gửi đáp án đúng. Nếu provider lỗi, server trả fallback có ghi rõ.</p>
                </div>
              </div>
              <div className="learn-ai-action-list">
                <button type="button" className="btn btn-secondary" onClick={() => handleAIAction('quiz-hint', 'Gợi ý', false)} disabled={aiLoading}>
                  Gợi ý
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => handleAIAction('explain', 'Giải thích đơn giản hơn', feedback != null)} disabled={aiLoading}>
                  Giải thích đơn giản hơn
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => handleAIAction('it-analogy', 'Ví dụ IT', feedback != null)} disabled={aiLoading}>
                  Theo ví dụ IT
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => handleAIAction('quiz-explanation', 'Vì sao câu trả lời sai', true)} disabled={aiLoading || !feedback}>
                  Vì sao tôi sai?
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => handleAIAction('similar-question', 'Câu tương tự', true)} disabled={aiLoading}>
                  Tạo câu tương tự
                </button>
              </div>
            </div>

            {aiInsight && (
              <div className="learn-quiz-ai-response">
                <div className="panel-header">
                  <h2>{aiInsight.label}</h2>
                  <Sparkles size={18} className="text-teal" />
                </div>
                <p>{aiInsight.answer}</p>
                {aiInsight.fallbackUsed && <span className="status-chip">Fallback có ghi rõ</span>}
              </div>
            )}
          </aside>
        </div>
      ) : (
        <div className="learn-result-panel">
          <h2>Không còn câu phù hợp trong bộ câu verified.</h2>
          <p>Hãy reset session hoặc chuyển sang review để tiếp tục vòng học.</p>
          <button type="button" className="btn btn-primary" onClick={resetSession}>Reset session</button>
        </div>
      )}
    </LearningRouteFrame>
  );
}
