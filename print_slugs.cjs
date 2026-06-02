const fs = require('fs');
const lines = fs.readFileSync('src/data/problemDetails.ts', 'utf8').split('\n');
console.log(lines.filter(l => l.includes('"slug":')).map(l => l.trim()).join('\n'));
