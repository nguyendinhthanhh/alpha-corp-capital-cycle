import { useEffect, useState } from 'react';
import HeroSection from '../components/hero/HeroSection';
import MarketContextSection from '../components/market/MarketContextSection';
import CapitalJourneySection from '../components/capital-flow/CapitalJourneySection';
import ThreeFormsSection from '../components/theory/ThreeFormsSection';
import ConditionSplitSection from '../components/theory/ConditionSplitSection';
import TurnoverTimeSection from '../components/theory/TurnoverTimeSection';
import ImpactMapSection from '../components/impact-map/ImpactMapSection';
import AccumulationSection from '../components/theory/AccumulationSection';
import ProfitInterestSection from '../components/theory/ProfitInterestSection';
import CriticalQuestionsSection from '../components/theory/CriticalQuestionsSection';

const LandingPage = () => {
  const [isCrisis, setIsCrisis] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  return (
    <div className="landing-page">
      <HeroSection isCrisis={isCrisis} onToggleCrisis={() => setIsCrisis(!isCrisis)} />
      <MarketContextSection isCrisis={isCrisis} onSetCrisis={setIsCrisis} />
      <CapitalJourneySection isCrisis={isCrisis} />
      <ThreeFormsSection isCrisis={isCrisis} />
      <ConditionSplitSection isCrisis={isCrisis} />
      <TurnoverTimeSection isCrisis={isCrisis} />
      <ImpactMapSection isCrisis={isCrisis} />
      <AccumulationSection isCrisis={isCrisis} />
      <ProfitInterestSection />
      <CriticalQuestionsSection />
    </div>
  );
};

export default LandingPage;
