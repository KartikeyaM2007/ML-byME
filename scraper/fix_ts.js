const fs = require('fs');

// Fix problemDetails.ts
const pdPath = '../src/data/problemDetails.ts';
let pd = fs.readFileSync(pdPath, 'utf8');
pd = pd.replace(/starterCode:\s*\[\]/g, 'starterCode: ""');
fs.writeFileSync(pdPath, pd);

// Fix srcset
const files = ['Home.tsx', 'Research.tsx'];
for (let f of files) {
    const p = '../src/' + f;
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/srcset=/g, 'srcSet=');
    fs.writeFileSync(p, content);
}

console.log("Fixed TS errors");
