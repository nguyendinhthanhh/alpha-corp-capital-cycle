import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle2, RefreshCw, Play } from 'lucide-react';
import './Simulators.css';

const presets = [
  { id: 'defensive', label: 'Phòng thủ an toàn', reserve: 30, production: 50, labor: 20 },
  { id: 'imbalanced', label: 'Rủi ro tài sản', reserve: 5, production: 80, labor: 15 },
  { id: 'labor-strain', label: 'Đứt gãy sản xuất', reserve: 20, production: 70, labor: 10 },
];

const Simulators = () => {
  const [reserve, setReserve] = useState(10);
  const [production, setProduction] = useState(70);
  const [labor, setLabor] = useState(20);
  const [result, setResult] = useState(null);

  const total = reserve + production + labor;
  const isBalanced = total === 100;

  const applyPreset = (preset) => {
    setReserve(preset.reserve);
    setProduction(preset.production);
    setLabor(preset.labor);
    setResult(null);
  };

  const handleRun = () => {
    if (!isBalanced) return;

    if (reserve < 15) {
      setResult({
        status: 'danger',
        title: 'Khủng hoảng thanh khoản',
        message: 'Quỹ dự phòng quá thấp. Khi thời gian lưu thông kéo dài, doanh nghiệp mất khả năng trả lãi vay và đối mặt với rủi ro vỡ nợ ngay lập tức.',
      });
    } else if (labor < 15) {
      setResult({
        status: 'danger',
        title: 'Đứt gãy sản xuất',
        message: 'Quỹ lương không đủ. Sức lao động không được tái sản xuất, khiến quá trình tạo ra giá trị mới (SX) bị gián đoạn từ bên trong.',
      });
    } else if (reserve > 35) {
      setResult({
        status: 'warning',
        title: 'Hiệu suất vốn thấp',
        message: 'Dự phòng rất an toàn nhưng quy mô tư bản sản xuất bị thu hẹp. Vốn quay chậm và giới hạn khả năng tạo ra giá trị thặng dư.',
      });
    } else {
      setResult({
        status: 'success',
        title: 'Sức chịu đựng tốt',
        message: 'Tỷ lệ phân bổ hợp lý giúp doanh nghiệp có vùng đệm thanh khoản để sống sót qua giai đoạn thị trường đóng băng tạm thời.',
      });
    }
  };

  const getStatusIcon = () => {
    if (!result) return <Info size={24} />;
    if (result.status === 'danger') return <AlertTriangle size={24} className="text-red" />;
    if (result.status === 'warning') return <AlertTriangle size={24} className="text-gold" />;
    return <CheckCircle2 size={24} className="text-green" />;
  };

  return (
    <div className="simulators-page">
      <div className="container">
        <header className="page-header text-center">
          <span className="page-eyebrow">Interactive Model</span>
          <h1 className="page-title">Mô phỏng Phân bổ Tư bản</h1>
          <p className="page-subtitle">
            Khám phá cách tỷ lệ phân bổ vốn tác động đến sức chịu đựng của doanh nghiệp khi chu kỳ bị đứt gãy.
          </p>
          <div className="disclaimer-badge">
            <Info size={16} />
            <span>Mô hình giáo dục phục vụ học tập lý luận MLN122, không phải công cụ tư vấn tài chính.</span>
          </div>
        </header>

        <div className="simulator-workspace">
          {/* Controls Panel */}
          <div className="sim-controls">
            <div className="presets-group">
              <span className="group-label">Kịch bản có sẵn</span>
              <div className="preset-buttons">
                {presets.map((preset) => (
                  <button 
                    key={preset.id} 
                    className="preset-btn"
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sliders-container">
              {/* Reserve Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <div className="slider-title">
                    <span className="color-dot bg-teal"></span>
                    Tiền dự phòng (T)
                  </div>
                  <span className="slider-value">{reserve}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={reserve} 
                  onChange={(e) => { setReserve(Number(e.target.value)); setResult(null); }}
                  className="custom-slider teal-slider"
                />
                <p className="slider-desc">Thanh khoản để trả lãi và dự phòng rủi ro.</p>
              </div>

              {/* Production Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <div className="slider-title">
                    <span className="color-dot bg-navy"></span>
                    Tư liệu sản xuất (c)
                  </div>
                  <span className="slider-value">{production}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={production} 
                  onChange={(e) => { setProduction(Number(e.target.value)); setResult(null); }}
                  className="custom-slider navy-slider"
                />
                <p className="slider-desc">Máy móc, vật liệu tạo nên công trình.</p>
              </div>

              {/* Labor Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <div className="slider-title">
                    <span className="color-dot bg-gold"></span>
                    Quỹ lương (v)
                  </div>
                  <span className="slider-value">{labor}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={labor} 
                  onChange={(e) => { setLabor(Number(e.target.value)); setResult(null); }}
                  className="custom-slider gold-slider"
                />
                <p className="slider-desc">Nuôi sống sức lao động để tạo giá trị mới.</p>
              </div>
            </div>

            <div className="sim-actions">
              <div className={`total-indicator ${!isBalanced ? 'invalid' : ''}`}>
                Tổng: <strong>{total}%</strong>
                {!isBalanced && <span>(Phải bằng 100%)</span>}
              </div>
              
              <button 
                className="btn btn-primary run-btn" 
                onClick={handleRun} 
                disabled={!isBalanced}
              >
                <Play size={18} className="mr-2" /> Chạy kiểm tra
              </button>
            </div>
          </div>

          {/* Visualization Panel */}
          <div className="sim-visuals">
            <div className="allocation-visual">
              <h3 className="panel-title">Tỷ trọng phân bổ (10.000 Tỷ)</h3>
              <div className="allocation-bar-container">
                <motion.div 
                  className="alloc-segment bg-teal" 
                  animate={{ width: `${(reserve / Math.max(total, 100)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
                <motion.div 
                  className="alloc-segment bg-navy" 
                  animate={{ width: `${(production / Math.max(total, 100)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
                <motion.div 
                  className="alloc-segment bg-gold" 
                  animate={{ width: `${(labor / Math.max(total, 100)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
              <div className="alloc-labels">
                <span>Dự phòng</span>
                <span>Sản xuất & Lương</span>
              </div>
            </div>

            <div className={`sim-result-card ${result ? `status-${result.status}` : 'empty'}`}>
              <div className="result-icon-wrapper">
                {getStatusIcon()}
              </div>
              <div className="result-content">
                {result ? (
                  <>
                    <h3 className="result-title">{result.title}</h3>
                    <p className="result-message">{result.message}</p>
                    <button className="reset-link" onClick={() => setResult(null)}>
                      <RefreshCw size={14} className="mr-2" /> Thử lại
                    </button>
                  </>
                ) : (
                  <p className="empty-state-text">
                    Hãy điều chỉnh thanh trượt để tổng đạt 100%, sau đó nhấn "Chạy kiểm tra" để xem kết quả đánh giá sức chịu đựng của doanh nghiệp.
                  </p>
                )}
              </div>
            </div>

            <div className="theory-context-box">
              <span className="box-label">Góc nhìn lý luận</span>
              <p>Tuần hoàn tư bản luôn đòi hỏi một tỷ lệ phân chia hợp lý giữa <strong>Tư bản bất biến (c)</strong> và <strong>Tư bản khả biến (v)</strong>, đồng thời phải dự trữ đủ <strong>Tư bản tiền tệ (T)</strong> để đối phó với sự gián đoạn của thời gian lưu thông.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulators;
