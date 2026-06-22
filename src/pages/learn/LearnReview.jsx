import { useMemo, useRef, useState } from 'react';
import { CheckCheck, ListRestart } from 'lucide-react';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';
import { QuestionCard } from './QuestionCard';

export default function LearnReview() {
  const { dueReviewItems, getQuestionById, submitQuestion, completeMeaningfulActivity } = useLearning();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const reviewedCountRef = useRef(0);
  const activeItem = dueReviewItems[index] || null;
  const activeQuestion = activeItem ? getQuestionById(activeItem.questionId) : null;

  const summaryLabel = useMemo(() => {
    if (!dueReviewItems.length) return 'Hiện không có câu nào tới hạn review.';
    return `${dueReviewItems.length} câu đang đến hạn theo lịch spaced review.`;
  }, [dueReviewItems.length]);

  const handleSubmit = (response) => {
    const applied = submitQuestion({
      question: activeQuestion,
      response,
      activityType: 'review',
    });
    setFeedback(applied);
    reviewedCountRef.current += 1;
    if (reviewedCountRef.current >= 3) {
      completeMeaningfulActivity('review', new Date());
    }
  };

  const goNext = () => {
    setFeedback(null);
    setIndex((current) => current + 1);
  };

  return (
    <LearningRouteFrame
      eyebrow="Mistake Review"
      title="Ôn lại các lỗi đã gặp"
      subtitle="Review queue được tạo khi bạn sai hoặc chỉ đúng một phần. Lịch ôn dùng spaced repetition đơn giản, có thể kiểm tra được."
      actions={<span className="status-chip is-info">{summaryLabel}</span>}
    >
      {!activeQuestion ? (
        <div className="learn-result-panel">
          <h2>Review queue đang sạch</h2>
          <p>Không có câu nào đến hạn. Bạn có thể quay lại quiz hoặc daily để tạo vòng học tiếp theo.</p>
        </div>
      ) : (
        <div className="learn-single-column">
          <QuestionCard key={activeQuestion.id} question={activeQuestion} onSubmit={handleSubmit} feedback={feedback} submitLabel="Ôn câu này" />

          <div className="learn-dashboard-card">
            <div className="panel-header">
              <h2>Review context</h2>
              <ListRestart size={18} className="text-teal" />
            </div>
            <p>{activeItem.errorType}</p>
            <p>Lần ôn trước: {activeItem.lastReviewedAt ? new Date(activeItem.lastReviewedAt).toLocaleString() : 'Chưa ôn lại lần nào.'}</p>
            {feedback && (
              <div className="learn-feedback-panel">
                <h3>{feedback.result.status === 'correct' ? 'Ôn đúng' : 'Cần ôn thêm'}</h3>
                <p>{activeQuestion.explanation}</p>
                <p>{activeQuestion.alphaCorpConnection}</p>
                <button type="button" className="btn btn-primary" onClick={goNext}>
                  <CheckCheck size={16} />
                  Câu review tiếp theo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </LearningRouteFrame>
  );
}
