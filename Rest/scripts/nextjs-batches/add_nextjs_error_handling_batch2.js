const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next-61-80-nextjs-q72',
    title: 'What is the purpose of the `not-found.js` file?',
    content:
      '<code>not-found.js</code> defines a custom 404 page for a route segment when <code>notFound()</code> is thrown or a route doesn’t exist.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Error Handling',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.796Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'error-handling', 'intermediate'],
    explanation:
      'It’s the App Router equivalent of <code>pages/404.js</code> but scoped to route segments.',
    points: 6,
    sampleAnswers: [
      'Create `app/not-found.js` for a global 404, or `app/blog/not-found.js` for blog-specific 404s.',
      'Call `notFound()` from `next/navigation` in a Server Component to trigger it programmatically.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Create `app/not-found.js` for a global 404, or `app/blog/not-found.js` for blog-specific 404s.',
        isCorrect: true,
        explanation:
          'It’s the App Router equivalent of <code>pages/404.js</code> but scoped to route segments.',
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
    id: 'next41-60-nextjs-q48',
    title: 'What is the purpose of error.js in the App Router?',
    content:
      'The <code>error.js</code> file defines an error boundary for a route segment, catching errors in Server and Client Components and displaying a fallback UI.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Error Handling',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.798Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'error-handling', 'intermediate'],
    explanation:
      'It uses React error boundaries under the hood and can be reset with the <code>error.reset()</code> function.',
    points: 7,
    sampleAnswers: [
      '`error.js` exports a Client Component that receives `error` and `reset` props. It catches errors in the route segment and lets users retry.',
      'Unlike Pages Router, error boundaries are file-based and automatically scoped to the route.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: '`error.js` exports a Client Component that receives `error` and `reset` props. It catches errors in the route segment and lets users retry.',
        isCorrect: true,
        explanation:
          'It uses React error boundaries under the hood and can be reset with the <code>error.reset()</code> function.',
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
    id: 'next41-60-nextjs-q52',
    title: 'What is the purpose of the `not-found.js` file?',
    content:
      '<code>not-found.js</code> defines a custom 404 page for a route segment when <code>notFound()</code> is thrown or a route doesn’t exist.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Error Handling',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.798Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'error-handling', 'intermediate'],
    explanation:
      'It’s the App Router equivalent of <code>pages/404.js</code> but scoped to route segments.',
    points: 6,
    sampleAnswers: [
      'Create `app/not-found.js` for a global 404, or `app/blog/not-found.js` for blog-specific 404s.',
      'Call `notFound()` from `next/navigation` in a Server Component to trigger it programmatically.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Create `app/not-found.js` for a global 404, or `app/blog/not-found.js` for blog-specific 404s.',
        isCorrect: true,
        explanation:
          'It’s the App Router equivalent of <code>pages/404.js</code> but scoped to route segments.',
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
  `✅ Added ${newQuestions.length} questions for Error Handling (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
