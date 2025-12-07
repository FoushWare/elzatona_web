const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-singleton-pattern-84',
    title: 'Drawbacks of Singletons',
    content:
      'What are some disadvantages of using the Singleton pattern in large JavaScript applications?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.298Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'advanced',
      'advanced',
    ],
    explanation:
      'It introduces hidden dependencies across the codebase. It makes testing harder due to shared mutable state. It can act like a global variable, leading to unexpected coupling.',
    points: 10,
    sampleAnswers: [
      'It introduces hidden dependencies across the codebase.',
      'It makes testing harder due to shared mutable state.',
      'It can act like a global variable, leading to unexpected coupling.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It introduces hidden dependencies across the codebase.',
        isCorrect: true,
        explanation:
          'It introduces hidden dependencies across the codebase. It makes testing harder due to shared mutable state. It can act like a global variable, leading to unexpected coupling.',
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
    id: 'design-patterns-singleton-pattern-85',
    title: 'Singleton Alternatives in React',
    content:
      'What are common alternatives to using Singletons for global state in React applications?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Creational Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.208Z',
    updatedAt: '2025-11-11T18:36:58.298Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'React Context API State management libraries such as Redux, Zustand, or MobX.',
    points: 10,
    sampleAnswers: [
      'React Context API',
      'State management libraries such as Redux, Zustand, or MobX.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'React Context API',
        isCorrect: true,
        explanation:
          'React Context API State management libraries such as Redux, Zustand, or MobX.',
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
  `✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 9)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
