/**
 * Full feature verification against local dev server.
 * Usage: node scraper/feature_test.js [baseUrl]
 */
const puppeteer = require('puppeteer');

const BASE = process.argv[2] || 'http://localhost:5173';

const routes = [
  { name: 'Home', path: '/', expect: ['Start Learning', 'Platform'] },
  { name: 'Problems list', path: '/problems', expect: ['Problems', 'Sigmoid', 'Easy'] },
  { name: 'Problem sigmoid', path: '/problems/sigmoid-numpy', expect: ['Sigmoid', 'Run', 'Submit'] },
  { name: 'Problem tokenization', path: '/problems/transformers-tokenization', expect: ['Transformer Tokenization', 'tokenize'] },
  { name: 'Invalid problem', path: '/problems/this-slug-does-not-exist-xyz', expect: ['not found'], reject: ['Implement Sigmoid'] },
  { name: 'Research hub', path: '/research', expect: ['Research Papers', 'Attention'] },
  { name: 'Research transformer', path: '/research/transformer', expect: ['Tokenization', 'Implementation track'] },
  { name: 'Study plans', path: '/study-plans', expect: ['Study Plans', 'CUDA', 'Cracking'] },
  { name: 'Study plan detail', path: '/study-plans/cuda-basics', expect: ['CUDA', 'section'] },
  { name: 'ML Math hub', path: '/ml-math', expect: ['Math', 'Statistics'] },
  { name: 'Math lesson', path: '/ml-math/statistics/p-value', expect: ['P Value', 'Intuition'] },
  { name: 'Interview prep', path: '/interview-prep', expect: ['Interview', 'Data Scientist', 'unlocked'] },
  { name: 'Leaderboard', path: '/leaderboard', expect: ['Leaderboard'] },
  { name: 'Dashboard', path: '/dashboard', expect: ['Dashboard'] },
  { name: 'IDE', path: '/ide', expect: ['Browser IDE'] },
  { name: 'Feedback', path: '/feedback', expect: ['Feedback'] },
  { name: 'Runtime stub', path: '/runtime', expect: ['Local Runtime'] },
  { name: 'Unknown route', path: '/totally-unknown-page', expect: ['Page not found'] },
];

const interactions = [
  {
    name: 'Home → Problems via Start Learning',
    async run(page) {
      await page.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.evaluate(() => {
        const btn = [...document.querySelectorAll('button')].find((b) =>
          (b.textContent || '').includes('Start Learning'),
        );
        if (btn) btn.click();
      });
      await page.waitForFunction(() => location.pathname === '/problems', { timeout: 10000 });
    },
  },
  {
    name: 'Research Tokenization → problem page',
    async run(page) {
      await page.goto(`${BASE}/research/transformer`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.evaluate(() => {
        const btn = [...document.querySelectorAll('button')].find((b) =>
          (b.textContent || '').includes('Tokenization'),
        );
        if (btn) btn.click();
      });
      await page.waitForFunction(
        () => location.pathname === '/problems/transformers-tokenization',
        { timeout: 10000 },
      );
      const text = await page.evaluate(() => document.body.innerText);
      if (!text.includes('Transformer Tokenization')) throw new Error('Wrong problem after Tokenization click');
      if (text.includes('Implement Sigmoid')) throw new Error('Sigmoid fallback after Tokenization click');
    },
  },
  {
    name: 'Problem tabs (Description / Theory)',
    async run(page) {
      await page.goto(`${BASE}/problems/sigmoid-numpy`, { waitUntil: 'networkidle2', timeout: 30000 });
      const tabs = await page.$$eval('button', (btns) =>
        btns.map((b) => b.textContent?.trim()).filter((t) => ['Theory', 'Solution', 'Submissions', 'Notes'].includes(t)),
      );
      if (!tabs.length) throw new Error('Problem workspace tabs not found');
      await page.evaluate(() => {
        const t = [...document.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Theory');
        if (t) t.click();
      });
      await new Promise((r) => setTimeout(r, 500));
      const text = await page.evaluate(() => document.body.innerText);
      if (!text.includes('Concept overview')) throw new Error('Theory tab has no content');
    },
  },
  {
    name: 'Interview item opens problem',
    async run(page) {
      await page.goto(`${BASE}/interview-prep`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.evaluate(() => {
        const row = [...document.querySelectorAll('.section-item-row-1to1')].find((el) =>
          (el.textContent || '').includes('Sigmoid'),
        );
        if (row) row.click();
      });
      await page.waitForFunction(() => location.pathname.includes('/problems/'), { timeout: 10000 });
    },
  },
  {
    name: 'Explore → ML Math',
    async run(page) {
      await page.goto(`${BASE}/problems`, { waitUntil: 'networkidle2', timeout: 30000 });
      const exploreBtn = await page.waitForFunction(
        () =>
          [...document.querySelectorAll('.nav-1to1 button')].find((b) =>
            (b.textContent || '').includes('Explore'),
          ),
        { timeout: 10000 },
      );
      await exploreBtn.click();
      await page.waitForSelector('.explore-dropdown-1to1', { timeout: 5000 });
      await page.evaluate(() => {
        const item = [...document.querySelectorAll('.explore-item-1to1')].find((el) =>
          (el.textContent || '').includes('ML Math'),
        );
        if (!item) throw new Error('ML Math explore item not found');
        item.click();
      });
      await page.waitForFunction(() => location.pathname === '/ml-math', { timeout: 10000 });
    },
  },
  {
    name: 'Problems difficulty filter',
    async run(page) {
      await page.goto(`${BASE}/problems`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.evaluate(() => {
        const easy = [...document.querySelectorAll('button')].find((b) => b.textContent?.trim() === 'Easy');
        if (easy) easy.click();
      });
      await new Promise((r) => setTimeout(r, 300));
    },
  },
];

function textOk(text, html, expect, reject = []) {
  for (const needle of expect) {
    const ok =
      text.toLowerCase().includes(needle.toLowerCase()) || html.toLowerCase().includes(needle.toLowerCase());
    if (!ok) return { ok: false, missing: needle };
  }
  for (const bad of reject || []) {
    if (text.includes(bad) || html.includes(bad)) return { ok: false, reject: bad };
  }
  return { ok: true };
}

(async () => {
  let browser;
  const failures = [];
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(5000) });
  } catch {
    console.error(`Dev server not reachable at ${BASE}. Run: npm run dev`);
    process.exit(1);
  }

  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('\n=== Route tests ===\n');
  for (const r of routes) {
    try {
      await page.goto(`${BASE}${r.path}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => document.body?.innerText?.length > 20, { timeout: 15000 });
      const text = await page.evaluate(() => document.body.innerText);
      const html = await page.content();
      const check = textOk(text, html, r.expect, r.reject);
      if (!check.ok) {
        failures.push({ test: r.name, ...check });
        console.error('FAIL', r.name, check.missing || check.reject);
      } else {
        console.log('OK', r.name);
      }
    } catch (e) {
      failures.push({ test: r.name, error: e.message });
      console.error('FAIL', r.name, e.message);
    }
  }

  console.log('\n=== Interaction tests ===\n');
  for (const ix of interactions) {
    try {
      await ix.run(page);
      console.log('OK', ix.name);
    } catch (e) {
      failures.push({ test: ix.name, error: e.message });
      console.error('FAIL', ix.name, e.message);
    }
  }

  await browser.close();

  console.log('\n=== Summary ===');
  const passed = routes.length + interactions.length - failures.length;
  const total = routes.length + interactions.length;
  console.log(`${passed}/${total} passed, ${failures.length} failed`);

  if (failures.length) {
    console.error(JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log('All feature tests passed.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
