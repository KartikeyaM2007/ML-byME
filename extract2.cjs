const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scraper/deep_pages_data.json', 'utf8'));
const result = {};

data.forEach(p => {
  if (!p.url.includes('/study-plans/')) return;
  const slugMatch = p.url.match(/\/study-plans\/([^\/]+)/);
  if (!slugMatch) return;
  const slug = slugMatch[1];
  
  const m = p.markdown;
  // Look for the literal characters: \ " s e c t i o n s \ " : [
  // In a JS string, that's written as '\\"sections\\":['
  const idx = m.indexOf('\\"sections\\":[');
  if (idx !== -1) {
    let i = idx + 15; // length of `\\"sections\\":[`
    let bracketCount = 1;
    let inString = false;
    let escape = false;
    while (i < m.length && bracketCount > 0) {
      const char = m[i];
      if (!escape && char === '"') inString = !inString;
      if (!inString && !escape) {
        if (char === '[') bracketCount++;
        if (char === ']') bracketCount--;
      }
      escape = (char === '\\' && !escape);
      i++;
    }
    const extracted = '[' + m.substring(idx + 15, i);
    try {
      result[slug] = JSON.parse(extracted.replace(/\\\\"/g, '"').replace(/\\\\/g, '\\'));
    } catch(e) {
      console.log('Error parsing', slug);
    }
  } else {
    // try different encoding
    const idx2 = m.indexOf('"sections":[');
    if (idx2 !== -1) {
      // simpler
    }
  }
});
fs.writeFileSync('src/data/studyPlanSections.json', JSON.stringify(result, null, 2));
console.log('Found', Object.keys(result).length, 'sections');
