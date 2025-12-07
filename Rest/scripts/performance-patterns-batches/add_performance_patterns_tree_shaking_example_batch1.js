const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-tree-shaking-ts4',
    title:
      'Given the following code, which function will be included in the final bundle?',
    content:
      "<pre><code>// utilities.js\nexport function read(props) { return props.book; }\nexport function nap(props) { return props.winks; }\n\n// index.js\nimport { read } from 'utilities';\nconst eventHandler = (e) =&gt; { read({ book: e.target.value }); };</code></pre>",
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Tree Shaking Example',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.264Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'tree-shaking-example', 'intermediate'],
    explanation:
      'Only read() is used in index.js, so nap() is considered dead code and excluded from the bundle.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'read()',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'nap()',
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
  `✅ Added ${newQuestions.length} questions for Tree Shaking Example (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
