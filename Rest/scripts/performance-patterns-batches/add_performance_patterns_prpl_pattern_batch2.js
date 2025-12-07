const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-prpl-pp4',
    title:
      'Which of the following technologies does the PRPL pattern often rely on?',
    content:
      'Select all the technologies that typically support PRPL pattern implementation.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'PRPL Pattern',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.257Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'prpl-pattern', 'intermediate'],
    explanation:
      'PRPL commonly uses HTTP/2 server push, service workers for caching, and an app shell for faster rendering.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'HTTP/2 Server Push',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Service Workers',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'App Shell Architecture',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'jQuery AJAX for resource loading',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'performance-patterns-prpl-pp5',
    title: 'Why is code-splitting important in the PRPL pattern?',
    content:
      "### Code-Splitting in PRPL\nCode-splitting divides the application into smaller, cachable chunks. This helps browsers load only what's necessary for the current route, improving performance and reducing cache bloat.",
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'PRPL Pattern',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.257Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'prpl-pattern', 'intermediate'],
    explanation:
      'It ensures only the necessary parts of the app are loaded, improving performance and caching efficiency.',
    points: 10,
    sampleAnswers: [
      'It ensures only the necessary parts of the app are loaded, improving performance and caching efficiency.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It ensures only the necessary parts of the app are loaded, improving performance and caching efficiency.',
        isCorrect: true,
        explanation:
          'It ensures only the necessary parts of the app are loaded, improving performance and caching efficiency.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review performance optimization concepts.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer is different.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o5',
        text: 'Not quite. Consider web performance best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
  },
  {
    id: 'performance-patterns-prpl-pp6',
    title: 'Which step in PRPL involves caching frequently visited routes?',
    content:
      'Identify which phase of the PRPL process focuses on pre-caching routes for better offline performance.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'PRPL Pattern',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.257Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'prpl-pattern', 'beginner', 'intermediate'],
    explanation:
      'Pre-caching ensures frequently visited routes and assets are stored for quick access and offline use.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Push',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Render',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Pre-cache',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Lazy-load',
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
  `✅ Added ${newQuestions.length} questions for PRPL Pattern (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
