const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering2-4',
    title: 'Hydration in SSR',
    content: "What does 'hydration' mean in the context of SSR?",
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Server-Side Rendering',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.539Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'server-side-rendering', 'intermediate'],
    explanation:
      'Hydration is the process where React attaches event listeners and reuses server-rendered HTML to make the page interactive.',
    points: 10,
    sampleAnswers: [
      'Hydration is the process where React attaches event listeners and reuses server-rendered HTML to make the page interactive.',
      'It bridges the server-rendered static HTML with client-side React logic.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Hydration is the process where React attaches event listeners and reuses server-rendered HTML to make the page interactive.',
        isCorrect: true,
        explanation:
          'Hydration is the process where React attaches event listeners and reuses server-rendered HTML to make the page interactive.',
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
    id: 'rendering-patterns-rendering2-5',
    title: 'Streaming SSR',
    content: 'How does Streaming SSR differ from traditional SSR?',
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
      'Streaming SSR sends HTML to the browser in chunks as components are rendered, instead of waiting for the full page to be ready.',
    points: 10,
    sampleAnswers: [
      'Streaming SSR sends HTML to the browser in chunks as components are rendered, instead of waiting for the full page to be ready.',
      'It improves TTFB and makes perceived performance faster.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Streaming SSR sends HTML to the browser in chunks as components are rendered, instead of waiting for the full page to be ready.',
        isCorrect: true,
        explanation:
          'Streaming SSR sends HTML to the browser in chunks as components are rendered, instead of waiting for the full page to be ready.',
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
    id: 'rendering-patterns-rendering2-6',
    title: 'React 18 and Streaming SSR',
    content:
      'Which React feature introduced in React 18 enhances Streaming SSR?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Server-Side Rendering',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.539Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'server-side-rendering', 'intermediate'],
    explanation: 'React Suspense for data fetching',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'React Suspense for data fetching',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'React Context API',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'React.memo',
        isCorrect: false,
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
  `✅ Added ${newQuestions.length} questions for Server-Side Rendering (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
