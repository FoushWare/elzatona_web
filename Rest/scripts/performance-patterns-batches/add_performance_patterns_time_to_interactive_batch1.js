const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-bundle-splitting-pp6',
    title:
      'Which of the following statements best describes Time To Interactive (TTI)?',
    content:
      'Select the correct definition for TTI in the context of performance patterns.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Time To Interactive',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.164Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'time-to-interactive',
      'beginner',
      'intermediate',
    ],
    explanation:
      'TTI measures how long it takes for the page to become fully interactive, which bundle splitting helps improve by reducing load and execution time.',
    points: 10,
    options: [
      {
        id: 'c1',
        text: 'The time it takes for all content to be painted and interactive after the bundle loads',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c2',
        text: "The time between a user's first input and a response",
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c3',
        text: 'The time it takes to fetch the HTML document from the server',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c4',
        text: 'The total JavaScript execution time',
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
  `✅ Added ${newQuestions.length} questions for Time To Interactive (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
