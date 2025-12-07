const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-virtualization-lv5',
    title: 'Which components in react-window render virtualized content?',
    content:
      'Name and describe the main components in react-window used for list and grid virtualization.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'React-Window Components',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'react-window-components', 'intermediate'],
    explanation:
      'react-window provides FixedSizeList/VariableSizeList for virtualized lists and FixedSizeGrid/VariableSizeGrid for virtualized grids.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'FixedSizeList and VariableSizeList for lists; FixedSizeGrid and VariableSizeGrid for grids',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'InfiniteScrollList and TableGrid',
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
  `✅ Added ${newQuestions.length} questions for React-Window Components (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
