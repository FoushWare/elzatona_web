const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-mediator-pattern-28',
    title: 'Express Middleware as Mediator',
    content:
      'How does Express.js middleware act as a mediator in the request-response cycle?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Behavioral Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.205Z',
    updatedAt: '2025-11-11T18:36:58.261Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain. They centralize control, preventing each handler from directly depending on others.',
    points: 10,
    sampleAnswers: [
      'Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain.',
      'They centralize control, preventing each handler from directly depending on others.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain.',
        isCorrect: true,
        explanation:
          'Middleware functions act as mediators by receiving requests, modifying them, and passing them along to the next function in the chain. They centralize control, preventing each handler from directly depending on others.',
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
    id: 'design-patterns-mediator-pattern-29',
    title: 'Advantages of Mediator Pattern',
    content:
      'Which of the following are advantages of using the Mediator Pattern?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Behavioral Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.205Z',
    updatedAt: '2025-11-11T18:36:58.261Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation: 'The correct answer is: Reduces coupling between components',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Reduces coupling between components',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Simplifies many-to-many relationships',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Always improves performance',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Provides a single point of communication',
        isCorrect: true,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-mediator-pattern-30',
    title: 'Disadvantages of Mediator Pattern',
    content: 'What is a potential disadvantage of the Mediator Pattern?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Behavioral Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.205Z',
    updatedAt: '2025-11-11T18:36:58.261Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'The mediator can become a God Object if it grows too complex, containing too much business logic. It introduces an extra layer of indirection, which can make debugging harder.',
    points: 10,
    sampleAnswers: [
      'The mediator can become a God Object if it grows too complex, containing too much business logic.',
      'It introduces an extra layer of indirection, which can make debugging harder.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'The mediator can become a God Object if it grows too complex, containing too much business logic.',
        isCorrect: true,
        explanation:
          'The mediator can become a God Object if it grows too complex, containing too much business logic. It introduces an extra layer of indirection, which can make debugging harder.',
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
  `✅ Added ${newQuestions.length} questions for Behavioral Patterns (Batch 2)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
