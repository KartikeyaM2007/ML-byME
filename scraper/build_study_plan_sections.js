const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '../src/data');
const list = JSON.parse(fs.readFileSync(path.join(DATA, 'tensortonic.api.json'), 'utf8'));
const plans = JSON.parse(fs.readFileSync(path.join(DATA, 'studyPlans.api.json'), 'utf8'));

const planCategoryMap = {
  'pandas-basics': ['Data Processing', 'Feature Engineering'],
  'numpy-basics': ['Linear Algebra', 'Activation Functions', 'Optimization'],
  'pytorch-basics': ['Neural Networks', 'Optimization', 'Loss Functions', 'Activation Functions'],
  'sql-basics': ['Data Processing', 'Probability and Statistics'],
  'cuda-basics': ['Neural Networks', 'Linear Algebra'],
  'triton-basics': ['Neural Networks', 'Optimization'],
  'math-linear-algebra': ['Linear Algebra'],
  'math-probability': ['Probability and Statistics', 'Metrics & Evaluation'],
  'math-calculus': ['Optimization', 'Loss Functions'],
  'math-optimization': ['Optimization'],
  'cracking-ml': ['Classic ML', 'Metrics & Evaluation', 'Feature Engineering', 'Loss Functions'],
  'cracking-dl': ['Neural Networks', 'Optimization', 'Loss Functions', 'Activation Functions', 'Transformers'],
  'cracking-nlp': ['NLP', 'Transformers'],
  'cracking-rl': ['Reinforcement Learning'],
  'cracking-cv': ['CNN', 'Computer Vision', 'Vision'],
};

const sectionTitles = [
  'Foundations',
  'Core Techniques',
  'Applied Practice',
  'Advanced Topics',
  'Capstone',
];

function pickProblems(planId, count) {
  const cats = planCategoryMap[planId] || [];
  const sorted = [...list].sort((a, b) => {
    const aM = a.categories.some((c) => cats.includes(c)) ? 1 : 0;
    const bM = b.categories.some((c) => cats.includes(c)) ? 1 : 0;
    if (aM !== bM) return bM - aM;
    return a.id - b.id;
  });
  return sorted.slice(0, count);
}

const sectionsByPlan = {};

for (const plan of plans) {
  const count = plan.problemCount || 25;
  const problems = pickProblems(plan.id, count);
  const nSec = 5;
  const size = Math.ceil(problems.length / nSec) || 1;
  sectionsByPlan[plan.id] = Array.from({ length: nSec }, (_, i) => {
    const chunk = problems.slice(i * size, (i + 1) * size);
    if (!chunk.length) return null;
    const topCat = chunk[0]?.categories?.[0] || plan.title;
    return {
      id: `${plan.id}-sec-${i + 1}`,
      planId: plan.id,
      title: i === nSec - 1 ? 'Capstone' : sectionTitles[i] || `${topCat} · Part ${i + 1}`,
      sortOrder: i + 1,
      quizTitle: i === 2 ? `${plan.title} Checkpoint` : undefined,
      quizSlug: i === 2 ? undefined : undefined,
      problems: chunk.map((p, j) => ({
        slug: p.slug,
        title: p.title.replace(/^#+\s*/, '').replace(/<[^>]+>/g, '').trim(),
        difficulty: p.difficulty,
        sortOrder: j + 1,
        type: 'coding',
        isFree: true,
      })),
    };
  }).filter(Boolean);
}

const body = `export type SectionProblem = {
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

export const studyPlanSections: Record<string, StudyPlanSection[]> = ${JSON.stringify(sectionsByPlan, null, 2)};
`;

fs.writeFileSync(path.join(DATA, 'studyPlanSections.ts'), body);
console.log('Built sections for', Object.keys(sectionsByPlan).length, 'plans');
