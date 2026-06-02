const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, '../src/style.css');
const fontImport = '@import url("https://fonts.cdnfonts.com/css/satoshi");';
let css = fs.readFileSync(stylePath, 'utf8');

css = css.replace(/@import\s+url\("https:\/\/fonts\.cdnfonts\.com\/css\/satoshi"\);?/g, '');

const brandMarker = '/* === Brand Colors === */';
let tail = '';
if (css.includes(brandMarker)) {
  const idx = css.indexOf(brandMarker);
  tail = '\n' + css.slice(idx).trim();
  css = css.slice(0, idx).trim();
}

css = `${fontImport}\n${css}${tail ? `\n${tail}` : ''}\n`;
fs.writeFileSync(stylePath, css);
console.log('Fixed style.css: @import moved to top');
