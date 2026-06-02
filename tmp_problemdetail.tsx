function ProblemDetail({ path }: { path: string }) {
  const slug = path.replace('/problems/', '');
  const problem = tonicProblems.find((item) => item.slug === slug) ?? tonicProblems[0];
  const detail = detailBySlug.get(problem.slug);
  const [tab, setTab] = useState('Problem');
  const [xValue, setXValue] = useState(0);
  const [code, setCode] = useState(getStarterCode(problem, detail));
  const [starred, setStarred] = useState(false);
  const [notes, setNotes] = useState('');
  const [submissions, setSubmissions] = useState<string[]>([]);
  const [testcase, setTestcase] = useState(problem.slug === 'sigmoid-numpy' ? '[0, 2, -2]' : '[1, 2, 3]');
  const [testTab, setTestTab] = useState('Testcase');
  const [result, setResult] = useState('Case 1\nCase 2\nCase 3\nx =\n\nAccepts: any');
  const sigmoid = 1 / (1 + Math.exp(-xValue));
  const gradient = sigmoid * (1 - sigmoid);
  const similar = tonicProblems.filter((item) => item.slug !== problem.slug && item.categories.some((cat) => problem.categories.includes(cat))).slice(0, 5);

  useEffect(() => {
    fetch(`http://localhost:3001/api/problems/${problem.slug}/state`)
      .then(res => res.json())
      .then(data => {
        const { state, submissions: subs } = data;
        const codeValue = state.code || getStarterCode(problem, detail);
        setCode(codeValue);
        setStarred(!!state.starred);
        setNotes(state.notes || '');
        setSubmissions(subs || []);
        
        localStorage.setItem(`tt-code-${problem.slug}`, codeValue);
        localStorage.setItem(`tt-star-${problem.slug}`, String(!!state.starred));
        localStorage.setItem(`tt-notes-${problem.slug}`, state.notes || '');
        localStorage.setItem(`tt-submissions-${problem.slug}`, JSON.stringify(subs || []));
      })
      .catch(() => {
        const savedCode = localStorage.getItem(`tt-code-${problem.slug}`);
        setCode(savedCode ?? getStarterCode(problem, detail));
        setStarred(localStorage.getItem(`tt-star-${problem.slug}`) === 'true');
        setNotes(localStorage.getItem(`tt-notes-${problem.slug}`) ?? '');
        setSubmissions(JSON.parse(localStorage.getItem(`tt-submissions-${problem.slug}`) ?? '[]') as string[]);
      });

    setResult('Case 1\nCase 2\nCase 3\nx =\n\nAccepts: any');
    setTestcase(problem.slug === 'sigmoid-numpy' ? '[0, 2, -2]' : '[1, 2, 3]');
    setTestTab('Testcase');
    setTab('Problem');
  }, [problem.slug, detail]);

  const saveCode = () => {
    fetch(`http://localhost:3001/api/problems/${problem.slug}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, notes, starred: starred ? 1 : 0 })
    });
    setResult('Saved to backend');
  };

  const toggleStar = () => {
    const next = !starred;
    setStarred(next);
    fetch(`http://localhost:3001/api/problems/${problem.slug}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, notes, starred: next ? 1 : 0 })
    });
    window.dispatchEvent(new Event('profile-updated'));
  };

  const runCode = () => {
    setResult('Running on backend...');
    setTestTab('Test Result');
    fetch(`http://localhost:3001/api/problems/${problem.slug}/run`, {
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
    fetch(`http://localhost:3001/api/problems/${problem.slug}/submit`, {
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
            <button className={item.slug === problem.slug ? 'active' : ''} key={item.slug} onClick={() => navigate(`/problems/${item.slug}`)}>
              <span>{item.title}</span>
              <b className={`level ${item.difficulty.toLowerCase()}`}>{item.difficulty}</b>
            </button>
          ))}
        </div>
        <small>1 / 14</small>
      </aside>
      <div className="problem-workspace">
        <div className="workspace-tabs">
          {['Problem', 'Theory', 'Solution', 'Submissions', 'Notes', 'Code'].map((item) => (
            <button className={tab === item ? 'active' : ''} key={item} onClick={() => setTab(item)}>
              {item}{item === 'Notes' && <em>NEW</em>}
            </button>
          ))}
        </div>
        <div className="workspace-split">
          <article className="statement-panel">
            <div className="statement-head">
              <div>
                <h1>{detail?.title || problem.title}</h1>
                <div className="tags">{(detail?.categories?.length ? detail.categories : problem.categories).map((tag) => <span key={tag}>{tag}</span>)}</div>
                {detail && !detail.scraped && <small className="fallback-label">Generated local fallback - live page retry needed</small>}
              </div>
              <button className={starred ? 'starred' : ''} onClick={toggleStar} aria-label="Star problem">☆</button>
              <span className={`level ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
            </div>
            {tab === 'Problem' && (
              <>
                <StatementText text={detail?.prompt || `Implement ${problem.title}.`} />
                {problem.slug === 'sigmoid-numpy' && <div className="equation">σ(x) = 1 / (1 + e<sup>-x</sup>)</div>}
                {problem.slug === 'pearson-correlation' && <PearsonCard />}
                {problem.slug === 'sigmoid-numpy' && <div className="sigmoid-card">
                  <h2>Sigmoid Activation</h2>
                  <p>Visualizing non-linearity and gradient saturation</p>
                  <label>
                    <span>x = {xValue.toFixed(2)}</span>
                    <input type="range" min="-6" max="6" step="0.1" value={xValue} onChange={(event) => setXValue(Number(event.target.value))} />
                    <code>{xValue.toFixed(1)}</code>
                  </label>
                  <div className="sigmoid-plot">
                    <i />
                    <b style={{ left: `${((xValue + 6) / 12) * 100}%`, bottom: `${sigmoid * 100}%` }} />
                  </div>
                  <div className="sigmoid-metrics">
                    <span>INPUT (LOGIT)<b>x = {xValue.toFixed(2)}</b></span>
                    <span>ACTIVATION<b>σ(x) = {sigmoid.toFixed(4)}</b></span>
                    <span>GRADIENT<b>σ'(x) = {gradient.toFixed(4)}</b></span>
                  </div>
                </div>}
                <ProblemTextBlocks detail={detail} similar={similar} />
              </>
            )}
            {tab !== 'Problem' && <TabPlaceholder tab={tab} problem={problem} notes={notes} setNotes={(value) => {
              setNotes(value);
              localStorage.setItem(`tt-notes-${problem.slug}`, value);
            }} submissions={submissions} />}
          </article>
          <aside className="code-panel">
            <div className="code-toolbar">
              <button aria-label="Editor settings">Aa</button>
              <button aria-label="Reset code" onClick={() => setCode(getStarterCode(problem, detail))}>Reset</button>
              <button onClick={saveCode}>Save</button>
              <button onClick={runCode}>Run</button>
              <button className="submit" onClick={submitCode}>Submit</button>
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
            <div className="test-tabs">
              {['Testcase', 'Test Result'].map((item) => <button className={testTab === item ? 'active' : ''} key={item} onClick={() => setTestTab(item)}>{item}</button>)}
            </div>
            {testTab === 'Testcase'
              ? <textarea className="testcase-box" value={testcase} onChange={(event) => setTestcase(event.target.value)} placeholder="[1,2,3] or 42" />
              : <pre className="test-output">{result}</pre>}
          </aside>
        </div>
      </div>
    </section>
  );
}