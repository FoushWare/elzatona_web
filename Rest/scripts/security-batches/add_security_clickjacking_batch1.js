const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-01-sec4',
    title: 'What is clickjacking?',
    content:
      'Clickjacking is a type of attack where a user is tricked into clicking elements hidden under legitimate UI elements. Explain how it works and prevention strategies.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T19:01:36.827Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'clickjacking', 'clickjacking', 'intermediate'],
    explanation:
      'Clickjacking tricks users into clicking hidden elements using overlays or iframes. Prevention: X-Frame-Options header, CSP frame-ancestors, avoid transparent overlays.',
    points: 10,
    sampleAnswers: [
      'Clickjacking tricks users into clicking hidden elements using overlays or iframes. Prevention: X-Frame-Options header, CSP frame-ancestors, avoid transparent overlays.',
    ],
    subcategory: 'Clickjacking',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Clickjacking tricks users into clicking hidden elements using overlays or iframes. Prevention: X-Frame-Options header, CSP frame-ancestors, avoid transparent overlays.',
        isCorrect: true,
        explanation:
          'Clickjacking tricks users into clicking hidden elements using overlays or iframes. Prevention: X-Frame-Options header, CSP frame-ancestors, avoid transparent overlays.',
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
    id: 'sec-01-sec5',
    title: 'Which HTTP header helps prevent clickjacking?',
    content: 'Select the correct header used to prevent clickjacking attacks.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T19:01:36.827Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'security',
      'clickjacking',
      'clickjacking',
      'beginner',
      'intermediate',
    ],
    explanation:
      'X-Frame-Options and CSP frame-ancestors prevent malicious iframe embedding.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'X-Frame-Options',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Content-Security-Policy (frame-ancestors)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'X-Content-Type-Options',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Strict-Transport-Security',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'Clickjacking',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-03-sec19',
    title: 'What is Clickjacking (UI Redressing)?',
    content:
      'Explain what clickjacking is and how attackers can exploit it to trick users.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:19:00.000Z',
    updatedAt: '2025-11-11T19:01:36.830Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'clickjacking', 'clickjacking', 'intermediate'],
    explanation:
      'Clickjacking tricks a user into clicking on a hidden element or iframe, causing them to perform actions they didn’t intend, such as changing settings, liking a page, or submitting forms.',
    points: 10,
    sampleAnswers: [
      'Clickjacking tricks a user into clicking on a hidden element or iframe, causing them to perform actions they didn’t intend, such as changing settings, liking a page, or submitting forms.',
    ],
    subcategory: 'Clickjacking',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Clickjacking tricks a user into clicking on a hidden element or iframe, causing them to perform actions they didn’t intend, such as changing settings, liking a page, or submitting forms.',
        isCorrect: true,
        explanation:
          'Clickjacking tricks a user into clicking on a hidden element or iframe, causing them to perform actions they didn’t intend, such as changing settings, liking a page, or submitting forms.',
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
  `✅ Added ${newQuestions.length} questions for Clickjacking (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
