const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-67',
    title: 'How do you apply vendor prefixes to inline styles in React?',
    content: 'How do you apply vendor prefixes to inline styles in React?',
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
      'React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'React _does not_ apply _vendor prefixes_ automatically',
        isCorrect: true,
        explanation:
          'React _does not_ apply _vendor prefixes_ automatically. You need to add vendor prefixes manually.',
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
    id: 'react-ref-68',
    title: 'How to import and export components using React and ES6?',
    content: 'How to import and export components using React and ES6?',
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
    explanation: 'You should use default for exporting the components',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'You should use default for exporting the components',
        isCorrect: true,
        explanation: 'You should use default for exporting the components',
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
    id: 'react-ref-69',
    title: 'What are the exceptions on React component naming?',
    content: 'What are the exceptions on React component naming?',
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
      'The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The component names should start with an uppercase letter but there are few exceptions to this convention',
        isCorrect: true,
        explanation:
          'The component names should start with an uppercase letter but there are few exceptions to this convention. The lowercase tag names with a dot (property accessors) are still considered as valid component names.',
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
  `✅ Added ${newQuestions.length} questions for Core React (Batch 23)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
