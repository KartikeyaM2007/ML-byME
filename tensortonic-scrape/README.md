# TensorTonic frontend asset scrape

Downloads JS/CSS/images from the live site for analysis (terrain uses **Three.js r181** on canvas).

```bash
npm install
npx playwright install chromium
npm run scrape
npm run grep
```

Output: `output/` — see `canvas-info.json`, `assets.json`, `homepage.png`, `rendered.html`.

Findings from scrape:

- Home background: **2× canvas** with `data-engine="three.js r181"`
- Three.js bundles: `_next/static/chunks/b536a0f1-*.js`, `bd904a5c-*.js`
- Home page chunk: `_next/static/chunks/app/(main)/page-*.js`

The local app uses `three` in `src/TerrainCanvas.tsx` (hero-only WebGL) instead of bundling Next chunks.
