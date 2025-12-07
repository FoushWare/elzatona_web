const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-observer-pattern-56',
    title: 'Performance Concern',
    content: 'What is one potential drawback of the Observer Pattern?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Behavioral Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.207Z',
    updatedAt: '2025-11-11T18:36:58.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'The correct answer is: Too many or complex observers can cause performance issues during notifications',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Observers cannot be removed once added',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Too many or complex observers can cause performance issues during notifications',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Observable cannot notify multiple observers at once',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'It cannot work with asynchronous data',
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
  `✅ Added ${newQuestions.length} questions for Behavioral Patterns (Batch 6)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
