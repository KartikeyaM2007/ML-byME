const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scraper/deep_pages_data.json', 'utf8'));
const p = data.find(p => p.url.includes('linear-algebra'));
const m = p.markdown;
const idx = m.indexOf('sections\\\\":');
let start = m.indexOf('\\\\\\[', idx);
if (start === -1) start = m.indexOf('\\[', idx);
if (start === -1) start = m.indexOf('[', idx);

let i = start;
while(m[i] === '\\') i++; // skip escaping slashes
i++; // skip '['
let bracketCount = 1;
while(i < m.length && bracketCount > 0) {
  if (m[i] === '\\') {
    if (m[i+1] === '[') bracketCount++;
    if (m[i+1] === ']') bracketCount--;
    i += 2;
    continue;
  }
  if (m[i] === '[') bracketCount++;
  if (m[i] === ']') bracketCount--;
  i++;
}
const extracted = m.substring(start, i);
fs.writeFileSync('raw_extracted.txt', extracted);
console.log('Saved raw extracted string to raw_extracted.txt');
