const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

const TARGET = process.argv[2] || 'https://www.tensortonic.com/';
const OUT_DIR = path.join(__dirname, 'output');

function safeName(url, contentType = '') {
  const parsed = new URL(url);
  let pathname = parsed.pathname === '/' ? '/index.html' : parsed.pathname;

  let ext = path.extname(pathname);
  if (!ext) {
    if (contentType.includes('javascript')) ext = '.js';
    else if (contentType.includes('css')) ext = '.css';
    else if (contentType.includes('html')) ext = '.html';
    else if (contentType.includes('image/png')) ext = '.png';
    else if (contentType.includes('image/jpeg')) ext = '.jpg';
    else if (contentType.includes('image/svg')) ext = '.svg';
    else if (contentType.includes('font')) ext = '.woff2';
    else ext = '.bin';
  }

  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
  const clean = pathname
    .replace(/^\/+/, '')
    .replace(/[?&=:]/g, '_')
    .replace(/\/$/g, '');

  return `${clean || 'asset'}_${hash}${ext}`;
}

(async () => {
  await fs.ensureDir(OUT_DIR);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  const assets = [];
  const seen = new Set();

  page.on('response', async (response) => {
    try {
      const url = response.url();
      if (seen.has(url)) return;
      const contentType = response.headers()['content-type'] || '';

      if (
        url.startsWith('data:') ||
        url.includes('chrome-extension') ||
        response.status() >= 400
      ) {
        return;
      }

      if (
        contentType.includes('javascript') ||
        contentType.includes('css') ||
        contentType.includes('image') ||
        contentType.includes('font') ||
        contentType.includes('html') ||
        url.includes('_next') ||
        url.includes('assets') ||
        url.includes('tensortonic')
      ) {
        seen.add(url);
        const buffer = await response.body();
        const filename = safeName(url, contentType);
        const filepath = path.join(OUT_DIR, filename);

        await fs.outputFile(filepath, buffer);

        assets.push({ url, contentType, filename, size: buffer.length });
        console.log('saved:', filename, `(${buffer.length} bytes)`);
      }
    } catch (err) {
      console.log('skip:', err.message);
    }
  });

  console.log('Loading', TARGET);
  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: path.join(OUT_DIR, 'homepage.png'),
    fullPage: false,
  });

  const html = await page.content();
  await fs.writeFile(path.join(OUT_DIR, 'rendered.html'), html);

  const canvasInfo = await page.evaluate(() => {
    const canvases = [...document.querySelectorAll('canvas')].map((c) => ({
      w: c.width,
      h: c.height,
      engine: c.getAttribute('data-engine'),
      className: c.className,
      parentClass: c.parentElement?.className?.slice(0, 80),
    }));
    return { canvases, scripts: [...document.querySelectorAll('script[src]')].map((s) => s.src) };
  });

  await fs.writeJson(path.join(OUT_DIR, 'canvas-info.json'), canvasInfo, { spaces: 2 });
  await fs.writeJson(path.join(OUT_DIR, 'assets.json'), assets, { spaces: 2 });

  console.log('\nDone.', assets.length, 'assets in', OUT_DIR);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
