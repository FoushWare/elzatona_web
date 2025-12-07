const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-observer-pattern-50',
    title: 'Core Components of Observer Pattern',
    content:
      'Which three components are essential in the Observer Pattern implementation?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Behavioral Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.207Z',
    updatedAt: '2025-11-11T18:36:58.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'The correct answer is: Observers, subscribe/unsubscribe, notify',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Publisher, renderer, transformer',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Observers, subscribe/unsubscribe, notify',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'State, reducer, dispatcher',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Model, view, controller',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-observer-pattern-51',
    title: 'Observer Pattern in React',
    content:
      'In the example provided, which functions act as observers when subscribed to the observable?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Behavioral Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.207Z',
    updatedAt: '2025-11-11T18:36:58.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation: 'The correct answer is: logger and toastify',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'handleClick and handleToggle',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'logger and toastify',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Button and Switch components',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'React lifecycle methods',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-observer-pattern-52',
    title: 'Observable Notifications',
    content: "What happens when the observable's notify() method is called?",
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Behavioral Patterns',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.207Z',
    updatedAt: '2025-11-11T18:36:58.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'beginner',
      'intermediate',
    ],
    explanation:
      'It loops through the observers list and invokes each subscribed function with the provided data. All observers receive the event data at the same time.',
    points: 10,
    sampleAnswers: [
      'It loops through the observers list and invokes each subscribed function with the provided data.',
      'All observers receive the event data at the same time.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'It loops through the observers list and invokes each subscribed function with the provided data.',
        isCorrect: true,
        explanation:
          'It loops through the observers list and invokes each subscribed function with the provided data. All observers receive the event data at the same time.',
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
  `✅ Added ${newQuestions.length} questions for Behavioral Patterns (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
