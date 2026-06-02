const cheerio = require('cheerio');
const fs = require('fs');

const pages = [
    { file: 'tensortonic_dom_home.html', name: 'Home' },
    { file: 'tensortonic_dom_research.html', name: 'Research' },
    { file: 'tensortonic_dom_ml-math.html', name: 'MathHub' },
    { file: 'tensortonic_dom_cuda-basics.html', name: 'StudyPlans' }
];

for (const p of pages) {
    const dom = fs.readFileSync(p.file, 'utf8');
    
    // Find main
    const mainStart = dom.indexOf('<main');
    const mainEnd = dom.lastIndexOf('</main>') + 7;
    let mainHtml = dom.substring(mainStart, mainEnd);
    
    // Load with normal HTML mode to correctly parse DOM structure
    // HTML mode knows that <img> cannot have children!
    const $ = cheerio.load(mainHtml, { decodeEntities: false });
    
    // Now output as XML so it self-closes tags correctly!
    let xml = $.xml();
    
    // Now apply JSX string replacements
    xml = xml.replace(/class=/g, 'className=');
    xml = xml.replace(/for=/g, 'htmlFor=');
    xml = xml.replace(/stroke-width=/g, 'strokeWidth=');
    xml = xml.replace(/stroke-linecap=/g, 'strokeLinecap=');
    xml = xml.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    xml = xml.replace(/fill-rule=/g, 'fillRule=');
    xml = xml.replace(/clip-rule=/g, 'clipRule=');
    xml = xml.replace(/stop-color=/g, 'stopColor=');
    xml = xml.replace(/tabindex=/g, 'tabIndex=');
    xml = xml.replace(/srcset=/g, 'srcSet=');
    
    // Fix styles
    xml = xml.replace(/style="([^"]*)"/g, (match, styleString) => {
        const rules = styleString.split(';').filter(s => s.trim());
        const styleObj = {};
        for (let rule of rules) {
            const [key, ...valueParts] = rule.split(':');
            if (key && valueParts.length > 0) {
                let camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[camelKey] = valueParts.join(':').trim();
            }
        }
        return `style={${JSON.stringify(styleObj)}}`;
    });
    
    xml = xml.replace(/<!--[\s\S]*?-->/g, '');
    xml = xml.replace(/fetchpriority="[^"]*"/g, '');
    xml = xml.replace(/data-nimg="[^"]*"/g, '');
    xml = xml.replace(/decoding="[^"]*"/g, '');
    xml = xml.replace(/<script[\s\S]*?<\/script>/g, '');

    // Add empty string for <> wrapper in case there's multiple roots (shouldn't be, main is the root)
    const componentStr = `import React from 'react';\n\nexport function ${p.name}() {\n  return (\n    <>\n${xml}\n</>\n  );\n}\n`;
    fs.writeFileSync(`../src/${p.name}.tsx`, componentStr);
    console.log(`${p.name}.tsx generated using Cheerio HTML parse -> XML serialize!`);
}
