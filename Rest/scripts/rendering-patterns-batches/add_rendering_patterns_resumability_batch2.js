const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering9-4',
    title: 'Cumulative Layout Shift (CLS)',
    content:
      'Which user experience issue does Cumulative Layout Shift (CLS) help detect?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Resumability',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'resumability', 'intermediate'],
    explanation: 'Visual instability caused by unexpected layout movements',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Visual instability caused by unexpected layout movements',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'Slow data fetching',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'JavaScript bundle size issues',
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
    id: 'rendering-patterns-rendering9-5',
    title: 'First Contentful Paint (FCP)',
    content: 'What is the difference between FCP and LCP?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Resumability',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'resumability', 'intermediate'],
    explanation:
      'FCP measures when the browser first renders any content from the DOM.',
    points: 10,
    sampleAnswers: [
      'FCP measures when the browser first renders any content from the DOM.',
      'LCP measures when the largest visible content element has been rendered.',
    ],
    options: [
      {
        id: 'o1',
        text: 'FCP measures when the browser first renders any content from the DOM.',
        isCorrect: true,
        explanation:
          'FCP measures when the browser first renders any content from the DOM.',
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
    id: 'rendering-patterns-rendering9-6',
    title: 'TTFB in Rendering',
    content:
      'How does Time To First Byte (TTFB) affect perceived performance in SSR apps?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Resumability',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.541Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'resumability', 'intermediate'],
    explanation:
      'TTFB represents the time it takes for the server to start sending a response.',
    points: 10,
    sampleAnswers: [
      'TTFB represents the time it takes for the server to start sending a response.',
      'A higher TTFB delays all other metrics, including FCP and LCP, especially in SSR apps.',
    ],
    options: [
      {
        id: 'o1',
        text: 'TTFB represents the time it takes for the server to start sending a response.',
        isCorrect: true,
        explanation:
          'TTFB represents the time it takes for the server to start sending a response.',
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
  `✅ Added ${newQuestions.length} questions for Resumability (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
