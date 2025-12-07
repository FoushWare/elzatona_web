const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-04-sec27',
    title: 'What is CSRF (Cross-Site Request Forgery)?',
    content:
      'Explain what CSRF attacks are and how they affect web applications.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'CSRF',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:27:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-site-request-forgery-csrf',
      'csrf',
      'intermediate',
    ],
    explanation:
      'CSRF occurs when an attacker tricks a logged-in user into submitting requests on a web application without their knowledge, performing actions like changing passwords or making transactions.',
    points: 10,
    sampleAnswers: [
      'CSRF occurs when an attacker tricks a logged-in user into submitting requests on a web application without their knowledge, performing actions like changing passwords or making transactions.',
    ],
    subcategory: 'CSRF',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'CSRF occurs when an attacker tricks a logged-in user into submitting requests on a web application without their knowledge, performing actions like changing passwords or making transactions.',
        isCorrect: true,
        explanation:
          'CSRF occurs when an attacker tricks a logged-in user into submitting requests on a web application without their knowledge, performing actions like changing passwords or making transactions.',
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
    id: 'sec-04-sec28',
    title: 'How can you prevent CSRF attacks?',
    content: 'Select all correct methods to prevent CSRF.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'CSRF',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:28:00.000Z',
    updatedAt: '2025-11-11T19:01:36.831Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'cross-site-request-forgery-csrf',
      'csrf',
      'intermediate',
    ],
    explanation:
      'Anti-CSRF tokens, SameSite cookies, and validating headers are standard defenses; disabling HTTPS weakens security.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use anti-CSRF tokens in forms',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use SameSite cookie attributes',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Disable HTTPS',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Validate origin and referer headers',
        isCorrect: true,
        explanation: '',
      },
    ],
    subcategory: 'CSRF',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-06-sec43',
    title: 'What is CSRF (Cross-Site Request Forgery)?',
    content: 'Explain how CSRF attacks work and why they are dangerous.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'CSRF',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:43:00.000Z',
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
      "CSRF tricks a logged-in user’s browser into making unwanted requests to a web application, potentially changing account settings, making purchases, or performing administrative actions without the user's consent.",
    points: 10,
    sampleAnswers: [
      "CSRF tricks a logged-in user’s browser into making unwanted requests to a web application, potentially changing account settings, making purchases, or performing administrative actions without the user's consent.",
    ],
    subcategory: 'CSRF',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: "CSRF tricks a logged-in user’s browser into making unwanted requests to a web application, potentially changing account settings, making purchases, or performing administrative actions without the user's consent.",
        isCorrect: true,
        explanation:
          "CSRF tricks a logged-in user’s browser into making unwanted requests to a web application, potentially changing account settings, making purchases, or performing administrative actions without the user's consent.",
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

console.log(`✅ Added ${newQuestions.length} questions for CSRF (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
