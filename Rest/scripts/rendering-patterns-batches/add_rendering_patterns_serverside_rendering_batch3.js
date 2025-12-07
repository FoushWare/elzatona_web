const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering2-7',
    title: 'Edge Rendering',
    content: 'What is Edge Rendering and why is it becoming popular?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Server-Side Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.539Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'server-side-rendering', 'advanced'],
    explanation:
      'Edge Rendering runs SSR logic on edge servers close to the user, reducing latency and improving global performance.',
    points: 10,
    sampleAnswers: [
      'Edge Rendering runs SSR logic on edge servers close to the user, reducing latency and improving global performance.',
      'It’s ideal for personalization with low latency.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Edge Rendering runs SSR logic on edge servers close to the user, reducing latency and improving global performance.',
        isCorrect: true,
        explanation:
          'Edge Rendering runs SSR logic on edge servers close to the user, reducing latency and improving global performance.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review rendering pattern concepts.',
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
        text: 'Not quite. Consider rendering strategy best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering2-8',
    title: 'Edge vs Server Rendering',
    content: 'How does Edge Rendering differ from traditional SSR?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Server-Side Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.539Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'server-side-rendering', 'advanced'],
    explanation:
      'Edge Rendering happens on globally distributed edge nodes rather than a central server',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Edge Rendering happens on globally distributed edge nodes rather than a central server',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Edge Rendering always requires a CDN',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'Edge Rendering only works for static pages',
        isCorrect: false,
      },
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering2-9',
    title: 'React Server Components (RSC)',
    content:
      'How do React Server Components (RSC) improve rendering performance?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Server-Side Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.539Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'server-side-rendering', 'advanced'],
    explanation:
      'RSC allow parts of the React tree to render on the server without sending extra JavaScript to the client.',
    points: 10,
    sampleAnswers: [
      'RSC allow parts of the React tree to render on the server without sending extra JavaScript to the client.',
      'They reduce hydration cost and client bundle size.',
    ],
    options: [
      {
        id: 'o1',
        text: 'RSC allow parts of the React tree to render on the server without sending extra JavaScript to the client.',
        isCorrect: true,
        explanation:
          'RSC allow parts of the React tree to render on the server without sending extra JavaScript to the client.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review rendering pattern concepts.',
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
        text: 'Not quite. Consider rendering strategy best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
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
  `✅ Added ${newQuestions.length} questions for Server-Side Rendering (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
