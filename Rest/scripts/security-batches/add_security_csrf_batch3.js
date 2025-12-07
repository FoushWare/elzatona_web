const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-06-sec44',
    title: 'How can you prevent CSRF attacks?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'CSRF',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:44:00.000Z',
    updatedAt: '2025-11-11T19:01:36.832Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-site-request-forgery-csrf',
      'csrf',
      'intermediate',
    ],
    explanation:
      'CSRF tokens, SameSite cookies, and header validation prevent CSRF. HTTPS alone does not protect against CSRF.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use CSRF tokens in forms and API requests',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use SameSite cookies',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Validate the origin or referer header',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Rely only on HTTPS',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'CSRF',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-08-sec61',
    title: 'What is CSRF (Cross-Site Request Forgery)?',
    content: 'Explain how CSRF attacks work and why they are dangerous.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'CSRF',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:01:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-site-request-forgery-csrf',
      'csrf',
      'intermediate',
    ],
    explanation:
      'CSRF attacks trick a user’s browser into making unwanted requests to a web application where they are authenticated. This can lead to unauthorized actions like changing account details, making purchases, or deleting content.',
    points: 10,
    sampleAnswers: [
      'CSRF attacks trick a user’s browser into making unwanted requests to a web application where they are authenticated. This can lead to unauthorized actions like changing account details, making purchases, or deleting content.',
    ],
    subcategory: 'CSRF',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'CSRF attacks trick a user’s browser into making unwanted requests to a web application where they are authenticated. This can lead to unauthorized actions like changing account details, making purchases, or deleting content.',
        isCorrect: true,
        explanation:
          'CSRF attacks trick a user’s browser into making unwanted requests to a web application where they are authenticated. This can lead to unauthorized actions like changing account details, making purchases, or deleting content.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review web security concepts.',
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
        text: 'Not quite. Consider security best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
  },
  {
    id: 'sec-08-sec62',
    title: 'How can you prevent CSRF attacks?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'CSRF',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:02:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-site-request-forgery-csrf',
      'csrf',
      'intermediate',
    ],
    explanation:
      'CSRF tokens, checking Origin/Referer, and setting cookies as SameSite help prevent CSRF attacks. HTTPS alone does not prevent CSRF.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use CSRF tokens for forms',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Validate Origin and Referer headers',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Rely only on HTTPS',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use SameSite attribute on cookies',
        isCorrect: true,
        explanation: '',
      },
    ],
    subcategory: 'CSRF',
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

console.log(`✅ Added ${newQuestions.length} questions for CSRF (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
