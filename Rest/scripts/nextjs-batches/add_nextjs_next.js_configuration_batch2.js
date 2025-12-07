const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next41-60-nextjs-q58',
    title: 'What is the purpose of `next.config.js`?',
    content:
      '<code>next.config.js</code> customizes Next.js build settings like Webpack, Babel, environment variables, and experimental features.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Next.js Configuration',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.798Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'next.js-configuration', 'intermediate'],
    explanation:
      'It’s optional but powerful for advanced customization without ejecting.',
    points: 6,
    options: [
      {
        id: 'a',
        text: 'Customize Webpack, Babel, env vars, and experimental features',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Required for every Next.js app',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Only for CSS configuration',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Replaces package.json',
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
  `✅ Added ${newQuestions.length} questions for Next.js Configuration (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
