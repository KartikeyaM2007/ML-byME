const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, '../src/main.tsx');
let code = fs.readFileSync(mainPath, 'utf8');

const sidebarCode = `function ProblemSidebar({ currentSlug, close }: { currentSlug: string, close: () => void }) {
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [status, setStatus] = useState('Status');
  const [category, setCategory] = useState('All');

  const filtered = tonicProblems.filter((p) => {
    const { solved, starred } = getProblemState(p.slug);
    return (difficulty === 'All' || p.difficulty === difficulty) &&
      (status === 'Status' || (status === 'Solved' && solved) || (status === 'Unsolved' && !solved) || (status === 'Starred' && starred)) &&
      (category === 'All' || p.categories.includes(category)) &&
      \`\${p.title} \${p.categories.join(' ')}\`.toLowerCase().includes(query.toLowerCase());
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
            <button key={s} className={\`tt-segment-btn \${status === s ? 'active' : ''}\`} onClick={() => setStatus(s)}>
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
              className={\`tt-prob-item \${p.slug === currentSlug ? 'active' : ''}\`}
              onClick={() => window.history.pushState({}, '', '/problems/' + p.slug) || window.dispatchEvent(new Event('popstate'))}
            >
              <div className={\`icon \${solved ? 'solved' : ''}\`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {solved ? <path d="M20 6 9 17l-5-5"/> : <circle cx="12" cy="12" r="10"/>}
                </svg>
              </div>
              <span className="title">{p.title}</span>
              <span className={\`diff \${p.difficulty.toLowerCase()}\`}>{p.difficulty}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

`;

if (!code.includes('function ProblemSidebar')) {
    code = code.replace(/function ProblemDetail/, sidebarCode + 'function ProblemDetail');
}

// Add state to ProblemDetail
if (!code.includes('const [sidebarOpen, setSidebarOpen] = useState(false)')) {
    code = code.replace(/const \[tab, setTab\] = useState\('Description'\);/, "const [sidebarOpen, setSidebarOpen] = useState(false);\n  const [tab, setTab] = useState('Description');");
}

// Wrap the return of ProblemDetail in tt-main-wrapper and conditionally render ProblemSidebar
if (!code.includes('tt-main-wrapper')) {
    code = code.replace(/return \(\s*<div className="problem-workspace-container">/, `return (
    <div className="tt-main-wrapper">
      {sidebarOpen && <ProblemSidebar currentSlug={problem.slug} close={() => setSidebarOpen(false)} />}
      <div className="problem-workspace-container" style={{ flex: 1, position: 'relative' }}>`);
    code = code.replace(/<div className="workspace-split">/g, '<div className="workspace-split" style={{ height: "calc(100vh - 100px)" }}>'); // ensure it doesn't overflow since it's now wrapped
    // Need to close the tt-main-wrapper div at the end of ProblemDetail
    const detailEndMatch = code.match(/<\/div>\s*\)\s*;\s*\}\s*function LessonPage/);
    if (detailEndMatch) {
       code = code.replace(/<\/div>\s*\)\s*;\s*\}\s*function LessonPage/, "    </div>\n    </div>\n  );\n}\n\nfunction LessonPage");
    }
}

// Add the toggle button
if (!code.includes('tt-sidebar-toggle')) {
    code = code.replace(/<h1>\{detail\?.title \|\| problem.title\}<\/h1>/, `<div style={{display: 'flex', alignItems: 'center'}}>
                <button className="tt-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <List size={16} />
                </button>
                <h1>{detail?.title || problem.title}</h1>
              </div>`);
}

// Ensure List and X are imported
if (!code.includes('List,')) {
    code = code.replace(/import \{([^\}]+)\} from 'lucide-react';/, "import {$1, List, X} from 'lucide-react';");
}

fs.writeFileSync(mainPath, code);
console.log('Sidebar injected!');
