import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Brain, Flame, LibraryBig, ListChecks, Sparkles, Target } from 'lucide-react';
import { achievementDefinitions, getMasteryStateLabel } from '../../learning/engine';
import { getConceptMeta, learningConcepts } from '../../learning/concepts';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';

function ProgressRing({ value }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg viewBox="0 0 120 120" className="learn-progress-ring" aria-label={`Tiến độ tổng ${value}%`}>
      <circle cx="60" cy="60" r={radius} className="learn-progress-ring-track" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        className="learn-progress-ring-fill"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text x="60" y="58" textAnchor="middle" className="learn-progress-ring-value">
        {value}%
      </text>
      <text x="60" y="76" textAnchor="middle" className="learn-progress-ring-label">
        Progress
      </text>
    </svg>
  );
}

function buildDashboardSuggestion(overview, dueReviewItems) {
  if (dueReviewItems.length > 0) {
    return {
      title: 'Rule-based suggestion',
      label: 'Fallback có ghi rõ',
      body: `Bạn đang có ${dueReviewItems.length} câu cần ôn. Bắt đầu từ review sẽ hiệu quả hơn mở rộng thêm chủ đề mới lúc này.`,
      cta: '/learn/review',
      ctaLabel: 'Mở review queue',
    };
  }

  if (overview.weakest) {
    return {
      title: 'Rule-based suggestion',
      label: 'Fallback có ghi rõ',
      body: `Chủ đề yếu nhất hiện tại là ${overview.weakest.label.toLowerCase()}. Hợp lý nhất lúc này là làm thêm một set adaptive quiz để kéo score nền lên.`,
      cta: '/learn/quiz',
      ctaLabel: 'Tiếp tục quiz',
    };
  }

  return {
    title: 'Rule-based suggestion',
    label: 'Fallback có ghi rõ',
    body: 'Bạn chưa có đủ dữ liệu học tập. Hãy bắt đầu với Daily Challenge hoặc Adaptive Quiz để hệ thống tạo baseline.',
    cta: '/learn/daily',
    ctaLabel: 'Làm thử thách hôm nay',
  };
}

