const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '../src/data');
const TONIC_PATH = path.join(DATA, 'tensortonic.ts');

function stripHtml(s) {
  if (s == null) return '';
  if (Array.isArray(s)) return s.map(stripHtml).join('\n\n');
  return String(s)
    .replace(/<span[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x22;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\\_/g, '_')
    .trim();
}

const oldSrc = fs.readFileSync(TONIC_PATH, 'utf8');
const studyPlansMatch = oldSrc.match(/export const studyPlans = (\[[\s\S]*?\]) as const;/);
const categoriesMatch = oldSrc.match(/export const problemCategories = (\[[\s\S]*?\]) as const;/);

const list = JSON.parse(fs.readFileSync(path.join(DATA, 'tensortonic.api.json'), 'utf8'));
const details = JSON.parse(fs.readFileSync(path.join(DATA, 'problemDetails.api.json'), 'utf8'));

const cleaned = details.map((d) => ({
  slug: d.slug,
  title: stripHtml(d.title),
  url: d.url,
  difficulty: d.difficulty,
  categories: d.categories || [],
  prompt: stripHtml(d.prompt),
  examples: stripHtml(d.examples),
  hints: stripHtml(d.hints),
  requirements: stripHtml(d.requirements),
  constraints: stripHtml(d.constraints),
  starterCode: d.starterCode || '',
  theory: stripHtml(d.theory || ''),
  solution: stripHtml(d.solution || ''),
  scraped: true,
}));

const tonicTs = `export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type TonicProblem = {
  id: number;
  slug: string;
  title: string;
  categories: string[];
  difficulty: Difficulty;
};

export const studyPlans = ${studyPlansMatch?.[1] || '[]'} as const;

export const problemCategories = ${categoriesMatch?.[1] || '[]'} as const;

export const tonicProblems: TonicProblem[] = ${JSON.stringify(
  list.map((p, idx) => ({
    id: typeof p.id === 'number' ? p.id : idx + 1,
    slug: p.slug || p.id,
    title: stripHtml(p.title),
    categories: p.categories || p.tags || [],
    difficulty: p.difficulty || 'Medium',
  })),
  null,
  2,
)};
`;

const detailsTs = `export type ProblemDetailData = {
  slug: string;
  title: string;
  url: string;
  difficulty: string;
  categories: string[];
  statement?: string;
  prompt?: string;
  examples?: string;
  hints?: string;
  requirements?: string;
  constraints?: string;
  starterCode?: string;
  theory?: string;
  solution?: string;
  scraped?: boolean;
};

export const problemDetails: ProblemDetailData[] = ${JSON.stringify(cleaned, null, 2)};
`;

fs.writeFileSync(TONIC_PATH, tonicTs);
fs.writeFileSync(path.join(DATA, 'problemDetails.ts'), detailsTs);
fs.writeFileSync(path.join(DATA, 'problemDetails.json'), JSON.stringify(cleaned, null, 2));

console.log(`Merged ${list.length} problems and ${cleaned.length} details into src/data/`);
