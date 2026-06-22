import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, CheckSquare, Grip, RotateCcw } from 'lucide-react';

export function QuestionCard({
  question,
  onSubmit,
  feedback = null,
  busy = false,
  autoSubmitOnChoice = false,
  submitLabel = 'Gửi câu trả lời',
}) {
  const [singleAnswer, setSingleAnswer] = useState('');
  const [multiAnswer, setMultiAnswer] = useState([]);
  const [orderingAnswer, setOrderingAnswer] = useState([]);
  const [shortAnswer, setShortAnswer] = useState('');

  const isLocked = busy || Boolean(feedback);

  const canSubmit = useMemo(() => {
    if (question.type === 'multiple-choice') return multiAnswer.length > 0;
    if (question.type === 'ordering') return orderingAnswer.length === question.options.length;
    if (question.type === 'short-answer') return shortAnswer.trim().length > 0;
    if (question.type === 'true-false') return typeof singleAnswer === 'boolean';
    return Boolean(singleAnswer);
  }, [multiAnswer.length, orderingAnswer.length, question.options.length, question.type, shortAnswer, singleAnswer]);

  const instantFeedbackEnabled =
    autoSubmitOnChoice && ['single-choice', 'scenario', 'true-false'].includes(question.type);

  const handleSingleSelect = (optionId) => {
    if (isLocked) return;
    setSingleAnswer(optionId);
    if (instantFeedbackEnabled) {
      onSubmit(optionId);
    }
  };

  const handleMultipleToggle = (optionId) => {
    if (isLocked) return;
    setMultiAnswer((current) =>
      current.includes(optionId)
        ? current.filter((item) => item !== optionId)
        : [...current, optionId].sort(),
    );
  };

  const handleOrderingAdd = (optionId) => {
    if (isLocked) return;
    setOrderingAnswer((current) => (current.includes(optionId) ? current : [...current, optionId]));
  };

  const handleOrderingRemove = (optionId) => {
    if (isLocked) return;
    setOrderingAnswer((current) => current.filter((item) => item !== optionId));
  };

  const moveOrderingItem = (index, direction) => {
    if (isLocked) return;
    setOrderingAnswer((current) => {
      const next = [...current];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) {
        return current;
      }
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const submitResponse = () => {
    if (!canSubmit || isLocked) return;

    let response = singleAnswer;
    if (question.type === 'multiple-choice') response = multiAnswer;
    if (question.type === 'ordering') response = orderingAnswer;
    if (question.type === 'short-answer') response = shortAnswer.trim();

    onSubmit(response);
  };

  const renderChoiceButtons = (multiple = false) => (
    <div className="learn-choice-grid">
      {(question.options || []).map((option) => {
        const isActive = multiple ? multiAnswer.includes(option.id) : singleAnswer === option.id;

        return (
          <button
            key={option.id}
            type="button"
            className={`learn-choice ${isActive ? 'is-active' : ''}`}
            onClick={() => (multiple ? handleMultipleToggle(option.id) : handleSingleSelect(option.id))}
            disabled={isLocked}
            aria-pressed={isActive}
          >
            <span className="learn-choice-key">{option.id.toUpperCase()}</span>
            <span className="learn-choice-text">{option.text || option.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="learn-question-card">
      <div className="learn-question-meta">
        <span className="status-chip is-info">Độ khó {question.difficulty}/5</span>
        <span className="status-chip">{question.type}</span>
      </div>

      <h2 className="learn-question-title">{question.prompt}</h2>

      {(question.type === 'single-choice' || question.type === 'scenario') && renderChoiceButtons(false)}

      {question.type === 'true-false' && (
        <div className="learn-choice-grid learn-choice-grid-compact">
          <button
            type="button"
            className={`learn-choice ${singleAnswer === true ? 'is-active' : ''}`}
            onClick={() => {
              if (isLocked) return;
              setSingleAnswer(true);
              if (instantFeedbackEnabled) {
                onSubmit(true);
              }
            }}
            disabled={isLocked}
            aria-pressed={singleAnswer === true}
          >
            Đúng
          </button>
          <button
            type="button"
            className={`learn-choice ${singleAnswer === false ? 'is-active' : ''}`}
            onClick={() => {
              if (isLocked) return;
              setSingleAnswer(false);
              if (instantFeedbackEnabled) {
                onSubmit(false);
              }
            }}
            disabled={isLocked}
            aria-pressed={singleAnswer === false}
          >
            Sai
          </button>
        </div>
      )}

      {question.type === 'multiple-choice' && renderChoiceButtons(true)}

      {question.type === 'ordering' && (
        <div className="learn-ordering">
          <div className="learn-ordering-pool">
            <div className="learn-panel-label">Bước có sẵn</div>
            <div className="learn-ordering-pool-list">
              {question.options
                .filter((option) => !orderingAnswer.includes(option.id))
                .map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    className="learn-choice"
                    onClick={() => handleOrderingAdd(option.id)}
                    disabled={isLocked}
                  >
                    <Grip size={16} />
                    <span className="learn-choice-text">{option.text || option.label}</span>
                  </button>
                ))}
            </div>
          </div>

          <div className="learn-ordering-sequence">
            <div className="learn-panel-label">Thứ tự bạn chọn</div>
            <div className="learn-ordering-stack">
              {orderingAnswer.map((optionId, index) => {
                const option = question.options.find((item) => item.id === optionId);
                return (
                  <div key={optionId} className="learn-ordering-item">
                    <span className="learn-ordering-index">{index + 1}</span>
                    <span className="learn-ordering-label">{option?.text || option?.label}</span>
                    <div className="learn-ordering-actions">
                      <button type="button" onClick={() => moveOrderingItem(index, -1)} disabled={isLocked}>
                        <ArrowUp size={15} />
                      </button>
                      <button type="button" onClick={() => moveOrderingItem(index, 1)} disabled={isLocked}>
                        <ArrowDown size={15} />
                      </button>
                      <button type="button" onClick={() => handleOrderingRemove(optionId)} disabled={isLocked}>
                        <RotateCcw size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {question.type === 'short-answer' && (
        <textarea
          className="learn-textarea"
          value={shortAnswer}
          onChange={(event) => setShortAnswer(event.target.value)}
          placeholder="Viết câu trả lời ngắn của bạn..."
          disabled={isLocked}
          rows={6}
        />
      )}

      {(!instantFeedbackEnabled || question.type === 'multiple-choice' || question.type === 'ordering' || question.type === 'short-answer') && (
        <div className="learn-question-actions">
          <button type="button" className="btn btn-primary" onClick={submitResponse} disabled={!canSubmit || isLocked}>
            <CheckSquare size={16} />
            {submitLabel}
          </button>
        </div>
      )}
    </div>
  );
}
