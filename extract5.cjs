const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scraper/deep_pages_data.json', 'utf8'));
const result = {};

data.forEach(p => {
  if (!p.url.includes('/study-plans/')) return;
  const slugMatch = p.url.match(/\/study-plans\/([^\/]+)/);
  if (!slugMatch) return;
  const slug = slugMatch[1];
  
  const m = p.markdown;
  const idx = m.indexOf('sections\\\\":');
  if (idx === -1) return;
  
  let start = m.indexOf('\\\\\\[', idx);
  if (start === -1) start = m.indexOf('\\[', idx);
  if (start === -1) start = m.indexOf('[', idx);
  if (start === -1) return;

  let i = start;
  while(m[i] === '\\') i++; 
  i++;
  let bracketCount = 1;
  while(i < m.length && bracketCount > 0) {
    if (m[i] === '\\') {
      if (m[i+1] === '[') bracketCount++;
      if (m[i+1] === ']') bracketCount--;
      i += 2;
      continue;
    }
    if (m[i] === '[') bracketCount++;
    if (m[i] === ']') bracketCount--;
    i++;
  }
  
  let extracted = m.substring(start, i);
  extracted = extracted.replace(/\\\\\\[/g, '[').replace(/\\\\\\]/g, ']');
  extracted = extracted.replace(/\\\\"/g, '"');
  extracted = extracted.replace(/\\\\\\\\/g, '\\');
  if(extracted.startsWith('\\[')) extracted = extracted.substring(1);
  
  try {
    const parsed = JSON.parse(extracted);
    result[slug] = parsed;
  } catch(e) {
    console.log('Error parsing', slug);
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
console.log('Successfully generated src/data/studyPlanSections.ts');
