const fs = require('fs');
const ts = require('typescript');

const code = fs.readFileSync('src/data/problemDetails.ts', 'utf8');
const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;

const ex = {};
eval(js.replace(/exports\./g, 'ex.'));
const problems = ex.problemDetails;

for (const p of problems) {
    if (p.statement) {
        let lines = p.statement.split('\n');
        
        let startIndex = 0;
        for (let i = 0; i < Math.min(10, lines.length); i++) {
            if (['Easy', 'Medium', 'Hard'].includes(lines[i].trim())) {
                startIndex = i + 1;
                break;
            }
        }
        
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

const newCode = `export type ProblemDetailData = {
  slug: string;
  title: string;
  url: string;
  difficulty: string;
  categories: string[];
  statement: string;
  prompt?: string;
  examples?: string;
  hints?: string;
  requirements?: string;
  constraints?: string;
  starterCode?: string;
  scraped?: boolean;
};

export const problemDetails: ProblemDetailData[] = ${JSON.stringify(problems, null, 2)};
`;

fs.writeFileSync('src/data/problemDetails.ts', newCode);
console.log('Cleaned problems!');
