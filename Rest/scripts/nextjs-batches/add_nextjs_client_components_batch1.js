const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/nextjs-questions.json'
);

const newQuestions = [
  {
    id: 'next-61-80-nextjs-q66',
    title: "What is the purpose of the 'use client' directive?",
    content:
      "<code>'use client'</code> marks a file as a Client Component, enabling interactivity, hooks, and event handlers in the App Router.",
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Client Components',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.796Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'client-components', 'intermediate'],
    explanation:
      "By default, all components in App Router are Server Components. Use <code>'use client'</code> only when needed for interactivity.",
    points: 7,
    sampleAnswers: [
      "`'use client'` at the top of a file enables useState, useEffect, and event handlers—turning it into a Client Component.",
      'It should be used sparingly to keep bundles small and leverage Server Components for data fetching.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: "`'use client'` at the top of a file enables useState, useEffect, and event handlers—turning it into a Client Component.",
        isCorrect: true,
        explanation:
          "By default, all components in App Router are Server Components. Use <code>'use client'</code> only when needed for interactivity.",
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
    id: 'next1-20-nextjs-q20',
    title: "What is the purpose of the 'use client' directive?",
    content:
      "<code>'use client'</code> marks a file as a Client Component, enabling interactivity, hooks, and event handlers in the App Router.",
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Client Components',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.797Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'client-components', 'intermediate'],
    explanation:
      "By default, all components in App Router are Server Components. Use <code>'use client'</code> only when needed for interactivity.",
    points: 7,
    sampleAnswers: [
      "`'use client'` at the top of a file enables useState, useEffect, and event handlers—turning it into a Client Component.",
      'It should be used sparingly to keep bundles small and leverage Server Components for data fetching.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: "`'use client'` at the top of a file enables useState, useEffect, and event handlers—turning it into a Client Component.",
        isCorrect: true,
        explanation:
          "By default, all components in App Router are Server Components. Use <code>'use client'</code> only when needed for interactivity.",
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
    id: 'next41-60-nextjs-q46',
    title: "What is the purpose of the 'use client' directive?",
    content:
      "<code>'use client'</code> marks a file as a Client Component, enabling interactivity, hooks, and event handlers in the App Router.",
    type: 'multiple-choice',
    category: 'Next.js',
    topic: 'Client Components',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:48:30.798Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['nextjs', 'client-components', 'intermediate'],
    explanation:
      "By default, all components in App Router are Server Components. Use <code>'use client'</code> only when needed for interactivity.",
    points: 7,
    sampleAnswers: [
      "`'use client'` at the top of a file enables useState, useEffect, and event handlers—turning it into a Client Component.",
      'It should be used sparingly to keep bundles small and leverage Server Components for data fetching.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: "`'use client'` at the top of a file enables useState, useEffect, and event handlers—turning it into a Client Component.",
        isCorrect: true,
        explanation:
          "By default, all components in App Router are Server Components. Use <code>'use client'</code> only when needed for interactivity.",
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
  `✅ Added ${newQuestions.length} questions for Client Components (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
