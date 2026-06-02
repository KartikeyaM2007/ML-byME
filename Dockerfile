# TensorTonic — single container: API + static SPA + Python grading
FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-numpy \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

WORKDIR /app/backend
RUN npm ci --omit=dev

ENV NODE_ENV=production
ENV PORT=3001
ENV PYTHON=python3
ENV CORS_ORIGIN=*

EXPOSE 3001

CMD ["node", "server.js"]
