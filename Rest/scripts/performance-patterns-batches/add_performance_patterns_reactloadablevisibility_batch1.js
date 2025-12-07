const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-import-on-visibility-11',
    title:
      'How does “react-loadable-visibility” enhance lazy loading in React?',
    content:
      'It combines dynamic imports with visibility detection, ensuring components are only loaded when they are about to appear on screen.',
    type: 'concept',
    category: 'Performance Patterns',
    topic: 'react-loadable-visibility',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10',
    updatedAt: '2025-11-11T18:50:32.209Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'react-loadable-visibility',
      null,
      'intermediate',
    ],
    explanation:
      'Instead of pre-loading all lazy components, it waits until the user scrolls to them, saving bandwidth and improving UX.',
    points: 10,
    options: [],
    sampleAnswers: ['It lazy loads components only when visible.'],
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
  `✅ Added ${newQuestions.length} questions for react-loadable-visibility (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
