const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-render6-7',
    title: 'Resumability vs Hydration',
    content: 'How does Resumability differ from traditional hydration?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Edge Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.537Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'edge-rendering', 'advanced'],
    explanation:
      'Resumability skips full rehydration by resuming the app state directly from serialized data',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Resumability skips full rehydration by resuming the app state directly from serialized data',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Resumability re-renders everything on the server',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'They are the same process with different names',
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
    id: 'rendering-patterns-render6-8',
    title: 'React Server Components (RSC) Role',
    content: 'How do React Server Components improve rendering performance?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Edge Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.537Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'edge-rendering', 'advanced'],
    explanation:
      'RSCs allow heavy computation and data fetching to happen on the server, reducing client bundle size.',
    points: 10,
    sampleAnswers: [
      'RSCs allow heavy computation and data fetching to happen on the server, reducing client bundle size.',
      'They send minimal serialized output to the browser and improve render speed.',
    ],
    options: [
      {
        id: 'o1',
        text: 'RSCs allow heavy computation and data fetching to happen on the server, reducing client bundle size.',
        isCorrect: true,
        explanation:
          'RSCs allow heavy computation and data fetching to happen on the server, reducing client bundle size.',
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
    id: 'rendering-patterns-render6-9',
    title: 'Streaming + RSC Integration',
    content:
      'What benefit do we get when combining React Server Components with streaming rendering?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Edge Rendering',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.537Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'edge-rendering', 'advanced'],
    explanation:
      'Users see parts of the UI sooner while server components load progressively',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Users see parts of the UI sooner while server components load progressively',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'It delays rendering until all components are ready',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'It removes the need for client components entirely',
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
  `✅ Added ${newQuestions.length} questions for Edge Rendering (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
