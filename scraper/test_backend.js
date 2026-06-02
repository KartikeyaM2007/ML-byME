/**
 * Backend API smoke test (optional — skips if server down).
 */
const BASE = process.argv[2] || 'http://localhost:3001';

async function get(path) {
  const r = await fetch(`${BASE}${path}`);
  return { ok: r.ok, status: r.status, json: r.ok ? await r.json() : null };
}

async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { ok: r.ok, status: r.status, json: r.ok ? await r.json() : null };
}

(async () => {
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(2000) });
  } catch {
    console.log('SKIP backend (not running). Start with: npm run backend');
    process.exit(0);
  }

  const failures = [];
  const check = (name, cond) => {
    if (cond) console.log('OK', name);
    else {
      failures.push(name);
      console.error('FAIL', name);
    }
  };

  const profile = await get('/api/profile');
  check('GET /api/profile', profile.ok && profile.json?.name);

  const stats = await get('/api/stats');
  check('GET /api/stats', stats.ok && typeof stats.json?.solved === 'number');

  const states = await get('/api/problems/states');
  check('GET /api/problems/states', states.ok);

  const save = await post('/api/problems/sigmoid-numpy/save', {
    code: 'import numpy as np\ndef sigmoid(x):\n    return 1/(1+np.exp(-x))',
    notes: 'test',
    starred: 1,
  });
  check('POST save', save.ok);

  const state = await get('/api/problems/sigmoid-numpy/state');
  check('GET problem state', state.ok);

  const run = await post('/api/problems/sigmoid-numpy/run', {
    code: 'import numpy as np\ndef sigmoid(x):\n    return 1/(1+np.exp(-x))',
    testcase: '[0, 2, -2]',
  });
  check('POST run', run.ok);

  if (failures.length) process.exit(1);
  console.log('\nBackend tests passed.');
})();
