const fs = require('fs');

const code = fs.readFileSync('src/data/problemDetails.ts', 'utf8');
const pStart = code.indexOf('[');
const pEnd = code.lastIndexOf(']');
const problems = JSON.parse(code.substring(pStart, pEnd + 1));

for (const p of problems) {
    if (p.statement) {
        let lines = p.statement.split('\n');
        
        // Find where the actual prompt starts.
        // It's usually after the Difficulty.
        let startIndex = 0;
        for (let i = 0; i < Math.min(10, lines.length); i++) {
            if (['Easy', 'Medium', 'Hard'].includes(lines[i].trim())) {
                startIndex = i + 1;
                break;
            }
        }
        
        // Find where it ends.
        // Usually ends before "Examples" or "Hint 1" or "Requirements"
        let endIndex = lines.length;
        for (let i = startIndex; i < lines.length; i++) {
            if (lines[i].startsWith('Examples') || lines[i].startsWith('Hint 1') || lines[i].startsWith('Requirements') || lines[i].startsWith('Pearson Correlation\nρ = Cov')) {
                endIndex = i;
                break;
            }
        }

        let newPrompt = lines.slice(startIndex, endIndex).join('\n').trim();
        p.prompt = newPrompt;
    }
}

let newCode = code.substring(0, pStart) + JSON.stringify(problems, null, 2) + code.substring(pEnd + 1);
fs.writeFileSync('src/data/problemDetails.ts', newCode);
console.log('Done!');
