import { getConceptById, slugify } from './knowledgeBase';
import { getContextualActions } from './contextualActions';
import { retrieveRelevantConcepts } from './retrieveRelevantConcepts';

const clampToWords = (text, maxWords = 220) => {
  const normalized = String(text || '').trim();
  if (!normalized) return '';

  const words = normalized.split(/\s+/);
  if (words.length <= maxWords) return normalized;
  return `${words.slice(0, maxWords).join(' ')}...`;
};

const refusalMessage = () => ({
  answer:
    'Mình chỉ hỗ trợ giải thích và phân tích theo khung MLN122 của dự án này. Mình không đưa ra tư vấn tài chính hoặc khuyến nghị đầu tư. Nếu muốn, hãy hỏi theo hướng "giải thích", "phân tích", hoặc "so sánh khái niệm".',
  sections: [
    {
      title: 'Phạm vi hỗ trợ',
      content: 'AI Capital Tutor chỉ giải thích khái niệm, tình huống Alpha Corp, quiz, mô phỏng và Capital Lab.',
    },
  ],
  relatedConcepts: [],
  sourceLabels: ['AI Capital Tutor'],
  suggestedActions: [],
  fallbackUsed: true,
});

const detectFinancialAdviceIntent = (text = '') =>
  /(dau tu|mua|ban|loi nhuan|nen chon|nen mua|nen ban|keo|chung khoan|crypto|lai suat bao nhieu)/i.test(text);

const buildConceptOverview = (concepts) =>
  concepts
    .map((concept) => {
      const status = concept.verification === 'needs_verification' ? 'NEEDS_VERIFICATION' : 'VERIFIED';
      return `- ${concept.name} (${status}): ${concept.definition}`;
    })
    .join('\n');

const explainQuiz = (context, concepts) => {
  const question = context.quiz?.question || context.currentQuestion?.question || 'Cau hoi quiz hien tai';
  const answerIndex = context.quiz?.answerIndex ?? context.currentQuestion?.answerIndex;
  const options = context.quiz?.options || context.currentQuestion?.options || [];
  const correctAnswer = options[answerIndex] || 'Dap an dung chua duoc truyen vao context.';
  const lesson = concepts[0]?.definition || context.quiz?.lesson || context.quiz?.concept || '';

  return {
    answer: clampToWords(
      `Cau hoi nay dang kiem tra ${lesson || 'khai niem lien quan'}.\n\nGoi y: hay doc lai tu khoa trong cau hoi va xac dinh no thuoc khau nao cua tuan hoan tu ban. Neu ban muon, minh co the giai thich luon vi sao dap an dung la: ${correctAnswer}.`,
      190,
    ),
    sections: [
      { title: 'Cau hoi', content: question },
      { title: 'Goi y', content: 'Bat dau tu khai niem, roi noi no voi tinh huong Alpha Corp.' },
      { title: 'Dap an dung', content: correctAnswer },
    ],
    relatedConcepts: concepts.map((concept) => ({ id: concept.id, label: concept.name })),
    sourceLabels: ['Quiz', ...(context.sourceLabels || [])],
    suggestedActions: getContextualActions(context),
    fallbackUsed: true,
  };
};

const analyzeSimulation = (context, concepts) => {
  const sim = context.simulation || {};
  const allocations = sim.allocations || {};
  const lines = [
    `Ti le phan bo hien tai: ${Object.entries(allocations)
      .map(([key, value]) => `${key} ${value}%`)
      .join(', ') || 'chua co du lieu'}.`,
    sim.scenario ? `Kich ban: ${sim.scenario}.` : '',
    sim.liquidityState ? `Thanh khoan: ${sim.liquidityState}.` : '',
  ].filter(Boolean);

  const primaryConcept = concepts[0] || getConceptById('circulation-time');
  const isRisky = (allocations.reserve || 0) < 15 || (allocations.labor || 0) < 15;
  const answer = isRisky
    ? 'Phan bo hien tai dang nghieng ve rui ro thanh khoan hoac thieu suc lao dong, nen chu ky de nghe o khau thuc hien gia tri.'
    : 'Phan bo hien tai co the duy tri chu ky, nhung van can xem thoi gian luu thong va suc mua thi truong.';

  return {
    answer,
    sections: [
      { title: 'Trang thai hien tai', content: lines.join(' ') || 'Chua nhan du du lieu mo phong.' },
      { title: 'Khai niem lien quan', content: primaryConcept?.definition || 'Chua xac dinh duoc khai niem chinh.' },
      {
        title: 'Hau qua',
        content: isRisky
          ? 'Dong von de bi ket o H\' -> T\', keo theo no lai, no luong va dut chu ky tai san xuat.'
          : 'Can theo doi them suc mua va thoi gian luu thong de tranh von bi neo trong hang hoa.',
      },
      {
        title: 'Diem can nho',
        content: primaryConcept?.alphaCorpExample || 'Tai san nhieu khong dong nghia voi thanh khoan.',
      },
    ],
    relatedConcepts: concepts.map((concept) => ({ id: concept.id, label: concept.name })),
    sourceLabels: ['Simulation', ...(context.sourceLabels || [])],
    suggestedActions: getContextualActions(context),
    fallbackUsed: true,
  };
};

