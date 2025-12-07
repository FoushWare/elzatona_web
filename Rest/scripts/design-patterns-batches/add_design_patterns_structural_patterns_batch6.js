const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-mixin-pattern-40',
    title: 'Debugging Mixins',
    content:
      'If you accidentally overwrite a method from another mixin when using <code>Object.assign</code>, what will happen?',
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
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'The correct answer is: The last assigned method overwrites the previous one',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Both methods are preserved',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'The last assigned method overwrites the previous one',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'JavaScript throws an error',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-module-pattern-41',
    title: 'Definition of Module Pattern',
    content: 'What is the Module Pattern in JavaScript and why is it used?',
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
      'The Module Pattern is a design pattern that uses closures to create private and public encapsulation. It is used to avoid polluting the global scope and to create reusable, maintainable code structures.',
    points: 10,
    sampleAnswers: [
      'The Module Pattern is a design pattern that uses closures to create private and public encapsulation.',
      'It is used to avoid polluting the global scope and to create reusable, maintainable code structures.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'The Module Pattern is a design pattern that uses closures to create private and public encapsulation.',
        isCorrect: true,
        explanation:
          'The Module Pattern is a design pattern that uses closures to create private and public encapsulation. It is used to avoid polluting the global scope and to create reusable, maintainable code structures.',
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
    id: 'design-patterns-module-pattern-42',
    title: 'Basic Module Syntax',
    content:
      'Which of the following correctly implements a simple Module Pattern in JavaScript?',
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
      'The correct answer is: var Module = (function(){ var privateVar = 10; return { get: function(){ return privateVar; } }; })();',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'function Module() { var x = 10; return x; }',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'var Module = (function(){ var privateVar = 10; return { get: function(){ return privateVar; } }; })();',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'let Module = class { constructor(){ this.x = 10; } }',
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
  `✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 6)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
