const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q100',
    title: 'When would you choose SSE over WebSocket in a frontend system?',
    content:
      'Explain scenarios where Server-Sent Events are more suitable than WebSocket.',
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
      "Use SSE for unidirectional updates like live feeds, notifications, or stock tickers where client doesn't send frequent data and simplicity is preferred over bidirectional communication.",
    points: 10,
    options: [
      {
        id: 'o1',
        text: "Use SSE for unidirectional updates like live feeds, notifications, or stock tickers where client doesn't send frequent data and simplicity is preferred over bidirectional communication.",
        isCorrect: true,
        explanation:
          "Use SSE for unidirectional updates like live feeds, notifications, or stock tickers where client doesn't send frequent data and simplicity is preferred over bidirectional communication.",
      },
      {
        id: 'o2',
        text: "Use SSE for unidirectional updates like live feeds, notifications, or stock tickers where client doesn't send frequent data and simplicity is preferred over bidirectional communication",
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
    id: 'system-design-q101',
    title: 'What is the difference between browser cache and CDN cache?',
    content:
      'Explain how browser caching and CDN caching work and their differences.',
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
      'Browser cache stores assets locally on the client device. CDN cache stores assets on edge servers closer to the user. CDN reduces network latency while browser cache reduces repeated downloads.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Browser cache stores assets locally on the client device. CDN cache stores assets on edge servers closer to the user. CDN reduces network latency while browser cache reduces repeated downloads.',
        isCorrect: true,
        explanation:
          'Browser cache stores assets locally on the client device. CDN cache stores assets on edge servers closer to the user. CDN reduces network latency while browser cache reduces repeated downloads.',
      },
      {
        id: 'o2',
        text: 'Browser cache stores assets locally on the client device',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' CDN cache stores assets on edge servers closer to the user',
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
    id: 'system-design-q102',
    title: 'What are cache-control headers and why are they important?',
    content: 'Explain cache-control strategies for frontend assets.',
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
      'Cache-control headers define how long and where a resource can be cached. Examples: <code>max-age</code>, <code>no-store</code>, <code>must-revalidate</code>. They help control freshness and prevent stale content.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Cache-control headers define how long and where a resource can be cached. Examples: `max-age`, `no-store`, `must-revalidate`. They help control freshness and prevent stale content.',
        isCorrect: true,
        explanation:
          'Cache-control headers define how long and where a resource can be cached. Examples: `max-age`, `no-store`, `must-revalidate`. They help control freshness and prevent stale content.',
      },
      {
        id: 'o2',
        text: 'Cache-control headers define how long and where a resource can be cached',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Examples: `max-age`, `no-store`, `must-revalidate`',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 32)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
