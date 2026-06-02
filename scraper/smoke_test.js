/**
 * Smoke-test key routes on the local dev server (default :5173).
 * Usage: node scraper/smoke_test.js [baseUrl]
 */
const puppeteer = require('puppeteer');

const BASE = process.argv[2] || 'http://localhost:5173';

const routes = [
  { path: '/', expect: ['Learn', 'Start Learning', 'Platform'] },
  { path: '/problems', expect: ['Problems', 'sigmoid'] },
  { path: '/problems/sigmoid-numpy', expect: ['Sigmoid', 'Run'] },
  { path: '/problems/transformers-tokenization', expect: ['Transformer Tokenization', 'tokenize'] },
  { path: '/research', expect: ['Research Papers', 'Attention'] },
  { path: '/research/transformer', expect: ['Tokenization', 'transformer'] },
  { path: '/study-plans', expect: ['Study Plans', 'CUDA'] },
  { path: '/study-plans/cuda-basics', expect: ['CUDA', 'sections'] },
  { path: '/study-plans/cuda-basics', expect: ['CUDA', 'sections'] },
  { path: '/ml-math', expect: ['Math'] },
  { path: '/interview-prep', expect: ['Interview'] },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const failures = [];

  for (const { path, expect } of routes) {
    const url = `${BASE}${path}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => document.body?.innerText?.length > 50, { timeout: 15000 });
      const text = await page.evaluate(() => document.body.innerText);
      const html = await page.content();
      for (const needle of expect) {
        const ok = text.toLowerCase().includes(needle.toLowerCase()) || html.includes(needle);
        if (!ok) failures.push({ path, missing: needle });
      }
      if (path === '/') {
        await page.evaluate(() => {
          const btn = [...document.querySelectorAll('.landing-page button')].find((b) =>
            (b.textContent || '').includes('Start Learning'),
          );
          if (btn) btn.click();
        });
        try {
          await page.waitForFunction(() => location.pathname === '/problems', { timeout: 8000 });
        } catch {
          /* optional nav test */
        }
      }
      console.log('OK', path);
    } catch (e) {
      failures.push({ path, error: e.message });
      console.error('FAIL', path, e.message);
    }
  }

  await browser.close();
  if (failures.length) {
    console.error('\nFailures:', JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log('\nAll smoke tests passed.');
})();
