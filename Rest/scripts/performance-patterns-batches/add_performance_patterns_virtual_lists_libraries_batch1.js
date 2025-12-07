const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-virtualization-lv2',
    title:
      'Why is react-window preferred over react-virtualized in some cases?',
    content:
      'Describe the differences between react-window and react-virtualized and why react-window might be chosen.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Virtual Lists Libraries',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'virtual-lists-libraries', 'intermediate'],
    explanation:
      'React-window is smaller, faster, and more tree-shakeable than react-virtualized. It provides simpler APIs for most virtualization use cases and reduces bundle size significantly.',
    points: 10,
    sampleAnswers: [
      'React-window is smaller, faster, and more tree-shakeable than react-virtualized. It provides simpler APIs for most virtualization use cases and reduces bundle size significantly.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'React-window is smaller, faster, and more tree-shakeable than react-virtualized. It provides simpler APIs for most virtualization use cases and reduces bundle size significantly.',
        isCorrect: true,
        explanation:
          'React-window is smaller, faster, and more tree-shakeable than react-virtualized. It provides simpler APIs for most virtualization use cases and reduces bundle size significantly.',
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
  `✅ Added ${newQuestions.length} questions for Virtual Lists Libraries (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
