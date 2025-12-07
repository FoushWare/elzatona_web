const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-islandarcheticure-4',
    title: 'Islands in Practice',
    content:
      'Which of the following frameworks is primarily designed around the Islands Architecture concept?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Islands Architecture',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.536Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'islands-architecture', 'intermediate'],
    explanation: 'Astro',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Next.js',
        isCorrect: false,
      },
      {
        id: 'b',
        text: 'Astro',
        isCorrect: true,
      },
      {
        id: 'c',
        text: 'Nuxt.js',
        isCorrect: false,
      },
      {
        id: 'd',
        text: 'Remix',
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
    id: 'rendering-patterns-islandarcheticure-5',
    title: 'Hydration Behavior',
    content:
      'In Islands Architecture, when are the interactive islands hydrated?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Islands Architecture',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.536Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'islands-architecture', 'intermediate'],
    explanation:
      'After the static HTML has been rendered and the browser is idle',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'During the initial HTML parsing',
        isCorrect: false,
      },
      {
        id: 'b',
        text: 'After the static HTML has been rendered and the browser is idle',
        isCorrect: true,
      },
      {
        id: 'c',
        text: 'Only after a user clicks a button',
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
    id: 'rendering-patterns-islandarcheticure-6',
    title: 'Comparing with Progressive Hydration',
    content:
      'What’s a key difference between Islands Architecture and Progressive Hydration?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Islands Architecture',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.536Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'islands-architecture', 'advanced'],
    explanation:
      'Progressive Hydration hydrates components in sequence across the page, while Islands Architecture hydrates independent islands in isolation.',
    points: 10,
    sampleAnswers: [
      'Progressive Hydration hydrates components in sequence across the page, while Islands Architecture hydrates independent islands in isolation.',
      'Islands focus on independence and smaller isolated bundles, while Progressive Hydration still considers the page as one app.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Progressive Hydration hydrates components in sequence across the page, while Islands Architecture hydrates independent islands in isolation.',
        isCorrect: true,
        explanation:
          'Progressive Hydration hydrates components in sequence across the page, while Islands Architecture hydrates independent islands in isolation.',
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
  `✅ Added ${newQuestions.length} questions for Islands Architecture (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
