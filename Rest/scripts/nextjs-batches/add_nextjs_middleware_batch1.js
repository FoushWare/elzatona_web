const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next-21-40-nextjs-q34',
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
    updatedAt: '2025-11-11T18:48:30.794Z',
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
  {
    id: 'next-61-80-nextjs-q77',
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
    updatedAt: '2025-11-11T18:48:30.796Z',
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
  {
    id: 'next1-20-nextjs-q12',
    title: 'What is middleware in Next.js?',
    content:
      'Middleware runs before a request is completed and can modify the request/response, rewrite URLs, or add headers.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Middleware',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.797Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'middleware', 'intermediate'],
    explanation:
      'It’s ideal for authentication, A/B testing, i18n, and bot protection.',
    points: 7,
    options: [
      {
        id: 'a',
        text: 'Runs before request completion; can rewrite, redirect, or modify headers',
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
        text: 'Replaces API routes',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Not supported in App Router',
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
  `✅ Added ${newQuestions.length} questions for Middleware (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
