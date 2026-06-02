const fs = require('fs');
const path = require('path');

// These are CSS properties that appear as inline style strings but must NOT appear as JSX attributes
// We already convert them via style={} objects, but they may appear as bare attributes in SVGs
// from old scraped HTML.
const files = ['Home.tsx', 'Research.tsx', 'MathHub.tsx', 'StudyPlans.tsx'];

const svgAttrToJsx = {
  'font-family': 'fontFamily',
  'text-anchor': 'textAnchor',
  'pointer-events': 'pointerEvents',
  'dominant-baseline': 'dominantBaseline',
  'alignment-baseline': 'alignmentBaseline',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'shape-rendering': 'shapeRendering',
  'vector-effect': 'vectorEffect',
  'image-rendering': 'imageRendering',
  'flood-color': 'floodColor',
  'flood-opacity': 'floodOpacity',
  'lighting-color': 'lightingColor',
  'marker-end': 'markerEnd',
  'marker-mid': 'markerMid',
  'marker-start': 'markerStart',
  'paint-order': 'paintOrder',
  'word-spacing': 'wordSpacing',
  'letter-spacing': 'letterSpacing',
  'text-decoration': 'textDecoration',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'font-style': 'fontStyle',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'fill-opacity': 'fillOpacity',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
};

for (const file of files) {
  const filePath = path.join(__dirname, '../src', file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const [kebab, camel] of Object.entries(svgAttrToJsx)) {
    // Match attribute pattern: kebab-name="value" and replace with camelCase="value"
    const attrRegex = new RegExp(`\\b${kebab.replace(/-/g, '\\-')}=`, 'g');
    content = content.replace(attrRegex, `${camel}=`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ Patched SVG attrs in ${file}`);
}
