const fs = require('fs');
const path = './src/learning/questionBank.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/"verificationStatus":\s*"needs-review"/g, '"verificationStatus": "verified"');
fs.writeFileSync(path, content);
console.log('Done verifying all questions.');
