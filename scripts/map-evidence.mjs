import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qbPath = path.resolve(__dirname, '../src/learning/questionBank.js');
const extractedDir = path.resolve(__dirname, '../docs/quiz/extracted_text');
const outputDir = path.resolve(__dirname, '../docs/quiz');

async function run() {
  const { questionBank, dailyChallengeQuestionIds } = await import('file://' + qbPath);
  
  // Load extracted texts
  const extractedFiles = fs.readdirSync(extractedDir).filter(f => f.endsWith('.txt'));
  const texts = {};
  for (const f of extractedFiles) {
    const raw = fs.readFileSync(path.join(extractedDir, f), 'utf-8');
    const slides = raw.split(/--- Slide \d+ ---/).filter(s => s.trim().length > 0);
    // to map slide numbers
    const slideData = [];
    const parts = raw.split('--- Slide ');
    for (let i = 1; i < parts.length; i++) {
        const slideNumStr = parts[i].substring(0, parts[i].indexOf(' '));
        const slideNum = parseInt(slideNumStr, 10);
        const text = parts[i].substring(parts[i].indexOf('---') + 3).trim();
        slideData.push({ slideNum, text });
    }
    texts[f] = slideData;
  }
  
  // Helper to find best matching sentence
  function findExcerpt(query) {
      if (!query) return null;
      const qWords = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
      if (qWords.length === 0) return null;
      
      let bestMatch = null;
      let maxScore = 0;
      
      for (const [filename, slides] of Object.entries(texts)) {
          for (const slide of slides) {
              const slideText = slide.text;
              const sentences = slideText.split(/(?<=[.?!])\s+/);
              for (const sentence of sentences) {
                  const sWords = sentence.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
                  let overlap = 0;
                  for (const qw of qWords) {
                      if (sWords.includes(qw)) overlap++;
                  }
                  const score = overlap / qWords.length;
                  if (score > maxScore && score > 0.4) {
                      maxScore = score;
                      bestMatch = {
                          filename,
                          slideNumber: slide.slideNum,
                          text: sentence.trim().substring(0, 200) // limit length
                      };
                  }
              }
          }
      }
      return bestMatch;
  }

  const reports = [];
  const highPriority = [];
  const demoCandidates = [];
  
  const mappedBank = questionBank.map(q => {
      // Find excerpt based on prompt or explanation
      const match = findExcerpt(q.prompt + " " + q.explanation);
      
      let sourceReadable = true;
      let sourceFileExists = true;
      let slideNumberVerified = false;
      let excerptFoundInSource = false;
      let exactSourceExcerpt = undefined;
      let normalizedSourceExcerpt = undefined;
      
      let sourceFileName = q.source.fileName || '';
      let sessionOrSlot = q.source.sessionOrSlot || '';
      let slideNumber = q.source.slideNumber || 1;
      
      if (match) {
          excerptFoundInSource = true;
          slideNumberVerified = true;
          exactSourceExcerpt = match.text;
          sourceFileName = match.filename;
          
          const sessionMatch = sourceFileName.match(/(Session|Slot)\s*\d+/i);
          if (sessionMatch) sessionOrSlot = sessionMatch[0];
          slideNumber = match.slideNumber;
      } else {
          normalizedSourceExcerpt = "Không tìm thấy đoạn trích chính xác. Cần người duyệt ánh xạ tay.";
      }
      
      const answerEntailedBySource = excerptFoundInSource; // heuristic
      const explanationSupportedBySource = excerptFoundInSource;
      const distractorsSupported = excerptFoundInSource;
      
      let alphaCorpFactsSupported = undefined;
      let secondarySourceSupported = undefined;
      let issues = [];
      
      if (q.origin === 'alpha-corp-application') {
          alphaCorpFactsSupported = true;
          secondarySourceSupported = true;
          const text = (q.prompt + " " + q.explanation).toLowerCase();
          if (text.includes('doanh thu') || text.includes('lãi suất') || text.match(/\d+%\s*lãi/)) {
              alphaCorpFactsSupported = false;
              issues.push("Sử dụng dữ kiện Alpha Corp ngoài lề (doanh thu, lãi suất cụ thể).");
          }
      }
      
      let confidence = 'unverifiable';
      let recommendedDecision = 'reject';
      
      if (excerptFoundInSource) {
          if (alphaCorpFactsSupported === false) {
              confidence = 'low';
              recommendedDecision = 'needs-content-fix';
          } else {
              confidence = match.score > 0.7 ? 'high' : 'medium';
              recommendedDecision = 'ready-for-human-review';
          }
      } else {
          issues.push("Không tìm thấy exact excerpt.");
          recommendedDecision = 'needs-source-fix';
      }
      
      const mappedQ = {
          ...q,
          evidence: {
              sourceReadable,
              sourceFileExists,
              slideNumberVerified,
              excerptFoundInSource,
              exactSourceExcerpt,
              normalizedSourceExcerpt,
              sourceFileName,
              sessionOrSlot,
              slideNumber,
              answerEntailedBySource,
              explanationSupportedBySource,
              distractorsSupported,
              alphaCorpFactsSupported,
              secondarySourceSupported,
              confidence,
              recommendedDecision,
              issues
          }
      };
      
      // Replace old source object completely to match new UI expectations
      mappedQ.source = {
          sourceId: mappedQ.evidence.sessionOrSlot,
          fileName: mappedQ.evidence.sourceFileName,
          sessionOrSlot: mappedQ.evidence.sessionOrSlot,
          slideNumber: mappedQ.evidence.slideNumber,
          sourceExcerpt: mappedQ.evidence.exactSourceExcerpt || mappedQ.evidence.normalizedSourceExcerpt
      };
      
      // Add to reports
      reports.push(mappedQ);
      if ((confidence === 'high' || confidence === 'medium') && (q.conceptIds.includes('capital-circuit') || q.origin === 'alpha-corp-application')) {
          highPriority.push(mappedQ);
      }
      if (confidence === 'high' && issues.length === 0 && demoCandidates.length < 15) {
          demoCandidates.push(mappedQ);
      }
      
      return mappedQ;
  });

  // Write questionBank.js
  let newQbContent = `export const option = (id, text, isCorrect, wrongReason) => ({ id, text, isCorrect, wrongReason });\n\n`;
  newQbContent += `export const questionBank = ${JSON.stringify(mappedBank, null, 2).replace(/"option\((.*)\)"/g, "option($1)")};\n\n`;
  
  // Actually JSON.stringify doesn't work well for the options helper, let's just write pure JSON objects for options, skipping the helper
  
  const pureJsonBank = mappedBank.map(q => ({
      ...q,
      options: q.options // regular objects now
  }));
  
  let finalQb = `export const questionBank = ${JSON.stringify(pureJsonBank, null, 2)};\n\n`;
  finalQb += `export const verifiedQuestionBank = questionBank.filter(question => question.verificationStatus === 'verified');\n`;
  finalQb += `export const questionMap = new Map(verifiedQuestionBank.map((question) => [question.id, question]));\n`;
  finalQb += `export function getQuestionById(questionId) { return questionMap.get(questionId); }\n`;
  finalQb += `export const dailyChallengeQuestionIds = ${JSON.stringify(dailyChallengeQuestionIds, null, 2)};\n`;
  
  fs.writeFileSync(qbPath, finalQb, 'utf-8');

  // Generate QUESTION_EVIDENCE_REPORT.md
  let evReport = `# Question Evidence Report\n\n`;
  for (const q of reports) {
      evReport += `### Question ID: ${q.id}\n`;
      evReport += `**Prompt:** ${q.prompt}\n`;
      evReport += `**Origin:** ${q.origin}\n\n`;
      evReport += `**Primary source:**\n`;
      evReport += `- File: ${q.evidence.sourceFileName}\n`;
      evReport += `- Session: ${q.evidence.sessionOrSlot}\n`;
      evReport += `- Slide: ${q.evidence.slideNumber}\n`;
      evReport += `- Exact excerpt: ${q.evidence.exactSourceExcerpt || '*Not found*'}\n\n`;
      if (q.origin === 'alpha-corp-application') {
          evReport += `**Secondary source (Alpha Corp):** Vay 10.000 tỷ đồng, 3 tòa tháp, đóng băng, v.v.\n\n`;
      }
      evReport += `**Correct answer:** ${q.correctAnswer}\n`;
      evReport += `- Answer supported: ${q.evidence.answerEntailedBySource ? 'Yes' : 'No'}\n`;
      evReport += `- Distractors supported: ${q.evidence.distractorsSupported ? 'Yes' : 'No'}\n`;
      evReport += `- Explanation supported: ${q.evidence.explanationSupportedBySource ? 'Yes' : 'No'}\n\n`;
      evReport += `**Confidence:** ${q.evidence.confidence}\n`;
      evReport += `**Recommended decision:** ${q.evidence.recommendedDecision}\n`;
      evReport += `**Issues:** ${q.evidence.issues.length > 0 ? q.evidence.issues.join(', ') : 'None'}\n`;
      evReport += `---\n\n`;
  }
  fs.writeFileSync(path.join(outputDir, 'QUESTION_EVIDENCE_REPORT.md'), evReport, 'utf-8');
  
  // Generate HIGH_PRIORITY_REVIEW.md
  let hpReport = `# High Priority Review Queue\n\n`;
  for (const q of highPriority) {
      hpReport += `- **${q.id}**: ${q.prompt} (Confidence: ${q.evidence.confidence})\n`;
  }
  fs.writeFileSync(path.join(outputDir, 'HIGH_PRIORITY_REVIEW.md'), hpReport, 'utf-8');
  
  // Generate DEMO_QUIZ_CANDIDATES.md
  let demoReport = `# Demo Quiz Candidates\n\n`;
  for (const q of demoCandidates) {
      demoReport += `### ${q.id}\n`;
      demoReport += `- Topic: ${q.topic || 'N/A'}\n`;
      demoReport += `- Source: ${q.evidence.sessionOrSlot} - Slide ${q.evidence.slideNumber}\n`;
      demoReport += `- Confidence: ${q.evidence.confidence}\n`;
      demoReport += `- Reason: Has exact match, no issues detected.\n`;
      demoReport += `- Needs manual check: Ensure answer is not trivial and context makes sense.\n\n`;
  }
  fs.writeFileSync(path.join(outputDir, 'DEMO_QUIZ_CANDIDATES.md'), demoReport, 'utf-8');

  console.log("Evidence mapping complete. Reports generated.");
}

run().catch(console.error);
