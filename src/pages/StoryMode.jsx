import { timelineSteps } from '../data/caseData';

const StoryMode = () => {
  return (
    <div className="route-shell">
      <div className="container">
        <div className="route-hero">
          <span className="kicker">Vụ việc</span>
          <h1>Dòng thời gian của một chu kỳ bị gãy</h1>
          <p className="hero-intro">
            Trang này tóm lại hồ sơ theo nhịp tuyến tính để dùng khi cần thuyết trình nhanh: vốn đi
            từ T sang H, vào SX, hình thành H&apos;, rồi mắc kẹt trước T&apos;.
          </p>
        </div>

        <div className="formula-band">
          <span>T</span>
          <span>→</span>
          <span>H</span>
          <span>…</span>
          <span>SX</span>
          <span>…</span>
          <span className="is-gold">H&apos;</span>
          <span>→</span>
          <span className="is-danger">T&apos; không hình thành</span>
        </div>

        <div className="route-grid" style={{ marginTop: '2rem' }}>
          {timelineSteps.map((step) => (
            <article key={step.order} className="story-step">
              <div className="story-step-header">
                <span className="timeline-marker">{step.order}</span>
                <span className="timeline-stage">{step.stage}</span>
              </div>
              <strong>{step.title}</strong>
              <p>{step.note}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryMode;
