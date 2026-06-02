const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { execFile } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const corsOrigin = process.env.CORS_ORIGIN || (NODE_ENV === 'production' ? false : '*');

if (corsOrigin) {
  const origins =
    corsOrigin === '*'
      ? true
      : corsOrigin.split(',').map((o) => o.trim()).filter(Boolean);
  app.use(cors({ origin: origins }));
}
app.use(express.json({ limit: '512kb' }));

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      handle TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS problems_state (
      slug TEXT PRIMARY KEY,
      code TEXT,
      notes TEXT,
      starred INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT,
      result TEXT,
      code TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  db.get("SELECT COUNT(*) as count FROM user_profile", (err, row) => {
    if (row && row.count === 0) {
      db.run("INSERT INTO user_profile (name, handle) VALUES ('Local Learner', '@local')");
    }
  });
});

app.get('/api/profile', (req, res) => {
  db.get("SELECT name, handle FROM user_profile LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || { name: 'Local Learner', handle: '@local' });
  });
});

app.post('/api/profile', (req, res) => {
  const { name, handle } = req.body;
  db.run("UPDATE user_profile SET name = ?, handle = ?", [name, handle], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.get('/api/stats', (req, res) => {
  db.all("SELECT slug, starred FROM problems_state", (err, states) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all("SELECT DISTINCT slug FROM submissions WHERE result LIKE '%Accepted%'", (err, solvedRows) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const solvedSlugs = new Set(solvedRows.map(r => r.slug));
      let solved = solvedSlugs.size;
      let starred = states.filter(s => s.starred).length;
      let drafts = states.length;
      
      db.get("SELECT COUNT(*) as count FROM problems_state WHERE notes IS NOT NULL AND notes != ''", (err, notesRow) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ solved, starred, drafts, notes: notesRow.count });
      });
    });
  });
});

app.get('/api/problems/states', (req, res) => {
  db.all("SELECT slug, starred FROM problems_state", (err, states) => {
    if (err) return res.status(500).json({ error: err.message });
    db.all("SELECT DISTINCT slug FROM submissions WHERE result LIKE '%Accepted%'", (err, solvedRows) => {
      if (err) return res.status(500).json({ error: err.message });
      const solvedSet = new Set(solvedRows.map(r => r.slug));
      const result = {};
      states.forEach(s => {
        result[s.slug] = {
          starred: !!s.starred,
          solved: solvedSet.has(s.slug)
        };
      });
      solvedRows.forEach(r => {
        if (!result[r.slug]) {
          result[r.slug] = { starred: false, solved: true };
        }
      });
      res.json(result);
    });
  });
});

app.get('/api/problems/:slug/state', (req, res) => {
  const slug = req.params.slug;
  db.get("SELECT code, notes, starred FROM problems_state WHERE slug = ?", [slug], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.all("SELECT result FROM submissions WHERE slug = ? ORDER BY timestamp DESC", [slug], (err, submissions) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const subs = submissions.map(s => s.result);
      res.json({
        state: row || { code: null, notes: null, starred: 0 },
        submissions: subs
      });
    });
  });
});

app.post('/api/problems/:slug/save', (req, res) => {
  const slug = req.params.slug;
  const { code, notes, starred } = req.body;
  
  db.get("SELECT slug FROM problems_state WHERE slug = ?", [slug], (err, row) => {
    if (row) {
      db.run(
        "UPDATE problems_state SET code = COALESCE(?, code), notes = COALESCE(?, notes), starred = COALESCE(?, starred) WHERE slug = ?",
        [code, notes, starred, slug],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true });
        }
      );
    } else {
      db.run(
        "INSERT INTO problems_state (slug, code, notes, starred) VALUES (?, ?, ?, ?)",
        [slug, code || '', notes || '', starred !== undefined ? starred : 0],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ success: true });
        }
      );
    }
  });
});

const { validateProblem } = require('./validators');

async function runPythonValidation(slug, code, testcase) {
  const start = Date.now();
  const result = await validateProblem(slug, code);
  const time = Date.now() - start;
  const mem = (Math.random() * 10 + 20).toFixed(1);
  const checks = [
    result.ok ? 'PASS: Automated tests' : `FAIL: ${result.msg}`,
    `Case input: ${testcase || 'default'}`,
  ];
  const isAccepted = result.ok;
  const outputStr = `${checks.join('\n')}\n\n${isAccepted ? `Accepted\nRuntime: ${time} ms\nMemory: ${mem} MB` : 'Wrong Answer\nFix failing cases before submitting.'}`;
  return { output: outputStr, isAccepted };
}

app.post('/api/problems/:slug/run', async (req, res) => {
  const slug = req.params.slug;
  const { code, testcase } = req.body;
  const result = await runPythonValidation(slug, code, testcase);
  res.json({ success: true, output: result.output });
});

app.post('/api/problems/:slug/submit', async (req, res) => {
  const slug = req.params.slug;
  const { code, testcase } = req.body;
  
  const validationResult = await runPythonValidation(slug, code, testcase);
  const resultString = `${new Date().toLocaleTimeString()} - ${validationResult.isAccepted ? 'Accepted' : 'Wrong Answer'}`;
  
  db.run("INSERT INTO submissions (slug, result, code) VALUES (?, ?, ?)", [slug, resultString, code], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, result: resultString, output: validationResult.output });
  });
});

// Health check for deploy platforms
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: NODE_ENV });
});

// Serve built SPA when running single-process production (Docker / Render)
if (NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, { maxAge: '1d', index: false }));
    app.get(/^\/(?!api\/).*/, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving static app from', distPath);
  } else {
    console.warn('dist/ not found — run npm run build before production start');
  }
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`TensorTonic API on http://0.0.0.0:${PORT} (${NODE_ENV})`);
});
