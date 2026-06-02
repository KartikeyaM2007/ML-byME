const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const stubs = `
function MathHub() { return <div>MathHub Placeholder</div>; }
function LessonPage() { return <div>LessonPage Placeholder</div>; }
function Research() { return <div>Research Placeholder</div>; }
function IDE() { return <div>IDE Placeholder</div>; }
function Leaderboard() { return <div>Leaderboard Placeholder</div>; }
function Dashboard() { return <div>Dashboard Placeholder</div>; }
function LocalRuntime() { return <div>LocalRuntime Placeholder</div>; }
function Feedback() { return <div>Feedback Placeholder</div>; }
function Terms() { return <div>Terms Placeholder</div>; }
function NotFound() { return <div>NotFound Placeholder</div>; }

function SectionTitle({ icon, eyebrow, title, text }: any) {
  return (
    <div className="section-title">
      <span>{icon}{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function getStarterCode(problem: any, detail?: any) {
  if (detail?.starterCode) return detail.starterCode;
  return \`def \${problem.slug.replace(/-/g, '_')}(x):\\n    pass\`;
}

function TabPlaceholder({ tab, problem, notes, setNotes, submissions }: any) {
  if (tab === 'Theory') return <div className="placeholder-panel">Theory content...</div>;
  if (tab === 'Solution') return <div className="placeholder-panel">Solution content...</div>;
  if (tab === 'Notes') return <div className="placeholder-panel"><textarea value={notes} onChange={(e: any) => setNotes(e.target.value)} /></div>;
  if (tab === 'Submissions') return <div className="placeholder-panel"><pre>{JSON.stringify(submissions, null, 2)}</pre></div>;
  return null;
}
`;

const ix = code.indexOf('function StatementText');
code = code.substring(0, ix) + stubs + '\\n' + code.substring(ix);

fs.writeFileSync('src/main.tsx', code);
console.log('Restored stubs');
