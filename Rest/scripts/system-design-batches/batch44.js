const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q136',
    title:
      'What is distributed tracing and how does it apply to frontend apps?',
    content:
      'Explain distributed tracing in microservices and how frontend can participate.',
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
      'Distributed tracing follows a request across multiple services. Frontend apps can pass trace IDs in headers, enabling correlation between frontend interactions and backend service performance.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Distributed tracing follows a request across multiple services. Frontend apps can pass trace IDs in headers, enabling correlation between frontend interactions and backend service performance.',
        isCorrect: true,
        explanation:
          'Distributed tracing follows a request across multiple services. Frontend apps can pass trace IDs in headers, enabling correlation between frontend interactions and backend service performance.',
      },
      {
        id: 'o2',
        text: 'Distributed tracing follows a request across multiple services',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Frontend apps can pass trace IDs in headers, enabling correlation between frontend interactions and backend service performance',
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
    id: 'system-design-q137',
    title: 'How do you monitor frontend API calls?',
    content:
      'Discuss ways to track the performance and errors of API calls from the frontend.',
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
      'You can wrap fetch/axios calls to log response times, status codes, and errors. Monitoring tools can capture API latency and availability directly from the client side.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'You can wrap fetch/axios calls to log response times, status codes, and errors. Monitoring tools can capture API latency and availability directly from the client side.',
        isCorrect: true,
        explanation:
          'You can wrap fetch/axios calls to log response times, status codes, and errors. Monitoring tools can capture API latency and availability directly from the client side.',
      },
      {
        id: 'o2',
        text: 'You can wrap fetch/axios calls to log response times, status codes, and errors',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Monitoring tools can capture API latency and availability directly from the client side',
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
    id: 'system-design-q138',
    title: 'What are common tools for frontend monitoring and logging?',
    content:
      'List and explain popular monitoring/logging tools used in frontend system design.',
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
      'Sentry, LogRocket, Datadog, New Relic, Elastic APM, and OpenTelemetry are commonly used for frontend monitoring, logging, and observability.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Sentry, LogRocket, Datadog, New Relic, Elastic APM, and OpenTelemetry are commonly used for frontend monitoring, logging, and observability.',
        isCorrect: true,
        explanation:
          'Sentry, LogRocket, Datadog, New Relic, Elastic APM, and OpenTelemetry are commonly used for frontend monitoring, logging, and observability.',
      },
      {
        id: 'o2',
        text: 'Sentry, LogRocket, Datadog, New Relic, Elastic APM, and OpenTelemetry are commonly used for frontend monitoring, logging, and observability',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 44)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
