const fs = require('fs');
const path = require('path');

const files = ['Home.tsx', 'Research.tsx', 'MathHub.tsx', 'StudyPlans.tsx'];

for (const file of files) {
    const filePath = path.join(__dirname, '../src', file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // In XML mode, cheerio might have nested siblings into void tags.
    // e.g. <img src="a"><span>b</span></img>
    // We want to turn this into <img src="a" /><span>b</span>
    
    const voidTags = ['img', 'input', 'br', 'hr', 'path', 'circle', 'line', 'polygon', 'polyline', 'rect'];
    
    voidTags.forEach(tag => {
        // Find opening tag that doesn't end with /> and change to />
        const openRegex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g');
        content = content.replace(openRegex, `<${tag}$1 />`);
        
        // Remove closing tag entirely
        const closeRegex = new RegExp(`</${tag}>`, 'g');
        content = content.replace(closeRegex, '');
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed void tags in ${file}`);
}
