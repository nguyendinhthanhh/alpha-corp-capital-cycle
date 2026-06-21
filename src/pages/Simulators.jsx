import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle2, RefreshCw, Play, Settings2 } from 'lucide-react';
import { scenarios } from '../data/simulationScenarios';
import SectionHeader from '../components/shared/SectionHeader';
import { useAI } from '../ai/useAI';
import { buildAIContext } from '../ai/buildAIContext';
import './Simulators.css';

const Simulators = () => {
  // Capital Allocation
  const [reserve, setReserve] = useState(10);
  const [production, setProduction] = useState(70);
  const [labor, setLabor] = useState(20);
  
  // Market Environment
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  
  // Results
  const [result, setResult] = useState(null);
  const { setPageContext } = useAI();

  const total = reserve + production + labor;
  const isBalanced = total === 100;
  const activeScenario = scenarios.find(s => s.id === activeScenarioId);

  useEffect(() => {
    setPageContext(
      buildAIContext({
        route: '/simulators',
        appState: {
          pageName: 'Mo phong',
          simulation: {
            scenario: activeScenario?.name,
            scenarioId: activeScenarioId,
            allocations: {
              reserve,
              production,
              labor,
            },
            result,
            isBalanced,
            total,
          },
          sourceLabels: ['Simulation'],
          relevantConceptIds: ['spatial-condition', 'temporal-condition', 'liquidity'],
        },
      }),
    );
  }, [activeScenario?.name, activeScenarioId, isBalanced, labor, production, reserve, result, setPageContext, total]);

  // Clear result when inputs change
  useEffect(() => {
    // eslint-disable-next-line
    setResult(null);
  }, [reserve, production, labor, activeScenarioId]);

  const handleRun = () => {
    if (!isBalanced) return;

    let status = 'success';
    let title = 'Sức chịu đựng tốt';
    let message = 'Tỷ lệ phân bổ hợp lý giúp doanh nghiệp duy trì được chu kỳ tái sản xuất.';
    let theoryContext = 'Tổng tư bản được phân chia thỏa mãn Điều kiện Không gian: vừa có tiền mặt, vừa có máy móc, vừa đủ tiền thuê công nhân.';

    // Base checks (Space Condition)
    if (reserve < 15) {
      status = 'danger';
      title = 'Thiếu hụt Tiền tệ (T)';
      message = 'Quỹ dự phòng quá thấp. Doanh nghiệp mất khả năng thanh toán các khoản chi phí phát sinh hoặc trả lãi vay.';
      theoryContext = 'Tư bản Tiền tệ (T) không đủ. Điều kiện không gian bị phá vỡ, doanh nghiệp không thể tiếp tục mua H (c+v).';
    } else if (labor < 15) {
      status = 'danger';
      title = 'Thiếu hụt Khả biến (v)';
      message = 'Quỹ lương không đủ. Nợ lương công nhân dẫn đến đình công.';
      theoryContext = 'Tư bản Khả biến (v) là yếu tố duy nhất tạo ra giá trị thặng dư (m). Thiếu v, quá trình ...SX... bị đình trệ.';
    } else if (reserve > 40) {
      status = 'warning';
      title = 'Hiệu suất vốn thấp';
      message = 'Dự phòng rất an toàn nhưng quy mô tư bản sản xuất bị thu hẹp. Lợi nhuận thu về sẽ rất ít.';
      theoryContext = 'Tiền nằm im không phải là tư bản. Tiền phải được ném vào lưu thông (T -> H) để tạo ra thặng dư.';
    }

    // Market Scenario impact (Time Condition)
    if (status === 'success' || status === 'warning') {
      if (activeScenarioId === 'credit-tightening') {
        if (reserve < 25) {
          status = 'danger';
          title = 'Gãy dòng tiền do Khách hàng';
          message = 'Siết tín dụng làm sức mua giảm. Thời gian bán hàng (H\' -> T\') kéo dài. Doanh nghiệp cạn tiền mặt vì dự phòng không đủ bù đắp thời gian chờ đợi.';
          theoryContext = 'Thời gian lưu thông kéo dài làm giảm tốc độ chu chuyển. Điều kiện Thời gian bị đe dọa.';
        } else {
          status = 'warning';
          title = 'Tồn tại lay lắt';
          message = 'Dự phòng cao giúp Alpha Corp cầm cự trả lãi ngân hàng, nhưng lợi nhuận bị ăn mòn hoàn toàn.';
          theoryContext = 'Lợi tức (z) vẫn phải trả trong khi Lợi nhuận (p) chưa thu được. Tích lũy tư bản bằng 0.';
        }
      } else if (activeScenarioId === 'crisis') {
        if (reserve < 40) {
          status = 'danger';
          title = 'Phá sản vì Thanh khoản';
          message = 'Đóng băng thị trường. 3 tòa tháp phần thô không bán được. Ngân hàng đòi nợ gốc và lãi. Alpha Corp hoàn toàn sụp đổ.';
          theoryContext = 'Khuyết tật của kinh tế thị trường. Hàng hóa (H\') không thể chuyển hóa thành Tiền (T\'). Chu kỳ tư bản bị đứt gãy hoàn toàn.';
        } else {
          status = 'warning';
          title = 'Chờ đợi phép màu';
          message = 'Sở hữu lượng tiền mặt khổng lồ giúp Alpha Corp sống sót, nhưng bản thân họ không tạo ra thêm lợi nhuận nào.';
          theoryContext = 'Tư bản rút khỏi lưu thông, trở thành tiền tệ cất trữ. Tuần hoàn tư bản tạm thời dừng lại.';
        }
      }
    }

    setResult({ status, title, message, theoryContext });
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
        <SectionHeader
          eyebrow="Interactive Model"
          title="Mô phỏng Chịu đựng Rủi ro"
          subtitle="Nhập vai Giám đốc Tài chính của Alpha Corp: Phân bổ 10.000 tỷ đồng và kiểm tra sức sống của doanh nghiệp dưới các kịch bản thị trường khác nhau."
        />

        <div className="simulator-workspace">
          {/* Controls Panel */}
          <div className="sim-controls">
            
            {/* Scenario Selector */}
            <div className="scenario-selector">
              <div className="group-label flex items-center">
                <Settings2 size={16} className="mr-2" /> Kịch bản Thị trường
              </div>
              <div className="scenario-buttons">
                {scenarios.map((scen) => (
                  <button 
                    key={scen.id} 
                    className={`scenario-btn ${activeScenarioId === scen.id ? 'active' : ''}`}
                    onClick={() => setActiveScenarioId(scen.id)}
                  >
                    {scen.name}
                  </button>
                ))}
              </div>
              <p className="scenario-desc">{activeScenario?.description}</p>
            </div>

            <div className="sliders-container mt-6">
              <div className="group-label mb-4">Phân bổ 10.000 Tỷ đồng</div>
              
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
                  onChange={(e) => setReserve(Number(e.target.value))}
                  className="custom-slider teal-slider"
                />
              </div>

              {/* Production Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <div className="slider-title">
                    <span className="color-dot bg-navy"></span>
                    Tư bản Bất biến (c)
                  </div>
                  <span className="slider-value">{production}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={production} 
                  onChange={(e) => setProduction(Number(e.target.value))}
                  className="custom-slider navy-slider"
                />
              </div>

              {/* Labor Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <div className="slider-title">
                    <span className="color-dot bg-gold"></span>
                    Tư bản Khả biến (v)
                  </div>
                  <span className="slider-value">{labor}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={labor} 
                  onChange={(e) => setLabor(Number(e.target.value))}
                  className="custom-slider gold-slider"
                />
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
                <Play size={18} className="mr-2" /> Chạy Mô phỏng
              </button>
            </div>
          </div>

          {/* Visualization Panel */}
          <div className="sim-visuals">
            <div className="allocation-visual">
              <h3 className="panel-title">Tỷ trọng phân bổ</h3>
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
            </div>

            <div className="sim-results-area">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={result ? 'result' : 'empty'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`sim-result-card ${result ? `status-${result.status}` : 'empty'}`}
                >
                  <div className="result-icon-wrapper">
                    {getStatusIcon()}
                  </div>
                  <div className="result-content">
                    {result ? (
                      <>
                        <h3 className="result-title">{result.title}</h3>
                        <p className="result-message">{result.message}</p>
                        
                        <div className="theory-context-box mt-4">
                          <span className="box-label">Giải thích bằng Lý luận MLN122</span>
                          <p>{result.theoryContext}</p>
                        </div>
                        
                        <button className="reset-link mt-4" onClick={() => setResult(null)}>
                          <RefreshCw size={14} className="mr-2" /> Điều chỉnh lại
                        </button>
                      </>
                    ) : (
                      <p className="empty-state-text">
                        Hãy điều chỉnh tỷ lệ vốn và chọn Kịch bản thị trường, sau đó nhấn "Chạy Mô phỏng".
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulators;
