const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { loadTopicMeta } = require('./problem_detail_generator');

const DATA = path.join(__dirname, '../src/data');
const topicMeta = loadTopicMeta();

function theoryFor(d) {
  const meta = topicMeta[d.slug];
  const title = d.title || d.slug;
  const paper = meta?.paperTitle ? ` from *${meta.paperTitle}*` : '';
  return [
    `### Concept overview`,
    meta?.description || `Core ideas behind **${title}**${paper}.`,
    '',
    `### Why it matters in ML`,
    `- Appears in training, inference, or data pipelines for modern models.`,
    `- Understanding shapes and numerics prevents silent bugs in downstream layers.`,
    '',
    `### Key ideas`,
    `1. Define inputs/outputs and dtype conventions upfront.`,
    `2. Prefer vectorized NumPy over Python loops on large axes.`,
    `3. Compare against small hand-computed examples before scaling batch size.`,
    '',
    `### Further reading`,
    meta?.paperTitle ? `- Original paper: ${meta.paperTitle}` : '- Related research track in TensorTonic Research hub.',
  ].join('\n');
}

function solutionFor(d) {
  const fn = d.starterCode?.match(/def\s+(\w+)\s*\(/)?.[1] || 'solve';
  return [
    `### Approach`,
    `Implement \`${fn}\` as specified in the Description tab. Work with small tensors first, then generalize to batch dimensions.`,
    '',
    `### Outline`,
    `1. Parse inputs and validate shapes.`,
    `2. Apply the core operation (see prompt).`,
    `3. Return the result with the expected dtype and shape.`,
    '',
    `### Reference skeleton`,
    '```python',
    d.starterCode?.trim() || `import numpy as np\n\ndef ${fn}():\n    pass`,
    '```',
    '',
    `### Common pitfalls`,
    `- Leaving \`pass\` in the function body.`,
    `- Wrong axis for reductions or broadcasting.`,
    `- Forgetting edge cases (empty sequences, batch size 1).`,
  ].join('\n');
}

let details = JSON.parse(fs.readFileSync(path.join(DATA, 'problemDetails.api.json'), 'utf8'));
let n = 0;
details = details.map((d) => {
  if (!d.theory || d.theory.length < 100) {
    d.theory = theoryFor(d);
    n += 1;
  }
  if (!d.solution || d.solution.length < 80) {
    d.solution = solutionFor(d);
    n += 1;
  }
  return d;
});

fs.writeFileSync(path.join(DATA, 'problemDetails.api.json'), JSON.stringify(details, null, 2));
execSync('node merge_api_data.js', { cwd: __dirname, stdio: 'inherit' });
console.log('Added theory/solution fields (updates:', n, 'fields touched)');
