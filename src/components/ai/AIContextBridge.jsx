import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildAIContext } from '../../ai/buildAIContext';
import { useAI } from '../../ai/useAI';

const homeSections = {
  '#hero': {
    sectionId: 'hero',
    sectionTitle: 'Hero',
    relevantConceptIds: ['money-capital'],
  },
  '#crisis': {
    sectionId: 'crisis',
    sectionTitle: 'Nguyen nhan dong bang thi truong',
    relevantConceptIds: ['market', 'circulation-time', 'liquidity'],
  },
  '#capital-journey': {
    sectionId: 'capital-journey',
    sectionTitle: 'Hanh trinh von',
    relevantConceptIds: ['capital-circuit', 'capital-turnover'],
  },
  '#three-forms': {
    sectionId: 'three-forms',
    sectionTitle: 'Ba hinh thai tu ban',
    relevantConceptIds: ['money-capital', 'productive-capital', 'commodity-capital'],
  },
  '#conditions': {
    sectionId: 'conditions',
    sectionTitle: 'Khong gian va thoi gian',
    relevantConceptIds: ['spatial-condition', 'temporal-condition'],
  },
  '#turnover': {
    sectionId: 'turnover',
    sectionTitle: 'Thoi gian chu chuyen',
    relevantConceptIds: ['production-time', 'circulation-time', 'capital-turnover'],
  },
  '#impact': {
    sectionId: 'impact',
    sectionTitle: 'Hieu ung day chuyen',
    relevantConceptIds: ['stakeholder', 'liquidity', 'market'],
  },
  '#accumulation': {
    sectionId: 'accumulation',
    sectionTitle: 'Tai san xuat va tich luy',
    relevantConceptIds: ['accumulation', 'reproduction', 'surplus-value'],
  },
  '#profit': {
    sectionId: 'profit',
    sectionTitle: 'Loi nhuan va loi tuc',
    relevantConceptIds: ['profit', 'interest', 'surplus-value'],
  },
  '#faq': {
    sectionId: 'faq',
    sectionTitle: 'Cau hoi phan bien',
    relevantConceptIds: ['capital-circuit', 'liquidity', 'market'],
  },
};

const routeContext = {
  '/': {
    pageName: 'Tong quan',
    sourceLabels: ['Case Alpha Corp'],
    relevantConceptIds: ['capital-circuit', 'money-capital', 'market'],
  },
  '/story': {
    pageName: 'Hanh trinh von',
    sourceLabels: ['caseData.storyChapters'],
    relevantConceptIds: ['capital-circuit', 'capital-turnover', 'surplus-value'],
  },
  '/capital-lab': {
    pageName: 'Capital Lab',
    sourceLabels: ['Capital Lab'],
    relevantConceptIds: ['capital-circuit', 'liquidity', 'capital-turnover'],
    capitalLab: {
      chapterId: 'source',
      chapterTitle: 'Nguon von ban dau',
      mode: 'guided',
    },
  },
  '/simulators': {
    pageName: 'Mo phong',
    sourceLabels: ['Simulation'],
    relevantConceptIds: ['spatial-condition', 'temporal-condition', 'liquidity'],
    simulation: {
      scenario: 'Trang thai hien tai',
    },
  },
  '/quiz': {
    pageName: 'Kiem tra',
    sourceLabels: ['Quiz'],
    relevantConceptIds: ['capital-circuit', 'surplus-value', 'liquidity'],
    quiz: {},
  },
  '/appendix': {
    pageName: 'Nguon & AI',
    sourceLabels: ['AI Capital Tutor'],
    relevantConceptIds: ['capital-circuit', 'liquidity', 'profit'],
  },
  '/learn': {
    pageName: 'Khong gian hoc tap kinh te',
    sourceLabels: ['Case Alpha Corp', 'docs/02-ACADEMIC-SOURCE-OF-TRUTH.md'],
    relevantConceptIds: ['capital-circuit', 'liquidity', 'capital-turnover'],
  },
  '/learn/quiz': {
    pageName: 'Adaptive Quiz Arena',
    sourceLabels: ['Quiz', 'Case Alpha Corp'],
    relevantConceptIds: ['capital-circuit', 'liquidity', 'surplus-value'],
    quiz: {},
  },
  '/learn/daily': {
    pageName: 'Daily Economic Challenge',
    sourceLabels: ['Quiz', 'Case Alpha Corp'],
    relevantConceptIds: ['market', 'liquidity', 'capital-turnover'],
  },
  '/learn/review': {
    pageName: 'Mistake Review',
    sourceLabels: ['Quiz', 'Case Alpha Corp'],
    relevantConceptIds: ['liquidity', 'commodity-capital', 'temporal-condition'],
  },
  '/learn/progress': {
    pageName: 'Knowledge Map',
    sourceLabels: ['Quiz', 'Case Alpha Corp'],
    relevantConceptIds: ['capital-circuit', 'profit', 'interest'],
  },
  '/learn/debate': {
    pageName: 'Phong luyen phan bien',
    sourceLabels: ['Case Alpha Corp'],
    relevantConceptIds: ['liquidity', 'market', 'profit'],
  },
  '/learn/case-mission': {
    pageName: 'Nhiem vu: Khoi phuc vong tuan hoan',
    sourceLabels: ['Capital Lab', 'Case Alpha Corp'],
    relevantConceptIds: ['liquidity', 'spatial-condition', 'temporal-condition'],
  },
};

function resolveRouteContext(pathname) {
  if (routeContext[pathname]) {
    return routeContext[pathname];
  }

  if (pathname.startsWith('/learn')) {
    return routeContext['/learn'];
  }

  return routeContext['/'];
}

export function AIContextBridge() {
  const location = useLocation();
  const { setPageContext } = useAI();

  useEffect(() => {
    const baseContext = resolveRouteContext(location.pathname);
    const homeContext = location.pathname === '/' ? homeSections[location.hash] || homeSections['#hero'] : {};

    setPageContext(
      buildAIContext({
        route: location.pathname,
        appState: {
          ...baseContext,
          route: location.pathname,
          pageName: baseContext.pageName,
        },
        selectedContent: homeContext,
      }),
    );
  }, [location.hash, location.pathname, setPageContext]);

  return null;
}
