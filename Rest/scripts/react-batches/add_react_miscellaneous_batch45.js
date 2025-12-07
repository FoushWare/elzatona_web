const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-280',
    title: 'What is the recommended ordering of methods in component class?',
    content: 'What is the recommended ordering of methods in component class?',
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
      '_Recommended_ ordering of methods from _mounting_ to _render stage_:',
    points: 15,
    options: [
      {
        id: 'o1',
        text: '_Recommended_ ordering of methods from _mounting_ to _render stage_:',
        isCorrect: true,
        explanation:
          '_Recommended_ ordering of methods from _mounting_ to _render stage_:',
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
    id: 'react-ref-281',
    title: 'Why we need to pass a function to setState()?',
    content: 'Why we need to pass a function to setState()?',
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
      "The reason behind for this is that <code>setState()</code> is an asynchronous operation. React batches state changes for performance reasons, so the state may not change immediately after <code>setState()</code> is called. That means you should not rely on the current state when calling <code>setState()</code> since you can't be sure what that state will be. The solution is to pass a function to <code>setState()</code>, with the previous state as an argument. By doing this you can avoid issues with the user getting the old state value on ...",
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The reason behind for this is that `setState()` is an asynchronous operation',
        isCorrect: true,
        explanation:
          "The reason behind for this is that `setState()` is an asynchronous operation. React batches state changes for performance reasons, so the state may not change immediately after `setState()` is called. That means you should not rely on the current state when calling `setState()` since you can't be sure what that state will be. The solution is to pass a function to `setState()`, with the previous state as an argument. By doing this you can avoid issues with the user getting the old state value on ...",
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
    id: 'react-ref-282',
    title:
      'Why is `isMounted()` an anti-pattern and what is the proper solution?',
    content:
      'Why is <code>isMounted()</code> an anti-pattern and what is the proper solution?',
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
      'The primary use case for <code>isMounted()</code> is to avoid calling <code>setState()</code> after a component has been unmounted, because it will emit a warning.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The primary use case for `isMounted()` is to avoid calling `setState()` after a component has been unmounted, because it will emit a warning.',
        isCorrect: true,
        explanation:
          'The primary use case for `isMounted()` is to avoid calling `setState()` after a component has been unmounted, because it will emit a warning.',
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
  `✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 45)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
