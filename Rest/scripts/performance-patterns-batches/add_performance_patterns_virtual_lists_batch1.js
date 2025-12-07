const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/performance-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'performance-patterns-virtualization-lv1',
    title: 'What is list virtualization (or windowing)?',
    content: 'Explain the concept of list virtualization and its main benefit.',
    type: 'multiple-choice',
    category: 'Performance Patterns',
    topic: 'Virtual Lists',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-11T00:00:00.000Z',
    updatedAt: '2025-11-11T18:50:32.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['performance-patterns', 'virtual-lists', 'beginner', 'intermediate'],
    explanation:
      'List virtualization is a technique where only the visible rows of a list are rendered at a time, rather than the entire list. This improves rendering performance and scroll efficiency.',
    points: 10,
    sampleAnswers: [
      'List virtualization is a technique where only the visible rows of a list are rendered at a time, rather than the entire list. This improves rendering performance and scroll efficiency.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'List virtualization is a technique where only the visible rows of a list are rendered at a time, rather than the entire list. This improves rendering performance and scroll efficiency.',
        isCorrect: true,
        explanation:
          'List virtualization is a technique where only the visible rows of a list are rendered at a time, rather than the entire list. This improves rendering performance and scroll efficiency.',
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
  `✅ Added ${newQuestions.length} questions for Virtual Lists (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
