const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q4',
    title: 'What are the trade-offs between SSR, CSR, and SSG?',
    content:
      'Explain the differences between Server-Side Rendering (SSR), Client-Side Rendering (CSR), and Static Site Generation (SSG).',
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
      'SSR improves SEO and first load but increases server cost. CSR shifts load to client but may hurt SEO. SSG is fast but static.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'SSR improves SEO but requires servers to render each request',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'CSR improves interactivity but may delay first paint',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'SSG pre-renders content, making it very fast for static pages',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'CSR is always better than SSR',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q6',
    title:
      'What is the difference between Context API and Redux for state management?',
    content:
      'Compare Context API and Redux when designing frontend system state flow.',
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
      'Context API is simple for small to medium apps with minimal boilerplate, but can cause re-renders. Redux provides structured state management and debugging tools, better for complex apps.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Context API is simple for small to medium apps with minimal boilerplate, but can cause re-renders. Redux provides structured state management and debugging tools, better for complex apps.',
        isCorrect: true,
        explanation:
          'Context API is simple for small to medium apps with minimal boilerplate, but can cause re-renders. Redux provides structured state management and debugging tools, better for complex apps.',
      },
      {
        id: 'o2',
        text: 'Context API is simple for small to medium apps with minimal boilerplate, but can cause re-renders',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Redux provides structured state management and debugging tools, better for complex apps',
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
    id: 'system-design-q7',
    title: 'How do you optimize images for frontend performance?',
    content:
      'List and explain techniques to improve image loading performance.',
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
    tags: ['system-design', 'frontend-system-design', 'beginner'],
    explanation:
      'Using optimized formats, lazy loading, and CDNs reduces bandwidth and improves load times.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use WebP or AVIF formats',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Lazy load images below the fold',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Serve images via CDN with caching',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Always use raw PNGs without compression',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 2)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
