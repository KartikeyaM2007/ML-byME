const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

if (!code.includes('ArrowLeft')) {
  code = code.replace(/} from 'lucide-react';/, ', ArrowLeft, Grid, BarChart2, Tag } from \'lucide-react\';');
}

const newStudyPlanDetail = `function StudyPlanDetail({ path }: { path: string }) {
  const slug = path.split('/')[2];
  
  const planInfo = [
    { title: 'Pandas Sheet', desc: 'Data Manipulation Essentials', count: 25, slug: 'pandas-basics' },
    { title: 'NumPy Sheet', desc: 'Array Computing from Scratch', count: 25, slug: 'numpy-basics' },
    { title: 'PyTorch Sheet', desc: 'Tensors, Autograd, and Models', count: 30, slug: 'pytorch-basics' },
    { title: 'SQL Sheet', desc: 'Query Data Like a Pro', count: 25, slug: 'sql-basics' },
    { title: 'CUDA Kernels', desc: 'Program GPUs from first principles', count: 35, slug: 'cuda-basics' },
    { title: 'Triton Kernels', desc: 'Write block-level GPU kernels in Python', count: 30, slug: 'triton-basics' },
    { title: 'Linear Algebra', desc: 'The Language of ML', count: 30, slug: 'math-linear-algebra' },
    { title: 'Probability & Statistics', desc: 'Reasoning Under Uncertainty', count: 30, slug: 'math-probability' },
    { title: 'Calculus for ML', desc: 'Derivatives, Gradients, Optimization', count: 30, slug: 'math-calculus' },
    { title: 'Optimization', desc: 'Finding Optimal Solutions', count: 25, slug: 'math-optimization' },
    { title: 'Cracking ML', desc: '35 Machine Learning Problems', count: 35, slug: 'cracking-ml' },
    { title: 'Cracking Deep Learning', desc: '35 Deep Learning Problems', count: 35, slug: 'cracking-dl' },
    { title: 'Cracking NLP', desc: '35 NLP and Language Model Problems', count: 35, slug: 'cracking-nlp' },
    { title: 'Cracking RL', desc: '30 Reinforcement Learning problems', count: 30, slug: 'cracking-rl' }
  ].find(p => p.slug === slug);

  if (!planInfo) {
    return <PageShell eyebrow="Study Plan" title="Not Found" text="Plan not found" />;
  }
  
  const planCategoryMap: Record<string, string[]> = {
    'pandas-basics': ['Data Processing', 'Feature Engineering'],
    'numpy-basics': ['Linear Algebra'],
    'pytorch-basics': ['Neural Networks', 'Optimization', 'Loss Functions', 'Activation Functions'],
    'sql-basics': ['Data Processing'],
    'cuda-basics': ['Neural Networks', 'Linear Algebra'],
    'triton-basics': ['Neural Networks', 'Optimization'],
    'math-linear-algebra': ['Linear Algebra'],
    'math-probability': ['Probability and Statistics'],
    'math-calculus': ['Optimization', 'Loss Functions'],
    'math-optimization': ['Optimization'],
    'cracking-ml': ['Classic ML', 'Metrics & Evaluation', 'Feature Engineering'],
    'cracking-dl': ['Neural Networks', 'Optimization', 'Loss Functions', 'Activation Functions', 'Transformers'],
    'cracking-nlp': ['NLP', 'Transformers'],
    'cracking-rl': ['Reinforcement Learning'],
  };

  const relevantCategories = planCategoryMap[planInfo.slug] || [];
  
  const sortedProblems = [...tonicProblems].sort((a, b) => {
    const aMatch = a.categories.some(c => relevantCategories.includes(c)) ? 1 : 0;
    const bMatch = b.categories.some(c => relevantCategories.includes(c)) ? 1 : 0;
    if (aMatch !== bMatch) return bMatch - aMatch;
    const hashA = (a.id * 137 + planInfo.slug.charCodeAt(0) * 19) % 1000;
    const hashB = (b.id * 137 + planInfo.slug.charCodeAt(0) * 19) % 1000;
    return hashA - hashB;
  });

  const planProblems = sortedProblems.slice(0, planInfo.count);

  const numSections = 5;
  const sectionSize = Math.ceil(planProblems.length / numSections);
  const sections = Array.from({ length: numSections }, (_, i) => {
    const sectionProblems = planProblems.slice(i * sectionSize, (i + 1) * sectionSize);
    const cats = sectionProblems.flatMap(p => p.categories);
    const topCat = cats.sort((a,b) => cats.filter(v => v===a).length - cats.filter(v => v===b).length).pop() || planInfo.title;
    
    return {
      id: i,
      title: i === numSections - 1 ? 'Advanced Concepts' : \`\${topCat} Basics\`,
      problems: sectionProblems
    };
  });

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', cursor: 'pointer', marginBottom: '24px' }} onClick={() => { window.history.pushState({}, '', '/study-plans'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
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

        {/* Upgrade Card */}
        <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={20} color="#10b981" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '16px', fontWeight: 600 }}>Unlock the full study plan</h3>
              <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Upgrade to Pro to access the full curriculum.</p>
            </div>
          </div>
          <button style={{ background: '#0d9488', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            Upgrade to Pro
          </button>
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
                    const { solved, starred } = getProblemState(p.slug);
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
                        onClick={() => { window.history.pushState({}, '', '/problems/' + p.slug); window.dispatchEvent(new PopStateEvent('popstate')); }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <Lock size={14} color="#666" />
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
      <style>{\`
        .study-plan-problem-row:hover {
          background: rgba(255,255,255,0.03);
        }
        .study-plan-quiz-row:hover {
          background: rgba(234, 179, 8, 0.1) !important;
          cursor: pointer;
        }
      \`}</style>
    </div>
  );
}`;

const startIndex = code.indexOf('function StudyPlanDetail({ path }: { path: string }) {');
const endIndex = code.indexOf('function ProblemCard({ problem }: { problem: TonicProblem }) {');

if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + newStudyPlanDetail + '\n\n' + code.substring(endIndex);
  fs.writeFileSync('src/main.tsx', code);
  console.log('Successfully updated main.tsx');
} else {
  console.log('Could not find StudyPlanDetail bounds', startIndex, endIndex);
}
