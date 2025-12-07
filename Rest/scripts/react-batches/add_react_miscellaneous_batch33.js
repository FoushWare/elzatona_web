const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-244',
    title: 'Can you combine **useReducer** with **useContext**?',
    content: 'Can you combine **useReducer** with **useContext**?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.703Z',
    updatedAt: '2025-11-11T19:25:10.703Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation:
      "Yes, it's common to combine **useReducer** with **useContext** to build a lightweight state management system similar to Redux:",
    points: 15,
    options: [
      {
        id: 'o1',
        text: "Yes, it's common to combine useReducer with useContext to build a lightweight state management system similar to Redux:",
        isCorrect: true,
        explanation:
          "Yes, it's common to combine **useReducer** with **useContext** to build a lightweight state management system similar to Redux:",
      },
      {
        id: 'o2',
        text: 'This is incorrect. Please refer to React documentation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This is not accurate. Review React best practices.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer differs.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o5',
        text: "Not quite. Consider React's architecture and design principles.",
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Review React documentation and best practices',
      "Consider React's component architecture and patterns",
      "Think about React's rendering and state management",
    ],
    metadata: {},
  },
  {
    id: 'react-ref-245',
    title:
      'When and how often does React invoke the setup and cleanup functions inside a useEffect hook?',
    content:
      'When and how often does React invoke the setup and cleanup functions inside a useEffect hook?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.703Z',
    updatedAt: '2025-11-11T19:25:10.703Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation: '1. **Setup Function Execution (<code>useEffect</code>)**',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Setup Function Execution (`useEffect`)',
        isCorrect: true,
        explanation: '1. **Setup Function Execution (`useEffect`)**',
      },
      {
        id: 'o2',
        text: 'This is incorrect. Please refer to React documentation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This is not accurate. Review React best practices.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer differs.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o5',
        text: "Not quite. Consider React's architecture and design principles.",
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Review React documentation and best practices',
      "Consider React's component architecture and patterns",
      "Think about React's rendering and state management",
    ],
    metadata: {},
  },
  {
    id: 'react-ref-246',
    title: 'How does useLayoutEffect work during server-side rendering (SSR)?',
    content:
      'How does useLayoutEffect work during server-side rendering (SSR)?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.703Z',
    updatedAt: '2025-11-11T19:25:10.703Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation:
      'The <code>useLayoutEffect</code> hook does **not run on the server**, because there is no DOM. React issues a warning in server environments like Next.js if <code>useLayoutEffect</code> is used directly.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The `useLayoutEffect` hook does not run on the server, because there is no DOM',
        isCorrect: true,
        explanation:
          'The `useLayoutEffect` hook does **not run on the server**, because there is no DOM. React issues a warning in server environments like Next.js if `useLayoutEffect` is used directly.',
      },
      {
        id: 'o2',
        text: 'This is incorrect. Please refer to React documentation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This is not accurate. Review React best practices.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer differs.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o5',
        text: "Not quite. Consider React's architecture and design principles.",
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Review React documentation and best practices',
      "Consider React's component architecture and patterns",
      "Think about React's rendering and state management",
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
  `✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 33)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
