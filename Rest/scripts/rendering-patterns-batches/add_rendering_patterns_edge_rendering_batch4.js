const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-render6-10',
    title: 'Choosing Rendering Strategy',
    content:
      'How should a developer decide between SSR, ISR, Edge, and Resumable approaches?',
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
      'Use SSR for dynamic personalized content, ISR for semi-static content, Edge Rendering for global low-latency responses, and Resumability for ultra-fast interactivity without full hydration.',
    points: 10,
    sampleAnswers: [
      'Use SSR for dynamic personalized content, ISR for semi-static content, Edge Rendering for global low-latency responses, and Resumability for ultra-fast interactivity without full hydration.',
      'The choice depends on user proximity, data volatility, and performance goals.',
    ],
    options: [
      {
        id: 'o1',
        text: 'Use SSR for dynamic personalized content, ISR for semi-static content, Edge Rendering for global low-latency responses, and Resumability for ultra-fast interactivity without full hydration.',
        isCorrect: true,
        explanation:
          'Use SSR for dynamic personalized content, ISR for semi-static content, Edge Rendering for global low-latency responses, and Resumability for ultra-fast interactivity without full hydration.',
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
  `✅ Added ${newQuestions.length} questions for Edge Rendering (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
