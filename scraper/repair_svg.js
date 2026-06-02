const fs = require('fs');
const path = require('path');

const files = ['Home.tsx', 'Research.tsx', 'MathHub.tsx', 'StudyPlans.tsx'];

for (const file of files) {
  const filePath = path.join(__dirname, '../src', file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');

  // Reopen containers broken by void-tag pass
  content = content.replace(/<linearGradient([^>]*)\s*\/>/gi, '<linearGradient$1>');
  content = content.replace(/<radialGradient([^>]*)\s*\/>/gi, '<radialGradient$1>');
  content = content.replace(/<filter([^>]*)\s*\/>/gi, '<filter$1>');
  content = content.replace(/<feMerge([^>]*)\s*\/>/gi, '<feMerge$1>');

  // SVG filter primitives must be self-closing in JSX
  content = content.replace(/<feGaussianBlur([^>]*?)(?<!\/)\s*>/gi, '<feGaussianBlur$1 />');
  content = content.replace(/<feMergeNode([^>]*?)(?<!\/)\s*>/gi, '<feMergeNode$1 />');
  content = content.replace(/<\/feGaussianBlur>/gi, '');
  content = content.replace(/<\/feMergeNode>/gi, '');

  // HTML void tags only
  for (const tag of ['img', 'input', 'br', 'hr']) {
    content = content.replace(new RegExp(`<${tag}(\\s[^>]*?)(?<!/)>`, 'gi'), `<${tag}$1 />`);
    content = content.replace(new RegExp(`</${tag}>`, 'gi'), '');
  }

  fs.writeFileSync(filePath, content);
  console.log(`Repaired ${file}`);
}
