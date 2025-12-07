const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ft-22',
    title: 'How should you test a frontend task component?',
    content:
      'You need to test a ProductCard component. What testing approach is best?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Testing',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'react-testing', 'intermediate'],
    explanation:
      'React Testing Library tests components from user perspective. Test what users see and interact with, not internal implementation.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use React Testing Library to test user interactions and rendered output, not implementation details',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Test only internal state',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Test component implementation details',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'No testing needed for frontend tasks',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
    metadata: {},
  },
  {
    id: 'react-ft-23',
    title: 'How do you test async operations in a frontend task?',
    content:
      'Your component fetches data from an API. How should you test this?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Testing',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'react-testing', 'intermediate'],
    explanation:
      'Mock fetch/API calls, use waitFor for async updates, test loading and error states, verify final rendered output.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Mock the API call, use waitFor to wait for async updates, and assert on final rendered state',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Make real API calls in tests',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Skip testing async operations',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use only setTimeout in tests',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
    metadata: {},
  },
  {
    id: 'react-ft-24',
    title: 'What should you test in a frontend task form component?',
    content: 'You have a registration form. What aspects should be tested?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Testing',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'react-testing', 'intermediate'],
    explanation:
      'Test user interactions, validation (errors shown correctly), form submission, state updates, and integration with parent components.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Test user interactions (typing, submitting), validation errors, successful submission, and form state changes',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Test only CSS styles',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Test internal state only',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: "Forms don't need testing",
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
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
  `✅ Added ${newQuestions.length} frontend task questions (Batch 8)`
);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
