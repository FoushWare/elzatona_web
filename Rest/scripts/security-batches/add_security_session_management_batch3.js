const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-08-sec70',
    title:
      'What are the best practices for session management in frontend apps?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Session Management',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:10:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'session-management',
      'session management',
      'intermediate',
    ],
    explanation:
      'Use secure storage, short-lived tokens, refresh tokens carefully, and invalidate sessions properly. Avoid storing sensitive tokens in localStorage due to XSS risk.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use short-lived tokens and refresh them securely',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Store tokens in memory or HttpOnly cookies',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Rely solely on localStorage for tokens',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Invalidate sessions on logout and after inactivity',
        isCorrect: true,
        explanation: '',
      },
    ],
    subcategory: 'Session Management',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-10-sec87',
    title: 'How does the SameSite cookie attribute improve security?',
    content: 'Select the correct behavior.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Session Management',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:26:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'session-management', 'cookies', 'intermediate'],
    explanation:
      'SameSite restricts cross-site sending of cookies to reduce CSRF risks. It does not encrypt cookies or make them HttpOnly.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Prevents cookies from being sent with cross-site requests by default',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Mitigates CSRF attacks',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Encrypts cookie contents',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Prevents cookies from being accessed via JavaScript',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'Cookies',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-10-sec88',
    title:
      'What are best practices for secure cookie usage in frontend applications?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Session Management',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:27:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'session-management', 'cookies', 'intermediate'],
    explanation:
      'HttpOnly, Secure, and SameSite attributes protect cookies from XSS and CSRF attacks. Sensitive tokens should not be stored in localStorage.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use HttpOnly to prevent JavaScript access',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use Secure flag to enforce HTTPS transmission',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Avoid storing sensitive tokens in localStorage',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use SameSite attribute to mitigate CSRF',
        isCorrect: true,
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
  `✅ Added ${newQuestions.length} questions for Session Management (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
