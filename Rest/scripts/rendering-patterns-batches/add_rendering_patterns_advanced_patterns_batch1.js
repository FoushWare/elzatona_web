const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering10-1',
    title: 'What is the purpose of the View Transitions API?',
    content:
      'It provides a simple way to animate visual DOM changes between two states, enabling smooth transitions between UI views or pages.',
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
      'It provides a simple way to animate visual DOM changes between two states, enabling smooth transitions between UI views or pages.',
    points: 10,
    options: [
      'To animate data fetching operations',
      'To transition visual changes between DOM states smoothly',
      'To handle form validation errors visually',
      'To optimize network requests',
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering10-2',
    title: 'Which method is central to the View Transitions API?',
    content:
      'The document.startViewTransition(callback) method initiates a view transition and calls the provided callback to update the DOM.',
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
      'The document.startViewTransition(callback) method initiates a view transition and calls the provided callback to update the DOM.',
    points: 10,
    options: [
      'document.animateTransition()',
      'window.beginViewChange()',
      'document.startViewTransition()',
      'window.transitionTo()',
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering10-3',
    title:
      'What does document.startViewTransition(callback) do before executing the callback?',
    content:
      'It takes a screenshot of the current DOM state before applying the callback changes.',
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
      'It takes a screenshot of the current DOM state before applying the callback changes.',
    points: 10,
    options: [
      'Preloads all CSS animations',
      'Takes a screenshot of the current DOM',
      'Stores a snapshot of localStorage',
      'Pauses all event listeners',
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
  `✅ Added ${newQuestions.length} questions for Advanced Patterns (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
