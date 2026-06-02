const fs = require('fs');

const mainPath = '../src/main.tsx';
let code = fs.readFileSync(mainPath, 'utf8');

const dummies = `
function LessonPage() { return <div>LessonPage</div>; }
function IDE() { return <div>IDE</div>; }
function Leaderboard() { return <div>Leaderboard</div>; }
function Dashboard() { return <div>Dashboard</div>; }
function LocalRuntime() { return <div>LocalRuntime</div>; }
function Feedback() { return <div>Feedback</div>; }
function Terms() { return <div>Terms</div>; }
function NotFound() { return <div>NotFound</div>; }
function SectionTitle({ title, subtitle }: { title: string, subtitle?: string }) { return <div><h2>{title}</h2><p>{subtitle}</p></div>; }
function getStarterCode(slug: string) { return "// Starter code"; }
`;

if (!code.includes("function LessonPage(")) {
    code = code.replace("import { Home }", dummies + "\nimport { Home }");
    fs.writeFileSync(mainPath, code);
    console.log("Restored dummy components to main.tsx");
} else {
    console.log("Dummies already exist");
}
