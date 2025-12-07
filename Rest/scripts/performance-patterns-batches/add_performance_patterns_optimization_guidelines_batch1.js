const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-pre-load-8',
    title: 'Best Practices for Using Preload',
    content:
      'Which of the following is a recommended best practice when using preload?',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Optimization Guidelines',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.240Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'optimization-guidelines',
      null,
      'intermediate',
    ],
    explanation:
      'Preload should only be used for critical resources and its performance impact should be measured carefully.',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Use preload sparingly and measure its impact in production',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Preload all JavaScript files to reduce bundle size',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Always preload images before any CSS files',
        isCorrect: false,
        explanation: '',
      },
    ],
    sampleAnswers: [
      'Use preload only for critical assets and monitor performance impact.',
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
  `✅ Added ${newQuestions.length} questions for Optimization Guidelines (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
