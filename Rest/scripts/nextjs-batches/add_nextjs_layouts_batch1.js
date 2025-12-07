const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next-21-40-nextjs-q24',
    title: 'How do you implement nested layouts in Next.js App Router?',
    content:
      'Create <code>layout.js</code> files in nested folders. Each layout wraps its child routes, enabling persistent UI like headers and sidebars.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Layouts',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.794Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'layouts', 'intermediate'],
    explanation:
      'Layouts are Server Components by default and can fetch data. They persist across route changes, improving performance.',
    points: 7,
    sampleAnswers: [
      'In `app/dashboard/layout.js`, return a layout with a sidebar. All pages in `app/dashboard/` will be wrapped by it.',
      'Layouts can be nested: `app/layout.js` → `app/dashboard/layout.js` → `app/dashboard/settings/page.js`.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'In `app/dashboard/layout.js`, return a layout with a sidebar. All pages in `app/dashboard/` will be wrapped by it.',
        isCorrect: true,
        explanation:
          'Layouts are Server Components by default and can fetch data. They persist across route changes, improving performance.',
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
    id: 'next-61-80-nextjs-q65',
    title: 'How do you implement layouts in Next.js?',
    content:
      'In App Router, use <code>layout.js</code> files for nested, persistent layouts. In Pages Router, use higher-order components or custom wrappers.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Layouts',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.796Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'layouts', 'intermediate'],
    explanation:
      'App Router’s <code>layout.js</code> is the modern, built-in way to share UI across routes.',
    points: 7,
    sampleAnswers: [
      'In App Router, create `app/layout.js` to wrap all pages with a shared header/footer. Nested layouts are possible with folder structure.',
      'Pages Router requires manual layout composition via component wrappers or context.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'In App Router, create `app/layout.js` to wrap all pages with a shared header/footer. Nested layouts are possible with folder structure.',
        isCorrect: true,
        explanation:
          'App Router’s <code>layout.js</code> is the modern, built-in way to share UI across routes.',
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
    id: 'next-61-80-nextjs-q69',
    title: 'How do you implement nested layouts in Next.js App Router?',
    content:
      'Create <code>layout.js</code> files in nested folders. Each layout wraps its child routes, enabling persistent UI like headers and sidebars.',
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Layouts',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.796Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'layouts', 'intermediate'],
    explanation:
      'Layouts are Server Components by default and can fetch data. They persist across route changes, improving performance.',
    points: 7,
    sampleAnswers: [
      'In `app/dashboard/layout.js`, return a layout with a sidebar. All pages in `app/dashboard/` will be wrapped by it.',
      'Layouts can be nested: `app/layout.js` → `app/dashboard/layout.js` → `app/dashboard/settings/page.js`.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'In `app/dashboard/layout.js`, return a layout with a sidebar. All pages in `app/dashboard/` will be wrapped by it.',
        isCorrect: true,
        explanation:
          'Layouts are Server Components by default and can fetch data. They persist across route changes, improving performance.',
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

console.log(`✅ Added ${newQuestions.length} questions for Layouts (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
