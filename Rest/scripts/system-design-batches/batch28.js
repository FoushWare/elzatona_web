const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q88',
    title:
      'What UX considerations should be taken for performance-sensitive pages?',
    content: 'Discuss UX strategies to improve perceived performance.',
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
      'Use skeleton loaders, progressive rendering, lazy load images and components, provide feedback for user actions, and prioritize above-the-fold content.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Use skeleton loaders, progressive rendering, lazy load images and components, provide feedback for user actions, and prioritize above-the-fold content.',
        isCorrect: true,
        explanation:
          'Use skeleton loaders, progressive rendering, lazy load images and components, provide feedback for user actions, and prioritize above-the-fold content.',
      },
      {
        id: 'o2',
        text: 'Use skeleton loaders, progressive rendering, lazy load images and components, provide feedback for user actions, and prioritize above-the-fold content',
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
    id: 'system-design-q89',
    title:
      'What is the difference between progressive enhancement and graceful degradation?',
    content: 'Explain these two strategies in frontend development.',
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
      'The correct answer is: Progressive enhancement starts with basic functionality and adds features for modern browsers',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Progressive enhancement starts with basic functionality and adds features for modern browsers',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Graceful degradation starts with full features and reduces functionality for older browsers',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'They are exactly the same',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q90',
    title:
      'How do you ensure a frontend app is usable for all users, including those with disabilities?',
    content: 'Describe strategies for inclusive frontend design.',
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
      'Follow WCAG guidelines, use semantic HTML, ARIA roles, keyboard navigable interfaces, screen reader testing, color contrast compliance, and responsive layouts.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Follow WCAG guidelines, use semantic HTML, ARIA roles, keyboard navigable interfaces, screen reader testing, color contrast compliance, and responsive layouts.',
        isCorrect: true,
        explanation:
          'Follow WCAG guidelines, use semantic HTML, ARIA roles, keyboard navigable interfaces, screen reader testing, color contrast compliance, and responsive layouts.',
      },
      {
        id: 'o2',
        text: 'Follow WCAG guidelines, use semantic HTML, ARIA roles, keyboard navigable interfaces, screen reader testing, color contrast compliance, and responsive layouts',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 28)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
