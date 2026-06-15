import { useState } from 'react';

const Simulators = () => {
  const [reserve, setReserve] = useState(10);
  const [production, setProduction] = useState(70);
  const [labor, setLabor] = useState(20);
  const [result, setResult] = useState(null);

  const total = reserve + production + labor;

  const handleRun = () => {
    if (total !== 100) return;

    if (reserve < 15) {
      setResult({
        status: 'danger',
        title: 'Phá sản thanh khoản',
        message:
          'Quỹ dự phòng quá thấp. Khi thị trường bất động sản đóng băng, doanh nghiệp không còn tiền mặt để trả lãi vay và duy trì hoạt động.',
      });
    } else if (labor < 15) {
      setResult({
        status: 'danger',
        title: 'Đứt gãy sức lao động',
        message:
          'Quỹ lương quá thấp. Sức lao động không được tái sản xuất đầy đủ và quá trình SX bị gián đoạn từ bên trong.',
      });
    } else if (reserve > 40) {
      setResult({
        status: 'warning',
        title: 'Tích trữ quá mức',
        message:
          'Dự phòng an toàn nhưng quy mô sản xuất và khả năng sinh lời thấp. Tư bản quay chậm và khó tạo giá trị thặng dư hiệu quả.',
      });
    } else {
      setResult({
        status: 'success',
        title: 'Cân bằng tạm ổn',
        message:
          'Phân bổ vốn đủ sức chịu một giai đoạn lưu thông kéo dài. Doanh nghiệp vẫn có cửa duy trì vòng quay và tránh khủng hoảng ngay lập tức.',
      });
    }
  };

  const statusClass =
    result?.status === 'danger' ? 'tone-danger' : result?.status === 'warning' ? 'tone-gold' : 'tone-blue';

  return (
    <div className="route-shell">
      <div className="container">
        <div className="route-hero">
          <span className="kicker">Mô phỏng</span>
          <h1>Phân bổ vốn để tránh đứt chu kỳ</h1>
          <p className="hero-intro">
            Chỉ số dưới đây là mô phỏng phục vụ học tập. Mục tiêu là nhìn rõ vai trò của tiền dự
            phòng, tư liệu sản xuất và quỹ lương trong việc giữ cho chu chuyển tư bản không bị gãy.
          </p>
        </div>

        <div className="sim-shell">
          <div className="forensic-panel">
            <div className="panel-header">
              <span className="eyebrow">Capital Allocation</span>
              <strong>Tổng phân bổ phải bằng 100%</strong>
            </div>

            <div className="journey-detail">
              <div className="slider-group">
                <div className="slider-header">
                  <strong>Tiền dự phòng thanh khoản</strong>
                  <span className="timeline-marker">{reserve}%</span>
                </div>
                <p className="slider-note">Vùng đệm để trả lãi, lương và chống sốc khi lưu thông kéo dài.</p>
                <input className="range-input" type="range" min="0" max="100" value={reserve} onChange={(event) => setReserve(Number(event.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-header">
                  <strong>Tư liệu sản xuất</strong>
                  <span className="timeline-marker">{production}%</span>
                </div>
                <p className="slider-note">Đất, máy móc và vật liệu để hình thành phần thô của dự án.</p>
                <input className="range-input" type="range" min="0" max="100" value={production} onChange={(event) => setProduction(Number(event.target.value))} />
              </div>

              <div className="slider-group">
                <div className="slider-header">
                  <strong>Quỹ lương và sức lao động</strong>
                  <span className="timeline-marker">{labor}%</span>
                </div>
                <p className="slider-note">Bảo đảm quá trình SX diễn ra liên tục và không phát sinh nợ lương.</p>
                <input className="range-input" type="range" min="0" max="100" value={labor} onChange={(event) => setLabor(Number(event.target.value))} />
              </div>

              <div className="hero-actions">
                <span className={`status-chip ${total === 100 ? 'is-info' : 'is-danger'}`}>
                  Tổng phân bổ: {total}% {total !== 100 ? '(chưa hợp lệ)' : ''}
                </span>
                <button type="button" className="btn btn-primary" onClick={handleRun} disabled={total !== 100}>
                  Chạy mô phỏng
                </button>
              </div>
            </div>
          </div>

          <div className="forensic-panel">
            <div className="panel-header">
              <span className="eyebrow">Kết quả</span>
              <strong>Phản ứng của chu kỳ tư bản</strong>
            </div>

            <div className="journey-detail">
              {!result ? (
                <div className="empty-state">
                  Điều chỉnh ba tỷ lệ rồi chạy mô phỏng để xem hệ thống phản ứng thế nào khi thị trường
                  không còn hấp thụ được H&apos;.
                </div>
              ) : (
                <div className="result-state">
                  <strong className={statusClass}>{result.title}</strong>
                  <p>{result.message}</p>
                  <button type="button" className="btn btn-secondary" onClick={() => setResult(null)}>
                    Đặt lại đánh giá
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulators;
