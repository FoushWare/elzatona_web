const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next-21-40-nextjs-q26',
    title: 'How do you handle dynamic routes in the App Router?',
    content:
      'Use dynamic segments like <code>app/users/[id]/page.js</code>. Fetch data using <code>params.id</code> in the Server Component.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Dynamic Routes',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.794Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'dynamic-routes', 'intermediate'],
    explanation:
      'The <code>params</code> object is passed to <code>page.js</code>, <code>layout.js</code>, and other route handlers automatically.',
    points: 7,
    sampleAnswers: [
      'Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`',
      'Use `generateStaticParams` to pre-render dynamic routes at build time for SSG.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`',
        isCorrect: true,
        explanation:
          'The <code>params</code> object is passed to <code>page.js</code>, <code>layout.js</code>, and other route handlers automatically.',
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
    id: 'next-61-80-nextjs-q71',
    title: 'How do you handle dynamic routes in the App Router?',
    content:
      'Use dynamic segments like <code>app/users/[id]/page.js</code>. Fetch data using <code>params.id</code> in the Server Component.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Dynamic Routes',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.796Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'dynamic-routes', 'intermediate'],
    explanation:
      'The <code>params</code> object is passed to <code>page.js</code>, <code>layout.js</code>, and other route handlers automatically.',
    points: 7,
    sampleAnswers: [
      'Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`',
      'Use `generateStaticParams` to pre-render dynamic routes at build time for SSG.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`',
        isCorrect: true,
        explanation:
          'The <code>params</code> object is passed to <code>page.js</code>, <code>layout.js</code>, and other route handlers automatically.',
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
    id: 'next1-20-nextjs-q16',
    title: 'What are dynamic routes in Next.js?',
    content:
      'Dynamic routes use bracket syntax (<code>[id].js</code>) to create pages for dynamic data, like <code>/posts/1</code> or <code>/users/john</code>.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Dynamic Routes',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.797Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'dynamic-routes', 'intermediate'],
    explanation:
      'In Pages Router, use <code>getStaticPaths</code> for SSG; in App Router, use dynamic segments like <code>app/posts/[id]/page.js</code>.',
    points: 7,
    options: [
      {
        id: 'a',
        text: 'Bracket-based routes like [id].js for dynamic data',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Only static routes are supported',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Require manual React Router setup',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Not compatible with SSR',
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
  `✅ Added ${newQuestions.length} questions for Dynamic Routes (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
