const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q103',
    title: 'What is a service worker and what role does it play in caching?',
    content:
      'Explain service workers and how they enable offline-first frontend apps.',
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
      'A service worker is a script running in the background that intercepts network requests. It can cache assets, serve offline content, and enable push notifications for PWAs.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'A service worker is a script running in the background that intercepts network requests. It can cache assets, serve offline content, and enable push notifications for PWAs.',
        isCorrect: true,
        explanation:
          'A service worker is a script running in the background that intercepts network requests. It can cache assets, serve offline content, and enable push notifications for PWAs.',
      },
      {
        id: 'o2',
        text: 'A service worker is a script running in the background that intercepts network requests',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' It can cache assets, serve offline content, and enable push notifications for PWAs',
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
    id: 'system-design-q104',
    title: 'What is the difference between AppCache and Service Worker?',
    content:
      'Compare the deprecated AppCache and modern Service Worker approach.',
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
    explanation: 'The correct answer is: AppCache was limited and inflexible',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'AppCache was limited and inflexible',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Service Worker provides programmable caching and background sync',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Both are actively supported',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q105',
    title: 'What is stale-while-revalidate caching strategy?',
    content:
      'Explain how stale-while-revalidate improves perceived performance.',
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
      'Stale-while-revalidate serves cached content immediately while fetching a fresh version in the background. The user sees fast responses while data stays up-to-date.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Stale-while-revalidate serves cached content immediately while fetching a fresh version in the background. The user sees fast responses while data stays up-to-date.',
        isCorrect: true,
        explanation:
          'Stale-while-revalidate serves cached content immediately while fetching a fresh version in the background. The user sees fast responses while data stays up-to-date.',
      },
      {
        id: 'o2',
        text: 'Stale-while-revalidate serves cached content immediately while fetching a fresh version in the background',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' The user sees fast responses while data stays up-to-date',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 33)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
