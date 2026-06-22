// TEST_FIXTURE_ONLY
// Never import this file from production code.

export const verifiedFixtureQuestions = [
  {
    id: 'test-q1-capital-circuit',
    type: 'single-choice',
    chapter: 3,
    session: 8,
    topic: 'Tuần hoàn tư bản',
    conceptIds: ['capital-circuit'],
    learningObjective: 'Hiểu tuần hoàn',
    difficulty: 1,
    prompt: 'Synthetic test content for automated tests only. Capital circuit starts with?',
    options: [
      { id: 'a', text: 'T', isCorrect: true },
      { id: 'b', text: 'H', isCorrect: false, wrongReason: 'Wrong' },
      { id: 'c', text: 'SX', isCorrect: false, wrongReason: 'Wrong' }
    ],
    correctAnswer: 'a',
    explanation: 'Test explanation',
    origin: 'exact-source-question',
    source: {
      sourceId: 'TEST-SOURCE-001',
      fileName: 'TEST_FIXTURE_ONLY',
      sessionOrSlot: 'Test Session',
      slideNumber: 1,
      sourceExcerpt: 'Synthetic test content for automated tests only.'
    },
    verificationStatus: 'verified'
  },
  {
    id: 'test-q2-spatial-condition',
    type: 'single-choice',
    chapter: 3,
    session: 8,
    topic: 'Điều kiện không gian',
    conceptIds: ['spatial-condition', 'temporal-condition'],
    learningObjective: 'Hiểu không gian',
    difficulty: 2,
    prompt: 'Spatial condition means?',
    options: [
      { id: 'a', text: 'All stages coexist', isCorrect: true },
      { id: 'b', text: 'Stages are sequential only', isCorrect: false, wrongReason: 'Wrong' },
      { id: 'c', text: 'No space needed', isCorrect: false, wrongReason: 'Wrong' }
    ],
    correctAnswer: 'a',
    explanation: 'Test explanation 2',
    origin: 'exact-source-question',
    source: {
      sourceId: 'TEST-SOURCE-002',
      fileName: 'TEST_FIXTURE_ONLY',
      sessionOrSlot: 'Test Session',
      slideNumber: 2,
      sourceExcerpt: 'Synthetic test content for automated tests only.'
    },
    verificationStatus: 'verified'
  },
  {
    id: 'test-q3-profit',
    type: 'multiple-choice',
    chapter: 3,
    session: 9,
    topic: 'Profit vs Interest',
    conceptIds: ['profit', 'interest'],
    learningObjective: 'Hiểu lợi nhuận',
    difficulty: 3,
    prompt: 'Select correct statements',
    options: [
      { id: 'a', text: 'Profit is surplus value', isCorrect: true },
      { id: 'b', text: 'Interest is part of profit', isCorrect: true },
      { id: 'c', text: 'Profit is less than interest', isCorrect: false, wrongReason: 'Wrong' },
      { id: 'd', text: 'Profit is everywhere', isCorrect: true }
    ],
    correctAnswer: ['a', 'b', 'd'],
    explanation: 'Test explanation',
    origin: 'exact-source-question',
    source: {
      sourceId: 'TEST-SOURCE-003',
      fileName: 'TEST_FIXTURE_ONLY',
      sessionOrSlot: 'Test Session',
      slideNumber: 3,
      sourceExcerpt: 'Synthetic content'
    },
    verificationStatus: 'verified'
  },
  {
    id: 'test-q4-order',
    type: 'ordering',
    chapter: 3,
    session: 8,
    topic: 'Chu trình',
    conceptIds: ['capital-circuit'],
    learningObjective: 'Order stages',
    difficulty: 2,
    prompt: 'Order the circuit',
    options: [
      { id: 't', text: 'Tien' },
      { id: 'h', text: 'Hang' },
      { id: 'sx', text: 'San xuat' },
      { id: 'hp', text: 'Hang phay' },
      { id: 'tp', text: 'Tien phay' }
    ],
    correctAnswer: ['t', 'h', 'sx', 'hp', 'tp'],
    explanation: 'Test order',
    origin: 'exact-source-question',
    source: {
      sourceId: 'TEST-SOURCE-004',
      fileName: 'TEST_FIXTURE_ONLY',
      sessionOrSlot: 'Test Session',
      slideNumber: 4,
      sourceExcerpt: 'Synthetic content'
    },
    verificationStatus: 'verified'
  }
];
