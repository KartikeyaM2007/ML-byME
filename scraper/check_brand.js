const fs = require('fs');
const c = fs.readFileSync('../src/Home.tsx','utf8');
const matches = Array.from(c.matchAll(/className="([^"]+)"/g)).map(m => m[1]);
const classes = new Set(matches.flatMap(m => m.split(' ')));
const brand = [...classes].filter(cls => cls.includes('brand'));
console.log("Brand classes in Home.tsx:");
console.log(brand.join('\n'));

// Also check if they exist in style.css
const css = fs.readFileSync('../src/style.css', 'utf8');
const missing = brand.filter(cls => !css.includes(cls.replace('/', '\\/').replace('[', '\\[').replace(']', '\\]')));
console.log("\nMissing from style.css:", missing.join(', ') || 'none');
