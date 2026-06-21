import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import {
  PENDING_HOME_SECTION_STORAGE_KEY,
  scrollToPageTop,
  scrollToSectionById,
} from '../utils/motion';
import { useAI } from '../ai/useAI';
import { buildAIContext } from '../ai/buildAIContext';
const LandingPage = () => {
  const [isCrisis, setIsCrisis] = useState(false);
  const { setPageContext } = useAI();
  const location = useLocation();

  const sectionMap = useMemo(
    () => ({
      hero: {
        sectionId: 'hero',
        sectionTitle: 'Hero',
        relevantConceptIds: ['money-capital'],
      },
      crisis: {
        sectionId: 'crisis',
        sectionTitle: 'Nguyen nhan dong bang thi truong',
        relevantConceptIds: ['market', 'circulation-time', 'liquidity'],
      },
      'capital-journey': {
        sectionId: 'capital-journey',
        sectionTitle: 'Hanh trinh von',
        relevantConceptIds: ['capital-circuit', 'capital-turnover'],
      },
      'three-forms': {
        sectionId: 'three-forms',
        sectionTitle: 'Ba hinh thai tu ban',
        relevantConceptIds: ['money-capital', 'productive-capital', 'commodity-capital'],
      },
      conditions: {
        sectionId: 'conditions',
        sectionTitle: 'Khong gian va thoi gian',
        relevantConceptIds: ['spatial-condition', 'temporal-condition'],
      },
      turnover: {
        sectionId: 'turnover',
        sectionTitle: 'Thoi gian chu chuyen',
        relevantConceptIds: ['production-time', 'circulation-time', 'capital-turnover'],
      },
      impact: {
        sectionId: 'impact',
        sectionTitle: 'Hieu ung day chuyen',
        relevantConceptIds: ['stakeholder', 'liquidity', 'market'],
      },
      accumulation: {
        sectionId: 'accumulation',
        sectionTitle: 'Tai san xuat va tich luy',
        relevantConceptIds: ['accumulation', 'reproduction', 'surplus-value'],
      },
      profit: {
        sectionId: 'profit',
        sectionTitle: 'Loi nhuan va loi tuc',
        relevantConceptIds: ['profit', 'interest', 'surplus-value'],
      },
      faq: {
        sectionId: 'faq',
        sectionTitle: 'Cau hoi phan bien',
        relevantConceptIds: ['capital-circuit', 'liquidity', 'market'],
      },
    }),
    [],
  );

  useEffect(() => {
    const pendingTarget =
      typeof window !== 'undefined'
        ? window.sessionStorage.getItem(PENDING_HOME_SECTION_STORAGE_KEY)
        : null;
    const hashTarget = location.hash.replace('#', '');
    const targetId = pendingTarget || hashTarget;

    if (targetId) {
      let frame = 0;
      const timers = [];
      let attempts = 0;

      const tryScroll = () => {
        attempts += 1;
        const element =
          targetId === 'hero' ? document.getElementById('hero') : document.getElementById(targetId);

        if (!element) {
          if (attempts < 8) {
            frame = window.requestAnimationFrame(tryScroll);
          }
          return;
        }

        if (targetId === 'hero') {
          scrollToPageTop();
        } else {
          scrollToSectionById(targetId);
        }

        [160, 420, 760, 1200].forEach((delay) => {
          timers.push(
            window.setTimeout(() => {
              if (targetId === 'hero') {
                scrollToPageTop();
              } else {
                scrollToSectionById(targetId);
              }
            }, delay),
          );
        });

        if (pendingTarget === targetId) {
          window.sessionStorage.removeItem(PENDING_HOME_SECTION_STORAGE_KEY);
        }
      };

      frame = window.requestAnimationFrame(tryScroll);

      return () => {
        window.cancelAnimationFrame(frame);
        timers.forEach((timer) => window.clearTimeout(timer));
      };
    }

    return undefined;
  }, [location.hash]);

  useEffect(() => {
    const ids = Object.keys(sectionMap);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible?.target?.id) {
          return;
        }

        const sectionContext = sectionMap[visible.target.id];
        if (!sectionContext) {
          return;
        }

        setPageContext(
          buildAIContext({
            route: '/',
            appState: {
              pageName: 'Tong quan',
              economicState: isCrisis ? 'crisis' : 'normal',
              relevantConceptIds: ['capital-circuit', 'money-capital'],
              sourceLabels: ['Case Alpha Corp'],
            },
            selectedContent: sectionContext,
          }),
        );
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] },
    );

    const observed = ids.map((id) => document.getElementById(id)).filter(Boolean);
    observed.forEach((element) => observer.observe(element));

    const currentHash = location.hash.replace('#', '');
    const initialSection = sectionMap[currentHash] || sectionMap.hero;
    setPageContext(
      buildAIContext({
        route: '/',
        appState: {
          pageName: 'Tong quan',
          economicState: isCrisis ? 'crisis' : 'normal',
          relevantConceptIds: ['capital-circuit', 'money-capital'],
          sourceLabels: ['Case Alpha Corp'],
        },
        selectedContent: initialSection,
      }),
    );

    return () => observer.disconnect();
  }, [isCrisis, location.hash, sectionMap, setPageContext]);

  useEffect(() => {
    setPageContext(
      buildAIContext({
        route: '/',
        appState: {
          pageName: 'Tong quan',
          economicState: isCrisis ? 'crisis' : 'normal',
          relevantConceptIds: ['capital-circuit', 'money-capital'],
          sourceLabels: ['Case Alpha Corp'],
        },
        selectedContent: sectionMap[location.hash.replace('#', '')] || sectionMap.hero,
      }),
    );
  }, [isCrisis, location.hash, sectionMap, setPageContext]);

  return (
    <div className="landing-page">
      <HeroSection isCrisis={isCrisis} onToggleCrisis={() => setIsCrisis((current) => !current)} />
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
