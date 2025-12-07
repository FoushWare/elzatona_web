const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering5-7',
    title: 'Streaming Server-Side Rendering',
    content:
      'What is the main benefit of streaming SSR compared to traditional SSR?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Hybrid Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.540Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'hybrid-rendering', 'advanced'],
    explanation:
      'Streaming SSR allows sending parts of the page to the browser as they are generated, reducing time to first paint.',
    points: 10,
    sampleAnswers: [
      'Streaming SSR allows sending parts of the page to the browser as they are generated, reducing time to first paint.',
      'Users see content progressively instead of waiting for the full page to render.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Streaming SSR allows sending parts of the page to the browser as they are generated, reducing time to first paint.',
        isCorrect: true,
        explanation:
          'Streaming SSR allows sending parts of the page to the browser as they are generated, reducing time to first paint.',
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
    id: 'rendering-patterns-rendering5-8',
    title: 'React Server Components (RSC)',
    content:
      'What role do React Server Components play in modern rendering strategies?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Hybrid Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.540Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'hybrid-rendering', 'advanced'],
    explanation:
      'They allow parts of React components to render on the server without sending unnecessary JavaScript to the client',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'They allow parts of React components to render on the server without sending unnecessary JavaScript to the client',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'They replace all client-side interactivity',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'They only work in static generation',
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
    id: 'rendering-patterns-rendering5-9',
    title: 'Edge SSR and Cold Boots',
    content: 'Why is Edge SSR often faster than traditional serverless SSR?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Hybrid Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.540Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'hybrid-rendering', 'advanced'],
    explanation:
      'Edge SSR runs closer to users, reducing latency and cold boot times.',
    points: 10,
    sampleAnswers: [
      'Edge SSR runs closer to users, reducing latency and cold boot times.',
      'It also enables HTTP streaming for faster content delivery.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Edge SSR runs closer to users, reducing latency and cold boot times.',
        isCorrect: true,
        explanation:
          'Edge SSR runs closer to users, reducing latency and cold boot times.',
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
  `✅ Added ${newQuestions.length} questions for Hybrid Rendering (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
