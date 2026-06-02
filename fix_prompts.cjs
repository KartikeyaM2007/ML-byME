const fs = require('fs');

let code = fs.readFileSync('src/data/problemDetails.ts', 'utf8');

// The file might export problemDetails as a const array.
// Let's parse it safely by extracting the JSON if possible, or using evaluation.
const ts = require('typescript');
const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const ex = {};
eval(js.replace(/exports\./g, 'ex.'));
const problems = ex.problemDetails;

for (let p of problems) {
    if (p.prompt) {
        // Fix setext headings by escaping lines that are just "=" or "-"
        p.prompt = p.prompt.replace(/\n=+\n/g, '\n\\=\n').replace(/\n-+\n/g, '\n\\-\n');
        
        // Remove widget garbage for pearson
        if (p.slug === 'pearson-correlation') {
            p.prompt = `Compute the Pearson correlation matrix from a dataset without using np.corrcoef. Correlation measures linear relationships between features, normalized by their standard deviations.

**Pearson Correlation Formula:**
$$ \\rho_{ij} = \\frac{\\text{Cov}(X_i, X_j)}{\\sigma_i \\sigma_j} $$

**Matrix Form:**
$$ R = \\Sigma \\oslash (\\sigma \\sigma^T) $$

Where: $\\Sigma$ = covariance matrix, $\\sigma$ = vector of standard deviations, $R$ = correlation matrix

**Function Arguments**
- \`X\`: \`list[list[float]] | np.ndarray\` - Dataset with shape \`(N, D)\``;
        }

        if (p.slug === 'sigmoid-numpy') {
            p.prompt = `Implement the sigmoid activation function:

$$ \\sigma(x) = \\frac{1}{1 + e^{-x}} $$`;
        }
        
        // General cleanup for other garbled math that we might find:
        // Strip out the interactive widget text if it accidentally got left in
        const widgetIndices = [
            p.prompt.indexOf('Sigmoid Activation\nVisualizing'),
            p.prompt.indexOf('Pearson Correlation\nρ = Cov'),
            p.prompt.indexOf('click scatter to add points')
        ];
        for (let idx of widgetIndices) {
            if (idx !== -1) {
                p.prompt = p.prompt.substring(0, idx).trim();
            }
        }
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
console.log('Fixed prompts!');
