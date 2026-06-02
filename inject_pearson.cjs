const fs = require('fs');

// 1. Add PearsonCard to main.tsx
let mainCode = fs.readFileSync('src/main.tsx', 'utf8');

const pearsonComponent = `
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
          <b key={i} style={{ left: \`\${p.x}%\`, bottom: \`\${p.y}%\` }} />
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

`;

if (!mainCode.includes('function PearsonCard()')) {
  mainCode = mainCode.replace('function ProblemDetail(', pearsonComponent + 'function ProblemDetail(');
}

// 2. Inject <PearsonCard /> into ProblemDetail
const pearsonRender = `{problem.slug === 'pearson-correlation' && <PearsonCard />}`;
if (!mainCode.includes(pearsonRender)) {
  mainCode = mainCode.replace('<div className="equation">σ(x) = 1 / (1 + e<sup>-x</sup>)</div>', 
    `{problem.slug === 'sigmoid-numpy' && <div className="equation">σ(x) = 1 / (1 + e<sup>-x</sup>)</div>}\n                ${pearsonRender}`);
}

fs.writeFileSync('src/main.tsx', mainCode);

// 3. Update CSS
let cssCode = fs.readFileSync('src/style.css', 'utf8');
const pearsonCss = `
.pearson-presets, .pearson-adjust {
  display: flex;
  gap: 8px;
  margin: 18px 28px;
  flex-wrap: wrap;
}

.pearson-presets button, .pearson-adjust button {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--line);
  color: var(--muted);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: 0.2s;
}

.pearson-presets button:hover, .pearson-adjust button:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.plot-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  font-size: 1.2rem;
  font-weight: bold;
}
`;

if (!cssCode.includes('.pearson-presets')) {
  fs.writeFileSync('src/style.css', cssCode + '\n' + pearsonCss);
}

console.log('Added Pearson widget!');
