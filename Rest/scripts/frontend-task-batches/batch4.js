const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/react-questions.json'
);

const newQuestions = [
  {
    id: 'react-ft-10',
    title: 'How do you optimize a frontend task with large lists of items?',
    content:
      'You need to render 1000+ items in a list. What optimization technique should you use?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'Virtualization renders only visible items in viewport, dramatically improving performance for large lists. Libraries like react-window handle this.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use virtualization (react-window or react-virtualized) to render only visible items',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Render all items at once',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use display: none to hide items',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Split into multiple pages only',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
    metadata: {},
  },
  {
    id: 'react-ft-11',
    title:
      'How should you optimize images in a frontend task like an e-commerce site?',
    content:
      'Your product catalog has hundreds of product images. How do you optimize loading?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'Lazy load images, use responsive srcset, modern formats like WebP, and CDN. Only load images when needed and at appropriate sizes.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use lazy loading, responsive images with srcset, WebP format, and image CDN with proper sizing',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Load all images at once',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Use only PNG format',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: "Don't optimize - let browser handle it",
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
    metadata: {},
  },
  {
    id: 'react-ft-12',
    title:
      'What is code splitting and how should you implement it in a frontend task?',
    content:
      'Your app is getting large. How do you reduce initial bundle size?',
    type: 'multiple-choice',
    category: 'React',
    topic: 'Core React',
    difficulty: 'intermediate',
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: '2025-11-11T19:33:22.944Z',
    updatedAt: '2025-11-11T19:33:22.944Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['react', 'frontend-tasks', 'core-react', 'intermediate'],
    explanation:
      'React.lazy() enables code splitting. Use it with Suspense for route-based splitting. Dynamic imports split heavy components.',
    points: 15,
    options: [
      {
        id: 'o1',
        text: 'Use React.lazy() and Suspense for route-based code splitting, and dynamic imports for heavy components',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Bundle everything into one file',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Split code manually by copying files',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Code splitting is not possible in React',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
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
  `✅ Added ${newQuestions.length} frontend task questions (Batch 4)`
);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
