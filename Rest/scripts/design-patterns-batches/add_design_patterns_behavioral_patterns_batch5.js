const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-observer-pattern-53',
    title: 'Practical Use Case',
    content: 'Which scenario is a good use case for the Observer Pattern?',
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
    explanation:
      'The correct answer is: Notifying multiple UI components when new messages arrive',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Notifying multiple UI components when new messages arrive',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Rendering static content with no user interaction',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Compiling JavaScript code to ES5',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Sorting a list of numbers',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-observer-pattern-54',
    title: 'Observer Pattern vs Pub/Sub',
    content:
      'What is the key difference between the Observer Pattern and the Publish/Subscribe (Pub/Sub) pattern?',
    type: 'multiple-choice',
    category: 'Design Patterns',
    topic: 'Behavioral Patterns',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-15T00:47:17.207Z',
    updatedAt: '2025-11-11T18:36:58.271Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'design-patterns',
      'general-design-patterns',
      'advanced',
      'advanced',
    ],
    explanation:
      'In Observer, observers subscribe directly to the observable, creating tight coupling. In Pub/Sub, a mediator (event bus) manages communication, decoupling publishers and subscribers.',
    points: 10,
    sampleAnswers: [
      'In Observer, observers subscribe directly to the observable, creating tight coupling.',
      'In Pub/Sub, a mediator (event bus) manages communication, decoupling publishers and subscribers.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'In Observer, observers subscribe directly to the observable, creating tight coupling.',
        isCorrect: true,
        explanation:
          'In Observer, observers subscribe directly to the observable, creating tight coupling. In Pub/Sub, a mediator (event bus) manages communication, decoupling publishers and subscribers.',
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
    id: 'design-patterns-observer-pattern-55',
    title: 'Observer Pattern in RxJS',
    content:
      'Which popular JavaScript library uses the Observer Pattern extensively?',
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
    explanation: 'The correct answer is: RxJS',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'Redux',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Axios',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'c',
        text: 'RxJS',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'd',
        text: 'Styled Components',
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
  `✅ Added ${newQuestions.length} questions for Behavioral Patterns (Batch 5)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
