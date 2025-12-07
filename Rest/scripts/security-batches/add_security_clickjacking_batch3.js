const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/security-questions.json'
);

const newQuestions = [
  {
    id: 'sec-06-sec46',
    title: 'Which HTTP header helps prevent Clickjacking?',
    content: 'Select the correct answer.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:46:00.000Z',
    updatedAt: '2025-11-11T19:01:36.832Z',
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
      'The X-Frame-Options header prevents your site from being embedded in iframes, mitigating clickjacking.',
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
        text: 'Content-Security-Policy',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Strict-Transport-Security',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'X-Content-Type-Options',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'Clickjacking',
    hints: [],
    metadata: {},
  },
  {
    id: 'sec-07-sec59',
    title: 'What is UI Redressing (Clickjacking)?',
    content:
      'Explain how clickjacking attacks manipulate user interface elements.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:59:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'clickjacking', 'clickjacking', 'intermediate'],
    explanation:
      'Clickjacking occurs when attackers overlay a transparent or disguised element over a legitimate UI element, tricking users into clicking it and performing unintended actions like submitting forms or changing settings.',
    points: 10,
    sampleAnswers: [
      'Clickjacking occurs when attackers overlay a transparent or disguised element over a legitimate UI element, tricking users into clicking it and performing unintended actions like submitting forms or changing settings.',
    ],
    subcategory: 'Clickjacking',
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Clickjacking occurs when attackers overlay a transparent or disguised element over a legitimate UI element, tricking users into clicking it and performing unintended actions like submitting forms or changing settings.',
        isCorrect: true,
        explanation:
          'Clickjacking occurs when attackers overlay a transparent or disguised element over a legitimate UI element, tricking users into clicking it and performing unintended actions like submitting forms or changing settings.',
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
    id: 'sec-07-sec60',
    title: 'How do you prevent clickjacking attacks?',
    content: 'Select all correct options.',
    type: 'multiple-choice',
    category: 'Security',
    topic: 'Clickjacking',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T01:00:00.000Z',
    updatedAt: '2025-11-11T19:01:36.833Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['security', 'clickjacking', 'clickjacking', 'intermediate'],
    explanation:
      'X-Frame-Options and CSP frame-ancestors prevent your site from being embedded in iframes, mitigating clickjacking attacks.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use X-Frame-Options header to deny framing',
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
        text: 'Rely only on HTTPS',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Implement UI overlays as security measure',
        isCorrect: false,
        explanation: '',
      },
    ],
    subcategory: 'Clickjacking',
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
  `✅ Added ${newQuestions.length} questions for Clickjacking (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
