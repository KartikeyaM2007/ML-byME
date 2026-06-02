const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, '../src/main.tsx');
let code = fs.readFileSync(mainPath, 'utf8');

const newHeader = `function Header() {
  const [exploreOpen, setExploreOpen] = useState(false);
  
  return (
    <nav className="tt-nav-bar">
      <div className="tt-nav-container">
        <div className="tt-nav-left">
          <button className="tt-nav-menu-btn">
            <Menu size={20} />
          </button>
          <a className="tt-nav-brand" href="/">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <span>TensorTonic</span>
          </a>
        </div>
        <div className="tt-nav-links">
          <a className="tt-nav-link active" href="/problems">Problems</a>
          <div className="relative" onMouseLeave={() => setExploreOpen(false)}>
            <button className="tt-nav-link" onMouseEnter={() => setExploreOpen(true)} onClick={() => setExploreOpen(!exploreOpen)}>
              Explore <ChevronDown size={14} style={{marginLeft: '4px'}} />
            </button>
            {exploreOpen && <ExploreDropdown close={() => setExploreOpen(false)} />}
          </div>
          <a className="tt-nav-link" href="/interview-prep">Interview Prep</a>
          <a className="tt-nav-link" href="/discussions">Discussions</a>
        </div>
        <div className="tt-nav-actions">
          <button className="tt-btn-icon" title="Discord">
            <MessageCircle size={18} />
          </button>
          <button className="tt-btn-icon" title="Settings">
            <Settings size={18} />
          </button>
          <button className="tt-btn-primary">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}`;

if (!code.includes('Menu,')) {
    code = code.replace(/import \{([^\}]+)\} from 'lucide-react';/, "import {$1, Menu} from 'lucide-react';");
}

code = code.replace(/function Header\(\) \{[\s\S]*?\}\n\nfunction App/, newHeader + '\n\nfunction App');

fs.writeFileSync(mainPath, code);
console.log('Header replaced!');
