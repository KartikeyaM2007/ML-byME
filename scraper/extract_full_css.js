const fs = require('fs');

const cssPath = 'C:/Users/USER/.gemini/antigravity-ide/brain/4c94ae50-0900-4e4f-8898-31bd7616da90/.system_generated/steps/2997/content.md';
let content = fs.readFileSync(cssPath, 'utf8');

// Get just the CSS part (after the markdown header)
const cssStart = content.indexOf('---\n') + 4;
const css = content.substring(cssStart).trim();

// Write it to a file
fs.writeFileSync('../src/tensortonic_full.css', css);
console.log('Written tensortonic_full.css (' + css.length + ' bytes)');
