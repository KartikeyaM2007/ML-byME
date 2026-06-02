/**
 * Uses logged-in Chrome (port 9222) to call api.tensortonic.com with session cookies.
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../src/data');
const API_BASE = 'https://api.tensortonic.com';

function stripHtmlTitle(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/^#\s*/, '')
    .trim();
}

function mapDetail(slug, apiBody) {
  const d = apiBody?.data ?? apiBody;
  if (!d || typeof d !== 'object') return null;

  return {
    slug,
    title: stripHtmlTitle(d.title) || d.name || slug,
    difficulty: d.difficulty || 'Medium',
    categories: d.tags || d.categories || [],
    prompt: d.description || d.statement || d.prompt || d.content || '',
    examples: d.examples || '',
    hints: Array.isArray(d.hints) ? d.hints.join('\n\n') : d.hints || '',
    requirements: d.requirements || '',
    constraints: d.constraints || '',
    starterCode: d.starterCode || d.template || d.codeTemplate || '',
    url: `https://www.tensortonic.com/problems/${slug}`,
    scraped: true,
    raw: d,
  };
}

(async () => {
  const res = await fetch('http://127.0.0.1:9222/json/version');
  const { webSocketDebuggerUrl } = await res.json();
  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  const page = pages.find((p) => p.url().includes('tensortonic.com'));
  if (!page) {
    console.error('Open tensortonic.com in debug Chrome first.');
    browser.disconnect();
    process.exit(1);
  }

  const apiFetch = async (url) =>
    page.evaluate(async (u) => {
      const r = await fetch(u, { credentials: 'include', headers: { Accept: 'application/json' } });
      const text = await r.text();
      try {
        return { ok: r.ok, status: r.status, json: JSON.parse(text) };
      } catch {
        return { ok: r.ok, status: r.status, error: text.slice(0, 200) };
      }
    }, url);

  console.log('Fetching problem list (all pages)...');
  const allProblems = [];
  let pageNum = 1;
  let totalPages = 1;

  while (pageNum <= totalPages) {
    const listUrl = `${API_BASE}/api/problems/list?page=${pageNum}&limit=50`;
    const listRes = await apiFetch(listUrl);
    if (!listRes.ok || !listRes.json?.data?.problems) {
      console.error('List failed page', pageNum, listRes);
      break;
    }
    const { problems, pagination } = listRes.json.data;
    allProblems.push(...problems);
    totalPages = pagination?.totalPages || 1;
    console.log(`  page ${pageNum}/${totalPages}: +${problems.length} (total ${allProblems.length})`);
    pageNum += 1;
  }

  const slugs = allProblems.map((p) => p.id);
  const detailLimit = Number(process.env.DETAIL_LIMIT || '0');
  const toFetch = detailLimit > 0 ? slugs.slice(0, detailLimit) : slugs;

  console.log(`Fetching ${toFetch.length} problem details...`);
  const details = [];

  for (let i = 0; i < toFetch.length; i++) {
    const slug = toFetch[i];
    const detailUrl = `${API_BASE}/api/problems/${slug}`;
    const detailRes = await apiFetch(detailUrl);
    if (!detailRes.ok) {
      console.log(`  [${i + 1}] ${slug} HTTP ${detailRes.status}`);
      continue;
    }
    const mapped = mapDetail(slug, detailRes.json);
    if (mapped?.prompt || mapped?.starterCode) {
      details.push(mapped);
      console.log(`  [${i + 1}] OK ${slug}`);
    } else {
      console.log(`  [${i + 1}] thin ${slug}`, JSON.stringify(detailRes.json).slice(0, 120));
    }
    if (i % 10 === 9) await new Promise((r) => setTimeout(r, 300));
  }

  const tonicList = allProblems.map((p, idx) => ({
    id: idx + 1,
    slug: p.id,
    title: stripHtmlTitle(p.title),
    categories: p.tags || [],
    difficulty: p.difficulty,
  }));

  fs.writeFileSync(path.join(OUT, 'tensortonic.api.json'), JSON.stringify(tonicList, null, 2));
  fs.writeFileSync(
    path.join(OUT, 'problemDetails.api.json'),
    JSON.stringify(
      details.map(({ raw, ...rest }) => rest),
      null,
      2,
    ),
  );

  console.log(`\nWrote ${tonicList.length} problems -> tensortonic.api.json`);
  console.log(`Wrote ${details.length} details -> problemDetails.api.json`);

  browser.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
