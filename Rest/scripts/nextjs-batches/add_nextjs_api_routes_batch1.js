const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next1-20-nextjs-q9',
    title: 'What are API routes in Next.js?',
    content:
      'API routes allow you to create serverless API endpoints inside the <code>pages/api</code> directory (Pages Router) or <code>app/api</code> (App Router).',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'API Routes',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.797Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'api-routes', 'intermediate'],
    explanation:
      'Each file becomes an API endpoint, enabling full-stack apps without a separate backend.',
    points: 6,
    options: [
      {
        id: 'a',
        text: 'Serverless functions in pages/api or app/api that handle HTTP requests',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Only for client-side logic',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Require Express.js',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Not supported in Next.js',
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
  `✅ Added ${newQuestions.length} questions for API Routes (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
