const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q142',
    title: 'What is CSRF and how can it be mitigated in frontend apps?',
    content: 'Describe CSRF attacks and frontend strategies to prevent them.',
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
      'CSRF tricks users into submitting malicious requests. Mitigation includes anti-CSRF tokens, SameSite cookies, and requiring re-authentication for sensitive actions.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'CSRF tricks users into submitting malicious requests. Mitigation includes anti-CSRF tokens, SameSite cookies, and requiring re-authentication for sensitive actions.',
        isCorrect: true,
        explanation:
          'CSRF tricks users into submitting malicious requests. Mitigation includes anti-CSRF tokens, SameSite cookies, and requiring re-authentication for sensitive actions.',
      },
      {
        id: 'o2',
        text: 'CSRF tricks users into submitting malicious requests',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Mitigation includes anti-CSRF tokens, SameSite cookies, and requiring re-authentication for sensitive actions',
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
    id: 'system-design-q143',
    title: 'What is CORS and why is it important in frontend system design?',
    content: 'Explain CORS and how it impacts frontend API calls.',
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
    tags: ['system-design', 'frontend-system-design', 'beginner'],
    explanation:
      "CORS (Cross-Origin Resource Sharing) controls how browsers allow cross-domain requests. It's important to configure properly to prevent unauthorized access while enabling required integrations.",
    points: 10,
    options: [
      {
        id: 'o1',
        text: "CORS (Cross-Origin Resource Sharing) controls how browsers allow cross-domain requests. It's important to configure properly to prevent unauthorized access while enabling required integrations.",
        isCorrect: true,
        explanation:
          "CORS (Cross-Origin Resource Sharing) controls how browsers allow cross-domain requests. It's important to configure properly to prevent unauthorized access while enabling required integrations.",
      },
      {
        id: 'o2',
        text: 'CORS (Cross-Origin Resource Sharing) controls how browsers allow cross-domain requests',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: " It's important to configure properly to prevent unauthorized access while enabling required integrations",
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
    id: 'system-design-q145',
    title: 'What is JWT and how is it used in frontend authentication?',
    content: 'Describe JSON Web Tokens (JWT) and their role in authentication.',
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
      'JWTs are stateless tokens used for authentication. The frontend stores and sends JWTs in headers or cookies to prove user identity when making API requests.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'JWTs are stateless tokens used for authentication. The frontend stores and sends JWTs in headers or cookies to prove user identity when making API requests.',
        isCorrect: true,
        explanation:
          'JWTs are stateless tokens used for authentication. The frontend stores and sends JWTs in headers or cookies to prove user identity when making API requests.',
      },
      {
        id: 'o2',
        text: 'JWTs are stateless tokens used for authentication',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' The frontend stores and sends JWTs in headers or cookies to prove user identity when making API requests',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 46)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
