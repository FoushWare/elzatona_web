const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering5-10',
    title: 'Choosing Between Patterns',
    content: 'When should you choose SSR over ISR or Static Generation?',
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
      'When your page depends on highly personalized data that changes per user request',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'When your page depends on highly personalized data that changes per user request',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'When the content is static and rarely changes',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'When build times are slow',
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
  `✅ Added ${newQuestions.length} questions for Hybrid Rendering (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
