const cheerio = require('cheerio');
const fs = require('fs');

const pages = [
    { file: 'tensortonic_dom_home.html', name: 'Home' },
    { file: 'tensortonic_dom_research.html', name: 'Research' },
    { file: 'tensortonic_dom_ml-math.html', name: 'MathHub' },
    { file: 'tensortonic_dom_cuda-basics.html', name: 'StudyPlans' }
];

function htmlToJsx(raw) {
    // Parse as HTML so void elements are handled correctly
    const $ = cheerio.load(raw, { decodeEntities: false, xmlMode: false });

    // Extract ONLY <main> or body children (not <html><body> wrapper)
    // Use cheerio's html() on the main element only
    const mainEl = $('main');
    let xml;
    if (mainEl.length) {
        // Get the outer XML of just the main element
        xml = cheerio.load(mainEl.toString(), { decodeEntities: false, xmlMode: true }).xml();
        // Strip wrapping <html><head/><body>...</body></html>
        xml = xml.replace(/^<html><head\/><body>/, '').replace(/<\/body><\/html>$/, '');
    } else {
        // Fallback: grab the body content
        xml = $('body').html() || '';
    }

    // ---- JSX attribute rewrites ----
    xml = xml.replace(/\bclass=/g, 'className=');
    xml = xml.replace(/\bfor=/g, 'htmlFor=');
    xml = xml.replace(/\bstroke-width=/g, 'strokeWidth=');
    xml = xml.replace(/\bstroke-linecap=/g, 'strokeLinecap=');
    xml = xml.replace(/\bstroke-linejoin=/g, 'strokeLinejoin=');
    xml = xml.replace(/\bfill-rule=/g, 'fillRule=');
    xml = xml.replace(/\bclip-rule=/g, 'clipRule=');
    xml = xml.replace(/\bstop-color=/g, 'stopColor=');
    xml = xml.replace(/\bstop-opacity=/g, 'stopOpacity=');
    xml = xml.replace(/\bstroke-dasharray=/g, 'strokeDasharray=');
    xml = xml.replace(/\btabindex=/g, 'tabIndex=');
    xml = xml.replace(/\bsrcset=/g, 'srcSet=');
    xml = xml.replace(/\bautoplay=/g, 'autoPlay=');
    xml = xml.replace(/\bautofocus=/g, 'autoFocus=');
    xml = xml.replace(/\bcrossorigin=/g, 'crossOrigin=');
    xml = xml.replace(/\bspellcheck=/g, 'spellCheck=');
    xml = xml.replace(/\bviewbox=/g, 'viewBox=');
    xml = xml.replace(/\bpreserveaspectratio=/g, 'preserveAspectRatio=');

    // Fix tabIndex="0" -> tabIndex={0} and tabIndex="-1" -> tabIndex={-1}
    xml = xml.replace(/tabIndex="(-?\d+)"/g, 'tabIndex={$1}');

    // ---- SVG attribute camelCase rewrites ----
    const svgAttrs = {
      'font-family': 'fontFamily', 'text-anchor': 'textAnchor',
      'pointer-events': 'pointerEvents', 'dominant-baseline': 'dominantBaseline',
      'alignment-baseline': 'alignmentBaseline', 'color-interpolation': 'colorInterpolation',
      'shape-rendering': 'shapeRendering', 'vector-effect': 'vectorEffect',
      'flood-color': 'floodColor', 'flood-opacity': 'floodOpacity',
      'marker-end': 'markerEnd', 'marker-mid': 'markerMid', 'marker-start': 'markerStart',
      'stroke-miterlimit': 'strokeMiterlimit', 'stroke-opacity': 'strokeOpacity',
      'fill-opacity': 'fillOpacity', 'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity',
      'stroke-dasharray': 'strokeDasharray', 'stroke-dashoffset': 'strokeDashoffset',
      'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
      'stroke-linejoin': 'strokeLinejoin', 'fill-rule': 'fillRule',
      'clip-rule': 'clipRule', 'clip-path': 'clipPath',
    };
    for (const [kebab, camel] of Object.entries(svgAttrs)) {
      xml = xml.replace(new RegExp('\\b' + kebab.replace(/-/g, '\\-') + '=', 'g'), camel + '=');
    }

    // ---- Style rewrites ----
    xml = xml.replace(/style="([^"]*)"/g, (match, styleString) => {
        const rules = styleString.split(';').filter(s => s.trim());
        const styleObj = {};
        for (let rule of rules) {
            const colonIdx = rule.indexOf(':');
            if (colonIdx === -1) continue;
            const key = rule.substring(0, colonIdx).trim();
            const val = rule.substring(colonIdx + 1).trim();
            if (!key || !val) continue;
            const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            styleObj[camelKey] = val;
        }
        return `style={${JSON.stringify(styleObj)}}`;
    });

    // ---- Strip irrelevant attributes ----
    xml = xml.replace(/<!--[\s\S]*?-->/g, '');
    xml = xml.replace(/\bfetchpriority="[^"]*"/g, '');
    xml = xml.replace(/\bdata-nimg="[^"]*"/g, '');
    xml = xml.replace(/\bdecoding="[^"]*"/g, '');
    xml = xml.replace(/<script[\s\S]*?<\/script>/g, '');
    xml = xml.replace(/<noscript[\s\S]*?<\/noscript>/g, '');

    return xml;
}

for (const p of pages) {
    const dom = fs.readFileSync(p.file, 'utf8');
    const jsx = htmlToJsx(dom);
    const componentStr = `import React from 'react';\n\nexport function ${p.name}() {\n  return (\n${jsx}\n  );\n}\n`;
    fs.writeFileSync(`../src/${p.name}.tsx`, componentStr);
    console.log(`✓ ${p.name}.tsx generated (no html/body wrapper)`);
}
