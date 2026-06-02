const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

const components = `
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
      const examples = content.split(/Example \\d+:/).filter(Boolean);
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
              <a key={s.slug} href={\`/problems/\${s.slug}\`} className="similar-item">
                {s.title}
              </a>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
`;

const ix = code.indexOf('function ProblemDetail');
code = code.substring(0, ix) + components + '\\n' + code.substring(ix);

fs.writeFileSync('src/main.tsx', code);
console.log('main.tsx blocks added successfully');
