const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const apiPath = path.join(__dirname, '../src/data/tensortonic.api.json');
const list = JSON.parse(fs.readFileSync(apiPath, 'utf8'));
let id = 1;
for (const p of list) {
  if (typeof p.id === 'number' && p.id >= id) id = p.id + 1;
}
for (const p of list) {
  if (p.id == null || p.id === undefined) {
    p.id = id++;
  }
}
fs.writeFileSync(apiPath, JSON.stringify(list, null, 2));
execSync('node merge_api_data.js', { cwd: __dirname, stdio: 'inherit' });
console.log('Fixed IDs, total problems:', list.length);
