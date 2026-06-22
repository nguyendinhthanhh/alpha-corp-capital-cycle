import { useState } from 'react';
import { Bot, Swords } from 'lucide-react';
import { debatePrompts } from '../../learning/debatePrompts';
import { runLearningAI } from '../../learning/ai';
import { useLearning } from '../../learning/useLearning';
import { LearningRouteFrame } from './LearningRouteFrame';

export default function LearnDebate() {
  const { recordDebateAttempt } = useLearning();
  const [promptId, setPromptId] = useState(debatePrompts[0].id);
  const [answer, setAnswer] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const activePrompt = debatePrompts.find((item) => item.id === promptId) || debatePrompts[0];

  const submitDebate = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const aiResponse = await runLearningAI({
        route: '/learn/debate',
        action: 'debate-feedback',
        pageContext: {
          pageName: 'Phòng luyện phản biện',
          relevantConceptIds: activePrompt.conceptIds,
          sourceLabels: ['Case Alpha Corp', 'Session 8', 'Session 11'],
        },
        prompt: [
          'Đánh giá câu trả lời phản biện theo đúng knowledge base đã kiểm chứng.',
          `Level: ${activePrompt.level}`,
          `Prompt: ${activePrompt.prompt}`,
          `User answer: ${answer.trim()}`,
          'Hãy trả lời theo cấu trúc: điểm lập luận tốt, ý còn thiếu, khái niệm dùng chưa chính xác nếu có, và một câu hỏi phản biện tiếp theo.',
        ].join('\n'),
      });
      setResponse(aiResponse);
      recordDebateAttempt({
        promptId,
        answer,
        fallbackUsed: aiResponse.fallbackUsed,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LearningRouteFrame
      eyebrow="Debate Arena"
      title="Phòng luyện phản biện"
      subtitle="AI không đưa đáp án mẫu trước. Bạn phải tự lập luận, rồi hệ thống mới phản hồi về độ chặt của luận điểm."
    >
      <div className="learn-two-column">
        <div className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Chọn đề</h2>
            <Swords size={18} className="text-teal" />
          </div>
          <div className="learn-option-stack">
            {debatePrompts.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`learn-choice ${promptId === item.id ? 'is-active' : ''}`}
                onClick={() => setPromptId(item.id)}
              >
                <span>{item.prompt}</span>
                <small>{item.level}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="learn-dashboard-card">
          <div className="panel-header">
            <h2>Lập luận của bạn</h2>
            <Bot size={18} className="text-teal" />
          </div>
          <p>{activePrompt.prompt}</p>
          <textarea
            className="learn-textarea"
            rows={10}
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Nhập lập luận của bạn ở đây..."
          />
          <button type="button" className="btn btn-primary" onClick={submitDebate} disabled={loading || !answer.trim()}>
            Gửi để AI phản biện
          </button>
          {response && (
            <div className="learn-feedback-panel">
              <p>{response.answer}</p>
              {response.fallbackUsed && <span className="status-chip">Fallback có ghi rõ</span>}
            </div>
          )}
        </div>
      </div>
    </LearningRouteFrame>
  );
}

