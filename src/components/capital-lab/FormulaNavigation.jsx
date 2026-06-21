import { ArrowRight, X, Lock } from 'lucide-react';
import { labMissions, capitalNodes } from '../../data/capitalLabData';
import './FormulaNavigation.css';

export const FormulaNavigation = ({ activeMission, state, onNodeClick }) => {
  const currentIndex = labMissions.findIndex(m => m.id === activeMission);
  const currentMission = labMissions[currentIndex];

  const formulaNodes = capitalNodes.map(node => {
    const isVisible = currentMission?.visibleNodes?.includes(node.id) || false;
    const isFocus = currentMission?.focusNode === node.id;
    const isPast = isVisible && !isFocus;
    const isLocked = state === 'crisis' && node.id === 'TP';

    return { ...node, isVisible, isFocus, isPast, isLocked };
  });

  const getNodeStatus = (node) => {
    if (node.isLocked) return 'locked';
    if (node.isFocus) return 'focus';
    if (node.isPast) return 'past';
    return 'upcoming';
  };

  const getConnectorStatus = (currentNode, nextNode) => {
    if (state === 'crisis' && currentNode.id === 'HP') return 'crisis';
    if (nextNode.isFocus || nextNode.isPast) return 'active';
    return 'upcoming';
  };

  return (
    <nav className="formula-nav" aria-label="Công thức tuần hoàn tư bản">
      <div className="formula-track">
        {formulaNodes.map((node, index) => {
          const status = getNodeStatus(node);
          const missionForNode = labMissions.find(m => m.focusNode === node.id);

          return (
            <div key={node.id} className="formula-step">
              {/* Node circle */}
              <button
                className={`fn-node fn-node--${status}`}
                onClick={() => {
                  if (missionForNode && node.isVisible) {
                    onNodeClick(missionForNode.id);
                  }
                }}
                disabled={!node.isVisible}
                aria-label={`${node.key} — ${node.shortTitle}`}
                aria-current={node.isFocus ? 'step' : undefined}
                title={node.shortTitle}
              >
                {node.isLocked ? (
                  <Lock size={14} aria-hidden="true" />
                ) : (
                  <span className="fn-symbol">{node.key}</span>
                )}
              </button>

              {/* Label for focused node */}
              {node.isFocus && (
                <span className="fn-label" style={{ color: node.color }}>
                  {node.shortTitle}
                </span>
              )}

              {/* Arrow connector */}
              {index < formulaNodes.length - 1 && (
                <span className={`fn-connector fn-connector--${getConnectorStatus(node, formulaNodes[index + 1])}`}>
                  {state === 'crisis' && node.id === 'HP' ? (
                    <X size={14} className="fn-crisis-x" aria-label="Đứt gãy" />
                  ) : (
                    <ArrowRight size={14} aria-hidden="true" />
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
