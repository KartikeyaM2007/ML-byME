# Deploy TensorTonic

## Option A — Docker (recommended, full app + Run/Submit)

```bash
docker compose up --build -d
```

Open **http://localhost:3001** — API and SPA on one port. Requires Python 3 + NumPy in the image (included).

```bash
docker build -t tensortonic .
docker run -p 3001:3001 -e NODE_ENV=production tensortonic
```

## Option B — Node production server

```bash
npm install
npm run build
npm run start:api
```

Open **http://localhost:3001**. Leave `VITE_API_URL` unset in production builds so `/api/*` uses the same host.

## Option C — Vercel + Render (split hosting)

**Step-by-step:** see **[DEPLOY_VERCEL_RENDER.md](./DEPLOY_VERCEL_RENDER.md)**

Summary: Render (Docker API) first → copy URL → Vercel build with `VITE_API_URL` → set `CORS_ORIGIN` on Render to your `*.vercel.app` URL.

### Frontend (Vercel / Netlify)

1. Build with your API URL:
   ```bash
   VITE_API_URL=https://your-api.onrender.com npm run build
   ```
2. Deploy `dist/` (configs: `vercel.json`, `netlify.toml` included).
3. **Run/Submit will not work** unless the API is deployed and CORS allows your site origin.

### API (Render / Railway / VPS)

1. Deploy with `Dockerfile` or run `npm run start:api` on the server.
2. Install **Python 3** and **numpy** on the host if not using Docker.
3. Set env:
   - `NODE_ENV=production`
   - `PORT=3001` (or platform port)
   - `CORS_ORIGIN=https://your-frontend.vercel.app`
4. Health check: `GET /api/health`

## Local development

```bash
cp .env.example .env
npm run dev          # :5173
npm run backend      # :3001
```

## Security note

User code runs via `python3` on the server. For public production, use Docker isolation, rate limits, and a sandbox — not included in this minimal setup.

## Verify after deploy

```bash
curl https://your-host/api/health
npm run test:run-submit   # against local or pass URL as arg
```
