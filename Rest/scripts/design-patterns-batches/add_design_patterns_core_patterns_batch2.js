const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-common-pattern-4',
    title: 'Cons of Common Pattern',
    content: 'What is a major drawback of the Common Pattern?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Core Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.204Z',
    updatedAt: '2025-11-11T18:36:58.256Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'It doesn’t scale well because every object must be defined manually. Code duplication increases with many similar objects.',
    points: 10,
    sampleAnswers: [
      'It doesn’t scale well because every object must be defined manually.',
      'Code duplication increases with many similar objects.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It doesn’t scale well because every object must be defined manually.',
        isCorrect: true,
        explanation:
          'It doesn’t scale well because every object must be defined manually. Code duplication increases with many similar objects.',
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
    id: 'design-patterns-common-pattern-5',
    title: 'Repetition Problem',
    content:
      'Why might using the Common Pattern cause problems when creating many similar objects?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Core Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.204Z',
    updatedAt: '2025-11-11T18:36:58.256Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'Because you need to repeat the same properties and methods for each object. It leads to duplication and makes changes harder to maintain.',
    points: 10,
    sampleAnswers: [
      'Because you need to repeat the same properties and methods for each object.',
      'It leads to duplication and makes changes harder to maintain.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Because you need to repeat the same properties and methods for each object.',
        isCorrect: true,
        explanation:
          'Because you need to repeat the same properties and methods for each object. It leads to duplication and makes changes harder to maintain.',
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
    id: 'design-patterns-common-pattern-6',
    title: 'Debugging Common Pattern',
    content:
      "Find the bug in this code:\n\n<pre><code>const car = {\n  brand: 'Toyota',\n  model: 'Corolla',\n  getDetails: () =&gt; <code>${this.brand} ${this.model}</code>\n};\n\nconsole.log(car.getDetails());</code></pre>",
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Core Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.204Z',
    updatedAt: '2025-11-11T18:36:58.256Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'The arrow function doesn’t bind <code>this</code> properly, so <code>this.brand</code> and <code>this.model</code> are undefined. Use a regular function instead of an arrow function.',
    points: 10,
    sampleAnswers: [
      'The arrow function doesn’t bind `this` properly, so `this.brand` and `this.model` are undefined.',
      'Use a regular function instead of an arrow function.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'The arrow function doesn’t bind `this` properly, so `this.brand` and `this.model` are undefined.',
        isCorrect: true,
        explanation:
          'The arrow function doesn’t bind <code>this</code> properly, so <code>this.brand</code> and <code>this.model</code> are undefined. Use a regular function instead of an arrow function.',
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
  `✅ Added ${newQuestions.length} questions for Core Patterns (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
