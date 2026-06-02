const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/Home.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const nav = ` onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', 'PATH'); window.dispatchEvent(new PopStateEvent('popstate')); }}`;

if (!content.includes('Start Learning') || content.includes("'/problems'); window.dispatchEvent")) {
  console.log('Home buttons already patched or missing');
} else {
  content = content.replace(
    /(<button className="inline-flex items-center justify-center px-7 py-3\.5 text-sm font-bold text-black bg-brand-primary[^"]*")>Start Learning/,
    `$1${nav.replace('PATH', '/problems')}>Start Learning`,
  );
  content = content.replace(
    /(<a className="inline-flex items-center justify-center px-7 py-3\.5 text-sm font-medium text-white border border-white\/20[^"]*"[^>]*href="\/study-plans\/cuda-basics")/,
    `$1${nav.replace('PATH', '/study-plans/cuda-basics')}`,
  );
  fs.writeFileSync(filePath, content);
  console.log('Patched Start Learning + CUDA buttons');
}
