const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q149',
    title: 'What are signed URLs and how do they enhance frontend security?',
    content: 'Describe signed URLs and their use cases in frontend apps.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Signed URLs provide temporary, secure access to protected resources like images or files. They include a signature and expiration time, preventing unauthorized access.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Signed URLs provide temporary, secure access to protected resources like images or files. They include a signature and expiration time, preventing unauthorized access.',
        isCorrect: true,
        explanation:
          'Signed URLs provide temporary, secure access to protected resources like images or files. They include a signature and expiration time, preventing unauthorized access.',
      },
      {
        id: 'o2',
        text: 'Signed URLs provide temporary, secure access to protected resources like images or files',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' They include a signature and expiration time, preventing unauthorized access',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q150',
    title: 'What is rate limiting and why is it important for frontend APIs?',
    content: 'Explain rate limiting and how it protects frontend apps.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Rate limiting restricts the number of API calls per user or IP within a time window. It prevents abuse, brute-force attacks, and protects backend resources.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Rate limiting restricts the number of API calls per user or IP within a time window. It prevents abuse, brute-force attacks, and protects backend resources.',
        isCorrect: true,
        explanation:
          'Rate limiting restricts the number of API calls per user or IP within a time window. It prevents abuse, brute-force attacks, and protects backend resources.',
      },
      {
        id: 'o2',
        text: 'Rate limiting restricts the number of API calls per user or IP within a time window',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' It prevents abuse, brute-force attacks, and protects backend resources',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q151',
    title: 'What are the main types of tests in frontend apps?',
    content:
      'Compare unit tests, integration tests, and end-to-end (E2E) tests: purpose, scope, and where they fit in the test pyramid.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-08T11:00:00Z',
    updatedAt: '2025-10-08T11:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'beginner'],
    explanation:
      'Unit tests verify small units in isolation; integration tests verify interactions between modules; E2E tests verify full flows in a real browser environment.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Unit tests: small, fast, isolated',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Integration tests: verify modules working together',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'E2E tests: full system flows in browser',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'E2E tests should replace unit tests',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 48)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
