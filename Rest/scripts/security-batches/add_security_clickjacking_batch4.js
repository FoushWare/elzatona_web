const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-09-sec71',
    title: 'What is Clickjacking (UI Redressing)?',
    content:
      'Explain how clickjacking attacks work and why they are dangerous.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:11:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'clickjacking', 'clickjacking', 'intermediate'],
    explanation:
      'Clickjacking tricks a user into clicking on invisible or disguised elements on a page, performing actions without their knowledge, such as changing settings or authorizing payments.',
    points: 10,
    sampleAnswers: [
      'Clickjacking tricks a user into clicking on invisible or disguised elements on a page, performing actions without their knowledge, such as changing settings or authorizing payments.',
    ],
    subcategory: 'Clickjacking',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Clickjacking tricks a user into clicking on invisible or disguised elements on a page, performing actions without their knowledge, such as changing settings or authorizing payments.',
        isCorrect: true,
        explanation:
          'Clickjacking tricks a user into clicking on invisible or disguised elements on a page, performing actions without their knowledge, such as changing settings or authorizing payments.',
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
    id: 'sec-09-sec72',
    title: 'How can you prevent clickjacking attacks?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:12:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'clickjacking', 'clickjacking', 'intermediate'],
    explanation:
      'X-Frame-Options and CSP frame-ancestors prevent a site from being embedded in iframes, mitigating clickjacking attacks.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use X-Frame-Options header',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use Content Security Policy frame-ancestors directive',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Disable JavaScript completely',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Use secure authentication only',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'Clickjacking',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-11-sec91',
    title: 'What is Clickjacking (UI Redressing)?',
    content: "Explain how clickjacking works and why it's dangerous.",
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:30:00.000Z',
    updatedAt: '2025-11-11T19:01:36.834Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'clickjacking', 'ui redressing', 'intermediate'],
    explanation:
      'Clickjacking tricks users into clicking invisible or disguised elements, causing unintended actions like approving transactions, changing settings, or enabling permissions.',
    points: 10,
    sampleAnswers: [
      'Clickjacking tricks users into clicking invisible or disguised elements, causing unintended actions like approving transactions, changing settings, or enabling permissions.',
    ],
    subcategory: 'UI Redressing',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Clickjacking tricks users into clicking invisible or disguised elements, causing unintended actions like approving transactions, changing settings, or enabling permissions.',
        isCorrect: true,
        explanation:
          'Clickjacking tricks users into clicking invisible or disguised elements, causing unintended actions like approving transactions, changing settings, or enabling permissions.',
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
  `✅ Added ${newQuestions.length} questions for Clickjacking (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
