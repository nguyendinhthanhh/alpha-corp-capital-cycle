import { crisisSignals } from '../../data/caseData';

const CrisisSection = ({ crisisActive, onToggleCrisis }) => {
  return (
    <section id="crisis-lab" className="content-section section-dark">
      <div className="section-heading">
        <span className="kicker">Section 03</span>
        <h2>Kích hoạt cú sốc thị trường</h2>
        <p>
          Đây là interaction chính của hồ sơ. Khi cầu thị trường suy yếu, thời gian lưu thông kéo dài
          và điểm H&apos; → T&apos; trở thành nút thắt làm cả chu kỳ kế tiếp đứng lại.
        </p>
      </div>

      <div className="crisis-lab">
        <div className="crisis-controls forensic-panel">
          <div className="panel-header">
            <span className="eyebrow">Shock Control</span>
            <strong>{crisisActive ? 'Khủng hoảng đang bật' : 'Hệ thống đang ổn định'}</strong>
          </div>

          <p>
            Chỉ số dưới đây là mô phỏng phục vụ mục đích học tập, không phải dữ liệu thực tế. Mục tiêu
            là nhìn rõ cách thị trường ảnh hưởng đến thời gian lưu thông và thanh khoản.
          </p>

          <button type="button" className="btn btn-primary" onClick={onToggleCrisis}>
            {crisisActive ? 'Khôi phục trạng thái ổn định' : 'Kích hoạt khủng hoảng'}
          </button>
        </div>

        <div className="crisis-signals">
          {crisisSignals.map((signal) => (
            <article key={signal.label} className="signal-row">
              <div>
                <span className="detail-label">{signal.label}</span>
                <strong>{crisisActive ? signal.crisis : signal.calm}</strong>
              </div>
              <div className="signal-meter" aria-hidden="true">
                <span
                  className={`meter-bar tone-${signal.tone}`}
                  style={{ width: crisisActive ? '88%' : '34%' }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CrisisSection;
