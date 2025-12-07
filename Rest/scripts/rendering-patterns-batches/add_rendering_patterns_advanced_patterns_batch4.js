const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering10-10',
    title: 'What does the componentDidUpdate() method do in the React example?',
    content:
      'It resolves the promise returned during the DOM update, notifying the View Transition API that the DOM has been updated.',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Advanced Patterns',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.539Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'advanced-patterns', 'advanced'],
    explanation:
      'It resolves the promise returned during the DOM update, notifying the View Transition API that the DOM has been updated.',
    points: 10,
    options: [
      'Starts a new transition',
      'Forces a DOM re-render',
      'Resolves the update promise for the transition',
      'Triggers a fade-out animation',
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering10-11',
    title: 'Why is React’s strict mode disabled in the Next.js example?',
    content:
      'Because React’s strict mode causes double rendering in development, interfering with the transition flow.',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Advanced Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.539Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'advanced-patterns', 'intermediate'],
    explanation:
      'Because React’s strict mode causes double rendering in development, interfering with the transition flow.',
    points: 10,
    options: [
      'It breaks routing',
      'It prevents componentDidUpdate from firing',
      'It causes components to render twice and disrupts transitions',
      'It disables animation hooks',
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering10-12',
    title:
      'What is the main limitation of using the View Transitions API for page transitions?',
    content:
      'It requires the new page HTML to be available before animating, potentially delaying feedback for users.',
    type: 'multiple-choice',
    category: 'Rendering Patterns',
    topic: 'Advanced Patterns',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-11-11T18:59:32.539Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['rendering-patterns', 'advanced-patterns', 'advanced'],
    explanation:
      'It requires the new page HTML to be available before animating, potentially delaying feedback for users.',
    points: 10,
    options: [
      'It only supports inline styles',
      'It can’t animate DOM elements',
      'It needs new page HTML before animating',
      'It blocks network requests',
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
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
  `✅ Added ${newQuestions.length} questions for Advanced Patterns (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
