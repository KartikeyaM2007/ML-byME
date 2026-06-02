const fs = require('fs');

const fixes = {
  'logistic-regression-training': {
    statement: `Train a binary logistic regression classifier using gradient descent. Implement the training loop from scratch.

### Mathematical Definition
Given inputs $X$ (shape: \`[m, n]\`) and labels $Y$ (shape: \`[m, 1]\`), the logistic regression model is:
$$ \hat{y} = \sigma(X \cdot W + b) $$

Where:
- $W$ is the weight matrix (shape: \`[n, 1]\`)
- $b$ is the scalar bias
- $\sigma$ is the sigmoid function

Use the **Binary Cross Entropy** loss and compute gradients for $W$ and $b$ to update them:
$$ W = W - \alpha \frac{\partial L}{\partial W} $$
$$ b = b - \alpha \frac{\partial L}{\partial b} $$`,
    prompt: `Train a binary logistic regression classifier using gradient descent. Implement the training loop from scratch.`,
    examples: `**Example 1:**
\`\`\`python
Input:
X = np.array([[1], [2], [3]])
Y = np.array([[0], [0], [1]])
lr = 0.1, epochs = 100
Output: Updated weights and biases
\`\`\``,
    requirements: `- Must not use external ML libraries (like scikit-learn).
- Must use fully vectorized operations.`,
    starterCode: `import numpy as np

def train_logistic_regression(X, Y, lr, epochs):
    """
    Train a logistic regression model.
    Return (W, b)
    """
    # Write your code here
    pass`
  },
  'pad-sequences': {
    statement: `In NLP, batches often need sequences of equal length. Given a list of token ID sequences (lists of ints), pad them to the same length.

### Description
Write a function that takes a list of lists of integers and pads them with a specified \`pad_token\` so that all sequences have the same length. 
You must support padding both at the \`'pre'\` and \`'post'\` positions.`,
    prompt: `Given a list of token ID sequences (lists of ints), pad them to the same length.`,
    examples: `**Example 1:**
\`\`\`python
Input: sequences = [[1, 2], [3, 4, 5]], maxlen = 3, padding = 'post', pad_token = 0
Output: [[1, 2, 0], [3, 4, 5]]
\`\`\``,
    starterCode: `def pad_sequences(sequences, maxlen, padding='post', pad_token=0):
    """
    Pad sequences to maxlen.
    """
    # Write your code here
    pass`
  },
  'matrix-transpose': {
    statement: `Implement the transpose of a matrix, where each element at position $(i, j)$ is swapped to $(j, i)$.

### Mathematical Definition
$$ (A^T)_{ji} = A_{ij} $$

Do not use \`numpy.transpose\` or \`A.T\`. Implement this manually using nested loops or list comprehensions for deep understanding.`,
    prompt: `Implement the transpose of a matrix, where each element at position (i, j) is swapped to (j, i).`,
    examples: `**Example 1:**
\`\`\`python
Input: [[1, 2, 3], [4, 5, 6]]
Output: [[1, 4], [2, 5], [3, 6]]
\`\`\``,
    starterCode: `def transpose(matrix):
    """
    Return the transposed matrix.
    """
    # Write your code here
    pass`
  },
  'positional-encoding': {
    statement: `Implement sinusoidal positional encodings as described in **"Attention Is All You Need"** to inject sequence order into token embeddings.

### Mathematical Definition
For position $pos$ and dimension index $i$:
$$ PE(pos, 2i) = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right) $$
$$ PE(pos, 2i+1) = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right) $$

Even-indexed columns use sine, odd-indexed columns use cosine, and the frequency decreases with dimension index.`,
    prompt: `Given a sequence length and model dimension, compute the positional encoding matrix using the sin/cos formulation.`,
    examples: `**Example 1:**
\`\`\`python
Input: seq_len = 3, d_model = 4
Output:
[[ 0.0000,  1.0000,  0.0000,  1.0000],
 [ 0.8415,  0.5403,  0.0100,  0.9999],
 [ 0.9093, -0.4161,  0.0200,  0.9998]]
\`\`\``,
    starterCode: `import numpy as np

def get_positional_encoding(seq_len, d_model):
    """
    Return positional encoding matrix of shape (seq_len, d_model)
    """
    # Write your code here
    pass`
  },
  'gradient-descent-quadratic': {
    statement: `Implement vanilla gradient descent to minimize a 1-D quadratic function:
$$ f(x) = ax^2 + bx + c $$

### Requirements
Use the update rule:
$$ x_{new} = x - \alpha f'(x) $$
repeated \`steps\` times, where $\alpha$ is the learning rate.

Do not use the closed-form minimizer during updates. Return a Python float.`,
    prompt: `Implement vanilla gradient descent to minimize a 1-D quadratic function.`,
    examples: `**Example 1:**
\`\`\`python
Input: a = 1, b = -4, c = 3, x0 = 0, lr = 0.1, steps = 50
Output: 1.999... (approaches 2.0)
\`\`\``,
    starterCode: `def gradient_descent(a, b, c, x0, lr, steps):
    """
    Return final x after 'steps' iterations.
    """
    # Write your code here
    pass`
  }
};

const dataPath = 'src/data/problemDetails.partial.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let count = 0;
for (let p of data) {
  if (fixes[p.slug]) {
    Object.assign(p, fixes[p.slug]);
    count++;
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Fixed ' + count + ' problems!');
