const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-75',
    title: 'What is React Router?',
    content: 'What is React Router?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Router',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-router', 'intermediate'],
    explanation:
      "React Router is a powerful routing library built on top of React that helps you add new screens and flows to your application incredibly quickly, all while keeping the URL in sync with what's being displayed on the page.",
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'React Router is a powerful routing library built on top of React that helps you add new screens and flows to your application incredibly quickly, all ...',
        isCorrect: true,
        explanation:
          "React Router is a powerful routing library built on top of React that helps you add new screens and flows to your application incredibly quickly, all while keeping the URL in sync with what's being displayed on the page.",
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
    id: 'react-ref-76',
    title: 'How React Router is different from history library?',
    content: 'How React Router is different from history library?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Router',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-router', 'intermediate'],
    explanation:
      "React Router is a wrapper around the <code>history</code> library which handles interaction with the browser's <code>window.history</code> with its browser and hash histories. It also provides memory history which is useful for environments that don't have global history, such as mobile app development (React Native) and unit testing with Node.",
    points: 15,
    options: [
      {
        id: 'o1',
        text: "React Router is a wrapper around the `history` library which handles interaction with the browser's `window.history` with its browser and hash histori...",
        isCorrect: true,
        explanation:
          "React Router is a wrapper around the `history` library which handles interaction with the browser's `window.history` with its browser and hash histories. It also provides memory history which is useful for environments that don't have global history, such as mobile app development (React Native) and unit testing with Node.",
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
    id: 'react-ref-77',
    title: 'What are the `<Router>` components of React Router v6?',
    content:
      'What are the <code>&lt;Router&gt;</code> components of React Router v6?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Router',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-router', 'intermediate'],
    explanation:
      'React Router v6 provides below 4 <code>&lt;Router&gt;</code> components:',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'React Router v6 provides below 4 `<Router>` components:',
        isCorrect: true,
        explanation: 'React Router v6 provides below 4 `<Router>` components:',
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
  `✅ Added ${newQuestions.length} questions for React Router (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
