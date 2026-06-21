import { useState, useCallback } from 'react';
import { labState, labMissions } from '../data/capitalLabData';

export const useCapitalLabState = () => {
  const [state, setState] = useState(labState.NORMAL);
  const [activeMission, setActiveMission] = useState('source');
  const [selectedNode, setSelectedNode] = useState(null);
  const [mode, setMode] = useState('guided');
  const [missionStarted, setMissionStarted] = useState(false);
  const [crisisStep, setCrisisStep] = useState(0);

  const [recoveryValues, setRecoveryValues] = useState({
    cashReserve: 15,
    capitalInCommodity: 70,
    marketAbsorption: 30
  });

  // Aliases for backward compatibility
  const activeChapter = activeMission;
  const setActiveChapter = setActiveMission;
  const hasSeenOnboarding = missionStarted;
  const setHasSeenOnboarding = setMissionStarted;

  const nextChapter = useCallback(() => {
    const currentIndex = labMissions.findIndex(c => c.id === activeMission);
    if (currentIndex < labMissions.length - 1) {
      setActiveMission(labMissions[currentIndex + 1].id);
    }
  }, [activeMission]);

  const prevChapter = useCallback(() => {
    const currentIndex = labMissions.findIndex(c => c.id === activeMission);
    if (currentIndex > 0) {
      setActiveMission(labMissions[currentIndex - 1].id);
    }
  }, [activeMission]);

  const triggerCrisis = useCallback(() => {
    if (state !== labState.NORMAL) return;
    
    setCrisisStep(0);
    setState(labState.WARNING);
    
    setTimeout(() => {
      setState(current => current === labState.WARNING ? labState.CRISIS : current);
    }, 1500);
  }, [state]);

  const resetState = useCallback(() => {
    setState(labState.NORMAL);
    setActiveMission('source');
    setMode('guided');
    setMissionStarted(false);
    setCrisisStep(0);
    setRecoveryValues({
      cashReserve: 15,
      capitalInCommodity: 70,
      marketAbsorption: 30
    });
  }, []);

  const updateRecoveryValue = useCallback((key, value) => {
    setRecoveryValues(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const checkRecoveryCondition = useCallback(() => {
    const { cashReserve, capitalInCommodity, marketAbsorption } = recoveryValues;
    
    const isCashOptimal = cashReserve >= 20 && cashReserve <= 35;
    const isCommodityOptimal = capitalInCommodity >= 30 && capitalInCommodity <= 50;
    const isAbsorptionOptimal = marketAbsorption >= 60 && marketAbsorption <= 85;

    if (isCashOptimal && isCommodityOptimal && isAbsorptionOptimal) {
      setCrisisStep(0);
      setState(labState.RECOVERY);
      return true;
    } else if (state === labState.RECOVERY) {
      setCrisisStep(0);
      setState(labState.CRISIS);
    }
    return false;
  }, [recoveryValues, state]);

  return {
    state,
    activeMission,
    activeChapter,
    selectedNode,
    recoveryValues,
    mode,
    missionStarted,
    hasSeenOnboarding,
    crisisStep,
    triggerCrisis,
    resetState,
    setActiveMission,
    setActiveChapter,
    setSelectedNode,
    updateRecoveryValue,
    checkRecoveryCondition,
    nextChapter,
    prevChapter,
    setMode,
    setMissionStarted,
    setHasSeenOnboarding,
    setCrisisStep
  };
};
