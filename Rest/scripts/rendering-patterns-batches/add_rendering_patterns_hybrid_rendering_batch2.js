const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering5-4',
    title: 'ISR and Performance',
    content:
      'Why does ISR improve performance compared to SSR for frequently accessed pages?',
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
      'ISR caches pre-rendered pages at the edge and avoids regenerating on every request',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'ISR caches pre-rendered pages at the edge and avoids regenerating on every request',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'ISR avoids hydration completely',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'ISR runs entirely on the client',
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
    id: 'rendering-patterns-rendering5-5',
    title: 'On-Demand ISR',
    content: 'How is On-Demand ISR different from regular ISR?',
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
      'On-Demand ISR regenerates pages when triggered by specific events like webhook updates instead of fixed time intervals.',
    points: 10,
    sampleAnswers: [
      'On-Demand ISR regenerates pages when triggered by specific events like webhook updates instead of fixed time intervals.',
      'It avoids unnecessary revalidations and reduces serverless costs.',
    ],
    options: [
      {
        id: 'o1',
        text: 'On-Demand ISR regenerates pages when triggered by specific events like webhook updates instead of fixed time intervals.',
        isCorrect: true,
        explanation:
          'On-Demand ISR regenerates pages when triggered by specific events like webhook updates instead of fixed time intervals.',
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
    id: 'rendering-patterns-rendering5-6',
    title: 'Use Case for On-Demand ISR',
    content: 'When should you prefer On-Demand ISR over time-based ISR?',
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
    explanation: 'When content changes are event-driven, such as CMS updates',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'When content changes are event-driven, such as CMS updates',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'When your website never changes',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'When you have no API data',
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
  `✅ Added ${newQuestions.length} questions for Hybrid Rendering (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
