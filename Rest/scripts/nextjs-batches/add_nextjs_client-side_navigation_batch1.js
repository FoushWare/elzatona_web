const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next-21-40-nextjs-q29',
    title: 'What is the `useRouter` hook used for?',
    content:
      '<code>useRouter</code> provides client-side navigation methods like <code>push</code>, <code>replace</code>, and <code>refresh</code> in Client Components.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Client-Side Navigation',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.794Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'client-side-navigation', 'intermediate'],
    explanation:
      'It’s the App Router equivalent of <code>next/router</code> but with the same API.',
    points: 6,
    options: [
      {
        id: 'a',
        text: 'Client-side navigation in Client Components',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Data fetching in Server Components',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Server-side redirects',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Only works in Pages Router',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'next-61-80-nextjs-q74',
    title: 'What is the `useRouter` hook used for?',
    content:
      '<code>useRouter</code> provides client-side navigation methods like <code>push</code>, <code>replace</code>, and <code>refresh</code> in Client Components.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Client-Side Navigation',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.796Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'client-side-navigation', 'intermediate'],
    explanation:
      'It’s the App Router equivalent of <code>next/router</code> but with the same API.',
    points: 6,
    options: [
      {
        id: 'a',
        text: 'Client-side navigation in Client Components',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Data fetching in Server Components',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Server-side redirects',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Only works in Pages Router',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'next41-60-nextjs-q54',
    title: 'What is the `useRouter` hook used for?',
    content:
      '<code>useRouter</code> provides client-side navigation methods like <code>push</code>, <code>replace</code>, and <code>refresh</code> in Client Components.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Client-Side Navigation',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.798Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'client-side-navigation', 'intermediate'],
    explanation:
      'It’s the App Router equivalent of <code>next/router</code> but with the same API.',
    points: 6,
    options: [
      {
        id: 'a',
        text: 'Client-side navigation in Client Components',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Data fetching in Server Components',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Server-side redirects',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Only works in Pages Router',
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
  `✅ Added ${newQuestions.length} questions for Client-Side Navigation (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
