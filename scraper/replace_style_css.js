const fs = require('fs');

// The full TensorTonic CSS contains everything we need
// Replace style.css with the TensorTonic CSS + our custom styles on top

const tensortonic = fs.readFileSync('../src/tensortonic_full.css', 'utf8');
const brandCss = fs.readFileSync('../src/brand.css', 'utf8');

// Our existing custom styles (non-tailwind part) from original style.css
// The original style.css had some custom component styles we should keep
const originalStyle = fs.readFileSync('../src/style.css', 'utf8');

// Find where the brand.css section starts in style.css and get only our custom code
const brandSectionStart = originalStyle.indexOf('/* === TensorTonic Brand Colors === */');
const customCode = brandSectionStart > 0 ? originalStyle.substring(0, originalStyle.indexOf('\n*, ::before, ::after')) : '';

// Write new style.css = TensorTonic CSS + brand CSS + any custom styles
const newStyle = tensortonic + '\n\n/* === Brand Colors === */\n' + brandCss;
fs.writeFileSync('../src/style.css', newStyle);
console.log('Replaced style.css with TensorTonic full CSS (' + newStyle.length + ' bytes)');
