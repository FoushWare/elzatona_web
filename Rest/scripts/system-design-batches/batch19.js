const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q61',
    title: 'How do you measure frontend network performance?',
    content:
      'Explain tools and metrics used to analyze network requests in frontend applications.',
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
      'Use browser dev tools, Lighthouse, or WebPageTest to measure TTFB, total request size, request count, and loading time for critical assets.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use browser dev tools, Lighthouse, or WebPageTest to measure TTFB, total request size, request count, and loading time for critical assets.',
        isCorrect: true,
        explanation:
          'Use browser dev tools, Lighthouse, or WebPageTest to measure TTFB, total request size, request count, and loading time for critical assets.',
      },
      {
        id: 'o2',
        text: 'Use browser dev tools, Lighthouse, or WebPageTest to measure TTFB, total request size, request count, and loading time for critical assets',
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
    id: 'system-design-q62',
    title: 'What is a frontend performance budget and why is it important?',
    content:
      'Describe the concept of a performance budget and how it helps maintain good UX.',
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
      'A performance budget sets limits on page weight, script size, or request counts to prevent regressions and maintain fast load times.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'A performance budget sets limits on page weight, script size, or request counts to prevent regressions and maintain fast load times.',
        isCorrect: true,
        explanation:
          'A performance budget sets limits on page weight, script size, or request counts to prevent regressions and maintain fast load times.',
      },
      {
        id: 'o2',
        text: 'A performance budget sets limits on page weight, script size, or request counts to prevent regressions and maintain fast load times',
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
    id: 'system-design-q63',
    title: 'How do you profile and optimize JavaScript performance?',
    content: 'Explain techniques for identifying and fixing slow JS execution.',
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
      'Use Chrome DevTools Performance tab to record JS execution, identify long tasks, optimize loops, debounce/throttle events, and memoize expensive calculations.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use Chrome DevTools Performance tab to record JS execution, identify long tasks, optimize loops, debounce/throttle events, and memoize expensive calculations.',
        isCorrect: true,
        explanation:
          'Use Chrome DevTools Performance tab to record JS execution, identify long tasks, optimize loops, debounce/throttle events, and memoize expensive calculations.',
      },
      {
        id: 'o2',
        text: 'Use Chrome DevTools Performance tab to record JS execution, identify long tasks, optimize loops, debounce/throttle events, and memoize expensive calculations',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 19)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
