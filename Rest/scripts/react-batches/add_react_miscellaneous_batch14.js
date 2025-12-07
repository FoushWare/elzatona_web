const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-187',
    title: 'What is dynamic import?',
    content: 'What is dynamic import?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.702Z',
    updatedAt: '2025-11-11T19:25:10.702Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation:
      'You can achieve code-splitting in your app using dynamic import.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'You can achieve code-splitting in your app using dynamic import.',
        isCorrect: true,
        explanation:
          'You can achieve code-splitting in your app using dynamic import.',
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
    id: 'react-ref-188',
    title: 'What are loadable components?',
    content: 'What are loadable components?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.702Z',
    updatedAt: '2025-11-11T19:25:10.702Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation:
      'With the release of React 18, React.lazy and Suspense are now available for server-side rendering. However, prior to React 18, it was recommended to use Loadable Components for code-splitting in a server-side rendered app because React.lazy and Suspense were not available for server-side rendering. Loadable Components lets you render a dynamic import as a regular component. For example, you can use Loadable Components to load the OtherComponent in a separate bundle like this:',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'With the release of React 18, React.lazy and Suspense are now available for server-side rendering',
        isCorrect: true,
        explanation:
          'With the release of React 18, React.lazy and Suspense are now available for server-side rendering. However, prior to React 18, it was recommended to use Loadable Components for code-splitting in a server-side rendered app because React.lazy and Suspense were not available for server-side rendering. Loadable Components lets you render a dynamic import as a regular component. For example, you can use Loadable Components to load the OtherComponent in a separate bundle like this:',
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
    id: 'react-ref-189',
    title: 'What is suspense component?',
    content: 'What is suspense component?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Miscellaneous',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.702Z',
    updatedAt: '2025-11-11T19:25:10.702Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'miscellaneous', 'intermediate'],
    explanation:
      'React Suspense is a built-in feature that lets you defer rendering part of your component tree until some condition(asynchronous operation) is met—usually, data or code has finished loading. While waiting, Suspense lets you display a fallback UI like a spinner or placeholder.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'React Suspense is a built-in feature that lets you defer rendering part of your component tree until some condition(asynchronous operation) is met—usu...',
        isCorrect: true,
        explanation:
          'React Suspense is a built-in feature that lets you defer rendering part of your component tree until some condition(asynchronous operation) is met—usually, data or code has finished loading. While waiting, Suspense lets you display a fallback UI like a spinner or placeholder.',
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
  `✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 14)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
