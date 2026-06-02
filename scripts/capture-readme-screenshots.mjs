/**
 * Capture README screenshots from local dev server.
 * Usage: node scripts/capture-readme-screenshots.mjs
 * Env: SCREENSHOT_BASE=http://localhost:5173 (default)
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'docs', 'screenshots');
const base = (process.env.SCREENSHOT_BASE || 'http://localhost:5173').replace(/\/$/, '');

const shots = [
  { file: 'home.png', path: '/', wait: 2500 },
  { file: 'problems.png', path: '/problems', wait: 2000 },
  { file: 'research.png', path: '/research', wait: 2000 },
  { file: 'study-plans.png', path: '/study-plans', wait: 2000 },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
  colorScheme: 'dark',
});

for (const shot of shots) {
  const page = await context.newPage();
  const url = `${base}${shot.path}`;
  console.log('Screenshot:', url, '→', shot.file);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(shot.wait);
  await page.screenshot({
    path: path.join(outDir, shot.file),
    type: 'png',
    fullPage: false,
  });
  await page.close();
}

await browser.close();
console.log('Done. Files in docs/screenshots/');
