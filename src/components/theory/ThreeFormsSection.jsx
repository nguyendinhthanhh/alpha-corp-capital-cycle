import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown } from "lucide-react";
import Section from "../shared/Section";
import Atmosphere from "../shared/Atmosphere";
import SectionHeader from "../shared/SectionHeader";
import "./ThreeFormsSection.css";

const ThreeFormsSection = ({ isCrisis }) => {
  const [userAllocation, setUserAllocation] = useState({
    money: 20,
    production: 70,
    commodity: 10,
  });

  const allocation = isCrisis
    ? { money: 0, production: 10, commodity: 90 }
    : userAllocation;

  const handleDrag = (type, newValue) => {
    if (isCrisis) return;

    let { money, production, commodity } = allocation;

    if (type === "money") {
      const diff = newValue - money;
      money = newValue;
      commodity = Math.max(0, commodity - diff);
      if (money + production + commodity !== 100) {
        production = 100 - money - commodity;
      }
    } else if (type === "production") {
      const diff = newValue - production;
      production = newValue;
      commodity = Math.max(0, commodity - diff);
      if (money + production + commodity !== 100) {
        money = 100 - production - commodity;
      }
    } else if (type === "commodity") {
      const diff = newValue - commodity;
      commodity = newValue;
      money = Math.max(0, money - diff);
      if (money + production + commodity !== 100) {
        production = 100 - money - commodity;
      }
    }

    setUserAllocation({ money, production, commodity });
  };

  const isLiquidityLow = allocation.money < 10 || allocation.commodity > 80;

  const getRadius = (val) => 35 + (val / 100) * 55;

  return (
    <Section
      className="three-forms-section"
      id="three-forms"
      bgColor="transparent"
    >
      <Atmosphere variant="theory" isCrisis={isCrisis} />
      <SectionHeader
        eyebrow="Cơ sở lý luận"
        title="Ba Hình thái Tư bản"
        subtitle="Điều chỉnh sự phân bổ vốn của Alpha Corp. Tư bản phải đồng thời tồn tại ở cả 3 hình thái để đảm bảo điều kiện không gian."
      />

      <div className="forms-workspace">
        {/* Connected Balance Visual */}
        <div className="forms-balance-visual">
          <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
            {/* Triangular connecting lines */}
            <motion.line
              x1="200"
              y1="120"
              x2="120"
              y2="280"
              stroke="var(--border-strong)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <motion.line
              x1="200"
              y1="120"
              x2="280"
              y2="280"
              stroke="var(--border-strong)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <motion.line
              x1="120"
              y1="280"
              x2="280"
              y2="280"
              stroke="var(--border-strong)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Money Node */}
            <motion.circle
              cx="200"
              cy="120"
              r={getRadius(allocation.money)}
              fill="var(--teal-500)"
              opacity={allocation.money < 10 ? 0.4 : 0.9}
              initial={{ r: getRadius(allocation.money) }}
              animate={{ r: getRadius(allocation.money) }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            <text
              x="200"
              y="120"
              textAnchor="middle"
              fill="#fff"
              dominantBaseline="middle"
              style={{
                font: "700 14px var(--font-body)",
                pointerEvents: "none",
              }}
            >
              Tiền tệ
            </text>
            <text
              x="200"
              y="138"
              textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              dominantBaseline="middle"
              style={{
                font: "600 11px var(--font-mono)",
                pointerEvents: "none",
              }}
            >
              {allocation.money}%
            </text>

            {/* Production Node */}
            <motion.circle
              cx="120"
              cy="280"
              r={getRadius(allocation.production)}
              fill="var(--navy-600)"
              opacity={0.9}
              initial={{ r: getRadius(allocation.production) }}
              animate={{ r: getRadius(allocation.production) }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            <text
              x="120"
              y="280"
              textAnchor="middle"
              fill="#fff"
              dominantBaseline="middle"
              style={{
                font: "700 14px var(--font-body)",
                pointerEvents: "none",
              }}
            >
              Sản xuất
            </text>
            <text
              x="120"
              y="298"
              textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              dominantBaseline="middle"
              style={{
                font: "600 11px var(--font-mono)",
                pointerEvents: "none",
              }}
            >
              {allocation.production}%
            </text>

            {/* Commodity Node */}
            <motion.circle
              cx="280"
              cy="280"
              r={getRadius(allocation.commodity)}
              fill="var(--gold-500)"
              opacity={0.9}
              initial={{ r: getRadius(allocation.commodity) }}
              animate={{ r: getRadius(allocation.commodity) }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            <text
              x="280"
              y="280"
              textAnchor="middle"
              fill="#fff"
              dominantBaseline="middle"
              style={{
                font: "700 14px var(--font-body)",
                pointerEvents: "none",
              }}
            >
              Hàng hóa
            </text>
            <text
              x="280"
              y="298"
              textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              dominantBaseline="middle"
              style={{
                font: "600 11px var(--font-mono)",
                pointerEvents: "none",
              }}
            >
              {allocation.commodity}%
            </text>
          </svg>
        </div>

        {/* Interactive Allocator */}
        <div className="forms-allocator">
          <h3 className="allocator-title">Mô phỏng Phân bổ Vốn</h3>

          <div className="allocation-sliders">
            <div className="slider-group">
              <div className="slider-header">
                <span>Tư bản Tiền tệ (Thanh khoản)</span>
                <strong>{allocation.money}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocation.money}
                onChange={(e) => handleDrag("money", parseInt(e.target.value))}
                disabled={isCrisis}
                className={`custom-range slider-teal ${isCrisis ? "disabled" : ""}`}
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span>Tư bản Sản xuất</span>
                <strong>{allocation.production}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocation.production}
                onChange={(e) =>
                  handleDrag("production", parseInt(e.target.value))
                }
                disabled={isCrisis}
                className={`custom-range slider-navy ${isCrisis ? "disabled" : ""}`}
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span>Tư bản Hàng hóa (Tồn kho)</span>
                <strong>{allocation.commodity}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocation.commodity}
                onChange={(e) =>
                  handleDrag("commodity", parseInt(e.target.value))
                }
                disabled={isCrisis}
                className={`custom-range slider-gold ${isCrisis ? "disabled" : ""}`}
              />
            </div>
          </div>

          <div className="visual-allocation-bar">
            <motion.div
              className="alloc-segment bg-teal"
              animate={{ width: `${allocation.money}%` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="alloc-segment bg-navy"
              animate={{ width: `${allocation.production}%` }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="alloc-segment bg-gold"
              animate={{ width: `${allocation.commodity}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div
            className={`allocation-feedback ${isLiquidityLow ? "danger" : "safe"}`}
          >
            {isLiquidityLow ? (
              <>
                <AlertTriangle size={20} className="mr-2 shrink-0" />
                <div>
                  <strong>Cảnh báo thanh khoản!</strong>
                  <p>
                    Quá nhiều vốn bị "chôn" trong hàng hóa hoặc sản xuất. Doanh
                    nghiệp không còn tiền mặt để trả lãi vay và bắt đầu chu kỳ
                    mới.
                  </p>
                </div>
              </>
            ) : (
              <>
                <TrendingDown
                  size={20}
                  className="mr-2 shrink-0"
                  style={{ transform: "rotate(180deg)" }}
                />
                <div>
                  <strong>Phân bổ hợp lý</strong>
                  <p>
                    Đảm bảo được điều kiện về Không gian: Có đủ tiền mặt dự
                    phòng trong khi vẫn duy trì sản xuất và có hàng hóa chờ bán.
                  </p>
                </div>
              </>
            )}
          </div>

          {isCrisis && (
            <div className="crisis-lock-overlay">
              <p>
                Thị trường đóng băng đã khóa chặt phân bổ vốn của Alpha Corp.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ThreeFormsSection;
