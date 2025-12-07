const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-01-sec1',
    title: 'What is an XSS attack?',
    content:
      'Cross-Site Scripting (XSS) is when attackers inject malicious scripts into web pages viewed by other users. Explain the potential risks and examples.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T19:01:36.818Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'XSS is when an attacker injects scripts into a page to steal cookies, hijack sessions, or manipulate the DOM. Examples: stored XSS in comments, reflected XSS in search forms, DOM-based XSS via URL parameters.',
    points: 10,
    sampleAnswers: [
      'XSS is when an attacker injects scripts into a page to steal cookies, hijack sessions, or manipulate the DOM. Examples: stored XSS in comments, reflected XSS in search forms, DOM-based XSS via URL parameters.',
    ],
    subcategory: 'XSS',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'XSS is when an attacker injects scripts into a page to steal cookies, hijack sessions, or manipulate the DOM. Examples: stored XSS in comments, reflected XSS in search forms, DOM-based XSS via URL parameters.',
        isCorrect: true,
        explanation:
          'XSS is when an attacker injects scripts into a page to steal cookies, hijack sessions, or manipulate the DOM. Examples: stored XSS in comments, reflected XSS in search forms, DOM-based XSS via URL parameters.',
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
    id: 'sec-01-sec2',
    title: 'Which of the following are types of XSS attacks?',
    content: 'Select all types of XSS attacks.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T19:01:36.827Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'DOM-based, Reflected, and Stored are the three main XSS types. SQL Injection is a server-side attack.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'DOM-based XSS',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Reflected XSS',
        isCorrect: true,
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
        text: 'SQL Injection',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'XSS',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-01-sec8',
    title: 'Which of these is a recommended prevention for XSS in React?',
    content: 'Select all correct strategies.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'XSS',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T19:01:36.827Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'cross-site-scripting-xss', 'xss', 'intermediate'],
    explanation:
      'Avoid unsafe HTML, sanitize inputs, and validate server-side to prevent XSS.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Avoid dangerouslySetInnerHTML',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use DOMPurify or similar sanitizers',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use HttpOnly cookies',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Validate input server-side',
        isCorrect: true,
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

console.log(`✅ Added ${newQuestions.length} questions for XSS (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
