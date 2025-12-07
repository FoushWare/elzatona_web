const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering5-1',
    title: 'Incremental Static Regeneration (ISR) Basics',
    content:
      'What problem does Incremental Static Regeneration (ISR) solve compared to standard static generation?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Hybrid Rendering',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.540Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'hybrid-rendering', 'intermediate'],
    explanation:
      'ISR allows pages to be updated after the initial build without rebuilding the entire site.',
    points: 10,
    sampleAnswers: [
      'ISR allows pages to be updated after the initial build without rebuilding the entire site.',
      'It helps maintain dynamic content with fast load times.',
    ],
    options: [
      {
        id: 'o1',
        text: 'ISR allows pages to be updated after the initial build without rebuilding the entire site.',
        isCorrect: true,
        explanation:
          'ISR allows pages to be updated after the initial build without rebuilding the entire site.',
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
    id: 'rendering-patterns-rendering5-2',
    title: 'ISR Workflow',
    content: 'How does ISR update static pages over time?',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Hybrid Rendering',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.540Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'hybrid-rendering', 'intermediate'],
    explanation:
      'It regenerates pages on-demand when a user visits an outdated page',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'It regenerates pages on-demand when a user visits an outdated page',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'It rebuilds the entire website daily',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'It updates pages manually via admin dashboard',
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
    id: 'rendering-patterns-rendering5-3',
    title: 'Revalidation in ISR',
    content:
      "What does the 'revalidate' field do in Next.js Incremental Static Regeneration?",
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Hybrid Rendering',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.540Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'hybrid-rendering', 'intermediate'],
    explanation:
      'It defines how often a static page should be regenerated in the background.',
    points: 10,
    sampleAnswers: [
      'It defines how often a static page should be regenerated in the background.',
      'Once the revalidation interval passes, the next request triggers page regeneration.',
    ],
    options: [
      {
        id: 'o1',
        text: 'It defines how often a static page should be regenerated in the background.',
        isCorrect: true,
        explanation:
          'It defines how often a static page should be regenerated in the background.',
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
  `✅ Added ${newQuestions.length} questions for Hybrid Rendering (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
