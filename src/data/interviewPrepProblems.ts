export type InterviewItem = {
  name: string;
  slug: string;
  difficulty: 'easy' | 'medium' | 'hard';
  companies: string[];
};

export type InterviewSection = {
  title: string;
  items: InterviewItem[];
};

export const interviewPrepSections: InterviewSection[] = [
  {
    title: 'SQL',
    items: [
      { name: 'Expected Value (Discrete)', slug: 'expected-value-discrete', difficulty: 'easy', companies: ['A', 'G'] },
      { name: 'Precision and Recall at K', slug: 'precision-recall-at-k', difficulty: 'easy', companies: ['M', 'L'] },
      { name: 'Compute Entropy for a Node', slug: 'entropy-node', difficulty: 'easy', companies: ['M', 'N'] },
      { name: 'Pad Sequences', slug: 'pad-sequences', difficulty: 'medium', companies: ['A', 'A'] },
      { name: 'Value Iteration Step', slug: 'value-iteration-step', difficulty: 'medium', companies: ['A', 'S'] },
      { name: 'Anchor Box Generation', slug: 'anchor-box-generation', difficulty: 'medium', companies: ['M'] },
      { name: 'Apply 4×4 Homogeneous Transform', slug: 'homogeneous-transform', difficulty: 'medium', companies: ['N', 'S'] },
      { name: 'Matrix Transpose', slug: 'matrix-transpose', difficulty: 'easy', companies: ['N', 'M'] },
      { name: 'Implement Adam Optimizer Step', slug: 'adam-optimizer', difficulty: 'easy', companies: ['M', 'U'] },
      { name: 'RMSProp Optimizer (Single Update Step)', slug: 'rmsprop-optimizer', difficulty: 'easy', companies: ['M', 'S'] },
    ],
  },
  {
    title: 'NumPy and Pandas',
    items: [
      { name: 'Implement Sigmoid in NumPy', slug: 'sigmoid-numpy', difficulty: 'easy', companies: ['G', 'S'] },
      { name: 'Logistic Regression Training Loop', slug: 'logistic-regression-training', difficulty: 'medium', companies: ['N', 'S'] },
      { name: 'Implement Dropout (Training Mode)', slug: 'dropout-training', difficulty: 'medium', companies: ['S', 'M'] },
      { name: 'Implement Gradient Descent for a 1D Quadratic', slug: 'gradient-descent-quadratic', difficulty: 'easy', companies: ['N', 'L'] },
      { name: 'Implement Positional Encoding (sin/cos)', slug: 'positional-encoding', difficulty: 'medium', companies: ['M', 'S'] },
      { name: 'Implement Adam Optimizer Step', slug: 'adam-optimizer', difficulty: 'easy', companies: ['S', 'G'] },
      { name: 'Matrix Transpose', slug: 'matrix-transpose', difficulty: 'easy', companies: ['M', 'A'] },
      { name: 'Pad Sequences', slug: 'pad-sequences', difficulty: 'medium', companies: ['M', 'G'] },
      { name: 'Expected Value (Discrete Distribution)', slug: 'expected-value-discrete', difficulty: 'easy', companies: ['N', 'M'] },
      { name: 'Precision and Recall at K', slug: 'precision-recall-at-k', difficulty: 'easy', companies: ['G', 'M'] },
    ],
  },
  {
    title: 'Math',
    items: [
      { name: 'Implement Gradient Descent for a 1D Quadratic', slug: 'gradient-descent-quadratic', difficulty: 'easy', companies: ['A', 'G'] },
      { name: 'Expected Value (Discrete)', slug: 'expected-value-discrete', difficulty: 'easy', companies: ['M', 'S'] },
      { name: 'Compute Entropy for a Node', slug: 'entropy-node', difficulty: 'easy', companies: ['N', 'A'] },
      { name: 'Pearson Correlation', slug: 'pearson-correlation', difficulty: 'medium', companies: ['G', 'M'] },
      { name: 'Matrix Transpose', slug: 'matrix-transpose', difficulty: 'easy', companies: ['L', 'S'] },
      { name: 'Implement Positional Encoding (sin/cos)', slug: 'positional-encoding', difficulty: 'medium', companies: ['A', 'N'] },
      { name: 'Value Iteration Step', slug: 'value-iteration-step', difficulty: 'medium', companies: ['M', 'U'] },
      { name: 'Apply 4×4 Homogeneous Transform', slug: 'homogeneous-transform', difficulty: 'medium', companies: ['S', 'G'] },
      { name: 'Anchor Box Generation', slug: 'anchor-box-generation', difficulty: 'medium', companies: ['N', 'M'] },
      { name: 'RMSProp Optimizer (Single Update Step)', slug: 'rmsprop-optimizer', difficulty: 'easy', companies: ['A', 'L'] },
    ],
  },
  {
    title: 'Machine Learning',
    items: [
      { name: 'Logistic Regression Training Loop', slug: 'logistic-regression-training', difficulty: 'medium', companies: ['G', 'M'] },
      { name: 'Implement Sigmoid in NumPy', slug: 'sigmoid-numpy', difficulty: 'easy', companies: ['A', 'S'] },
      { name: 'Implement Dropout (Training Mode)', slug: 'dropout-training', difficulty: 'medium', companies: ['N', 'L'] },
      { name: 'Precision and Recall at K', slug: 'precision-recall-at-k', difficulty: 'easy', companies: ['M', 'A'] },
      { name: 'Compute Entropy for a Node', slug: 'entropy-node', difficulty: 'easy', companies: ['S', 'G'] },
      { name: 'Transformer Tokenization', slug: 'transformers-tokenization', difficulty: 'medium', companies: ['N', 'M'] },
      { name: 'Token Embedding Layer', slug: 'transformers-embedding', difficulty: 'medium', companies: ['A', 'G'] },
      { name: 'Scaled Dot-Product Attention', slug: 'transformers-attention', difficulty: 'hard', companies: ['L', 'S'] },
      { name: 'Implement Adam Optimizer Step', slug: 'adam-optimizer', difficulty: 'easy', companies: ['M', 'U'] },
      { name: 'Implement Gradient Descent for a 1D Quadratic', slug: 'gradient-descent-quadratic', difficulty: 'easy', companies: ['N', 'S'] },
    ],
  },
];
