const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-4",
    "title": "What is the difference between an Element and a Component?",
    "content": "What is the difference between an Element and a Component?",
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
    "explanation": "**Element:**",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Element:",
        "isCorrect": true,
        "explanation": "**Element:**"
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
    "id": "react-ref-5",
    "title": "How to create components in React?",
    "content": "How to create components in React?",
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
    "explanation": "Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Components are the building blocks of creating User Interfaces(UI) in React",
        "isCorrect": true,
        "explanation": "Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component."
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
    "id": "react-ref-6",
    "title": "When to use a Class Component over a Function Component?",
    "content": "When to use a Class Component over a Function Component?",
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
    "explanation": "After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "After the addition of Hooks(i.e",
        "isCorrect": true,
        "explanation": "After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too."
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

console.log(`✅ Added ${newQuestions.length} questions for Core React (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
