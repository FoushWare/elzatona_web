const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-prototype-pattern-64',
    title: 'Prototype Pitfalls',
    content:
      'Which of the following can be a downside of relying too heavily on prototype chaining?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.281Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'advanced',
      'advanced',
    ],
    explanation:
      'The correct answer is: Deep prototype chains can make debugging difficult and slow property lookups',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Deep prototype chains can make debugging difficult and slow property lookups',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'It prevents dynamic property addition',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'It increases memory usage',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'It makes objects immutable',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-singleton-pattern-76',
    title: 'Singleton Basics',
    content: 'What is the main purpose of the Singleton Pattern in JavaScript?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.296Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'To ensure only one instance of a class or object exists and provide a global point of access to it. It’s often used for managing global state across an application.',
    points: 10,
    sampleAnswers: [
      'To ensure only one instance of a class or object exists and provide a global point of access to it.',
      'It’s often used for managing global state across an application.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'To ensure only one instance of a class or object exists and provide a global point of access to it.',
        isCorrect: true,
        explanation:
          'To ensure only one instance of a class or object exists and provide a global point of access to it. It’s often used for managing global state across an application.',
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
    id: 'design-patterns-singleton-pattern-77',
    title: 'Non-Singleton Counter',
    content:
      'Why does the initial Counter class implementation in the example fail to meet the Singleton requirements?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.296Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'Because multiple instances can still be created using the <code>new</code> keyword. The getInstance method doesn’t enforce a single instance.',
    points: 10,
    sampleAnswers: [
      'Because multiple instances can still be created using the `new` keyword.',
      'The getInstance method doesn’t enforce a single instance.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Because multiple instances can still be created using the `new` keyword.',
        isCorrect: true,
        explanation:
          'Because multiple instances can still be created using the <code>new</code> keyword. The getInstance method doesn’t enforce a single instance.',
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
  `✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 6)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
