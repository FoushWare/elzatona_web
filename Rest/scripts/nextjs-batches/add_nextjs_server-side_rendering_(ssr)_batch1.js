const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next1-20-nextjs-q7',
    title: 'What is getServerSideProps in Next.js?',
    content:
      '<code>getServerSideProps</code> fetches data on every request for server-side rendering (SSR).',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Server-Side Rendering (SSR)',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.797Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'server-side-rendering-(ssr)', 'intermediate'],
    explanation:
      'It runs on the server for every request, making it suitable for frequently changing or user-specific data.',
    points: 7,
    sampleAnswers: [
      '`getServerSideProps` renders pages on the server per request—ideal for dashboards, real-time data, or authenticated views.',
      'Like `getStaticProps`, it’s only available in the Pages Router (`pages/` directory).',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: '`getServerSideProps` renders pages on the server per request—ideal for dashboards, real-time data, or authenticated views.',
        isCorrect: true,
        explanation:
          'It runs on the server for every request, making it suitable for frequently changing or user-specific data.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review Next.js documentation and concepts.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer is different.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o5',
        text: 'Not quite. Consider Next.js best practices and architecture.',
        isCorrect: false,
        explanation: '',
      },
    ],
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
  `✅ Added ${newQuestions.length} questions for Server-Side Rendering (SSR) (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
