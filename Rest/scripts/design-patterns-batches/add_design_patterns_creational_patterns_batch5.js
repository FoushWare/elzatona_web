const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-prototype-pattern-61',
    title: 'Inheritance with Prototype',
    content:
      'In the SuperDog example, how does SuperDog gain access to bark() from Dog?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.281Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'The correct answer is: By extending Dog, SuperDog.prototype.__proto__ points to Dog.prototype',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Through Object.assign copying methods',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'By extending Dog, SuperDog.prototype.__proto__ points to Dog.prototype',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Each SuperDog has its own bark() copy',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'By redefining bark in the constructor',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-prototype-pattern-62',
    title: 'Object.create Use Case',
    content: 'What does Object.create allow you to do?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.281Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'It creates a new object with its prototype explicitly set to the provided object. This lets you directly inherit properties without using classes or constructors.',
    points: 10,
    sampleAnswers: [
      'It creates a new object with its prototype explicitly set to the provided object.',
      'This lets you directly inherit properties without using classes or constructors.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It creates a new object with its prototype explicitly set to the provided object.',
        isCorrect: true,
        explanation:
          'It creates a new object with its prototype explicitly set to the provided object. This lets you directly inherit properties without using classes or constructors.',
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
    id: 'design-patterns-prototype-pattern-63',
    title: 'Prototype Pattern Advantages',
    content: 'What are two main advantages of the Prototype Pattern?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.281Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'It reduces memory usage by sharing methods across instances. It allows dynamic extension of behavior by modifying the prototype.',
    points: 10,
    sampleAnswers: [
      'It reduces memory usage by sharing methods across instances.',
      'It allows dynamic extension of behavior by modifying the prototype.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It reduces memory usage by sharing methods across instances.',
        isCorrect: true,
        explanation:
          'It reduces memory usage by sharing methods across instances. It allows dynamic extension of behavior by modifying the prototype.',
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
  `✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 5)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
