# Deploy: Vercel (frontend) + Render (API)

Split layout:

| Service | Hosts | Run/Submit |
|---------|--------|------------|
| **Vercel** | React SPA (`dist/`) | No Python here |
| **Render** | Express + SQLite + **Python** | Yes |

Deploy **Render first**, then **Vercel** (you need the API URL for the frontend build).

---

## 1. Render — API (Docker)

1. Push this repo to GitHub.
2. [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint** (uses `render.yaml`)  
   **or** **New Web Service** → connect repo → **Docker** → Dockerfile path: `./Dockerfile`
3. Settings:
   - **Health check path:** `/api/health`
   - **Instance:** Free works (cold start ~30–60s after idle)
4. **Environment variables:**

   | Key | Value |
   |-----|--------|
   | `NODE_ENV` | `production` |
   | `PYTHON` | `python3` |
   | `CORS_ORIGIN` | `https://YOUR-APP.vercel.app` (set after Vercel deploy; use `*` only for testing) |

5. Deploy. Copy your service URL, e.g. `https://tensortonic-api.onrender.com`
6. Test: `https://YOUR-API.onrender.com/api/health` → `{"ok":true,...}`

**Note:** Render sets `PORT` automatically; the app reads `process.env.PORT`.

**Persistence:** Free tier SQLite lives in the container filesystem and can reset on redeploy. For real persistence, add a Render disk or external DB later.

---

## 2. Vercel — frontend

1. [Vercel](https://vercel.com) → **Add Project** → import the same repo.
2. **Framework preset:** Vite  
3. **Build & output:**

   | Setting | Value |
   |---------|--------|
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

4. **Environment variables** (required — baked in at build time):

   | Key | Value |
   |-----|--------|
   | `VITE_API_URL` | `https://YOUR-API.onrender.com` (no trailing slash) |

5. Deploy. Your site will be e.g. `https://tensortonic.vercel.app`
6. Update Render `CORS_ORIGIN` to that exact Vercel URL (including `https://`) and **redeploy** the API if you used `*` earlier.

`vercel.json` is already included for SPA routing (`/problems/...`, `/research/...`).

---

## 3. Verify

1. Open Vercel URL → home, problems, research load.
2. Open a problem → edit code → **Run** / **Submit**.
3. If Run fails:
   - Browser devtools → Network: calls should go to `https://YOUR-API.onrender.com/api/...`
   - Not `localhost:3001`
   - Check CORS and that Render service is awake (hit `/api/health` first).

```bash
curl https://YOUR-API.onrender.com/api/health
node scraper/test_run_submit.js https://YOUR-API.onrender.com
```

---

## 4. Local dev (unchanged)

```bash
cp .env.example .env   # VITE_API_URL=http://localhost:3001
npm run dev
npm run backend
```

---

## Limitations on free tiers

- **Render free:** sleeps after inactivity; first request is slow.
- **Vercel:** static frontend only; no server-side grading.
- **Grading:** only 5 problems have full tests; others use light syntax checks (see main README / prior notes).
- **Security:** user Python runs on Render — acceptable for a demo; tighten for public production.

---

## Quick reference

```
Browser  →  Vercel (SPA)
              ↓  VITE_API_URL
           Render (API + Python + SQLite)
```
