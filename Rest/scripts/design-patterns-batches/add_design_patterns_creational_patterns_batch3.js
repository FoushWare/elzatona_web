const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-factory-pattern-15',
    title: 'Comparison with Constructor Pattern',
    content:
      'How does the Factory Pattern differ from the Constructor Pattern in JavaScript?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.205Z',
    updatedAt: '2025-11-11T18:36:58.257Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'advanced',
      'advanced',
    ],
    explanation:
      'Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with <code>new</code>. Factories don’t require <code>this</code> or <code>new</code> keyword.',
    points: 10,
    sampleAnswers: [
      'Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with `new`.',
      'Factories don’t require `this` or `new` keyword.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with `new`.',
        isCorrect: true,
        explanation:
          'Factory Pattern uses plain functions to return objects, while Constructor Pattern uses classes or functions with <code>new</code>. Factories don’t require <code>this</code> or <code>new</code> keyword.',
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
    id: 'design-patterns-factory-pattern-16',
    title: 'Dynamic Factory Example',
    content:
      'What will this return?\n\n<pre><code>const createObjectFromArray = ([key, value]) =&gt; ({\n  [key]: value,\n});\n\nconsole.log(createObjectFromArray(["name", "Alice"]));</code></pre>',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.205Z',
    updatedAt: '2025-11-11T18:36:58.257Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation: 'The correct answer is: { name: "Alice" }',
    points: 10,
    options: [
      {
        id: 'a',
        text: '{ key: "name", value: "Alice" }',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: '{ name: "Alice" }',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'undefined',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-prototype-pattern-57',
    title: 'Definition of Prototype Pattern',
    content:
      'What is the Prototype Pattern and why is it useful in JavaScript?',
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
      'The Prototype Pattern allows objects to share properties and methods through the prototype chain. It avoids duplication and reduces memory usage by letting instances inherit methods from the prototype instead of redefining them.',
    points: 10,
    sampleAnswers: [
      'The Prototype Pattern allows objects to share properties and methods through the prototype chain.',
      'It avoids duplication and reduces memory usage by letting instances inherit methods from the prototype instead of redefining them.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'The Prototype Pattern allows objects to share properties and methods through the prototype chain.',
        isCorrect: true,
        explanation:
          'The Prototype Pattern allows objects to share properties and methods through the prototype chain. It avoids duplication and reduces memory usage by letting instances inherit methods from the prototype instead of redefining them.',
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
  `✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
