const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering10-4',
    title:
      'Which CSS pseudo-elements allow developers to style the before and after states of a transition?',
    content:
      'Developers can use ::view-transition-old(root) and ::view-transition-new(root) to style the old and new DOM states during a transition.',
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
      'Developers can use ::view-transition-old(root) and ::view-transition-new(root) to style the old and new DOM states during a transition.',
    points: 10,
    options: [
      '::before and ::after',
      '::view-transition-old(root) and ::view-transition-new(root)',
      '::transition-old and ::transition-new',
      '::prev-state and ::next-state',
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering10-5',
    title:
      'What is the role of view-transition-name in the View Transitions API?',
    content:
      'It assigns a unique name to elements so that matching elements across states can be smoothly animated together.',
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
      'It assigns a unique name to elements so that matching elements across states can be smoothly animated together.',
    points: 10,
    options: [
      'It defines a CSS keyframe',
      'It assigns an animation ID for transitions',
      'It uniquely identifies elements for smooth state transitions',
      'It determines animation duration',
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering10-6',
    title: 'What happens to the DOM during a view transition callback?',
    content:
      'The DOM becomes non-interactive (frozen) until the callback and transition animation complete.',
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
      'The DOM becomes non-interactive (frozen) until the callback and transition animation complete.',
    points: 10,
    options: [
      'The DOM remains interactive',
      'The DOM becomes non-interactive until the callback resolves',
      'Only CSS changes are blocked',
      'Event listeners are temporarily removed',
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
  `✅ Added ${newQuestions.length} questions for Advanced Patterns (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
