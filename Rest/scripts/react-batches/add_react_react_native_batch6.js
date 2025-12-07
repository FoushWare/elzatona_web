const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ref-146',
    title: 'Give an example of Styled Components?',
    content: 'Give an example of Styled Components?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Native',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.702Z',
    updatedAt: '2025-11-11T19:25:10.702Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-native', 'intermediate'],
    explanation:
      'Lets create <code>&lt;Title&gt;</code> and <code>&lt;Wrapper&gt;</code> components with specific styles for each.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Lets create `<Title>` and `<Wrapper>` components with specific styles for each.',
        isCorrect: true,
        explanation:
          'Lets create `<Title>` and `<Wrapper>` components with specific styles for each.',
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
    id: 'react-ref-147',
    title: 'What is Relay?',
    content: 'What is Relay?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'React Native',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:25:10.702Z',
    updatedAt: '2025-11-11T19:25:10.702Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'react-native', 'intermediate'],
    explanation:
      'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
        isCorrect: true,
        explanation:
          'Relay is a JavaScript framework for providing a data layer and client-server communication to web applications using the React view layer.',
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
  `✅ Added ${newQuestions.length} questions for React Native (Batch 6)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
