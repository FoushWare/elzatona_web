const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ft-7',
    title:
      'What is the best way to handle loading states in a frontend task with multiple API calls?',
    content:
      'Your dashboard needs to fetch users, posts, and comments. How do you manage loading states?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'Use separate loading states for each data fetch to show partial content as it loads. Libraries like React Query handle this automatically.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use separate loading states for each data fetch, or use React Query/SWR for automatic loading state management',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Show a single loading spinner for the entire page',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: "Don't show loading states - just render empty data",
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use setTimeout to simulate loading',
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
    id: 'react-ft-8',
    title:
      'How should you handle data fetching in a frontend task with pagination?',
    content:
      'You need to implement infinite scroll for a product list. What approach is best?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'Use Intersection Observer to detect scroll position. Fetch next page when user nears bottom, append to existing data for seamless infinite scroll.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use Intersection Observer API to detect when user scrolls near bottom, then fetch next page and append to existing data',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Fetch all data at once and paginate client-side',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Reload entire page for each page change',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use only localStorage for pagination',
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
    id: 'react-ft-9',
    title:
      'What is the best way to handle error states in API calls for a frontend task?',
    content:
      'Your app makes multiple API calls. How should you handle and display errors?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'Catch errors, set error state, display user-friendly messages, and provide retry mechanisms. Use Error Boundaries for component tree errors.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use try-catch blocks, set error state, and display user-friendly error messages with retry options',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Let errors crash the app',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Hide all errors from users',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Only log errors to console',
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
  `✅ Added ${newQuestions.length} frontend task questions (Batch 3)`
);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
