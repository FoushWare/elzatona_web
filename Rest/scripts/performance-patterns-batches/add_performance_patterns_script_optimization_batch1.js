const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-pre-load-6',
    title: 'Preload + Async Hack',
    content:
      "What is the goal of combining <code>&lt;link rel='preload'&gt;</code> with <code>&lt;script async&gt;</code>?",
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Script Optimization',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.240Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'script-optimization', 'advanced'],
    explanation:
      'This technique downloads the script as a high-priority resource but doesn’t block parsing while it loads.',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'To load a script early without blocking the HTML parser',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'To execute the script synchronously',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'To delay the script until the user interacts',
        isCorrect: false,
        explanation: '',
      },
    ],
    sampleAnswers: [
      'It lets browsers fetch scripts early without blocking page rendering.',
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
  `✅ Added ${newQuestions.length} questions for Script Optimization (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
