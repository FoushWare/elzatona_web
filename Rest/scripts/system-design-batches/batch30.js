const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q94',
    title: 'What are the pros and cons of WebSocket vs SSE vs long polling?',
    content:
      'Compare these real-time strategies in terms of latency, scalability, and complexity.',
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
      'WebSocket: low latency, bidirectional, more complex, heavier on server.\nSSE: simple, unidirectional, uses HTTP, auto-reconnect, limited to text/event-stream.\nLong Polling: compatible with HTTP, higher latency, server holds connections, less efficient.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'WebSocket: low latency, bidirectional, more complex, heavier on server.\nSSE: simple, unidirectional, uses HTTP, auto-reconnect, limited to text/event-stream.\nLong Polling: compatible with HTTP, higher...',
        isCorrect: true,
        explanation:
          'WebSocket: low latency, bidirectional, more complex, heavier on server.\nSSE: simple, unidirectional, uses HTTP, auto-reconnect, limited to text/event-stream.\nLong Polling: compatible with HTTP, higher latency, server holds connections, less efficient.',
      },
      {
        id: 'o2',
        text: 'WebSocket: low latency, bidirectional, more complex, heavier on server',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: '\nSSE: simple, unidirectional, uses HTTP, auto-reconnect, limited to text/event-stream',
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
    id: 'system-design-q95',
    title: 'How do you handle reconnection logic in real-time frontend apps?',
    content: 'Describe strategies to maintain real-time connectivity.',
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
      'Implement exponential backoff retry, detect disconnections, optionally queue messages during downtime, and re-subscribe to channels after reconnect.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Implement exponential backoff retry, detect disconnections, optionally queue messages during downtime, and re-subscribe to channels after reconnect.',
        isCorrect: true,
        explanation:
          'Implement exponential backoff retry, detect disconnections, optionally queue messages during downtime, and re-subscribe to channels after reconnect.',
      },
      {
        id: 'o2',
        text: 'Implement exponential backoff retry, detect disconnections, optionally queue messages during downtime, and re-subscribe to channels after reconnect',
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
    id: 'system-design-q96',
    title:
      'What are the best practices for handling high-frequency real-time data in the frontend?',
    content:
      'Explain strategies to manage performance when receiving frequent updates.',
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
      'Throttle or debounce updates, batch multiple events into a single render, use virtualization for lists, and avoid unnecessary state updates.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Throttle or debounce updates, batch multiple events into a single render, use virtualization for lists, and avoid unnecessary state updates.',
        isCorrect: true,
        explanation:
          'Throttle or debounce updates, batch multiple events into a single render, use virtualization for lists, and avoid unnecessary state updates.',
      },
      {
        id: 'o2',
        text: 'Throttle or debounce updates, batch multiple events into a single render, use virtualization for lists, and avoid unnecessary state updates',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 30)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
