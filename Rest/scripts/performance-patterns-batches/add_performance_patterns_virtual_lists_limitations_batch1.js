const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-virtualization-lv6',
    title:
      'What are some limitations of react-window compared to react-virtualized?',
    content: 'List missing features/components in react-window.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Virtual Lists Limitations',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'virtual-lists-limitations', 'advanced'],
    explanation:
      'React-window does not include WindowScroller, AutoSizer, or CellMeasurer by default. These need to be implemented separately if needed.',
    points: 10,
    sampleAnswers: [
      'React-window does not include WindowScroller, AutoSizer, or CellMeasurer by default. These need to be implemented separately if needed.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'React-window does not include WindowScroller, AutoSizer, or CellMeasurer by default. These need to be implemented separately if needed.',
        isCorrect: true,
        explanation:
          'React-window does not include WindowScroller, AutoSizer, or CellMeasurer by default. These need to be implemented separately if needed.',
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
  `✅ Added ${newQuestions.length} questions for Virtual Lists Limitations (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
