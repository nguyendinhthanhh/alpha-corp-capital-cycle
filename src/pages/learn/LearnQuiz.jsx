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

function formatOptionText(option) {
  return option?.text || option?.label || option?.id || '';
}

function formatAnswerValue(question, rawAnswer) {
  if (rawAnswer == null || rawAnswer === '') {
    return 'Chưa có đáp án.';
  }

  if (typeof rawAnswer === 'boolean') {
    return rawAnswer ? 'Đúng' : 'Sai';
  }

  const answerIds = Array.isArray(rawAnswer)
    ? rawAnswer
    : String(rawAnswer)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

  if (question.type === 'true-false') {
    const normalized = String(rawAnswer).trim().toLowerCase();
    return normalized === 'true' ? 'Đúng' : 'Sai';
  }

  if (answerIds.length === 0) {
    return String(rawAnswer);
  }

  const labels = answerIds.map((answerId) => {
    const option = question.options?.find((item) => item.id === answerId);
    return option ? `${answerId.toUpperCase()}. ${formatOptionText(option)}` : answerId;
  });

  return labels.join(' • ');
}

function getSelectedOption(question, feedback) {
  if (!feedback || question.type === 'true-false') {
    return null;
  }

  return question.options?.find((option) => option.id === feedback.selectedAnswer) || null;
}

function getPrimaryConceptSummary(question) {
  const primaryConcept = question.conceptIds?.[0];
  return getConceptMeta(primaryConcept)?.summary || '';
}

function buildITAnalogy(question) {
  const conceptIds = new Set(question.conceptIds || []);

  if (conceptIds.has('liquidity') || conceptIds.has('commodity-capital')) {
    return 'Hãy hình dung team dev đã build xong một release lớn nhưng chưa deploy được và chưa thu tiền từ khách. Tài sản kỹ thuật có đó, nhưng cashflow vẫn chưa quay về để trả hạ tầng, lương và tiếp tục sprint mới.';
  }

  if (conceptIds.has('capital-circuit') || conceptIds.has('reproduction')) {
    return 'Giống một pipeline sản phẩm: tiền là budget ban đầu, mua đầu vào là thuê dev và hạ tầng, sản xuất là build feature, H’ là bản release đã xong, còn T’ là lúc người dùng trả tiền. Không chốt được tiền thì pipeline dừng ở khâu cuối.';
  }

  if (conceptIds.has('spatial-condition') || conceptIds.has('temporal-condition')) {
    return 'Giống vận hành một hệ thống gồm code, CI và production. Nếu dồn toàn bộ tài nguyên vào một chỗ hoặc một bước bị treo quá lâu, toàn bộ pipeline phát hành sẽ nghẽn.';
  }

  return 'Hãy xem câu này như một pipeline dev: budget -> build -> release -> doanh thu quay về. Điểm nào chưa quay lại thành tiền hoặc chưa nối tiếp được sang vòng sau thì đó là chỗ nghẽn của hệ thống.';
}

