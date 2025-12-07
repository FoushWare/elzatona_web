const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-277',
    title:
      'What is the purpose of `getDerivedStateFromProps()` lifecycle method?',
    content:
      'What is the purpose of <code>getDerivedStateFromProps()</code> lifecycle method?',
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
      'The new static <code>getDerivedStateFromProps()</code> lifecycle method is invoked after a component is instantiated as well as before it is re-rendered. It can return an object to update state, or <code>null</code> to indicate that the new props do not require any state updates.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The new static `getDerivedStateFromProps()` lifecycle method is invoked after a component is instantiated as well as before it is re-rendered',
        isCorrect: true,
        explanation:
          'The new static `getDerivedStateFromProps()` lifecycle method is invoked after a component is instantiated as well as before it is re-rendered. It can return an object to update state, or `null` to indicate that the new props do not require any state updates.',
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
    id: 'react-ref-278',
    title:
      'What is the purpose of `getSnapshotBeforeUpdate()` lifecycle method?',
    content:
      'What is the purpose of <code>getSnapshotBeforeUpdate()</code> lifecycle method?',
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
      'The new <code>getSnapshotBeforeUpdate()</code> lifecycle method is called right before DOM updates. The return value from this method will be passed as the third parameter to <code>componentDidUpdate()</code>.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The new `getSnapshotBeforeUpdate()` lifecycle method is called right before DOM updates',
        isCorrect: true,
        explanation:
          'The new `getSnapshotBeforeUpdate()` lifecycle method is called right before DOM updates. The return value from this method will be passed as the third parameter to `componentDidUpdate()`.',
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
    id: 'react-ref-279',
    title: 'What is the recommended way for naming components?',
    content: 'What is the recommended way for naming components?',
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
      'It is recommended to name the component by reference instead of using <code>displayName</code>.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'It is recommended to name the component by reference instead of using `displayName`.',
        isCorrect: true,
        explanation:
          'It is recommended to name the component by reference instead of using `displayName`.',
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
  `✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 44)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
