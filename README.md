# TensorTonic (local)

ML coding practice platform — local replica with problems, research tracks, study plans, and Python grading.

## Local development

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:5173
npm run backend      # http://localhost:3001
```

## Deploy (Vercel + Render)

**Full guide:** [DEPLOY_VERCEL_RENDER.md](./DEPLOY_VERCEL_RENDER.md)

1. **Render** — deploy repo with `Dockerfile` (API + Python + SQLite)
2. **Vercel** — deploy same repo; set build env `VITE_API_URL=https://YOUR-API.onrender.com`
3. Set Render `CORS_ORIGIN` to your `https://*.vercel.app` URL

Configs included: `vercel.json`, `render.yaml`, `Dockerfile`, `netlify.toml`

## Production (single host)

```bash
npm run start
# → http://localhost:3001 (SPA + API)
```

Or: `docker compose up --build`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Production frontend build |
| `npm run test:all` | Data + build + smoke tests |
| `npm run setup:content` | Regenerate problem/study content |

## Stack

- Vite + React + TypeScript
- Express + SQLite + Python (NumPy) for Run/Submit
