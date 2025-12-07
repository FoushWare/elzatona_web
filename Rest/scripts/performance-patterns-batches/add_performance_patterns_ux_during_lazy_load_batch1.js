const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-import-on-visibility-12',
    title:
      'What is the role of the fallback component in import-on-visibility?',
    content:
      'The fallback UI is displayed while the requested module is being fetched, parsed, and executed, giving users feedback instead of a blank screen.',
    type: 'concept',
    category: 'Performance Patterns',
    topic: 'UX During Lazy Load',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10',
    updatedAt: '2025-11-11T18:50:32.209Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'ux-during-lazy-load',
      'beginner',
      'intermediate',
    ],
    explanation:
      'The fallback reassures users that loading is in progress, preventing perceived freezes.',
    points: 10,
    options: [],
    sampleAnswers: ['It shows a loading indicator during module load.'],
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
  `✅ Added ${newQuestions.length} questions for UX During Lazy Load (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
