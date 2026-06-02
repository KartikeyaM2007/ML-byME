const fs = require('fs');
const path = require('path');

// Internal paths that should use SPA navigation  
const internalPaths = [
  '/', '/problems', '/research', '/ml-math', '/study-plans',
  '/interview-prep', '/ide', '/leaderboard', '/dashboard',
  '/runtime', '/feedback', '/terms', '/pricing'
];

const files = ['Home.tsx', 'Research.tsx', 'MathHub.tsx', 'StudyPlans.tsx'];

for (const file of files) {
  const filePath = path.join(__dirname, '../src', file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace internal <a href="..."> with onClick SPA navigation
  content = content.replace(/href="(\/[^"]*)"/g, (match, href) => {
    // Check if it starts with an internal path prefix
    const isInternal = internalPaths.some(p => href === p || href.startsWith(p + '/'));
    if (isInternal) {
      return `href="${href}" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '${href}'); window.dispatchEvent(new PopStateEvent('popstate')); }}`;
    }
    return match;
  });
  
  // For dynamic hrefs like href={`/study-plans/${...}`} we can't easily intercept 
  // but those should also be converted similarly; let's handle the most common patterns
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ Patched SPA navigation in ${file}`);
}
