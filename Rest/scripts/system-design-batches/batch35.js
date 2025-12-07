const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q109',
    title: 'How do you cache API responses efficiently on the frontend?',
    content: 'Discuss strategies for API caching in frontend applications.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-01-08T00:00:00Z',
    updatedAt: '2025-01-08T00:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'advanced'],
    explanation:
      'Use IndexedDB or in-memory caching, implement SWR/React Query strategies, leverage service workers for offline API responses, and use ETag headers to revalidate.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use IndexedDB or in-memory caching, implement SWR/React Query strategies, leverage service workers for offline API responses, and use ETag headers to revalidate.',
        isCorrect: true,
        explanation:
          'Use IndexedDB or in-memory caching, implement SWR/React Query strategies, leverage service workers for offline API responses, and use ETag headers to revalidate.',
      },
      {
        id: 'o2',
        text: 'Use IndexedDB or in-memory caching, implement SWR/React Query strategies, leverage service workers for offline API responses, and use ETag headers to revalidate',
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
    id: 'system-design-q110',
    title: 'What is the role of a Content Delivery Network (CDN) in caching?',
    content: 'Explain how CDNs optimize asset delivery in frontend systems.',
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
      'A CDN caches static assets at edge servers near users, reducing latency and improving load times for global audiences.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'A CDN caches static assets at edge servers near users, reducing latency and improving load times for global audiences.',
        isCorrect: true,
        explanation:
          'A CDN caches static assets at edge servers near users, reducing latency and improving load times for global audiences.',
      },
      {
        id: 'o2',
        text: 'A CDN caches static assets at edge servers near users, reducing latency and improving load times for global audiences',
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
    id: 'system-design-q111',
    title: 'What is the difference between authentication and authorization?',
    content:
      'Explain the roles of authentication and authorization in frontend applications.',
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
      'The correct answer is: Authentication verifies who the user is',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Authentication verifies who the user is',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Authorization decides what the user can access',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'They are the same thing',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 35)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
