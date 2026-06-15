const sources = [
  'Giáo trình Kinh tế chính trị Mác - Lênin dành cho sinh viên đại học.',
  'Bài giảng về công thức chung của tư bản, tuần hoàn và chu chuyển tư bản.',
  'Bài giảng về tích lũy tư bản và tái sản xuất.',
];

const Appendix = () => {
  return (
    <div className="light-wrap">
      <div className="route-shell">
        <div className="container">
          <div className="route-hero">
            <span className="kicker">Nguồn & AI</span>
            <h1>Liêm chính học thuật và nguồn tham chiếu</h1>
            <p className="hero-intro" style={{ color: '#556070' }}>
              Phần này tách rõ nội dung học thuật, vai trò hỗ trợ của AI và giới hạn của các mô phỏng
              trong dự án.
            </p>
          </div>

          <div className="appendix-grid">
            <div className="route-grid">
              <article className="surface-light-card">
                <span className="detail-label">Cam kết liêm chính</span>
                <p style={{ marginTop: '0.75rem', color: '#364152' }}>
                  Nội dung lý thuyết được biên soạn dựa trên giáo trình và bài giảng môn học. AI chỉ hỗ
                  trợ ở tầng code, cấu trúc kể chuyện và cách trực quan hóa, không thay thế cho phân tích
                  học thuật của nhóm.
                </p>
              </article>

              <article className="surface-light-card">
                <span className="detail-label">Báo cáo sử dụng AI</span>
                <div className="story-step-list" style={{ marginTop: '1rem' }}>
                  <div className="surface-light-card" style={{ padding: '1rem', background: '#f8fafc' }}>
                    <strong>ChatGPT</strong>
                    <p style={{ marginTop: '0.5rem', color: '#556070' }}>
                      Hỗ trợ đề xuất hướng kể chuyện, cấu trúc giao diện và triển khai mã nguồn frontend.
                    </p>
                  </div>
                  <div className="surface-light-card" style={{ padding: '1rem', background: '#f8fafc' }}>
                    <strong>Can thiệp của nhóm</strong>
                    <p style={{ marginTop: '0.5rem', color: '#556070' }}>
                      Rà soát logic mô phỏng, chỉnh sửa thuật ngữ học thuật và quyết định toàn bộ nội dung
                      cuối cùng trước khi sử dụng.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <aside className="surface-light-card">
              <span className="detail-label">Nguồn tài liệu</span>
              <ul className="source-list" style={{ marginTop: '1rem' }}>
                {sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appendix;
