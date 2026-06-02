const fs = require('fs');

let code = fs.readFileSync('src/main.tsx', 'utf8');

// Ensure necessary lucide-react imports exist
const importMatch = code.match(/import \{([^}]+)\} from 'lucide-react';/);
if (importMatch) {
    const currentImports = importMatch[1];
    const newIcons = ['History', 'Copy', 'Settings', 'Send', 'TerminalSquare', 'Play', 'BookOpen', 'Activity'];
    let updatedImports = currentImports;
    for (let icon of newIcons) {
        if (!updatedImports.includes(icon)) {
            updatedImports += `, ${icon}`;
        }
    }
    code = code.replace(importMatch[1], updatedImports);
}

const startDetail = code.indexOf('function ProblemDetail');
const endDetail = code.indexOf('function PageShell');

const newProblemDetail = `function ProblemDetail({ path }: { path: string }) {
  const slug = path.replace('/problems/', '');
  const problem = tonicProblems.find((item) => item.slug === slug) ?? tonicProblems[0];
  const detail = detailBySlug.get(problem.slug);
  const [tab, setTab] = useState('Description');
  const [xValue, setXValue] = useState(0.7);
  const [code, setCode] = useState(getStarterCode(problem, detail));
  const [starred, setStarred] = useState(false);
  const [notes, setNotes] = useState('');
  const [submissions, setSubmissions] = useState<string[]>([]);
  const [testcase, setTestcase] = useState(problem.slug === 'sigmoid-numpy' ? '[0, 2, -2]' : '[1, 2, 3]');
  const [testTab, setTestTab] = useState('Testcase');
  const [result, setResult] = useState('');
  const sigmoid = 1 / (1 + Math.exp(-xValue));
  const gradient = sigmoid * (1 - sigmoid);
  const similar = tonicProblems.filter((item) => item.slug !== problem.slug && item.categories.some((cat) => problem.categories.includes(cat))).slice(0, 5);

  useEffect(() => {
    fetch(\`http://localhost:3001/api/problems/\${problem.slug}/state\`)
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
        const savedCode = localStorage.getItem(\`tt-code-\${problem.slug}\`);
        setCode(savedCode ?? getStarterCode(problem, detail));
        setStarred(localStorage.getItem(\`tt-star-\${problem.slug}\`) === 'true');
        setNotes(localStorage.getItem(\`tt-notes-\${problem.slug}\`) ?? '');
      });

    setResult('');
    setTestcase(problem.slug === 'sigmoid-numpy' ? '[0, 2, -2]' : '[1, 2, 3]');
    setTestTab('Testcase');
    setTab('Description');
  }, [problem.slug, detail]);

  const saveCode = () => {
    fetch(\`http://localhost:3001/api/problems/\${problem.slug}/save\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, notes, starred: starred ? 1 : 0 })
    });
  };

  const toggleStar = () => {
    const next = !starred;
    setStarred(next);
    fetch(\`http://localhost:3001/api/problems/\${problem.slug}/save\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, notes, starred: next ? 1 : 0 })
    });
    window.dispatchEvent(new Event('profile-updated'));
  };

  const runCode = () => {
    setResult('Running on backend...');
    setTestTab('Test Result');
    fetch(\`http://localhost:3001/api/problems/\${problem.slug}/run\`, {
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
    fetch(\`http://localhost:3001/api/problems/\${problem.slug}/submit\`, {
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
          {tonicProblems.slice(0, 15).map((item) => (
            <button className={item.slug === problem.slug ? 'active' : ''} key={item.slug} onClick={() => navigate(\`/problems/\${item.slug}\`)}>
              <span>{item.title}</span>
              <b className={\`level \${item.difficulty.toLowerCase()}\`}>{item.difficulty}</b>
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
        <div className="workspace-split">
          <article className="statement-panel">
            <div className="statement-head-new">
              <h1>{detail?.title || problem.title}</h1>
              <div className="statement-head-right">
                <button className={starred ? 'starred' : ''} onClick={toggleStar} aria-label="Star problem"><Star size={16} fill={starred ? "#ffd700" : "none"} /></button>
                <span className={\`level \${problem.difficulty.toLowerCase()}\`}>{problem.difficulty}</span>
              </div>
            </div>
            <div className="statement-tags">
              {(detail?.categories?.length ? detail.categories : problem.categories).map((tag) => <span key={tag} className="problem-tag-badge">{tag}</span>)}
            </div>

            {tab === 'Description' && (
              <div className="statement-content-scroll">
                <StatementText text={detail?.prompt || \`Implement \${problem.title}.\`} />
                
                {problem.slug === 'sigmoid-numpy' && (
                  <div className="equation-box">
                    <div className="equation">
                      \\(\\sigma(x) = \\frac{1}{1 + e^{-x}}\\)
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
                        <b style={{ left: \`\${((xValue + 6) / 12) * 100}%\`, bottom: \`\${sigmoid * 100}%\` }} />
                      </div>
                      <div className="sig-stats">
                        <div className="sig-stat-box logit-box">
                          <span className="stat-label">INPUT (LOGIT)</span>
                          <span className="stat-value">x = <span className="val">{xValue.toFixed(2)}</span></span>
                        </div>
                        <div className="sig-stat-box activation-box">
                          <span className="stat-label">ACTIVATION</span>
                          <span className="stat-value">\\(\\sigma(x)\\) = <span className="val red">{sigmoid.toFixed(4)}</span></span>
                        </div>
                        <div className="sig-stat-box gradient-box">
                          <span className="stat-label">GRADIENT</span>
                          <span className="stat-value">\\(\\sigma'(x)\\) = <span className="val green">{gradient.toFixed(4)}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <ProblemTextBlocks detail={detail} similar={similar} />
              </div>
            )}
            {tab !== 'Description' && <TabPlaceholder tab={tab} problem={problem} notes={notes} setNotes={(value) => {
              setNotes(value);
              localStorage.setItem(\`tt-notes-\${problem.slug}\`, value);
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
\n`;

code = code.substring(0, startDetail) + newProblemDetail + code.substring(endDetail);
fs.writeFileSync('src/main.tsx', code);
console.log('main.tsx updated successfully');
