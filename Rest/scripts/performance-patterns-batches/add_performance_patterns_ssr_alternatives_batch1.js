const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-dynamic-import-18',
    title:
      'What library is recommended for dynamic imports in SSR applications?',
    content:
      'The loadable-components library is recommended for SSR applications since React Suspense does not yet support SSR.',
    type: 'mcq',
    category: 'Performance Patterns',
    topic: 'SSR Alternatives',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2025-11-11T18:50:32.188Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'ssr-alternatives', null, 'intermediate'],
    explanation:
      'The <code>@loadable/component</code> library provides a Suspense-like API compatible with both SSR and CSR environments.',
    points: 10,
    options: [
      {
        0: 'R',
        1: 'e',
        2: 'a',
        3: 'c',
        4: 't',
        5: '.',
        6: 'l',
        7: 'a',
        8: 'z',
        9: 'y',
        explanation: '',
      },
      {
        0: 'R',
        1: 'e',
        2: 'a',
        3: 'c',
        4: 't',
        5: '.',
        6: 'S',
        7: 'u',
        8: 's',
        9: 'p',
        10: 'e',
        11: 'n',
        12: 's',
        13: 'e',
        explanation: '',
      },
      {
        0: '@',
        1: 'l',
        2: 'o',
        3: 'a',
        4: 'd',
        5: 'a',
        6: 'b',
        7: 'l',
        8: 'e',
        9: '/',
        10: 'c',
        11: 'o',
        12: 'm',
        13: 'p',
        14: 'o',
        15: 'n',
        16: 'e',
        17: 'n',
        18: 't',
        explanation: '',
      },
      {
        0: 'N',
        1: 'e',
        2: 'x',
        3: 't',
        4: 'D',
        5: 'y',
        6: 'n',
        7: 'a',
        8: 'm',
        9: 'i',
        10: 'c',
        explanation: '',
      },
    ],
    sampleAnswers: ['@loadable/component'],
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
  `✅ Added ${newQuestions.length} questions for SSR Alternatives (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
