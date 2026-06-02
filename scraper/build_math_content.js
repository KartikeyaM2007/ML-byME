const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '../src/data');
const lessonsSrc = fs.readFileSync(path.join(DATA, 'mathLessons.ts'), 'utf8');
const lessons = JSON.parse(lessonsSrc.match(/export const mathLessons[\s\S]*?= (\[[\s\S]*?\]);/)[1]);

const AREA_INTRO = {
  Statistics: 'Statistics gives you tools to summarize data, quantify uncertainty, and decide whether observed differences are meaningful — essential for experimentation and model evaluation.',
  'Linear Algebra': 'Linear algebra is the language of neural networks: weights are matrices, activations are tensors, and most training operations are matrix multiplications and decompositions.',
  Calculus: 'Calculus explains how functions change. Gradients from multivariable calculus power optimization and backpropagation.',
  Probability: 'Probability models uncertainty in data and predictions. It underpins loss functions, generative models, and Bayesian methods.',
  Optimization: 'Optimization finds parameters that minimize loss. Every training loop is an optimization algorithm with learning rates and momentum.',
};

const SECTION_BODY = {
  Intuition: (title, area) =>
    `**${title}** builds intuition before formulas. In ${area}, focus on what the quantity *means* for a dataset or model, not just how to compute it.`,
  Formula: (title) =>
    `Key identities for **${title}** are shown below. Treat symbols consistently (vectors as column vectors unless noted).\n\nUse these as a checklist when implementing related NumPy problems.`,
  'Worked Example': (title) =>
    `Walk through a tiny numeric example for **${title}** by hand, then replicate it in NumPy with \`shape\` prints at each step.`,
  'ML Connection': (title, area) =>
    `**${title}** connects directly to ML practice in ${area}: evaluation metrics, feature transforms, training stability, or experiment analysis. Try a related problem in the Problems workspace after this lesson.`,
};

const content = {};

for (const lesson of lessons) {
  const areaIntro = AREA_INTRO[lesson.area] || `This lesson covers ${lesson.title} in the context of machine learning.`;
  const sections = {};
  for (const sec of lesson.sections) {
    const fn = SECTION_BODY[sec];
    sections[sec] =
      (fn ? fn(lesson.title, lesson.area) : `### ${sec}\n\nContent for **${lesson.title}** — ${sec}.`) +
      '\n\n' +
      (sec === 'Formula'
        ? `| Symbol | Meaning |\n|--------|--------|\n| \\(x\\) | Input or sample |\n| \\(\\theta\\) | Parameters |\n| \\(L\\) | Loss or objective |`
        : '');
  }
  content[lesson.path] = {
    title: lesson.title,
    area: lesson.area,
    intro: `${lesson.summary}\n\n${areaIntro}`,
    sections,
  };
}

const out = `export type MathLessonContent = {
  title: string;
  area: string;
  intro: string;
  sections: Record<string, string>;
};

export const mathLessonContent: Record<string, MathLessonContent> = ${JSON.stringify(content, null, 2)};
`;

fs.writeFileSync(path.join(DATA, 'mathLessonContent.ts'), out);
console.log('Built math content for', Object.keys(content).length, 'lessons');