const analyzeCapitalLab = (context, concepts) => {
  const chapter = context.capitalLab || {};
  const focus = chapter.chapterTitle || chapter.chapterId || chapter.title || 'Capital Lab';
  const state = chapter.mode || context.mode || 'guided';
  const currentConcept = concepts[0] || getConceptById(slugify(chapter.chapterTitle || 'capital-circuit'));

  return {
    answer: clampToWords(
      `Chang hien tai dang tap trung vao ${focus}. O che do ${state}, AI nen bam vao khai niem dang mo va noi no voi cong thuc T -> H -> SX -> H' -> T'. ${currentConcept?.definition || ''}`,
      160,
    ),
    sections: [
      { title: 'Chang hien tai', content: focus },
      { title: 'Khai niem lien quan', content: currentConcept?.definition || 'Chua xac dinh ro.' },
      {
        title: 'Goi y phan tich',
        content:
          currentConcept?.alphaCorpExample ||
          'Hay nhin xem von dang nam o hinh thai nao, vi sao no chua quay ve tien mat, va dieu gi lam chu ky cham lai.',
      },
    ],
    relatedConcepts: concepts.map((concept) => ({ id: concept.id, label: concept.name })),
    sourceLabels: ['Capital Lab', ...(context.sourceLabels || [])],
    suggestedActions: getContextualActions(context),
    fallbackUsed: true,
  };
};

const analyzeStory = (context, concepts) => ({
  answer: clampToWords(
    `Minh dang lien he chuong hien tai voi cac khai niem gan nhat: ${concepts.map((concept) => concept.name).join(' · ') || 'chua xac dinh'}. Y chinh la tu ban chi "song" khi no quay vong qua T -> H -> SX -> H' -> T'.`,
    180,
  ),
  sections: [
    { title: 'Chu de hien tai', content: context.sectionTitle || context.pageName || 'Chua co section ro rang.' },
    { title: 'Khái niệm liên quan', content: buildConceptOverview(concepts.slice(0, 3)) || 'Chua co concept du gan.' },
  ],
  relatedConcepts: concepts.map((concept) => ({ id: concept.id, label: concept.name })),
  sourceLabels: context.sourceLabels || concepts.flatMap((concept) => concept.sourceLabels || []),
  suggestedActions: getContextualActions(context),
  fallbackUsed: true,
});

const explainGeneral = (context, concepts, userText, action) => {
  const conceptOverview = buildConceptOverview(concepts.slice(0, 3));
  const names = concepts.map((concept) => concept.name).join(' · ');
  const pageName = context.pageName || 'trang hien tai';

  let answer;
  if (action === 'simplify') {
    answer = `Noi ngan gon: tren ${pageName}, van de chinh la tu ban phai di qua chu ky van dong chu khong chi "nam trong tai san". ${concepts[0]?.alphaCorpExample || ''}`.trim();
  } else if (action === 'it-analogy') {
    answer = 'Neu so sanh kieu IT: T giong budget, H giong resources, SX giong build/execute, H\' giong output chua ship, con T\' la revenue da thu ve. Diem nghen xay ra khi output chua thanh tien mat kip thoi.';
  } else if (action === 'challenge-me') {
    answer = 'Cau hoi phan bien: neu Alpha Corp co rat nhieu tai san, tai sao doanh nghiep van co the te liet thanh khoan? Hay thu tra loi theo khau H\' -> T\' va thoi gian luu thong.';
  } else if (action === 'debate-prep') {
    answer = 'Lap luan manh nhat la: khong phai toan bo van de nam o san xuat cham, ma la gia tri chua duoc thuc hien trong luu thong. Vay diem gay that su nam o dau, va vi sao?';
  } else {
    answer = `Minh dang lien he ${pageName} voi cac khai niem gan nhat: ${names || 'chua xac dinh'}. Y chinh la tu ban chi "song" khi no quay vong qua T -> H -> SX -> H' -> T'.`;
  }

  const sections = [
    { title: 'Tra loi ngan', content: clampToWords(answer, 120) },
    { title: 'Khai niem lien quan', content: conceptOverview || 'Chua co concept du gan.' },
  ];

  if (userText) {
    sections.unshift({ title: 'Cau hoi', content: userText });
  }

  return {
    answer: clampToWords(answer, 180),
    sections,
    relatedConcepts: concepts.map((concept) => ({ id: concept.id, label: concept.name })),
    sourceLabels: context.sourceLabels || concepts.flatMap((concept) => concept.sourceLabels || []),
    suggestedActions: getContextualActions(context),
    fallbackUsed: true,
  };
};

export function analyzeWithRules({ messages = [], pageContext = {}, action = null } = {}) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content || '';

  if (detectFinancialAdviceIntent(latestUserMessage)) {
    return refusalMessage();
  }

  const concepts = retrieveRelevantConcepts({
    query: [
      latestUserMessage,
      pageContext.pageName,
      pageContext.sectionTitle,
      pageContext.chapterTitle,
      pageContext.quiz?.question,
      pageContext.capitalLab?.chapterTitle,
      pageContext.activeMission,
    ]
      .filter(Boolean)
      .join(' '),
    pageContext,
    limit: 4,
  });

  if (action === 'quiz-hint' || action === 'quiz-explanation' || pageContext.route === '/quiz') {
    return explainQuiz(pageContext, concepts);
  }

  if (action === 'analyze-simulation' || pageContext.route === '/simulators') {
    return analyzeSimulation(pageContext, concepts);
  }

  if (pageContext.route === '/capital-lab') {
    return analyzeCapitalLab(pageContext, concepts);
  }

  if (pageContext.route === '/story') {
    return analyzeStory(pageContext, concepts);
  }

  return explainGeneral(pageContext, concepts, latestUserMessage, action);
}
