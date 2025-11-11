const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-283",
    "title": "What is the difference between constructor and getInitialState?",
    "content": "What is the difference between constructor and getInitialState?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.704Z",
    "updatedAt": "2025-11-11T19:25:10.704Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "You should initialize state in the constructor when using ES6 classes, and <code>getInitialState()</code> method when using <code>React.createClass()</code>.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "You should initialize state in the constructor when using ES6 classes, and `getInitialState()` method when using `React.createClass()`.",
        "isCorrect": true,
        "explanation": "You should initialize state in the constructor when using ES6 classes, and `getInitialState()` method when using `React.createClass()`."
      },
      {
        "id": "o2",
        "text": "This is incorrect. Please refer to React documentation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "This is not accurate. Review React best practices.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer differs.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider React's architecture and design principles.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Review React documentation and best practices",
      "Consider React's component architecture and patterns",
      "Think about React's rendering and state management"
    ],
    "metadata": {}
  },
  {
    "id": "react-ref-284",
    "title": "Can you force a component to re-render without calling setState?",
    "content": "Can you force a component to re-render without calling setState?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.704Z",
    "updatedAt": "2025-11-11T19:25:10.704Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "By default, when your component's state or props change, your component will re-render. If your <code>render()</code> method depends on some other data, you can tell React that the component needs re-rendering by calling <code>forceUpdate()</code>.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "By default, when your component's state or props change, your component will re-render",
        "isCorrect": true,
        "explanation": "By default, when your component's state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`."
      },
      {
        "id": "o2",
        "text": "This is incorrect. Please refer to React documentation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "This is not accurate. Review React best practices.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer differs.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider React's architecture and design principles.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Review React documentation and best practices",
      "Consider React's component architecture and patterns",
      "Think about React's rendering and state management"
    ],
    "metadata": {}
  },
  {
    "id": "react-ref-285",
    "title": "What is the difference between `super()` and `super(props)` in React using ES6 classes?",
    "content": "What is the difference between <code>super()</code> and <code>super(props)</code> in React using ES6 classes?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.704Z",
    "updatedAt": "2025-11-11T19:25:10.704Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "When you want to access <code>this.props</code> in <code>constructor()</code> then you should pass props to <code>super()</code> method.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "When you want to access `this.props` in `constructor()` then you should pass props to `super()` method.",
        "isCorrect": true,
        "explanation": "When you want to access `this.props` in `constructor()` then you should pass props to `super()` method."
      },
      {
        "id": "o2",
        "text": "This is incorrect. Please refer to React documentation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "This is not accurate. Review React best practices.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer differs.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider React's architecture and design principles.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Review React documentation and best practices",
      "Consider React's component architecture and patterns",
      "Think about React's rendering and state management"
    ],
    "metadata": {}
  }
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

console.log(`✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 46)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
