const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-07-sec58',
    title: 'How can you prevent XSS when displaying user-generated content?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:58:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'Escape and sanitize user content, and enforce CSP. Avoid unsanitized dangerouslySetInnerHTML as it introduces XSS vulnerabilities.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Escape HTML before rendering',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Sanitize input using libraries like DOMPurify',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use dangerouslySetInnerHTML without sanitization',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Implement Content Security Policy (CSP)',
        isCorrect: true,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-08-sec69',
    title: 'What is the difference between stored and reflected XSS?',
    content: 'Select the correct statements.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:09:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'Stored XSS is persistent and affects all users viewing the content; reflected XSS is immediate, targeting a single user through crafted requests.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Stored XSS persists in the database and affects multiple users',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Reflected XSS occurs immediately and is non-persistent',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Reflected XSS stores payload in server database',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Stored XSS is less dangerous than reflected XSS',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-10-sec83',
    title: 'What is the difference between DOM-based XSS and Stored XSS?',
    content: 'Select the correct description.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:22:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'DOM-based XSS runs in the browser, while Stored XSS is saved in server-side storage and executed when other users access it.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'DOM-based XSS executes purely on the client side',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Stored XSS persists in a database or storage and affects multiple users',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'DOM-based XSS stores payloads on the server',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Stored XSS only affects a single user',
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

console.log(`✅ Added ${newQuestions.length} questions for XSS (Batch 5)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
