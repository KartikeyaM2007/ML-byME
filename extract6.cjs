const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scraper/deep_pages_data.json', 'utf8'));
const result = {};

data.forEach(p => {
  if (!p.url.includes('/study-plans/')) return;
  const slugMatch = p.url.match(/\/study-plans\/([^\/]+)/);
  if (!slugMatch) return;
  const slug = slugMatch[1];
  
  let m = p.markdown;
  
  // The string has been JSON.stringified multiple times.
  // We can try to regex extract the sections array.
  
  // Find "sections":[...]
  const sectionsMatch = m.match(/\\?"sections\\?":(\[.*?\])(?:,\\?"isPro\\?":|,\\["a-zA-Z]+)/);
  if (sectionsMatch) {
    let raw = sectionsMatch[1];
    
    // Unescape repeatedly until it's valid JSON
    let parsed = null;
    let attempts = 0;
    while (!parsed && attempts < 5) {
      try {
        parsed = JSON.parse(raw);
        // Sometimes it parses into a string instead of an object, if so, parse again!
        if (typeof parsed === 'string') {
          raw = parsed;
          parsed = null;
        }
      } catch(e) {
        // If it fails, try unescaping
        raw = raw.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        // also nextjs [ escape
        raw = raw.replace(/\\\[/g, '[').replace(/\\\]/g, ']');
      }
      attempts++;
    }
    
    if (parsed && Array.isArray(parsed)) {
      result[slug] = parsed;
    } else {
      console.log('Failed to parse', slug);
    }
  } else {
    // Try simpler regex
    const m2 = m.match(/"sections":(\[.*?\])(?:,"isPro":|,"[a-zA-Z]+)/);
    if (m2) {
      try {
        let parsed = JSON.parse(m2[1]);
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        result[slug] = parsed;
      } catch(e) {}
    } else {
      console.log('Regex failed for', slug);
    }
  }
});

let tsCode = `export type SectionProblem = {
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sortOrder: number;
  type: string;
  isFree: boolean;
};

export type StudyPlanSection = {
  id: string;
  planId: string;
  title: string;
  sortOrder: number;
  quizTitle?: string;
  quizSlug?: string;
  problems: SectionProblem[];
};

export const studyPlanSections: Record<string, StudyPlanSection[]> = ${JSON.stringify(result, null, 2)};
`;

fs.writeFileSync('src/data/studyPlanSections.ts', tsCode);
console.log('Extracted', Object.keys(result).length);
