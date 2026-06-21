import { useState, useCallback } from 'react';
import { labState, labChapters } from '../data/capitalLabData';

export const useCapitalLabState = () => {
  const [state, setState] = useState(labState.NORMAL);
  const [activeChapter, setActiveChapter] = useState('hero');
  const [selectedNode, setSelectedNode] = useState(null);
  const [mode, setMode] = useState('guided'); // 'guided' | 'explore'
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [crisisStep, setCrisisStep] = useState(0);

  const [recoveryValues, setRecoveryValues] = useState({
    cashReserve: 15,
    capitalInCommodity: 70,
    marketAbsorption: 30
  });

  const nextChapter = useCallback(() => {
    const currentIndex = labChapters.findIndex(c => c.id === activeChapter);
    if (currentIndex < labChapters.length - 1) {
      setActiveChapter(labChapters[currentIndex + 1].id);
    }
  }, [activeChapter]);

  const prevChapter = useCallback(() => {
    const currentIndex = labChapters.findIndex(c => c.id === activeChapter);
    if (currentIndex > 0) {
      setActiveChapter(labChapters[currentIndex - 1].id);
    }
  }, [activeChapter]);

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
    setActiveChapter('intro');
    setMode('guided');
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
    
    // Điều kiện khôi phục:
    // - Dự phòng tiền tệ: 20-35%
    // - Vốn trong hàng hóa: 30-50%
    // - Khả năng tiêu thụ: 60-85%
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
  };
};
