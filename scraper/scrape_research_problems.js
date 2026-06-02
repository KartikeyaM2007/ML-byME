/**
 * Add all research-paper problem tracks to tonicProblems + problemDetails.
 * Public API has no transformers-* slugs; we use topic metadata + curated specs.
 *
 * Live scrape (logged-in Chrome on port 9222):
 *   npm run scrape:research-cdp
 *   — or —  TRY_CDP=1 node scraper/scrape_research_problems.js
 *
 * Env: SCRAPE_LIMIT=10  (only first N slugs, for testing)
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUT = path.join(__dirname, '../src/data');
const SITE = 'https://www.tensortonic.com';
const API_BASE = 'https://api.tensortonic.com';
const USE_CDP =
  process.env.TRY_CDP === '1' || process.argv.includes('--cdp');

const CURATED = {
  'transformers-tokenization': {
    title: 'Transformer Tokenization',
    difficulty: 'Medium',
    categories: ['Transformers', 'NLP'],
    prompt: `Implement **tokenization** for a Transformer: convert raw text into a 1D NumPy array of token IDs.

Implement \`tokenize(text, vocab, unk_id=0)\`:
- Strip leading/trailing whitespace
- Split on whitespace
- Map each token with \`vocab: dict[str, int]\`; unknown tokens → \`unk_id\`
- Return \`np.ndarray\` dtype \`int32\``,
    examples:
      '**Example 1:** `"hello world"`, vocab `{"hello":1,"world":2}` → `[1,2]`\n\n**Example 2:** `"hello there"`, unk_id=0 → `[1,0]`',
    starterCode: `import numpy as np

def tokenize(text: str, vocab: dict[str, int], unk_id: int = 0) -> np.ndarray:
    """Convert text to token IDs; OOV -> unk_id."""
    pass
`,
  },
  'transformers-embedding': {
    title: 'Token Embedding Layer',
    difficulty: 'Medium',
    categories: ['Transformers', 'NLP'],
    prompt: `Implement the **embedding lookup** layer. Given \`token_ids\` of shape \`(batch, seq_len)\` and embedding matrix \`E\` of shape \`(vocab_size, d_model)\`, return shape \`(batch, seq_len, d_model)\`.`,
    starterCode: `import numpy as np

def embed(token_ids: np.ndarray, embedding_matrix: np.ndarray) -> np.ndarray:
    pass
`,
  },
  'transformers-positional-encoding': {
    title: 'Sinusoidal Positional Encoding',
    difficulty: 'Medium',
    categories: ['Transformers', 'NLP'],
    prompt: `Implement **sinusoidal positional encodings** (Attention Is All You Need). Return array shape \`(seq_len, d_model)\`.`,
    starterCode: `import numpy as np

def positional_encoding(seq_len: int, d_model: int) -> np.ndarray:
    pass
`,
  },
  'transformers-attention': {
    title: 'Scaled Dot-Product Attention',
    difficulty: 'Hard',
    categories: ['Transformers', 'NLP'],
    prompt: `Implement **scaled dot-product attention**: \`Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V\`.`,
    starterCode: `import numpy as np

def scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> np.ndarray:
    pass
`,
  },
  'transformers-multi-head-attention': {
    title: 'Multi-Head Attention',
    difficulty: 'Hard',
    categories: ['Transformers', 'NLP'],
    prompt: `Implement **multi-head attention** with \`num_heads\` parallel attention operations and output projection.`,
    starterCode: `import numpy as np

def multi_head_attention(x, num_heads, W_q, W_k, W_v, W_o):
    pass
`,
  },
  'transformers-feed-forward': {
    title: 'Position-wise Feed-Forward Network',
    difficulty: 'Medium',
    categories: ['Transformers', 'NLP'],
    prompt: `Implement the **position-wise FFN**: \`FFN(x) = ReLU(xW1+b1)W2+b2\` applied independently at each sequence position.`,
    starterCode: `import numpy as np

def positionwise_ffn(x, W1, b1, W2, b2):
    pass
`,
  },
  'transformers-layer-normalization': {
    title: 'Layer Normalization',
    difficulty: 'Medium',
    categories: ['Transformers', 'NLP'],
    prompt: `Implement **layer normalization** over the last dimension with learnable \`gamma\` and \`beta\`.`,
    starterCode: `import numpy as np

def layer_norm(x, gamma, beta, eps=1e-5):
    pass
`,
  },
  'transformers-encoder-block': {
    title: 'Transformer Encoder Block',
    difficulty: 'Hard',
    categories: ['Transformers', 'NLP'],
    prompt: `Implement one **Transformer encoder block** (self-attention + FFN + residuals + layer norm).`,
    starterCode: `import numpy as np

def encoder_block(x, self_attn, ffn, ln_params):
    pass
`,
  },
};

function stripHtml(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function collectProblemIds() {
  const src = fs.readFileSync(path.join(OUT, 'researchPapers.ts'), 'utf8');
  const ids = new Set();
  const re = /"problemId":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) ids.add(m[1]);
  return [...ids];
}

function topicMetaBySlug() {
  const papers = JSON.parse(fs.readFileSync(path.join(OUT, 'researchPapers.json'), 'utf8'));
  const map = {};
  for (const p of papers) {
    for (const t of p.topics || []) {
      if (t.problemId) map[t.problemId] = { ...t, paperTitle: p.title };
    }
  }
  return map;
}

function mapApiDetail(slug, apiBody) {
  const d = apiBody?.data ?? apiBody;
  if (!d || typeof d !== 'object') return null;
  return {
    slug,
    title: stripHtml(d.title) || d.name || slug,
    difficulty: d.difficulty || 'Medium',
    categories: d.tags || d.categories || [],
    prompt: stripHtml(d.description || d.statement || d.prompt || d.content || ''),
    examples: stripHtml(d.examples || ''),
    hints: Array.isArray(d.hints) ? d.hints.join('\n\n') : stripHtml(d.hints || ''),
    requirements: stripHtml(d.requirements || ''),
    constraints: stripHtml(d.constraints || ''),
    starterCode: d.starterCode || d.template || d.codeTemplate || '',
    url: `${SITE}/problems/${slug}`,
    scraped: true,
    synthetic: false,
  };
}

async function scrapeViaCdp(slugs) {
  const puppeteer = require('puppeteer');
  let versionRes;
  try {
    versionRes = await fetch('http://127.0.0.1:9222/json/version');
  } catch {
    console.warn('CDP: Nothing on port 9222. Run scripts/start-chrome-debug.ps1 and log in.');
    return {};
  }
  if (!versionRes.ok) {
    console.warn('CDP: Bad response from port 9222');
    return {};
  }

  const { webSocketDebuggerUrl } = await versionRes.json();
  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  const page = pages.find((p) => p.url().includes('tensortonic.com'));
  if (!page) {
    console.warn('CDP: Open https://www.tensortonic.com in the debug Chrome window and sign in.');
    browser.disconnect();
    return {};
  }

  console.log('CDP: Using tab', page.url());

  const apiFetch = (url) =>
    page.evaluate(async (u) => {
      const r = await fetch(u, { credentials: 'include', headers: { Accept: 'application/json' } });
      const text = await r.text();
      try {
        return { ok: r.ok, status: r.status, json: JSON.parse(text) };
      } catch {
        return { ok: r.ok, status: r.status, error: text.slice(0, 200) };
      }
    }, url);

  const limit = Number(process.env.SCRAPE_LIMIT || '0');
  const toScrape = limit > 0 ? slugs.slice(0, limit) : slugs;
  const scraped = {};

  for (let i = 0; i < toScrape.length; i++) {
    const slug = toScrape[i];
    const detailUrl = `${API_BASE}/api/problems/${slug}`;
    const detailRes = await apiFetch(detailUrl);
    if (detailRes.ok && detailRes.json) {
      const mapped = mapApiDetail(slug, detailRes.json);
      if (mapped?.prompt || mapped?.starterCode) {
        scraped[slug] = mapped;
        console.log(`CDP OK [${i + 1}/${toScrape.length}] ${slug} (API)`);
        continue;
      }
    }

    try {
      await page.goto(`${SITE}/problems/${slug}`, {
        waitUntil: 'networkidle2',
        timeout: 90000,
      });
      await new Promise((r) => setTimeout(r, 1500));

      const row = await page.evaluate((s) => {
        const title =
          document.querySelector('h1')?.textContent?.trim() ||
          document.title.replace(/\s*\|.*$/, '').trim();
        let difficulty = 'Medium';
        for (const el of document.querySelectorAll('span, div')) {
          const t = el.textContent?.trim();
          if (t === 'Easy' || t === 'Medium' || t === 'Hard') {
            difficulty = t;
            break;
          }
        }
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
        return { slug: s, title, difficulty, prompt, starterCode };
      }, slug);

      if (row.prompt && row.prompt.length > 80) {
        scraped[slug] = {
          slug,
          title: row.title,
          difficulty: row.difficulty,
          categories: [],
          prompt: row.prompt,
          examples: '',
          hints: '',
          requirements: '',
          constraints: '',
          starterCode: row.starterCode,
          url: `${SITE}/problems/${slug}`,
          scraped: true,
          synthetic: false,
        };
        console.log(`CDP OK [${i + 1}/${toScrape.length}] ${slug} (page)`);
      } else {
        console.log(`CDP miss ${slug}`);
      }
    } catch (err) {
      console.log(`CDP miss ${slug}`, err.message);
    }

    if (i % 5 === 4) await new Promise((r) => setTimeout(r, 400));
  }

  browser.disconnect();
  console.log(`CDP: Scraped ${Object.keys(scraped).length}/${toScrape.length} slugs`);
  return scraped;
}

const { buildRichDetail } = require('./problem_detail_generator');

function buildFallback(slug, meta) {
  const c = CURATED[slug];
  if (c) {
    return {
      slug,
      url: `${SITE}/problems/${slug}`,
      ...c,
      examples: c.examples || '',
      hints: 'Check tensor shapes at each step.',
      requirements: 'Use NumPy only unless stated otherwise. Vectorize when possible.',
      constraints: 'Time: 2s; Memory: 256MB',
      scraped: true,
    };
  }
  return buildRichDetail(slug, meta);
}

(async () => {
  const slugs = collectProblemIds();
  const topicMap = topicMetaBySlug();
  console.log('Slugs:', slugs.length);

  let cdpBySlug = {};
  if (USE_CDP) {
    cdpBySlug = await scrapeViaCdp(slugs);
  }

  const details = slugs.map((slug) => {
    const live = cdpBySlug[slug];
    const fallback = buildFallback(slug, topicMap[slug]);
    if (!live) return fallback;
    return {
      ...fallback,
      ...live,
      categories: live.categories?.length ? live.categories : fallback.categories,
      scraped: true,
      synthetic: false,
    };
  });

  fs.writeFileSync(path.join(OUT, 'researchProblems.api.json'), JSON.stringify(details, null, 2));
  console.log('Built', details.length, 'research problem specs');

  let list = [];
  try {
    list = JSON.parse(fs.readFileSync(path.join(OUT, 'tensortonic.api.json'), 'utf8'));
  } catch {
    const ts = fs.readFileSync(path.join(OUT, 'tensortonic.ts'), 'utf8');
    const m = ts.match(/export const tonicProblems: TonicProblem\[\] = (\[[\s\S]*?\]);/);
    if (m) list = JSON.parse(m[1]);
  }

  let existingDetails = [];
  if (fs.existsSync(path.join(OUT, 'problemDetails.api.json'))) {
    existingDetails = JSON.parse(fs.readFileSync(path.join(OUT, 'problemDetails.api.json'), 'utf8'));
  } else if (fs.existsSync(path.join(OUT, 'problemDetails.json'))) {
    existingDetails = JSON.parse(fs.readFileSync(path.join(OUT, 'problemDetails.json'), 'utf8'));
  }

  const slugSet = new Set(list.map((p) => p.slug || p.id));
  let maxId = list.reduce((m, p) => Math.max(m, p.id || 0), 0);

  for (const d of details) {
    const i = existingDetails.findIndex((x) => x.slug === d.slug);
    if (i >= 0) existingDetails[i] = { ...existingDetails[i], ...d };
    else existingDetails.push(d);

    if (!slugSet.has(d.slug)) {
      maxId += 1;
      list.push({ id: maxId, slug: d.slug, title: d.title, categories: d.categories, difficulty: d.difficulty });
      slugSet.add(d.slug);
    } else {
      const row = list.find((p) => (p.slug || p.id) === d.slug);
      if (row) {
        if (row.id == null || row.id === undefined) row.id = ++maxId;
        row.title = d.title;
        row.categories = d.categories;
        row.difficulty = d.difficulty;
      }
    }
  }

  fs.writeFileSync(path.join(OUT, 'tensortonic.api.json'), JSON.stringify(list, null, 2));
  fs.writeFileSync(path.join(OUT, 'problemDetails.api.json'), JSON.stringify(existingDetails, null, 2));
  execSync('node merge_api_data.js', { cwd: __dirname, stdio: 'inherit' });

  const tok = details.find((d) => d.slug === 'transformers-tokenization');
  console.log('Sample:', tok?.title, '|', tok?.prompt?.slice(0, 60));
})();
