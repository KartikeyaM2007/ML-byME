const fs = require('fs');
const path = require('path');

const upd = fs.readFileSync(path.join(__dirname, '../update_css.cjs'), 'utf8');
const updMatch = upd.match(/const css = `([\s\S]*?)`;\s*fs\.appendFileSync/);
const side = fs.readFileSync(path.join(__dirname, 'append_sidebar_css.js'), 'utf8');
const sideMatch = side.match(/const newCSS = `([\s\S]*?)`;\s*fs\.appendFileSync/);

const layout = `
.workspace-page{display:flex;min-height:calc(100vh - 60px);background:var(--bg-dark,#0b0f0f);color:var(--text-main,#f0f4f4)}
.problem-rail{width:240px;flex-shrink:0;border-right:1px solid var(--border-color);background:var(--panel-bg);padding:12px;overflow-y:auto;display:flex;flex-direction:column;gap:10px}
.problem-rail button{background:rgba(255,255,255,.04);border:1px solid var(--border-color);color:var(--text-muted);border-radius:6px;padding:6px 10px;font-size:12px;cursor:pointer}
.rail-list{display:flex;flex-direction:column;gap:6px;flex:1;overflow-y:auto}
.rail-list button{display:flex;justify-content:space-between;align-items:center;width:100%;text-align:left;padding:10px;background:transparent;border:none;color:#ccc;cursor:pointer;border-radius:6px}
.rail-list button.active,.rail-list button:hover{background:rgba(0,255,136,.08);color:#fff}
.problem-workspace{flex:1;display:flex;flex-direction:column;min-width:0;background:#090c0c}
.workspace-split{display:flex;flex:1;min-height:0}
.statement-panel{flex:1;overflow-y:auto;padding:16px 24px;border-right:1px solid var(--border-color);min-width:0}
.code-panel{flex:1;display:flex;flex-direction:column;min-width:0;background:#0d0f0f}
.code-editor-container{flex:1;min-height:200px}
.statement-markdown{color:#d4d4d8;line-height:1.7;font-size:15px}
.statement-markdown p{margin:0 0 1em}
.level.easy,.txt-easy{color:#4ade80!important}
.level.medium,.txt-medium{color:#fbbf24!important}
.level.hard,.txt-hard{color:#f87171!important}
.pagination{display:flex;gap:8px;align-items:center;justify-content:center;padding:24px}
.pagination button{background:var(--panel-bg);border:1px solid var(--border-color);color:#fff;padding:8px 12px;border-radius:6px;cursor:pointer}
.pagination button.active{background:rgba(0,255,136,.15);border-color:var(--primary-green)}
footer{display:flex;justify-content:space-between;padding:24px;border-top:1px solid var(--border-color);color:var(--text-muted)}
.tensor-logo{width:28px;height:auto}
.home-shell .terrain-canvas{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.9}
.home-content{position:relative;z-index:1}
`;

const root = `:root{--surface:#111515;--surface-light:#1a2222;--line:#1a2222;--text:#f0f4f4;--text-muted:#8b9999;}\n`;

fs.writeFileSync(
  path.join(__dirname, '../src/workspace.css'),
  root + (updMatch?.[1] || '') + layout + (sideMatch?.[1] || ''),
);
console.log('Created src/workspace.css');
