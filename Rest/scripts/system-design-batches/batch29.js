const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q91',
    title: 'What is WebSocket and when should you use it?',
    content:
      'Explain WebSocket protocol and its use cases in frontend applications.',
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
      'WebSocket is a full-duplex, persistent connection between client and server for real-time communication. Use it for chat apps, notifications, and live feeds.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'WebSocket is a full-duplex, persistent connection between client and server for real-time communication. Use it for chat apps, notifications, and live feeds.',
        isCorrect: true,
        explanation:
          'WebSocket is a full-duplex, persistent connection between client and server for real-time communication. Use it for chat apps, notifications, and live feeds.',
      },
      {
        id: 'o2',
        text: 'WebSocket is a full-duplex, persistent connection between client and server for real-time communication',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Use it for chat apps, notifications, and live feeds',
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
    id: 'system-design-q92',
    title:
      'What is Server-Sent Events (SSE) and how does it differ from WebSocket?',
    content:
      'Compare SSE and WebSocket in terms of use cases and protocol features.',
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
      "SSE is a unidirectional protocol where server pushes updates to the client over HTTP. Use SSE for live feeds or notifications where the client doesn't need to send frequent data.",
    points: 10,
    options: [
      {
        id: 'o1',
        text: "SSE is a unidirectional protocol where server pushes updates to the client over HTTP. Use SSE for live feeds or notifications where the client doesn't need to send frequent data.",
        isCorrect: true,
        explanation:
          "SSE is a unidirectional protocol where server pushes updates to the client over HTTP. Use SSE for live feeds or notifications where the client doesn't need to send frequent data.",
      },
      {
        id: 'o2',
        text: 'SSE is a unidirectional protocol where server pushes updates to the client over HTTP',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: " Use SSE for live feeds or notifications where the client doesn't need to send frequent data",
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
    id: 'system-design-q93',
    title: 'What is long polling and when is it used?',
    content: 'Explain long polling technique for real-time updates.',
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
      'Long polling is a technique where the client sends a request and the server holds it until data is available. Use it when WebSocket or SSE is not possible.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Long polling is a technique where the client sends a request and the server holds it until data is available. Use it when WebSocket or SSE is not possible.',
        isCorrect: true,
        explanation:
          'Long polling is a technique where the client sends a request and the server holds it until data is available. Use it when WebSocket or SSE is not possible.',
      },
      {
        id: 'o2',
        text: 'Long polling is a technique where the client sends a request and the server holds it until data is available',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Use it when WebSocket or SSE is not possible',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 29)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
