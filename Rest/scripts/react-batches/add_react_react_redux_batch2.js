const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-101',
    title:
      'What is the difference between `mapStateToProps()` and `mapDispatchToProps()`?',
    content:
      'What is the difference between <code>mapStateToProps()</code> and <code>mapDispatchToProps()</code>?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Redux',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-redux', 'intermediate'],
    explanation:
      '<code>mapStateToProps()</code> is a utility which helps your component get updated state (which is updated by some other components):',
    points: 15,
    options: [
      {
        id: 'o1',
        text: '`mapStateToProps()` is a utility which helps your component get updated state (which is updated by some other components):',
        isCorrect: true,
        explanation:
          '`mapStateToProps()` is a utility which helps your component get updated state (which is updated by some other components):',
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
    id: 'react-ref-102',
    title: 'Can I dispatch an action in reducer?',
    content: 'Can I dispatch an action in reducer?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Redux',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-redux', 'intermediate'],
    explanation:
      'Dispatching an action within a reducer is an **anti-pattern**. Your reducer should be _without side effects_, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Dispatching an action within a reducer is an anti-pattern',
        isCorrect: true,
        explanation:
          'Dispatching an action within a reducer is an **anti-pattern**. Your reducer should be _without side effects_, simply digesting the action payload and returning a new state object. Adding listeners and dispatching actions within the reducer can lead to chained actions and other side effects.',
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
    id: 'react-ref-103',
    title: 'How to access Redux store outside a component?',
    content: 'How to access Redux store outside a component?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Redux',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-redux', 'intermediate'],
    explanation:
      "You just need to export the store from the module where it created with <code>createStore()</code>. Also, it shouldn't pollute the global window object.",
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'You just need to export the store from the module where it created with `createStore()`',
        isCorrect: true,
        explanation:
          "You just need to export the store from the module where it created with `createStore()`. Also, it shouldn't pollute the global window object.",
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
  `✅ Added ${newQuestions.length} questions for React Redux (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
