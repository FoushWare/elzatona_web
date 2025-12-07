const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q76',
    title: 'What is the difference between JWT and opaque tokens?',
    content: 'Compare JWT and opaque tokens for frontend authentication.',
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
      'The correct answer is: JWT is self-contained, includes claims, can be verified without server',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'JWT is self-contained, includes claims, can be verified without server',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Opaque tokens are random identifiers, require server to validate',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'JWT cannot be used in SPAs',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q77',
    title: 'What is CORS and why is it important in frontend apps?',
    content:
      'Explain Cross-Origin Resource Sharing and its relevance for security.',
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
      'CORS is a browser security mechanism that controls which origins can access resources. It prevents unauthorized cross-origin requests.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'CORS is a browser security mechanism that controls which origins can access resources. It prevents unauthorized cross-origin requests.',
        isCorrect: true,
        explanation:
          'CORS is a browser security mechanism that controls which origins can access resources. It prevents unauthorized cross-origin requests.',
      },
      {
        id: 'o2',
        text: 'CORS is a browser security mechanism that controls which origins can access resources',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' It prevents unauthorized cross-origin requests',
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
    id: 'system-design-q78',
    title: 'How do you securely handle API tokens in frontend applications?',
    content:
      'Discuss best practices for storing and using API tokens in the browser.',
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
      'Store tokens in HTTP-only cookies or in-memory storage, avoid localStorage for sensitive tokens, use short-lived tokens with refresh, and send via Authorization header.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Store tokens in HTTP-only cookies or in-memory storage, avoid localStorage for sensitive tokens, use short-lived tokens with refresh, and send via Authorization header.',
        isCorrect: true,
        explanation:
          'Store tokens in HTTP-only cookies or in-memory storage, avoid localStorage for sensitive tokens, use short-lived tokens with refresh, and send via Authorization header.',
      },
      {
        id: 'o2',
        text: 'Store tokens in HTTP-only cookies or in-memory storage, avoid localStorage for sensitive tokens, use short-lived tokens with refresh, and send via Authorization header',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 24)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
