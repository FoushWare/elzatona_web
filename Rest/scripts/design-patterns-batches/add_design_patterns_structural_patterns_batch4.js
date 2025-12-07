const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/design-patterns-questions.json'
);

const newQuestions = [
  {
    id: 'design-patterns-mixin-pattern-34',
    title: 'Dog Example with Mixins',
    content:
      'Given the following code:\n\n<pre><code>class Dog {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nconst dogFunctionality = {\n  bark: () =&gt; console.log("Woof!"),\n  wagTail: () =&gt; console.log("Wagging my tail!"),\n};\n\nObject.assign(Dog.prototype, dogFunctionality);\n\nconst pet1 = new Dog("Daisy");\npet1.bark();</code></pre>\nWhat will be logged when <code>pet1.bark()</code> is executed?',
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
    explanation: 'The correct answer is: Woof!',
    points: 10,
    options: [
      {
        id: 'a',
        text: 'undefined',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'b',
        text: 'Woof!',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'c',
        text: 'Error: bark is not a function',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'design-patterns-mixin-pattern-35',
    title: 'Mixins vs Inheritance',
    content: 'How does the Mixin Pattern differ from classical inheritance?',
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
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class. Mixins allow horizontal code reuse across unrelated classes, inheritance enforces vertical hierarchy.',
    points: 10,
    sampleAnswers: [
      'Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class.',
      'Mixins allow horizontal code reuse across unrelated classes, inheritance enforces vertical hierarchy.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class.',
        isCorrect: true,
        explanation:
          'Inheritance creates a parent-child relationship between classes, while mixins simply copy functionality into another class. Mixins allow horizontal code reuse across unrelated classes, inheritance enforces vertical hierarchy.',
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
    id: 'design-patterns-mixin-pattern-36',
    title: 'Chaining Mixins',
    content:
      'In the example with <code>animalFunctionality</code> and <code>dogFunctionality</code>, why does Dog end up with both <code>bark()</code> and <code>walk()</code> methods?',
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
    tags: ['design-patterns', 'general-design-patterns', 'intermediate'],
    explanation:
      'Because <code>Object.assign(dogFunctionality, animalFunctionality)</code> merged animal methods into dogFunctionality, then <code>Object.assign(Dog.prototype, dogFunctionality)</code> added all methods to Dog’s prototype. This effectively chained multiple mixins together.',
    points: 10,
    sampleAnswers: [
      'Because `Object.assign(dogFunctionality, animalFunctionality)` merged animal methods into dogFunctionality, then `Object.assign(Dog.prototype, dogFunctionality)` added all methods to Dog’s prototype.',
      'This effectively chained multiple mixins together.',
    ],
    hints: [],
    metadata: {},
    options: [
      {
        id: 'o1',
        text: 'Because `Object.assign(dogFunctionality, animalFunctionality)` merged animal methods into dogFunctionality, then `Object.assign(Dog.prototype, dogFunctionality)` added all methods to Dog’s prototype.',
        isCorrect: true,
        explanation:
          'Because <code>Object.assign(dogFunctionality, animalFunctionality)</code> merged animal methods into dogFunctionality, then <code>Object.assign(Dog.prototype, dogFunctionality)</code> added all methods to Dog’s prototype. This effectively chained multiple mixins together.',
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
  `✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 4)`
);
console.log(`📝 Total questions: ${existingQuestions.length}`);
