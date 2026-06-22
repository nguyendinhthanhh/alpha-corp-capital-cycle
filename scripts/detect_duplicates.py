import os
import glob
import re
from itertools import combinations

extracted_dir = os.path.join(os.path.dirname(__file__), '../docs/quiz/extracted_text')
output_dir = os.path.join(os.path.dirname(__file__), '../docs/quiz')

files = glob.glob(os.path.join(extracted_dir, '*.txt'))

def get_words(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    # clean text
    text = re.sub(r'--- Slide \d+ ---', '', text)
    text = re.sub(r'\[Speaker Notes\]', '', text)
    words = re.findall(r'\w+', text.lower())
    return set(words), text

docs = {}
for f in files:
    filename = os.path.basename(f).replace('.txt', '')
    words, raw_text = get_words(f)
    if len(words) > 10: # Only compare files with actual content
        docs[filename] = {'words': words, 'raw': raw_text}

duplicates = []

for f1, f2 in combinations(docs.keys(), 2):
    w1 = docs[f1]['words']
    w2 = docs[f2]['words']
    
    intersection = w1.intersection(w2)
    union = w1.union(w2)
    
    similarity = len(intersection) / len(union) if len(union) > 0 else 0
    
    if similarity > 0.85: # 85% word similarity indicates it's largely the same content
        duplicates.append((f1, f2, similarity))

report_path = os.path.join(output_dir, 'SOURCE_DUPLICATE_REPORT.md')
with open(report_path, 'w', encoding='utf-8') as f:
    f.write('# Source Duplicate Report\n\n')
    f.write('This report identifies presentation files that have highly overlapping content (e.g. Session vs Slot).\n\n')
    if not duplicates:
        f.write('No duplicates found.\n')
    else:
        f.write('| File 1 | File 2 | Word Similarity |\n')
        f.write('|---|---|---|\n')
        for f1, f2, sim in sorted(duplicates, key=lambda x: x[2], reverse=True):
            f.write(f"| {f1} | {f2} | {sim:.2%} |\n")

print(f"Duplicate report saved to {report_path}")
