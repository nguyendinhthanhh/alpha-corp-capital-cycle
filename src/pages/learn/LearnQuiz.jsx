import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Bot, Compass, RefreshCcw, Sparkles, Target, Zap } from 'lucide-react';
import { buildAIContext } from '../../ai/buildAIContext';
import { useAI } from '../../ai/useAI';
import { buildQuizAIMessage, runLearningAI } from '../../learning/ai';
import { getConceptMeta } from '../../learning/concepts';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';
import { QuestionCard } from './QuestionCard';
import { verifiedQuestionBank } from '../../learning/questionBank';

const QUIZ_SET_SIZE = 6;

function buildResultLabel(status) {
  if (status === 'correct') return 'Đúng';
  if (status === 'partial') return 'Đúng một phần';
  return 'Chưa chính xác';
}

export default function LearnQuiz() {
  const [searchParams] = useSearchParams();
  const targetConceptId = searchParams.get('conceptId') || null;

  const { getAdaptiveQuestion, submitQuestion, overview, completeMeaningfulActivity } = useLearning();
  const { setPageContext } = useAI();
  const [answeredIds, setAnsweredIds] = useState([]);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(() => getAdaptiveQuestion([], null, targetConceptId));
  const [feedback, setFeedback] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [, setSessionSerial] = useState(1);
  const sessionIdRef = useRef('quiz-session-1');
  const startedAtRef = useRef(0);
  const topRef = useRef(null);

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
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const nextQuestion = getAdaptiveQuestion(nextAnswered, lastAttempt, targetConceptId);
    setAnsweredIds(nextAnswered);
    setCurrentQuestion(nextQuestion);
    setFeedback(null);
    setAiInsight(null);
    setAiLoading(false);
    setHintsUsed(0);
    startedAtRef.current = Date.now();
    
    // Cuộn lên mượt mà
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    setCurrentQuestion(getAdaptiveQuestion([], null, targetConceptId));
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

  if (verifiedQuestionBank.length === 0) {
    return (
      <LearningRouteFrame eyebrow="Adaptive Quiz Arena" title="Củng cố kiến thức" subtitle="">
        <div className="learn-result-panel" style={{ padding: '3rem 2rem', textAlign: 'center', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Ngân hàng câu hỏi đang được nhóm kiểm chứng</h2>
          <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Hiện chưa có câu hỏi nào được xuất bản.</p>
          <p style={{ color: '#aaa', marginBottom: '2rem' }}>Các câu hỏi chỉ xuất hiện sau khi đã được đối chiếu với tài liệu môn học.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/learn" className="btn btn-secondary" style={{ display: 'inline-block' }}>Quay về không gian học tập</Link>
            <Link to="/quiz-review" className="btn btn-primary" style={{ display: 'inline-block' }}>Đến trang Kiểm chứng (Review)</Link>
          </div>
        </div>
      </LearningRouteFrame>
    );
  }

  return (
    <div ref={topRef}>
      <LearningRouteFrame
        eyebrow="Adaptive Quiz Arena"
        title="Quiz thích ứng"
        subtitle="Hệ thống ưu tiên câu hỏi theo concept bạn đang yếu để củng cố kiến thức."
        variant="compact"
        actions={
          <div className="learn-inline-actions">
            <span className="status-chip is-info">Tiến độ: {sessionCount + 1}/{QUIZ_SET_SIZE}</span>
            <span className="status-chip">Gợi ý đã dùng: {hintsUsed}</span>
          </div>
        }
      >
        {sessionComplete ? (
          <div className="learn-result-panel" style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Đã hoàn thành set câu hỏi!</h2>
            <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>Set này đã được tính là một hoạt động học có ý nghĩa cho streak. Bước hợp lý tiếp theo là review hoặc mở progress map.</p>
            <div className="learn-inline-actions" style={{ justifyContent: 'center' }}>
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
            <div className="learn-quiz-main" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Context strip moved to top and simplified */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <Target size={18} className="text-teal" />
                  <span className="learn-panel-label" style={{ margin: 0 }}>Trọng tâm:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{getConceptMeta(primaryConcept)?.label || 'Khái niệm trọng tâm'}</strong>
                </div>
                <div className="learn-concept-chips" style={{ display: 'flex', gap: '0.5rem', margin: 0 }}>
                  {conceptBadges.map((conceptLabel) => (
                    <span key={conceptLabel} className="status-chip" style={{ background: 'rgba(104, 205, 216, 0.1)', borderColor: 'rgba(104, 205, 216, 0.2)', color: 'var(--teal-300)' }}>
                      {conceptLabel}
                    </span>
                  ))}
                </div>
              </div>

              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                onSubmit={handleSubmit}
                feedback={feedback}
                autoSubmitOnChoice
                submitLabel="Chấm câu trả lời"
              />

              {feedback && (
                <div className={`learn-feedback-panel state-${feedback.result.status}`} style={{ marginTop: '0.5rem' }}>
                  <div className="panel-header" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: feedback.result.status === 'correct' ? 'rgba(110, 205, 154, 0.15)' : 'rgba(255, 110, 92, 0.15)',
                        color: feedback.result.status === 'correct' ? 'var(--green-500)' : 'var(--red-500)'
                      }}>
                        <Zap size={18} />
                      </div>
                      <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{buildResultLabel(feedback.result.status)}</h2>
                    </div>
                    <span className="status-chip">{feedback.result.scoreFraction * 100}% weight</span>
                  </div>
                  
                  <div style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {currentQuestion.explanation}
                  </div>
                  
                  <div className="learn-feedback-grid" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid' }}>
                    <div className="learn-insight-box">
                      <span className="learn-panel-label">Nguồn kiến thức</span>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        {currentQuestion.source?.sessionOrSlot} · {currentQuestion.topic || 'Không rõ'} · Slide {currentQuestion.source?.slideNumber}
                      </p>
                    </div>
                    
                    {currentQuestion.alphaCorpConnection && (
                      <div className="learn-insight-box">
                        <span className="learn-panel-label">Liên hệ Alpha Corp</span>
                        <p style={{ fontSize: '0.95rem' }}>{currentQuestion.alphaCorpConnection}</p>
                      </div>
                    )}
                    
                    {feedback.reviewItem?.errorType && feedback.result.status !== 'correct' && (
                      <div className="learn-insight-box" style={{ gridColumn: 'span 2', borderColor: 'rgba(255, 110, 92, 0.3)', background: 'rgba(255, 110, 92, 0.05)' }}>
                        <span className="learn-panel-label" style={{ color: 'var(--red-300)' }}>Điểm nhầm chính</span>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{feedback.reviewItem.errorType}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="learn-inline-actions" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', justifyContent: 'flex-end' }}>
                    <Link to="/story" className="btn btn-secondary">Xem phần lý luận</Link>
                    <button type="button" className="btn btn-primary" onClick={advanceQuestion} style={{ minWidth: '160px' }}>
                      Câu tiếp theo <Zap size={16} style={{ marginLeft: '0.25rem' }} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <aside className="learn-sidebar learn-quiz-sidebar">
              <div className="learn-dashboard-card learn-quiz-coach-card" style={{ padding: '1.25rem' }}>
                <div className="panel-header" style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bot size={20} className="text-teal" />
                    <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Quiz Coach</h2>
                  </div>
                  <strong className="learn-mastery-number" style={{ fontSize: '1.1rem', color: 'var(--teal-300)' }}>{masteryScore}% Mastery</strong>
                </div>
                
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Hệ thống AI sẽ gợi ý và giải thích giúp bạn nắm vững concept.
                </p>

                <div className="learn-ai-action-list" style={{ display: 'grid', gap: '0.5rem' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAIAction('quiz-hint', 'Gợi ý', false)} disabled={aiLoading || feedback != null} style={{ justifyContent: 'flex-start' }}>
                    <Sparkles size={14} className="mr-2" /> Gợi ý làm bài
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAIAction('explain', 'Giải thích đơn giản hơn', feedback != null)} disabled={aiLoading || !feedback} style={{ justifyContent: 'flex-start' }}>
                    <Compass size={14} className="mr-2" /> Giải thích đơn giản hơn
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAIAction('it-analogy', 'Ví dụ IT', feedback != null)} disabled={aiLoading || !feedback} style={{ justifyContent: 'flex-start' }}>
                    <Bot size={14} className="mr-2" /> Liên hệ với ví dụ IT
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAIAction('quiz-explanation', 'Vì sao tôi sai?', true)} disabled={aiLoading || !feedback || feedback.result.status === 'correct'} style={{ justifyContent: 'flex-start' }}>
                    <Target size={14} className="mr-2" /> Phân tích lỗi sai
                  </button>
                </div>
              </div>

              {aiInsight && (
                <div className="learn-quiz-ai-response" style={{ padding: '1.25rem', border: '1px solid rgba(104, 205, 216, 0.3)', background: 'rgba(104, 205, 216, 0.05)' }}>
                  <div className="panel-header" style={{ marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--teal-300)', margin: 0 }}>{aiInsight.label}</h3>
                    <Sparkles size={16} className="text-teal" />
                  </div>
                  <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
                    {aiInsight.answer}
                  </div>
                  {aiInsight.fallbackUsed && (
                    <div style={{ marginTop: '1rem' }}>
                      <span className="status-chip is-danger" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>Hệ thống dùng quy tắc dự phòng</span>
                    </div>
                  )}
                </div>
              )}
            </aside>
          </div>
        ) : (
          <div className="learn-result-panel" style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Không còn câu phù hợp trong bộ câu verified.</h2>
            <p style={{ margin: '1rem 0 2rem' }}>Hãy reset session hoặc chuyển sang review để tiếp tục vòng học.</p>
            <button type="button" className="btn btn-primary" onClick={resetSession}>Reset session</button>
          </div>
        )}
      </LearningRouteFrame>
    </div>
  );
}
