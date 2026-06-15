import { useState } from 'react';

const questions = [
  {
    q: 'Theo C.Mác, công thức chung của tư bản là gì?',
    options: ['H - T - H', "T - H - T'", "T - T'", "H - H'"],
    answer: 1,
    explain: "T - H - T' là công thức chung vì tư bản vận động để quay về hình thái tiền tệ với lượng giá trị lớn hơn ban đầu.",
  },
  {
    q: 'Alpha Corp bị ngưng trệ chủ yếu ở giai đoạn nào?',
    options: ['T → H', 'SX', "H' → T'", 'Không có giai đoạn nào'],
    answer: 2,
    explain: "H' không bán được nên T' không hình thành, kéo theo thanh khoản, lãi vay và tái sản xuất đều bị đứt.",
  },
  {
    q: 'Điều kiện nào giúp tuần hoàn tư bản diễn ra liên tục?',
    options: [
      'Mọi vốn dồn hết vào xây dựng',
      'Chỉ cần có nhiều tài sản',
      'Các bộ phận tư bản cùng tồn tại về không gian và nối tiếp về thời gian',
      'Chỉ cần thị trường tăng giá',
    ],
    answer: 2,
    explain:
      'Tuần hoàn liên tục đòi hỏi vốn phải tồn tại đồng thời dưới các hình thái khác nhau và các giai đoạn phải nối tiếp không đứt quãng.',
  },
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect = idx === questions[currentQ].answer;
    setFeedback({
      correct: isCorrect,
      text: questions[currentQ].explain,
    });

    if (isCorrect) {
      setScore((value) => value + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((value) => value + 1);
      setSelected(null);
      setFeedback(null);
      return;
    }

    setShowResult(true);
  };

  return (
    <div className="light-wrap">
      <div className="route-shell">
        <div className="container">
          <div className="route-hero">
            <span className="kicker">Kiểm tra</span>
            <h1>Đánh giá nhanh mức hiểu bài</h1>
            <p className="hero-intro" style={{ color: '#556070' }}>
              Bài kiểm tra tập trung vào đúng ba điểm cốt lõi: công thức chung của tư bản, điểm nghẽn
              H&apos; → T&apos; và điều kiện để tuần hoàn diễn ra liên tục.
            </p>
          </div>

          {!showResult ? (
            <div className="surface-light-card" style={{ maxWidth: '860px' }}>
              <div className="check-row">
                <span className="detail-label">
                  Câu {currentQ + 1} / {questions.length}
                </span>
                <strong>Điểm hiện tại: {score}</strong>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h2 style={{ fontSize: '1.8rem' }}>{questions[currentQ].q}</h2>
              </div>

              <div className="check-grid" style={{ marginTop: '1.5rem' }}>
                {questions[currentQ].options.map((option, idx) => {
                  const isCorrect = idx === questions[currentQ].answer;
                  const isPicked = selected === idx;
                  const stateClass =
                    selected === null ? '' : isCorrect ? 'is-right' : isPicked ? 'is-wrong' : '';

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`quiz-option ${stateClass}`}
                      onClick={() => handleSelect(idx)}
                    >
                      <span className="quiz-option-mark">{isPicked ? '•' : ''}</span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {feedback && (
                <div className="quiz-feedback" style={{ marginTop: '1.5rem' }}>
                  <strong className={feedback.correct ? 'tone-blue' : 'tone-danger'}>
                    {feedback.correct ? 'Chính xác' : 'Chưa chính xác'}
                  </strong>
                  <p style={{ marginTop: '0.5rem', color: '#364152' }}>{feedback.text}</p>
                </div>
              )}

              {selected !== null && (
                <div style={{ marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    {currentQ < questions.length - 1 ? 'Sang câu tiếp theo' : 'Xem kết quả'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="surface-light-card" style={{ maxWidth: '640px' }}>
              <span className="detail-label">Hoàn thành</span>
              <h2 style={{ marginTop: '0.75rem' }}>Bạn trả lời đúng {score} / {questions.length}</h2>
              <p style={{ marginTop: '0.75rem', color: '#556070' }}>
                Nếu điểm còn thấp, hãy quay lại phần “Giải mã bằng lý luận” và “Hành trình của 10.000 tỷ
                đồng” để nối lại khái niệm với tình huống Alpha Corp.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setCurrentQ(0);
                    setScore(0);
                    setShowResult(false);
                    setSelected(null);
                    setFeedback(null);
                  }}
                >
                  Làm lại từ đầu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
