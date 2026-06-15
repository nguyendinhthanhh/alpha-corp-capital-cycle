import { theoryTopics } from '../data/caseData';

const KnowledgeHub = () => {
  return (
    <div className="light-wrap">
      <div className="route-shell">
        <div className="container">
          <div className="route-hero">
            <span className="kicker">Lý luận</span>
            <h1>Từ điển khái niệm cho hồ sơ Alpha Corp</h1>
            <p className="hero-intro" style={{ color: '#556070' }}>
              Phần này giữ nguyên trọng tâm MLN122: tuần hoàn tư bản, chu chuyển tư bản, thời gian sản
              xuất, thời gian lưu thông và bản chất của thanh khoản.
            </p>
          </div>

          <div className="theory-grid">
            {theoryTopics.map((topic) => (
              <article key={topic.title} className="theory-item">
                <h3>{topic.title}</h3>
                <div className="theory-block">
                  <span className="detail-label">Định nghĩa</span>
                  <p>{topic.definition}</p>
                </div>
                <div className="theory-block">
                  <span className="detail-label">Ví dụ</span>
                  <p>{topic.example}</p>
                </div>
                <div className="theory-block">
                  <span className="detail-label">Hậu quả</span>
                  <p>{topic.consequence}</p>
                </div>
                <div className="memory-line">
                  <span>Ghi nhớ</span>
                  <strong>{topic.memory}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
