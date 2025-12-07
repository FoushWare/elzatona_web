const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/rendering-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'rendering-patterns-rendering10-13',
    title:
      'What is the advantage of performing exit animations immediately after a link click?',
    content:
      'It provides instant feedback while waiting for the new content to load, improving perceived performance.',
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
      'It provides instant feedback while waiting for the new content to load, improving perceived performance.',
    points: 10,
    options: [
      'It improves SEO performance',
      'It reduces memory usage',
      'It offers immediate visual feedback to the user',
      'It prevents animation jank',
    ],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering10-14',
    title:
      'Which library enhances server-side rendered MPAs with SPA-like speeds by replacing the <body> with new HTML from the response?',
    content:
      'Turbo, part of the Hotwire suite, enhances MPAs by replacing the page body dynamically using JavaScript.',
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
      'Turbo, part of the Hotwire suite, enhances MPAs by replacing the page body dynamically using JavaScript.',
    points: 10,
    options: ['Turn', 'Turbo', 'Astro', 'Remix'],
    hints: [
      'Review rendering pattern documentation',
      'Consider server vs client rendering trade-offs',
      'Think about performance and SEO implications',
    ],
  },
  {
    id: 'rendering-patterns-rendering10-15',
    title: 'What is Turn used for in combination with Turbo?',
    content:
      'Turn handles animating page navigations by adding classes like turn-exit and turn-enter to trigger CSS transitions.',
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
      'Turn handles animating page navigations by adding classes like turn-exit and turn-enter to trigger CSS transitions.',
    points: 10,
    options: [
      'It performs server rendering',
      'It adds routing capabilities',
      'It animates page navigations via CSS classes',
      'It caches HTML responses',
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
  `✅ Added ${newQuestions.length} questions for Advanced Patterns (Batch 5)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
