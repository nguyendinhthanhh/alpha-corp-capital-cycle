import os
import glob
import re
import uuid

extracted_dir = os.path.join(os.path.dirname(__file__), '../docs/quiz/extracted_text')
output_dir = os.path.join(os.path.dirname(__file__), '../docs/quiz')

files = glob.glob(os.path.join(extracted_dir, '*.txt'))

questions = []

question_keywords = ['câu hỏi', 'thảo luận', 'bài tập', 'ôn tập', 'phân tích', 'chứng minh', 'đánh giá', 'giải thích', 'liên hệ']

def is_question_header(line):
    lower_line = line.lower()
    for kw in question_keywords:
        if kw in lower_line:
            return True
    if re.search(r'^câu\s*\d+', lower_line):
        return True
    return False

for filepath in files:
    filename = os.path.basename(filepath).replace('.txt', '')
    
    # Determine Session and Chapter
    chapter_match = re.search(r'Ch[uưươ]+ng\s*(\d)', filename, re.IGNORECASE)
    chapter = chapter_match.group(1) if chapter_match else 'Unknown'
    session_match = re.search(r'(Session|Slot)\s*(\d+)', filename, re.IGNORECASE)
    session = f"{session_match.group(1)} {session_match.group(2)}" if session_match else 'Unknown'
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    slides = re.split(r'--- Slide (\d+) ---', content)
    
    # slides[0] is everything before first slide (usually empty)
    # slides[1] is '1', slides[2] is text for slide 1, etc.
    
    for i in range(1, len(slides), 2):
        slide_num = slides[i]
        slide_text = slides[i+1].strip()
        
        lines = slide_text.split('\n')
        
        for j, line in enumerate(lines):
            line = line.strip()
            if not line:
                continue
                
            is_q = False
            q_text = ''
            
            if line.endswith('?'):
                is_q = True
                q_text = line
            elif is_question_header(line):
                is_q = True
                # Capture this line and next few lines if they seem part of the question
                q_text = line
                k = j + 1
                while k < len(lines) and k < j + 4:
                    if lines[k].strip() and not lines[k].startswith('---'):
                        q_text += " " + lines[k].strip()
                    k += 1
            
            if is_q and len(q_text) > 10 and '?' in q_text: # Filter out some noise
                if 'any questions' in q_text.lower():
                    continue
                questions.append({
                    'id': f"Q-{str(uuid.uuid4())[:8]}",
                    'text': q_text.strip(),
                    'file': filename,
                    'session': session,
                    'slide': slide_num
                })

# remove exact duplicates
unique_questions = []
seen = set()
for q in questions:
    if q['text'] not in seen:
        seen.add(q['text'])
        unique_questions.append(q)

report_path = os.path.join(output_dir, 'EXTRACTED_QUESTIONS_INVENTORY.md')
with open(report_path, 'w', encoding='utf-8') as f:
    f.write('# Extracted Questions Inventory\n\n')
    f.write('| Question ID | Original Question | File | Session/Slot | Slide | Notes |\n')
    f.write('|---|---|---|---|---|---|\n')
    for q in unique_questions:
        f.write(f"| {q['id']} | {q['text']} | {q['file']} | {q['session']} | {q['slide']} | |\n")

print(f"Extraction complete. Found {len(unique_questions)} unique questions. Saved to {report_path}")
