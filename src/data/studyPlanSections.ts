export type SectionProblem = {
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sortOrder: number;
  type: string;
  isFree: boolean;
};

export type StudyPlanSection = {
  id: string;
  planId: string;
  title: string;
  sortOrder: number;
  quizTitle?: string;
  quizSlug?: string;
  problems: SectionProblem[];
};

export const studyPlanSections: Record<string, StudyPlanSection[]> = {
  "cracking-dl": [
    {
      "id": "cracking-dl-sec-1",
      "planId": "cracking-dl",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-dl-sec-2",
      "planId": "cracking-dl",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "cross-entropy-loss",
          "title": "Implement Cross-Entropy Loss",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gru-cell-forward",
          "title": "Build a Mini GRU Cell (Forward Pass)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "causal-masking",
          "title": "Implement Causal Masking for Attention",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "global-avg-pooling",
          "title": "Implement Global Average Pooling",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "simple-cnn-layer",
          "title": "Implement a Simple CNN Layer (NumPy)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "leaky-relu",
          "title": "Implement Leaky ReLU (with α)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "softmax-function",
          "title": "Implement Softmax Function",
          "difficulty": "Medium",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-dl-sec-3",
      "planId": "cracking-dl",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Cracking Deep Learning Checkpoint",
      "problems": [
        {
          "slug": "linear-lr-scheduler",
          "title": "Learning Rate Scheduler (Linear Decay)",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "batch-normalization",
          "title": "Batch Normalization (Forward)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "hinge-loss",
          "title": "Implement Hinge Loss (Binary SVM)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "contrastive-loss",
          "title": "Implement Contrastive Loss (Siamese)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gelu",
          "title": "Implement GELU Activation (Gaussian Error Linear Unit)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-clipping",
          "title": "Gradient Clipping (Global Norm)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adagrad-optimizer",
          "title": "AdaGrad Optimizer",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-dl-sec-4",
      "planId": "cracking-dl",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "nesterov-momentum",
          "title": "Implement Nesterov Momentum (NAG)",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adamw-optimizer",
          "title": "Implement AdamW (Decoupled Weight Decay)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adadelta-optimizer",
          "title": "Implement AdaDelta Update Step",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "nadam-optimizer",
          "title": "Implement Nadam (Nesterov + Adam)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "relu-activation",
          "title": "Implement ReLU Activation",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "tanh-activation",
          "title": "Implement Tanh Activation",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "swish-activation",
          "title": "Implement Swish Activation",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-dl-sec-5",
      "planId": "cracking-dl",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "huber-loss",
          "title": "Implement Huber Loss",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "triplet-loss",
          "title": "Implement Triplet Loss",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "info-nce-loss",
          "title": "Implement InfoNCE Loss",
          "difficulty": "Hard",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "focal-loss",
          "title": "Implement Focal Loss",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dice-loss",
          "title": "Implement Dice Loss",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "kl-divergence",
          "title": "Implement KL Divergence",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "wasserstein-critic-loss",
          "title": "Implement Wasserstein Critic Loss",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "cracking-nlp": [
    {
      "id": "cracking-nlp-sec-1",
      "planId": "cracking-nlp",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gru-cell-forward",
          "title": "Build a Mini GRU Cell (Forward Pass)",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "causal-masking",
          "title": "Implement Causal Masking for Attention",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "tfidf-vectorizer",
          "title": "Implement TF-IDF Vectorizer",
          "difficulty": "Hard",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bm25",
          "title": "Implement BM25 Ranking Score",
          "difficulty": "Hard",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rnn-step-forward",
          "title": "RNN Step Forward (Tanh Cell)",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-nlp-sec-2",
      "planId": "cracking-nlp",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "rnn-step-backward",
          "title": "RNN Step Backward (Vanilla RNN)",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bigram-probabilities",
          "title": "Bigram Probabilities (Add-1 Smoothing)",
          "difficulty": "Hard",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "remove-stopwords",
          "title": "Remove Stopwords",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bag-of-words",
          "title": "Bag-of-Words Vector",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "word-count-dict",
          "title": "Word Count Dictionary",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "edit-distance",
          "title": "Edit Distance",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "text-chunking",
          "title": "Text Chunking",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-nlp-sec-3",
      "planId": "cracking-nlp",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Cracking NLP Checkpoint",
      "problems": [
        {
          "slug": "bleu-score",
          "title": "BLEU Score",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "perplexity-computation",
          "title": "Perplexity Computation",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "transformers-tokenization",
          "title": "Transformer Tokenization",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "transformers-embedding",
          "title": "Token Embedding Layer",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "transformers-positional-encoding",
          "title": "Sinusoidal Positional Encoding",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "transformers-attention",
          "title": "Scaled Dot-Product Attention",
          "difficulty": "Hard",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "transformers-multi-head-attention",
          "title": "Multi-Head Attention",
          "difficulty": "Hard",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-nlp-sec-4",
      "planId": "cracking-nlp",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "transformers-feed-forward",
          "title": "Position-wise Feed-Forward Network",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "transformers-layer-normalization",
          "title": "Layer Normalization",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "transformers-encoder-block",
          "title": "Transformer Encoder Block",
          "difficulty": "Hard",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-transpose",
          "title": "Matrix Transpose",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-nlp-sec-5",
      "planId": "cracking-nlp",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "anchor-box-generation",
          "title": "Anchor Box Generation",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "homogeneous-transform",
          "title": "Apply 4×4 Homogeneous Transform",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "value-iteration-step",
          "title": "Value Iteration Step",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "expected-value-discrete",
          "title": "Expected Value (Discrete Distribution)",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "math-linear-algebra": [
    {
      "id": "math-linear-algebra-sec-1",
      "planId": "math-linear-algebra",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "matrix-transpose",
          "title": "Matrix Transpose",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "manhattan-distance",
          "title": "Implement Manhattan Distance",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "euclidean-distance",
          "title": "Implement Euclidean Distance",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cosine-similarity",
          "title": "Implement Cosine Similarity",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dot-product",
          "title": "Implement Dot Product",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-linear-algebra-sec-2",
      "planId": "math-linear-algebra",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "matrix-normalization",
          "title": "Implement Matrix Normalization",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "tfidf-vectorizer",
          "title": "Implement TF-IDF Vectorizer",
          "difficulty": "Hard",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bm25",
          "title": "Implement BM25 Ranking Score",
          "difficulty": "Hard",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "eigenvalues",
          "title": "Calculate Eigenvalues of a Matrix",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "covariance-matrix",
          "title": "Compute Covariance Matrix",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pearson-correlation",
          "title": "Compute Pearson Correlation Matrix",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-linear-algebra-sec-3",
      "planId": "math-linear-algebra",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Linear Algebra Checkpoint",
      "problems": [
        {
          "slug": "matrix-trace",
          "title": "Matrix Trace",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "make-diagonal",
          "title": "Make Diagonal Matrix",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-inverse",
          "title": "Matrix Inverse",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-regression-closed-form",
          "title": "Linear Regression Closed Form",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pca-projection",
          "title": "PCA Projection",
          "difficulty": "Hard",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-linear-algebra-sec-4",
      "planId": "math-linear-algebra",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-linear-algebra-sec-5",
      "planId": "math-linear-algebra",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "anchor-box-generation",
          "title": "Anchor Box Generation",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "homogeneous-transform",
          "title": "Apply 4×4 Homogeneous Transform",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "value-iteration-step",
          "title": "Value Iteration Step",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "expected-value-discrete",
          "title": "Expected Value (Discrete Distribution)",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "entropy-node",
          "title": "Compute Entropy for a Node",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "precision-recall-at-k",
          "title": "Precision and Recall at K",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "math-probability": [
    {
      "id": "math-probability-sec-1",
      "planId": "math-probability",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "expected-value-discrete",
          "title": "Expected Value (Discrete Distribution)",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "precision-recall-at-k",
          "title": "Precision and Recall at K",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "metrics-f1-micro",
          "title": "Implement Micro-F1",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "silhouette-score",
          "title": "Compute Silhouette Score",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "classification-metrics",
          "title": "Compute Accuracy, Precision, Recall, F1",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "r2-score",
          "title": "Implement R² Score (Coefficient of Determination)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-probability-sec-2",
      "planId": "math-probability",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "bernoulli-pmf",
          "title": "Bernoulli Probability Mass Function & Moments",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "binomial-pmf-cdf",
          "title": "Binomial Probability Mass Function",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "poisson-pmf-cdf",
          "title": "Poisson Probability Mass Function & Cumulative Distribution Function",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "geometric-pmf-mean",
          "title": "Geometric Probability Mass Function & Mean",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "mean-median-mode",
          "title": "Mean, Median, Mode",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sample-var-std",
          "title": "Sample Variance & Standard Deviation",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-probability-sec-3",
      "planId": "math-probability",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Probability & Statistics Checkpoint",
      "problems": [
        {
          "slug": "percentiles",
          "title": "Percentiles / Quantiles",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "chi2-independence",
          "title": "Chi-Square Test",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "t-test-one-sample",
          "title": "One-Sample t-Test",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "roc-curve",
          "title": "Compute ROC Curve from Scores",
          "difficulty": "Hard",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "auc",
          "title": "Compute AUC (Area Under ROC)",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "mean-average-precision",
          "title": "Compute Mean Average Precision (mAP)",
          "difficulty": "Hard",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-probability-sec-4",
      "planId": "math-probability",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "confusion-matrix-norm",
          "title": "Compute Confusion Matrix with Normalization",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bootstrap-mean",
          "title": "Bootstrap Mean & Confidence Interval",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cohens-kappa",
          "title": "Cohen's Kappa",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "log-loss-per-sample",
          "title": "Log Loss (Per-Sample)",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "expected-calibration-error",
          "title": "Expected Calibration Error",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "ndcg",
          "title": "NDCG (Normalized Discounted Cumulative Gain)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-probability-sec-5",
      "planId": "math-probability",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "isotonic-calibration",
          "title": "Isotonic Regression Calibration",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "iou-bounding-box",
          "title": "Intersection over Union (IoU)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bleu-score",
          "title": "BLEU Score",
          "difficulty": "Hard",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "catalog-coverage",
          "title": "Catalog Coverage",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "hit-rate-at-k",
          "title": "Hit Rate at K",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "numpy-basics": [
    {
      "id": "numpy-basics-sec-1",
      "planId": "numpy-basics",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-transpose",
          "title": "Matrix Transpose",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "numpy-basics-sec-2",
      "planId": "numpy-basics",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "manhattan-distance",
          "title": "Implement Manhattan Distance",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "euclidean-distance",
          "title": "Implement Euclidean Distance",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "leaky-relu",
          "title": "Implement Leaky ReLU (with α)",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "numpy-basics-sec-3",
      "planId": "numpy-basics",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "NumPy Sheet Checkpoint",
      "problems": [
        {
          "slug": "softmax-function",
          "title": "Implement Softmax Function",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cosine-similarity",
          "title": "Implement Cosine Similarity",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-lr-scheduler",
          "title": "Learning Rate Scheduler (Linear Decay)",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gelu",
          "title": "Implement GELU Activation (Gaussian Error Linear Unit)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dot-product",
          "title": "Implement Dot Product",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "numpy-basics-sec-4",
      "planId": "numpy-basics",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "matrix-normalization",
          "title": "Implement Matrix Normalization",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "tfidf-vectorizer",
          "title": "Implement TF-IDF Vectorizer",
          "difficulty": "Hard",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bm25",
          "title": "Implement BM25 Ranking Score",
          "difficulty": "Hard",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "eigenvalues",
          "title": "Calculate Eigenvalues of a Matrix",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "covariance-matrix",
          "title": "Compute Covariance Matrix",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "numpy-basics-sec-5",
      "planId": "numpy-basics",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "pearson-correlation",
          "title": "Compute Pearson Correlation Matrix",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-clipping",
          "title": "Gradient Clipping (Global Norm)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adagrad-optimizer",
          "title": "AdaGrad Optimizer",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "nesterov-momentum",
          "title": "Implement Nesterov Momentum (NAG)",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adamw-optimizer",
          "title": "Implement AdamW (Decoupled Weight Decay)",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "pandas-basics": [
    {
      "id": "pandas-basics-sec-1",
      "planId": "pandas-basics",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "minmax-normalization",
          "title": "Implement Min-Max Normalization",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "zscore-standardization",
          "title": "Implement z-Score Standardization",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-normalization",
          "title": "Implement Matrix Normalization",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "tfidf-vectorizer",
          "title": "Implement TF-IDF Vectorizer",
          "difficulty": "Hard",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "pandas-basics-sec-2",
      "planId": "pandas-basics",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "bm25",
          "title": "Implement BM25 Ranking Score",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "covariance-matrix",
          "title": "Compute Covariance Matrix",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pearson-correlation",
          "title": "Compute Pearson Correlation Matrix",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "stratified-split",
          "title": "Stratified Train/Test Split",
          "difficulty": "Hard",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "batch-generator",
          "title": "Batch Shuffling & Mini-Batch Generator",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "pandas-basics-sec-3",
      "planId": "pandas-basics",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Pandas Sheet Checkpoint",
      "problems": [
        {
          "slug": "impute-missing",
          "title": "Impute Missing Values (mean/median)",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "one-hot-encoding",
          "title": "One-Hot Encoding (Multi-class)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "streaming-minmax",
          "title": "Streaming Min-Max Normalization",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "kfold-split",
          "title": "K-Fold Split (Indices Only)",
          "difficulty": "Hard",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "remove-stopwords",
          "title": "Remove Stopwords",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "pandas-basics-sec-4",
      "planId": "pandas-basics",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "bag-of-words",
          "title": "Bag-of-Words Vector",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "text-chunking",
          "title": "Text Chunking",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-interpolation",
          "title": "Linear Interpolation",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "target-encoding",
          "title": "Target Encoding",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "polynomial-features",
          "title": "Polynomial Features",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "pandas-basics-sec-5",
      "planId": "pandas-basics",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "binning",
          "title": "Binning",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "interaction-features",
          "title": "Interaction Features",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "lag-features",
          "title": "Lag Features",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "ordinal-encoding",
          "title": "Ordinal Encoding",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "frequency-encoding",
          "title": "Frequency Encoding",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "pytorch-basics": [
    {
      "id": "pytorch-basics-sec-1",
      "planId": "pytorch-basics",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "pytorch-basics-sec-2",
      "planId": "pytorch-basics",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "cross-entropy-loss",
          "title": "Implement Cross-Entropy Loss",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gru-cell-forward",
          "title": "Build a Mini GRU Cell (Forward Pass)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "global-avg-pooling",
          "title": "Implement Global Average Pooling",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "simple-cnn-layer",
          "title": "Implement a Simple CNN Layer (NumPy)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "leaky-relu",
          "title": "Implement Leaky ReLU (with α)",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "softmax-function",
          "title": "Implement Softmax Function",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "pytorch-basics-sec-3",
      "planId": "pytorch-basics",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "PyTorch Sheet Checkpoint",
      "problems": [
        {
          "slug": "linear-lr-scheduler",
          "title": "Learning Rate Scheduler (Linear Decay)",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "batch-normalization",
          "title": "Batch Normalization (Forward)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "hinge-loss",
          "title": "Implement Hinge Loss (Binary SVM)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "contrastive-loss",
          "title": "Implement Contrastive Loss (Siamese)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gelu",
          "title": "Implement GELU Activation (Gaussian Error Linear Unit)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-clipping",
          "title": "Gradient Clipping (Global Norm)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "pytorch-basics-sec-4",
      "planId": "pytorch-basics",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "adagrad-optimizer",
          "title": "AdaGrad Optimizer",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "nesterov-momentum",
          "title": "Implement Nesterov Momentum (NAG)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adamw-optimizer",
          "title": "Implement AdamW (Decoupled Weight Decay)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adadelta-optimizer",
          "title": "Implement AdaDelta Update Step",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "nadam-optimizer",
          "title": "Implement Nadam (Nesterov + Adam)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "relu-activation",
          "title": "Implement ReLU Activation",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "pytorch-basics-sec-5",
      "planId": "pytorch-basics",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "tanh-activation",
          "title": "Implement Tanh Activation",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "swish-activation",
          "title": "Implement Swish Activation",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "huber-loss",
          "title": "Implement Huber Loss",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "triplet-loss",
          "title": "Implement Triplet Loss",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "info-nce-loss",
          "title": "Implement InfoNCE Loss",
          "difficulty": "Hard",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "focal-loss",
          "title": "Implement Focal Loss",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "sql-basics": [
    {
      "id": "sql-basics-sec-1",
      "planId": "sql-basics",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "expected-value-discrete",
          "title": "Expected Value (Discrete Distribution)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "minmax-normalization",
          "title": "Implement Min-Max Normalization",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "zscore-standardization",
          "title": "Implement z-Score Standardization",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-normalization",
          "title": "Implement Matrix Normalization",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "sql-basics-sec-2",
      "planId": "sql-basics",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "bm25",
          "title": "Implement BM25 Ranking Score",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "covariance-matrix",
          "title": "Compute Covariance Matrix",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pearson-correlation",
          "title": "Compute Pearson Correlation Matrix",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bernoulli-pmf",
          "title": "Bernoulli Probability Mass Function & Moments",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "binomial-pmf-cdf",
          "title": "Binomial Probability Mass Function",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "sql-basics-sec-3",
      "planId": "sql-basics",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "SQL Sheet Checkpoint",
      "problems": [
        {
          "slug": "poisson-pmf-cdf",
          "title": "Poisson Probability Mass Function & Cumulative Distribution Function",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "geometric-pmf-mean",
          "title": "Geometric Probability Mass Function & Mean",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "mean-median-mode",
          "title": "Mean, Median, Mode",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sample-var-std",
          "title": "Sample Variance & Standard Deviation",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "percentiles",
          "title": "Percentiles / Quantiles",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "sql-basics-sec-4",
      "planId": "sql-basics",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "chi2-independence",
          "title": "Chi-Square Test",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "t-test-one-sample",
          "title": "One-Sample t-Test",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "stratified-split",
          "title": "Stratified Train/Test Split",
          "difficulty": "Hard",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "batch-generator",
          "title": "Batch Shuffling & Mini-Batch Generator",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "impute-missing",
          "title": "Impute Missing Values (mean/median)",
          "difficulty": "Hard",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "sql-basics-sec-5",
      "planId": "sql-basics",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "one-hot-encoding",
          "title": "One-Hot Encoding (Multi-class)",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "streaming-minmax",
          "title": "Streaming Min-Max Normalization",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bootstrap-mean",
          "title": "Bootstrap Mean & Confidence Interval",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "kfold-split",
          "title": "K-Fold Split (Indices Only)",
          "difficulty": "Hard",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "remove-stopwords",
          "title": "Remove Stopwords",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "cracking-rl": [
    {
      "id": "cracking-rl-sec-1",
      "planId": "cracking-rl",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "value-iteration-step",
          "title": "Value Iteration Step",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "td-value-update",
          "title": "One-Step TD Value Update",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "q-learning-update",
          "title": "Tabular Q-Learning (Single Update)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "epsilon-greedy",
          "title": "ε-Greedy Action Selection",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "mc-policy-evaluation",
          "title": "Monte Carlo Policy Evaluation",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "compute-advantage",
          "title": "Advantage Computation",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-rl-sec-2",
      "planId": "cracking-rl",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "discount-returns",
          "title": "Discounted Returns",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sarsa-update",
          "title": "SARSA Update",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "replay-buffer-sample",
          "title": "Replay Buffer Sample",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "policy-gradient-loss",
          "title": "Policy Gradient Loss",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gae-computation",
          "title": "Generalized Advantage Estimation",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "priority-replay-sample",
          "title": "Prioritized Experience Replay",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-rl-sec-3",
      "planId": "cracking-rl",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Cracking RL Checkpoint",
      "problems": [
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-transpose",
          "title": "Matrix Transpose",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-rl-sec-4",
      "planId": "cracking-rl",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "anchor-box-generation",
          "title": "Anchor Box Generation",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "homogeneous-transform",
          "title": "Apply 4×4 Homogeneous Transform",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "expected-value-discrete",
          "title": "Expected Value (Discrete Distribution)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-rl-sec-5",
      "planId": "cracking-rl",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "entropy-node",
          "title": "Compute Entropy for a Node",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "precision-recall-at-k",
          "title": "Precision and Recall at K",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "metrics-f1-micro",
          "title": "Implement Micro-F1",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cross-entropy-loss",
          "title": "Implement Cross-Entropy Loss",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "manhattan-distance",
          "title": "Implement Manhattan Distance",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "euclidean-distance",
          "title": "Implement Euclidean Distance",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "math-calculus": [
    {
      "id": "math-calculus-sec-1",
      "planId": "math-calculus",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cross-entropy-loss",
          "title": "Implement Cross-Entropy Loss",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-lr-scheduler",
          "title": "Learning Rate Scheduler (Linear Decay)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-calculus-sec-2",
      "planId": "math-calculus",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "hinge-loss",
          "title": "Implement Hinge Loss (Binary SVM)",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "contrastive-loss",
          "title": "Implement Contrastive Loss (Siamese)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-clipping",
          "title": "Gradient Clipping (Global Norm)",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adagrad-optimizer",
          "title": "AdaGrad Optimizer",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "nesterov-momentum",
          "title": "Implement Nesterov Momentum (NAG)",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adamw-optimizer",
          "title": "Implement AdamW (Decoupled Weight Decay)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-calculus-sec-3",
      "planId": "math-calculus",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Calculus for ML Checkpoint",
      "problems": [
        {
          "slug": "adadelta-optimizer",
          "title": "Implement AdaDelta Update Step",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "nadam-optimizer",
          "title": "Implement Nadam (Nesterov + Adam)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "huber-loss",
          "title": "Implement Huber Loss",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "triplet-loss",
          "title": "Implement Triplet Loss",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "info-nce-loss",
          "title": "Implement InfoNCE Loss",
          "difficulty": "Hard",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "focal-loss",
          "title": "Implement Focal Loss",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-calculus-sec-4",
      "planId": "math-calculus",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "dice-loss",
          "title": "Implement Dice Loss",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "kl-divergence",
          "title": "Implement KL Divergence",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "wasserstein-critic-loss",
          "title": "Implement Wasserstein Critic Loss",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "mean-squared-error",
          "title": "Mean Squared Error (MSE)",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "warmup-decay-lr",
          "title": "Warmup + Linear Decay LR Schedule",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cosine-annealing-lr",
          "title": "Cosine Annealing LR Scheduler",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-calculus-sec-5",
      "planId": "math-calculus",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "lbfgs-two-loop",
          "title": "L-BFGS Two-Loop Recursion",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "label-smoothing-loss",
          "title": "Label Smoothing Loss",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cosine-embedding-loss",
          "title": "Cosine Embedding Loss",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "binary-focal-loss",
          "title": "Binary Focal Loss",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "math-optimization": [
    {
      "id": "math-optimization-sec-1",
      "planId": "math-optimization",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-lr-scheduler",
          "title": "Learning Rate Scheduler (Linear Decay)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-optimization-sec-2",
      "planId": "math-optimization",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "gradient-clipping",
          "title": "Gradient Clipping (Global Norm)",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adagrad-optimizer",
          "title": "AdaGrad Optimizer",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "nesterov-momentum",
          "title": "Implement Nesterov Momentum (NAG)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adamw-optimizer",
          "title": "Implement AdamW (Decoupled Weight Decay)",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adadelta-optimizer",
          "title": "Implement AdaDelta Update Step",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-optimization-sec-3",
      "planId": "math-optimization",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Optimization Checkpoint",
      "problems": [
        {
          "slug": "nadam-optimizer",
          "title": "Implement Nadam (Nesterov + Adam)",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "warmup-decay-lr",
          "title": "Warmup + Linear Decay LR Schedule",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cosine-annealing-lr",
          "title": "Cosine Annealing LR Scheduler",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "lbfgs-two-loop",
          "title": "L-BFGS Two-Loop Recursion",
          "difficulty": "Hard",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-optimization-sec-4",
      "planId": "math-optimization",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-transpose",
          "title": "Matrix Transpose",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "anchor-box-generation",
          "title": "Anchor Box Generation",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "math-optimization-sec-5",
      "planId": "math-optimization",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "homogeneous-transform",
          "title": "Apply 4×4 Homogeneous Transform",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "value-iteration-step",
          "title": "Value Iteration Step",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "expected-value-discrete",
          "title": "Expected Value (Discrete Distribution)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "entropy-node",
          "title": "Compute Entropy for a Node",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "precision-recall-at-k",
          "title": "Precision and Recall at K",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "cracking-ml": [
    {
      "id": "cracking-ml-sec-1",
      "planId": "cracking-ml",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "entropy-node",
          "title": "Compute Entropy for a Node",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "precision-recall-at-k",
          "title": "Precision and Recall at K",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "metrics-f1-micro",
          "title": "Implement Micro-F1",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cross-entropy-loss",
          "title": "Implement Cross-Entropy Loss",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "silhouette-score",
          "title": "Compute Silhouette Score",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "minmax-normalization",
          "title": "Implement Min-Max Normalization",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-ml-sec-2",
      "planId": "cracking-ml",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "classification-metrics",
          "title": "Compute Accuracy, Precision, Recall, F1",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "r2-score",
          "title": "Implement R² Score (Coefficient of Determination)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "hinge-loss",
          "title": "Implement Hinge Loss (Binary SVM)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "contrastive-loss",
          "title": "Implement Contrastive Loss (Siamese)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "tfidf-vectorizer",
          "title": "Implement TF-IDF Vectorizer",
          "difficulty": "Hard",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "huber-loss",
          "title": "Implement Huber Loss",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "triplet-loss",
          "title": "Implement Triplet Loss",
          "difficulty": "Medium",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-ml-sec-3",
      "planId": "cracking-ml",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Cracking ML Checkpoint",
      "problems": [
        {
          "slug": "info-nce-loss",
          "title": "Implement InfoNCE Loss",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "focal-loss",
          "title": "Implement Focal Loss",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dice-loss",
          "title": "Implement Dice Loss",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "kl-divergence",
          "title": "Implement KL Divergence",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "wasserstein-critic-loss",
          "title": "Implement Wasserstein Critic Loss",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "one-hot-encoding",
          "title": "One-Hot Encoding (Multi-class)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "streaming-minmax",
          "title": "Streaming Min-Max Normalization",
          "difficulty": "Medium",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-ml-sec-4",
      "planId": "cracking-ml",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "roc-curve",
          "title": "Compute ROC Curve from Scores",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "auc",
          "title": "Compute AUC (Area Under ROC)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "mean-average-precision",
          "title": "Compute Mean Average Precision (mAP)",
          "difficulty": "Hard",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "confusion-matrix-norm",
          "title": "Compute Confusion Matrix with Normalization",
          "difficulty": "Hard",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gini-impurity",
          "title": "Compute Gini Impurity for a Split",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "majority-classifier",
          "title": "Implement Majority Class Classifier",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "knn-distance",
          "title": "KNN Distance + Neighbor Lookup",
          "difficulty": "Medium",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-ml-sec-5",
      "planId": "cracking-ml",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "naive-bayes-bernoulli",
          "title": "Naive Bayes Log-Likelihood (Bernoulli)",
          "difficulty": "Hard",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "information-gain",
          "title": "Compute Information Gain for a Split",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "mean-squared-error",
          "title": "Mean Squared Error (MSE)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bag-of-words",
          "title": "Bag-of-Words Vector",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cohens-kappa",
          "title": "Cohen's Kappa",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "log-loss-per-sample",
          "title": "Log Loss (Per-Sample)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "expected-calibration-error",
          "title": "Expected Calibration Error",
          "difficulty": "Medium",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "cracking-cv": [
    {
      "id": "cracking-cv-sec-1",
      "planId": "cracking-cv",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "anchor-box-generation",
          "title": "Anchor Box Generation",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "iou-bounding-box",
          "title": "Intersection over Union (IoU)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "non-maximum-suppression",
          "title": "Non-Maximum Suppression",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "conv2d-image-filtering",
          "title": "2D Convolution (Image Filtering)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bilinear-interpolation",
          "title": "Bilinear Interpolation",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "roi-pooling",
          "title": "ROI Pooling",
          "difficulty": "Hard",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "image-histogram",
          "title": "Image Histogram",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-cv-sec-2",
      "planId": "cracking-cv",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "gaussian-blur-kernel",
          "title": "Gaussian Blur Kernel",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sobel-edge-detection",
          "title": "Sobel Edge Detection",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "histogram-equalization",
          "title": "Histogram Equalization",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "morphological-operations",
          "title": "Morphological Erosion and Dilation",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "image-rotation-nearest",
          "title": "Image Rotation (Nearest Neighbor)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "max-pooling-2d",
          "title": "Max Pooling 2D",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "average-pooling-2d",
          "title": "Average Pooling 2D",
          "difficulty": "Medium",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-cv-sec-3",
      "planId": "cracking-cv",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Cracking CV Checkpoint",
      "problems": [
        {
          "slug": "color-to-grayscale",
          "title": "Color to Grayscale",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-transpose",
          "title": "Matrix Transpose",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-cv-sec-4",
      "planId": "cracking-cv",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "homogeneous-transform",
          "title": "Apply 4×4 Homogeneous Transform",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "value-iteration-step",
          "title": "Value Iteration Step",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "expected-value-discrete",
          "title": "Expected Value (Discrete Distribution)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "entropy-node",
          "title": "Compute Entropy for a Node",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cracking-cv-sec-5",
      "planId": "cracking-cv",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "precision-recall-at-k",
          "title": "Precision and Recall at K",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "metrics-f1-micro",
          "title": "Implement Micro-F1",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cross-entropy-loss",
          "title": "Implement Cross-Entropy Loss",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "manhattan-distance",
          "title": "Implement Manhattan Distance",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "euclidean-distance",
          "title": "Implement Euclidean Distance",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gru-cell-forward",
          "title": "Build a Mini GRU Cell (Forward Pass)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "causal-masking",
          "title": "Implement Causal Masking for Attention",
          "difficulty": "Medium",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "cuda-basics": [
    {
      "id": "cuda-basics-sec-1",
      "planId": "cuda-basics",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "matrix-transpose",
          "title": "Matrix Transpose",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "manhattan-distance",
          "title": "Implement Manhattan Distance",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "euclidean-distance",
          "title": "Implement Euclidean Distance",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gru-cell-forward",
          "title": "Build a Mini GRU Cell (Forward Pass)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "global-avg-pooling",
          "title": "Implement Global Average Pooling",
          "difficulty": "Medium",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cuda-basics-sec-2",
      "planId": "cuda-basics",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "simple-cnn-layer",
          "title": "Implement a Simple CNN Layer (NumPy)",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cosine-similarity",
          "title": "Implement Cosine Similarity",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "batch-normalization",
          "title": "Batch Normalization (Forward)",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dot-product",
          "title": "Implement Dot Product",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-normalization",
          "title": "Implement Matrix Normalization",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "tfidf-vectorizer",
          "title": "Implement TF-IDF Vectorizer",
          "difficulty": "Hard",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "bm25",
          "title": "Implement BM25 Ranking Score",
          "difficulty": "Hard",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cuda-basics-sec-3",
      "planId": "cuda-basics",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "CUDA Kernels Checkpoint",
      "problems": [
        {
          "slug": "eigenvalues",
          "title": "Calculate Eigenvalues of a Matrix",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "covariance-matrix",
          "title": "Compute Covariance Matrix",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pearson-correlation",
          "title": "Compute Pearson Correlation Matrix",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-clipping",
          "title": "Gradient Clipping (Global Norm)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-trace",
          "title": "Matrix Trace",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rnn-step-forward",
          "title": "RNN Step Forward (Tanh Cell)",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "make-diagonal",
          "title": "Make Diagonal Matrix",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cuda-basics-sec-4",
      "planId": "cuda-basics",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "matrix-inverse",
          "title": "Matrix Inverse",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rnn-step-backward",
          "title": "RNN Step Backward (Vanilla RNN)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-regression-closed-form",
          "title": "Linear Regression Closed Form",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pca-projection",
          "title": "PCA Projection",
          "difficulty": "Hard",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-layer-forward",
          "title": "Linear Layer Forward",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "xavier-initialization",
          "title": "Xavier Initialization",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "he-initialization",
          "title": "He Initialization",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "cuda-basics-sec-5",
      "planId": "cuda-basics",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "maxpool-forward",
          "title": "Max Pooling Forward",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 7,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ],
  "triton-basics": [
    {
      "id": "triton-basics-sec-1",
      "planId": "triton-basics",
      "title": "Foundations",
      "sortOrder": 1,
      "problems": [
        {
          "slug": "logistic-regression-training",
          "title": "Logistic Regression Training Loop",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-descent-quadratic",
          "title": "Implement Gradient Descent for a 1D Quadratic",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adam-optimizer",
          "title": "Implement Adam Optimizer Step",
          "difficulty": "Easy",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "dropout-training",
          "title": "Implement Dropout (Training Mode)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rmsprop-optimizer",
          "title": "RMSProp Optimizer (Single Update Step)",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gru-cell-forward",
          "title": "Build a Mini GRU Cell (Forward Pass)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "triton-basics-sec-2",
      "planId": "triton-basics",
      "title": "Core Techniques",
      "sortOrder": 2,
      "problems": [
        {
          "slug": "global-avg-pooling",
          "title": "Implement Global Average Pooling",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "simple-cnn-layer",
          "title": "Implement a Simple CNN Layer (NumPy)",
          "difficulty": "Medium",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-lr-scheduler",
          "title": "Learning Rate Scheduler (Linear Decay)",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "batch-normalization",
          "title": "Batch Normalization (Forward)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "gradient-clipping",
          "title": "Gradient Clipping (Global Norm)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adagrad-optimizer",
          "title": "AdaGrad Optimizer",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "triton-basics-sec-3",
      "planId": "triton-basics",
      "title": "Applied Practice",
      "sortOrder": 3,
      "quizTitle": "Triton Kernels Checkpoint",
      "problems": [
        {
          "slug": "nesterov-momentum",
          "title": "Implement Nesterov Momentum (NAG)",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adamw-optimizer",
          "title": "Implement AdamW (Decoupled Weight Decay)",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "adadelta-optimizer",
          "title": "Implement AdaDelta Update Step",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "nadam-optimizer",
          "title": "Implement Nadam (Nesterov + Adam)",
          "difficulty": "Medium",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rnn-step-forward",
          "title": "RNN Step Forward (Tanh Cell)",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "rnn-step-backward",
          "title": "RNN Step Backward (Vanilla RNN)",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "triton-basics-sec-4",
      "planId": "triton-basics",
      "title": "Advanced Topics",
      "sortOrder": 4,
      "problems": [
        {
          "slug": "warmup-decay-lr",
          "title": "Warmup + Linear Decay LR Schedule",
          "difficulty": "Easy",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "cosine-annealing-lr",
          "title": "Cosine Annealing LR Scheduler",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "lbfgs-two-loop",
          "title": "L-BFGS Two-Loop Recursion",
          "difficulty": "Hard",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "linear-layer-forward",
          "title": "Linear Layer Forward",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "xavier-initialization",
          "title": "Xavier Initialization",
          "difficulty": "Easy",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "he-initialization",
          "title": "He Initialization",
          "difficulty": "Easy",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    },
    {
      "id": "triton-basics-sec-5",
      "planId": "triton-basics",
      "title": "Capstone",
      "sortOrder": 5,
      "problems": [
        {
          "slug": "maxpool-forward",
          "title": "Max Pooling Forward",
          "difficulty": "Medium",
          "sortOrder": 1,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "sigmoid-numpy",
          "title": "Implement Sigmoid in NumPy",
          "difficulty": "Easy",
          "sortOrder": 2,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "pad-sequences",
          "title": "Pad Sequences",
          "difficulty": "Medium",
          "sortOrder": 3,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "matrix-transpose",
          "title": "Matrix Transpose",
          "difficulty": "Easy",
          "sortOrder": 4,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "positional-encoding",
          "title": "Implement Positional Encoding (sin/cos)",
          "difficulty": "Medium",
          "sortOrder": 5,
          "type": "coding",
          "isFree": true
        },
        {
          "slug": "anchor-box-generation",
          "title": "Anchor Box Generation",
          "difficulty": "Medium",
          "sortOrder": 6,
          "type": "coding",
          "isFree": true
        }
      ]
    }
  ]
};
