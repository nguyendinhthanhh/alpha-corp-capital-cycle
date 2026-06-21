import { academicConcepts as clientAcademicConcepts } from '../../src/ai/knowledgeBase.js';

const normalize = (value = '') =>
  String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const unique = (values) => [...new Set((values || []).filter(Boolean))];

const supplementalConcepts = [
  {
    id: 'stakeholders',
    name: 'Stakeholders',
    aliases: ['stakeholder', 'stakeholders', 'chu the', 'cac ben lien quan'],
    definition:
      'Cac ben lien quan trong tinh huong Alpha Corp gom ngan hang, cong nhan, nha cung cap, nguoi mua va nha nuoc.',
    simpleExplanation:
      'Day la nhung nhom se bi anh huong khi dong von cua Alpha Corp bi nghen o H\' -> T\'.',
    alphaCorpExample:
      'Khi Alpha Corp khong thu tien ve, ngan hang gap no xau, cong nhan bi no luong va nha cung cap bi tre thanh toan.',
    itAnalogy:
      'Neu coi Alpha Corp la mot service trung tam, stakeholders la cac service phu thuoc se loi day chuyen khi service nay tre output.',
    commonMistakes: ['Chi nhin vao doanh nghiep trung tam ma bo qua tac dong lan truyen ra cac ben xung quanh.'],
    relatedConceptIds: ['liquidity', 'market', 'capital-circuit'],
    sourceLabels: ['Case Alpha Corp', 'Capital Lab'],
    verificationStatus: 'verified',
  },
];

const normalizedConcepts = [
  ...clientAcademicConcepts.map((concept) => ({
    id: concept.id,
    name: concept.name,
    aliases: unique(concept.aliases),
    definition: concept.definition,
    simpleExplanation: concept.definition,
    alphaCorpExample: concept.alphaCorpExample,
    itAnalogy: concept.itAnalogy || '',
    commonMistakes: unique(concept.commonMistakes),
    relatedConceptIds: unique(concept.relatedConceptIds),
    sourceLabels: unique(concept.sourceLabels),
    verificationStatus: concept.verification === 'needs_verification' ? 'needs-verification' : 'verified',
  })),
  ...supplementalConcepts,
]
  .filter((concept) => concept.verificationStatus === 'verified')
  .map((concept) => ({
    ...concept,
    searchText: normalize(
      [
        concept.name,
        ...(concept.aliases || []),
        concept.definition,
        concept.simpleExplanation,
        concept.alphaCorpExample,
        concept.itAnalogy,
      ].join(' '),
    ),
  }));

export const academicConcepts = normalizedConcepts;
export const conceptById = new Map(academicConcepts.map((concept) => [concept.id, concept]));

export function getConceptById(id) {
  return conceptById.get(id);
}

export function tokenize(value = '') {
  return normalize(value)
    .split(' ')
    .filter(Boolean);
}
