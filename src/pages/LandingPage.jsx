import { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import CaseTimelineSection from '../components/home/CaseTimelineSection';
import CapitalJourneySection from '../components/home/CapitalJourneySection';
import CrisisSection from '../components/home/CrisisSection';
import CascadeSection from '../components/home/CascadeSection';
import TheorySection from '../components/home/TheorySection';
import SimulatorPreviewSection from '../components/home/SimulatorPreviewSection';
import QuickQuizSection from '../components/home/QuickQuizSection';

const LandingPage = () => {
  const [crisisActive, setCrisisActive] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  return (
    <div className="home-page">
      <section className="hero-shell">
        <div className="container">
          <HeroSection
            crisisActive={crisisActive}
            onToggleCrisis={() => setCrisisActive((value) => !value)}
          />
        </div>
      </section>

      <div className="container">
        <CaseTimelineSection />
      </div>

      <div className="light-wrap">
        <div className="container">
          <CapitalJourneySection />
        </div>
      </div>

      <div className="container">
        <CrisisSection
          crisisActive={crisisActive}
          onToggleCrisis={() => setCrisisActive((value) => !value)}
        />
        <CascadeSection />
      </div>

      <div className="light-wrap">
        <div className="container">
          <TheorySection />
        </div>
      </div>

      <div className="container">
        <SimulatorPreviewSection />
      </div>

      <div className="light-wrap">
        <div className="container">
          <QuickQuizSection />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
