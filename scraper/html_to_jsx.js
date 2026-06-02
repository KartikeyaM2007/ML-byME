const fs = require('fs');

function htmlToJsx(html) {
    let jsx = html;
    
    // Convert class to className
    jsx = jsx.replace(/class=/g, 'className=');
    
    // Convert for to htmlFor
    jsx = jsx.replace(/for=/g, 'htmlFor=');

    // Convert stroke-width, stroke-linecap, stroke-linejoin
    jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
    jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
    jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
    jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
    jsx = jsx.replace(/stop-color=/g, 'stopColor=');

    // Fix styles
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
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

    // Close self-closing tags
    const tags = ['img', 'input', 'br', 'hr', 'path', 'circle', 'line', 'polygon', 'polyline', 'rect'];
    tags.forEach(tag => {
        const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g');
        jsx = jsx.replace(regex, `<${tag}$1 />`);
    });

    // Remove comments (optional, but React doesn't like HTML comments)
    jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

    // Convert tabindex to tabIndex
    jsx = jsx.replace(/tabindex=/g, 'tabIndex=');
    
    // Next.js injected <script> and styles can be stripped if not needed
    jsx = jsx.replace(/<script[\s\S]*?<\/script>/g, '');
    
    return jsx;
}

module.exports = htmlToJsx;
