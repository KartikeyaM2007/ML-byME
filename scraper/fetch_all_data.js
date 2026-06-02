/**
 * Fetch all public TensorTonic API data (no auth required).
 */
const fs = require('fs');
const path = require('path');

const API = 'https://api.tensortonic.com';
const SITE = 'https://www.tensortonic.com';
const OUT = path.join(__dirname, '../src/data');

async function get(url) {
  const r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`${url} ${r.status}`);
  return r.json();
}

function stripHtml(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, '')
    .replace(/^#\s*/, '')
    .trim();
}

function writeTsResearch(papers) {
  const body = `export type ResearchTopic = {
  id: string;
  name: string;
  description: string;
  color: string;
  sortOrder: number;
  problemId: string | null;
  isFree: boolean;
};

export type ResearchPaper = {
  id: string;
  title: string;
  authors: string;
  description: string;
  paperUrl: string;
  year: number;
  isLocked: boolean;
  sortOrder: number;
  architectureType?: string;
  visualizationComponent?: string;
  createdAt?: string;
  updatedAt?: string;
  topics: ResearchTopic[];
};

export const researchPapers: ResearchPaper[] = ${JSON.stringify(papers, null, 2)};
`;
  fs.writeFileSync(path.join(OUT, 'researchPapers.ts'), body);
}

function writeTsStudyPlans(plans) {
  const body = `export type StudyPlanMeta = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  difficulty: string;
  accentColor: string;
  category: string;
  estimatedDays: number;
  problemCount: number;
};

export const studyPlansMeta: StudyPlanMeta[] = ${JSON.stringify(plans, null, 2)};
`;
  fs.writeFileSync(path.join(OUT, 'studyPlansMeta.ts'), body);
}

function writeTsSections(sectionsByPlan) {
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
  fs.writeFileSync(path.join(OUT, 'studyPlanSections.ts'), body);
}

(async () => {
  const [research, plans, problems] = await Promise.all([
    get(`${API}/api/research-papers?include=topics`),
    get(`${API}/api/study-plans`),
    get(`${API}/api/problems/list`),
  ]);

  const papers = research.data || [];
  const planList = plans.data || [];
  const problemList = problems.data?.problems || problems.data || [];

  fs.writeFileSync(path.join(OUT, 'researchPapers.json'), JSON.stringify(papers, null, 2));
  fs.writeFileSync(path.join(OUT, 'studyPlans.api.json'), JSON.stringify(planList, null, 2));
  const tonicList = problemList.map((p, idx) => ({
    id: idx + 1,
    slug: p.id,
    title: stripHtml(p.title),
    categories: p.tags || [],
    difficulty: p.difficulty,
    sortOrder: p.sortOrder,
  }));
  fs.writeFileSync(path.join(OUT, 'tensortonic.api.json'), JSON.stringify(tonicList, null, 2));

  writeTsResearch(papers);
  writeTsStudyPlans(planList);
  console.log('research:', papers.length, 'plans:', planList.length, 'problems:', problemList.length);

  const sectionsByPlan = {};
  for (const plan of planList) {
    try {
      const sec = await get(`${SITE}/api/study-plans/${plan.id}/sections`);
      if (sec.data?.length) {
        sectionsByPlan[plan.id] = sec.data;
        console.log('sections', plan.id, sec.data.length);
      }
      await new Promise((r) => setTimeout(r, 80));
    } catch (e) {
      console.warn('sections failed', plan.id, e.message);
    }
  }

  fs.writeFileSync(path.join(OUT, 'studyPlanSections.json'), JSON.stringify(sectionsByPlan, null, 2));
  writeTsSections(sectionsByPlan);
  console.log('plans with sections:', Object.keys(sectionsByPlan).length);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
