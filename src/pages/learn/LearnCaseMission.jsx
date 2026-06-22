import { useEffect, useMemo, useState } from 'react';
import { Bot, LibraryBig } from 'lucide-react';
import { buildAIContext } from '../../ai/buildAIContext';
import { useAI } from '../../ai/useAI';
import { missionInterventions, missionScenarios } from '../../learning/caseMissionData';
import { runLearningAI } from '../../learning/ai';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';

const allocationProfiles = [
  { id: 'cash-buffer', title: 'Ưu tiên thanh khoản', reserve: 32, production: 38, commodity: 30 },
  { id: 'balanced', title: 'Cân bằng thận trọng', reserve: 26, production: 40, commodity: 34 },
  { id: 'commodity-heavy', title: 'Dồn vào H’', reserve: 14, production: 34, commodity: 52 },
];

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function evaluateMission({ allocation, scenarioId, interventionIds }) {
  const scenario = missionScenarios.find((item) => item.id === scenarioId);
  const interventions = missionInterventions.filter((item) => interventionIds.includes(item.id));
  const scores = {
    liquidity: 52,
    continuity: 54,
    interest: 50,
    reproduction: 50,
    spatial: 50,
    temporal: 50,
    marketability: 50,
  };

  if (allocation.reserve >= 28) {
    scores.liquidity += 12;
    scores.spatial += 8;
  }
  if (allocation.reserve < 18) {
    scores.liquidity -= 18;
    scores.spatial -= 10;
  }
  if (allocation.commodity > 45) {
    scores.marketability -= 12;
    scores.temporal -= 10;
  }
  if (allocation.production >= 38 && allocation.production <= 45) {
    scores.reproduction += 10;
  }
  if (allocation.production < 30) {
    scores.reproduction -= 12;
  }

  Object.entries(scenario.effect).forEach(([key, value]) => {
    scores[key] = clamp(scores[key] + value);
  });

  interventions.forEach((item) => {
    Object.entries(item.effect).forEach(([key, value]) => {
      scores[key] = clamp((scores[key] || 50) + value);
    });
  });

  const status =
    scores.liquidity < 38
      ? 'Mất cân đối tiền tệ'
      : scores.temporal < 42
        ? 'Chu kỳ bị chậm'
        : scores.marketability < 40
          ? 'Tập trung quá nhiều tại H’'
          : scores.reproduction >= 62 && scores.liquidity >= 58
            ? 'Ổn định có điều kiện'
            : 'Có rủi ro nhưng còn điều chỉnh được';

  return {
    scenario,
    interventions,
    scores,
    status,
  };
}

