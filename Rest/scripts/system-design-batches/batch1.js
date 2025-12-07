const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q1',
    title: 'What are the different approaches for pagination in frontend?',
    content:
      'Compare offset-based pagination, cursor-based pagination, and infinite scrolling. Which approach is better for large datasets?',
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
      'Offset pagination is simple but slow at scale. Cursor pagination is efficient and consistent. Infinite scroll provides seamless UX but is harder for bookmarking and SEO.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Offset-based pagination',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Cursor-based pagination',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Infinite scrolling',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Randomized pagination',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q2',
    title: 'What is a signed URL for images?',
    content:
      'Explain how signed URLs are used for secure and performant image delivery in frontend applications.',
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
      'A signed URL is a temporary, cryptographically signed link that allows secure access to a file. It improves performance because the frontend can fetch directly from CDN/storage instead of proxying through the backend.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'A signed URL is a temporary, cryptographically signed link that allows secure access to a file. It improves performance because the frontend can fetch directly from CDN/storage instead of proxying thr...',
        isCorrect: true,
        explanation:
          'A signed URL is a temporary, cryptographically signed link that allows secure access to a file. It improves performance because the frontend can fetch directly from CDN/storage instead of proxying through the backend.',
      },
      {
        id: 'o2',
        text: 'A signed URL is a temporary, cryptographically signed link that allows secure access to a file',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' It improves performance because the frontend can fetch directly from CDN/storage instead of proxying through the backend',
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
    id: 'system-design-q3',
    title:
      'How can you apply critical CSS in frontend performance optimization?',
    content: 'Describe what critical CSS is and how to implement it.',
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
      'Critical CSS means extracting the styles needed for above-the-fold content and inlining them in the HTML. This reduces render-blocking requests and improves time-to-first-paint.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Critical CSS means extracting the styles needed for above-the-fold content and inlining them in the HTML. This reduces render-blocking requests and improves time-to-first-paint.',
        isCorrect: true,
        explanation:
          'Critical CSS means extracting the styles needed for above-the-fold content and inlining them in the HTML. This reduces render-blocking requests and improves time-to-first-paint.',
      },
      {
        id: 'o2',
        text: 'Critical CSS means extracting the styles needed for above-the-fold content and inlining them in the HTML',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' This reduces render-blocking requests and improves time-to-first-paint',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 1)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
