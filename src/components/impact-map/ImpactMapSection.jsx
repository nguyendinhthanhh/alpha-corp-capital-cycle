import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { stakeholders } from '../../data/stakeholderImpacts';
import Section from '../shared/Section';
import Atmosphere from '../shared/Atmosphere';
import SectionHeader from '../shared/SectionHeader';
import './ImpactMapSection.css';

const networkNodes = [
  { id: 'gov', angle: 248 },
  { id: 'alpha', angle: 308 },
  { id: 'bank', angle: 0 },
  { id: 'worker', angle: 32 },
  { id: 'supplier', angle: 132 },
  { id: 'buyer', angle: 188 },
];

const ImpactMapSection = ({ isCrisis }) => {
  const [activeActorId, setActiveActorId] = useState(stakeholders[0].id);
  const [dominoIndex, setDominoIndex] = useState(-1);
  const [mapBox, setMapBox] = useState({ width: 0, height: 0 });
  const mapVisualRef = useRef(null);

  const activeActor = stakeholders.find((item) => item.id === activeActorId) || stakeholders[0];

  useLayoutEffect(() => {
    const visualEl = mapVisualRef.current;

    if (!visualEl) {
      return undefined;
    }

    let frame = 0;
    let resizeObserver = null;

    const measure = () => {
      const rect = visualEl.getBoundingClientRect();
      setMapBox((prev) => {
        const next = {
          width: rect.width,
          height: rect.height,
        };

        if (prev.width === next.width && prev.height === next.height) {
          return prev;
        }

        return next;
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleMeasure);
      resizeObserver.observe(visualEl);
    } else {
      window.addEventListener('resize', scheduleMeasure);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, []);

  useEffect(() => {
    if (isCrisis) {
      const timer = setTimeout(() => {
        setDominoIndex(0);
        setActiveActorId(stakeholders[0].id);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setDominoIndex(-1);
    }, 0);
    return () => clearTimeout(timer);
  }, [isCrisis]);

  useEffect(() => {
    if (!isCrisis) {
      return;
    }

    if (dominoIndex >= 0 && dominoIndex < stakeholders.length - 1) {
      const hopTimer = setTimeout(() => {
        setDominoIndex((prev) => prev + 1);
        setActiveActorId(stakeholders[dominoIndex + 1].id);
      }, 1500);

      return () => clearTimeout(hopTimer);
    }
  }, [isCrisis, dominoIndex]);

  const geometry = useMemo(() => {
    if (!mapBox.width || !mapBox.height) {
      return {
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
        edges: [],
        nodes: [],
      };
    }

    const centerX = mapBox.width / 2;
    const centerY = mapBox.height / 2;
    const radiusX = mapBox.width * 0.245;
    const radiusY = mapBox.height * 0.21;

    const nodes = networkNodes.map((node) => {
      const rad = (node.angle * Math.PI) / 180;
      const x = centerX + Math.cos(rad) * radiusX;
      const y = centerY + Math.sin(rad) * radiusY;
      const quadrantRight = Math.cos(rad) >= 0;
      const quadrantBelow = Math.sin(rad) >= 0;

      return {
        ...node,
        x,
        y,
        quadrantRight,
        quadrantBelow,
        labelX: quadrantRight ? '18px' : 'calc(-100% - 18px)',
        labelY: quadrantBelow ? '18px' : 'calc(-100% - 18px)',
      };
    });

    const edges = nodes.map((node) => ({
      id: node.id,
      x1: centerX,
      y1: centerY,
      x2: node.x,
      y2: node.y,
    }));

    return { width: mapBox.width, height: mapBox.height, centerX, centerY, nodes, edges };
  }, [mapBox.width, mapBox.height]);

  const activeIndex = stakeholders.findIndex((item) => item.id === activeActorId);

  return (
    <Section
      className="impact-map-section"
      id="impact"
      data-section="impact"
      bgColor="transparent"
      containerClass="impact-container"
      containerProps={{ 'data-impact-container': true }}
    >
      <Atmosphere variant="impact" isCrisis={isCrisis} />
      <SectionHeader
        className="impact-map-header"
        eyebrow="Hiệu ứng dây chuyền"
        title="Khủng hoảng lan truyền"
        subtitle="Một điểm gãy ở lưu thông (H' → T') không chỉ làm sụp đổ Alpha Corp, mà tạo hiệu ứng domino lên toàn bộ mạng lưới kinh tế."
      />

      <div className="impact-map-container" data-impact-layout>
        <div className="map-visual" ref={mapVisualRef} data-impact-map>
          {geometry.width > 0 && geometry.height > 0 && (
            <svg
              className="impact-map-edges"
              viewBox={`0 0 ${geometry.width} ${geometry.height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {geometry.edges.map((edge) => {
                const nodeIndex = stakeholders.findIndex((item) => item.id === edge.id);
                const isActive = edge.id === activeActorId;
                const isDominoHit = isCrisis && nodeIndex <= dominoIndex;
                const edgeState = isDominoHit ? 'danger active' : isActive ? 'active' : '';

                return (
                  <g key={edge.id}>
                    <line className="impact-edge-base" x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} />
                    <line
                      className={`impact-edge-active ${edgeState}`}
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          <div className={`map-center ${isCrisis ? 'pulsing-danger' : ''}`}>
            <div className="center-node">
              H&apos; &#x2715; T&apos;
              <span>Điểm đứt gãy</span>
            </div>
          </div>

          {geometry.nodes.map((node) => {
            const actor = stakeholders.find((item) => item.id === node.id);
            if (!actor) {
              return null;
            }

            const isActive = node.id === activeActorId;
            const isDominoHit = isCrisis && activeIndex >= 0 && stakeholders.findIndex((item) => item.id === node.id) <= dominoIndex;

            return (
              <div
                key={node.id}
                className="network-node"
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                }}
              >
                <span className={`network-node-anchor ${isActive ? 'active' : ''} ${isDominoHit ? 'danger' : ''}`} aria-hidden="true" />
                <button
                  type="button"
                  className={`network-node-label ${isActive ? 'active' : ''} ${isDominoHit ? 'danger' : ''}`}
                  style={{
                    '--label-x': node.labelX,
                    '--label-y': node.labelY,
                  }}
                  onClick={() => {
                    setActiveActorId(node.id);
                  }}
                >
                  {actor.name}
                </button>
              </div>
            );
          })}
        </div>

        <div className="map-details" data-impact-detail>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeActor.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.32 }}
              className={`impact-detail-card ${isCrisis ? 'crisis-mode' : ''}`}
            >
              <div className="card-header-flex">
                <h3>{activeActor.name}</h3>
                {isCrisis && <AlertCircle size={24} className="text-red" />}
              </div>

              <div className="impact-group">
                <span className="impact-label">Hậu quả trực tiếp</span>
                <p className="impact-content">
                  {isCrisis
                    ? activeActor.impact
                    : "Trong trạng thái bình thường, đối tượng này vẫn duy trì các hoạt động thu chi ổn định. Nhấp nút 'Kích hoạt Khủng hoảng' ở đầu trang để xem điều gì xảy ra."}
                </p>
              </div>

              <div className="lesson-box">
                <span className="lesson-label">Khuyết tật thị trường</span>
                <p>
                  Trong nền kinh tế thị trường, tuần hoàn tư bản của từng doanh nghiệp không độc lập mà đan xen vào
                  nhau thành tổng tuần hoàn tư bản xã hội. Sự sụp đổ của mắt xích Alpha Corp tất yếu dẫn đến khủng
                  hoảng lan truyền.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

export default ImpactMapSection;
