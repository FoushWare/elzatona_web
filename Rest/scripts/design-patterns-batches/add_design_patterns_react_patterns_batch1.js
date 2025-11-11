const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-provider-pattern-61",
    "title": "Provider Pattern Basics",
    "content": "What problem does the Provider Pattern primarily solve in React applications?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "React Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.282Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "It solves the issue of prop drilling by allowing components to access shared state directly through context. It provides a way to make global state or values accessible to deeply nested components without passing props manually.",
    "points": 10,
    "sampleAnswers": [
      "It solves the issue of prop drilling by allowing components to access shared state directly through context.",
      "It provides a way to make global state or values accessible to deeply nested components without passing props manually."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "It solves the issue of prop drilling by allowing components to access shared state directly through context.",
        "isCorrect": true,
        "explanation": "It solves the issue of prop drilling by allowing components to access shared state directly through context. It provides a way to make global state or values accessible to deeply nested components without passing props manually."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review the design pattern concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "design-patterns-provider-pattern-62",
    "title": "Prop Drilling",
    "content": "Which of the following best describes 'prop drilling'?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "React Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.282Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: Passing props through multiple components that don’t use them",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Passing props through multiple components that don’t use them",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Drilling into the DOM with refs",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "Creating deeply nested providers",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-provider-pattern-63",
    "title": "useContext Hook",
    "content": "In React, how does a component consume values from a Provider?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "React Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.282Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "By using the useContext hook with the context object created via React.createContext(). The component calls useContext(SomeContext) to directly access the value provided by the Provider.",
    "points": 10,
    "sampleAnswers": [
      "By using the useContext hook with the context object created via React.createContext().",
      "The component calls useContext(SomeContext) to directly access the value provided by the Provider."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "By using the useContext hook with the context object created via React.createContext().",
        "isCorrect": true,
        "explanation": "By using the useContext hook with the context object created via React.createContext(). The component calls useContext(SomeContext) to directly access the value provided by the Provider."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review the design pattern concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
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

console.log(`✅ Added ${newQuestions.length} questions for React Patterns (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
