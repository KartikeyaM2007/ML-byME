/**
 * Attach to Chrome started with --remote-debugging-port=9222 (logged into tensortonic.com).
 * Captures API JSON + per-problem page text from the live session.
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/data');
const API_DUMP = path.join(OUT_DIR, 'captured_apis.json');
const PROBLEMS_OUT = path.join(OUT_DIR, 'problemDetails.scraped.json');

function loadSlugs() {
  const src = fs.readFileSync(path.join(OUT_DIR, 'tensortonic.ts'), 'utf8');
  const slugs = [...src.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(slugs)];
}

(async () => {
  const res = await fetch('http://127.0.0.1:9222/json/version');
  const { webSocketDebuggerUrl } = await res.json();
  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  let page = pages.find((p) => p.url().includes('tensortonic.com'));
  if (!page) {
    console.error('No tensortonic.com tab found. Open https://www.tensortonic.com in the debug Chrome window.');
    browser.disconnect();
    process.exit(1);
  }

  console.log('Using tab:', page.url());

  const captured = [];
  const onResponse = async (response) => {
    const url = response.url();
    if (!url.includes('tensortonic.com')) return;
    const type = response.headers()['content-type'] || '';
    if (!type.includes('json') && !url.includes('/api/') && !url.includes('trpc')) return;
    try {
      const text = await response.text();
      if (text.length < 20 || text.length > 5_000_000) return;
      captured.push({ url, status: response.status(), body: text });
      console.log('  API:', url.slice(0, 120), `(${text.length} bytes)`);
    } catch {
      /* body unavailable */
    }
  };
  page.on('response', onResponse);

  console.log('Reloading /problems to capture list APIs...');
  await page.goto('https://www.tensortonic.com/problems', {
    waitUntil: 'networkidle2',
    timeout: 120000,
  });
  await new Promise((r) => setTimeout(r, 3000));

  const slugs = loadSlugs();
  const limit = Number(process.env.SCRAPE_LIMIT || '10');
  const toScrape = slugs.slice(0, limit);
  const problemRows = [];

  for (let i = 0; i < toScrape.length; i++) {
    const slug = toScrape[i];
    const url = `https://www.tensortonic.com/problems/${slug}`;
    console.log(`[${i + 1}/${toScrape.length}] ${slug}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
      await new Promise((r) => setTimeout(r, 1500));

      const row = await page.evaluate((s) => {
        const next = document.querySelector('#__NEXT_DATA__');
        let nextData = null;
        if (next) {
          try {
            nextData = JSON.parse(next.textContent);
          } catch {
            /* ignore */
          }
        }

        const title =
          document.querySelector('h1')?.textContent?.trim() ||
          document.title.replace(/\s*\|.*$/, '').trim();

        let difficulty = 'Medium';
        for (const el of document.querySelectorAll('[class*="diff"], span, div')) {
          const t = el.textContent?.trim();
          if (t === 'Easy' || t === 'Medium' || t === 'Hard') {
            difficulty = t;
            break;
          }
        }

        const categories = [];
        document.querySelectorAll('a[href*="/problems"], [class*="badge"], [class*="tag"]').forEach((el) => {
          const t = el.textContent?.trim();
          if (t && t.length < 40 && !['Easy', 'Medium', 'Hard', 'Description', 'Theory'].includes(t)) {
            categories.push(t);
          }
        });

        let prompt = '';
        const article = document.querySelector('article') || document.querySelector('main');
        if (article) {
          const clone = article.cloneNode(true);
          clone.querySelectorAll('nav, aside, button, textarea, .monaco-editor').forEach((n) => n.remove());
          prompt = (clone.innerText || '').trim().slice(0, 12000);
        }

        let starterCode = '';
        const lines = document.querySelectorAll('.view-line');
        if (lines.length) {
          starterCode = Array.from(lines)
            .map((l) => l.textContent.replace(/\u00a0/g, ' '))
            .join('\n');
        }

        return {
          slug: s,
          title,
          difficulty,
          categories: [...new Set(categories)].slice(0, 8),
          prompt,
          starterCode,
          url: location.href,
          scraped: true,
          hasNextData: !!nextData,
          nextDataKeys: nextData ? Object.keys(nextData) : [],
        };
      }, slug);

      if (row.prompt && row.prompt.length > 80) {
        problemRows.push(row);
        console.log('  OK:', row.title?.slice(0, 60));
      } else {
        console.log('  WARN: thin content for', slug);
      }
    } catch (err) {
      console.log('  ERR:', err.message);
    }
  }

  page.off('response', onResponse);
  fs.writeFileSync(API_DUMP, JSON.stringify(captured, null, 2));
  fs.writeFileSync(PROBLEMS_OUT, JSON.stringify(problemRows, null, 2));
  console.log(`\nSaved ${captured.length} API responses -> ${API_DUMP}`);
  console.log(`Saved ${problemRows.length} problems -> ${PROBLEMS_OUT}`);

  browser.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
