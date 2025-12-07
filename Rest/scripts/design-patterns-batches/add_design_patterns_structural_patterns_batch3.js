const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-flyweight-pattern-23',
    title: 'When to Use Flyweight',
    content:
      'In which situation would the Flyweight Pattern be the best choice?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Structural Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.205Z',
    updatedAt: '2025-11-11T18:36:58.260Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'The correct answer is: When creating thousands of objects that share common properties',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'When creating thousands of objects that share common properties',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'When creating a single instance of a service',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'When caching API responses',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'When setting up event delegation in DOM',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-flyweight-pattern-24',
    title: 'Flyweight Pattern in Modern JS',
    content:
      'Why is the Flyweight Pattern considered less critical in modern JavaScript applications compared to older times?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Structural Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.205Z',
    updatedAt: '2025-11-11T18:36:58.260Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary. JavaScript engines also optimize memory allocation internally.',
    points: 10,
    sampleAnswers: [
      'Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary.',
      'JavaScript engines also optimize memory allocation internally.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary.',
        isCorrect: true,
        explanation:
          'Because modern devices have large amounts of memory (RAM), so optimizing object count is less often necessary. JavaScript engines also optimize memory allocation internally.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review the design pattern concepts.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer is different.',
        isCorrect: false,
        explanation: '',
      },
    ],
  },
  {
    id: 'design-patterns-mixin-pattern-33',
    title: 'Definition of Mixin Pattern',
    content: 'What is the Mixin Pattern and why is it used?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Structural Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.206Z',
    updatedAt: '2025-11-11T18:36:58.264Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'mixin-pattern', 'beginner', 'intermediate'],
    explanation:
      'A mixin is an object containing reusable functionality that can be added to another object or class without inheritance. It allows sharing behavior across classes without forming rigid inheritance hierarchies.',
    points: 10,
    sampleAnswers: [
      'A mixin is an object containing reusable functionality that can be added to another object or class without inheritance.',
      'It allows sharing behavior across classes without forming rigid inheritance hierarchies.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'A mixin is an object containing reusable functionality that can be added to another object or class without inheritance.',
        isCorrect: true,
        explanation:
          'A mixin is an object containing reusable functionality that can be added to another object or class without inheritance. It allows sharing behavior across classes without forming rigid inheritance hierarchies.',
      },
      {
        id: 'o2',
        text: 'This is not correct. Please refer to the explanation.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Incorrect. Review the design pattern concepts.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is a common misconception. The correct answer is different.',
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
  `✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
