const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-prefetch-1',
    title: 'Understanding Prefetch in Web Performance',
    content:
      'What is the purpose of using <code>&lt;link rel="prefetch"&gt;</code> in web applications?',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Prefetch Optimization',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.241Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'prefetch-optimization',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Prefetch allows browsers to fetch resources that may be needed later, improving responsiveness for upcoming interactions.',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'To load resources that may be needed in the future',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'To defer resource loading until the user interacts',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'To immediately execute a script when the page loads',
        isCorrect: false,
        explanation: '',
      },
    ],
    sampleAnswers: [
      'Prefetch helps reduce perceived latency by loading resources before they are needed.',
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'performance-patterns-prefetch-2',
    title: 'Prefetch vs Lazy Loading',
    content:
      'How does prefetch differ from lazy loading when optimizing resources?',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Prefetch Optimization',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.241Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'prefetch-optimization',
      null,
      'intermediate',
    ],
    explanation:
      'Prefetch loads resources before they are needed (proactively), while lazy loading loads them only when required (reactively).',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Prefetching anticipates future needs; lazy loading reacts to user actions or visibility.',
        isCorrect: true,
        explanation:
          'Prefetch loads resources before they are needed (proactively), while lazy loading loads them only when required (reactively).',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review performance optimization concepts.',
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
        text: 'Not quite. Consider web performance best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    sampleAnswers: [
      'Prefetching anticipates future needs; lazy loading reacts to user actions or visibility.',
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'performance-patterns-prefetch-4',
    title: 'Performance Benefit of Prefetch',
    content: 'What happens when a prefetched module is requested by the user?',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Prefetch Optimization',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.241Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'prefetch-optimization',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Prefetched resources are cached by the browser, allowing instant retrieval when the user requests them.',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'It is fetched from cache instantly',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'It triggers a network request',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'It delays rendering until all resources are loaded',
        isCorrect: false,
        explanation: '',
      },
    ],
    sampleAnswers: [
      'The module loads from cache, minimizing wait time for the user.',
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
  `✅ Added ${newQuestions.length} questions for Prefetch Optimization (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
