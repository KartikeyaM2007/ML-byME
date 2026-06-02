const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/style.css');

const newCSS = `
/* TENSORTONIC 1-TO-1 NAV BAR */
.tt-nav-bar {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  backdrop-filter: blur(24px);
  background-color: rgba(10, 10, 10, 0.8);
  border-bottom: 1px solid rgba(39, 39, 42, 0.5); /* border-border/50 */
  color: #fafafa;
}

.tt-nav-container {
  max-width: 1536px;
  margin-left: auto;
  margin-right: auto;
  height: 56px; /* h-14 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.tt-nav-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.tt-nav-menu-btn {
  display: none; /* md:hidden normally, but let's hide on desktop */
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  background: transparent;
  border: none;
  color: #a1a1aa;
}
.tt-nav-menu-btn:hover {
  background: #27272a;
  color: #fafafa;
}
@media (max-width: 768px) {
  .tt-nav-menu-btn { display: flex; }
}

.tt-nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: opacity 0.2s;
}
.tt-nav-brand:hover {
  opacity: 0.8;
}
.tt-nav-brand span {
  color: #fafafa;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: -0.025em;
}
@media (max-width: 640px) {
  .tt-nav-brand span { display: none; }
}

.tt-nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .tt-nav-links { display: none; }
}

.tt-nav-link {
  font-size: 0.875rem; /* text-sm */
  color: #a1a1aa; /* text-muted-foreground */
  text-decoration: none;
  transition: color 0.2s;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0;
}
.tt-nav-link:hover {
  color: #fafafa; /* hover:text-foreground */
}
.tt-nav-link.active {
  color: #fafafa;
}

.tt-nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* md:gap-4 */
}

.tt-btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 0.375rem;
  background: transparent;
  border: none;
  color: #fafafa;
  transition: background-color 0.2s;
}
.tt-btn-icon:hover {
  background-color: #27272a; /* hover:bg-accent */
}

.tt-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px; /* rounded-full */
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #fafafa; /* bg-primary */
  color: #09090b; /* text-primary-foreground */
  height: 36px;
  padding: 0 1rem;
  border: none;
  transition: opacity 0.2s;
}
.tt-btn-primary:hover {
  opacity: 0.9;
}
`;

fs.appendFileSync(cssPath, newCSS);
console.log('CSS appended!');
