const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-286',
    title:
      'What is the difference between `setState()` and `replaceState()` methods?',
    content:
      'What is the difference between <code>setState()</code> and <code>replaceState()</code> methods?',
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
      'When you use <code>setState()</code> the current and previous states are merged. <code>replaceState()</code> throws out the current state, and replaces it with only what you provide. Usually <code>setState()</code> is used unless you really need to remove all previous keys for some reason. You can also set state to <code>false</code>/<code>null</code> in <code>setState()</code> instead of using <code>replaceState()</code>.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'When you use `setState()` the current and previous states are merged',
        isCorrect: true,
        explanation:
          'When you use `setState()` the current and previous states are merged. `replaceState()` throws out the current state, and replaces it with only what you provide. Usually `setState()` is used unless you really need to remove all previous keys for some reason. You can also set state to `false`/`null` in `setState()` instead of using `replaceState()`.',
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
    id: 'react-ref-287',
    title: 'How to listen to state changes?',
    content: 'How to listen to state changes?',
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
      'The <code>componentDidUpdate</code> lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The `componentDidUpdate` lifecycle method will be called when state changes',
        isCorrect: true,
        explanation:
          'The `componentDidUpdate` lifecycle method will be called when state changes. You can compare provided state and props values with current state and props to determine if something meaningful changed.',
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
    id: 'react-ref-288',
    title:
      'What is the recommended approach of removing an array element in React state?',
    content:
      'What is the recommended approach of removing an array element in React state?',
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
      'The better approach is to use <code>Array.prototype.filter()</code> method.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The better approach is to use `Array.prototype.filter()` method.',
        isCorrect: true,
        explanation:
          'The better approach is to use `Array.prototype.filter()` method.',
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
  `✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 47)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
