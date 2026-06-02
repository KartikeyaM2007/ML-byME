/**
 * End-to-end Run/Submit verification against backend :3001
 */
const BASE = (process.argv[2] || process.env.API_URL || 'http://localhost:3001').replace(/\/$/, '');

async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: r.status, json: await r.json() };
}

const SIGMOID_OK = `import numpy as np
def sigmoid(x):
    x = np.asarray(x, dtype=float)
    return 1 / (1 + np.exp(-x))
`;

const SIGMOID_BAD = `import numpy as np
def sigmoid(x):
    pass
`;

const TOKENIZE_OK = `import numpy as np
def tokenize(text, vocab, unk_id=0):
    tokens = text.strip().split()
    return np.array([vocab.get(t, unk_id) for t in tokens], dtype=np.int32)
`;

(async () => {
  try {
    await fetch(`${BASE}/api/profile`, { signal: AbortSignal.timeout(2000) });
  } catch {
    console.error('Backend not running. Start: npm run backend');
    process.exit(1);
  }

  const failures = [];

  const run1 = await post('/api/problems/sigmoid-numpy/run', { code: SIGMOID_OK, testcase: '[0,2,-2]' });
  const accepted1 = run1.json.output?.includes('Accepted');
  console.log(accepted1 ? 'OK' : 'FAIL', 'sigmoid correct → Accepted');
  if (!accepted1) failures.push({ test: 'sigmoid ok', output: run1.json.output });

  const run2 = await post('/api/problems/sigmoid-numpy/run', { code: SIGMOID_BAD, testcase: '[0,2,-2]' });
  const rejected2 = run2.json.output?.includes('Wrong Answer');
  console.log(rejected2 ? 'OK' : 'FAIL', 'sigmoid pass-only → Wrong Answer');
  if (!rejected2) failures.push({ test: 'sigmoid bad', output: run2.json.output });

  const run3 = await post('/api/problems/transformers-tokenization/run', { code: TOKENIZE_OK, testcase: '' });
  const accepted3 = run3.json.output?.includes('Accepted');
  console.log(accepted3 ? 'OK' : 'FAIL', 'tokenization correct → Accepted');
  if (!accepted3) failures.push({ test: 'tokenize ok', output: run3.json.output });

  const sub = await post('/api/problems/sigmoid-numpy/submit', { code: SIGMOID_OK, testcase: '[0,2,-2]' });
  const subOk = sub.json.result?.includes('Accepted');
  console.log(subOk ? 'OK' : 'FAIL', 'submit saves Accepted');
  if (!subOk) failures.push({ test: 'submit', result: sub.json });

  const state = await fetch(`${BASE}/api/problems/sigmoid-numpy/state`).then((r) => r.json());
  const hasSubs = state.submissions?.length > 0;
  console.log(hasSubs ? 'OK' : 'FAIL', 'submission persisted in state');
  if (!hasSubs) failures.push({ test: 'state' });

  if (failures.length) {
    console.error('\nFailures:', JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log('\nRun/Submit works for tested problems.');
})();
