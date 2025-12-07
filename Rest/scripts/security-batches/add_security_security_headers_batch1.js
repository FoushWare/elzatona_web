const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-02-sec14',
    title: 'Which of the following headers help improve web security?',
    content: 'Select all correct HTTP headers.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Security Headers',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:14:00.000Z',
    updatedAt: '2025-11-11T19:01:36.829Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'security-headers',
      'headers',
      'beginner',
      'intermediate',
    ],
    explanation:
      'HSTS, X-Content-Type-Options, and X-Frame-Options improve security; X-Powered-By reveals server info and is not protective.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Strict-Transport-Security',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'X-Content-Type-Options',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'X-Frame-Options',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'X-Powered-By',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'Headers',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-06-sec45',
    title: 'What are security headers and why are they important?',
    content:
      'Explain common security headers and their role in protecting frontend applications.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Security Headers',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:45:00.000Z',
    updatedAt: '2025-11-11T19:01:36.832Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'security-headers', 'headers', 'intermediate'],
    explanation:
      'Security headers protect users from XSS, clickjacking, and other attacks. Examples include Content-Security-Policy, X-Frame-Options, X-XSS-Protection, and Strict-Transport-Security.',
    points: 10,
    sampleAnswers: [
      'Security headers protect users from XSS, clickjacking, and other attacks. Examples include Content-Security-Policy, X-Frame-Options, X-XSS-Protection, and Strict-Transport-Security.',
    ],
    subcategory: 'Headers',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Security headers protect users from XSS, clickjacking, and other attacks. Examples include Content-Security-Policy, X-Frame-Options, X-XSS-Protection, and Strict-Transport-Security.',
        isCorrect: true,
        explanation:
          'Security headers protect users from XSS, clickjacking, and other attacks. Examples include Content-Security-Policy, X-Frame-Options, X-XSS-Protection, and Strict-Transport-Security.',
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
    id: 'sec-11-sec96',
    title: 'Why should frontend developers care about security headers?',
    content: 'Explain their role and importance in web security.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Security Headers',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:35:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'security-headers',
      'headers',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Security headers like CSP, X-Frame-Options, and Strict-Transport-Security help protect against XSS, clickjacking, and MITM attacks by instructing the browser on safe behavior.',
    points: 10,
    sampleAnswers: [
      'Security headers like CSP, X-Frame-Options, and Strict-Transport-Security help protect against XSS, clickjacking, and MITM attacks by instructing the browser on safe behavior.',
    ],
    subcategory: 'Headers',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Security headers like CSP, X-Frame-Options, and Strict-Transport-Security help protect against XSS, clickjacking, and MITM attacks by instructing the browser on safe behavior.',
        isCorrect: true,
        explanation:
          'Security headers like CSP, X-Frame-Options, and Strict-Transport-Security help protect against XSS, clickjacking, and MITM attacks by instructing the browser on safe behavior.',
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
  `✅ Added ${newQuestions.length} questions for Security Headers (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
