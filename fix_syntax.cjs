const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

// Fix the \n literal
code = code.replace('\\\\nfunction ProblemDetail', '\\nfunction ProblemDetail');

// Use simple string replacement for LaTeX
code = code.split('\\\\(\\\\sigma(x) = \\\\frac{1}{1 + e^{-x}}\\\\)').join('{"\\\\(\\\\sigma(x) = \\\\frac{1}{1 + e^{-x}}\\\\)"}');
code = code.split('\\\\(\\\\sigma(x)\\\\) =').join('{"\\\\(\\\\sigma(x)\\\\)"} =');
code = code.split("\\\\(\\\\sigma'(x)\\\\) =").join('{"\\\\(\\\\sigma\\'(x)\\\\)"} =');

fs.writeFileSync('src/main.tsx', code);
console.log('Fixed syntax errors');
