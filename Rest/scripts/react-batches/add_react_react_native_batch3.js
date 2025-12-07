const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-137',
    title: 'What is the difference between Flow and PropTypes?',
    content: 'What is the difference between Flow and PropTypes?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Native',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.702Z',
    updatedAt: '2025-11-11T19:25:10.702Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-native', 'intermediate'],
    explanation:
      'Flow is a _static analysis tool_ (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and catch an entire class of bugs at compile time.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Flow is a _static analysis tool_ (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and ...',
        isCorrect: true,
        explanation:
          'Flow is a _static analysis tool_ (static checker) which uses a superset of the language, allowing you to add type annotations to all of your code and catch an entire class of bugs at compile time.',
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
    id: 'react-ref-138',
    title: 'How to use Font Awesome icons in React?',
    content: 'How to use Font Awesome icons in React?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Native',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.702Z',
    updatedAt: '2025-11-11T19:25:10.702Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-native', 'intermediate'],
    explanation: 'The below steps followed to include Font Awesome in React:',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The below steps followed to include Font Awesome in React:',
        isCorrect: true,
        explanation:
          'The below steps followed to include Font Awesome in React:',
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
    id: 'react-ref-139',
    title: 'What is React Dev Tools?',
    content: 'What is React Dev Tools?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Native',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.702Z',
    updatedAt: '2025-11-11T19:25:10.702Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-native', 'intermediate'],
    explanation:
      '_React Developer Tools_ let you inspect the component hierarchy, including component props and state. It exists both as a browser extension (for Chrome and Firefox), and as a standalone app (works with other environments including Safari, IE, and React Native).',
    points: 15,
    options: [
      {
        id: 'o1',
        text: '_React Developer Tools_ let you inspect the component hierarchy, including component props and state',
        isCorrect: true,
        explanation:
          '_React Developer Tools_ let you inspect the component hierarchy, including component props and state. It exists both as a browser extension (for Chrome and Firefox), and as a standalone app (works with other environments including Safari, IE, and React Native).',
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
  `✅ Added ${newQuestions.length} questions for React Native (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
