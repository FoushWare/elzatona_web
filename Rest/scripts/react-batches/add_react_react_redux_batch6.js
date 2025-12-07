const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-113',
    title: 'What is the purpose of the constants in Redux?',
    content: 'What is the purpose of the constants in Redux?',
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
      'Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE. It also prevents you from introducing silly bugs caused by typos – in which case, you will get a <code>ReferenceError</code> immediately.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE',
        isCorrect: true,
        explanation:
          'Constants allows you to easily find all usages of that specific functionality across the project when you use an IDE. It also prevents you from introducing silly bugs caused by typos – in which case, you will get a `ReferenceError` immediately.',
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
    id: 'react-ref-114',
    title: 'What are the different ways to write `mapDispatchToProps()`?',
    content:
      'What are the different ways to write <code>mapDispatchToProps()</code>?',
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
      'There are a few ways of binding _action creators_ to <code>dispatch()</code> in <code>mapDispatchToProps()</code>.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'There are a few ways of binding _action creators_ to `dispatch()` in `mapDispatchToProps()`.',
        isCorrect: true,
        explanation:
          'There are a few ways of binding _action creators_ to `dispatch()` in `mapDispatchToProps()`.',
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
    id: 'react-ref-115',
    title:
      'What is the use of the `ownProps` parameter in `mapStateToProps()` and `mapDispatchToProps()`?',
    content:
      'What is the use of the <code>ownProps</code> parameter in <code>mapStateToProps()</code> and <code>mapDispatchToProps()</code>?',
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
      'If the <code>ownProps</code> parameter is specified, React Redux will pass the props that were passed to the component into your _connect_ functions. So, if you use a connected component:',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'If the `ownProps` parameter is specified, React Redux will pass the props that were passed to the component into your _connect_ functions',
        isCorrect: true,
        explanation:
          'If the `ownProps` parameter is specified, React Redux will pass the props that were passed to the component into your _connect_ functions. So, if you use a connected component:',
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
  `✅ Added ${newQuestions.length} questions for React Redux (Batch 6)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
