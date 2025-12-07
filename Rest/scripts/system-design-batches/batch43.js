const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q133',
    title: 'What is Synthetic Monitoring and how is it different from RUM?',
    content:
      'Compare synthetic monitoring with real user monitoring for frontend apps.',
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
      'The correct answer is: Synthetic monitoring simulates user interactions with scripts',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Synthetic monitoring simulates user interactions with scripts',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'RUM measures actual user interactions',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Synthetic monitoring always gives more accurate results than RUM',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'RUM does not work for frontend applications',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q134',
    title: 'What are Core Web Vitals and why are they important?',
    content:
      "Explain Google's Core Web Vitals and their impact on frontend design and SEO.",
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
      'Core Web Vitals (LCP, FID, CLS) are user-focused performance metrics. They measure load speed, interactivity, and visual stability. They directly affect SEO rankings and user experience.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Core Web Vitals (LCP, FID, CLS) are user-focused performance metrics. They measure load speed, interactivity, and visual stability. They directly affect SEO rankings and user experience.',
        isCorrect: true,
        explanation:
          'Core Web Vitals (LCP, FID, CLS) are user-focused performance metrics. They measure load speed, interactivity, and visual stability. They directly affect SEO rankings and user experience.',
      },
      {
        id: 'o2',
        text: 'Core Web Vitals (LCP, FID, CLS) are user-focused performance metrics',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' They measure load speed, interactivity, and visual stability',
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
    id: 'system-design-q135',
    title: 'How can you capture and log JavaScript errors in production?',
    content: 'Explain different ways to handle and log frontend errors.',
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
      'Use <code>window.onerror</code> and <code>unhandledrejection</code> to capture errors, then send them to monitoring tools like Sentry, Datadog, or custom APIs for logging and alerting.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use `window.onerror` and `unhandledrejection` to capture errors, then send them to monitoring tools like Sentry, Datadog, or custom APIs for logging and alerting.',
        isCorrect: true,
        explanation:
          'Use `window.onerror` and `unhandledrejection` to capture errors, then send them to monitoring tools like Sentry, Datadog, or custom APIs for logging and alerting.',
      },
      {
        id: 'o2',
        text: 'onerror` and `unhandledrejection` to capture errors, then send them to monitoring tools like Sentry, Datadog, or custom APIs for logging and alerting',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 43)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
