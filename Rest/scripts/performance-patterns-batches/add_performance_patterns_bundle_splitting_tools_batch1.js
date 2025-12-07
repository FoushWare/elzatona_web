const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-performance-1-pp11',
    title:
      'Which tools or techniques can help automate Bundle Splitting in modern web projects?',
    content:
      'Select the correct tools or features that support automatic bundle splitting.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Bundle Splitting Tools',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.225Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'bundle-splitting-tools', 'advanced'],
    explanation:
      'Tools like Webpack’s SplitChunksPlugin, Rollup, and modern bundlers like Vite handle automatic code-splitting and lazy loading integration.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: "Webpack's `SplitChunksPlugin`",
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Vite’s pre-bundling mechanism (esbuild)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'React.lazy() + Suspense',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'HTML inline scripts',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
];

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

// Add new questions
existingQuestions.push(...newQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(
  `✅ Added ${newQuestions.length} questions for Bundle Splitting Tools (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
