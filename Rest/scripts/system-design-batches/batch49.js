const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q152',
    title: 'What is the test pyramid and why should you follow it?',
    content:
      'Explain the test pyramid concept and how it guides test investment for frontend applications.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-08T11:01:00Z',
    updatedAt: '2025-10-08T11:01:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'The test pyramid recommends many fast unit tests at the bottom, fewer integration tests in the middle, and even fewer E2E tests at the top. This balances speed, reliability, and coverage.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'The test pyramid recommends many fast unit tests at the bottom, fewer integration tests in the middle, and even fewer E2E tests at the top. This balances speed, reliability, and coverage.',
        isCorrect: true,
        explanation:
          'The test pyramid recommends many fast unit tests at the bottom, fewer integration tests in the middle, and even fewer E2E tests at the top. This balances speed, reliability, and coverage.',
      },
      {
        id: 'o2',
        text: 'The test pyramid recommends many fast unit tests at the bottom, fewer integration tests in the middle, and even fewer E2E tests at the top',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' This balances speed, reliability, and coverage',
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
    id: 'system-design-q153',
    title: 'How do you test React components effectively?',
    content:
      'Describe practices and tools for testing React components (rendering, interactions, state, async behavior, accessibility).',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-08T11:02:00Z',
    updatedAt: '2025-10-08T11:02:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Use React Testing Library + Jest to test rendered output and user interactions, mock network calls, test accessibility using axe, avoid implementation-detail assertions, and use snapshots sparingly.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use React Testing Library + Jest to test rendered output and user interactions, mock network calls, test accessibility using axe, avoid implementation-detail assertions, and use snapshots sparingly.',
        isCorrect: true,
        explanation:
          'Use React Testing Library + Jest to test rendered output and user interactions, mock network calls, test accessibility using axe, avoid implementation-detail assertions, and use snapshots sparingly.',
      },
      {
        id: 'o2',
        text: 'Use React Testing Library + Jest to test rendered output and user interactions, mock network calls, test accessibility using axe, avoid implementation-detail assertions, and use snapshots sparingly',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This method prioritizes user experience and maintainability.',
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
    id: 'system-design-q154',
    title:
      'Which tools are commonly used for E2E testing in modern frontend apps?',
    content:
      'Select the commonly used E2E testing tools and one key advantage of each (Cypress, Playwright, Selenium).',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-08T11:03:00Z',
    updatedAt: '2025-10-08T11:03:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'beginner'],
    explanation:
      'Cypress and Playwright are popular for modern apps; Selenium is older and broad but more complex.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Cypress: developer-friendly, great debugging UX',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Playwright: cross-browser automation and parallelism',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Selenium: mature but heavier and more complex to manage',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'None of the above are used for E2E',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 49)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
