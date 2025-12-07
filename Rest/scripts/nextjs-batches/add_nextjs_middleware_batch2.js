const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next41-60-nextjs-q57',
    title: 'How do you implement middleware in Next.js?',
    content:
      'Create a <code>middleware.js</code> file in the root or route segment. It runs before requests and can rewrite, redirect, or add headers.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Middleware',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.798Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'middleware', 'intermediate'],
    explanation:
      'Middleware is ideal for authentication, A/B testing, i18n, and bot protection.',
    points: 7,
    sampleAnswers: [
      "```js\nexport { default } from 'next-auth/middleware';\nexport const config = { matcher: ['/dashboard/:path*'] };\n```",
      'Use `NextRequest` to inspect cookies, headers, or URL, then `NextResponse.rewrite()` or `redirect()` as needed.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: "```js\nexport { default } from 'next-auth/middleware';\nexport const config = { matcher: ['/dashboard/:path*'] };\n```",
        isCorrect: true,
        explanation:
          'Middleware is ideal for authentication, A/B testing, i18n, and bot protection.',
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
  `✅ Added ${newQuestions.length} questions for Middleware (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
