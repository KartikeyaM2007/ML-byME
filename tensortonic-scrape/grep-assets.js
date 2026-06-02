const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'output');
const patterns = [
  'canvas',
  'webgl',
  'three',
  'mesh',
  'terrain',
  'shader',
  'framer',
  'motion',
  'Wireframe',
  'Terrain',
];

const hits = [];

function scanFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.js', '.css', '.html', '.mjs'].includes(ext)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  const name = path.basename(filePath);
  const matched = patterns.filter((p) => text.toLowerCase().includes(p.toLowerCase()));
  if (matched.length) {
    hits.push({ file: name, matched, size: text.length });
  }
}

if (!fs.existsSync(OUT)) {
  console.error('Run npm run scrape first');
  process.exit(1);
}

for (const f of fs.readdirSync(OUT)) {
  scanFile(path.join(OUT, f));
}

hits.sort((a, b) => b.matched.length - a.matched.length);
console.log(JSON.stringify(hits, null, 2));
