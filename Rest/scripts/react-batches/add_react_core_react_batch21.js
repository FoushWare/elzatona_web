const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-61',
    title: 'How to re-render the view when the browser is resized?',
    content: 'How to re-render the view when the browser is resized?',
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
      'You can use the <code>useState</code> hook to manage the width and height state variables, and the <code>useEffect</code> hook to add and remove the <code>resize</code> event listener. The <code>[]</code> dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener',
        isCorrect: true,
        explanation:
          'You can use the `useState` hook to manage the width and height state variables, and the `useEffect` hook to add and remove the `resize` event listener. The `[]` dependency array passed to useEffect ensures that the effect only runs once (on mount) and not on every re-render.',
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
    id: 'react-ref-62',
    title: 'How to pretty print JSON with React?',
    content: 'How to pretty print JSON with React?',
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
      'We can use `<pre>` tag so that the formatting of the <code>JSON.stringify()</code> is retained:',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:',
        isCorrect: true,
        explanation:
          'We can use `<pre>` tag so that the formatting of the `JSON.stringify()` is retained:',
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
    id: 'react-ref-63',
    title: "Why can't you update props in React?",
    content: "Why can't you update props in React?",
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
      "The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can't modify received props.",
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The React philosophy is that props should be _immutable_(read only) and _top-down_',
        isCorrect: true,
        explanation:
          "The React philosophy is that props should be _immutable_(read only) and _top-down_. This means that a parent can send any prop values to a child, but the child can't modify received props.",
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
  `✅ Added ${newQuestions.length} questions for Core React (Batch 21)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
