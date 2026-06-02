const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { loadTopicMeta } = require('./problem_detail_generator');

const DATA = path.join(__dirname, '../src/data');
const topicMeta = loadTopicMeta();
const papers = JSON.parse(fs.readFileSync(path.join(DATA, 'researchPapers.json'), 'utf8'));

const paperCats = {
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
};

let details = JSON.parse(fs.readFileSync(path.join(DATA, 'problemDetails.api.json'), 'utf8'));
let n = 0;
for (const d of details) {
  const meta = topicMeta[d.slug];
  if (!meta) continue;
  const cats = paperCats[meta.paperTitle];
  if (cats) {
    d.categories = cats;
    n += 1;
  }
}
fs.writeFileSync(path.join(DATA, 'problemDetails.api.json'), JSON.stringify(details, null, 2));
execSync('node merge_api_data.js', { cwd: __dirname, stdio: 'inherit' });
console.log('Updated categories on', n, 'research problems');
