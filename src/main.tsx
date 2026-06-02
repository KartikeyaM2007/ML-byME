import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { motion } from 'framer-motion';
import {
  Activity,
  Award,
  BookOpen,
  Check,
  ChevronRight,
  CirclePlay,
  Code2,
  Cpu,
  Flame,
  FunctionSquare,
  Gauge,
  GitBranch,
  GraduationCap,
  Layers3,
  Lock,
  Moon,
  Play,
  Search,
  ShieldCheck,
  MessageCircle,
  Book,
  Wand2,
  Sparkles,
  Database,
  Target,
  Trophy,
  ChevronDown,
  Star,
  TerminalSquare,
  Calendar,
  Filter,
  Zap
, ArrowLeft, Grid, BarChart2, Tag , History, Copy, Settings, Send, Menu, List, X} from 'lucide-react';
import './style.css';
import './append.css';
import './append_explore.css';
import './append_interview_prep.css';
import './append_study_plans.css';
import './append_math.css';
import './append_research.css';
import './workspace.css';
import { setupSpaNavigation, navigate as spaNavigate } from './navigation';
import { apiUrl } from './api';
import { ResearchHub } from './ResearchHub';
import { LessonPage } from './LessonPage';
import { HomePage } from './HomePage';
import {
  IDEPage,
  LeaderboardPage,
  DashboardPage,
  LocalRuntimePage,
  FeedbackPage,
  TermsPage,
  AppNotFound,
} from './pages/AppPages';
import { studyPlanSections } from './data/studyPlanSections';
import { interviewPrepSections } from './data/interviewPrepProblems';
function SectionTitle({ title, subtitle, icon, eyebrow, text }: any) { return <div><h2>{title}</h2><p>{subtitle}</p></div>; }
function getStarterCode(problem: TonicProblem, detail?: ProblemDetailData) {
  return detail?.starterCode?.trim() || `# Implement ${problem.title}\npass\n`;
}

import { MathHubPage } from './MathHubPage';
import { StudyPlansPage } from './StudyPlansPage';
import { researchPaperSidebarItems } from './ResearchHub';
import { studyPlansMeta } from './data/studyPlansMeta';

import { problemCategories, tonicProblems, type TonicProblem } from './data/tensortonic';
import { problemDetails, type ProblemDetailData } from './data/problemDetails';

function Code2Icon() {
  return <Code2 size={16} />;
}

function TensorLogo() {
  return (
    <svg className="tensor-logo" viewBox="0 0 64 38" aria-hidden="true">
      <path d="M4 34 19 3h38l-7 9H28l-3 6h19l-7 8H21l-4 8H4Z" />
      <path d="M25 3c10 1 20 4 30 10-15-2-28 1-39 10l9-20Z" opacity=".78" />
    </svg>
  );
}

const researchPapers = [
  ['transformer', 'Transformers', 'Attention Is All You Need'],
  ['llama', 'LLaMA', 'Open and efficient foundation language models'],
  ['resnet', 'ResNet', 'Deep residual learning for image recognition'],
  ['gpt2', 'GPT-2', 'Language models are unsupervised multitask learners'],
  ['gemma3', 'Gemma 3', 'Lightweight open model architecture'],
  ['bert', 'BERT', 'Bidirectional encoder representations'],
  ['vit', 'Vision Transformer', 'Image recognition with transformers'],
  ['deepseekv3', 'DeepSeek-V3', 'Mixture-of-experts language model'],
  ['arcee-trinity', 'Arcee Trinity', 'Specialized model routing and composition'],
  ['ddpm', 'DDPM', 'Denoising diffusion probabilistic models'],
  ['vae', 'VAE', 'Variational autoencoders'],
  ['gan', 'GAN', 'Generative adversarial networks'],
  ['unet', 'U-Net', 'Biomedical image segmentation architecture'],
  ['alexnet', 'AlexNet', 'Large-scale convolutional neural networks'],
  ['vgg', 'VGG', 'Very deep convolutional networks'],
  ['rnn', 'RNN', 'Recurrent neural networks'],
  ['lstm', 'LSTM', 'Long short-term memory networks'],
  ['gru', 'GRU', 'Gated recurrent units'],
] as const;

const detailBySlug = new Map(problemDetails.map((detail) => [detail.slug, detail]));

const nav = [
  ['Problems', '/problems'],
  ['Explore', '#'],
  ['Study Plans', '/study-plans'],
  ['Interview Prep', '/interview-prep'],
  ['Feedback', '/feedback'],
] as const;

function getProblemState(slug: string) {
  return (window as any).globalProblemStates?.[slug] || { solved: false, starred: false, submissions: [] };
}

function getLocalProfile() {
  return (window as any).globalProfile || {
    name: 'Local Learner',
    handle: '@local',
  };
}

function saveLocalProfile(name: string, handle: string) {
  (window as any).globalProfile = { name, handle };
  fetch(apiUrl('/api/profile'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, handle })
  });
  window.dispatchEvent(new Event('profile-updated'));
}

function getLocalRuntimeStats() {
  return (window as any).globalStats || { solved: 0, starred: 0, drafts: 0, notes: 0 };
}

function navigate(path: string) {
  spaNavigate(path);
}

function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return path;
}

function App() {
  const path = usePath();

  React.useEffect(() => {
    if (path === '/llm-internals') navigate('/research');
    if (path === '/system-design') navigate('/problems');
  }, [path]);
  const [ready, setReady] = useState(false);

  React.useEffect(() => setupSpaNavigation(), []);

  React.useEffect(() => {
    const defaults = () => {
      (window as any).globalProfile = (window as any).globalProfile || { name: 'Local Learner', handle: '@local' };
      (window as any).globalStats = (window as any).globalStats || { solved: 0, starred: 0, drafts: 0, notes: 0 };
      (window as any).globalProblemStates = (window as any).globalProblemStates || {};
    };
    defaults();
    setReady(true);

    const load = () => {
      defaults();
      Promise.all([
        fetch(apiUrl('/api/profile')).then((r) => (r.ok ? r.json() : null)),
        fetch(apiUrl('/api/stats')).then((r) => (r.ok ? r.json() : null)),
        fetch(apiUrl('/api/problems/states')).then((r) => (r.ok ? r.json() : null)),
      ])
        .then(([profile, stats, problemStates]) => {
          if (profile) (window as any).globalProfile = profile;
          if (stats) (window as any).globalStats = stats;
          if (problemStates) (window as any).globalProblemStates = problemStates;
        })
        .catch(() => {});
    };

    load();
    window.addEventListener('profile-updated', load);
    return () => window.removeEventListener('profile-updated', load);
  }, []);

  if (!ready) {
    return (
      <div style={{ color: '#888', padding: '2rem', background: '#0b0f0f', minHeight: '100vh' }}>
        Loading…
      </div>
    );
  }

  // These are full-page scraped components that include their own nav + main
  // Wrap in dark div to activate Tailwind dark: prefixed classes
  if (path === '/') return <HomePage />;
  if (path === '/research' || path.startsWith('/research/')) {
    return <ResearchHub path={path} />;
  }
  if (path === '/ml-math') return <MathHubPage />;
  if (path === '/study-plans') return <StudyPlansPage />;

  return (
    <div className="app-shell" style={{ minHeight: '100vh', background: 'var(--bg-dark, #0b0f0f)' }}>
      <Header />
      <main>
        {path === '/problems' && <Problems />}
        {path.startsWith('/problems/') && <ProblemDetail path={path} />}
        {path.startsWith('/study-plans/') && path !== '/study-plans' && <StudyPlanDetail path={path} />}
        {path.startsWith('/ml-math/') && <LessonPage path={path} />}
        {path === '/interview-prep' && <InterviewPrep />}
        {path === '/ide' && <IDEPage />}
        {path === '/leaderboard' && <LeaderboardPage />}
        {path === '/dashboard' && <DashboardPage />}
        {path === '/runtime' && <LocalRuntimePage />}
        {path === '/feedback' && <FeedbackPage />}
        {path === '/terms' && <TermsPage />}
        {!['/', '/problems', '/study-plans', '/interview-prep', '/ml-math', '/research', '/ide', '/leaderboard', '/dashboard', '/runtime', '/feedback', '/terms'].includes(path) &&
          !path.startsWith('/ml-math/') && !path.startsWith('/problems/') && !path.startsWith('/study-plans/') && !path.startsWith('/research/') && <AppNotFound />}
      </main>
      <Footer />
    </div>
  );
}

