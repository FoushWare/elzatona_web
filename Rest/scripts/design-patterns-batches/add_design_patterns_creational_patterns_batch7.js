const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-singleton-pattern-78',
    title: 'Enforcing a Singleton',
    content:
      'How does introducing a private <code>instance</code> variable in the constructor ensure only one instance of the class can exist?',
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
      'It checks if an instance already exists and throws an error on subsequent instantiations. This prevents creating multiple instances with <code>new</code>.',
    points: 10,
    sampleAnswers: [
      'It checks if an instance already exists and throws an error on subsequent instantiations.',
      'This prevents creating multiple instances with `new`.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It checks if an instance already exists and throws an error on subsequent instantiations.',
        isCorrect: true,
        explanation:
          'It checks if an instance already exists and throws an error on subsequent instantiations. This prevents creating multiple instances with <code>new</code>.',
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
    id: 'design-patterns-singleton-pattern-79',
    title: 'Object.freeze in Singleton',
    content:
      'What is the purpose of using <code>Object.freeze</code> on a Singleton instance?',
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
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'The correct answer is: Prevents modification of the Singleton’s properties',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Prevents modification of the Singleton’s properties',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Allows multiple instances to be created',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Automatically resets the Singleton',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-singleton-pattern-80',
    title: 'Singleton in Multiple Modules',
    content:
      'In the redButton.js and blueButton.js example, why does clicking either button increment the same counter?',
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
      'Because both modules import the same frozen Singleton instance, which is shared globally. The counter state lives in one place and is referenced everywhere.',
    points: 10,
    sampleAnswers: [
      'Because both modules import the same frozen Singleton instance, which is shared globally.',
      'The counter state lives in one place and is referenced everywhere.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Because both modules import the same frozen Singleton instance, which is shared globally.',
        isCorrect: true,
        explanation:
          'Because both modules import the same frozen Singleton instance, which is shared globally. The counter state lives in one place and is referenced everywhere.',
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
  `✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 7)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
