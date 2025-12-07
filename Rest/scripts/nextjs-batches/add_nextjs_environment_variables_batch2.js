const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next41-60-nextjs-q42',
    title: 'How do you handle environment variables in Next.js?',
    content:
      'Prefix with <code>NEXT_PUBLIC_</code> to expose to the browser; others are server-only. Load from <code>.env.local</code>.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Environment Variables',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.798Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'environment-variables', 'intermediate'],
    explanation:
      'Non-prefixed variables are only available in Server Components and API routes—never exposed to client.',
    points: 6,
    sampleAnswers: [
      '`NEXT_PUBLIC_API_URL` is available in the browser; `DATABASE_URL` is only in server code—keeping secrets safe.',
      'Use `.env.local` for local development; Vercel lets you set env vars in the project dashboard.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: '`NEXT_PUBLIC_API_URL` is available in the browser; `DATABASE_URL` is only in server code—keeping secrets safe.',
        isCorrect: true,
        explanation:
          'Non-prefixed variables are only available in Server Components and API routes—never exposed to client.',
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
  `✅ Added ${newQuestions.length} questions for Environment Variables (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