function ExploreDropdown({ close }: { close: () => void }) {
  const items = [
    { icon: <Book size={16} />, title: 'ML Research', desc: 'Implement research papers', path: '/research', color: '#3178c6' },
    { icon: <FunctionSquare size={16} />, title: 'ML Math', desc: 'Core math for ML', path: '/ml-math', color: '#c175ff' },
    { icon: <Layers3 size={16} />, title: 'LLM Internals', desc: 'How modern LLMs work', path: '/llm-internals', color: '#00d6b2' },
    { icon: <Cpu size={16} />, title: 'ML System Design', desc: 'Design ML systems', path: '/system-design', color: '#ffb300' },
    { icon: <Trophy size={16} />, title: 'Leaderboard', desc: 'Top solvers on TensorTonic', path: '/leaderboard', color: '#fdd835' },
  ];

  return (
    <div className="explore-dropdown-1to1">
      {items.map(item => (
        <button key={item.title} className="explore-item-1to1" onClick={() => { navigate(item.path); close(); }}>
          <div className="explore-icon-1to1" style={{ color: item.color, backgroundColor: `${item.color}15`, border: `1px solid ${item.color}30` }}>
            {item.icon}
          </div>
          <div className="explore-text-1to1">
            <strong>{item.title}</strong>
            <span>{item.desc}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function Header() {
  const [light, setLight] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
  };
  return (
    <header className="site-header-1to1">
      <div className="header-left">
        <button className="brand-1to1" onClick={() => navigate('/')} aria-label="TensorTonic home">
          <TensorLogo />
          <span>TensorTonic</span>
        </button>
        <nav className="nav-1to1">
          {nav.map(([label, path]) => (
            <div key={label} className="nav-item-wrapper-1to1" onMouseLeave={() => label === 'Explore' && setExploreOpen(false)}>
              <button 
                onClick={() => { 
                  if (label === 'Explore') setExploreOpen(!exploreOpen);
                  else navigate(path); 
                }}
                onMouseEnter={() => label === 'Explore' && setExploreOpen(true)}
              >
                {label} {label === 'Explore' && <ChevronDown size={14} style={{ marginLeft: 4 }} />}
              </button>
              {label === 'Explore' && exploreOpen && <ExploreDropdown close={() => setExploreOpen(false)} />}
            </div>
          ))}
        </nav>
      </div>
      <div className="header-actions-1to1">
        <button className="icon-btn-1to1" aria-label="Discord"><MessageCircle size={18} /></button>
        <button className="icon-btn-1to1" aria-label="Toggle theme" onClick={toggleTheme}><Moon size={18} /></button>
        <button className="icon-btn-1to1" aria-label="Stars"><Star size={18} /></button>
        <button className="avatar-btn-1to1" onClick={() => navigate('/dashboard')} aria-label="Profile">
          <img src="https://ui-avatars.com/api/?name=User&background=333&color=fff" alt="User" />
        </button>
      </div>
    </header>
  );
}



function ActivityTicker() {
  const items = [
    "Emma solved 'Adam Optimizer'",
    'James hit a 31-day streak!',
    "Sofia solved 'Linear Regression'",
    '200+ ML problems available',
    "Ryan solved 'Gradient Descent'",
    'Mia solved RNN forward pass',
  ];
  return (
    <section className="activity-ticker" aria-label="Live learning activity">
      <div>
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}><Activity size={15} /> {item}</span>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      {[
        ['700+', 'practice tasks'],
        ['50+', 'visual math topics'],
        ['30', 'research builds'],
        ['1', 'browser IDE'],
      ].map(([value, label]) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function ProblemPreview() {
  const [track, setTrack] = useState('Machine Learning');
  const tracks: Record<string, string[]> = {
    'Machine Learning': ['adam-optimizer', 'softmax', 'cross-entropy', 'batch-normalization'],
    LLMs: ['attention', 'tokenization', 'transformer', 'multi-head'],
    'Neural Networks': ['relu', 'dropout', 'layer-normalization', 'backpropagation'],
    'Data Processing': ['standard-scaler', 'one-hot', 'winsorization', 'rank-transform'],
  };
  const cards = tracks[track]
    .map((needle) => tonicProblems.find((problem) => problem.slug.includes(needle)))
    .filter(Boolean) as TonicProblem[];
  return (
    <section className="section">
      <SectionTitle icon={<Layers3 />} eyebrow="Problem Space" title="Explore the Problem Space" text="200+ curated challenges across every ML domain." />
      <div className="tab-strip">
        {Object.keys(tracks).map((item) => (
          <button className={track === item ? 'active' : ''} key={item} onClick={() => setTrack(item)}>{item}</button>
        ))}
      </div>
      <div className="problem-grid">
        {(cards.length ? cards : tonicProblems.slice(0, 4)).slice(0, 4).map((problem) => <ProblemCard key={problem.slug} problem={problem} />)}
      </div>
    </section>
  );
}

function ResearchPreview() {
  const modules = ['Tokenization', 'Embeddings', 'Positional Encoding', 'Multi-Head Attention', 'Layer Normalization', 'Feed Forward', 'Output Projection'];
  return (
    <section className="split-section">
      <div>
        <SectionTitle icon={<GraduationCap />} eyebrow="Research Papers" title="Implement Landmark AI Papers" text="Go beyond tutorials. Build state-of-the-art architectures from scratch by coding through research papers." />
        <div className="research-tiles">
          <button onClick={() => navigate('/research')}><b>SOTA Papers</b><span>Transformers, DDPM and more</span></button>
          <button onClick={() => navigate('/research')}><b>Component by Component</b><span>Build complete architectures</span></button>
        </div>
        <button className="primary" onClick={() => navigate('/research')}>Start Research Track</button>
      </div>
      <div className="paper-card paper-progress">
        <span className="pill">Attention Is All You Need - Implementation</span>
        <p>Vaswani et al., 2017</p>
        {modules.map((step, i) => (
          <div className="paper-step" key={step}>
            <span>{i + 1}</span>
            <b>{step}</b>
            {i < 3 ? <Check size={16} /> : i === 3 ? <em>CURRENT</em> : <Lock size={16} />}
          </div>
        ))}
        <small>Implementation Progress <b>3/7 Modules</b></small>
        <progress value={3} max={7} />
      </div>
    </section>
  );
}

function MathPreview() {
  return (
    <section className="section math-band">
      <SectionTitle icon={<FunctionSquare />} eyebrow="Interactive Math" title="Visualize. Interact. Understand." text="Explore seven modules and 50+ topics through live plots." />
      <MathToy />
    </section>
  );
}

function MathToy() {
  const [batch, setBatch] = useState(32);
  const batches = [1, 8, 32, 256, 1024];
  const noise = Math.max(8, 72 - Math.log2(batch) * 8);
  const points = Array.from({ length: 18 }, (_, i) => ({
    x: i,
    y: 36 + Math.sin(i * 0.9) * noise * 0.42 + (i % 3 - 1) * noise * 0.16,
  }));
  return (
    <div className="toy">
      <div className="chart">
        {points.map((p) => <span key={p.x} style={{ left: `${7 + p.x * 5.2}%`, bottom: `${Math.max(10, Math.min(82, p.y))}%` }} />)}
        <i style={{ transform: `rotate(${-18 + Math.log2(batch) * 2.1}deg)` }} />
      </div>
      <div className="batch-panel">
        <b>Gradient Noise vs Batch Size</b>
        <small>Large batches smooth the update path; tiny batches explore noisier gradients.</small>
        <div>
          {batches.map((item) => <button className={batch === item ? 'active' : ''} key={item} onClick={() => setBatch(item)}>{item}</button>)}
        </div>
        <code>batch_size = {batch}; noise = {noise.toFixed(1)}</code>
      </div>
    </div>
  );
}

function IDEPreview() {
  const [ran, setRan] = useState(false);
  return (
    <section className="split-section reverse">
      <div className="terminal">
        <div className="window-bar"><span /><span /><span /><b>linear_regression.py</b></div>
        <pre>{`import numpy as np

def predict(X, w, b):
    return X @ w + b

def mse_loss(y_hat, y):
    return np.mean((y_hat - y) ** 2)`}</pre>
        <button className="primary" onClick={() => setRan(true)}><Play size={18} /> Run Code</button>
        <div className="ide-results">
          <b>Test Results</b>
          <p className={ran ? 'pass' : ''}>{ran ? 'PASS: 6 tests passed in 38ms' : 'Ready for validation'}</p>
        </div>
      </div>
      <div>
        <SectionTitle icon={<TerminalSquare />} eyebrow="Browser-Based IDE" title="Code. Run. Submit." text="Instant validation, no setup, and problem-specific feedback directly in the browser." />
        <button className="primary" onClick={() => navigate('/ide')}><Play size={18} /> Open IDE</button>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="section">
      <SectionTitle icon={<Activity />} eyebrow="Gamified Growth" title="Global Leaderboards" text="Keep streaks alive, climb ranks, and compare progress against the community." />
      <div className="leaderboard home-board">
        {['Alex Chen', 'Sarah Jones', 'Mike Ross'].map((name, i) => (
          <div key={name}>
            <span>{i + 1}</span>
            <b>{name}</b>
            <small>{12500 - i * 650} XP</small>
            <Flame size={18} />
          </div>
        ))}
        <div className="you-rank"><span>#42</span><b>You are ranked #42</b><small>12 day streak</small><Trophy size={18} /></div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta">
      <h2>Start with one function. Leave with a mental model.</h2>
      <button className="primary" onClick={() => navigate('/problems')}>Browse Problems</button>
    </section>
  );
}

function Problems() {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [status, setStatus] = useState('Status');
  const [category, setCategory] = useState('All');
  const [moreOpen, setMoreOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 15;
  const filtered = tonicProblems.filter((p) => {
    const { solved, starred } = getProblemState(p.slug);
    return (difficulty === 'All' || p.difficulty === difficulty) &&
      (status === 'Status' || (status === 'Solved' && solved) || (status === 'Unsolved' && !solved) || (status === 'Starred' && starred)) &&
      (category === 'All' || p.categories.includes(category)) &&
      `${p.title} ${p.categories.join(' ')}`.toLowerCase().includes(query.toLowerCase());
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * perPage, safePage * perPage);
  const globalStats = (window as any).globalStats || { solved: 0, starred: 0, drafts: 0, notes: 0 };
  const solvedByDiff = { Easy: 0, Medium: 0, Hard: 0 };
  tonicProblems.forEach((p) => {
    if (getProblemState(p.slug).solved) solvedByDiff[p.difficulty] += 1;
  });
  const researchSidebar = researchPaperSidebarItems();
  const featuredPlans = studyPlansMeta.filter((p) =>
    ['pytorch-basics', 'cuda-basics', 'cracking-ml', 'cracking-dl'].includes(p.id),
  );

  return (
    <div className="problems-layout-1to1">
      <aside className="sidebar-1to1">
        <div className="research-papers-1to1">
          <div className="rp-header-1to1">
            <h3>Implement Research Papers</h3>
            <button type="button" className="view-all-1to1" onClick={() => navigate('/research')}>
              View all
            </button>
          </div>
          <div className="rp-list-1to1">
            {researchSidebar.map((rp) => (
              <button
                key={rp.id}
                type="button"
                className={`rp-card-1to1 ${rp.glow}`}
                onClick={() => navigate(`/research/${rp.id}`)}
              >
                <Book size={16} />
                <span>{rp.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="progress-panel-1to1">
          <div className="prog-header-1to1">
            <Activity size={18}/> <h3>Your Progress</h3>
            <span className="prog-link-1to1">↗</span>
          </div>
          <div className="prog-stats-1to1">
            <div className="prog-stat-box-1to1"><span>Easy</span><b className="txt-easy">{solvedByDiff.Easy}</b></div>
            <div className="prog-stat-box-1to1"><span>Medium</span><b className="txt-medium">{solvedByDiff.Medium}</b></div>
            <div className="prog-stat-box-1to1"><span>Hard</span><b className="txt-hard">{solvedByDiff.Hard}</b></div>
          </div>
          <div className="prog-total-1to1">
            <span>Total Solved</span>
            <b>{globalStats.solved || 0}</b>
          </div>
          <div className="recent-activity-1to1">
            <div className="recent-header-1to1"><Activity size={14}/> Recent Activity</div>
            <div className="recent-empty-1to1">No activity yet</div>
          </div>
        </div>

        <div className="github-panel-1to1">
          <div className="gh-icon-box-1to1"><GitBranch size={24}/></div>
          <div className="gh-content-1to1">
            <h3>Connect GitHub</h3>
            <p>Auto-backup your solutions</p>
          </div>
          <ul className="gh-features-1to1">
            <li><Lock size={12}/> Private repository sync</li>
            <li><Lock size={12}/> Secure & automatic backups</li>
          </ul>
          <button className="gh-btn-1to1"><GitBranch size={16}/> Connect Account</button>
        </div>
      </aside>

      <div className="main-content-1to1">
        <a className="daily-card-1to1" onClick={(event) => { event.preventDefault(); navigate('/problems/anchor-box-generation'); }} href="/problems/anchor-box-generation">
          <div className="daily-icon-1to1"><Calendar size={20}/></div>
          <div className="daily-info-1to1">
            <span>PROBLEM OF THE DAY</span>
            <strong>Anchor Box Generation</strong>
            <small>→ Give it a try today</small>
          </div>
          <div className="daily-tags-1to1">
            <span className="topic-pill-1to1">Computer Vision</span>
            <span className="diff-pill-1to1 txt-medium">Medium</span>
            <span className="timer-1to1"><Calendar size={14}/> 06:07:42</span>
          </div>
        </a>

        <div className="study-strip-1to1">
          {featuredPlans.map((plan, i) => {
            const glow = ['red-glow', 'green-glow', 'brown-glow', 'purple-glow'][i] || 'green-glow';
            return (
              <button
                key={plan.id}
                type="button"
                className={`study-card-1to1 ${glow}`}
                onClick={() => navigate(`/study-plans/${plan.id}`)}
              >
                <div className="sc-icon-1to1">{plan.icon?.length <= 3 ? <span>{plan.icon}</span> : <Flame size={16} />}</div>
                <strong>{plan.title}</strong>
                <span>
                  <Book size={12} /> {plan.problemCount} problems
                </span>
              </button>
            );
          })}
        </div>

        <div className="chips-1to1">
          {['All', ...problemCategories.slice(0, 7)].map((item) => (
            <button
              className={category === item ? 'active' : ''}
              key={item}
              onClick={() => { setCategory(item); setPage(1); }}
            >
              {item}
            </button>
          ))}
          <button className={moreOpen ? 'dropdown-1to1 active' : 'dropdown-1to1'} onClick={() => setMoreOpen(!moreOpen)}>
            12 more <ChevronDown size={14} />
          </button>
          {moreOpen && <div className="more-menu">
            {problemCategories.slice(7).map((item) => (
              <button key={item} onClick={() => { setCategory(item); setMoreOpen(false); setPage(1); }}>{item}</button>
            ))}
          </div>}
        </div>

        <div className="toolbar-1to1">
          <label className="search-1to1"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search problems..." /></label>
          <div className="select-row-1to1">
            <div className="dropdown-container-1to1">
              <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}>
                {['Status', 'Solved', 'Unsolved', 'Starred'].map((item) => <option key={item}>{item}</option>)}
              </select>
              <ChevronDown size={14} />
            </div>
            <div className="dropdown-container-1to1">
              <Filter size={14} style={{marginLeft: 8}}/>
              <select value={difficulty} onChange={(event) => { setDifficulty(event.target.value); setPage(1); }}>
                {['All', 'Easy', 'Medium', 'Hard'].map((item) => <option key={item}>{item}</option>)}
              </select>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="problem-table-1to1">
          <div className="problem-head-1to1"><span>Status</span><span>Problem</span><span style={{flex: 2}}>Topics</span><span>Difficulty</span></div>
          {visible.map((problem) => <ProblemCard key={problem.slug} problem={problem} />)}
        </div>

        <div className="pagination">
          <button disabled={safePage === 1} onClick={() => setPage(safePage - 1)}>Previous</button>
          {[...Array(totalPages)].map((_, index) => {
            const p = index + 1;
            if (p > 1 && p < totalPages - 4) return p === 2 ? <span key="dots">...</span> : null;
            return <button className={safePage === p ? 'active' : ''} key={p} onClick={() => setPage(p)}>{p}</button>;
          })}
          <button disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}



function StudyPlanDetail({ path }: { path: string }) {
  const slug = path.split('/')[2];
  const meta = studyPlansMeta.find((p) => p.id === slug);

  if (!meta) {
    return <PageShell eyebrow="Study Plan" title="Not Found" text="Plan not found" />;
  }

  const planInfo = {
    title: meta.title,
    desc: meta.subtitle || meta.description,
    count: meta.problemCount,
    slug: meta.id,
  };

  const builtSections = studyPlanSections[planInfo.slug];
  const sections = builtSections?.length
    ? builtSections.map((sec, i) => ({
        id: i,
        title: sec.title,
        problems: sec.problems.map((p) => ({
          slug: p.slug,
          title: p.title,
          difficulty: p.difficulty,
        })),
      }))
    : [];

  const planProblems = sections.flatMap((s) => s.problems);

  // Expand state for sections
  const [expanded, setExpanded] = useState<Record<number, boolean>>(
    sections.reduce((acc, s) => ({...acc, [s.id]: true}), {})
  );

  const toggleSection = (id: number) => {
    setExpanded(prev => ({...prev, [id]: !prev[id]}));
  };

  const easyCount = planProblems.filter(p => p.difficulty === 'Easy').length;
  const mediumCount = planProblems.filter(p => p.difficulty === 'Medium').length;
  const hardCount = planProblems.filter(p => p.difficulty === 'Hard').length;

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      {/* Header spacing to prevent navbar overlap */}
      <div style={{ height: '72px' }}></div>
      <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', cursor: 'pointer', marginBottom: '24px' }} onClick={() => navigate('/study-plans')}>
          <ArrowLeft size={16} />
          <span style={{ fontSize: '14px' }}>Back to Study Plans</span>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div style={{ width: 80, height: 80, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Grid size={32} color="#a78bfa" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', marginBottom: '8px' }}>
              <BookOpen size={14} />
              <span style={{ fontSize: '12px' }}>{planProblems.length} Problems</span>
            </div>
            <h1 style={{ fontSize: '32px', color: '#fff', margin: '0 0 12px 0', fontWeight: 700 }}>{planInfo.title}</h1>
            <p style={{ color: '#ccc', fontSize: '14px', margin: '0 0 16px 0', lineHeight: 1.5 }}>{planInfo.desc}. The essential foundation for understanding how ML algorithms work under the hood.</p>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '12px', color: '#888' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}></div> {easyCount} Easy</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }}></div> {mediumCount} Medium</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171' }}></div> {hardCount} Hard</div>
            </div>
          </div>
        </div>

        {/* Sections List Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888' }}>
            <BarChart2 size={16} />
            <span style={{ fontSize: '14px' }}>{sections.length} sections</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '12px', cursor: 'pointer' }}>
            <Tag size={12} /> Show tags
          </div>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '64px' }}>
          {sections.map(section => (
            <div key={section.id} style={{ border: '1px solid #222', borderRadius: '8px', background: 'transparent' }}>
              <div 
                style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: expanded[section.id] ? '1px solid #222' : 'none' }}
                onClick={() => toggleSection(section.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', color: '#fff', fontWeight: 600 }}>{section.title}</h3>
                  <span style={{ fontSize: '12px', color: '#888', marginLeft: '4px' }}>{section.problems.length} problems</span>
                </div>
                <div style={{ transform: expanded[section.id] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <ChevronDown size={16} color="#888" />
                </div>
              </div>
              
              {expanded[section.id] && (
                <div style={{ background: '#0f0f0f', borderRadius: '0 0 8px 8px' }}>
                  {section.problems.map((p, pIdx) => {
                    const { solved } = getProblemState(p.slug);
                    return (
                      <div 
                        key={p.slug} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          padding: '16px', 
                          borderBottom: pIdx !== section.problems.length - 1 ? '1px solid #222' : 'none',
                          cursor: 'pointer'
                        }}
                        className="study-plan-problem-row"
                        onClick={() => navigate(`/problems/${p.slug}`)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <CirclePlay size={14} color={solved ? '#10b981' : '#666'} />
                          <span style={{ color: '#ccc', fontSize: '14px' }}>{p.title}</span>
                        </div>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: solved ? '#10b981' : '#333' }}></div>
                      </div>
                    );
                  })}
                  
                  {/* Quiz Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#131109', borderRadius: '0 0 8px 8px', borderTop: '1px solid #222' }} className="study-plan-quiz-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <GraduationCap size={16} color="#eab308" />
                      <span style={{ color: '#eab308', fontSize: '14px', fontWeight: 600 }}>{section.title} Quiz</span>
                    </div>
                    <span style={{ color: '#888', fontSize: '12px' }}>10 questions</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .study-plan-problem-row:hover {
          background: rgba(255,255,255,0.03);
        }
        .study-plan-quiz-row:hover {
          background: rgba(234, 179, 8, 0.1) !important;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function ProblemCard({ problem }: { problem: TonicProblem }) {
  const { solved, starred } = getProblemState(problem.slug);
  return (
    <a className="problem-row-1to1" href={`/problems/${problem.slug}`} onClick={(event) => { event.preventDefault(); navigate(`/problems/${problem.slug}`); }}>
      <span className="status-mark-1to1">{solved ? '✓' : starred ? '☆' : '-'}</span>
      <span className="problem-name-1to1"><b>{problem.id}.</b> {problem.title}</span>
      <span className="problem-topics-1to1">
        {problem.categories.slice(0, 2).map(cat => <span key={cat} className="topic-pill-1to1">{cat}</span>)}
      </span>
      <span className={`diff-pill-1to1 txt-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
    </a>
  );
}


function PearsonCard() {
  const [points, setPoints] = useState<{x: number, y: number}[]>([
    {x: 20, y: 20}, {x: 40, y: 35}, {x: 60, y: 65}, {x: 80, y: 70}
  ]);

  const addPoint = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = 100 - ((e.clientY - rect.top) / rect.height) * 100;
    setPoints([...points, {x, y}]);
  };

  const setPreset = (type: string) => {
    if (type === 'strong+') setPoints([{x:10,y:15}, {x:30,y:25}, {x:50,y:55}, {x:70,y:65}, {x:90,y:85}]);
    if (type === 'strong-') setPoints([{x:10,y:85}, {x:30,y:65}, {x:50,y:55}, {x:70,y:25}, {x:90,y:15}]);
    if (type === 'weak+') setPoints([{x:10,y:30}, {x:30,y:10}, {x:50,y:60}, {x:70,y:40}, {x:90,y:80}]);
    if (type === 'nocorr') setPoints([{x:20,y:20}, {x:20,y:80}, {x:80,y:20}, {x:80,y:80}, {x:50,y:50}]);
    if (type === 'nonlinear') setPoints([{x:10,y:10}, {x:30,y:80}, {x:50,y:90}, {x:70,y:80}, {x:90,y:10}]);
  };

  const adjustCov = (amount: number) => {
    setPoints(points.map(p => ({...p, y: Math.max(0, Math.min(100, p.y + (p.x - 50) * amount))})));
  };

  const n = points.length;
  const meanX = points.reduce((acc, p) => acc + p.x, 0) / (n || 1);
  const meanY = points.reduce((acc, p) => acc + p.y, 0) / (n || 1);
  let cov = 0, varX = 0, varY = 0;
  points.forEach(p => {
    cov += (p.x - meanX) * (p.y - meanY);
    varX += Math.pow(p.x - meanX, 2);
    varY += Math.pow(p.y - meanY, 2);
  });
  cov /= (n || 1);
  varX /= (n || 1);
  varY /= (n || 1);
  const r = (varX > 0 && varY > 0) ? cov / Math.sqrt(varX * varY) : 0;
  const r2 = r * r;

  return (
    <div className="sigmoid-card pearson-card">
      <h2>Pearson Correlation</h2>
      <p>ρ = Cov(X,Y) / (σx·σy)</p>
      <div className="pearson-presets">
        <button onClick={() => setPreset('strong+')}>Strong +</button>
        <button onClick={() => setPreset('strong-')}>Strong -</button>
        <button onClick={() => setPreset('weak+')}>Weak +</button>
        <button onClick={() => setPreset('nocorr')}>No corr</button>
        <button onClick={() => setPreset('nonlinear')}>Non-linear</button>
      </div>
      <div className="sigmoid-plot" onClick={addPoint}>
        {points.map((p, i) => (
          <b key={i} style={{ left: `${p.x}%`, bottom: `${p.y}%` }} />
        ))}
        <div className="plot-overlay">click scatter to add points</div>
      </div>
      <div className="pearson-adjust">
        <button onClick={() => adjustCov(0.1)}>+ covariance</button>
        <button onClick={() => adjustCov(-0.1)}>- covariance</button>
      </div>
      <div className="sigmoid-metrics">
        <span>Covariance<b>{cov.toFixed(4)}</b></span>
        <span>Pearson r<b>{r.toFixed(4)}</b></span>
        <span>r²<b>{r2.toFixed(4)}</b></span>
      </div>
    </div>
  );
}





function TabPlaceholder({ tab, detail, notes, setNotes, submissions }: any) {
  if (tab === 'Theory') {
    return (
      <div className="placeholder-panel statement-content-scroll">
        <StatementText text={detail?.theory || 'Theory content is not available for this problem yet.'} />
      </div>
    );
  }
  if (tab === 'Solution') {
    return (
      <div className="placeholder-panel statement-content-scroll">
        <StatementText text={detail?.solution || 'Work through the Description tab first, then compare with the solution outline here.'} />
      </div>
    );
  }
  if (tab === 'Notes') {
    return (
      <div className="placeholder-panel">
        <textarea
          value={notes}
          onChange={(e: any) => setNotes(e.target.value)}
          placeholder="Your notes for this problem..."
          style={{ width: '100%', minHeight: 200, background: '#111', color: '#eee', border: '1px solid #333', borderRadius: 8, padding: 12 }}
        />
      </div>
    );
  }
  if (tab === 'Submissions') {
    return (
      <div className="placeholder-panel">
        {submissions?.length ? <pre>{submissions.join('\n')}</pre> : <p style={{ color: '#888' }}>No submissions yet. Submit your code to see history.</p>}
      </div>
    );
  }
  return null;
}

function StatementText({ text }: { text: string }) {
  return (
    <div className="statement-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{text}</ReactMarkdown>
    </div>
  );
}

function ProblemTextBlocks({ detail, similar }: { detail: any, similar: any }) {
  if (!detail) return null;

  const renderSection = (title: string, content: string, type: 'markdown' | 'example' | 'hint' | 'list') => {
    if (!content) return null;
    
    if (type === 'example') {
      const examples = content.split(/Example \d+:/).filter(Boolean);
      return (
        <div className="problem-section examples-section">
          <h3>{title}</h3>
          {examples.map((ex, i) => (
            <div key={i} className="example-box">
              <ReactMarkdown>{ex}</ReactMarkdown>
            </div>
          ))}
        </div>
      );
    }
    
    if (type === 'hint') {
      return (
        <details className="hint-box">
          <summary>
            <ChevronRight size={16} /> <span>{title}</span>
          </summary>
          <div className="hint-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </details>
      );
    }
    
    if (type === 'list') {
      return (
        <div className="problem-section list-section">
          <h3>{title}</h3>
          <div className="bullet-list">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      );
    }

    return (
      <div className="problem-section">
        <h3>{title}</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="problem-text-blocks">
      {detail.examples && renderSection('Examples', detail.examples, 'example')}
      
      <div className="hints-container">
        {detail.hint1 && renderSection('Hint 1', detail.hint1, 'hint')}
        {detail.hint2 && renderSection('Hint 2', detail.hint2, 'hint')}
        {detail.hint3 && renderSection('Hint 3', detail.hint3, 'hint')}
        {!detail.hint1 && detail.hints && renderSection('Hints', detail.hints, 'hint')}
      </div>

      {detail.requirements && renderSection('Requirements', detail.requirements, 'list')}
      {detail.constraints && renderSection('Constraints', detail.constraints, 'list')}
      
      {similar && similar.length > 0 && (
        <details className="similar-problems hint-box">
          <summary>
            <Play size={14} className="rotate-icon" /> Try Similar Problems
          </summary>
          <div className="similar-list">
            {similar.map((s: any) => (
              <a key={s.slug} href={`/problems/${s.slug}`} className="similar-item">
                {s.title}
              </a>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

function ProblemSidebar({ currentSlug, close }: { currentSlug: string, close: () => void }) {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [status, setStatus] = useState('Status');
  const [category, setCategory] = useState('All');

  const filtered = tonicProblems.filter((p) => {
    const { solved, starred } = getProblemState(p.slug);
    return (difficulty === 'All' || p.difficulty === difficulty) &&
      (status === 'Status' || (status === 'Solved' && solved) || (status === 'Unsolved' && !solved) || (status === 'Starred' && starred)) &&
      (category === 'All' || p.categories.includes(category)) &&
      `${p.title} ${p.categories.join(' ')}`.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="tt-sidebar">
      <div className="tt-sidebar-header">
        <span>Problems</span>
        <button className="tt-sidebar-close" onClick={close}><X size={16} /></button>
      </div>
      <div className="tt-sidebar-filters">
        <div className="row">
          <select className="w-full" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="All">All Tags</option>
            {problemCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="w-auto" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="All">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="tt-segment-control">
          {['Status', 'Solved', 'Unsolved'].map(s => (
            <button key={s} className={`tt-segment-btn ${status === s ? 'active' : ''}`} onClick={() => setStatus(s)}>
              {s === 'Status' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>
      <div className="tt-sidebar-list">
        {filtered.map(p => {
          const { solved } = getProblemState(p.slug);
          return (
            <button 
              key={p.slug} 
              className={`tt-prob-item ${p.slug === currentSlug ? 'active' : ''}`}
              onClick={() => { window.history.pushState({}, '', '/problems/' + p.slug); window.dispatchEvent(new Event('popstate')); }}
            >
              <div className={`icon ${solved ? 'solved' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {solved ? <path d="M20 6 9 17l-5-5"/> : <circle cx="12" cy="12" r="10"/>}
                </svg>
              </div>
              <span className="title">{p.title}</span>
              <span className={`diff ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProblemDetail({ path }: { path: string }) {
  const slug = path.replace('/problems/', '');
  const problem = tonicProblems.find((item) => item.slug === slug);
  const detail = problem ? detailBySlug.get(problem.slug) : undefined;

  if (!problem) {
    return (
      <div className="app-shell" style={{ padding: 48, color: '#fff' }}>
        <h1>Problem not found</h1>
        <p style={{ color: '#888' }}>No data for <code>{slug}</code>. Run <code>npm run fetch:research-problems</code>.</p>
        <button type="button" className="primary" onClick={() => navigate('/problems')}>
          Back to Problems
        </button>
      </div>
    );
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('Description');
  const [xValue, setXValue] = useState(0.7);
  const [code, setCode] = useState(getStarterCode(problem, detail));
  const [starred, setStarred] = useState(false);
  const [notes, setNotes] = useState('');
  const [submissions, setSubmissions] = useState<string[]>([]);
  const defaultTestcase =
    problem.slug === 'sigmoid-numpy'
      ? '[0, 2, -2]'
      : problem.slug === 'transformers-tokenization'
        ? '"hello world", {"hello": 1, "world": 2}'
        : '[1, 2, 3]';
  const [testcase, setTestcase] = useState(defaultTestcase);
  const [testTab, setTestTab] = useState('Testcase');
  const [result, setResult] = useState('');
  const sigmoid = 1 / (1 + Math.exp(-xValue));
  const gradient = sigmoid * (1 - sigmoid);
  const railProblems = tonicProblems
    .filter((item) => item.slug !== problem.slug && item.categories.some((cat) => problem.categories.includes(cat)))
    .slice(0, 20);
  const similar = railProblems.slice(0, 5);

  useEffect(() => {
    fetch(apiUrl(`/api/problems/${problem.slug}/state`))
      .then(res => res.json())
      .then(data => {
        const { state, submissions: subs } = data;
        const codeValue = state.code || getStarterCode(problem, detail);
        setCode(codeValue);
        setStarred(!!state.starred);
        setNotes(state.notes || '');
        setSubmissions(subs || []);
      })
      .catch(() => {
        const savedCode = localStorage.getItem(`tt-code-${problem.slug}`);
        setCode(savedCode ?? getStarterCode(problem, detail));
        setStarred(localStorage.getItem(`tt-star-${problem.slug}`) === 'true');
        setNotes(localStorage.getItem(`tt-notes-${problem.slug}`) ?? '');
      });

    setResult('');
    setTestcase(
      problem.slug === 'sigmoid-numpy'
        ? '[0, 2, -2]'
        : problem.slug === 'transformers-tokenization'
          ? '"hello world", {"hello": 1, "world": 2}'
          : '[1, 2, 3]',
    );
    setTestTab('Testcase');
    setTab('Description');
  }, [problem.slug, detail]);

  const saveCode = () => {
    fetch(apiUrl(`/api/problems/${problem.slug}/save`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, notes, starred: starred ? 1 : 0 })
    });
  };

  const toggleStar = () => {
    const next = !starred;
    setStarred(next);
    fetch(apiUrl(`/api/problems/${problem.slug}/save`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, notes, starred: next ? 1 : 0 })
    });
    window.dispatchEvent(new Event('profile-updated'));
  };

  const runCode = () => {
    setResult('Running on backend...');
    setTestTab('Test Result');
    fetch(apiUrl(`/api/problems/${problem.slug}/run`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, testcase })
    })
    .then(res => res.json())
    .then(data => setResult(data.output))
    .catch(err => setResult('Error running code: ' + err.message));
  };

  const submitCode = () => {
    setResult('Running validation on backend...');
    setTestTab('Test Result');
    fetch(apiUrl(`/api/problems/${problem.slug}/submit`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, testcase })
    })
    .then(res => res.json())
    .then(data => {
      const next = [data.result, ...submissions].slice(0, 8);
      setResult(data.output);
      setSubmissions(next);
      window.dispatchEvent(new Event('profile-updated'));
    })
    .catch(err => setResult('Submission failed: ' + err.message));
  };

  return (
    <section className="workspace-page">
      <aside className="problem-rail">
        <div className="rail-filters">
          {['All Tags', ...problemCategories].map((cat) => <button key={cat}>{cat}</button>)}
        </div>
        <div className="rail-tabs">{['All', 'Easy', 'Medium', 'Hard'].map((item) => <button key={item}>{item}</button>)}</div>
        <div className="rail-list">
          {(railProblems.length ? railProblems : tonicProblems).slice(0, 15).map((item) => (
            <button className={item.slug === problem.slug ? 'active' : ''} key={item.slug} onClick={() => navigate(`/problems/${item.slug}`)}>
              <span>{item.title}</span>
              <b className={`level ${item.difficulty.toLowerCase()}`}>{item.difficulty}</b>
            </button>
          ))}
        </div>
        <small>1 / 14</small>
      </aside>
      <div className="problem-workspace">
        <div className="workspace-tabs-container">
          <div className="workspace-tabs-scroll">
            <button className={tab === 'Description' ? 'active' : ''} onClick={() => setTab('Description')}><BookOpen size={16} /> Description</button>
            <button className={tab === 'Theory' ? 'active' : ''} onClick={() => setTab('Theory')}>Theory</button>
            <button className={tab === 'Solution' ? 'active' : ''} onClick={() => setTab('Solution')}>Solution</button>
            <button className={tab === 'Submissions' ? 'active' : ''} onClick={() => setTab('Submissions')}>Submissions</button>
            <button className={tab === 'Notes' ? 'active' : ''} onClick={() => setTab('Notes')}>Notes <span className="new-badge">NEW</span></button>
          </div>
          <div className="workspace-tabs-nav">
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </div>
        <div className="workspace-split" style={{ height: "calc(100vh - 100px)" }}>
          <article className="statement-panel">
            <div className="statement-head-new">
              <div style={{display: 'flex', alignItems: 'center'}}>
                <button className="tt-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <List size={16} />
                </button>
                <h1>{detail?.title || problem.title}</h1>
              </div>
              <div className="statement-head-right">
                <button className={starred ? 'starred' : ''} onClick={toggleStar} aria-label="Star problem"><Star size={16} fill={starred ? "#ffd700" : "none"} /></button>
                <span className={`level ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
              </div>
            </div>
            <div className="statement-tags">
              {(detail?.categories?.length ? detail.categories : problem.categories).map((tag) => <span key={tag} className="problem-tag-badge">{tag}</span>)}
            </div>

            {tab === 'Description' && (
              <div className="statement-content-scroll">
                <StatementText text={detail?.prompt || `Implement ${problem.title}.`} />
                
                {problem.slug === 'sigmoid-numpy' && (
                  <div className="equation-box">
                    <div className="equation">
                      {"\\(\\sigma(x) = \\frac{1}{1 + e^{-x}}\\)"}
                    </div>
                  </div>
                )}
                
                {problem.slug === 'pearson-correlation' && <PearsonCard />}
                {problem.slug === 'sigmoid-numpy' && (
                  <div className="sigmoid-card-new">
                    <div className="sig-header-new">
                      <div className="sig-title-area">
                        <Activity size={18} color="#f93562" /> 
                        <h3>Sigmoid Activation</h3>
                      </div>
                      <div className="sig-slider-area">
                        <Settings size={14} color="#666" />
                        <input type="range" min="-6" max="6" step="0.1" value={xValue} onChange={(event) => setXValue(Number(event.target.value))} />
                        <code>{xValue.toFixed(1)}</code>
                      </div>
                    </div>
                    <p className="sig-desc">Visualizing non-linearity and gradient saturation</p>
                    
                    <div className="sig-body">
                      <div className="sig-plot">
                        <i />
                        <b style={{ left: `${((xValue + 6) / 12) * 100}%`, bottom: `${sigmoid * 100}%` }} />
                      </div>
                      <div className="sig-stats">
                        <div className="sig-stat-box logit-box">
                          <span className="stat-label">INPUT (LOGIT)</span>
                          <span className="stat-value">x = <span className="val">{xValue.toFixed(2)}</span></span>
                        </div>
                        <div className="sig-stat-box activation-box">
                          <span className="stat-label">ACTIVATION</span>
                          <span className="stat-value">{"\\(\\sigma(x)\\)"} = <span className="val red">{sigmoid.toFixed(4)}</span></span>
                        </div>
                        <div className="sig-stat-box gradient-box">
                          <span className="stat-label">GRADIENT</span>
                          <span className="stat-value">{"\\(\\sigma'(x)\\)"} = <span className="val green">{gradient.toFixed(4)}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <ProblemTextBlocks detail={detail} similar={similar} />
              </div>
            )}
            {tab !== 'Description' && <TabPlaceholder tab={tab} detail={detail} notes={notes} setNotes={(value: string) => {
              setNotes(value);
              localStorage.setItem(`tt-notes-${problem.slug}`, value);
            }} submissions={submissions} />}
          </article>
          <aside className="code-panel">
            <div className="code-toolbar-new">
              <div className="toolbar-left">
                <button aria-label="History"><History size={14}/></button>
                <button aria-label="Copy"><Copy size={14}/></button>
                <button aria-label="Settings"><Settings size={14}/></button>
              </div>
              <div className="toolbar-right">
                <button className="run-btn" onClick={runCode}><Play size={14} /> Run</button>
                <button className="submit-btn" onClick={submitCode}><Send size={14} /> Submit</button>
              </div>
            </div>
            <div className="code-editor-container" style={{ flex: 1, minHeight: 0, width: '100%', position: 'relative' }}>
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'monospace', scrollBeyondLastLine: false }}
              />
            </div>
            <div className="testcase-panel">
              <div className="test-tabs-new">
                <button className={testTab === 'Testcase' ? 'active' : ''} onClick={() => setTestTab('Testcase')}><TerminalSquare size={14} color="#00d6b2" /> Testcase</button>
                <button className={testTab === 'Test Result' ? 'active' : ''} onClick={() => setTestTab('Test Result')}>&gt;_ Test Result</button>
              </div>
              <div className="test-body">
                {testTab === 'Testcase' ? (
                  <>
                    <div className="case-tabs">
                      <button className="active">Case 1 &times;</button>
                      <button>Case 2 &times;</button>
                      <button>Case 3 &times;</button>
                      <button className="add-case">+</button>
                    </div>
                    <div className="case-input">
                      <div className="case-label">x =</div>
                      <textarea className="testcase-box-new" value={testcase} onChange={(event) => setTestcase(event.target.value)} placeholder="[1,2,3] or 42" />
                      <div className="case-helper">Accepts: any</div>
                    </div>
                  </>
                ) : (
                  <pre className="test-output-new">{result}</pre>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function PageShell({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children?: React.ReactNode }) {
  return (
    <section className="page">
      <SectionTitle icon={<Zap />} eyebrow={eyebrow} title={title} text={text} />
      {children}
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <button className="brand" onClick={() => navigate('/')}><TensorLogo />TensorTonic</button>
      <div>
        <button onClick={() => navigate('/terms')}>Terms</button>
        <button><GitBranch size={16} /> Source</button>
        <span><ShieldCheck size={16} /> Local demo</span>
      </div>
    </footer>
  );
}

function InterviewPrep() {
  const roles = [
    { title: 'Data Scientist Interview Prep', active: true },
    { title: 'ML Engineer Interview Prep', soon: true },
    { title: 'AI Engineer Interview Prep', soon: true },
    { title: 'Research Scientist Interview Prep', soon: true },
    { title: 'Research Engineer Interview Prep', soon: true },
    { title: 'Applied Scientist Interview Prep', soon: true },
  ];

  const sections = interviewPrepSections.map((sec) => ({
    title: sec.title,
    total: sec.items.length,
    items: sec.items.map((item) => ({
      name: item.name,
      slug: item.slug,
      diff: item.difficulty,
      cos: item.companies,
    })),
  }));

  const totalProblems = sections.reduce((n, s) => n + s.total, 0);

  return (
    <div className="interview-layout-1to1">
      <div className="interview-sidebar-1to1">
        <div className="interview-sidebar-header-1to1">
          <span className="eyebrow-1to1">TENSOR TONIC</span>
          <h2>Interview Prep</h2>
          <span className="subtitle-1to1">1 live · 6 total</span>
        </div>
        <div className="interview-roles-1to1">
          {roles.map(r => (
            <button key={r.title} className={`role-item-1to1 ${r.active ? 'active' : ''}`}>
              <div className={`role-dot-1to1 ${r.active ? 'active-dot' : ''}`} />
              <span className="role-title-1to1">{r.title}</span>
              {r.soon && <span className="soon-badge-1to1">SOON</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="interview-main-1to1">
        <div className="interview-hero-1to1">
          <div className="hero-icon-box-1to1">
            <BookOpen size={24} color="#00d6b2" />
          </div>
          <div className="hero-text-1to1">
            <span className="hero-eyebrow-1to1"><BookOpen size={14} /> 50 Problems</span>
            <h1>Data Scientist Interview Prep</h1>
            <div className="hero-stats-1to1">
              <span className="stat-easy-1to1">• 22 Easy</span>
              <span className="stat-med-1to1">• 28 Medium</span>
              <span className="stat-hard-1to1">• 0 Hard</span>
            </div>
          </div>
        </div>

        <div className="sections-header-1to1">
          <span><Activity size={16} /> {sections.length} sections · {totalProblems} problems (local — all unlocked)</span>
          <button><Target size={14} /> Show tags</button>
        </div>

        <div className="interview-sections-list-1to1">
          {sections.map(sec => (
            <div key={sec.title} className="interview-section-card-1to1">
              <div className="section-card-header-1to1">
                <div className="sec-head-left-1to1">
                  <div className={`topic-dot-1to1 ${sec.title === 'SQL' ? 'dot-sql' : 'dot-numpy'}`} />
                  <h3>{sec.title}</h3>
                  <span className="sec-progress-1to1">0/{sec.total} solved</span>
                </div>
                <ChevronDown size={18} color="#666" />
              </div>
              <div className="section-items-1to1">
                {sec.items.map((item, i) => (
                  <div
                    key={i}
                    className="section-item-row-1to1"
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/problems/${item.slug}`)}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/problems/${item.slug}`)}
                  >
                    <div className="item-row-left-1to1">
                      <CirclePlay size={14} color="#00d6b2" />
                      <span>{item.name}</span>
                    </div>
                    <div className="item-row-right-1to1">
                      <div className={`diff-dot-1to1 diff-${item.diff}`} />
                      <div className="company-badges-1to1">
                        {item.cos.map((c, idx) => (
                          <div key={idx} className={`co-badge-1to1 co-${c}`}>{c}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="interview-right-1to1">
        <div className="progress-card-1to1">
          <span className="prog-title-1to1">PROGRESS</span>
          <div className="prog-main-1to1">
            <strong>0</strong>/50
            <span className="prog-pct-1to1">0%</span>
          </div>
          <div className="prog-bar-bg-1to1"><div className="prog-bar-fill-1to1" /></div>
          
          <div className="prog-section-title-1to1">BY DIFFICULTY</div>
          <div className="prog-row-1to1"><span className="txt-easy">Easy</span><span>0/22</span></div>
          <div className="prog-row-1to1"><span className="txt-medium">Medium</span><span>0/28</span></div>

          <div className="prog-section-title-1to1 mt-16">BY TOPIC <span className="float-right">0/4 done</span></div>
          <div className="prog-row-1to1"><span className="topic-dot dot-sql" /> SQL <span className="float-right">0/10</span></div>
          <div className="prog-row-1to1"><span className="topic-dot dot-numpy" /> NumPy and Pandas <span className="float-right">0/10</span></div>
          <div className="prog-row-1to1"><span className="topic-dot dot-math" /> Math <span className="float-right">0/15</span></div>
          <div className="prog-row-1to1"><span className="topic-dot dot-ml" /> Machine Learning... <span className="float-right">0/15</span></div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
