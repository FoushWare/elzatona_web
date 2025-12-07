const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-298',
    title:
      'How to make AJAX call and in which component lifecycle methods should I make an AJAX call?',
    content:
      'How to make AJAX call and in which component lifecycle methods should I make an AJAX call?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.704Z',
    updatedAt: '2025-11-11T19:25:10.704Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation:
      'You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in <code>fetch</code>. You should fetch data in the <code>componentDidMount()</code> lifecycle method. This is so you can use <code>setState()</code> to update your component when the data is retrieved.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in `fetch`',
        isCorrect: true,
        explanation:
          'You can use AJAX libraries such as Axios, jQuery AJAX, and the browser built-in `fetch`. You should fetch data in the `componentDidMount()` lifecycle method. This is so you can use `setState()` to update your component when the data is retrieved.',
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
    id: 'react-ref-299',
    title: 'What are render props?',
    content: 'What are render props?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.704Z',
    updatedAt: '2025-11-11T19:25:10.704Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation:
      '**Render Props** is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Render Props is a simple technique for sharing code between components using a prop whose value is a function',
        isCorrect: true,
        explanation:
          '**Render Props** is a simple technique for sharing code between components using a prop whose value is a function. The below component uses render prop which returns a React element.',
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
    id: 'react-ref-300',
    title: 'How to dispatch an action on load?',
    content: 'How to dispatch an action on load?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.704Z',
    updatedAt: '2025-11-11T19:25:10.704Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation:
      'You can dispatch an action in <code>componentDidMount()</code> method and in <code>render()</code> method you can verify the data.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'You can dispatch an action in `componentDidMount()` method and in `render()` method you can verify the data.',
        isCorrect: true,
        explanation:
          'You can dispatch an action in `componentDidMount()` method and in `render()` method you can verify the data.',
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
  `✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 51)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
