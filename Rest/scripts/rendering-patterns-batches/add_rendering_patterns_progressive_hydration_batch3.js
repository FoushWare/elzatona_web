const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-render7-7',
    title: 'Concurrent Rendering Advantage',
    content:
      "How does React 18's concurrent rendering improve user experience?",
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Progressive Hydration',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.538Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'progressive-hydration', 'advanced'],
    explanation:
      'Concurrent Rendering enables React to interrupt non-urgent renders to prioritize important updates, improving responsiveness.',
    points: 10,
    sampleAnswers: [
      'Concurrent Rendering enables React to interrupt non-urgent renders to prioritize important updates, improving responsiveness.',
      'It helps avoid UI freezes during heavy computation or re-renders.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Concurrent Rendering enables React to interrupt non-urgent renders to prioritize important updates, improving responsiveness.',
        isCorrect: true,
        explanation:
          'Concurrent Rendering enables React to interrupt non-urgent renders to prioritize important updates, improving responsiveness.',
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
    id: 'rendering-patterns-render7-8',
    title: 'Concurrent vs Synchronous Rendering',
    content:
      'What is the difference between concurrent and synchronous rendering in React?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Progressive Hydration',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.538Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'progressive-hydration', 'intermediate'],
    explanation:
      'Concurrent rendering can pause and resume renders, synchronous rendering blocks until completion',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Concurrent rendering can pause and resume renders, synchronous rendering blocks until completion',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Concurrent rendering executes faster JavaScript',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'Synchronous rendering can handle multiple threads',
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
    id: 'rendering-patterns-render7-9',
    title: 'Idle Time Rendering',
    content:
      'What is Idle Time Rendering and how does it optimize performance?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Progressive Hydration',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.538Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'progressive-hydration', 'intermediate'],
    explanation:
      'Idle Time Rendering defers rendering of non-critical UI parts until the main thread is idle.',
    points: 10,
    sampleAnswers: [
      'Idle Time Rendering defers rendering of non-critical UI parts until the main thread is idle.',
      'It uses browser APIs like requestIdleCallback to improve smoothness.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Idle Time Rendering defers rendering of non-critical UI parts until the main thread is idle.',
        isCorrect: true,
        explanation:
          'Idle Time Rendering defers rendering of non-critical UI parts until the main thread is idle.',
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
  `✅ Added ${newQuestions.length} questions for Progressive Hydration (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
