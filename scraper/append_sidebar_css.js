const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/style.css');

const newCSS = `
/* TENSORTONIC 1-TO-1 SIDEBAR */
.tt-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 30;
  width: 18rem;
  background-color: #0a0a0a;
  border-right: 1px solid rgba(39, 39, 42, 0.5);
  display: flex;
  flex-direction: column;
  transition: transform 300ms ease-in-out;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.tt-sidebar.closed {
  transform: translateX(-100%);
}

.tt-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 3rem;
  border-bottom: 1px solid rgba(39, 39, 42, 0.5);
  flex-shrink: 0;
}
.tt-sidebar-header span {
  font-size: 0.875rem;
  font-weight: 600;
  color: #fafafa;
}
.tt-sidebar-close {
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: #a1a1aa;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tt-sidebar-close:hover {
  color: #fafafa;
  background-color: #27272a;
}

.tt-sidebar-filters {
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid rgba(39, 39, 42, 0.5);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.tt-sidebar-filters .row {
  display: flex;
  gap: 0.5rem;
}
.tt-sidebar-filters select {
  height: 1.75rem;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  background-color: #09090b;
  border: 1px solid rgba(39, 39, 42, 0.5);
  border-radius: 0.25rem;
  color: #fafafa;
  outline: none;
  cursor: pointer;
}
.tt-sidebar-filters select:focus {
  border-color: rgba(39, 39, 42, 0.8);
}
.tt-sidebar-filters select.w-full {
  width: 100%;
}
.tt-sidebar-filters select.w-auto {
  width: auto;
  flex-shrink: 0;
}

.tt-segment-control {
  display: flex;
  gap: 0.375rem;
}
.tt-segment-btn {
  flex: 1;
  height: 1.5rem;
  font-size: 11px;
  font-weight: 500;
  border-radius: 0.25rem;
  transition: background-color 0.2s, color 0.2s;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tt-segment-btn.active {
  background-color: #fafafa;
  color: #09090b;
}
.tt-segment-btn:not(.active) {
  background-color: #27272a;
  color: #a1a1aa;
}
.tt-segment-btn:not(.active):hover {
  color: #fafafa;
}

.tt-sidebar-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.25rem 0;
}
.tt-sidebar-list::-webkit-scrollbar {
  width: 6px;
}
.tt-sidebar-list::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 3px;
}

.tt-prob-item {
  width: 100%;
  text-align: left;
  padding: 0.625rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  transition: background-color 0.2s;
  cursor: pointer;
}
.tt-prob-item:hover {
  background-color: rgba(39, 39, 42, 0.6);
}
.tt-prob-item .icon {
  flex-shrink: 0;
  color: rgba(161, 161, 170, 0.3);
}
.tt-prob-item .icon.solved {
  color: #22c55e;
}
.tt-prob-item .title {
  font-size: 0.875rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a1a1aa;
  font-weight: 400;
}
.tt-prob-item.active .title {
  color: #fafafa;
  font-weight: 500;
}
.tt-prob-item .diff {
  font-size: 11px;
  flex-shrink: 0;
  font-weight: 500;
  text-transform: capitalize;
}
.tt-prob-item .diff.easy { color: #22c55e; }
.tt-prob-item .diff.medium { color: #eab308; }
.tt-prob-item .diff.hard { color: #ef4444; }

.tt-sidebar-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  color: #a1a1aa;
  background: transparent;
  border: none;
  transition: background-color 0.2s, color 0.2s;
  margin-right: 8px;
}
.tt-sidebar-toggle:hover {
  background-color: #27272a;
  color: #fafafa;
}

.tt-main-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
`;

fs.appendFileSync(cssPath, newCSS);
console.log('Sidebar CSS appended!');