function buildClientSideQuizInsight({ question, feedback, action, masteryScore }) {
  const conceptSummary = getPrimaryConceptSummary(question);
  const selectedOption = getSelectedOption(question, feedback);
  const correctAnswer = formatAnswerValue(question, question.correctAnswer);

  if (action === 'quiz-hint') {
    return {
      answer: [
        'Không gọi được AI server, đang dùng fallback cục bộ.',
        `Gợi ý nhanh: tập trung vào khái niệm "${getConceptMeta(question.conceptIds?.[0])?.label || 'trọng tâm'}".`,
        conceptSummary ? `Điểm cần nhớ: ${conceptSummary}` : null,
        'Loại trước các phương án chỉ mô tả hiện tượng phụ hoặc không giúp vốn quay lại vòng tiếp theo.',
      ]
        .filter(Boolean)
        .join('\n\n'),
      fallbackUsed: true,
      localFallback: true,
    };
  }

  if (action === 'it-analogy') {
    return {
      answer: [
        'Không gọi được AI server, đang dùng fallback cục bộ.',
        buildITAnalogy(question),
      ].join('\n\n'),
      fallbackUsed: true,
      localFallback: true,
    };
  }

  if (action === 'quiz-explanation') {
    return {
      answer: [
        'Không gọi được AI server, đang dùng fallback cục bộ.',
        feedback?.result?.status === 'correct'
          ? 'Bạn chọn đúng hướng. Trọng tâm là giữ cho chu kỳ vốn nối tiếp được sang vòng sau.'
          : `Bạn nhầm ở chỗ: ${selectedOption?.wrongReason || feedback?.reviewItem?.errorType || 'đã chọn phương án không xử lý đúng nút của chu kỳ vốn.'}`,
        `Đáp án đúng: ${correctAnswer}`,
        `Logic ngắn: ${question.explanation}`,
      ].join('\n\n'),
      fallbackUsed: true,
      localFallback: true,
    };
  }

  return {
    answer: [
      'Không gọi được AI server, đang dùng fallback cục bộ.',
      `Giải thích ngắn: ${question.explanation}`,
      conceptSummary ? `Nhớ thêm: ${conceptSummary}` : null,
      feedback?.result?.status === 'correct'
        ? `Bạn đang ở mức mastery khoảng ${masteryScore}%. Tiếp tục giữ đúng trọng tâm này ở câu tiếp theo.`
        : `Nếu làm lại, hãy bắt đầu từ khâu khiến vốn chưa thể quay về hoặc chưa thể nối sang vòng mới.`,
    ]
      .filter(Boolean)
      .join('\n\n'),
    fallbackUsed: true,
    localFallback: true,
  };
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
  const selectedOption = feedback ? getSelectedOption(currentQuestion, feedback) : null;

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
            options: currentQuestion.options?.map((item) => formatOptionText(item)) || [],
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

  const conceptBadges = useMemo(() => {
    const labels =
      currentQuestion?.conceptIds.map((conceptId) => getConceptMeta(conceptId)?.label || conceptId) || [];

    return [...new Set(labels)];
  }, [currentQuestion]);

  const primaryConceptLabel = getConceptMeta(primaryConcept)?.label || 'Khái niệm trọng tâm';
  const relatedConceptLabels = conceptBadges.filter((label) => label !== primaryConceptLabel);

  const advanceQuestion = () => {
    const nextAnswered = currentQuestion ? [...answeredIds, currentQuestion.id] : answeredIds;

    if (sessionCount >= QUIZ_SET_SIZE) {
      completeMeaningfulActivity('quiz-set', new Date(), { sessionId: sessionIdRef.current });
      setSessionComplete(true);
      setAnsweredIds(nextAnswered);
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    setAiInsight(null);
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
            options: currentQuestion.options?.map((item) => formatOptionText(item)) || [],
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
    } catch (error) {
      if (action === 'quiz-hint') {
        setHintsUsed((current) => current + 1);
      }

      const localFallback = buildClientSideQuizInsight({
        question: currentQuestion,
        feedback,
        action,
        masteryScore,
      });

      setAiInsight({
        ...localFallback,
        label,
        errorMessage: error?.message || 'Không gọi được AI server.',
      });
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
            <h2>Đã hoàn thành set câu hỏi</h2>
            <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              Set này đã được tính là một hoạt động học có ý nghĩa cho streak. Bước tiếp theo hợp lý là review hoặc mở progress map.
            </p>
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
            <div className="learn-quiz-main">
              <div className="learn-quiz-context-strip">
                <div className="learn-quiz-context-row">
                  <div className="learn-quiz-focus">
                    <Target size={18} className="text-teal" />
                    <span className="learn-panel-label" style={{ margin: 0 }}>Trọng tâm</span>
                    <strong>{primaryConceptLabel}</strong>
                  </div>

                  {relatedConceptLabels.length > 0 && (
                    <div className="learn-quiz-context-related">
                      <span className="learn-panel-label" style={{ margin: 0 }}>Liên quan</span>
                      <span className="learn-quiz-context-related-text">
                        {relatedConceptLabels.join(' · ')}
                      </span>
                    </div>
                  )}
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
                <div className={`learn-feedback-panel learn-quiz-detail-panel state-${feedback.result.status === 'correct' ? 'correct' : 'incorrect'}`}>
                  <div className="panel-header learn-quiz-detail-header">
                    <div>
                      <span className="learn-panel-label">Chi tiết kiểm chứng</span>
                      <h3>Giải thích sâu hơn và nguồn đối chiếu</h3>
                    </div>
                    <span className="status-chip">{feedback.result.scoreFraction * 100}% weight</span>
                  </div>

                  <div className="learn-feedback-grid learn-quiz-detail-grid">
                    <div className="learn-insight-box">
                      <span className="learn-panel-label">Nguồn kiến thức</span>
                      <p>
                        {currentQuestion.source?.sessionOrSlot} · {currentQuestion.topic || 'Không rõ'} · Slide {currentQuestion.source?.slideNumber}
                      </p>
                    </div>

                    {currentQuestion.alphaCorpConnection && (
                      <div className="learn-insight-box">
                        <span className="learn-panel-label">Liên hệ Alpha Corp</span>
                        <p>{currentQuestion.alphaCorpConnection}</p>
                      </div>
                    )}

                    {feedback.result.status !== 'correct' && (
                      <div className="learn-insight-box learn-quiz-mistake-box">
                        <span className="learn-panel-label">Điểm nhầm chính</span>
                        <p>{selectedOption?.wrongReason || feedback.reviewItem?.errorType || 'Bạn đang chọn phương án không giải quyết đúng nút của chu kỳ vốn.'}</p>
                      </div>
                    )}
                  </div>

                  <div className="learn-inline-actions learn-quiz-detail-actions">
                    <Link to="/story" className="btn btn-secondary">Xem phần lý luận</Link>
                  </div>
                </div>
              )}
            </div>

            <aside className="learn-sidebar learn-quiz-sidebar">
              <div className={`learn-dashboard-card learn-quiz-coach-card ${feedback ? `learn-quiz-review-card state-${feedback.result.status}` : ''}`}>
                <div className="panel-header learn-quiz-coach-header">
                  <div className="learn-quiz-coach-title">
                    {feedback ? <Zap size={18} className="text-teal" /> : <Bot size={18} className="text-teal" />}
                    <div>
                      <span className="learn-panel-label">{feedback ? 'Kết quả hiện tại' : 'Quiz Coach'}</span>
                      <h2>{feedback ? buildResultLabel(feedback.result.status) : 'Hỗ trợ làm bài'}</h2>
                    </div>
                  </div>
                  <strong className="learn-mastery-number">{masteryScore}% mastery</strong>
                </div>

                {feedback ? (
                  <>
                    <div className="learn-quiz-review-copy">
                      <div className="learn-quiz-review-block">
                        <span className="learn-panel-label">Hiểu nhanh</span>
                        <p>{currentQuestion.explanation}</p>
                      </div>

                      <div className="learn-quiz-review-summary">
                        <div className="learn-quiz-review-mini">
                          <span className="learn-panel-label">Bạn đã chọn</span>
                          <p>{feedback.selectedAnswer}</p>
                        </div>
                        <div className="learn-quiz-review-mini">
                          <span className="learn-panel-label">Đáp án đúng</span>
                          <p>{formatAnswerValue(currentQuestion, currentQuestion.correctAnswer)}</p>
                        </div>
                      </div>

                      {feedback.result.status !== 'correct' && (
                        <div className="learn-quiz-review-note is-danger">
                          <span className="learn-panel-label">Sai ở đâu</span>
                          <p>{selectedOption?.wrongReason || feedback.reviewItem?.errorType || 'Bạn đang nhầm giữa phương án mô tả hiện tượng và phương án xử lý đúng nút của chu kỳ vốn.'}</p>
                        </div>
                      )}
                    </div>

                    <div className="learn-ai-action-list learn-quiz-coach-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAIAction('explain', 'Giải thích đơn giản hơn', true)}
                        disabled={aiLoading}
                      >
                        <Compass size={14} />
                        Giải thích đơn giản hơn
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAIAction('it-analogy', 'Ví dụ IT', true)}
                        disabled={aiLoading}
                      >
                        <Bot size={14} />
                        Liên hệ với ví dụ IT
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAIAction('quiz-explanation', 'Phân tích lỗi sai', true)}
                        disabled={aiLoading || feedback.result.status === 'correct'}
                      >
                        <Target size={14} />
                        Phân tích lỗi sai
                      </button>
                    </div>

                    <div className="learn-quiz-ai-response">
                      <div className="panel-header">
                        <h3>{aiInsight?.label || 'Coach response'}</h3>
                        {aiLoading ? <span className="status-chip is-info">Đang xử lý</span> : <Sparkles size={16} className="text-teal" />}
                      </div>

                      <div className="learn-quiz-ai-response-body">
                        {aiInsight ? (
                          <div className="learn-quiz-ai-response-copy">
                            <p>{aiInsight.answer}</p>
                            {(aiInsight.fallbackUsed || aiInsight.localFallback) && (
                              <span className="status-chip is-danger">
                                {aiInsight.localFallback ? 'Fallback cục bộ' : 'Fallback từ server'}
                              </span>
                            )}
                            {aiInsight.errorMessage && (
                              <p className="learn-help-text">Lý do: {aiInsight.errorMessage}</p>
                            )}
                          </div>
                        ) : (
                          <div className="learn-quiz-ai-placeholder">
                            <p>Ba trợ giúp chính hiện nằm ngay tại đây để bạn không phải kéo xuống dưới nữa.</p>
                            <p className="learn-help-text">Nếu AI server chưa sẵn sàng, hệ thống sẽ tự dùng fallback để vẫn trả lời được.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="learn-inline-actions learn-quiz-review-actions">
                      <button type="button" className="btn btn-primary" onClick={advanceQuestion}>
                        Câu tiếp theo
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="learn-help-text">
                      Chọn đáp án là hệ thống chấm ngay. Sau đó giải thích ngắn, ví dụ IT và phân tích lỗi sai sẽ hiện ngay ở panel này.
                    </p>

                    <div className="learn-ai-action-list learn-quiz-coach-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAIAction('quiz-hint', 'Gợi ý làm bài', false)}
                        disabled={aiLoading}
                      >
                        <Sparkles size={14} />
                        Gợi ý làm bài
                      </button>
                    </div>

                    <div className="learn-quiz-ai-response">
                      <div className="panel-header">
                        <h3>{aiInsight?.label || 'Hint panel'}</h3>
                        {aiLoading ? <span className="status-chip is-info">Đang xử lý</span> : <Sparkles size={16} className="text-teal" />}
                      </div>

                      <div className="learn-quiz-ai-response-body">
                        {aiInsight ? (
                          <div className="learn-quiz-ai-response-copy">
                            <p>{aiInsight.answer}</p>
                            {(aiInsight.fallbackUsed || aiInsight.localFallback) && (
                              <span className="status-chip is-danger">
                                {aiInsight.localFallback ? 'Fallback cục bộ' : 'Fallback từ server'}
                              </span>
                            )}
                            {aiInsight.errorMessage && (
                              <p className="learn-help-text">Lý do: {aiInsight.errorMessage}</p>
                            )}
                          </div>
                        ) : (
                          <div className="learn-quiz-ai-placeholder">
                            <p>Bấm “Gợi ý làm bài” nếu cần định hướng trước khi chọn.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
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
