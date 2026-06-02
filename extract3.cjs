const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scraper/deep_pages_data.json', 'utf8'));
const result = {};

data.forEach(p => {
  if (!p.url.includes('/study-plans/')) return;
  const slugMatch = p.url.match(/\/study-plans\/([^\/]+)/);
  if (!slugMatch) return;
  const slug = slugMatch[1];
  
  const m = p.markdown;
  
  // Find "sections": or \"sections\":
  const idx = m.indexOf('sections\\\\":');
  if (idx !== -1) {
    let start = m.indexOf('\\\\[', idx);
    if (start === -1) start = m.indexOf('[', idx);
    
    if (start !== -1) {
      let bracketCount = 1;
      let i = start + 1; // start after first bracket (could be `\\[` but we just look at the `[` or `\\[`
      if (m[start] === '\\') {
        i++; // skip the `[` part of `\\[`
      }
      
      let inString = false;
      let escape = false;
      while (i < m.length && bracketCount > 0) {
        const char = m[i];
        if (!escape && char === '"') inString = !inString;
        if (!inString && !escape) {
          if (char === '[') bracketCount++;
          if (char === ']') bracketCount--;
          if (char === '\\' && m[i+1] === '[') { bracketCount++; i++; }
          if (char === '\\' && m[i+1] === ']') { bracketCount--; i++; }
        }
        escape = (char === '\\' && !escape);
        i++;
      }
      let extracted = m.substring(start, i);
      // clean up Next.js escapes
      extracted = extracted.replace(/\\\\\\[/g, '[').replace(/\\\\\\]/g, ']');
      extracted = extracted.replace(/\\\\"/g, '"');
      extracted = extracted.replace(/\\\\\\\\/g, '\\');
      if(extracted.startsWith('\\[')) extracted = extracted.substring(1); // remove leading slash if any
      try {
        result[slug] = JSON.parse(extracted);
      } catch(e) {
        console.log('Error parsing', slug);
      }
    }
  }
});

fs.writeFileSync('src/data/studyPlanSections.json', JSON.stringify(result, null, 2));
console.log('Found', Object.keys(result).length, 'sections');
