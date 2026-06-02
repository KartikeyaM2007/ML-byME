const fs = require('fs');

const cssPath = 'C:/Users/USER/.gemini/antigravity-ide/brain/4c94ae50-0900-4e4f-8898-31bd7616da90/.system_generated/steps/2997/content.md';
const content = fs.readFileSync(cssPath, 'utf8');

// The CSS is in one giant line. We need to find all brand-containing tokens
// by splitting at } and finding those that include 'brand'
const parts = content.split('}');
const brandParts = parts.filter(p => p.includes('brand'));
const brandRules = brandParts.map(p => p + '}');
console.log(`Found ${brandRules.length} brand rules`);
if (brandRules.length > 0) {
    console.log('Sample:', brandRules[0].substring(0, 200));
}
fs.writeFileSync('../src/brand.css', brandRules.join('\n'));
console.log('Written to brand.css');
