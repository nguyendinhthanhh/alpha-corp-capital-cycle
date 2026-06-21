import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCapitalLabState } from '../hooks/useCapitalLabState';
import { useWebGLSupport } from '../hooks/useWebGLSupport';
import { CapitalLabCanvas } from '../components/capital-lab/CapitalLabCanvas';
import { GuidedPanel } from '../components/capital-lab/GuidedPanel';
import { FormulaNavigation } from '../components/capital-lab/FormulaNavigation';
import { LabNavigation } from '../components/capital-lab/LabNavigation';
import { NodeDetailPanel } from '../components/capital-lab/NodeDetailPanel';
import { RecoveryChallenge } from '../components/capital-lab/RecoveryChallenge';
import { WebGLFallback } from '../components/capital-lab/WebGLFallback';
import { OnboardingOverlay } from '../components/capital-lab/OnboardingOverlay';
import { CrisisSequence } from '../components/capital-lab/CrisisSequence';
import PageLoader from '../components/shared/PageLoader';
import {
  capitalNodes,
  capitalFlowPath,
  stakeholders,
  labChapters,
  recoveryControls
} from '../data/capitalLabData';
import './CapitalLabPage.css';

const CapitalLabPage = () => {
  const { isSupported, isChecking } = useWebGLSupport();
  const [show2D, setShow2D] = useState(false);
  
  const {
    state,
    activeChapter,
    selectedNode,
    recoveryValues,
    mode,
    hasSeenOnboarding,
    crisisStep,
    triggerCrisis,
    resetState,
    setActiveChapter,
    setSelectedNode,
    updateRecoveryValue,
    checkRecoveryCondition,
    nextChapter,
    prevChapter,
    setMode,
    setHasSeenOnboarding,
    setCrisisStep
  } = useCapitalLabState();

  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const scrollTimeoutRef = useRef(null);
  const wheelDeltaRef = useRef(0);

  useEffect(() => {
    if (state === 'crisis' && activeChapter !== 'recovery') {
      checkRecoveryCondition();
    }
  }, [recoveryValues, state, activeChapter, checkRecoveryCondition]);

  useEffect(() => {
    // Wheel event for Guided Mode chapter progression
    const handleWheel = (e) => {
      if (mode !== 'guided' || !hasSeenOnboarding || selectedNode || selectedStakeholder) return;

      if (scrollTimeoutRef.current) return;

      wheelDeltaRef.current += e.deltaY;

      // Threshold for switching chapter (higher for trackpads)
      if (wheelDeltaRef.current > 120) {
        nextChapter();
        wheelDeltaRef.current = 0;
        scrollTimeoutRef.current = setTimeout(() => { scrollTimeoutRef.current = null; }, 800);
      } else if (wheelDeltaRef.current < -120) {
        prevChapter();
        wheelDeltaRef.current = 0;
        scrollTimeoutRef.current = setTimeout(() => { scrollTimeoutRef.current = null; }, 800);
      }
      
      // Decay wheel delta over time if it doesn't cross threshold
      setTimeout(() => { wheelDeltaRef.current = 0; }, 500);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [mode, hasSeenOnboarding, selectedNode, selectedStakeholder, nextChapter, prevChapter]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setSelectedStakeholder(null);
  };

  const handleStakeholderClick = (stakeholder) => {
    setSelectedStakeholder(stakeholder);
    setSelectedNode(null);
  };

  const handleClosePanel = () => {
    setSelectedNode(null);
    setSelectedStakeholder(null);
  };

  if (isChecking) {
    return <PageLoader />;
  }

  // 2D fallback or explicit 2D mode
  if (!isSupported || show2D) {
    return <WebGLFallback onToggle3D={() => setShow2D(false)} isSupported={isSupported} />;
  }

  return (
    <div className="capital-lab-page">
      {!hasSeenOnboarding && (
        <OnboardingOverlay onStart={() => setHasSeenOnboarding(true)} />
      )}

      {/* 3D Canvas */}
      <div className="lab-canvas-container">
        <CapitalLabCanvas
          nodes={capitalNodes}
          paths={capitalFlowPath}
          stakeholders={stakeholders}
          state={state}
          selectedNode={selectedNode}
          onNodeClick={handleNodeClick}
          onStakeholderClick={handleStakeholderClick}
          activeChapter={activeChapter}
          mode={mode}
        />
      </div>

      <AnimatePresence>
        {hasSeenOnboarding && (
          <>
            <FormulaNavigation 
              activeChapter={activeChapter} 
              state={state} 
              onNodeClick={(id) => setActiveChapter(labChapters.find(c => c.focusNode === id)?.id || activeChapter)}
            />

            <GuidedPanel 
              activeChapter={activeChapter} 
              prevChapter={prevChapter}
              nextChapter={nextChapter}
              mode={mode}
            />

            <LabNavigation
              mode={mode}
              setMode={setMode}
              state={state}
              activeChapter={activeChapter}
              onTriggerCrisis={triggerCrisis}
              onReset={resetState}
              onToggle2D={() => setShow2D(true)}
            />
            
            <CrisisSequence 
              state={state} 
              crisisStep={crisisStep} 
              setCrisisStep={setCrisisStep} 
            />
          </>
        )}
      </AnimatePresence>

      {/* Node Detail Panel */}
      <AnimatePresence>
        {(selectedNode || selectedStakeholder) && (
          <NodeDetailPanel
            node={selectedNode}
            stakeholder={selectedStakeholder}
            onClose={handleClosePanel}
          />
        )}
      </AnimatePresence>

      {/* Recovery Challenge */}
      <AnimatePresence>
        {activeChapter === 'recovery' && state === 'crisis' && (
          <RecoveryChallenge
            controls={recoveryControls}
            values={recoveryValues}
            onValueChange={updateRecoveryValue}
            state={state}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CapitalLabPage;
