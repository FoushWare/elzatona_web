const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q127',
    title: 'What are micro-frontends and how do they improve scalability?',
    content: 'Explain the concept of micro-frontends and their trade-offs.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'advanced'],
    explanation:
      'Micro-frontends split a large frontend into smaller, independently deployable apps. They improve scalability and team autonomy but add complexity in integration and shared state.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Micro-frontends split a large frontend into smaller, independently deployable apps. They improve scalability and team autonomy but add complexity in integration and shared state.',
        isCorrect: true,
        explanation:
          'Micro-frontends split a large frontend into smaller, independently deployable apps. They improve scalability and team autonomy but add complexity in integration and shared state.',
      },
      {
        id: 'o2',
        text: 'Micro-frontends split a large frontend into smaller, independently deployable apps',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' They improve scalability and team autonomy but add complexity in integration and shared state',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q128',
    title:
      'What is SSR caching and why is it important for scaling Next.js apps?',
    content:
      'Describe server-side rendering (SSR) caching in frontend applications.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'advanced'],
    explanation:
      'SSR caching stores rendered HTML from server-side rendering, reducing repeated computations. It improves response times and scales Next.js apps under high traffic.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'SSR caching stores rendered HTML from server-side rendering, reducing repeated computations. It improves response times and scales Next.js apps under high traffic.',
        isCorrect: true,
        explanation:
          'SSR caching stores rendered HTML from server-side rendering, reducing repeated computations. It improves response times and scales Next.js apps under high traffic.',
      },
      {
        id: 'o2',
        text: 'SSR caching stores rendered HTML from server-side rendering, reducing repeated computations',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' It improves response times and scales Next',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q129',
    title: 'How does load balancing work for frontend applications?',
    content: 'Explain load balancing strategies in frontend system design.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Load balancers distribute traffic across multiple servers. Strategies include round-robin, least connections, and geo-based routing. This improves reliability and scalability.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Load balancers distribute traffic across multiple servers. Strategies include round-robin, least connections, and geo-based routing. This improves reliability and scalability.',
        isCorrect: true,
        explanation:
          'Load balancers distribute traffic across multiple servers. Strategies include round-robin, least connections, and geo-based routing. This improves reliability and scalability.',
      },
      {
        id: 'o2',
        text: 'Load balancers distribute traffic across multiple servers',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Strategies include round-robin, least connections, and geo-based routing',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 41)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
