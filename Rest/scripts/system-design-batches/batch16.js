const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q52",
    "title": "What is the difference between controlled and uncontrolled components in React?",
    "content": "Explain how controlled and uncontrolled components manage state.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "beginner"
    ],
    "explanation": "The correct answer is: Controlled components have state managed by React via props",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Controlled components have state managed by React via props",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Uncontrolled components manage state internally using refs",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Controlled components are faster than uncontrolled in all cases",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q53",
    "title": "What is Redux and when should you use it?",
    "content": "Explain Redux for state management and use cases for global state.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "intermediate"
    ],
    "explanation": "Redux is a predictable state container for JavaScript apps, useful for managing global state shared across multiple components, especially in large or complex apps.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Redux is a predictable state container for JavaScript apps, useful for managing global state shared across multiple components, especially in large or complex apps.",
        "isCorrect": true,
        "explanation": "Redux is a predictable state container for JavaScript apps, useful for managing global state shared across multiple components, especially in large or complex apps."
      },
      {
        "id": "o2",
        "text": "Redux is a predictable state container for JavaScript apps, useful for managing global state shared across multiple components, especially in large or complex apps",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "This method prioritizes user experience and maintainability.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is incorrect. Please refer to system design best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q54",
    "title": "What are the differences between local state, global state, and server state?",
    "content": "Explain how different state types are managed and synchronized.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "intermediate"
    ],
    "explanation": "The correct answer is: Local state is component-specific",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Local state is component-specific",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Global state is shared across multiple components",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Server state comes from APIs and must be synchronized",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "All states are automatically synchronized with the server",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 16)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
