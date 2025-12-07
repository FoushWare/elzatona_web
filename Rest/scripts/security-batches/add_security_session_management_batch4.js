const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-11-sec97',
    title: 'What is the purpose of the HttpOnly cookie attribute?',
    content: 'Select the correct option.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Session Management',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:36:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'session-management',
      'cookies',
      'beginner',
      'intermediate',
    ],
    explanation:
      'HttpOnly restricts access to cookies from JavaScript, reducing XSS risks.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Prevents JavaScript from accessing the cookie',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Encrypts cookie contents',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Prevents cookies from being sent over HTTP',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Automatically rotates session cookies',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'Cookies',
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
  `✅ Added ${newQuestions.length} questions for Session Management (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
