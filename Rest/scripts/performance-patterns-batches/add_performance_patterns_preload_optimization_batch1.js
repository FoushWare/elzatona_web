const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-pre-load-1',
    title: 'Understanding Preload in Web Performance',
    content:
      'What is the purpose of using <code>&lt;link rel="preload"&gt;</code> in a web application?',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Preload Optimization',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.232Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'preload-optimization',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Preload helps load critical resources early to improve metrics like Time to Interactive or First Input Delay.',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'To load critical resources earlier for faster interactivity',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'To defer resource loading until needed',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'To lazy load components on user interaction',
        isCorrect: false,
        explanation: '',
      },
    ],
    sampleAnswers: [
      'Preload ensures critical assets are downloaded earlier, speeding up interactivity.',
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
  `✅ Added ${newQuestions.length} questions for Preload Optimization (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
