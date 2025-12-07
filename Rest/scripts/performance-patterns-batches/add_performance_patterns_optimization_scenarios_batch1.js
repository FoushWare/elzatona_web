const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-prefetch-6',
    title: 'When to Prefetch',
    content:
      'Which is a good scenario to use prefetching in a web application?',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Optimization Scenarios',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.241Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'optimization-scenarios',
      null,
      'intermediate',
    ],
    explanation:
      'Prefetching should be used for predictable user paths to balance performance and bandwidth usage.',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'For pages or components the user is likely to visit soon',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'For every resource in the application',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Only for images in the viewport',
        isCorrect: false,
        explanation: '',
      },
    ],
    sampleAnswers: [
      'Prefetch resources users are likely to access next to improve perceived speed.',
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
  `✅ Added ${newQuestions.length} questions for Optimization Scenarios (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
