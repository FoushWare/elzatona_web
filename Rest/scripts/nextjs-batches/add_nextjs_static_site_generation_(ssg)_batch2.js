const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next41-60-nextjs-q50',
    title:
      'What is the difference between `generateStaticParams` and `getStaticPaths`?',
    content:
      '<code>generateStaticParams</code> is used in App Router for dynamic routes with SSG. <code>getStaticPaths</code> is the Pages Router equivalent.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Static Site Generation (SSG)',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.798Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'static-site-generation-(ssg)', 'intermediate'],
    explanation:
      'Both define which dynamic routes to pre-render at build time.',
    points: 7,
    options: [
      {
        id: 'a',
        text: '`generateStaticParams`: App Router; `getStaticPaths`: Pages Router',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'They are the same function',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: '`getStaticPaths` works in App Router',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: '`generateStaticParams` is for SSR',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
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
  `✅ Added ${newQuestions.length} questions for Static Site Generation (SSG) (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
