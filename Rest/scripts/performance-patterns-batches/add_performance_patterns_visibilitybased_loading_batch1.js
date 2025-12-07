const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-import-on-visibility-16',
    title: 'What are potential drawbacks of import-on-visibility?',
    content:
      'Components might have a short delay when they first appear, especially on slow networks, since the import happens only when visible.',
    type: 'concept',
    category: 'Performance Patterns',
    topic: 'Visibility-based Loading',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10',
    updatedAt: '2025-11-11T18:50:32.209Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'visibility-based-loading',
      null,
      'intermediate',
    ],
    explanation:
      'Balancing performance and perceived speed requires good fallback UIs and caching strategies.',
    points: 10,
    options: [],
    sampleAnswers: ['Visible delay if network is slow.'],
    hints: [],
    metadata: {},
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
  `✅ Added ${newQuestions.length} questions for Visibility-based Loading (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
