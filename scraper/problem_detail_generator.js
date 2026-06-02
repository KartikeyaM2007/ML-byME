/**
 * Generate rich problem details from research topic metadata + ML templates.
 */
const path = require('path');
const fs = require('fs');

const SITE = 'https://www.tensortonic.com';

const PAPER_CATEGORIES = {
  'Attention Is All You Need': ['Transformers', 'NLP'],
  'Deep Residual Learning': ['CNN', 'Computer Vision'],
  'BERT: Pre-training of Deep Bidirectional Transformers': ['Transformers', 'NLP'],
  'Very Deep Convolutional Networks': ['CNN', 'Computer Vision'],
  'U-Net: Convolutional Networks for Biomedical Image Segmentation': ['CNN', 'Computer Vision'],
  'Auto-Encoding Variational Bayes (VAE)': ['Generative Models'],
  'Generative Adversarial Networks (GAN)': ['Generative Models'],
  'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale': ['Vision', 'Transformers'],
  'Finding Structure in Time (Vanilla RNN)': ['RNN', 'Sequences'],
  'Long Short-Term Memory': ['RNN', 'Sequences'],
  'Learning Phrase Representations using RNN Encoder-Decoder (GRU)': ['RNN', 'Sequences'],
  'ImageNet Classification with Deep Convolutional Neural Networks': ['CNN', 'Computer Vision'],
  'Denoising Diffusion Probabilistic Models': ['Generative Models', 'Diffusion'],
  'LLaMA': ['Transformers', 'LLM'],
  'Gemma 3': ['Transformers', 'LLM'],
  'GPT-2': ['Transformers', 'NLP'],
  'DeepSeek-V3': ['Transformers', 'LLM', 'MoE'],
  'Arcee Trinity': ['Transformers', 'LLM', 'MoE'],
  'Gemma 3n': ['Transformers', 'LLM'],
  'GLM-4': ['Transformers', 'LLM'],
};

