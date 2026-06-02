const fs = require('fs');
const code = fs.readFileSync('src/data/problemDetails.ts', 'utf8');
const pStart = code.indexOf('"slug": "pearson-correlation"');
const end = code.indexOf('}', pStart);
console.log(code.substring(pStart - 100, end + 1));
