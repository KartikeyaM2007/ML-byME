const fs = require('fs');
const path = require('path');

const files = ['Home.tsx', 'Research.tsx', 'MathHub.tsx', 'StudyPlans.tsx'];

for (const file of files) {
    const filePath = path.join(__dirname, '../src', file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove redundant closing tags that might have been left over
    const redundantTags = ['path', 'circle', 'line', 'polygon', 'polyline', 'rect', 'img', 'input', 'br', 'hr'];
    
    redundantTags.forEach(tag => {
        const regex = new RegExp(`</${tag}>`, 'g');
        content = content.replace(regex, '');
    });
    
    // Some SVGs might have `<defs>` or other tags that aren't closed properly if my script messed with them.
    // Wait, my script ONLY replaced opening tags with self-closing if they didn't have `/` at the end.
    // So `<path d="..."></path>` became `<path d="..." /></path>`. Removing `</path>` makes it `<path d="..." />`. This is perfect!
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed JSX tags in ${file}`);
}
