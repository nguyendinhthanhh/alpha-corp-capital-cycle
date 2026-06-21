import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import './OnboardingOverlay.css';

export const OnboardingOverlay = ({ onStart }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.focus();
    }
  }, []);
  return (
    <div className="onboarding-overlay">
      <div className="onboarding-content">
        <h2>PHÒNG MÔ PHỎNG DÒNG VỐN</h2>
        <p className="onboarding-intro">
          Bạn sẽ theo dõi 10.000 tỷ đồng đi qua 5 hình thái trong tuần hoàn tư bản theo học thuyết Mác - Lênin.
        </p>
        
        <ul className="onboarding-instructions">
          <li>Cuộn hoặc nhấn Tiếp tục để chuyển chặng.</li>
          <li>Nhấn vào node 3D để xem giải thích chi tiết.</li>
          <li>Quan sát điểm đứt gãy H' → T' để hiểu nguồn gốc khủng hoảng.</li>
        </ul>

        <button 
          ref={btnRef}
          className="btn btn-primary btn-large mt-6" 
          onClick={onStart}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onStart();
          }}
          aria-label="Bắt đầu trải nghiệm phòng lab dòng vốn"
        >
          <Play size={18} aria-hidden="true" />
          Bắt đầu trải nghiệm
        </button>
      </div>
    </div>
  );
};
