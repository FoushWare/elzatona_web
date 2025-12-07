const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-third-party-tp1',
    title: 'What are third-party resources on a website?',
    content: 'Define third-party resources and give examples.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Third-Party Resources',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.264Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'performance-patterns',
      'third-party-resources',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Resources hosted on another domain and used by your site, e.g., YouTube embeds, Google Analytics, social media widgets, maps, advertisements.',
    points: 10,
    sampleAnswers: [
      'Resources hosted on another domain and used by your site, e.g., YouTube embeds, Google Analytics, social media widgets, maps, advertisements.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Resources hosted on another domain and used by your site, e.g., YouTube embeds, Google Analytics, social media widgets, maps, advertisements.',
        isCorrect: true,
        explanation:
          'Resources hosted on another domain and used by your site, e.g., YouTube embeds, Google Analytics, social media widgets, maps, advertisements.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review performance optimization concepts.',
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
        text: 'Not quite. Consider web performance best practices.',
        isCorrect: false,
        explanation: '',
      },
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
  `✅ Added ${newQuestions.length} questions for Third-Party Resources (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
