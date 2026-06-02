export type ResearchTopic = {
  id: string;
  name: string;
  description: string;
  color: string;
  sortOrder: number;
  problemId: string | null;
  isFree: boolean;
};

export type ResearchPaper = {
  id: string;
  title: string;
  authors: string;
  description: string;
  paperUrl: string;
  year: number;
  isLocked: boolean;
  sortOrder: number;
  architectureType?: string;
  visualizationComponent?: string;
  createdAt?: string;
  updatedAt?: string;
  topics: ResearchTopic[];
};

export const researchPapers: ResearchPaper[] = [
  {
    "id": "transformer",
    "title": "Attention Is All You Need",
    "authors": "Vaswani et al., 2017",
    "description": "The architecture that revolutionized NLP. Understand the Transformer model by implementing it from scratch component by component.",
    "paperUrl": "https://arxiv.org/abs/1706.03762",
    "year": 2017,
    "isLocked": false,
    "sortOrder": 1,
    "architectureType": "transformer",
    "visualizationComponent": "TransformerArchViz",
    "createdAt": "2026-01-08T09:58:14.556Z",
    "updatedAt": "2026-01-08T10:16:07.953Z",
    "topics": [
      {
        "id": "transformer-tokenization",
        "name": "Tokenization",
        "description": "Convert text to token IDs",
        "color": "#10b981",
        "sortOrder": 1,
        "problemId": "transformers-tokenization",
        "isFree": true
      },
      {
        "id": "transformer-embedding",
        "name": "Embedding Layer",
        "description": "Map tokens to vectors",
        "color": "#06b6d4",
        "sortOrder": 2,
        "problemId": "transformers-embedding",
        "isFree": true
      },
      {
        "id": "transformer-positional-encoding",
        "name": "Positional Encoding",
        "description": "Inject position via sinusoids",
        "color": "#3b82f6",
        "sortOrder": 3,
        "problemId": "transformers-positional-encoding",
        "isFree": true
      },
      {
        "id": "transformer-attention",
        "name": "Scaled Dot-Product Attention",
        "description": "Core QKV mechanism",
        "color": "#8b5cf6",
        "sortOrder": 4,
        "problemId": "transformers-attention",
        "isFree": true
      },
      {
        "id": "transformer-multi-head",
        "name": "Multi-Head Attention",
        "description": "Parallel attention heads",
        "color": "#a855f7",
        "sortOrder": 5,
        "problemId": "transformers-multi-head-attention",
        "isFree": true
      },
      {
        "id": "transformer-ffn",
        "name": "Feed-Forward Network",
        "description": "Position-wise MLP",
        "color": "#ec4899",
        "sortOrder": 6,
        "problemId": "transformers-feed-forward",
        "isFree": true
      },
      {
        "id": "transformer-layer-norm",
        "name": "Layer Normalization",
        "description": "Normalize activations",
        "color": "#f59e0b",
        "sortOrder": 7,
        "problemId": "transformers-layer-normalization",
        "isFree": true
      },
      {
        "id": "transformer-encoder-block",
        "name": "Encoder Block",
        "description": "Complete encoder layer",
        "color": "#10b981",
        "sortOrder": 8,
        "problemId": "transformers-encoder-block",
        "isFree": true
      }
    ]
  },
  {
    "id": "resnet",
    "title": "Deep Residual Learning",
    "authors": "He et al., 2015",
    "description": "Revolutionizing deep networks with residual connections. The foundation of modern computer vision.",
    "paperUrl": "https://arxiv.org/abs/1512.03385",
    "year": 2015,
    "isLocked": false,
    "sortOrder": 2,
    "architectureType": "cnn",
    "visualizationComponent": "ResNetArchViz",
    "createdAt": "2026-01-08T09:58:14.827Z",
    "updatedAt": "2026-01-08T10:16:08.826Z",
    "topics": [
      {
        "id": "resnet-identity-block",
        "name": "Identity Block",
        "description": "Basic residual connection with no dimension change",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "resnet-identity-block",
        "isFree": true
      },
      {
        "id": "resnet-conv-block",
        "name": "Convolutional Block",
        "description": "Residual with 1x1 projection for dimension matching",
        "color": "#8b5cf6",
        "sortOrder": 2,
        "problemId": "resnet-conv-block",
        "isFree": true
      },
      {
        "id": "resnet-bottleneck",
        "name": "Bottleneck Architecture",
        "description": "1×1 → 3×3 → 1×1 compression pattern",
        "color": "#f59e0b",
        "sortOrder": 3,
        "problemId": "resnet-bottleneck",
        "isFree": true
      },
      {
        "id": "resnet-skip-connection",
        "name": "Skip Connection Mechanics",
        "description": "Gradient flow through shortcuts",
        "color": "#f43f5e",
        "sortOrder": 4,
        "problemId": "resnet-skip-connection",
        "isFree": true
      },
      {
        "id": "resnet-batch-norm",
        "name": "BatchNorm in ResNet",
        "description": "Pre-activation vs post-activation ordering",
        "color": "#06b6d4",
        "sortOrder": 5,
        "problemId": "resnet-batch-norm",
        "isFree": true
      },
      {
        "id": "resnet-full-network",
        "name": "Full ResNet Assembly",
        "description": "Combining blocks into ResNet-18/34 structure",
        "color": "#10b981",
        "sortOrder": 6,
        "problemId": "resnet-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "bert",
    "title": "BERT: Pre-training of Deep Bidirectional Transformers",
    "authors": "Devlin et al., 2018",
    "description": "Pre-training of Deep Bidirectional Transformers for Language Understanding.",
    "paperUrl": "https://arxiv.org/abs/1810.04805",
    "year": 2018,
    "isLocked": false,
    "sortOrder": 3,
    "architectureType": "transformer",
    "visualizationComponent": "BertArchViz",
    "createdAt": "2026-01-08T09:58:15.078Z",
    "updatedAt": "2026-01-08T10:16:09.028Z",
    "topics": [
      {
        "id": "bert-wordpiece",
        "name": "WordPiece Tokenization",
        "description": "Subword tokenization with ## prefix",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "bert-wordpiece",
        "isFree": true
      },
      {
        "id": "bert-segment-embedding",
        "name": "Segment Embeddings",
        "description": "Token type IDs for sentence pairs",
        "color": "#f472b6",
        "sortOrder": 2,
        "problemId": "bert-segment-embedding",
        "isFree": true
      },
      {
        "id": "bert-masked-lm",
        "name": "Masked Language Modeling",
        "description": "15% masking with 80-10-10 strategy",
        "color": "#8b5cf6",
        "sortOrder": 3,
        "problemId": "bert-masked-lm",
        "isFree": true
      },
      {
        "id": "bert-nsp",
        "name": "Next Sentence Prediction",
        "description": "Binary classification pre-training task",
        "color": "#06b6d4",
        "sortOrder": 4,
        "problemId": "bert-nsp",
        "isFree": true
      },
      {
        "id": "bert-pooler",
        "name": "BERT Pooler",
        "description": "[CLS] token extraction for classification",
        "color": "#6366f1",
        "sortOrder": 5,
        "problemId": "bert-pooler",
        "isFree": true
      },
      {
        "id": "bert-fine-tuning",
        "name": "Fine-tuning Architecture",
        "description": "Adding task-specific heads",
        "color": "#10b981",
        "sortOrder": 6,
        "problemId": "bert-fine-tuning",
        "isFree": true
      }
    ]
  },
  {
    "id": "vgg",
    "title": "Very Deep Convolutional Networks",
    "authors": "Simonyan & Zisserman, 2014",
    "description": "Deep networks with 3×3 convolutions. Showing that depth is critical for visual representations.",
    "paperUrl": "https://arxiv.org/abs/1409.1556",
    "year": 2014,
    "isLocked": false,
    "sortOrder": 4,
    "architectureType": "cnn",
    "visualizationComponent": "VggArchViz",
    "createdAt": "2026-01-08T09:58:30.508Z",
    "updatedAt": "2026-01-08T10:16:09.227Z",
    "topics": [
      {
        "id": "vgg-conv-block",
        "name": "VGG Conv Block",
        "description": "Stacked 3×3 convolutions with ReLU",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "vgg-conv-block",
        "isFree": true
      },
      {
        "id": "vgg-maxpool",
        "name": "VGG Max Pooling",
        "description": "2×2 max pooling with stride 2",
        "color": "#8b5cf6",
        "sortOrder": 2,
        "problemId": "vgg-maxpool",
        "isFree": true
      },
      {
        "id": "vgg-classifier",
        "name": "VGG Classifier Head",
        "description": "FC layers: 4096-4096-1000",
        "color": "#ec4899",
        "sortOrder": 3,
        "problemId": "vgg-classifier",
        "isFree": true
      },
      {
        "id": "vgg-config",
        "name": "VGG Configuration",
        "description": "VGG-11, VGG-16, VGG-19 variants",
        "color": "#f59e0b",
        "sortOrder": 4,
        "problemId": "vgg-config",
        "isFree": true
      },
      {
        "id": "vgg-feature-extractor",
        "name": "VGG Feature Extractor",
        "description": "Complete conv backbone",
        "color": "#06b6d4",
        "sortOrder": 5,
        "problemId": "vgg-feature-extractor",
        "isFree": true
      },
      {
        "id": "vgg-full-network",
        "name": "Complete VGG Network",
        "description": "End-to-end classification",
        "color": "#10b981",
        "sortOrder": 6,
        "problemId": "vgg-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "unet",
    "title": "U-Net: Convolutional Networks for Biomedical Image Segmentation",
    "authors": "Ronneberger et al., 2015",
    "description": "Encoder-decoder with skip connections for precise segmentation. The foundation of modern image segmentation.",
    "paperUrl": "https://arxiv.org/abs/1505.04597",
    "year": 2015,
    "isLocked": false,
    "sortOrder": 5,
    "architectureType": "segmentation",
    "visualizationComponent": "UnetArchViz",
    "createdAt": "2026-01-08T09:58:34.138Z",
    "updatedAt": "2026-01-08T10:16:09.439Z",
    "topics": [
      {
        "id": "unet-encoder-block",
        "name": "U-Net Encoder Block",
        "description": "Double conv + max pool downsampling",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "unet-encoder-block",
        "isFree": true
      },
      {
        "id": "unet-decoder-block",
        "name": "U-Net Decoder Block",
        "description": "Up-conv + concat + double conv",
        "color": "#8b5cf6",
        "sortOrder": 2,
        "problemId": "unet-decoder-block",
        "isFree": true
      },
      {
        "id": "unet-skip-connection",
        "name": "U-Net Skip Connections",
        "description": "Center crop + concatenate",
        "color": "#06b6d4",
        "sortOrder": 3,
        "problemId": "unet-skip-connection",
        "isFree": true
      },
      {
        "id": "unet-bottleneck",
        "name": "U-Net Bottleneck",
        "description": "Bridge at lowest resolution",
        "color": "#10b981",
        "sortOrder": 4,
        "problemId": "unet-bottleneck",
        "isFree": true
      },
      {
        "id": "unet-output-layer",
        "name": "U-Net Output Layer",
        "description": "1×1 conv for pixel-wise classification",
        "color": "#f59e0b",
        "sortOrder": 5,
        "problemId": "unet-output-layer",
        "isFree": true
      },
      {
        "id": "unet-full-network",
        "name": "Complete U-Net",
        "description": "Full encoder-decoder architecture",
        "color": "#ec4899",
        "sortOrder": 6,
        "problemId": "unet-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "vae",
    "title": "Auto-Encoding Variational Bayes (VAE)",
    "authors": "Kingma & Welling, 2013",
    "description": "Learn latent representations through probabilistic encoding. Generate new samples by sampling from latent space.",
    "paperUrl": "https://arxiv.org/abs/1312.6114",
    "year": 2013,
    "isLocked": false,
    "sortOrder": 6,
    "architectureType": "vae",
    "visualizationComponent": "VaeArchViz",
    "createdAt": "2026-01-08T09:58:36.228Z",
    "updatedAt": "2026-01-08T10:16:09.640Z",
    "topics": [
      {
        "id": "vae-encoder",
        "name": "VAE Encoder",
        "description": "Map input to distribution params",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "vae-encoder",
        "isFree": true
      },
      {
        "id": "vae-reparameterization",
        "name": "Reparameterization Trick",
        "description": "Enable backprop through sampling",
        "color": "#06b6d4",
        "sortOrder": 2,
        "problemId": "vae-reparameterization",
        "isFree": true
      },
      {
        "id": "vae-decoder",
        "name": "VAE Decoder",
        "description": "Reconstruct from latent",
        "color": "#10b981",
        "sortOrder": 3,
        "problemId": "vae-decoder",
        "isFree": true
      },
      {
        "id": "vae-kl-divergence",
        "name": "KL Divergence",
        "description": "Regularize latent space",
        "color": "#ec4899",
        "sortOrder": 4,
        "problemId": "vae-kl-divergence",
        "isFree": true
      },
      {
        "id": "vae-elbo-loss",
        "name": "ELBO Loss",
        "description": "Reconstruct + KL objective",
        "color": "#f59e0b",
        "sortOrder": 5,
        "problemId": "vae-elbo-loss",
        "isFree": true
      },
      {
        "id": "vae-full-network",
        "name": "Complete VAE",
        "description": "Full encoder-decoder pipeline",
        "color": "#8b5cf6",
        "sortOrder": 6,
        "problemId": "vae-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "gan",
    "title": "Generative Adversarial Networks (GAN)",
    "authors": "Goodfellow et al., 2014",
    "description": "Generator vs Discriminator minimax game. Learn to generate realistic data through adversarial training.",
    "paperUrl": "https://arxiv.org/abs/1406.2661",
    "year": 2014,
    "isLocked": false,
    "sortOrder": 7,
    "architectureType": "gan",
    "visualizationComponent": "GanArchViz",
    "createdAt": "2026-01-08T09:58:36.943Z",
    "updatedAt": "2026-01-08T10:16:09.847Z",
    "topics": [
      {
        "id": "gan-generator",
        "name": "Generator",
        "description": "Create fake data from noise",
        "color": "#10b981",
        "sortOrder": 1,
        "problemId": "gan-generator",
        "isFree": true
      },
      {
        "id": "gan-discriminator",
        "name": "Discriminator",
        "description": "Classify real vs fake",
        "color": "#ef4444",
        "sortOrder": 2,
        "problemId": "gan-discriminator",
        "isFree": true
      },
      {
        "id": "gan-loss",
        "name": "GAN Loss Functions",
        "description": "Adversarial objectives",
        "color": "#f59e0b",
        "sortOrder": 3,
        "problemId": "gan-loss",
        "isFree": true
      },
      {
        "id": "gan-training-loop",
        "name": "Training Loop",
        "description": "Alternating optimization",
        "color": "#8b5cf6",
        "sortOrder": 4,
        "problemId": "gan-training-loop",
        "isFree": true
      },
      {
        "id": "gan-mode-collapse",
        "name": "Mode Collapse",
        "description": "Detect diversity issues",
        "color": "#ec4899",
        "sortOrder": 5,
        "problemId": "gan-mode-collapse",
        "isFree": true
      },
      {
        "id": "gan-full-network",
        "name": "Complete GAN",
        "description": "Full adversarial system",
        "color": "#3b82f6",
        "sortOrder": 6,
        "problemId": "gan-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "vit",
    "title": "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    "authors": "Dosovitskiy et al., 2020",
    "description": "Apply pure Transformer architecture directly to sequences of image patches for classification. ViT demonstrates that Transformers can match or exceed CNNs when trained on sufficient data.",
    "paperUrl": "https://arxiv.org/abs/2010.11929",
    "year": 2020,
    "isLocked": false,
    "sortOrder": 8,
    "architectureType": "transformer",
    "visualizationComponent": "ViTArchViz",
    "createdAt": "2026-01-10T22:03:52.874Z",
    "updatedAt": "2026-01-10T22:14:14.007Z",
    "topics": [
      {
        "id": "vit-patch-embedding",
        "name": "Patch Embedding",
        "description": "Split image into patches and project them to embeddings",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "vit-patch-embedding",
        "isFree": true
      },
      {
        "id": "vit-position-embedding",
        "name": "Position Embedding",
        "description": "Add learnable position information to patches",
        "color": "#8b5cf6",
        "sortOrder": 2,
        "problemId": "vit-position-embedding",
        "isFree": true
      },
      {
        "id": "vit-class-token",
        "name": "Class Token [CLS]",
        "description": "Prepend learnable classification token",
        "color": "#06b6d4",
        "sortOrder": 3,
        "problemId": "vit-class-token",
        "isFree": true
      },
      {
        "id": "vit-encoder-block",
        "name": "ViT Encoder Block",
        "description": "Pre-LN Transformer block with GELU MLP",
        "color": "#10b981",
        "sortOrder": 4,
        "problemId": "vit-encoder-block",
        "isFree": true
      },
      {
        "id": "vit-mlp-head",
        "name": "Classification Head",
        "description": "Extract [CLS] and project to classes",
        "color": "#f59e0b",
        "sortOrder": 5,
        "problemId": "vit-mlp-head",
        "isFree": true
      },
      {
        "id": "vit-full-network",
        "name": "Complete ViT",
        "description": "Full Vision Transformer forward pass",
        "color": "#ec4899",
        "sortOrder": 6,
        "problemId": "vit-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "rnn",
    "title": "Finding Structure in Time (Vanilla RNN)",
    "authors": "Elman, 1990",
    "description": "The foundational architecture for processing sequential data. Understand how hidden states carry information across time steps and why vanilla RNNs struggle with long-term dependencies.",
    "paperUrl": "https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog1402_1",
    "year": 1990,
    "isLocked": false,
    "sortOrder": 9,
    "architectureType": "recurrent",
    "visualizationComponent": "RNNArchViz",
    "createdAt": "2026-01-10T22:39:17.782Z",
    "updatedAt": "2026-01-10T22:39:17.782Z",
    "topics": [
      {
        "id": "rnn-cell",
        "name": "RNN Cell",
        "description": "Single time step computation",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "rnn-cell",
        "isFree": true
      },
      {
        "id": "rnn-hidden-state",
        "name": "Hidden State",
        "description": "Memory that persists across time",
        "color": "#8b5cf6",
        "sortOrder": 2,
        "problemId": "rnn-hidden-state",
        "isFree": true
      },
      {
        "id": "rnn-forward-sequence",
        "name": "Forward Through Sequence",
        "description": "Process entire input sequence",
        "color": "#06b6d4",
        "sortOrder": 3,
        "problemId": "rnn-forward-sequence",
        "isFree": true
      },
      {
        "id": "rnn-bptt",
        "name": "Backprop Through Time",
        "description": "Gradient flow across time steps",
        "color": "#10b981",
        "sortOrder": 4,
        "problemId": "rnn-bptt",
        "isFree": true
      },
      {
        "id": "rnn-vanishing-gradients",
        "name": "Vanishing Gradients",
        "description": "Why vanilla RNN forgets",
        "color": "#f59e0b",
        "sortOrder": 5,
        "problemId": "rnn-vanishing-gradients",
        "isFree": true
      },
      {
        "id": "rnn-full-network",
        "name": "Complete RNN",
        "description": "Full vanilla RNN implementation",
        "color": "#ec4899",
        "sortOrder": 6,
        "problemId": "rnn-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "lstm",
    "title": "Long Short-Term Memory",
    "authors": "Hochreiter & Schmidhuber, 1997",
    "description": "The architecture that solved the vanishing gradient problem in RNNs. LSTM uses gates to control information flow, enabling learning of long-term dependencies.",
    "paperUrl": "https://www.bioinf.jku.at/publications/older/2604.pdf",
    "year": 1997,
    "isLocked": false,
    "sortOrder": 10,
    "architectureType": "recurrent",
    "visualizationComponent": "LSTMArchViz",
    "createdAt": "2026-01-10T22:45:25.280Z",
    "updatedAt": "2026-01-10T22:45:25.280Z",
    "topics": [
      {
        "id": "lstm-forget-gate",
        "name": "Forget Gate",
        "description": "Decides what information to discard",
        "color": "#ef4444",
        "sortOrder": 1,
        "problemId": "lstm-forget-gate",
        "isFree": true
      },
      {
        "id": "lstm-input-gate",
        "name": "Input Gate",
        "description": "Decides what new information to store",
        "color": "#22c55e",
        "sortOrder": 2,
        "problemId": "lstm-input-gate",
        "isFree": true
      },
      {
        "id": "lstm-cell-state",
        "name": "Cell State",
        "description": "The memory highway through time",
        "color": "#3b82f6",
        "sortOrder": 3,
        "problemId": "lstm-cell-state",
        "isFree": true
      },
      {
        "id": "lstm-output-gate",
        "name": "Output Gate",
        "description": "Decides what to output",
        "color": "#a855f7",
        "sortOrder": 4,
        "problemId": "lstm-output-gate",
        "isFree": true
      },
      {
        "id": "lstm-cell",
        "name": "LSTM Cell",
        "description": "Complete cell with all gates",
        "color": "#f59e0b",
        "sortOrder": 5,
        "problemId": "lstm-cell",
        "isFree": true
      },
      {
        "id": "lstm-full-network",
        "name": "Complete LSTM",
        "description": "Full LSTM network implementation",
        "color": "#ec4899",
        "sortOrder": 6,
        "problemId": "lstm-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "gru",
    "title": "Learning Phrase Representations using RNN Encoder-Decoder (GRU)",
    "authors": "Cho et al., 2014",
    "description": "GRU simplifies LSTM with only two gates (reset and update) while achieving similar performance. Fewer parameters, faster training, and easier to understand.",
    "paperUrl": "https://arxiv.org/abs/1406.1078",
    "year": 2014,
    "isLocked": false,
    "sortOrder": 11,
    "architectureType": "recurrent",
    "visualizationComponent": "GRUArchViz",
    "createdAt": "2026-01-11T16:51:23.912Z",
    "updatedAt": "2026-01-11T16:51:23.912Z",
    "topics": [
      {
        "id": "gru-reset-gate",
        "name": "Reset Gate",
        "description": "Controls how much past to forget",
        "color": "#ef4444",
        "sortOrder": 1,
        "problemId": "gru-reset-gate",
        "isFree": true
      },
      {
        "id": "gru-update-gate",
        "name": "Update Gate",
        "description": "Controls blend of old and new",
        "color": "#22c55e",
        "sortOrder": 2,
        "problemId": "gru-update-gate",
        "isFree": true
      },
      {
        "id": "gru-candidate",
        "name": "Candidate Hidden",
        "description": "New hidden state proposal",
        "color": "#3b82f6",
        "sortOrder": 3,
        "problemId": "gru-candidate",
        "isFree": true
      },
      {
        "id": "gru-hidden-update",
        "name": "Hidden State Update",
        "description": "Interpolate old and candidate",
        "color": "#a855f7",
        "sortOrder": 4,
        "problemId": "gru-hidden-update",
        "isFree": true
      },
      {
        "id": "gru-cell",
        "name": "GRU Cell",
        "description": "Complete cell with both gates",
        "color": "#f59e0b",
        "sortOrder": 5,
        "problemId": "gru-cell",
        "isFree": true
      },
      {
        "id": "gru-full-network",
        "name": "Complete GRU",
        "description": "Full GRU network implementation",
        "color": "#ec4899",
        "sortOrder": 6,
        "problemId": "gru-full-network",
        "isFree": true
      }
    ]
  },
  {
    "id": "alexnet",
    "title": "ImageNet Classification with Deep Convolutional Neural Networks",
    "authors": "Krizhevsky, Sutskever & Hinton, 2012",
    "description": "The breakthrough paper that started the deep learning revolution. AlexNet won the 2012 ImageNet competition by a large margin, demonstrating the power of deep CNNs with ReLU, dropout, and GPU training.",
    "paperUrl": "https://papers.nips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf",
    "year": 2012,
    "isLocked": false,
    "sortOrder": 12,
    "architectureType": "cnn",
    "visualizationComponent": "AlexNetArchViz",
    "createdAt": "2026-01-23T18:46:09.650Z",
    "updatedAt": "2026-01-23T18:46:09.650Z",
    "topics": [
      {
        "id": "alexnet-conv-layers",
        "name": "Convolutional Layers",
        "description": "Large 11×11 and 5×5 kernels in early layers",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "alexnet-conv-layers",
        "isFree": true
      },
      {
        "id": "alexnet-relu",
        "name": "ReLU Activation",
        "description": "6× faster training than tanh",
        "color": "#10b981",
        "sortOrder": 2,
        "problemId": "alexnet-relu",
        "isFree": true
      },
      {
        "id": "alexnet-dropout",
        "name": "Dropout Regularization",
        "description": "Prevent overfitting with p=0.5",
        "color": "#f59e0b",
        "sortOrder": 3,
        "problemId": "alexnet-dropout",
        "isFree": true
      },
      {
        "id": "alexnet-lrn",
        "name": "Local Response Normalization",
        "description": "Cross-channel normalization",
        "color": "#8b5cf6",
        "sortOrder": 4,
        "problemId": "alexnet-lrn",
        "isFree": true
      },
      {
        "id": "alexnet-pooling",
        "name": "Overlapping Max Pooling",
        "description": "3×3 pooling with stride 2",
        "color": "#ec4899",
        "sortOrder": 5,
        "problemId": "alexnet-pooling",
        "isFree": true
      },
      {
        "id": "alexnet-augmentation",
        "name": "Data Augmentation",
        "description": "Random crops, flips, and PCA color",
        "color": "#06b6d4",
        "sortOrder": 6,
        "problemId": "alexnet-augmentation",
        "isFree": true
      }
    ]
  },
  {
    "id": "ddpm",
    "title": "Denoising Diffusion Probabilistic Models",
    "authors": "Ho, Jain & Abbeel, 2020",
    "description": "The paper that revitalized diffusion models for image generation. DDPM learns to reverse a gradual noising process, generating high-quality images through iterative denoising.",
    "paperUrl": "https://arxiv.org/abs/2006.11239",
    "year": 2020,
    "isLocked": false,
    "sortOrder": 13,
    "architectureType": "diffusion",
    "visualizationComponent": "DDPMArchViz",
    "createdAt": "2026-01-23T18:46:10.554Z",
    "updatedAt": "2026-01-23T18:46:10.554Z",
    "topics": [
      {
        "id": "ddpm-forward",
        "name": "Forward Diffusion",
        "description": "Gradually add Gaussian noise over T steps",
        "color": "#ef4444",
        "sortOrder": 1,
        "problemId": "ddpm-forward",
        "isFree": true
      },
      {
        "id": "ddpm-reverse",
        "name": "Reverse Process",
        "description": "Learn to denoise step by step",
        "color": "#10b981",
        "sortOrder": 2,
        "problemId": "ddpm-reverse",
        "isFree": true
      },
      {
        "id": "ddpm-schedule",
        "name": "Noise Schedule",
        "description": "Linear and cosine β schedules",
        "color": "#f59e0b",
        "sortOrder": 3,
        "problemId": "ddpm-schedule",
        "isFree": true
      },
      {
        "id": "ddpm-loss",
        "name": "Training Objective",
        "description": "ε-prediction and simplified loss",
        "color": "#8b5cf6",
        "sortOrder": 4,
        "problemId": "ddpm-loss",
        "isFree": true
      },
      {
        "id": "ddpm-sampling",
        "name": "Sampling Algorithm",
        "description": "Iterative denoising from pure noise",
        "color": "#3b82f6",
        "sortOrder": 5,
        "problemId": "ddpm-sampling",
        "isFree": true
      }
    ]
  },
  {
    "id": "llama",
    "title": "LLaMA",
    "authors": "Touvron et al., 2023",
    "description": "",
    "paperUrl": "https://arxiv.org/abs/2302.13971",
    "year": 2023,
    "isLocked": false,
    "sortOrder": 14,
    "architectureType": "transformer",
    "visualizationComponent": "TransformerArchViz",
    "createdAt": "2026-04-11T14:57:28.974Z",
    "updatedAt": "2026-04-11T14:57:28.974Z",
    "topics": [
      {
        "id": "llama-rmsnorm",
        "name": "RMSNorm",
        "description": "Root Mean Square Layer Normalization",
        "color": "#10b981",
        "sortOrder": 1,
        "problemId": "llama-rmsnorm",
        "isFree": false
      },
      {
        "id": "llama-rope",
        "name": "Rotary Positional Embeddings",
        "description": "RoPE position encoding via rotation",
        "color": "#3b82f6",
        "sortOrder": 2,
        "problemId": "llama-rope",
        "isFree": false
      },
      {
        "id": "llama-rope-freqs",
        "name": "RoPE Frequency Table",
        "description": "Precompute cos/sin frequency tables",
        "color": "#3b82f6",
        "sortOrder": 3,
        "problemId": "llama-rope-freqs",
        "isFree": false
      },
      {
        "id": "llama-gqa",
        "name": "Grouped Query Attention",
        "description": "Multi-query attention with shared KV heads",
        "color": "#8b5cf6",
        "sortOrder": 4,
        "problemId": "llama-gqa",
        "isFree": false
      },
      {
        "id": "llama-kv-repeat",
        "name": "KV Head Repeat",
        "description": "Expand KV heads to match query heads",
        "color": "#8b5cf6",
        "sortOrder": 5,
        "problemId": "llama-kv-repeat",
        "isFree": false
      },
      {
        "id": "llama-swiglu",
        "name": "SwiGLU FFN",
        "description": "Gated feedforward with Swish activation",
        "color": "#f59e0b",
        "sortOrder": 6,
        "problemId": "llama-swiglu",
        "isFree": false
      },
      {
        "id": "llama-block",
        "name": "Transformer Block",
        "description": "Full Llama 3 transformer block",
        "color": "#ef4444",
        "sortOrder": 7,
        "problemId": "llama-block",
        "isFree": false
      },
      {
        "id": "llama-forward",
        "name": "Full Forward Pass",
        "description": "Complete Llama 3 model forward pass",
        "color": "#ef4444",
        "sortOrder": 8,
        "problemId": "llama-forward",
        "isFree": false
      }
    ]
  },
  {
    "id": "gemma3",
    "title": "Gemma 3",
    "authors": "Gemma Team, Google DeepMind",
    "description": "",
    "paperUrl": "https://arxiv.org/abs/2503.19786",
    "year": 2025,
    "isLocked": false,
    "sortOrder": 15,
    "architectureType": "transformer",
    "visualizationComponent": "TransformerArchViz",
    "createdAt": "2026-04-11T16:01:03.960Z",
    "updatedAt": "2026-04-11T16:01:03.960Z",
    "topics": [
      {
        "id": "gemma3-sliding-window",
        "name": "Sliding Window Attention",
        "description": "Local attention with fixed window size",
        "color": "#06b6d4",
        "sortOrder": 1,
        "problemId": "gemma3-sliding-window",
        "isFree": false
      },
      {
        "id": "gemma3-layer-routing",
        "name": "Global vs Local Layer Routing",
        "description": "Route layers to local or global attention",
        "color": "#8b5cf6",
        "sortOrder": 2,
        "problemId": "gemma3-layer-routing",
        "isFree": false
      },
      {
        "id": "gemma3-qk-norm",
        "name": "QK-Norm",
        "description": "RMSNorm on Q and K before attention",
        "color": "#06b6d4",
        "sortOrder": 3,
        "problemId": "gemma3-qk-norm",
        "isFree": false
      },
      {
        "id": "gemma3-attention-block",
        "name": "Gemma 3 Attention Block",
        "description": "Full Gemma 3 attention with routing and QK-Norm",
        "color": "#ec4899",
        "sortOrder": 4,
        "problemId": "gemma3-attention-block",
        "isFree": false
      },
      {
        "id": "gemma3-full-block",
        "name": "Full Gemma 3 Block",
        "description": "Complete Gemma 3 transformer block",
        "color": "#ef4444",
        "sortOrder": 5,
        "problemId": "gemma3-full-block",
        "isFree": false
      }
    ]
  },
  {
    "id": "gpt2",
    "title": "GPT-2",
    "authors": "Radford et al., 2019",
    "description": "Decoder-only transformer with byte-level BPE, learned positional embeddings, pre-norm, and GELU activations. Build it from tokenization to generation.",
    "paperUrl": "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf",
    "year": 2019,
    "isLocked": false,
    "sortOrder": 16,
    "architectureType": "transformer",
    "visualizationComponent": "GPT2ArchViz",
    "createdAt": "2026-04-11T13:51:41.979Z",
    "updatedAt": "2026-04-11T13:51:41.979Z",
    "topics": [
      {
        "id": "gpt2-bpe-training",
        "name": "BPE Training",
        "description": "Byte Pair Encoding training algorithm",
        "color": "#10B981",
        "sortOrder": 1,
        "problemId": "gpt2-bpe-training",
        "isFree": false
      },
      {
        "id": "gpt2-bpe-encode-decode",
        "name": "BPE Encode/Decode",
        "description": "BPE encoding and decoding",
        "color": "#10B981",
        "sortOrder": 2,
        "problemId": "gpt2-bpe-encode-decode",
        "isFree": false
      },
      {
        "id": "gpt2-embedding",
        "name": "Token + Position Embedding",
        "description": "Combined token and learned positional embedding",
        "color": "#3B82F6",
        "sortOrder": 3,
        "problemId": "gpt2-embedding",
        "isFree": false
      },
      {
        "id": "gpt2-attention",
        "name": "Scaled Dot-Product Attention",
        "description": "Core attention computation",
        "color": "#8B5CF6",
        "sortOrder": 4,
        "problemId": "gpt2-attention",
        "isFree": false
      },
      {
        "id": "gpt2-causal-attention",
        "name": "Causal Masked Attention",
        "description": "Attention with causal mask for autoregressive decoding",
        "color": "#8B5CF6",
        "sortOrder": 5,
        "problemId": "gpt2-causal-attention",
        "isFree": false
      },
      {
        "id": "gpt2-mha",
        "name": "Multi-Head Attention",
        "description": "Multi-head causal self-attention",
        "color": "#8B5CF6",
        "sortOrder": 6,
        "problemId": "gpt2-mha",
        "isFree": false
      },
      {
        "id": "gpt2-gelu",
        "name": "GELU Activation",
        "description": "Gaussian Error Linear Unit activation function",
        "color": "#F59E0B",
        "sortOrder": 7,
        "problemId": "gpt2-gelu",
        "isFree": false
      },
      {
        "id": "gpt2-layernorm",
        "name": "Layer Normalization",
        "description": "Pre-norm layer normalization",
        "color": "#F59E0B",
        "sortOrder": 8,
        "problemId": "gpt2-layernorm",
        "isFree": false
      },
      {
        "id": "gpt2-ffn",
        "name": "Feed-Forward Network",
        "description": "Position-wise FFN with GELU",
        "color": "#F59E0B",
        "sortOrder": 9,
        "problemId": "gpt2-ffn",
        "isFree": false
      },
      {
        "id": "gpt2-decoder-block",
        "name": "Decoder Block",
        "description": "Full pre-norm transformer decoder block",
        "color": "#EF4444",
        "sortOrder": 10,
        "problemId": "gpt2-decoder-block",
        "isFree": false
      },
      {
        "id": "gpt2-init-scaling",
        "name": "Residual Weight Scaling",
        "description": "Initialization scaling for deep residual networks",
        "color": "#EF4444",
        "sortOrder": 11,
        "problemId": "gpt2-init-scaling",
        "isFree": false
      },
      {
        "id": "gpt2-forward",
        "name": "Full Forward Pass",
        "description": "Complete GPT-2 forward pass",
        "color": "#EF4444",
        "sortOrder": 12,
        "problemId": "gpt2-forward",
        "isFree": false
      },
      {
        "id": "gpt2-greedy-decode",
        "name": "Greedy Decoding",
        "description": "Autoregressive greedy generation",
        "color": "#EC4899",
        "sortOrder": 13,
        "problemId": "gpt2-greedy-decode",
        "isFree": false
      },
      {
        "id": "gpt2-topk-sampling",
        "name": "Top-k Sampling",
        "description": "Temperature scaling and top-k sampling",
        "color": "#EC4899",
        "sortOrder": 14,
        "problemId": "gpt2-topk-sampling",
        "isFree": false
      }
    ]
  },
  {
    "id": "deepseekv3",
    "title": "DeepSeek-V3",
    "authors": "DeepSeek-AI",
    "description": "",
    "paperUrl": "https://arxiv.org/abs/2412.19437",
    "year": 2024,
    "isLocked": false,
    "sortOrder": 17,
    "architectureType": "transformer",
    "visualizationComponent": "TransformerArchViz",
    "createdAt": "2026-04-11T16:42:56.576Z",
    "updatedAt": "2026-04-11T16:42:56.576Z",
    "topics": [
      {
        "id": "ds3-kv-compress",
        "name": "KV Compression",
        "description": "Low-rank down-projection for KV cache",
        "color": "#06b6d4",
        "sortOrder": 1,
        "problemId": "ds3-kv-compress",
        "isFree": false
      },
      {
        "id": "ds3-kv-reconstruct",
        "name": "KV Reconstruction",
        "description": "Up-project compressed KV back to full size",
        "color": "#06b6d4",
        "sortOrder": 2,
        "problemId": "ds3-kv-reconstruct",
        "isFree": false
      },
      {
        "id": "ds3-decoupled-rope",
        "name": "Decoupled RoPE",
        "description": "Separate RoPE for compressed keys",
        "color": "#3b82f6",
        "sortOrder": 3,
        "problemId": "ds3-decoupled-rope",
        "isFree": false
      },
      {
        "id": "ds3-mla",
        "name": "Multi-head Latent Attention",
        "description": "Full MLA combining compression and decoupled RoPE",
        "color": "#3b82f6",
        "sortOrder": 4,
        "problemId": "ds3-mla",
        "isFree": false
      },
      {
        "id": "ds3-moe-router",
        "name": "MoE Router",
        "description": "Top-k expert selection with gating",
        "color": "#8b5cf6",
        "sortOrder": 5,
        "problemId": "ds3-moe-router",
        "isFree": false
      },
      {
        "id": "ds3-shared-expert",
        "name": "Shared Expert",
        "description": "Always-active shared expert mechanism",
        "color": "#f59e0b",
        "sortOrder": 6,
        "problemId": "ds3-shared-expert",
        "isFree": false
      },
      {
        "id": "ds3-load-balance",
        "name": "Load Balancing",
        "description": "Auxiliary-loss-free load balancing via bias",
        "color": "#8b5cf6",
        "sortOrder": 7,
        "problemId": "ds3-load-balance",
        "isFree": false
      },
      {
        "id": "ds3-sparse-moe-ffn",
        "name": "Sparse MoE FFN",
        "description": "Full sparse MoE feedforward block",
        "color": "#f59e0b",
        "sortOrder": 8,
        "problemId": "ds3-sparse-moe-ffn",
        "isFree": false
      },
      {
        "id": "ds3-dense-prefix",
        "name": "Dense Prefix Layers",
        "description": "First N layers use dense FFN before MoE",
        "color": "#ec4899",
        "sortOrder": 9,
        "problemId": "ds3-dense-prefix",
        "isFree": false
      },
      {
        "id": "ds3-mtp",
        "name": "Multi-Token Prediction",
        "description": "Predict multiple future tokens simultaneously",
        "color": "#ec4899",
        "sortOrder": 10,
        "problemId": "ds3-mtp",
        "isFree": false
      },
      {
        "id": "ds3-block",
        "name": "Transformer Block",
        "description": "MLA + MoE combined block",
        "color": "#ef4444",
        "sortOrder": 11,
        "problemId": "ds3-block",
        "isFree": false
      },
      {
        "id": "ds3-forward",
        "name": "Full Forward Pass",
        "description": "Complete DeepSeek V3 forward pass",
        "color": "#ef4444",
        "sortOrder": 12,
        "problemId": "ds3-forward",
        "isFree": false
      }
    ]
  },
  {
    "id": "arcee-trinity",
    "title": "Arcee Trinity",
    "authors": "Arcee AI",
    "description": "",
    "paperUrl": "https://blog.arcee.ai/arcee-trinity",
    "year": 2025,
    "isLocked": false,
    "sortOrder": 18,
    "architectureType": "transformer",
    "visualizationComponent": "TransformerArchViz",
    "createdAt": "2026-04-11T17:54:13.332Z",
    "updatedAt": "2026-04-11T17:54:13.332Z",
    "topics": [
      {
        "id": "at-gated-attn",
        "name": "Gated Attention",
        "description": "Gate projection on attention output",
        "color": "#14b8a6",
        "sortOrder": 1,
        "problemId": "at-gated-attn",
        "isFree": false
      },
      {
        "id": "at-sigmoid-router",
        "name": "Sigmoid MoE Router",
        "description": "Sigmoid replaces softmax for expert routing",
        "color": "#14b8a6",
        "sortOrder": 2,
        "problemId": "at-sigmoid-router",
        "isFree": false
      },
      {
        "id": "at-smebu",
        "name": "SMEBU Load Balancing",
        "description": "Soft-clamped momentum expert bias updates",
        "color": "#14b8a6",
        "sortOrder": 3,
        "problemId": "at-smebu",
        "isFree": false
      },
      {
        "id": "at-sandwich-norm",
        "name": "Sandwich Norm",
        "description": "Depth-scaled pre and post normalization",
        "color": "#8b5cf6",
        "sortOrder": 4,
        "problemId": "at-sandwich-norm",
        "isFree": false
      },
      {
        "id": "at-nope",
        "name": "NoPE Layer",
        "description": "Attention without positional encoding",
        "color": "#8b5cf6",
        "sortOrder": 5,
        "problemId": "at-nope",
        "isFree": false
      },
      {
        "id": "at-interleaved",
        "name": "Interleaved RoPE + NoPE",
        "description": "3:1 RoPE/NoPE layer pattern",
        "color": "#8b5cf6",
        "sortOrder": 6,
        "problemId": "at-interleaved",
        "isFree": false
      },
      {
        "id": "at-coarse-moe",
        "name": "Coarse-Grained MoE FFN",
        "description": "MoE with grouped intermediate dimensions",
        "color": "#f59e0b",
        "sortOrder": 7,
        "problemId": "at-coarse-moe",
        "isFree": false
      },
      {
        "id": "at-block",
        "name": "Transformer Block",
        "description": "Full Arcee Trinity block assembly",
        "color": "#ef4444",
        "sortOrder": 8,
        "problemId": "at-block",
        "isFree": false
      },
      {
        "id": "at-forward",
        "name": "Full Forward Pass",
        "description": "Complete Arcee Trinity forward pass",
        "color": "#ef4444",
        "sortOrder": 9,
        "problemId": "at-forward",
        "isFree": false
      }
    ]
  },
  {
    "id": "gptoss",
    "title": "gpt-oss",
    "authors": "OpenAI, 2025",
    "description": "OpenAI's first open-weight reasoning models since GPT-2. Two variants (120B and 20B) using sparse MoE with MXFP4-quantized expert weights, alternating sliding-window/full attention with learned per-head softmax sinks, GQA, and YaRN-scaled RoPE for 128K context.",
    "paperUrl": "https://cdn.openai.com/pdf/419b6906-9da6-406c-a19d-1bb078ac7637/oai_gpt-oss_model_card.pdf",
    "year": 2025,
    "isLocked": false,
    "sortOrder": 19,
    "architectureType": "transformer",
    "visualizationComponent": "TransformerArchViz",
    "createdAt": "2026-05-29T19:04:48.036Z",
    "updatedAt": "2026-05-29T19:04:48.036Z",
    "topics": [
      {
        "id": "gpto-attention-sinks",
        "name": "Attention Sinks",
        "description": "Learned per-head scalar added inside the softmax denominator, giving each attention head an escape valve so weights no longer sum to 1.",
        "color": "#3b82f6",
        "sortOrder": 1,
        "problemId": "gpto-attention-sinks",
        "isFree": false
      },
      {
        "id": "gpto-yarn-rope",
        "name": "YaRN RoPE",
        "description": "NTK-by-parts inverse frequency scaling that extends RoPE to long contexts.",
        "color": "#3b82f6",
        "sortOrder": 2,
        "problemId": "gpto-yarn-rope",
        "isFree": false
      },
      {
        "id": "gpto-sliding-window-mask",
        "name": "Sliding Window",
        "description": "Causal mask that restricts each query to the previous W tokens, used on alternating attention layers.",
        "color": "#3b82f6",
        "sortOrder": 3,
        "problemId": "gpto-sliding-window-mask",
        "isFree": false
      },
      {
        "id": "gpto-gqa-attention",
        "name": "GQA Attention",
        "description": "Forward pass combining grouped-query attention, optional sliding window, and learned softmax sinks.",
        "color": "#8b5cf6",
        "sortOrder": 4,
        "problemId": "gpto-gqa-attention",
        "isFree": false
      },
      {
        "id": "gpto-mxfp4-dequant",
        "name": "MXFP4 Dequant",
        "description": "Microscaling FP4: dequantize 4-bit expert weights using a shared per-block FP8 scale.",
        "color": "#f59e0b",
        "sortOrder": 5,
        "problemId": "gpto-mxfp4-dequant",
        "isFree": false
      },
      {
        "id": "gpto-moe-routing",
        "name": "MoE Router",
        "description": "Top-k expert routing with softmax taken after the top-k selection, not before.",
        "color": "#f59e0b",
        "sortOrder": 6,
        "problemId": "gpto-moe-routing",
        "isFree": false
      },
      {
        "id": "gpto-moe-forward",
        "name": "MoE Forward",
        "description": "Sparse MoE forward: route, run clamped-SwiGLU experts, weighted-sum the outputs.",
        "color": "#f59e0b",
        "sortOrder": 7,
        "problemId": "gpto-moe-forward",
        "isFree": false
      },
      {
        "id": "gpto-block",
        "name": "Transformer Block",
        "description": "Pre-norm GPT-OSS block: RMSNorm, GQA attention with sinks plus optional sliding window, residual, RMSNorm, sparse MoE, residual.",
        "color": "#ef4444",
        "sortOrder": 8,
        "problemId": "gpto-block",
        "isFree": false
      },
      {
        "id": "gpto-forward",
        "name": "Full Forward",
        "description": "Embedding plus stacked GPT-OSS blocks (alternating attention pattern), final RMSNorm, lm head logits.",
        "color": "#ef4444",
        "sortOrder": 9,
        "problemId": "gpto-forward",
        "isFree": false
      }
    ]
  },
  {
    "id": "glm45",
    "title": "GLM-4.5",
    "authors": "GLM-4.5 Team, Z.ai (Zhipu), 2025",
    "description": "Open-weights MoE foundation model from Z.ai with 355B/32B-active (GLM-4.5) and 106B/12B-active (GLM-4.5-Air) variants. Distinctive: deeper-not-wider design (46 layers), QK-norm, partial RoPE, group-routed MoE with sigmoid gates, shared experts, and an MTP head for speculative decoding.",
    "paperUrl": "https://arxiv.org/pdf/2508.06471",
    "year": 2025,
    "isLocked": false,
    "sortOrder": 20,
    "architectureType": "transformer",
    "visualizationComponent": "TransformerArchViz",
    "createdAt": "2026-05-29T19:04:48.036Z",
    "updatedAt": "2026-05-29T19:04:48.036Z",
    "topics": [
      {
        "id": "glm-rmsnorm",
        "name": "RMSNorm",
        "description": "Root Mean Square Norm: stable, no-bias normalization used pre-attention and pre-FFN throughout GLM-4.5.",
        "color": "#10b981",
        "sortOrder": 1,
        "problemId": "glm-rmsnorm",
        "isFree": false
      },
      {
        "id": "glm-rope-freqs",
        "name": "RoPE Freqs",
        "description": "Base RoPE inverse-frequency table used by GLM-4.5 attention.",
        "color": "#3b82f6",
        "sortOrder": 2,
        "problemId": "glm-rope-freqs",
        "isFree": false
      },
      {
        "id": "glm-partial-rope",
        "name": "Partial RoPE",
        "description": "Apply RoPE only to the first rope_dim channels of each head; leave the remaining channels position-free.",
        "color": "#3b82f6",
        "sortOrder": 3,
        "problemId": "glm-partial-rope",
        "isFree": false
      },
      {
        "id": "glm-qk-norm",
        "name": "QK Norm",
        "description": "Normalize the query and key with RMSNorm before the dot product to stabilize attention logits.",
        "color": "#3b82f6",
        "sortOrder": 4,
        "problemId": "glm-qk-norm",
        "isFree": false
      },
      {
        "id": "glm-gqa-attention",
        "name": "GQA Attention",
        "description": "Forward pass combining GQA, partial RoPE, and QK-norm before scaled dot-product attention.",
        "color": "#8b5cf6",
        "sortOrder": 5,
        "problemId": "glm-gqa-attention",
        "isFree": false
      },
      {
        "id": "glm-swiglu",
        "name": "Dense SwiGLU",
        "description": "SwiGLU FFN used in the dense prefix layer of GLM-4.5 (layers before the MoE blocks).",
        "color": "#f59e0b",
        "sortOrder": 6,
        "problemId": "glm-swiglu",
        "isFree": false
      },
      {
        "id": "glm-group-router",
        "name": "Group Router",
        "description": "Group-restricted top-k routing: sigmoid scores, pick topk_group groups first, then top-k experts within those.",
        "color": "#f59e0b",
        "sortOrder": 7,
        "problemId": "glm-group-router",
        "isFree": false
      },
      {
        "id": "glm-shared-expert",
        "name": "Shared Expert",
        "description": "Always-on expert that processes every token, summed with the routed mixture, with a routed scaling factor.",
        "color": "#f59e0b",
        "sortOrder": 8,
        "problemId": "glm-shared-expert",
        "isFree": false
      },
      {
        "id": "glm-moe-forward",
        "name": "MoE Forward",
        "description": "Sparse MoE forward combining group-routed top-k, SwiGLU experts, shared expert, and routed_scaling_factor.",
        "color": "#f59e0b",
        "sortOrder": 9,
        "problemId": "glm-moe-forward",
        "isFree": false
      },
      {
        "id": "glm-mtp",
        "name": "MTP Head",
        "description": "Multi-Token Prediction head used in GLM-4.5 to predict additional future tokens for speculative decoding.",
        "color": "#ec4899",
        "sortOrder": 10,
        "problemId": "glm-mtp",
        "isFree": false
      },
      {
        "id": "glm-block",
        "name": "Transformer Block",
        "description": "Pre-norm GLM-4.5 block: RMSNorm, QK-norm attention with partial RoPE, residual, RMSNorm, dense-or-MoE FFN, residual.",
        "color": "#ef4444",
        "sortOrder": 11,
        "problemId": "glm-block",
        "isFree": false
      },
      {
        "id": "glm-forward",
        "name": "Full Forward",
        "description": "Embedding plus stacked GLM-4.5 blocks (1 dense prefix layer, then MoE layers), final RMSNorm, lm_head logits.",
        "color": "#ef4444",
        "sortOrder": 12,
        "problemId": "glm-forward",
        "isFree": false
      }
    ]
  }
];
