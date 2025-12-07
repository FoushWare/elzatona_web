const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-89',
    title: 'How to use `<FormattedMessage>` as placeholder using React Intl?',
    content:
      'How to use <code>&lt;FormattedMessage&gt;</code> as placeholder using React Intl?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Internationalization',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-internationalization', 'intermediate'],
    explanation:
      "The <code>&lt;Formatted... /&gt;</code> components from <code>react-intl</code> return elements, not plain text, so they can't be used for placeholders, alt text, etc. In that case, you should use lower level API <code>formatMessage()</code>. You can inject the <code>intl</code> object into your component using <code>injectIntl()</code> higher-order component and then format the message using <code>formatMessage()</code> available on that object.",
    points: 15,
    options: [
      {
        id: 'o1',
        text: "/>` components from `react-intl` return elements, not plain text, so they can't be used for placeholders, alt text, etc",
        isCorrect: true,
        explanation:
          "The `<Formatted... />` components from `react-intl` return elements, not plain text, so they can't be used for placeholders, alt text, etc. In that case, you should use lower level API `formatMessage()`. You can inject the `intl` object into your component using `injectIntl()` higher-order component and then format the message using `formatMessage()` available on that object.",
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
    id: 'react-ref-90',
    title: 'How to access current locale with React Intl?',
    content: 'How to access current locale with React Intl?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Internationalization',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-internationalization', 'intermediate'],
    explanation:
      'You can get the current locale in any component of your application using <code>injectIntl()</code>:',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'You can get the current locale in any component of your application using `injectIntl()`:',
        isCorrect: true,
        explanation:
          'You can get the current locale in any component of your application using `injectIntl()`:',
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
    id: 'react-ref-91',
    title: 'How to format date using React Intl?',
    content: 'How to format date using React Intl?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Internationalization',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.701Z',
    updatedAt: '2025-11-11T19:25:10.701Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-internationalization', 'intermediate'],
    explanation:
      'The <code>injectIntl()</code> higher-order component will give you access to the <code>formatDate()</code> method via the props in your component. The method is used internally by instances of <code>FormattedDate</code> and it returns the string representation of the formatted date.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'The `injectIntl()` higher-order component will give you access to the `formatDate()` method via the props in your component',
        isCorrect: true,
        explanation:
          'The `injectIntl()` higher-order component will give you access to the `formatDate()` method via the props in your component. The method is used internally by instances of `FormattedDate` and it returns the string representation of the formatted date.',
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
  `✅ Added ${newQuestions.length} questions for React Internationalization (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