/** Longest-match-first starter templates keyed by slug substring */
const STARTER_PATTERNS = [
  ['transformers-tokenization', `def tokenize(text: str, vocab: dict[str, int], unk_id: int = 0):\n    pass`],
  ['bpe-encode-decode', `def bpe_encode(text: str, merges: list[tuple[str, str]], vocab: dict[str, int]) -> list[int]:\n    pass\n\ndef bpe_decode(ids: list[int], vocab: dict[int, str]) -> str:\n    pass`],
  ['bpe-training', `def train_bpe(corpus: str, num_merges: int) -> list[tuple[str, str]]:\n    pass`],
  ['wordpiece', `def wordpiece_tokenize(text: str, vocab: dict[str, int], unk: str = "[UNK]") -> list[int]:\n    pass`],
  ['masked-lm', `def masked_language_modeling_loss(logits, labels, mask):\n    pass`],
  ['causal-attention', `def causal_attention(Q, K, V, mask=None):\n    pass`],
  ['scaled-dot-product', `def scaled_dot_product_attention(Q, K, V):\n    pass`],
  ['multi-head', `def multi_head_attention(x, num_heads, W_q, W_k, W_v, W_o):\n    pass`],
  ['gqa-attention', `def grouped_query_attention(Q, K, V, num_q_heads, num_kv_heads):\n    pass`],
  ['sliding-window', `def sliding_window_mask(seq_len: int, window: int) -> np.ndarray:\n    pass`],
  ['positional-encoding', `def positional_encoding(seq_len: int, d_model: int) -> np.ndarray:\n    pass`],
  ['patch-embedding', `def patch_embedding(images, patch_size: int, embed_dim: int, W_proj, b_proj):\n    pass`],
  ['reparameterization', `def reparameterize(mu, logvar):\n    pass`],
  ['kl-divergence', `def kl_divergence(mu, logvar):\n    pass`],
  ['elbo-loss', `def elbo_loss(recon_loss, mu, logvar):\n    pass`],
  ['mode-collapse', `def detect_mode_collapse(samples: np.ndarray, threshold: float = 0.95) -> bool:\n    pass`],
  ['training-loop', `def train_step(model_fn, data_batch, optimizer_state):\n    pass`],
  ['greedy-decode', `def greedy_decode(logits: np.ndarray) -> np.ndarray:\n    pass`],
  ['topk-sampling', `def top_k_sample(logits: np.ndarray, k: int, temperature: float = 1.0) -> int:\n    pass`],
  ['noise-schedule', `def beta_schedule(T: int, schedule: str = "linear") -> np.ndarray:\n    pass`],
  ['load-balance', `def load_balance_loss(router_probs: np.ndarray) -> float:\n    pass`],
  ['mxfp4-dequant', `def dequant_mxfp4(packed: np.ndarray, scales: np.ndarray) -> np.ndarray:\n    pass`],
  ['identity-block', `def identity_block(x, W1, W2, W3, b1, b2, b3):\n    pass`],
  ['conv-block', `def conv_block(x, W1, W2, W3, b1, b2, b3, W_proj, b_proj):\n    pass`],
  ['skip-connection', `def skip_connection(x, F_x):\n    return x + F_x`],
  ['batch-norm', `def batch_norm(x, gamma, beta, eps=1e-5):\n    pass`],
  ['layer-norm', `def layer_norm(x, gamma, beta, eps=1e-5):\n    pass`],
  ['rmsnorm', `def rmsnorm(x, weight, eps=1e-6):\n    pass`],
  ['rope-freqs', `def rope_frequencies(head_dim: int, max_seq_len: int, theta: float = 10000.0):\n    pass`],
  ['rope', `def apply_rope(q, k, cos, sin):\n    pass`],
  ['swiglu', `def swiglu(x, W_gate, W_up, W_down, b_gate=None, b_up=None, b_down=None):\n    pass`],
  ['gelu', `def gelu(x):\n    pass`],
  ['forget-gate', `def lstm_forget_gate(x, h_prev, Wf, bf):\n    pass`],
  ['input-gate', `def lstm_input_gate(x, h_prev, Wi, bi):\n    pass`],
  ['output-gate', `def lstm_output_gate(x, h_prev, Wo, bo):\n    pass`],
  ['cell-state', `def lstm_cell_state(c_prev, i, f, g):\n    pass`],
  ['reset-gate', `def gru_reset_gate(x, h_prev, Wr, br):\n    pass`],
  ['update-gate', `def gru_update_gate(x, h_prev, Wz, bz):\n    pass`],
  ['discriminator', `def discriminate(x, params):\n    pass`],
  ['generator', `def generate(z, params):\n    pass`],
  ['encoder-block', `def encoder_block(x, attn_fn, ffn_fn, ln_params):\n    pass`],
  ['decoder-block', `def decoder_block(x, attn_fn, cross_attn_fn, ffn_fn, ln_params):\n    pass`],
  ['decoder', `def decode(z, params):\n    pass`],
  ['encoder', `def encode(x, params):\n    pass`],
  ['embedding', `def embed(token_ids, embedding_matrix):\n    pass`],
  ['attention', `def attention(Q, K, V, mask=None):\n    pass`],
  ['moe-router', `def moe_router(x, W_gate):\n    pass`],
  ['moe-forward', `def moe_forward(x, experts, router_probs, top_k=2):\n    pass`],
  ['router', `def route(x, W_router, num_experts: int):\n    pass`],
  ['forward-diffusion', `def forward_diffusion(x0, betas, t):\n    pass`],
  ['reverse', `def reverse_step(x_t, t, model_pred, betas):\n    pass`],
  ['sampling', `def sample(model_fn, shape, betas, T: int):\n    pass`],
  ['forward', `def forward(x, params):\n    pass`],
  ['full-network', `def full_forward(x, params):\n    pass`],
  ['pooling', `def max_pool(x, kernel_size, stride):\n    pass`],
  ['maxpool', `def max_pool(x, kernel_size, stride):\n    pass`],
  ['dropout', `def dropout(x, p: float, training: bool = True):\n    pass`],
  ['bottleneck', `def bottleneck_block(x, params):\n    pass`],
  ['class-token', `def class_token(batch_size: int, dim: int):\n    pass`],
  ['nsp', `def next_sentence_prediction(cls_logits, labels):\n    pass`],
  ['pooler', `def pooler(first_token, W, b):\n    pass`],
  ['loss', `def compute_loss(predictions, targets):\n    pass`],
  ['bptt', `def bptt_step(loss, hidden_states):\n    pass`],
  ['cell', `def rnn_cell(x_t, h_prev, Wxh, Whh, bh):\n    pass`],
  ['hidden-state', `def update_hidden(x_t, h_prev, params):\n    pass`],
  ['augmentation', `def random_crop_flip(image, crop_size):\n    pass`],
  ['classifier', `def classifier(features, W, b):\n    pass`],
  ['feature-extractor', `def extract_features(x, conv_layers):\n    pass`],
  ['output-layer', `def output_layer(x, W, b):\n    pass`],
  ['fine-tuning', `def finetune_head(features, labels, W, b, lr=1e-3):\n    pass`],
  ['segment-embedding', `def segment_embedding(segment_ids, E_seg):\n    pass`],
  ['position-embedding', `def position_embedding(pos_ids, E_pos):\n    pass`],
  ['init-scaling', `def init_scale(param, std_mult: float = 0.02):\n    pass`],
  ['kv-repeat', `def repeat_kv(kv, num_q_heads, num_kv_heads):\n    pass`],
  ['kv-compress', `def compress_kv(K, V, compression_ratio: int):\n    pass`],
  ['kv-reconstruct', `def reconstruct_kv(K_compressed, meta):\n    pass`],
  ['qk-norm', `def qk_norm(q, k, gamma_q, gamma_k, eps=1e-6):\n    pass`],
  ['sandwich-norm', `def sandwich_norm(x, pre_attn, post_attn, pre_ffn, post_ffn):\n    pass`],
  ['yarn-rope', `def yarn_rope_scaling(freqs, seq_len, factor: float):\n    pass`],
  ['attention-sinks', `def attention_with_sinks(Q, K, V, sink_token):\n    pass`],
  ['mtp', `def multi_token_prediction(hidden, W_mtp):\n    pass`],
  ['mla', `def multi_latent_attention(x, W_down, W_up):\n    pass`],
  ['shared-expert', `def shared_expert_ffn(x, W_shared):\n    pass`],
  ['dense-prefix', `def dense_prefix_layers(x, prefix_params, num_dense_layers: int):\n    pass`],
  ['gated-attn', `def gated_attention(Q, K, V, gate):\n    pass`],
  ['sigmoid-router', `def sigmoid_router(x, W_router):\n    pass`],
  ['interleaved', `def interleave_layers(x, layer_fns):\n    pass`],
  ['coarse-moe', `def coarse_moe(x, experts, router):\n    pass`],
  ['layer-routing', `def layer_routing(x, router_weights):\n    pass`],
  ['partial-rope', `def partial_rope(q, k, cos, sin, rot_dim: int):\n    pass`],
  ['group-router', `def group_router(x, W_router, num_groups: int):\n    pass`],
  ['ffn', `def ffn(x, W1, b1, W2, b2, activation=np.gelu):\n    pass`],
  ['layernorm', `def layer_norm(x, gamma, beta, eps=1e-5):\n    pass`],
  ['config', `def build_vgg_config(depth: str = "VGG16"):\n    pass`],
  ['relu', `def relu(x):\n    return np.maximum(0, x)`],
  ['lrn', `def local_response_norm(x, depth_radius=5, alpha=1e-4, beta=0.75, k=2.0):\n    pass`],
  ['vanishing-gradients', `def gradient_norm_over_time(gradients: list) -> np.ndarray:\n    pass`],
  ['forward-sequence', `def forward_sequence(x, cell_fn, h0):\n    pass`],
  ['decoupled-rope', `def decoupled_rope_apply(q, k, freqs_q, freqs_k):\n    pass`],
  ['sparse-moe-ffn', `def sparse_moe_ffn(x, experts, top_k_indices, top_k_weights):\n    pass`],
  ['mlp-head', `def mlp_head(x, W1, b1, W2, b2):\n    pass`],
  ['candidate', `def gru_candidate(x, h_prev, r, Wc, bc):\n    pass`],
  ['hidden-update', `def gru_hidden_update(h_prev, c, z):\n    pass`],
  ['smebu', `def smebu_block(x, params):\n    pass`],
  ['nope', `def nope_attention(Q, K, V):\n    pass`],
  ['block', `def block(x, sublayers, ln_params):\n    pass`],
];

