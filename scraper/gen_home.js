const fs = require('fs');
const htmlToJsx = require('./html_to_jsx');

const dom = fs.readFileSync('tensortonic_dom_home.html', 'utf8');
const mainStart = dom.indexOf('<main');
const mainEnd = dom.lastIndexOf('</main>') + 7;

if (mainStart === -1 || mainEnd === 6) {
    console.error("Could not find <main> in home DOM");
    process.exit(1);
}

let mainHtml = dom.substring(mainStart, mainEnd);

// For Home page, tensortonic has an outer wrapper in main, and we might need to preserve it.
let jsx = htmlToJsx(mainHtml);

// Clean up problematic characters for React
jsx = jsx.replace(/<!--.*?-->/g, '');
jsx = jsx.replace(/fetchpriority="[^"]*"/g, '');
jsx = jsx.replace(/data-nimg="[^"]*"/g, '');
jsx = jsx.replace(/decoding="[^"]*"/g, '');

const componentStr = `import React from 'react';\n\nexport function Home() {\n  return (\n    ${jsx}\n  );\n}\n`;

fs.writeFileSync('../src/Home.tsx', componentStr);
console.log('Home.tsx generated!');
