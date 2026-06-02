const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, '../src/main.tsx');
let code = fs.readFileSync(mainPath, 'utf8');

// Add imports
const importsToAdd = `
import { Home } from './Home';
import { Research } from './Research';
import { MathHub } from './MathHub';
import { StudyPlans } from './StudyPlans';
`;
if (!code.includes("import { Home }")) {
    code = code.replace("import './style.css';", "import './style.css';" + importsToAdd);
}

// Remove old functions
// We have to be careful with regex matching entire functions
function removeFunction(name) {
    const regex = new RegExp(`function ${name}\\(\\)\\s*\\{[\\s\\S]*?\\n\\}`);
    code = code.replace(regex, '');
}

removeFunction('Home');
removeFunction('Research');
removeFunction('MathHub');
// StudyPlans might have a slightly different signature or body, let's just use a general replace for these specific ones.
// Actually, it's safer to do this with targeted replacements.
// Since we might match too much or too little with regex, let's use a more robust regex for the functions.
const funcsToRemove = ['Home', 'Research', 'MathHub', 'StudyPlans'];
funcsToRemove.forEach(f => {
    // Matches "function Name() { ... }" accounting for nested braces by matching until "\n}\n"
    const regex = new RegExp(`function ${f}\\([\\s\\S]*?\\n\\}\\n`, 'g');
    code = code.replace(regex, '\n');
});

fs.writeFileSync(mainPath, code);
console.log('main.tsx updated with new imports and old functions removed!');
