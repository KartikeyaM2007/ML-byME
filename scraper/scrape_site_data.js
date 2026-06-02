/**
 * Fetch public API data via logged-in Chrome (port 9222).
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../src/data');
const API = 'https://api.tensortonic.com';

async function apiFetch(page, url) {
  return page.evaluate(async (u) => {
    const r = await fetch(u, { credentials: 'include', headers: { Accept: 'application/json' } });
    return { ok: r.ok, status: r.status, json: r.ok ? await r.json() : null };
  }, url);
}

(async () => {
  const res = await fetch('http://127.0.0.1:9222/json/version');
  const { webSocketDebuggerUrl } = await res.json();
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl, defaultViewport: null });
  const page = (await browser.pages()).find((p) => p.url().includes('tensortonic.com')) || (await browser.pages())[0];

  const research = await apiFetch(page, `${API}/api/research-papers?include=topics`);
  const studyPlans = await apiFetch(page, `${API}/api/study-plans`);
  const potd = await apiFetch(page, `${API}/api/potd`);

  const sectionsByPlan = {};
  if (studyPlans.json?.data) {
    for (const plan of studyPlans.json.data.slice(0, 20)) {
      const id = plan.id;
      const sec = await apiFetch(page, `${API}/api/study-plans/${id}/sections`);
      if (sec.json?.data) sectionsByPlan[id] = sec.json.data;
      await new Promise((r) => setTimeout(r, 120));
    }
  }

  if (research.json?.data) {
    fs.writeFileSync(path.join(OUT, 'researchPapers.json'), JSON.stringify(research.json.data, null, 2));
    console.log('research papers:', research.json.data.length);
  }
  if (studyPlans.json?.data) {
    fs.writeFileSync(path.join(OUT, 'studyPlans.api.json'), JSON.stringify(studyPlans.json.data, null, 2));
    console.log('study plans:', studyPlans.json.data.length);
  }
  if (Object.keys(sectionsByPlan).length) {
    fs.writeFileSync(path.join(OUT, 'studyPlanSections.json'), JSON.stringify(sectionsByPlan, null, 2));
    console.log('study plan sections for', Object.keys(sectionsByPlan).length, 'plans');
  }
  if (potd.json?.data) {
    fs.writeFileSync(path.join(OUT, 'potd.json'), JSON.stringify(potd.json.data, null, 2));
  }

  browser.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
