const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q79',
    title: 'What is the difference between authentication and authorization?',
    content:
      'Explain the difference between verifying identity and granting access.',
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
    explanation: 'The correct answer is: Authentication verifies user identity',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Authentication verifies user identity',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Authorization determines access level or permissions',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'They are the same',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q80',
    title: 'How do signed URLs impact performance in frontend applications?',
    content:
      'Explain how using signed URLs can improve frontend loading and caching.',
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
      'Signed URLs allow CDNs to cache private resources efficiently, reducing server load and latency, while ensuring secure time-limited access to assets.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Signed URLs allow CDNs to cache private resources efficiently, reducing server load and latency, while ensuring secure time-limited access to assets.',
        isCorrect: true,
        explanation:
          'Signed URLs allow CDNs to cache private resources efficiently, reducing server load and latency, while ensuring secure time-limited access to assets.',
      },
      {
        id: 'o2',
        text: 'Signed URLs allow CDNs to cache private resources efficiently, reducing server load and latency, while ensuring secure time-limited access to assets',
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
    id: 'system-design-q81',
    title: 'What is web accessibility (a11y) and why is it important?',
    content:
      'Explain the concept of web accessibility and its significance in frontend design.',
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
      'Web accessibility ensures that websites are usable by people with disabilities, providing equal access to content and functionality. It improves usability and inclusivity.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Web accessibility ensures that websites are usable by people with disabilities, providing equal access to content and functionality. It improves usability and inclusivity.',
        isCorrect: true,
        explanation:
          'Web accessibility ensures that websites are usable by people with disabilities, providing equal access to content and functionality. It improves usability and inclusivity.',
      },
      {
        id: 'o2',
        text: 'Web accessibility ensures that websites are usable by people with disabilities, providing equal access to content and functionality',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' It improves usability and inclusivity',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 25)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
