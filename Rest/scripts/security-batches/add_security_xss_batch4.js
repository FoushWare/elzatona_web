const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-05-sec40',
    title: 'Which of the following is the most dangerous type of XSS?',
    content: 'Select the correct answer.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:40:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'Stored XSS is persistent and can affect all users who visit the page, making it the most dangerous.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'DOM-based XSS',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Reflected XSS',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Stored XSS',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'All are equally dangerous',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-05-sec41',
    title: 'What are common mitigation strategies against XSS?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:41:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'Validating/sanitizing inputs, HttpOnly cookies, and avoiding inline scripts help prevent XSS. Using eval() is unsafe.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Input validation and sanitization',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Using HttpOnly cookies',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Avoid inline scripts and use external scripts',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use eval() to encode input',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-05-sec42',
    title:
      'True or False: Using HTTPS alone fully protects against XSS attacks.',
    content: 'Evaluate this statement.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:42:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation: 'The correct answer is: False',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'True',
        isCorrect: false,
        explanation:
          'HTTPS protects data in transit but does not prevent injection of malicious scripts in the browser.',
      },
      {
        id: 'o2',
        text: 'False',
        isCorrect: false,
        explanation:
          'HTTPS protects data in transit but does not prevent injection of malicious scripts in the browser.',
      },
      {
        id: 'o3',
        text: 'Partially true - depends on the context',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Not applicable',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
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

console.log(`✅ Added ${newQuestions.length} questions for XSS (Batch 4)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
