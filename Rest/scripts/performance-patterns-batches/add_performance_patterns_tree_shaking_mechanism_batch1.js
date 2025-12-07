const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-tree-shaking-ts5',
    title:
      'How does tree shaking determine which parts of the code to include?',
    content: 'Explain the traversal process used in tree shaking.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Tree Shaking Mechanism',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.264Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'tree-shaking-mechanism', 'advanced'],
    explanation:
      'Tree shaking starts at the entry point and traverses the dependency graph, marking only the code paths that are used. Unused paths are excluded from the final bundle.',
    points: 10,
    sampleAnswers: [
      'Tree shaking starts at the entry point and traverses the dependency graph, marking only the code paths that are used. Unused paths are excluded from the final bundle.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Tree shaking starts at the entry point and traverses the dependency graph, marking only the code paths that are used. Unused paths are excluded from the final bundle.',
        isCorrect: true,
        explanation:
          'Tree shaking starts at the entry point and traverses the dependency graph, marking only the code paths that are used. Unused paths are excluded from the final bundle.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review performance optimization concepts.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer is different.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o5',
        text: 'Not quite. Consider web performance best practices.',
        isCorrect: false,
        explanation: '',
      },
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
  `✅ Added ${newQuestions.length} questions for Tree Shaking Mechanism (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
