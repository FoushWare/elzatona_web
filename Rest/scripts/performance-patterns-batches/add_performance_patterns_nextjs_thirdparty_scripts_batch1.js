const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-third-party-tp7',
    title:
      'Which strategy does Next.js provide to optimize third-party scripts?',
    content:
      'Identify the strategies available in the Next.js Script component.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Next.js Third-Party Scripts',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.264Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'next.js-third-party-scripts',
      'intermediate',
    ],
    explanation:
      'Next.js Script component allows beforeInteractive for critical scripts, afterInteractive for deferred scripts, and lazyOnload for scripts to load when idle.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'beforeInteractive',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'afterInteractive',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'lazyOnload',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'documentWrite',
        isCorrect: false,
        explanation: '',
      },
    ],
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
  `✅ Added ${newQuestions.length} questions for Next.js Third-Party Scripts (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
