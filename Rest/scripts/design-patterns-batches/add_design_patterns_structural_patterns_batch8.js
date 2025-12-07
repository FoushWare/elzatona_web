const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-module-pattern-46',
    title: 'Debugging Modules',
    content:
      'If you forget to return a method in your Module Pattern, what will happen?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Structural Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.206Z',
    updatedAt: '2025-11-11T18:36:58.266Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'The correct answer is: The method remains private and cannot be accessed outside',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'The method is still accessible globally',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'The method remains private and cannot be accessed outside',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'JavaScript throws a syntax error',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-module-pattern-47',
    title: 'Module Pattern vs ES6 Modules',
    content: 'How does the Module Pattern differ from ES6 Modules?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Structural Patterns',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.206Z',
    updatedAt: '2025-11-11T18:36:58.266Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'advanced',
      'advanced',
    ],
    explanation:
      'Module Pattern relies on closures and IIFEs for encapsulation, while ES6 Modules are built-in language features with <code>import</code> and <code>export</code>. ES6 Modules are statically analyzed at compile time, while Module Pattern modules are runtime constructs.',
    points: 10,
    sampleAnswers: [
      'Module Pattern relies on closures and IIFEs for encapsulation, while ES6 Modules are built-in language features with `import` and `export`.',
      'ES6 Modules are statically analyzed at compile time, while Module Pattern modules are runtime constructs.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Module Pattern relies on closures and IIFEs for encapsulation, while ES6 Modules are built-in language features with `import` and `export`.',
        isCorrect: true,
        explanation:
          'Module Pattern relies on closures and IIFEs for encapsulation, while ES6 Modules are built-in language features with <code>import</code> and <code>export</code>. ES6 Modules are statically analyzed at compile time, while Module Pattern modules are runtime constructs.',
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
    id: 'design-patterns-module-pattern-48',
    title: 'Use Case of Module Pattern',
    content: 'Which scenario is best suited for the Module Pattern?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Structural Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.206Z',
    updatedAt: '2025-11-11T18:36:58.266Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'The correct answer is: When you want to encapsulate private state in legacy JavaScript without ES6 support',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'When you want to encapsulate private state in legacy JavaScript without ES6 support',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'When you need dynamic imports and tree-shaking',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'When you only work with classes',
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
  `✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 8)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
