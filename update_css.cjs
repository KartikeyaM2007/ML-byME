const fs = require('fs');

const css = `
/* Redesign CSS */

.workspace-tabs-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  padding: 0 16px;
  background: var(--surface);
}

.workspace-tabs-scroll {
  display: flex;
  align-items: center;
  gap: 16px;
}

.workspace-tabs-scroll button {
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 12px 0;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 6px;
}

.workspace-tabs-scroll button:hover {
  color: var(--text);
}

.workspace-tabs-scroll button.active {
  color: var(--text);
  border-bottom-color: var(--text);
  font-weight: 500;
}

.workspace-tabs-nav {
  display: flex;
  gap: 8px;
}

.workspace-tabs-nav button {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
}

.workspace-tabs-nav button:hover {
  color: var(--text);
}

.statement-head-new {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.statement-head-new h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.statement-head-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.statement-head-right button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
}

.statement-tags {
  margin-bottom: 24px;
}

.problem-tag-badge {
  background: var(--surface-light);
  color: var(--text-muted);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.statement-content-scroll {
  overflow-y: auto;
  padding-bottom: 40px;
}

.equation-box {
  background: var(--surface-light);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 24px;
  margin: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

/* Sigmoid Widget */
.sigmoid-card-new {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  margin: 32px 0;
  overflow: hidden;
}

.sig-header-new {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--line);
}

.sig-title-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sig-title-area h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.sig-slider-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sig-slider-area input[type="range"] {
  width: 150px;
  accent-color: #f93562;
}

.sig-desc {
  padding: 12px 16px;
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}

.sig-body {
  display: flex;
  padding: 16px;
  gap: 24px;
}

.sig-plot {
  flex: 1.5;
  height: 250px;
  border: 1px solid var(--line);
  border-radius: 8px;
  position: relative;
  background: var(--surface-light);
  overflow: hidden;
}

.sig-plot i {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: rgba(255,255,255,0.1);
  border-left: 1px dashed rgba(255,255,255,0.2);
}

.sig-plot::before {
  content: '';
  position: absolute;
  left: 0; right: 0; top: 50%;
  height: 1px;
  background: rgba(255,255,255,0.1);
}

.sig-plot b {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, 50%);
  box-shadow: 0 0 10px #f93562;
}

.sig-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sig-stat-box {
  background: var(--surface-light);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.val {
  font-family: monospace;
  font-size: 16px;
  font-weight: 600;
}

.val.red { color: #f93562; }
.val.green { color: #00d6b2; }

/* Editor Toolbar */
.code-toolbar-new {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.toolbar-left, .toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-left button {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
}

.toolbar-left button:hover {
  background: var(--surface-light);
  color: var(--text);
}

.run-btn, .submit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.run-btn {
  background: var(--surface-light);
  color: var(--text);
}

.run-btn:hover {
  background: rgba(255,255,255,0.1);
}

.submit-btn {
  background: #00d6b2;
  color: #000;
}

.submit-btn:hover {
  background: #00eabf;
}

/* Testcase Panel */
.testcase-panel {
  border-top: 1px solid var(--line);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  height: 250px;
}

.test-tabs-new {
  display: flex;
  border-bottom: 1px solid var(--line);
  padding: 0 16px;
}

.test-tabs-new button {
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 10px 16px;
  font-size: 13px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 6px;
}

.test-tabs-new button.active {
  color: var(--text);
  border-bottom-color: var(--text);
}

.test-body {
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}

.case-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.case-tabs button {
  background: var(--surface-light);
  border: 1px solid var(--line);
  color: var(--text-muted);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.case-tabs button.active {
  background: rgba(255,255,255,0.05);
  color: var(--text);
  border-color: rgba(255,255,255,0.2);
}

.case-tabs button.add-case {
  padding: 6px 10px;
}

.case-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.case-label {
  font-size: 13px;
  color: var(--text-muted);
}

.testcase-box-new {
  background: #1e1e1e;
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 12px;
  color: #d4d4d4;
  font-family: monospace;
  font-size: 13px;
  resize: vertical;
  min-height: 80px;
}

.case-helper {
  font-size: 12px;
  color: var(--text-muted);
}

.test-output-new {
  background: #1e1e1e;
  border-radius: 4px;
  padding: 16px;
  color: #d4d4d4;
  font-family: monospace;
  font-size: 13px;
  margin: 0;
}

/* Problem Text Blocks */
.examples-section .example-box {
  background: var(--surface-light);
  border: 1px solid var(--line);
  border-left: 3px solid #00d6b2;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  font-family: monospace;
}

.examples-section .example-box p {
  margin: 0;
}

.hint-box {
  border: 1px solid var(--line);
  border-radius: 4px;
  margin-bottom: 8px;
}

.hint-box summary {
  padding: 12px 16px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
}

.hint-box summary::-webkit-details-marker {
  display: none;
}

.hint-content {
  padding: 0 16px 16px 36px;
  color: var(--text-muted);
}

.list-section .bullet-list ul {
  padding-left: 20px;
  color: var(--text-muted);
}

.list-section .bullet-list li {
  margin-bottom: 4px;
}
`;

fs.appendFileSync('src/style.css', css);
console.log('CSS appended successfully');
