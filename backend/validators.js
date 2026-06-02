/**
 * Per-problem Python validation runners (local TensorTonic backend).
 */
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const PYTHON = process.env.PYTHON || 'python';
const MAX_CODE_BYTES = Number(process.env.MAX_CODE_BYTES) || 80_000;
const RUN_TIMEOUT_MS = Number(process.env.RUN_TIMEOUT_MS) || 5000;

function runPython(code, timeout = RUN_TIMEOUT_MS) {
  if (Buffer.byteLength(code, 'utf8') > MAX_CODE_BYTES) {
    return Promise.resolve({ error: new Error('Code too large'), stdout: '', stderr: 'Code exceeds size limit' });
  }
  const tmp = path.join(__dirname, `tmp_run_${Date.now()}_${Math.random().toString(36).slice(2)}.py`);
  fs.writeFileSync(tmp, code);
  return new Promise((resolve) => {
    execFile(PYTHON, [tmp], { timeout, maxBuffer: 512 * 1024 }, (error, stdout, stderr) => {
      try {
        fs.unlinkSync(tmp);
      } catch {
        /* ignore */
      }
      resolve({ error, stdout, stderr });
    });
  });
}

const VALIDATORS = {
  'sigmoid-numpy': async (code) => {
    const test = `${code}\nimport numpy as np\nx = np.array([0, 2, -2])\ny = sigmoid(x)\nassert y.shape == (3,)\nassert np.allclose(y, [0.5, 0.88079708, 0.11920292], atol=1e-5)\nprint('ok')`;
    const { error, stderr } = await runPython(test);
    return { ok: !error && !stderr, msg: stderr || error?.message || 'sigmoid tests passed' };
  },
  'transformers-tokenization': async (code) => {
    const test = `${code}\nimport numpy as np\nv = {"hello": 1, "world": 2}\nout = tokenize("hello world", v)\nassert out.dtype == np.int32 or out.dtype == np.int64\nassert list(out) == [1, 2]\nprint('ok')`;
    const { error, stderr } = await runPython(test);
    return { ok: !error && !stderr, msg: stderr || error?.message || 'tokenize tests passed' };
  },
  'transformers-embedding': async (code) => {
    const test = `${code}\nimport numpy as np\nids = np.array([[0, 1], [1, 0]])\nE = np.random.randn(4, 8)\nout = embed(ids, E)\nassert out.shape == (2, 2, 8)\nprint('ok')`;
    const { error, stderr } = await runPython(test);
    return { ok: !error && !stderr, msg: stderr || error?.message || 'embed tests passed' };
  },
  'transformers-layer-normalization': async (code) => {
    const test = `${code}\nimport numpy as np\nx = np.random.randn(2, 5, 8)\ng = np.ones(8); b = np.zeros(8)\nout = layer_norm(x, g, b)\nassert out.shape == x.shape\nprint('ok')`;
    const { error, stderr } = await runPython(test);
    return { ok: !error && !stderr, msg: stderr || error?.message || 'layer_norm tests passed' };
  },
  'matrix-transpose': async (code) => {
    const test = `${code}\nimport numpy as np\nA = np.array([[1,2,3],[4,5,6]])\nassert np.allclose(matrix_transpose(A), A.T)\nprint('ok')`;
    const { error, stderr } = await runPython(test);
    return { ok: !error && !stderr, msg: stderr || error?.message || 'transpose tests passed' };
  },
};

async function validateProblem(slug, code) {
  if (!code || typeof code !== 'string') {
    return { ok: false, msg: 'No code provided.' };
  }
  if (VALIDATORS[slug]) {
    return VALIDATORS[slug](code);
  }
  const fnMatch = code.match(/def\s+(\w+)\s*\(/);
  const fn = fnMatch?.[1];
  if (!fn) return { ok: false, msg: 'Define a function in your solution.' };
  if (/\bpass\b/.test(code)) return { ok: false, msg: 'Replace pass with an implementation.' };
  if (!/return\s+/.test(code)) return { ok: false, msg: 'Function should return a value.' };
  const smoke = `${code}\nprint('syntax_ok')`;
  const { error, stderr } = await runPython(smoke);
  return {
    ok: !error && !stderr,
    msg: error?.message || stderr || 'Syntax OK; add dedicated tests for full acceptance.',
  };
}

module.exports = { validateProblem, VALIDATORS };
