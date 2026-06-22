import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qbPath = path.resolve(__dirname, '../src/learning/questionBank.js');

const mode = process.argv[2] || 'production';

async function validate() {
  const { questionBank, verifiedQuestionBank } = await import('file://' + qbPath);
  
  let hasError = false;
  
  const targetBank = mode === 'all' ? questionBank : verifiedQuestionBank;

  console.log(`Running quiz validation in [${mode}] mode. Checking ${targetBank.length} questions...`);

  if (mode === 'production' && verifiedQuestionBank.length > 0) {
      // Ensure all items in verifiedQuestionBank actually have 'verified' status
      const unverified = verifiedQuestionBank.filter(q => q.verificationStatus !== 'verified');
      if (unverified.length > 0) {
          console.error(`Production bank contains ${unverified.length} non-verified questions!`);
          hasError = true;
      }
  }

  for (const q of targetBank) {
    const prefix = `[Question ${q.id}]`;
    
    // In production mode, we only check verified questions, which MUST be strict.
    // In 'all' mode, we check all questions, but don't fail the build for needs-review issues unless the schema is completely broken.
    const isStrict = mode === 'production' || q.verificationStatus === 'verified';

    if (!q.source || !q.source.sourceId) { console.error(`${prefix} Missing sourceId`); hasError = true; }
    if (!q.source || !q.source.fileName) { console.error(`${prefix} Missing fileName`); hasError = true; }
    if (!q.source || !q.source.sourceExcerpt) { console.error(`${prefix} Missing sourceExcerpt`); hasError = true; }
    if (!q.conceptIds || q.conceptIds.length === 0) { console.error(`${prefix} Missing conceptIds`); hasError = true; }
    if (!q.learningObjective) { console.error(`${prefix} Missing learningObjective`); hasError = true; }
    if (!q.explanation) { console.error(`${prefix} Missing explanation`); hasError = true; }
    if (q.correctAnswer === undefined) { console.error(`${prefix} Missing correctAnswer`); hasError = true; }

    if (isStrict) {
        if (q.type === 'single-choice') {
            if (!q.options || q.options.length < 3) { console.error(`${prefix} single-choice needs at least 3 options`); hasError = true; }
            const correctOpts = q.options.filter(o => o.isCorrect);
            if (correctOpts.length !== 1) { console.error(`${prefix} single-choice must have exactly 1 correct option`); hasError = true; }
            if (q.correctAnswer !== correctOpts[0].id) { console.error(`${prefix} correctAnswer field does not match isCorrect flag`); hasError = true; }
            
            const wrongOpts = q.options.filter(o => !o.isCorrect);
            for (const opt of wrongOpts) {
                if (!opt.wrongReason) {
                    console.error(`${prefix} option ${opt.id} is missing wrongReason`);
                    hasError = true;
                }
            }
        }
    }
  }

  if (hasError) {
    console.error('Validation FAILED.');
    process.exit(1);
  } else {
    console.log('Validation PASSED.');
  }
}

validate().catch(err => {
    console.error(err);
    process.exit(1);
});
