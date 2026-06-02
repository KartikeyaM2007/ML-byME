const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/problemDetails.partial.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const problems = JSON.parse(rawData);

let modified = 0;

problems.forEach(p => {
  if (!p.statement || p.statement.trim() === '') {
    modified++;
    const title = p.title || 'Machine Learning Problem';
    const diff = p.difficulty || 'Medium';
    
    p.statement = `${title}\n\nDifficulty: ${diff}\n\nDescription:\nImplement ${title} from scratch. This problem tests your understanding of the underlying mathematical concepts and your ability to write efficient, vectorized code.\n\nYou should focus on numerical stability and performance.`;
    
    p.prompt = `${title}\n\nImplement ${title} from scratch. Ensure your implementation is correct and optimized.`;
    
    p.constraints = "Constraints:\n- Vectorized implementation only (no loops)\n- Time limit: 2000 ms\n- Memory limit: 256 MB\n- Allowed libraries: NumPy only";
    
    p.examples = "Examples:\n\nInput: [0.1, 0.2, 0.3]\nOutput: [0.1, 0.2, 0.3] # (Varies based on actual implementation)";
    
    p.requirements = "Requirements:\n- Must handle variable sized inputs\n- Return numpy arrays of floats\n- Do not use any deep learning frameworks (PyTorch/TensorFlow)";
    
    p.starterCode = `import numpy as np\n\ndef solve(x):\n    \"\"\"\n    Implement ${title}\n    \"\"\"\n    # Write your code here\n    pass`;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(problems, null, 2));
console.log(`Successfully populated ${modified} missing problems with realistic placeholder data.`);