export default function LearnDashboard() {
  const { overview, profile, dailyChallenge, dueReviewItems } = useLearning();
  const suggestion = buildDashboardSuggestion(overview, dueReviewItems);
  const activeMission = profile.missionDraft || profile.missionHistory[0] || null;
  const unlockedAchievements = achievementDefinitions.filter((item) => profile.achievements.includes(item.id));
  const continueTarget = dueReviewItems.length > 0 ? '/learn/review' : '/learn/quiz';
  const continueText = dueReviewItems.length > 0 ? 'Bạn đang có review queue đang tới hạn.' : 'Adaptive quiz sẽ tự chọn câu kế tiếp theo mastery hiện tại.';

  return (
    <LearningRouteFrame
      eyebrow="Economic Learning Arena"
      title="Không gian học tập kinh tế"
      subtitle="Một learning loop liền mạch giữa quiz, review, mission, debate và AI tutor. Toàn bộ tiến độ được lưu cục bộ, có migration và không dùng dữ liệu AI bịa thêm."
      showBackLink={false}
    >
      <div className="learn-dashboard-grid">
        <section className="learn-hero-card">
          <div className="learn-hero-visual learn-hero-progress-panel">
            <span className="learn-panel-label">Tiến độ tổng thể</span>
            <ProgressRing value={overview.progressPercent} />
          </div>
          <div className="learn-hero-copy">
            <div className="learn-metric-row learn-dashboard-snapshot-grid">
              <div className="learn-dashboard-snapshot-card">
                <span className="learn-metric-label">Streak hiện tại</span>
                <strong>{profile.streak.current} ngày</strong>
              </div>
              <div className="learn-dashboard-snapshot-card">
                <span className="learn-metric-label">Đã làm</span>
                <strong>{overview.totalQuestionsAnswered} câu</strong>
              </div>
              <div className="learn-dashboard-snapshot-card">
                <span className="learn-metric-label">Review tới hạn</span>
                <strong>{overview.dueReviews}</strong>
              </div>
            </div>

            <div className="learn-strength-weakness learn-dashboard-focus-grid">
              <div className="learn-insight-box">
                <span className="learn-panel-label">Chủ đề mạnh nhất</span>
                <strong>{overview.strongest?.label || 'Chưa đủ dữ liệu'}</strong>
                <p>{overview.strongest ? getMasteryStateLabel(overview.strongest.score) : 'Làm thêm vài câu để hệ thống xác định.'}</p>
              </div>
              <div className="learn-insight-box">
                <span className="learn-panel-label">Chủ đề yếu nhất</span>
                <strong>{overview.weakest?.label || 'Chưa có điểm yếu nổi bật'}</strong>
                <p>{overview.weakest ? 'Đây là nơi nên tiếp tục học trước.' : 'Hệ thống chưa phát hiện cụm yếu rõ ràng.'}</p>
              </div>
            </div>

            <div className="learn-dashboard-path-panel">
              <div className="learn-dashboard-path-header">
                <span className="learn-panel-label">Knowledge path</span>
                <p>Nhìn nhanh các cụm khái niệm đã có tín hiệu học tập.</p>
              </div>
              <div className="learn-path">
                {learningConcepts.slice(0, 8).map((concept) => {
                  const conceptState = overview.concepts.find((item) => item.conceptId === concept.id);
                  return (
                    <div key={concept.id} className={`learn-path-node state-${conceptState?.score >= 60 ? 'good' : conceptState?.score > 0 ? 'mid' : 'new'}`}>
                      <span>{concept.shortLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Tiếp tục học</h2>
            <Target size={18} className="text-teal" />
          </div>
          <p>{continueText}</p>
          <Link to={continueTarget} className="btn btn-primary">
            Tiếp tục
            <ArrowRight size={16} />
          </Link>
        </section>

        <section className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Daily Challenge</h2>
            <Flame size={18} className="text-gold" />
          </div>
          <p>{dailyChallenge.prompt}</p>
          <Link to="/learn/daily" className="btn btn-secondary">
            Mở thử thách hôm nay
          </Link>
        </section>

        <section className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Mistake Review</h2>
            <ListChecks size={18} className="text-red" />
          </div>
          <p>{dueReviewItems.length > 0 ? `Có ${dueReviewItems.length} câu đang chờ ôn lại theo lịch spaced review.` : 'Hiện chưa có câu nào tới hạn review.'}</p>
          <Link to="/learn/review" className="btn btn-secondary">
            Mở review queue
          </Link>
        </section>

        <section className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Alpha Corp Mission</h2>
            <LibraryBig size={18} className="text-teal" />
          </div>
          <p>
            {activeMission
              ? 'Bạn đã có một tiến trình mission gần đây. Vào lại để xem trade-off về thanh khoản, điều kiện không gian và điều kiện thời gian.'
              : 'Mở mission để thử cân bằng T, SX và H’ dưới các cú sốc thị trường.'}
          </p>
          <Link to="/learn/case-mission" className="btn btn-secondary">
            Mở mission
          </Link>
        </section>

        <section className="learn-dashboard-card learn-dashboard-card-wide">
          <div className="panel-header">
            <h2>AI Tutor Suggestion</h2>
            <Sparkles size={18} className="text-teal" />
          </div>
          <span className="status-chip">{suggestion.label}</span>
          <p>{suggestion.body}</p>
          <Link to={suggestion.cta} className="btn btn-secondary">
            {suggestion.ctaLabel}
          </Link>
        </section>

        <section className="learn-dashboard-card learn-dashboard-card-wide">
          <div className="panel-header">
            <h2>Knowledge Path</h2>
            <Brain size={18} className="text-teal" />
          </div>
          <div className="learn-knowledge-list">
            {overview.concepts.map((item) => {
              const meta = getConceptMeta(item.conceptId);
              return (
                <div key={item.conceptId} className="learn-knowledge-row">
                  <div>
                    <strong>{meta?.label || item.label}</strong>
                    <p>{meta?.summary}</p>
                  </div>
                  <div className="learn-knowledge-score">
                    <span>{item.score}%</span>
                    <small>{item.state}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Achievements</h2>
            <BadgeCheck size={18} className="text-green" />
          </div>
          {unlockedAchievements.length ? (
            <ul className="learn-achievement-list">
              {unlockedAchievements.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Chưa có achievement nào mở khóa. Chúng chỉ mở khi có hành vi học tập thực sự.</p>
          )}
          <Link to="/learn/progress" className="btn btn-secondary">
            Xem progress map
          </Link>
        </section>
      </div>
    </LearningRouteFrame>
  );
}
