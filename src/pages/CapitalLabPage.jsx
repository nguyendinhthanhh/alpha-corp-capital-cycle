import { useEffect, useState, useRef, useCallback } from 'react';
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
import { useAI } from '../ai/useAI';
import { buildAIContext } from '../ai/buildAIContext';
import {
  capitalNodes,
  capitalFlowPath,
  stakeholders,
  labMissions,
  recoveryControls
} from '../data/capitalLabData';
import './CapitalLabPage.css';

const CapitalLabPage = () => {
  const { isSupported, isChecking } = useWebGLSupport();
  const [show2D, setShow2D] = useState(false);
  const { setPageContext } = useAI();
  
  const {
    state,
    activeMission,
    selectedNode,
    recoveryValues,
    mode,
    missionStarted,
    crisisStep,
    triggerCrisis,
    resetState,
    setActiveMission,
    setSelectedNode,
    updateRecoveryValue,
    checkRecoveryCondition,
    nextChapter,
    prevChapter,
    setMode,
    setMissionStarted,
    setCrisisStep
  } = useCapitalLabState();

  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const scrollTimeoutRef = useRef(null);
  const wheelDeltaRef = useRef(0);

  useEffect(() => {
    const activeMissionData = labMissions.find((item) => item.id === activeMission);
    const activeNodeData = selectedNode
      ? {
          id: selectedNode.id,
          title: selectedNode.title,
          detail: selectedNode.detail,
          shortTitle: selectedNode.shortTitle,
        }
      : null;

    setPageContext(
      buildAIContext({
        route: '/capital-lab',
        appState: {
          pageName: 'Capital Lab',
          activeStage: {
            id: activeMissionData?.symbol || activeMissionData?.id || 'capital-lab',
            index: labMissions.findIndex((item) => item.id === activeMission),
            formula: activeMissionData?.symbol || '',
            title: activeMissionData?.title || 'Capital Lab',
            capitalForm: activeMissionData?.formulaHighlight || '',
          },
          economicState: state,
          capitalLab: {
            chapterId: activeMissionData?.id,
            chapterIndex: labMissions.findIndex((item) => item.id === activeMission),
            chapterTitle: activeMissionData?.title,
            mode,
          },
          activeMission,
          selectedNode: activeNodeData,
          selectedStakeholder: selectedStakeholder
            ? {
                id: selectedStakeholder.id,
                name: selectedStakeholder.title,
              }
            : null,
          simulation: {
            scenario: state === 'crisis' ? 'capital-lab-crisis' : 'capital-lab-guided',
            allocations: {
              cashReserve: recoveryValues.cashReserve,
              capitalInCommodity: recoveryValues.capitalInCommodity,
              marketAbsorption: recoveryValues.marketAbsorption,
            },
            liquidityState: state === 'crisis' ? 'critical' : state === 'warning' ? 'warning' : 'stable',
            continuityState: missionStarted ? 'active' : 'idle',
            commodityConcentration: recoveryValues.capitalInCommodity,
            circulationState: state === 'crisis' ? 'stagnant' : 'normal',
          },
          sourceLabels: ['Capital Lab', 'Case Alpha Corp'],
          relevantConceptIds: ['capital-circuit', 'liquidity', 'capital-turnover'],
        },
      }),
    );
  }, [
    activeMission,
    crisisStep,
    missionStarted,
    mode,
    recoveryValues,
    selectedNode,
    selectedStakeholder,
    setPageContext,
    state,
  ]);

  useEffect(() => {
    if (state === 'crisis' && activeMission === 'recovery') {
      checkRecoveryCondition();
    }
  }, [recoveryValues, state, activeMission, checkRecoveryCondition]);

  // Wheel-based mission navigation (guided mode only)
  useEffect(() => {
    const handleWheel = (e) => {
      if (mode !== 'guided' || !missionStarted || selectedNode || selectedStakeholder) return;
      if (scrollTimeoutRef.current) return;

      wheelDeltaRef.current += e.deltaY;

      if (wheelDeltaRef.current > 120) {
        nextChapter();
        wheelDeltaRef.current = 0;
        scrollTimeoutRef.current = setTimeout(() => { scrollTimeoutRef.current = null; }, 800);
      } else if (wheelDeltaRef.current < -120) {
        prevChapter();
        wheelDeltaRef.current = 0;
        scrollTimeoutRef.current = setTimeout(() => { scrollTimeoutRef.current = null; }, 800);
      }

      // Decay
      setTimeout(() => { wheelDeltaRef.current = 0; }, 500);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [mode, missionStarted, selectedNode, selectedStakeholder, nextChapter, prevChapter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!missionStarted) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextChapter();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevChapter();
      } else if (e.key === 'Escape') {
        setSelectedNode(null);
        setSelectedStakeholder(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [missionStarted, nextChapter, prevChapter, setSelectedNode]);

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
    setSelectedStakeholder(null);
  }, [setSelectedNode]);

  const handleStakeholderClick = useCallback((stakeholder) => {
    setSelectedStakeholder(stakeholder);
    setSelectedNode(null);
  }, [setSelectedNode]);

  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
    setSelectedStakeholder(null);
  }, [setSelectedNode]);

  const handleStartMission = useCallback(() => {
    setMissionStarted(true);
    setActiveMission('source');
  }, [setMissionStarted, setActiveMission]);

  const handleFormulaClick = useCallback((nodeId) => {
    const mission = labMissions.find(m => m.focusNode === nodeId);
    if (mission) setActiveMission(mission.id);
  }, [setActiveMission]);

  if (isChecking) {
    return <PageLoader />;
  }

  if (!isSupported || show2D) {
    return <WebGLFallback onToggle3D={() => setShow2D(false)} isSupported={isSupported} />;
  }

  return (
    <div className={`capital-lab-page ${state === 'crisis' ? 'crisis-active' : ''} ${state === 'recovery' ? 'recovery-active' : ''}`}>
      {/* Hero / Onboarding */}
      <AnimatePresence>
        {!missionStarted && (
          <OnboardingOverlay onStart={handleStartMission} />
        )}
      </AnimatePresence>

      {/* 3D Canvas — always rendered behind everything */}
      <div className="lab-canvas-container">
        <CapitalLabCanvas
          nodes={capitalNodes}
          paths={capitalFlowPath}
          stakeholders={stakeholders}
          state={state}
          selectedNode={selectedNode}
          onNodeClick={handleNodeClick}
          onStakeholderClick={handleStakeholderClick}
          activeMission={activeMission}
          mode={mode}
        />
      </div>

      {/* UI Overlays — only after mission started */}
      <AnimatePresence>
        {missionStarted && (
          <>
            <FormulaNavigation 
              activeMission={activeMission} 
              state={state} 
              onNodeClick={handleFormulaClick}
            />

            <GuidedPanel 
              activeMission={activeMission} 
              prevChapter={prevChapter}
              nextChapter={nextChapter}
              mode={mode}
            />

            <LabNavigation
              mode={mode}
              setMode={setMode}
              state={state}
              activeMission={activeMission}
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
        {activeMission === 'recovery' && state === 'crisis' && (
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
