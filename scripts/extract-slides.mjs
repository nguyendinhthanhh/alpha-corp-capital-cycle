import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import officeParser from 'officeparser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const materialsDir = path.resolve(__dirname, '../docs/course-materials/original');
const outputDir = path.resolve(__dirname, '../docs/quiz');

async function extractText() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(materialsDir).filter(f => f.match(/\.(ppt|pptx|pdf)$/i));
  const manifest = [];
  const extractedDir = path.resolve(outputDir, 'extracted_text');
  
  if (!fs.existsSync(extractedDir)) {
    fs.mkdirSync(extractedDir, { recursive: true });
  }

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const isPpt = ext === '.ppt';
    const filePath = path.join(materialsDir, file);
    const sourceId = `MLN122-${file.split(' ')[0].replace('Session', 'S').replace('Slot', 'SL')}${file.split(' ')[1]}`;
    
    let text = '';
    let status = 'readable';
    let note = '';

    if (isPpt) {
      status = 'UNREADABLE_SOURCE';
      note = 'Needs conversion to .pptx or .pdf (old .ppt format is not supported by parser).';
    } else {
      try {
        text = await officeParser.parseOfficeAsync(filePath);
      } catch (err) {
        status = 'UNREADABLE_SOURCE';
        note = `Parsing error: ${err.message}`;
      }
    }

    if (status === 'readable') {
      const outPath = path.join(extractedDir, `${file}.txt`);
      fs.writeFileSync(outPath, text, 'utf-8');
    }

    // Determine Chapter and Session
    let chapter = 'Unknown';
    const chapMatch = file.match(/Ch[uưươ]+ng\s*(\d)/i);
    if (chapMatch) chapter = chapMatch[1];
    
    let sessionMatch = file.match(/Session\s*(\d+)/i) || file.match(/Slot\s*(\d+)/i);
    let session = sessionMatch ? `${file.includes('Session') ? 'Session' : 'Slot'} ${sessionMatch[1]}` : 'Unknown';

    manifest.push({
      SourceID: sourceId,
      File: file,
      Chapter: chapter,
      Session: session,
      Status: status,
      Slides: status === 'readable' ? (text.match(/Slide/gi)?.length || 'Unknown') : 'N/A', // Estimating slides based on parser output if it outputs slide markers, or just general text length
      Topics: 'To be extracted',
      Note: note
    });
  }

  const manifestPath = path.join(outputDir, 'SOURCE_MANIFEST.md');
  let md = '# MLN122 Source Manifest\n\n';
  md += '| Source ID | File | Chapter | Session | Status | Note |\n';
  md += '|---|---|---|---|---|---|\n';
  manifest.forEach(item => {
    md += `| ${item.SourceID} | ${item.File} | ${item.Chapter} | ${item.Session} | ${item.Status} | ${item.Note} |\n`;
  });

  fs.writeFileSync(manifestPath, md, 'utf-8');
  console.log('Extraction complete. Manifest saved to', manifestPath);
}

extractText().catch(console.error);
