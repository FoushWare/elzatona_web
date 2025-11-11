const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-70",
    "title": "Is it possible to use async/await in plain React?",
    "content": "Is it possible to use async/await in plain React?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "core-react",
      "intermediate"
    ],
    "explanation": "Yes, you can use <code>async/await</code> in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you're using **Create React App**, **Next.js**, **Remix**, or any modern React setup, <code>async/await</code> is supported out of the box through **Babel**.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+",
        "isCorrect": true,
        "explanation": "Yes, you can use `async/await` in plain React, as long as your JavaScript environment supports ES2017+. Nowadays most modern browsers and build tools support ES2017+ version. If you're using **Create React App**, **Next.js**, **Remix**, or any modern React setup, `async/await` is supported out of the box through **Babel**."
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
    "id": "react-ref-71",
    "title": "What are the common folder structures for React?",
    "content": "What are the common folder structures for React?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "core-react",
      "intermediate"
    ],
    "explanation": "There are two common practices for React project file structure.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "There are two common practices for React project file structure.",
        "isCorrect": true,
        "explanation": "There are two common practices for React project file structure."
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
    "id": "react-ref-72",
    "title": "What are the popular packages for animation?",
    "content": "What are the popular packages for animation?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "core-react",
      "intermediate"
    ],
    "explanation": "_React Transition Group_ and _React Motion_ are popular animation packages in React ecosystem.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "_React Transition Group_ and _React Motion_ are popular animation packages in React ecosystem.",
        "isCorrect": true,
        "explanation": "_React Transition Group_ and _React Motion_ are popular animation packages in React ecosystem."
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

console.log(`✅ Added ${newQuestions.length} questions for Core React (Batch 24)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
