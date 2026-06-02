const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUT = path.join(__dirname, '../src/data');
const API = 'https://api.tensortonic.com';

function stripHtml(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, '')
    .replace(/^#\s*/, '')
    .trim();
}

(async () => {
  let page = 1;
  let totalPages = 1;
  const all = [];
  while (page <= totalPages) {
    const r = await fetch(`${API}/api/problems/list?page=${page}&limit=50`);
    const j = await r.json();
    const { problems, pagination } = j.data;
    all.push(...problems);
    totalPages = pagination?.totalPages || 1;
    page += 1;
  }

  let list = all.map((p, idx) => ({
    id: idx + 1,
    slug: p.id,
    title: stripHtml(p.title),
    categories: p.tags || [],
    difficulty: p.difficulty,
  }));

  if (fs.existsSync(path.join(OUT, 'researchProblems.api.json'))) {
    const research = JSON.parse(fs.readFileSync(path.join(OUT, 'researchProblems.api.json'), 'utf8'));
    const slugs = new Set(list.map((p) => p.slug));
    let maxId = list.length;
    for (const d of research) {
      if (!slugs.has(d.slug)) {
        maxId += 1;
        list.push({
          id: maxId,
          slug: d.slug,
          title: d.title,
          categories: d.categories,
          difficulty: d.difficulty,
        });
        slugs.add(d.slug);
      }
    }
  }

  fs.writeFileSync(path.join(OUT, 'tensortonic.api.json'), JSON.stringify(list, null, 2));
  execSync('node merge_api_data.js', { cwd: __dirname, stdio: 'inherit' });
  console.log('Rebuilt', list.length, 'problems');
  const tok = list.find((p) => p.slug === 'transformers-tokenization');
  console.log('Tokenization:', tok);
})();
