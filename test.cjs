const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scraper/deep_pages_data.json', 'utf8'));
const p = data.find(p => p.url.includes('pandas-basics'));
console.log(p.markdown.includes('sections') ? 'Has sections' : 'No sections');
