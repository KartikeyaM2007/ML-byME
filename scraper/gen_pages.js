const fs = require('fs');
const htmlToJsx = require('./html_to_jsx');

const pages = [
    { file: 'tensortonic_dom_research.html', name: 'Research' },
    { file: 'tensortonic_dom_ml-math.html', name: 'MathHub' },
    { file: 'tensortonic_dom_cuda-basics.html', name: 'StudyPlans' }
];

for (const p of pages) {
    const dom = fs.readFileSync(p.file, 'utf8');
    const mainStart = dom.indexOf('<main');
    const mainEnd = dom.lastIndexOf('</main>') + 7;
    
    if (mainStart === -1) {
        console.log(`Could not find <main> in ${p.file}`);
        continue;
    }
    
    let mainHtml = dom.substring(mainStart, mainEnd);
    let jsx = htmlToJsx(mainHtml);
    
    jsx = jsx.replace(/<!--.*?-->/g, '');
    jsx = jsx.replace(/fetchpriority="[^"]*"/g, '');
    jsx = jsx.replace(/data-nimg="[^"]*"/g, '');
    jsx = jsx.replace(/decoding="[^"]*"/g, '');

    const componentStr = `import React from 'react';\n\nexport function ${p.name}() {\n  return (\n    ${jsx}\n  );\n}\n`;
    fs.writeFileSync(`../src/${p.name}.tsx`, componentStr);
    console.log(`${p.name}.tsx generated!`);
}
