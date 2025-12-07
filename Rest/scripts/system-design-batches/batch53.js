const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-senior-4',
    title: 'How do you design a frontend monitoring and error tracking system?',
    content:
      'You need to monitor frontend performance and track errors in production. What approach would you take?',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-11-11T20:11:00.309Z',
    updatedAt: '2025-11-11T20:11:00.309Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'senior', 'intermediate'],
    explanation:
      'Error boundaries catch React errors. Sentry provides error tracking and context. Web Vitals measure Core Web Vitals. Custom events track business metrics. Sampling reduces performance impact.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use error boundaries, Sentry/LogRocket for error tracking, Web Vitals API for performance metrics, custom analytics events, and sampling to reduce overhead',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Use only console.log',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Track everything without sampling',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'No monitoring needed',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider system design principles and scalability',
      'Think about performance and user experience',
      'Review frontend architecture patterns',
    ],
    metadata: {},
  },
  {
    id: 'system-design-senior-5',
    title:
      'How would you design a frontend state synchronization system for offline-first apps?',
    content:
      'Your app needs to work offline and sync when online. How would you handle state synchronization?',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-11-11T20:11:00.309Z',
    updatedAt: '2025-11-11T20:11:00.309Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'senior', 'intermediate'],
    explanation:
      'IndexedDB provides robust local storage. Mutation queue stores offline changes. Conflict resolution handles concurrent edits. Background Sync API syncs when connection restored.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use IndexedDB for local storage, queue mutations when offline, implement conflict resolution strategy, and use background sync API',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Disable app when offline',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use only localStorage',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Sync immediately without queuing',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider system design principles and scalability',
      'Think about performance and user experience',
      'Review frontend architecture patterns',
    ],
    metadata: {},
  },
  {
    id: 'system-design-senior-6',
    title: 'How do you design a frontend feature flag system?',
    content:
      'You need to enable/disable features without deploying. How would you implement feature flags?',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-11-11T20:11:00.309Z',
    updatedAt: '2025-11-11T20:11:00.309Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'senior', 'intermediate'],
    explanation:
      'Feature flag services enable runtime toggling. Client-side caching reduces latency. Gradual rollout minimizes risk. Fallback defaults ensure app stability.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use a feature flag service (LaunchDarkly, Split.io), cache flags client-side, implement gradual rollout, and provide fallback defaults',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Hardcode feature flags in code',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use only environment variables',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Feature flags are not needed',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider system design principles and scalability',
      'Think about performance and user experience',
      'Review frontend architecture patterns',
    ],
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
  `✅ Added ${newQuestions.length} system design questions (Batch 53)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
