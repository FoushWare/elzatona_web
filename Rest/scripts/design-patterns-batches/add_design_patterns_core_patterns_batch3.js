const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-common-pattern-7',
    title: 'Best Use Case',
    content: 'When is it appropriate to use the Common Pattern?',
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
      'For very small apps or scripts where only one or two objects are needed. When performance and scalability aren’t concerns.',
    points: 10,
    sampleAnswers: [
      'For very small apps or scripts where only one or two objects are needed.',
      'When performance and scalability aren’t concerns.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'For very small apps or scripts where only one or two objects are needed.',
        isCorrect: true,
        explanation:
          'For very small apps or scripts where only one or two objects are needed. When performance and scalability aren’t concerns.',
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
    id: 'design-patterns-common-pattern-8',
    title: 'Transition to Other Patterns',
    content:
      'Why do developers often move from the Common Pattern to the Factory Pattern or Constructor Pattern?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Core Patterns',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.204Z',
    updatedAt: '2025-11-11T18:36:58.256Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'advanced',
      'advanced',
    ],
    explanation:
      'Because as applications grow, manually creating objects becomes repetitive and hard to maintain. Factories and constructors provide abstraction and scalability.',
    points: 10,
    sampleAnswers: [
      'Because as applications grow, manually creating objects becomes repetitive and hard to maintain.',
      'Factories and constructors provide abstraction and scalability.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Because as applications grow, manually creating objects becomes repetitive and hard to maintain.',
        isCorrect: true,
        explanation:
          'Because as applications grow, manually creating objects becomes repetitive and hard to maintain. Factories and constructors provide abstraction and scalability.',
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
  `✅ Added ${newQuestions.length} questions for Core Patterns (Batch 3)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
