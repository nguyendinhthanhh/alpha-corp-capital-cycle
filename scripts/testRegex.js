const raw = '{"answer": "{\\n  \\"answer\\": \\"... tín dụng bị siết chặt (credit \\\\\\"squeeze\\\\\\")...\\"\\n}"}';
const parsed1 = JSON.parse(raw);
const text = parsed1.answer;
const answerMatch = text.match(/"answer"\s*:\s*"((?:\\.|[^"\\])*?)(?:"|$)/);
console.log('parsed1.answer:', text);
console.log('MATCH:', answerMatch ? answerMatch[1] : 'NULL');


