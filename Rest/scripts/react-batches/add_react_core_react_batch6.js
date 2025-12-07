const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-16',
    title: 'How Virtual DOM works?',
    content: 'How Virtual DOM works?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'core-react', 'intermediate'],
    explanation: 'The _Virtual DOM_ works in five simple steps.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The _Virtual DOM_ works in five simple steps.',
        isCorrect: true,
        explanation: 'The _Virtual DOM_ works in five simple steps.',
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
    id: 'react-ref-17',
    title: 'What is the difference between Shadow DOM and Virtual DOM?',
    content: 'What is the difference between Shadow DOM and Virtual DOM?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'core-react', 'intermediate'],
    explanation:
      'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_. The _Virtual DOM_ is a concept implemented by libraries in JavaScript on top of browser APIs.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_',
        isCorrect: true,
        explanation:
          'The _Shadow DOM_ is a browser technology designed primarily for scoping variables and CSS in _web components_. The _Virtual DOM_ is a concept implemented by libraries in JavaScript on top of browser APIs.',
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
    id: 'react-ref-18',
    title: 'What is React Fiber?',
    content: 'What is React Fiber?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'core-react', 'intermediate'],
    explanation:
      '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It’s a complete rewrite of React’s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React’s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'React Fiber is the new reconciliation engine in React, introduced in React 16',
        isCorrect: true,
        explanation:
          '**React Fiber** is the **new reconciliation engine** in React, introduced in React 16. It’s a complete rewrite of React’s core algorithm(old stack-based algorithm) for rendering and updating the UI. Fiber enhances React’s ability to handle **asynchronous rendering**, **prioritized updates**(assign priority to different types of updates), and **interruption**(ability to pause, abort, or reuse work) of rendering work, enabling smoother and more responsive user interfaces.',
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
  `✅ Added ${newQuestions.length} questions for Core React (Batch 6)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
