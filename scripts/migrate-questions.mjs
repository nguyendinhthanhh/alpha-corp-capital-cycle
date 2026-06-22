import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qbPath = path.resolve(__dirname, '../src/learning/questionBank.js');

// Dynamically import the current question bank
const { questionBank, dailyChallengeQuestionIds } = await import('file://' + qbPath);

const outputLines = [];

outputLines.push(`const option = (id, text, isCorrect, wrongReason) => ({ id, text, isCorrect, wrongReason });\n`);
outputLines.push(`export const questionBank = [`);

for (const q of questionBank) {
  let origin = 'derived-from-slide';
  if (q.sourceLabels && q.sourceLabels.includes('Case Alpha Corp')) {
    origin = 'alpha-corp-application';
  }
  
  let chapter = 3;
  if (q.sourceLabels && q.sourceLabels.includes('Session 8')) chapter = 3;
  
  const newQ = {
    id: q.id,
    type: q.type || 'single-choice',
    chapter: chapter,
    session: 8,
    topic: 'TBD',
    conceptIds: q.conceptIds || [],
    learningObjective: 'Hiểu khái niệm ' + (q.conceptIds ? q.conceptIds.join(', ') : ''),
    difficulty: q.difficulty || 1,
    prompt: q.prompt,
    options: (q.options || []).map(o => ({
      id: o.id,
      text: o.label || o.text,
      isCorrect: o.id === q.correctAnswer,
      wrongReason: q.commonWrongReasons ? q.commonWrongReasons[o.id] : undefined
    })),
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || '',
    alphaCorpConnection: q.alphaCorpConnection,
    origin: origin,
    source: {
      sourceId: 'MLN122-S8',
      fileName: 'Session 8 ChuÌ_oÌ_ng 3 GiaÌ_ triÌ£ thaÌ£Ì_ng duÌ_ trong neÌ_Ì_n kinh teÌ_Ì_ thiÌ£ truÌ_oÌ_Ì_ng.pptx',
      sessionOrSlot: 'Session 8',
      slideNumber: 1,
      sourceExcerpt: 'TBD - Text cần tìm lại trong slide',
    },
    sourceLabels: q.sourceLabels || [],
    verificationStatus: 'needs-review',
  };

  outputLines.push(`  {`);
  outputLines.push(`    id: '${newQ.id}',`);
  outputLines.push(`    type: '${newQ.type}',`);
  outputLines.push(`    chapter: ${newQ.chapter},`);
  outputLines.push(`    session: ${newQ.session},`);
  outputLines.push(`    topic: '${newQ.topic}',`);
  outputLines.push(`    conceptIds: ${JSON.stringify(newQ.conceptIds)},`);
  outputLines.push(`    learningObjective: '${newQ.learningObjective}',`);
  outputLines.push(`    difficulty: ${newQ.difficulty},`);
  outputLines.push(`    prompt: \`${newQ.prompt}\`,`);
  outputLines.push(`    options: [`);
  for (const o of newQ.options) {
    outputLines.push(`      option('${o.id}', \`${o.text}\`, ${o.isCorrect}, ${o.wrongReason ? '`'+o.wrongReason+'`' : 'undefined'}),`);
  }
  outputLines.push(`    ],`);
  outputLines.push(`    correctAnswer: '${newQ.correctAnswer}',`);
  outputLines.push(`    explanation: \`${newQ.explanation}\`,`);
  if (newQ.alphaCorpConnection) {
    outputLines.push(`    alphaCorpConnection: \`${newQ.alphaCorpConnection}\`,`);
  }
  outputLines.push(`    origin: '${newQ.origin}',`);
  outputLines.push(`    source: ${JSON.stringify(newQ.source, null, 2).split('\\n').join('\\n      ')},`);
  outputLines.push(`    sourceLabels: ${JSON.stringify(newQ.sourceLabels)},`);
  outputLines.push(`    verificationStatus: '${newQ.verificationStatus}',`);
  outputLines.push(`  },`);
}

outputLines.push(`];\n`);
outputLines.push(`export const verifiedQuestionBank = questionBank.filter(question => question.verificationStatus === 'verified');`);
outputLines.push(`export const questionMap = new Map(verifiedQuestionBank.map((question) => [question.id, question]));`);
outputLines.push(`export function getQuestionById(questionId) { return questionMap.get(questionId); }`);
outputLines.push(`export const dailyChallengeQuestionIds = ${JSON.stringify(dailyChallengeQuestionIds, null, 2)};`);

fs.writeFileSync(qbPath, outputLines.join('\n'), 'utf-8');
console.log('Migration complete');
