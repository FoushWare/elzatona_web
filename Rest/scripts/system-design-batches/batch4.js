const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q13',
    title: 'What is tree-shaking in JavaScript bundling?',
    content: 'Explain how tree-shaking improves frontend performance.',
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
      'Tree-shaking is the process of removing unused code from bundles during build time. It reduces bundle size and improves performance.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Tree-shaking is the process of removing unused code from bundles during build time. It reduces bundle size and improves performance.',
        isCorrect: true,
        explanation:
          'Tree-shaking is the process of removing unused code from bundles during build time. It reduces bundle size and improves performance.',
      },
      {
        id: 'o2',
        text: 'Tree-shaking is the process of removing unused code from bundles during build time',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' It reduces bundle size and improves performance',
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
    id: 'system-design-q14',
    title: 'What are the main principles of accessibility in frontend design?',
    content:
      'List core accessibility principles (POUR: Perceivable, Operable, Understandable, Robust).',
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
    explanation: 'Accessibility guidelines are based on POUR principles.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Perceivable',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Operable',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Understandable',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Robust',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o5',
        text: 'Fast',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q15',
    title: 'How do you ensure keyboard accessibility in components?',
    content: 'Explain best practices for making UI accessible via keyboard.',
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
      'Ensure focusable elements use tabindex correctly, use semantic HTML elements, and manage focus state when modals or dialogs open.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Ensure focusable elements use tabindex correctly, use semantic HTML elements, and manage focus state when modals or dialogs open.',
        isCorrect: true,
        explanation:
          'Ensure focusable elements use tabindex correctly, use semantic HTML elements, and manage focus state when modals or dialogs open.',
      },
      {
        id: 'o2',
        text: 'Ensure focusable elements use tabindex correctly, use semantic HTML elements, and manage focus state when modals or dialogs open',
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
  `✅ Added ${newQuestions.length} system design questions (Batch 4)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
