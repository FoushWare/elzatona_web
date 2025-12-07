const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-1',
    title: 'What is React?',
    content: 'What is React?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.699Z',
    updatedAt: '2025-11-11T19:25:10.700Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'core-react', 'intermediate'],
    explanation:
      "React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It's used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.",
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'React (aka React.js or ReactJS) is an open-source front-end JavaScript library for building user interfaces based on components',
        isCorrect: true,
        explanation:
          "React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces based on components. It's used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.",
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
    id: 'react-ref-2',
    title: 'What are the major features of React?',
    content: 'What are the major features of React?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.700Z',
    updatedAt: '2025-11-11T19:25:10.700Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'core-react', 'intermediate'],
    explanation:
      'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:',
        isCorrect: true,
        explanation:
          'React offers a powerful set of features that have made it one of the most popular JavaScript libraries for building user interfaces:',
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
    id: 'react-ref-3',
    title: 'What is JSX?',
    content: 'What is JSX?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.700Z',
    updatedAt: '2025-11-11T19:25:10.700Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'core-react', 'intermediate'],
    explanation:
      '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the <code>React.createElement(type, props, ...children)</code> function, giving us expressiveness of JavaScript along with HTML like template syntax.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript',
        isCorrect: true,
        explanation:
          '_JSX_ stands for _JavaScript XML_ and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the `React.createElement(type, props, ...children)` function, giving us expressiveness of JavaScript along with HTML like template syntax.',
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
  `✅ Added ${newQuestions.length} questions for Core React (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