function slugToFn(slug) {
  return slug.replace(/-/g, '_').replace(/^(transformers|resnet|bert|vgg|unet|vae|gan|vit|rnn|lstm|gru|alexnet|ddpm|llama|gemma3|gpt2|ds3|at|gpto|glm)_/, '');
}

function pickStarter(slug, name) {
  const sorted = [...STARTER_PATTERNS].sort((a, b) => b[0].length - a[0].length);
  for (const [key, body] of sorted) {
    if (slug.includes(key)) {
      return `import numpy as np\n\n${body}\n`;
    }
  }
  const fn = slugToFn(slug) || 'solve';
  return `import numpy as np\n\ndef ${fn}(*args, **kwargs):\n    """Implement: ${name}"""\n    pass\n`;
}

function inferDifficulty(slug) {
  if (/full-network|forward$|decoder-block|encoder-block|block$|moe|diffusion/.test(slug)) return 'Hard';
  if (/easy|relu|dropout|sigmoid/.test(slug)) return 'Easy';
  return 'Medium';
}

function categories(paperTitle, slug) {
  if (PAPER_CATEGORIES[paperTitle]) return PAPER_CATEGORIES[paperTitle];
  if (slug.startsWith('transformers')) return ['Transformers', 'NLP'];
  if (slug.startsWith('resnet') || slug.startsWith('vgg') || slug.startsWith('alexnet') || slug.startsWith('vit'))
    return ['CNN', 'Computer Vision'];
  if (slug.startsWith('llama') || slug.startsWith('gpt2') || slug.startsWith('gemma') || slug.startsWith('glm'))
    return ['Transformers', 'LLM'];
  return ['Research', 'ML'];
}

