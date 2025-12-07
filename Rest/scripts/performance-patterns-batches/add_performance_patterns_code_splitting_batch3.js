const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-performance-1-pp8',
    title: 'Which of the following statements about Dynamic Import are true?',
    content:
      'Select all correct statements related to dynamic imports and bundle splitting.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Code Splitting',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.225Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'dynamic-import', 'intermediate'],
    explanation:
      'Dynamic imports are asynchronous and allow bundlers like Webpack to split code into separate chunks that load only when needed, improving perceived performance.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Dynamic imports return a Promise that resolves to the requested module.',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Dynamic imports always block the initial page render.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Webpack automatically creates separate chunks for dynamically imported modules.',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Dynamic imports are part of the ES2020 specification.',
        isCorrect: true,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'performance-patterns-performance-1-pp12',
    title: 'What are potential drawbacks of overusing Bundle Splitting?',
    content:
      '### Trade-offs\nWhile bundle splitting improves load times, over-splitting can lead to performance issues.\n\n**Possible issues include:**\n- Too many network requests\n- Increased HTTP overhead\n- Caching complexity\n\n**Question:** What are the main drawbacks developers should consider before aggressively splitting bundles?',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Code Splitting',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.225Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'bundle-splitting', 'advanced'],
    explanation:
      'Excessive splitting can cause too many small network requests, increase latency, and make caching more complex.',
    points: 10,
    sampleAnswers: [
      'Excessive splitting can cause too many small network requests, increase latency, and make caching more complex.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Excessive splitting can cause too many small network requests, increase latency, and make caching more complex.',
        isCorrect: true,
        explanation:
          'Excessive splitting can cause too many small network requests, increase latency, and make caching more complex.',
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
  `✅ Added ${newQuestions.length} questions for Code Splitting (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
