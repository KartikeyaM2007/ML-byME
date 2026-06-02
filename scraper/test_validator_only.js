const { validateProblem } = require('../backend/validators');

const SIGMOID_OK = `import numpy as np
def sigmoid(x):
    x = np.asarray(x, dtype=float)
    return 1 / (1 + np.exp(-x))
`;

const TOKENIZE_OK = `import numpy as np
def tokenize(text, vocab, unk_id=0):
    tokens = text.strip().split()
    return np.array([vocab.get(t, unk_id) for t in tokens], dtype=np.int32)
`;

(async () => {
  console.log('sigmoid:', await validateProblem('sigmoid-numpy', SIGMOID_OK));
  console.log('tokenize:', await validateProblem('transformers-tokenization', TOKENIZE_OK));
  console.log('unknown (syntax only):', await validateProblem('pad-sequences', TOKENIZE_OK));
})();
