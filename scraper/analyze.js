const fs = require('fs');

const pages = ['home', 'research', 'ml-math', 'problems', 'cuda-basics'];
const results = {};

for (const p of pages) {
    const file = `tensortonic_dom_${p}.html`;
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const classMatches = content.match(/class="([^"]+)"/g) || [];
        const classes = classMatches.map(c => c.replace('class="', '').replace('"', '')).join(' ').split(/\s+/).filter(Boolean);
        results[p] = {
            size: content.length,
            uniqueClasses: [...new Set(classes)].length
        };
    }
}

console.log(JSON.stringify(results, null, 2));