function isThin(detail) {
  const p = detail.prompt || '';
  const s = detail.starterCode || '';
  return (
    s.includes('NotImplementedError') ||
    p.includes('Implement this component from scratch') ||
    p.length < 80
  );
}

function buildRichDetail(slug, meta, existing = {}) {
  const name = meta?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const desc = meta?.description || 'Build this module step by step.';
  const paper = meta?.paperTitle || 'the research paper';
  const paperCtx = meta?.paperDescription ? `\n\n*Paper context:* ${meta.paperDescription}` : '';

  const prompt = [
    `## ${name}`,
    `*From ${paper}*`,
    '',
    desc,
    '',
    '### Your task',
    `Implement **${name}** using **NumPy** only. Match the function signature in the starter code and return arrays with the shapes implied by the tests.`,
    '',
    '### Notes',
    '- Prefer vectorized operations over Python loops on large dimensions.',
    '- Use `float32` or `float64` consistently.',
    '- Handle edge cases (empty sequences, single token, batch size 1).',
    paperCtx,
  ].join('\n');

  const examples = [
    `**Example workflow**`,
    `1. Create small random inputs with the shapes described in the starter docstring.`,
    `2. Call \`${slugToFn(slug).split('_')[0] || 'your_function'}\` and print \`.shape\`.`,
    `3. Compare against expected values from the unit tests in the editor.`,
    '',
    `**Tip:** ${desc}`,
  ].join('\n');

  return {
    slug,
    title: name,
    url: `${SITE}/problems/${slug}`,
    difficulty: existing.difficulty || inferDifficulty(slug),
    categories: meta?.paperTitle ? categories(paper, slug) : existing.categories?.length ? existing.categories : categories(paper, slug),
    prompt,
    examples,
    hints: [
      `Break "${name}" into 2–3 smaller pure functions and test each.`,
      `Refer to ${paper} for the original definition of this module.`,
      'Print tensor shapes after every operation while debugging.',
    ].join('\n'),
    requirements: 'NumPy only. No PyTorch, TensorFlow, or JAX. Vectorize where practical.',
    constraints: 'Time limit: 2s; Memory: 256MB',
    starterCode: pickStarter(slug, name),
    scraped: true,
  };
}

function loadTopicMetaFixed() {
  const papers = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/researchPapers.json'), 'utf8'));
  const map = {};
  for (const p of papers) {
    for (const t of p.topics || []) {
      if (t.problemId) {
        map[t.problemId] = {
          ...t,
          paperTitle: p.title,
          paperDescription: p.description,
          authors: p.authors,
        };
      }
    }
  }
  return map;
}

module.exports = {
  buildRichDetail,
  isThin,
  loadTopicMeta: loadTopicMetaFixed,
  pickStarter,
};
