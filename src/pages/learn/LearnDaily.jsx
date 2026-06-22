import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarRange, Flame } from 'lucide-react';
import { normalizeDateInput } from '../../learning/engine';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';
import { QuestionCard } from './QuestionCard';

export default function LearnDaily() {
  const { dailyChallenge, profile, submitQuestion, recordDailyAttempt } = useLearning();
  const [feedback, setFeedback] = useState(null);
  const today = normalizeDateInput(new Date());
  const todayHistory = profile.dailyHistory.find((item) => item.date === today);
  const hasCompletedToday = Boolean(todayHistory);

  const streakMessage = useMemo(() => {
    if (profile.streak.current === 0) return 'Hôm nay là một điểm bắt đầu mới.';
    return `Bạn đang có ${profile.streak.current} ngày streak liên tiếp.`;
  }, [profile.streak]);

  const handleSubmit = (response) => {
    const applied = submitQuestion({
      question: dailyChallenge,
      response,
      activityType: 'daily',
      activityId: `daily:${today}`,
    });

    recordDailyAttempt(dailyChallenge.id, applied.result.status, new Date());
    setFeedback(applied);
  };

  if (!dailyChallenge) {
    return (
      <LearningRouteFrame eyebrow="Daily Economic Challenge" title="Thử thách hôm nay" subtitle="">
        <div className="learn-result-panel" style={{ padding: '3rem 2rem', textAlign: 'center', background: '#1a1a1a', borderRadius: '8px', border: '1px solid #333' }}>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Thử thách hôm nay đang được kiểm chứng</h2>
          <p style={{ color: '#aaa', marginBottom: '0.5rem' }}>Nhóm đang đối chiếu câu hỏi với tài liệu môn học.</p>
          <p style={{ color: '#aaa', marginBottom: '2rem' }}>Không có câu hỏi chưa kiểm chứng nào được sử dụng.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/learn" className="btn btn-secondary" style={{ display: 'inline-block' }}>Quay về không gian học tập</Link>
            <Link to="/quiz-review" className="btn btn-primary" style={{ display: 'inline-block' }}>Đến trang Kiểm chứng (Review)</Link>
          </div>
        </div>
      </LearningRouteFrame>
    );
  }

  return (
    <LearningRouteFrame
      eyebrow="Daily Economic Challenge"
      title="Thử thách hôm nay"
      subtitle="Cùng một ngày sẽ luôn ra cùng một challenge trên cùng version dữ liệu. Hoàn thành để giữ nhịp quay lại website."
      actions={
        <div className="learn-inline-actions">
          <span className="status-chip is-info">
            <CalendarRange size={14} />
            {today}
          </span>
          <span className="status-chip">
            <Flame size={14} />
            {profile.streak.current} ngày
          </span>
          {hasCompletedToday && <span className="status-chip">Đã ghi nhận hôm nay</span>}
        </div>
      }
    >
      <div className="learn-single-column">
        {hasCompletedToday && !feedback && (
          <div className="learn-quiz-context-strip">
            <span className="learn-panel-label">Daily challenge</span>
            <p>
              Hôm nay bạn đã có một lần ghi nhận. Bạn vẫn có thể làm lại để ôn, nhưng streak chỉ tính một
              lần trong ngày.
            </p>
          </div>
        )}

        <QuestionCard
          key={dailyChallenge.id}
          question={dailyChallenge}
          onSubmit={handleSubmit}
          feedback={feedback}
          submitLabel="Hoàn thành challenge"
        />

        <div className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Streak</h2>
            <Flame size={18} className="text-gold" />
          </div>
          <p>{streakMessage}</p>
          {feedback && (
            <div className="learn-feedback-panel">
              <h3>Kết quả hôm nay</h3>
              <p>{dailyChallenge.explanation}</p>
              <p>{dailyChallenge.alphaCorpConnection}</p>
            </div>
          )}
        </div>
      </div>
    </LearningRouteFrame>
  );
}
