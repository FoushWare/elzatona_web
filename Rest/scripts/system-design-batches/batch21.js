const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q67',
    title: 'What is Time to Interactive (TTI) and why is it important?',
    content: 'Explain the TTI metric and its significance for user experience.',
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
      'TTI measures the time until the page becomes fully interactive for users. Lower TTI improves perceived performance and UX.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'TTI measures the time until the page becomes fully interactive for users. Lower TTI improves perceived performance and UX.',
        isCorrect: true,
        explanation:
          'TTI measures the time until the page becomes fully interactive for users. Lower TTI improves perceived performance and UX.',
      },
      {
        id: 'o2',
        text: 'TTI measures the time until the page becomes fully interactive for users',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Lower TTI improves perceived performance and UX',
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
    id: 'system-design-q68',
    title: 'What is Largest Contentful Paint (LCP) and how can you improve it?',
    content: 'Explain LCP and strategies to reduce its value.',
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
      'LCP measures time for the largest visible element to load. Optimize by lazy loading images, compressing resources, using critical CSS, and serving assets via CDN.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'LCP measures time for the largest visible element to load. Optimize by lazy loading images, compressing resources, using critical CSS, and serving assets via CDN.',
        isCorrect: true,
        explanation:
          'LCP measures time for the largest visible element to load. Optimize by lazy loading images, compressing resources, using critical CSS, and serving assets via CDN.',
      },
      {
        id: 'o2',
        text: 'LCP measures time for the largest visible element to load',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Optimize by lazy loading images, compressing resources, using critical CSS, and serving assets via CDN',
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
    id: 'system-design-q69',
    title: 'How do you detect memory leaks in frontend applications?',
    content:
      'Describe methods to identify and fix memory leaks in JavaScript apps.',
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
      'Use Chrome DevTools Memory tab, take heap snapshots, look for detached DOM nodes, and clean up event listeners or intervals to prevent leaks.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use Chrome DevTools Memory tab, take heap snapshots, look for detached DOM nodes, and clean up event listeners or intervals to prevent leaks.',
        isCorrect: true,
        explanation:
          'Use Chrome DevTools Memory tab, take heap snapshots, look for detached DOM nodes, and clean up event listeners or intervals to prevent leaks.',
      },
      {
        id: 'o2',
        text: 'Use Chrome DevTools Memory tab, take heap snapshots, look for detached DOM nodes, and clean up event listeners or intervals to prevent leaks',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 21)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
