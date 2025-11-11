const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-178",
    "title": "How to prevent a function from being called multiple times?",
    "content": "How to prevent a function from being called multiple times?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.702Z",
    "updatedAt": "2025-11-11T19:25:10.702Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "If you use an event handler such as **onClick or onScroll** and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways,",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "If you use an event handler such as onClick or onScroll and want to prevent the callback from being fired too quickly, then you can limit the rate at ...",
        "isCorrect": true,
        "explanation": "If you use an event handler such as **onClick or onScroll** and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be achieved in the below possible ways,"
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
    "id": "react-ref-179",
    "title": "How JSX prevents Injection Attacks?",
    "content": "How JSX prevents Injection Attacks?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.702Z",
    "updatedAt": "2025-11-11T19:25:10.702Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "React DOM escapes any values embedded in JSX before rendering them",
        "isCorrect": true,
        "explanation": "React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered."
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
    "id": "react-ref-180",
    "title": "How do you update rendered elements?",
    "content": "How do you update rendered elements?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.702Z",
    "updatedAt": "2025-11-11T19:25:10.702Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "You can update UI(represented by rendered element) by passing the newly created element to ReactDOM's render method.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "You can update UI(represented by rendered element) by passing the newly created element to ReactDOM's render method.",
        "isCorrect": true,
        "explanation": "You can update UI(represented by rendered element) by passing the newly created element to ReactDOM's render method."
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

console.log(`✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 11)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
