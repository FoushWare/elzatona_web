const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-98",
    "title": "What is flux?",
    "content": "What is flux?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Redux",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-redux",
      "intermediate"
    ],
    "explanation": "**Flux** is an **application architecture** (not a framework or library) designed by Facebook to manage **data flow** in React applications. It was created as an alternative to the traditional **MVC (Model-View-Controller)** pattern, and it emphasizes a **unidirectional data flow** to make state changes more predictable and easier to debug.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Flux is an application architecture (not a framework or library) designed by Facebook to manage data flow in React applications",
        "isCorrect": true,
        "explanation": "**Flux** is an **application architecture** (not a framework or library) designed by Facebook to manage **data flow** in React applications. It was created as an alternative to the traditional **MVC (Model-View-Controller)** pattern, and it emphasizes a **unidirectional data flow** to make state changes more predictable and easier to debug."
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
    "id": "react-ref-99",
    "title": "What are the core principles of Redux?",
    "content": "What are the core principles of Redux?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Redux",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-redux",
      "intermediate"
    ],
    "explanation": "Redux follows three fundamental principles:",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Redux follows three fundamental principles:",
        "isCorrect": true,
        "explanation": "Redux follows three fundamental principles:"
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
    "id": "react-ref-100",
    "title": "What are the downsides of Redux compared to Flux?",
    "content": "What are the downsides of Redux compared to Flux?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Redux",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-redux",
      "intermediate"
    ],
    "explanation": "While Redux offers a powerful and predictable state management solution, it comes with a few trade-offs when compared to Flux. These include:",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "While Redux offers a powerful and predictable state management solution, it comes with a few trade-offs when compared to Flux",
        "isCorrect": true,
        "explanation": "While Redux offers a powerful and predictable state management solution, it comes with a few trade-offs when compared to Flux. These include:"
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

console.log(`✅ Added ${newQuestions.length} questions for React Redux (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
