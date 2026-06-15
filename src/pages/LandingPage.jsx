import { useEffect } from 'react';
import HeroSection from '../components/hero/HeroSection';
import CapitalJourneySection from '../components/capital-flow/CapitalJourneySection';
import CrisisSection from '../components/crisis/CrisisSection';
import ImpactMapSection from '../components/impact-map/ImpactMapSection';
import ConditionSplitSection from '../components/theory/ConditionSplitSection';

const LandingPage = () => {
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
      <HeroSection />
      <CapitalJourneySection />
      <CrisisSection />
      <ImpactMapSection />
      <ConditionSplitSection />
    </div>
  );
};

export default LandingPage;
