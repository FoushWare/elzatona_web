const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-common-pattern-1',
    title: 'Definition of Common Pattern',
    content: "What is the 'Common Pattern' in JavaScript object creation?",
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Core Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.203Z',
    updatedAt: '2025-11-11T18:36:58.216Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'common-pattern', 'beginner', 'intermediate'],
    explanation:
      'It’s the simplest way of creating objects in JavaScript using object literals or basic functions. It involves manually defining properties and methods without abstraction.',
    points: 10,
    sampleAnswers: [
      'It’s the simplest way of creating objects in JavaScript using object literals or basic functions.',
      'It involves manually defining properties and methods without abstraction.',
    ],
    hints: [
      'Think about `{}` object literals.',
      'No abstraction, no factories.',
    ],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It’s the simplest way of creating objects in JavaScript using object literals or basic functions.',
        isCorrect: true,
        explanation:
          'It’s the simplest way of creating objects in JavaScript using object literals or basic functions. It involves manually defining properties and methods without abstraction.',
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
    id: 'design-patterns-common-pattern-2',
    title: 'Code Output - Object Literal',
    content:
      "What will this code log?\n\n<pre><code>const user = {\n  firstName: 'Alice',\n  lastName: 'Brown',\n  fullName: function() {\n    return this.firstName + ' ' + this.lastName;\n  }\n};\n\nconsole.log(user.fullName());</code></pre>",
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Core Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.204Z',
    updatedAt: '2025-11-11T18:36:58.255Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation: 'The correct answer is: Alice Brown',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Alice',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Brown',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Alice Brown',
        isCorrect: true,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-common-pattern-3',
    title: 'Pros of Common Pattern',
    content: 'Which of the following are advantages of the Common Pattern?',
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
    explanation: 'The correct answer is: Simple and easy to understand',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Simple and easy to understand',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Minimal boilerplate code',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Great for small projects',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Highly scalable for large apps',
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
  `✅ Added ${newQuestions.length} questions for Core Patterns (Batch 1)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
