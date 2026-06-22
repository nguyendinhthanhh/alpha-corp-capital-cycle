import { useMemo, useRef, useState } from 'react';
import { CheckCheck, Clock3, ListRestart } from 'lucide-react';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';
import { QuestionCard } from './QuestionCard';

function formatReviewDate(value) {
  if (!value) return 'Chưa có lịch cụ thể.';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Chưa có lịch cụ thể.';

  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function LearnReview() {
  const { profile, dueReviewItems, getQuestionById, submitQuestion, completeMeaningfulActivity } = useLearning();
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const reviewedCountRef = useRef(0);

  const allReviewItems = useMemo(
    () => (profile.reviewQueue || []).filter((item) => item.status !== 'mastered'),
    [profile.reviewQueue],
  );

  const upcomingReviewItems = useMemo(() => {
    const dueIds = new Set(dueReviewItems.map((item) => item.questionId));
    return allReviewItems.filter((item) => !dueIds.has(item.questionId));
  }, [allReviewItems, dueReviewItems]);

  const queueMode = dueReviewItems.length > 0 ? 'due' : upcomingReviewItems.length > 0 ? 'upcoming' : 'empty';
  const activeQueue = queueMode === 'due' ? dueReviewItems : queueMode === 'upcoming' ? upcomingReviewItems : [];
  const activeItem = activeQueue[index] || null;
  const activeQuestion = activeItem ? getQuestionById(activeItem.questionId) : null;

  const summaryLabel = useMemo(() => {
    if (queueMode === 'due') {
      return `${dueReviewItems.length} câu đang tới hạn review.`;
    }
    if (queueMode === 'upcoming') {
      return `Chưa tới hạn, nhưng có ${upcomingReviewItems.length} câu đang chờ lịch ôn.`;
    }
    return 'Review queue hiện đang trống.';
  }, [dueReviewItems.length, queueMode, upcomingReviewItems.length]);

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
      subtitle="Review queue được tạo khi bạn sai hoặc chỉ đúng một phần. Nếu chưa tới hạn theo spaced repetition, bạn vẫn sẽ thấy các câu đang chờ trong hàng."
      actions={<span className="status-chip is-info">{summaryLabel}</span>}
    >
      {queueMode === 'empty' ? (
        <div className="learn-result-panel">
          <h2>Review queue đang sạch</h2>
          <p>Hiện chưa có câu sai nào đang chờ ôn. Bạn có thể quay lại quiz hoặc daily để tạo vòng học tiếp theo.</p>
        </div>
      ) : !activeQuestion ? (
        <div className="learn-result-panel">
          <h2>Đã đi hết queue hiện tại</h2>
          <p>{queueMode === 'due' ? 'Các câu tới hạn đã được xử lý.' : 'Các câu đang chờ lịch ôn đã được xem hết trong lượt này.'}</p>
        </div>
      ) : (
        <div className="learn-single-column">
          {queueMode === 'upcoming' && (
            <div className="learn-feedback-panel">
              <div className="panel-header">
                <h2>Chưa tới hạn nhưng vẫn có queue</h2>
                <Clock3 size={18} className="text-teal" />
              </div>
              <p>
                Câu sai của bạn đã được lưu vào review queue. Theo lịch hiện tại, câu này sẽ tới hạn vào{' '}
                <strong>{formatReviewDate(activeItem.nextReviewAt)}</strong>. Bạn vẫn có thể ôn ngay ở đây nếu muốn.
              </p>
            </div>
          )}

          <QuestionCard
            key={`${activeQuestion.id}-${activeItem.nextReviewAt || 'review'}`}
            question={activeQuestion}
            onSubmit={handleSubmit}
            feedback={feedback}
            submitLabel={queueMode === 'due' ? 'Ôn câu này' : 'Ôn ngay câu này'}
          />

          <div className="learn-dashboard-card">
            <div className="panel-header">
              <h2>Review context</h2>
              <ListRestart size={18} className="text-teal" />
            </div>
            <p>{activeItem.errorType}</p>
            <p>Lần ôn trước: {activeItem.lastReviewedAt ? new Date(activeItem.lastReviewedAt).toLocaleString() : 'Chưa ôn lại lần nào.'}</p>
            <p>Lịch ôn kế tiếp: {formatReviewDate(activeItem.nextReviewAt)}</p>
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
