import { useMemo, useState } from 'react';
import { BadgeCheck, Brain, Download, Trash2 } from 'lucide-react';
import { achievementDefinitions } from '../../learning/engine';
import { getConceptMeta, learningConcepts } from '../../learning/concepts';
import { runLearningAI } from '../../learning/ai';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';

export default function LearnProgress() {
  const { overview, profile, exportProgress, resetProfile, recordExplainBack } = useLearning();
  const [conceptId, setConceptId] = useState(learningConcepts[0].id);
  const [explanation, setExplanation] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectedConcept = getConceptMeta(conceptId);
  const selectedConceptState = overview.concepts.find((item) => item.conceptId === conceptId);

  const achievementItems = useMemo(
    () =>
      profile.achievements
        .map((achievementId) => achievementDefinitions.find((item) => item.id === achievementId))
        .filter(Boolean),
    [profile.achievements],
  );

  const handleExport = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alpha-corp-learning-progress.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExplainBack = async () => {
    if (!explanation.trim()) return;
    setLoading(true);
    try {
      const response = await runLearningAI({
        route: '/learn/progress',
        action: 'explain-back',
        pageContext: {
          pageName: 'Giải thích lại bằng lời của bạn',
          relevantConceptIds: [conceptId],
          sourceLabels: selectedConcept.sourceLabels,
        },
        prompt: [
          'Đánh giá lời giải thích của người học theo rubric Explain It Back.',
          `Concept: ${selectedConcept.label}`,
          `Reference summary: ${selectedConcept.summary}`,
          `Learner explanation: ${explanation.trim()}`,
          'Phản hồi cần nêu: đúng ý, thiếu ý, có nhầm lẫn hay không, và một phiên bản diễn đạt tốt hơn.',
        ].join('\n'),
      });
      setAiResponse(response);
      recordExplainBack({
        conceptId,
        explanation,
        fallbackUsed: response.fallbackUsed,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LearningRouteFrame
      eyebrow="Knowledge Map"
      title="Bản đồ tiến độ và Explain It Back"
      subtitle="Node status chỉ phục vụ học tập trong website. Nó không phải chứng chỉ chính thức hay đánh giá năng lực tuyệt đối."
    >
      <div className="learn-progress-grid">
        <div className="learn-dashboard-card learn-dashboard-card-wide">
          <div className="panel-header">
            <h2>Knowledge Map</h2>
            <Brain size={18} className="text-teal" />
          </div>
          <div className="learn-map-grid">
            {overview.concepts.map((item) => {
              const meta = getConceptMeta(item.conceptId);
              return (
                <div key={item.conceptId} className="learn-map-node">
                  <strong>{meta?.label || item.label}</strong>
                  <span>{item.score}%</span>
                  <small>{item.state}</small>
                </div>
              );
            })}
          </div>
        </div>

        <div className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Explain It Back</h2>
          </div>
          <select className="learn-select" value={conceptId} onChange={(event) => setConceptId(event.target.value)}>
            {learningConcepts.map((concept) => (
              <option key={concept.id} value={concept.id}>
                {concept.label}
              </option>
            ))}
          </select>
          <p>{selectedConcept.summary}</p>
          <textarea
            className="learn-textarea"
            rows={8}
            value={explanation}
            onChange={(event) => setExplanation(event.target.value)}
            placeholder="Giải thích lại bằng lời của bạn..."
          />
          <button type="button" className="btn btn-primary" onClick={handleExplainBack} disabled={loading || !explanation.trim()}>
            Đánh giá bằng AI
          </button>
          <div className="learn-insight-box">
            <span className="learn-panel-label">Mastery node hiện tại</span>
            <strong>{selectedConceptState?.score || 0}%</strong>
            <p>{selectedConceptState?.state || 'Chưa học'}</p>
          </div>
          {aiResponse && (
            <div className="learn-feedback-panel">
              <p>{aiResponse.answer}</p>
              {aiResponse.fallbackUsed && <span className="status-chip">Fallback có ghi rõ</span>}
            </div>
          )}
        </div>

        <div className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Achievements</h2>
            <BadgeCheck size={18} className="text-green" />
          </div>
          {achievementItems.length ? (
            <ul className="learn-achievement-list">
              {achievementItems.map((achievement) => (
                <li key={achievement.id}>
                  <strong>{achievement.title}</strong>
                  <span>{achievement.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Chưa mở khóa achievement nào.</p>
          )}
        </div>

        <div className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Tiến độ cục bộ</h2>
            <Download size={18} className="text-teal" />
          </div>
          <p>Storage có versioning, load lỗi schema sẽ fallback về profile mặc định thay vì crash.</p>
          <div className="learn-inline-actions">
            <button type="button" className="btn btn-secondary" onClick={handleExport}>
              <Download size={16} />
              Xuất tiến độ
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                if (window.confirm('Xóa toàn bộ tiến độ học tập hiện tại?')) {
                  resetProfile();
                }
              }}
            >
              <Trash2 size={16} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </LearningRouteFrame>
  );
}
