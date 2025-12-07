const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-render7-1',
    title: 'Partial Hydration Concept',
    content: 'What is Partial Hydration and when is it beneficial?',
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
      'Partial Hydration means hydrating only parts of a statically rendered page that require interactivity.',
    points: 10,
    sampleAnswers: [
      'Partial Hydration means hydrating only parts of a statically rendered page that require interactivity.',
      'It is beneficial for pages with mostly static content and a few interactive widgets.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Partial Hydration means hydrating only parts of a statically rendered page that require interactivity.',
        isCorrect: true,
        explanation:
          'Partial Hydration means hydrating only parts of a statically rendered page that require interactivity.',
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
    id: 'rendering-patterns-render7-2',
    title: 'Partial vs Progressive Hydration',
    content: 'How is Partial Hydration different from Progressive Hydration?',
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
      'Partial Hydration only hydrates selected components, Progressive Hydration hydrates sequentially over time',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Partial Hydration only hydrates selected components, Progressive Hydration hydrates sequentially over time',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'They are identical processes',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'Partial Hydration works only on client-side rendering',
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
    id: 'rendering-patterns-render7-3',
    title: 'Selective Prefetching',
    content: 'What is Selective Prefetching and why is it important?',
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
      'Selective Prefetching fetches data or resources only for components likely to be used soon, based on user behavior.',
    points: 10,
    sampleAnswers: [
      'Selective Prefetching fetches data or resources only for components likely to be used soon, based on user behavior.',
      'It prevents bandwidth waste and improves perceived performance on slow networks.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Selective Prefetching fetches data or resources only for components likely to be used soon, based on user behavior.',
        isCorrect: true,
        explanation:
          'Selective Prefetching fetches data or resources only for components likely to be used soon, based on user behavior.',
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
  `✅ Added ${newQuestions.length} questions for Progressive Hydration (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
