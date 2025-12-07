const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering8-7',
    title: 'Client-Side Cache Invalidation',
    content: 'How can a front-end app force invalidation of a stale cache?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Streaming Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'streaming-rendering', 'advanced'],
    explanation:
      'By updating the asset version hash or using service worker cache management APIs.',
    points: 10,
    sampleAnswers: [
      'By updating the asset version hash or using service worker cache management APIs.',
      'It can also append query parameters to resource URLs to bypass old caches.',
    ],
    options: [
      {
        id: 'o1',
        text: 'By updating the asset version hash or using service worker cache management APIs.',
        isCorrect: true,
        explanation:
          'By updating the asset version hash or using service worker cache management APIs.',
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
    id: 'rendering-patterns-rendering8-8',
    title: 'Revalidation Techniques',
    content:
      'Which caching header combination supports conditional revalidation?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Streaming Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'streaming-rendering', 'advanced'],
    explanation: 'ETag and If-None-Match',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'ETag and If-None-Match',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Cache-Control: immutable',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'Last-Modified and If-Match',
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
    id: 'rendering-patterns-rendering8-9',
    title: 'Incremental Static Regeneration (ISR)',
    content: 'How does ISR improve performance in frameworks like Next.js?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Streaming Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'streaming-rendering', 'advanced'],
    explanation:
      'ISR allows static pages to be regenerated in the background at runtime while serving cached versions to users.',
    points: 10,
    sampleAnswers: [
      'ISR allows static pages to be regenerated in the background at runtime while serving cached versions to users.',
      'This enables near-instant load times with up-to-date content.',
    ],
    options: [
      {
        id: 'o1',
        text: 'ISR allows static pages to be regenerated in the background at runtime while serving cached versions to users.',
        isCorrect: true,
        explanation:
          'ISR allows static pages to be regenerated in the background at runtime while serving cached versions to users.',
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
  `✅ Added ${newQuestions.length} questions for Streaming Rendering (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
