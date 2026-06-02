const { execSync } = require('child_process');
const path = require('path');

execSync('node fetch_all_data.js', { cwd: __dirname, stdio: 'inherit' });
execSync('node scrape_research_problems.js', { cwd: __dirname, stdio: 'inherit' });
try {
  execSync('node scrape_tensortonic_api.js', { cwd: __dirname, stdio: 'inherit', env: { ...process.env } });
} catch {
  console.log('CDP full scrape skipped (optional)');
}
execSync('node merge_api_data.js', { cwd: __dirname, stdio: 'inherit' });
console.log('All problem data merged.');
