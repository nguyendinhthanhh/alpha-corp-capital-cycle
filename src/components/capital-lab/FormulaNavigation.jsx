import { ArrowRight, X } from 'lucide-react';
import { labChapters, capitalNodes } from '../../data/capitalLabData';
import './FormulaNavigation.css';

export const FormulaNavigation = ({ activeChapter, state, onNodeClick }) => {
  const currentChapterIndex = labChapters.findIndex(c => c.id === activeChapter);
  
  // The formula order: T -> H -> SX -> H' -> T'
  const formulaNodes = capitalNodes.map(node => {
    // Determine active status based on the current chapter's visible nodes
    // Actually, let's determine status by comparing chapter progress
    const chapter = labChapters[currentChapterIndex];
    const isVisible = chapter?.visibleNodes?.includes(node.id) || false;
    const isFocus = chapter?.focusNode === node.id;
    
    // Check if we are past the point where this node is introduced
    // T is intro, H is inputs, SX is production, H' is commodity, T' is return
    const isPast = isVisible && !isFocus;

    return {
      ...node,
      isVisible,
      isFocus,
      isPast
    };
  });

  return (
    <div className="formula-navigation">
      <div className="formula-track">
        {formulaNodes.map((node, index) => {
          const isLocked = state === 'crisis' && node.id === 'TP';

          return (
            <div key={node.id} className="formula-step-wrapper">
              <div 
                className={`formula-node ${node.isFocus ? 'active' : ''} ${node.isPast ? 'past' : ''} ${!node.isVisible ? 'hidden' : ''} ${isLocked ? 'locked' : ''}`}
                onClick={() => node.isVisible && onNodeClick(node.id)}
              >
                <div className="formula-symbol" style={{ borderColor: isLocked ? '#ff6e5c' : node.color }}>
                  {node.key}
                </div>
                {node.isFocus && (
                  <div className="formula-label" style={{ color: node.color }}>
                    {node.shortTitle}
                  </div>
                )}
              </div>
              
              {index < formulaNodes.length - 1 && (
                <div className={`formula-connector ${formulaNodes[index + 1].isVisible ? 'active' : ''}`}>
                  {state === 'crisis' && node.id === 'HP' ? (
                    <X size={16} className="crisis-x" />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
