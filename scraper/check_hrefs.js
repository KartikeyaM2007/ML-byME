const fs = require('fs');
const c = fs.readFileSync('../src/Home.tsx','utf8');
const hrefMatches = Array.from(c.matchAll(/href="([^"]*)"/g)).slice(0,30).map(m => m[1]);
const unique = Array.from(new Set(hrefMatches));
console.log(unique.join('\n'));
