const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-render7-10',
    title: 'Pre-rendering Optimization Tradeoffs',
    content:
      'What trade-offs do pre-rendering optimizations (like ISR or static generation) have?',
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
      'They improve initial load but can serve outdated content until revalidated',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'They improve initial load but can serve outdated content until revalidated',
        isCorrect: true,
      },
      {
        id: 'b',
        text: 'They slow down page loads by increasing bundle size',
        isCorrect: false,
      },
      {
        id: 'c',
        text: 'They disable interactivity on the client',
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
  `✅ Added ${newQuestions.length} questions for Progressive Hydration (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
