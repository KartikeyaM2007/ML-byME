import React, { useState } from 'react';
import {
  Trophy,
  TerminalSquare,
  LayoutDashboard,
  MessageSquare,
  Cpu,
  Code2,
  Star,
  CheckCircle,
  Send,
} from 'lucide-react';
import { navigate } from '../navigation';
import { apiUrl } from '../api';
import { tonicProblems } from '../data/tensortonic';

export function IDEPage() {
  const [code, setCode] = useState(`import numpy as np\n\n# Sandbox — run via backend when available\ndef experiment(x):\n    return x * 2\n\nprint(experiment(np.array([1, 2, 3])))`);
  const [out, setOut] = useState('');

  const run = () => {
    fetch(apiUrl('/api/problems/sigmoid-numpy/run'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, testcase: '' }),
    })
      .then((r) => r.json())
      .then((d) => setOut(d.output || 'OK'))
      .catch(() => setOut('Start backend: npm run backend\n\nOr paste code into any problem workspace.'));
  };

  return (
    <section className="page" style={{ padding: 32, maxWidth: 1100, margin: '0 auto', color: '#f0f4f4' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <TerminalSquare color="#00ff94" /> Browser IDE
      </h1>
      <p style={{ color: '#888', marginBottom: 24 }}>
        Lightweight sandbox. For full problem context, open a challenge from Problems.
      </p>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: '100%',
          minHeight: 280,
          background: '#111',
          color: '#eee',
          border: '1px solid #333',
          borderRadius: 8,
          padding: 16,
          fontFamily: 'monospace',
        }}
      />
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <button type="button" className="primary" onClick={run}>
          Run
        </button>
        <button type="button" onClick={() => navigate('/problems')}>
          Open Problems
        </button>
      </div>
      {out && (
        <pre style={{ marginTop: 16, background: '#0a0a0a', padding: 16, borderRadius: 8, fontSize: 13 }}>{out}</pre>
      )}
    </section>
  );
}

export function LeaderboardPage() {
  const rows = tonicProblems.slice(0, 15).map((p, i) => ({
    rank: i + 1,
    user: ['alex_ml', 'sam_np', 'jordan_ai', 'casey_dl', 'riley_cv'][i % 5],
    solved: Math.max(1, 50 - i * 3),
    streak: 40 - i * 2,
  }));

  return (
    <section className="page" style={{ padding: 32, maxWidth: 720, margin: '0 auto', color: '#f0f4f4' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Trophy color="#fdd835" /> Leaderboard
      </h1>
      <p style={{ color: '#888', marginBottom: 24 }}>Local demo rankings (connect backend for live stats).</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ color: '#888', textAlign: 'left' }}>
            <th style={{ padding: 8 }}>#</th>
            <th>User</th>
            <th>Solved</th>
            <th>Streak</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.rank} style={{ borderTop: '1px solid #222' }}>
              <td style={{ padding: 12 }}>{r.rank}</td>
              <td>{r.user}</td>
              <td>{r.solved}</td>
              <td>{r.streak}d</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function DashboardPage() {
  const stats = (window as any).globalStats || { solved: 0, starred: 0, drafts: 0, notes: 0 };
  const profile = (window as any).globalProfile || { name: 'Local Learner', handle: '@local' };

  return (
    <section className="page" style={{ padding: 32, maxWidth: 900, margin: '0 auto', color: '#f0f4f4' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <LayoutDashboard color="#00d6b2" /> Dashboard
      </h1>
      <p style={{ color: '#888' }}>
        {profile.name} · {profile.handle}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginTop: 24 }}>
        {[
          ['Solved', stats.solved, CheckCircle],
          ['Starred', stats.starred, Star],
          ['Drafts', stats.drafts, Code2],
          ['Notes', stats.notes, MessageSquare],
        ].map(([label, val, Icon]) => (
          <div key={label as string} style={{ background: '#111', border: '1px solid #222', borderRadius: 12, padding: 20 }}>
            <Icon size={20} color="#00ff94" />
            <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{val as number}</div>
            <div style={{ color: '#888', fontSize: 13 }}>{label as string}</div>
          </div>
        ))}
      </div>
      <button type="button" className="primary" style={{ marginTop: 24 }} onClick={() => navigate('/problems')}>
        Continue practicing
      </button>
    </section>
  );
}

export function LocalRuntimePage() {
  return (
    <section className="page" style={{ padding: 32, maxWidth: 720, margin: '0 auto', color: '#f0f4f4' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Cpu color="#76B900" /> Local Runtime
      </h1>
      <p style={{ color: '#888', lineHeight: 1.7 }}>
        Python execution runs through <code style={{ color: '#00ff94' }}>npm run backend</code> on port 3001.
        CUDA/Triton study plans reference GPU kernels; this local clone uses NumPy validation for coding problems.
      </p>
      <ul style={{ color: '#bbb', lineHeight: 2 }}>
        <li>Backend: <code>node backend/server.js</code></li>
        <li>Frontend: <code>npm run dev</code></li>
        <li>Tests: <code>npm run test:all</code></li>
      </ul>
    </section>
  );
}

export function FeedbackPage() {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section className="page" style={{ padding: 32, maxWidth: 640, margin: '0 auto', color: '#f0f4f4' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <MessageSquare color="#00d6b2" /> Feedback
      </h1>
      <p style={{ color: '#888', marginBottom: 16 }}>Local clone — feedback is stored in this session only.</p>
      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Report a bug, request a feature, or share feedback..."
        style={{
          width: '100%',
          minHeight: 120,
          background: '#111',
          color: '#eee',
          border: '1px solid #333',
          borderRadius: 8,
          padding: 12,
        }}
      />
      <button
        type="button"
        className="primary"
        style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}
        onClick={() => {
          localStorage.setItem('tt-feedback', msg);
          setSent(true);
        }}
      >
        <Send size={16} /> Submit
      </button>
      {sent && <p style={{ color: '#00ff94', marginTop: 12 }}>Thanks — saved locally.</p>}
    </section>
  );
}

export function TermsPage() {
  return (
    <section className="page" style={{ padding: 32, maxWidth: 720, margin: '0 auto', color: '#ccc', lineHeight: 1.8 }}>
      <h1>Terms of Use (Local Clone)</h1>
      <p>
        This TensorTonic replica is for local learning. Problem content is curated or derived from public metadata;
        not affiliated with tensortonic.com. No warranty; use at your own risk.
      </p>
    </section>
  );
}

export function AppNotFound() {
  return (
    <section className="page" style={{ padding: 48, textAlign: 'center', color: '#f0f4f4' }}>
      <h1>Page not found</h1>
      <button type="button" className="primary" onClick={() => navigate('/')}>
        Go home
      </button>
    </section>
  );
}
