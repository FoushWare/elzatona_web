const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-268",
    "title": "How are error boundaries handled in React v15?",
    "content": "How are error boundaries handled in React v15?",
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
    "explanation": "React v15 provided very basic support for _error boundaries_ using <code>unstable_handleError</code> method. It has been renamed to <code>componentDidCatch</code> in React v16.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "React v15 provided very basic support for _error boundaries_ using `unstable_handleError` method",
        "isCorrect": true,
        "explanation": "React v15 provided very basic support for _error boundaries_ using `unstable_handleError` method. It has been renamed to `componentDidCatch` in React v16."
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
    "id": "react-ref-269",
    "title": "What is the purpose of render method of `react-dom`?",
    "content": "What is the purpose of render method of <code>react-dom</code>?",
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
    "explanation": "This method is used to render a React element into the DOM in the supplied container and return a reference to the component. If the React element was previously rendered into container, it will perform an update on it and only mutate the DOM as necessary to reflect the latest changes.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "This method is used to render a React element into the DOM in the supplied container and return a reference to the component",
        "isCorrect": true,
        "explanation": "This method is used to render a React element into the DOM in the supplied container and return a reference to the component. If the React element was previously rendered into container, it will perform an update on it and only mutate the DOM as necessary to reflect the latest changes."
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
    "id": "react-ref-270",
    "title": "What will happen if you use `setState()` in constructor?",
    "content": "What will happen if you use <code>setState()</code> in constructor?",
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
    "explanation": "When you use <code>setState()</code>, then apart from assigning to the object state React also re-renders the component and all its children. You would get error like this: _Can only update a mounted or mounting component._ So we need to use <code>this.state</code> to initialize variables inside constructor.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "When you use `setState()`, then apart from assigning to the object state React also re-renders the component and all its children",
        "isCorrect": true,
        "explanation": "When you use `setState()`, then apart from assigning to the object state React also re-renders the component and all its children. You would get error like this: _Can only update a mounted or mounting component._ So we need to use `this.state` to initialize variables inside constructor."
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

console.log(`✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 41)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
