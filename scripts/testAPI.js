const url = 'http://localhost:8787/api/ai/chat';
const payload = {
  action: 'analyze',
  messages: [{ role: 'user', content: 'Hãy phân tích quyết định nhiệm vụ của Alpha Corp trong vòng 5' }],
  pageContext: { route: '/learn/case-mission', pageName: 'Case Mission' }
};

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
  .then(res => res.json())
  .then(data => console.log('RESPONSE:', JSON.stringify(data, null, 2)))
  .catch(err => console.error('ERROR:', err));
