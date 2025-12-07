const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q40',
    title: 'How do you handle real-time updates for a feed of posts?',
    content:
      'Discuss strategies for updating the UI when new posts or comments arrive.',
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
      'Use WebSockets or SSE to push updates, update frontend state optimistically, maintain a local cache, and optionally batch updates to reduce re-renders.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use WebSockets or SSE to push updates, update frontend state optimistically, maintain a local cache, and optionally batch updates to reduce re-renders.',
        isCorrect: true,
        explanation:
          'Use WebSockets or SSE to push updates, update frontend state optimistically, maintain a local cache, and optionally batch updates to reduce re-renders.',
      },
      {
        id: 'o2',
        text: 'Use WebSockets or SSE to push updates, update frontend state optimistically, maintain a local cache, and optionally batch updates to reduce re-renders',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This method prioritizes user experience and maintainability.',
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
    id: 'system-design-q41',
    title: 'What is critical CSS and how do you apply it?',
    content:
      'Explain the concept of critical CSS and how it improves page load performance.',
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
      'Critical CSS is the CSS required to render above-the-fold content. Load it inline in the HTML to reduce render-blocking, while deferring non-critical CSS.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Critical CSS is the CSS required to render above-the-fold content. Load it inline in the HTML to reduce render-blocking, while deferring non-critical CSS.',
        isCorrect: true,
        explanation:
          'Critical CSS is the CSS required to render above-the-fold content. Load it inline in the HTML to reduce render-blocking, while deferring non-critical CSS.',
      },
      {
        id: 'o2',
        text: 'Critical CSS is the CSS required to render above-the-fold content',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Load it inline in the HTML to reduce render-blocking, while deferring non-critical CSS',
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
    id: 'system-design-q42',
    title: 'What are signed URLs for images and why are they used?',
    content:
      'Explain the purpose of signed URLs and their impact on security and performance.',
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
      'Signed URLs provide temporary, time-limited access to private resources (like images) on CDNs. They ensure secure access while allowing caching and CDN optimization.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Signed URLs provide temporary, time-limited access to private resources (like images) on CDNs. They ensure secure access while allowing caching and CDN optimization.',
        isCorrect: true,
        explanation:
          'Signed URLs provide temporary, time-limited access to private resources (like images) on CDNs. They ensure secure access while allowing caching and CDN optimization.',
      },
      {
        id: 'o2',
        text: 'Signed URLs provide temporary, time-limited access to private resources (like images) on CDNs',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' They ensure secure access while allowing caching and CDN optimization',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 12)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
