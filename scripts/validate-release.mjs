import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qbPath = path.resolve(__dirname, '../src/learning/questionBank.js');

const MIN_VERIFIED_QUESTIONS = process.env.MIN_VERIFIED_QUESTIONS || 12;

async function validateRelease() {
  const { verifiedQuestionBank, questionBank } = await import('file://' + qbPath);
  
  let hasError = false;

  console.log(`Running release validation. Verified questions: ${verifiedQuestionBank.length} (Min required: ${MIN_VERIFIED_QUESTIONS})`);

  if (verifiedQuestionBank.length < MIN_VERIFIED_QUESTIONS) {
    console.error(`- Verified questions: ${verifiedQuestionBank.length}`);
    console.error(`- Minimum required: ${MIN_VERIFIED_QUESTIONS}`);
    hasError = true;
  }

  // Check no needs-review in verified
  for (const q of verifiedQuestionBank) {
      if (q.verificationStatus !== 'verified') {
          console.error(`Question ${q.id} is in verifiedQuestionBank but has status ${q.verificationStatus}`);
          hasError = true;
      }
      if (q.id.startsWith('test-') || q.source?.sourceId?.startsWith('TEST-')) {
          console.error(`TEST_FIXTURE_ONLY question leaked into verifiedQuestionBank: ${q.id}`);
          hasError = true;
      }
  }

  // Check no test fixture leaked into questionBank
  for (const q of questionBank) {
    if (q.id.startsWith('test-') || q.source?.sourceId?.startsWith('TEST-')) {
        console.error(`TEST_FIXTURE_ONLY question leaked into main questionBank: ${q.id}`);
        hasError = true;
    }
  }

  // Topic Coverage
  const coverage = new Set(verifiedQuestionBank.flatMap(q => q.conceptIds));
  const requiredConcepts = [
    'capital-circuit',
    'spatial-condition',
    'temporal-condition',
    'capital-turnover',
    'circulation-time'
  ];
  const groupConcepts = [
    'profit',
    'interest',
    'stakeholders',
    'market'
  ];

  const missingRequired = requiredConcepts.filter(c => !coverage.has(c));
  if (missingRequired.length > 0) {
      console.error(`\nMissing required concept coverage:`);
      missingRequired.forEach(c => console.error(`- ${c}`));
      hasError = true;
  }

  const hasGroupConcept = groupConcepts.some(c => coverage.has(c));
  if (!hasGroupConcept) {
      console.error(`\nMissing at least one concept from group: ${groupConcepts.join(', ')}`);
      hasError = true;
  }

  // Check valid schema for verified
  for (const q of verifiedQuestionBank) {
      if (!q.source || !q.source.sourceExcerpt || q.source.sourceExcerpt.trim() === '') {
          console.error(`Question ${q.id} has empty sourceExcerpt`);
          hasError = true;
      }
      if (!q.source || !q.source.sourceId || q.source.sourceId.trim() === '') {
          console.error(`Question ${q.id} has empty sourceId`);
          hasError = true;
      }
      if (!q.explanation || q.explanation.trim() === '') {
          console.error(`Question ${q.id} has empty explanation`);
          hasError = true;
      }
      if (!q.correctAnswer) {
          console.error(`Question ${q.id} has no correctAnswer`);
          hasError = true;
      }
      if (q.type === 'single-choice' || q.type === 'multiple-choice') {
          const correctOpts = q.options.filter(o => o.isCorrect);
          if (correctOpts.length === 0) {
              console.error(`Question ${q.id} has no valid correct option`);
              hasError = true;
          }
          // no dup options
          const optIds = new Set(q.options.map(o => o.id));
          if (optIds.size !== q.options.length) {
              console.error(`Question ${q.id} has duplicate option IDs`);
              hasError = true;
          }
      }
  }

  if (hasError) {
    console.error('\nRelease validation failed.');
    process.exit(1);
  } else {
    console.log('Release validation PASSED.');
  }
}

validateRelease().catch(err => {
    console.error(err);
    process.exit(1);
});
