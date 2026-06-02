const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scraper/deep_pages_data.json', 'utf8'));
const result = {};

data.forEach(p => {
  if (!p.url.includes('/study-plans/')) return;
  const m = p.markdown;
  const slugMatch = p.url.match(/\/study-plans\/([^\/]+)/);
  if (!slugMatch) return;
  const slug = slugMatch[1];
  
  // The JSON is embedded in a string, so there are escaped quotes like \"
  // It probably looks like "sections":[{...}]
  const searchStr = '\\"sections\\":[';
  const start = m.indexOf(searchStr);
  if (start !== -1) {
    let bracketCount = 1;
    let i = start + searchStr.length;
    while (i < m.length && bracketCount > 0) {
      if (m[i] === '[' && m[i-1] !== '\\') bracketCount++;
      if (m[i] === ']' && m[i-1] !== '\\') bracketCount--;
      i++;
    }
    const extracted = '[' + m.substring(start + searchStr.length, i);
    // Unescape the JSON string
    try {
      const unescaped = extracted.replace(/\\\\"/g, '"').replace(/\\\\/g, '\\');
      // Some titles have HTML like <span ...>, we might need to clean it up later.
      result[slug] = JSON.parse(unescaped);
    } catch (e) {
      console.log('Error parsing JSON for', slug);
      // Fallback: try removing HTML from the raw string before parsing if needed, but let's see if it parses.
    }
  }
});

fs.writeFileSync('src/data/studyPlanSections.json', JSON.stringify(result, null, 2));
console.log('Done extracting sections.');
