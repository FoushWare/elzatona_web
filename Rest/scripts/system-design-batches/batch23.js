const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q73',
    title: 'How do you prevent XSS attacks in frontend applications?',
    content:
      'Explain strategies to mitigate Cross-Site Scripting vulnerabilities.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Escape or sanitize user-generated content, use Content Security Policy (CSP), avoid <code>innerHTML</code>, and validate input on both frontend and backend.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Escape or sanitize user-generated content, use Content Security Policy (CSP), avoid `innerHTML`, and validate input on both frontend and backend.',
        isCorrect: true,
        explanation:
          'Escape or sanitize user-generated content, use Content Security Policy (CSP), avoid `innerHTML`, and validate input on both frontend and backend.',
      },
      {
        id: 'o2',
        text: 'Escape or sanitize user-generated content, use Content Security Policy (CSP), avoid `innerHTML`, and validate input on both frontend and backend',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This method prioritizes user experience and maintainability.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q74',
    title: 'What are HTTP-only cookies and why are they important?',
    content: 'Explain the role of HTTP-only cookies in frontend security.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'HTTP-only cookies cannot be accessed by JavaScript, reducing the risk of XSS attacks stealing session data.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'HTTP-only cookies cannot be accessed by JavaScript, reducing the risk of XSS attacks stealing session data.',
        isCorrect: true,
        explanation:
          'HTTP-only cookies cannot be accessed by JavaScript, reducing the risk of XSS attacks stealing session data.',
      },
      {
        id: 'o2',
        text: 'HTTP-only cookies cannot be accessed by JavaScript, reducing the risk of XSS attacks stealing session data',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This method prioritizes user experience and maintainability.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q75',
    title: 'How do you handle authentication in frontend applications?',
    content:
      'Discuss strategies for managing user authentication and session state.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Use tokens (JWT or opaque), store securely in HTTP-only cookies or local storage, handle token refresh, and validate session on API requests.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use tokens (JWT or opaque), store securely in HTTP-only cookies or local storage, handle token refresh, and validate session on API requests.',
        isCorrect: true,
        explanation:
          'Use tokens (JWT or opaque), store securely in HTTP-only cookies or local storage, handle token refresh, and validate session on API requests.',
      },
      {
        id: 'o2',
        text: 'Use tokens (JWT or opaque), store securely in HTTP-only cookies or local storage, handle token refresh, and validate session on API requests',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This method prioritizes user experience and maintainability.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 23)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