export default function LearnCaseMission() {
  const { recordMissionAttempt, saveMissionDraft, profile } = useLearning();
  const { setPageContext } = useAI();
  const [allocationId, setAllocationId] = useState(profile.missionDraft?.allocationId || allocationProfiles[1].id);
  const [scenarioId, setScenarioId] = useState(profile.missionDraft?.scenarioId || missionScenarios[0].id);
  const [interventionIds, setInterventionIds] = useState(profile.missionDraft?.interventionIds || []);
  const [result, setResult] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const allocation = allocationProfiles.find((item) => item.id === allocationId) || allocationProfiles[1];

  useEffect(() => {
    saveMissionDraft({ allocationId, scenarioId, interventionIds });
  }, [allocationId, interventionIds, saveMissionDraft, scenarioId]);

  useEffect(() => {
    setPageContext(
      buildAIContext({
        route: '/learn/case-mission',
        appState: {
          pageName: 'Nhiệm vụ: Khôi phục vòng tuần hoàn',
          relevantConceptIds: ['liquidity', 'spatial-condition', 'temporal-condition', 'capital-turnover'],
          sourceLabels: ['Case Alpha Corp', 'Capital Lab'],
        },
      }),
    );
  }, [setPageContext]);

  const toggleIntervention = (interventionId) => {
    setInterventionIds((current) => {
      if (current.includes(interventionId)) {
        return current.filter((item) => item !== interventionId);
      }
      if (current.length >= 3) {
        return current;
      }
      return [...current, interventionId];
    });
  };

  const runMission = () => {
    const nextResult = evaluateMission({ allocation, scenarioId, interventionIds });
    setResult(nextResult);
    recordMissionAttempt({
      allocationId,
      scenarioId,
      interventionIds,
      status: nextResult.status,
      completed: true,
    });
  };

  const analyzeWithAI = async () => {
    if (!result) return;
    setAiLoading(true);
    try {
      const response = await runLearningAI({
        route: '/learn/case-mission',
        action: 'analyze-mission',
        pageContext: {
          pageName: 'Nhiệm vụ: Khôi phục vòng tuần hoàn',
          relevantConceptIds: ['liquidity', 'spatial-condition', 'temporal-condition', 'capital-turnover'],
          sourceLabels: ['Case Alpha Corp', 'Capital Lab'],
        },
        prompt: [
          'Phân tích quyết định mission theo đúng knowledge base đã kiểm chứng.',
          `Allocation: T ${allocation.reserve} / SX ${allocation.production} / H' ${allocation.commodity}`,
          `Scenario: ${result.scenario.title} - ${result.scenario.description}`,
          `Interventions: ${result.interventions.map((item) => item.label).join(', ') || 'không chọn'}`,
          `Outcome status: ${result.status}`,
          `Scores: ${JSON.stringify(result.scores)}`,
          'Trả lời theo cấu trúc: điều làm tốt, điểm mất cân bằng, lý luận liên quan, hệ quả, bài học.',
        ].join('\n'),
      });
      setAiResponse(response);
    } finally {
      setAiLoading(false);
    }
  };

  const scoreEntries = useMemo(() => (result ? Object.entries(result.scores) : []), [result]);

  return (
    <LearningRouteFrame
      eyebrow="Case Mission"
      title="Nhiệm vụ: Khôi phục vòng tuần hoàn"
      subtitle="Đây là mô phỏng giáo dục. Không có một nút “đúng tuyệt đối”; hệ thống giải thích trade-off về thanh khoản, H’, và nhịp quay vòng."
    >
      <div className="learn-mission-grid">
        <div className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Vòng 1 — Phân bổ vốn</h2>
            <LibraryBig size={18} className="text-teal" />
          </div>
          <div className="learn-option-stack">
            {allocationProfiles.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`learn-choice ${allocationId === item.id ? 'is-active' : ''}`}
                onClick={() => setAllocationId(item.id)}
              >
                <span>{item.title}</span>
                <small>T {item.reserve} · SX {item.production} · H’ {item.commodity}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Vòng 2 — Biến động thị trường</h2>
          </div>
          <div className="learn-option-stack">
            {missionScenarios.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`learn-choice ${scenarioId === item.id ? 'is-active' : ''}`}
                onClick={() => setScenarioId(item.id)}
              >
                <span>{item.title}</span>
                <small>{item.description}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="learn-dashboard-card learn-dashboard-card-wide">
          <div className="panel-header">
            <h2>Vòng 3 — Chọn tối đa 3 hướng xử lý</h2>
          </div>
          <div className="learn-choice-grid">
            {missionInterventions.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`learn-choice ${interventionIds.includes(item.id) ? 'is-active' : ''}`}
                onClick={() => toggleIntervention(item.id)}
              >
                <span>{item.label}</span>
                <small>{item.summary}</small>
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={runMission}>
            Chạy mission
          </button>
        </div>

        {result && (
          <>
            <div className="learn-dashboard-card learn-dashboard-card-wide">
              <div className="panel-header">
                <h2>Vòng 4 — Kết quả</h2>
              </div>
              <span className="status-chip is-info">{result.status}</span>
              <div className="learn-score-grid">
                {scoreEntries.map(([key, value]) => (
                  <div key={key} className="learn-score-box">
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <p>Score ở đây chỉ phục vụ học tập trong website, không phải đánh giá doanh nghiệp ngoài đời thực.</p>
            </div>

            <div className="learn-dashboard-card learn-dashboard-card-wide">
              <div className="panel-header">
                <h2>Vòng 5 — Phân tích AI</h2>
                <Bot size={18} className="text-teal" />
              </div>
              <div className="learn-inline-actions">
                <button type="button" className="btn btn-secondary" onClick={analyzeWithAI} disabled={aiLoading}>
                  {aiLoading ? 'AI đang phân tích...' : 'AI phân tích quyết định của tôi'}
                </button>
              </div>
              {aiResponse && (
                <>
                  <p>{aiResponse.answer}</p>
                  {aiResponse.fallbackUsed && <span className="status-chip">Fallback có ghi rõ</span>}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </LearningRouteFrame>
  );
}
