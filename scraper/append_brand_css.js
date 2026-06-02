const fs = require('fs');

const brandCss = fs.readFileSync('../src/brand.css', 'utf8');
const styleFile = '../src/style.css';
let style = fs.readFileSync(styleFile, 'utf8');

// Add brand.css content to the end of style.css if not already present
if (!style.includes('bg-brand-primary')) {
    style += '\n/* === TensorTonic Brand Colors === */\n' + brandCss;
    fs.writeFileSync(styleFile, style);
    console.log('Appended brand CSS to style.css');
} else {
    console.log('Brand CSS already present');
}
