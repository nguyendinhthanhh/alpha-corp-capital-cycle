import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const { questionBank } = await import('file://' + path.resolve(__dirname, '../src/learning/questionBank.js'));
  const exact = questionBank.filter(q => q.evidence && q.evidence.excerptFoundInSource);
  
  const priorities = [
    { label: 'Tuần hoàn tư bản', test: q => q.topic.includes('Tuần hoàn') || q.conceptIds.includes('capital-circuit') },
    { label: 'T – H … SX … H’ – T’', test: q => q.prompt.includes('T') && q.prompt.includes('H') },
    { label: 'Điều kiện không gian', test: q => q.conceptIds.includes('spatial-condition') || q.topic.includes('không gian') },
    { label: 'Điều kiện thời gian', test: q => q.conceptIds.includes('temporal-condition') || q.topic.includes('thời gian') },
    { label: 'Chu chuyển tư bản', test: q => q.conceptIds.includes('capital-turnover') || q.topic.includes('Chu chuyển') },
    { label: 'Thời gian lưu thông', test: q => q.conceptIds.includes('circulation-time') },
    { label: 'Lợi nhuận', test: q => q.conceptIds.includes('profit') },
    { label: 'Lợi tức', test: q => q.conceptIds.includes('interest') },
    { label: 'Các chủ thể thị trường', test: q => q.conceptIds.includes('stakeholders') },
    { label: 'Alpha Corp', test: q => q.origin === 'alpha-corp-application' }
  ];

  exact.sort((a, b) => {
    let aRank = priorities.findIndex(p => p.test(a));
    let bRank = priorities.findIndex(p => p.test(b));
    aRank = aRank === -1 ? 99 : aRank;
    bRank = bRank === -1 ? 99 : bRank;
    return aRank - bRank;
  });

  let md = '# Review Batch 01\n\nDanh sách 13 câu exact source match cần review tay.\n\n';
  for (const q of exact) {
    md += `### ${q.id}\n`;
    md += `- **Prompt:** ${q.prompt}\n`;
    md += `- **Type:** ${q.type}\n`;
    md += `- **Options:**\n`;
    if (q.options) {
      q.options.forEach(o => md += `  - [${o.isCorrect ? 'x' : ' '}] ${o.id}: ${o.text}\n`);
    }
    md += `- **Correct answer:** ${q.correctAnswer}\n`;
    md += `- **Explanation:** ${q.explanation}\n`;
    md += `- **Origin:** ${q.origin}\n`;
    md += `- **Concept IDs:** ${q.conceptIds.join(', ')}\n`;
    md += `- **Learning objective:** ${q.learningObjective}\n`;
    md += `- **File nguồn:** ${q.evidence.sourceFileName}\n`;
    md += `- **Session/Slot:** ${q.evidence.sessionOrSlot}\n`;
    md += `- **Slide:** ${q.evidence.slideNumber}\n`;
    md += `- **Section:** ${q.topic || 'N/A'}\n`;
    md += `- **Exact source excerpt:** > ${q.evidence.exactSourceExcerpt}\n`;
    if (q.evidence.alphaCorpFactsSupported !== undefined) md += `- **Alpha Corp secondary source:** ${q.alphaCorpConnection || 'N/A'}\n`;
    md += `- **Confidence:** ${q.evidence.confidence}\n`;
    md += `- **Issues cần review:** ${q.evidence.issues.join(', ') || 'None'}\n`;
    md += `- **Recommended decision:** ${q.evidence.recommendedDecision}\n\n---\n\n`;
  }
  
  fs.writeFileSync(path.resolve(__dirname, '../docs/quiz/REVIEW_BATCH_01.md'), md);
  console.log('REVIEW_BATCH_01.md generated.');
}

run();
