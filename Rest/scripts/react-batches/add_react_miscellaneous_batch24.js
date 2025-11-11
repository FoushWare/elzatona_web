const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-217",
    "title": "What is a wrapper component?",
    "content": "What is a wrapper component?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.703Z",
    "updatedAt": "2025-11-11T19:25:10.703Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "A wrapper in React is a component that wraps or surrounds another component or group of components. It can be used for a variety of purposes such as adding additional functionality, styling, or layout to the wrapped components.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "A wrapper in React is a component that wraps or surrounds another component or group of components",
        "isCorrect": true,
        "explanation": "A wrapper in React is a component that wraps or surrounds another component or group of components. It can be used for a variety of purposes such as adding additional functionality, styling, or layout to the wrapped components."
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
    "id": "react-ref-218",
    "title": "What are the differences between useEffect and useLayoutEffect hooks?",
    "content": "What are the differences between useEffect and useLayoutEffect hooks?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.703Z",
    "updatedAt": "2025-11-11T19:25:10.703Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "useEffect and useLayoutEffect are both React hooks that can be used to synchronize a component with an external system, such as a browser API or a third-party library. However, there are some key differences between the two:",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "useEffect and useLayoutEffect are both React hooks that can be used to synchronize a component with an external system, such as a browser API or a thi...",
        "isCorrect": true,
        "explanation": "useEffect and useLayoutEffect are both React hooks that can be used to synchronize a component with an external system, such as a browser API or a third-party library. However, there are some key differences between the two:"
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
    "id": "react-ref-219",
    "title": "What are the differences between Functional and Class Components?",
    "content": "What are the differences between Functional and Class Components?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Miscellaneous",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.703Z",
    "updatedAt": "2025-11-11T19:25:10.703Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "miscellaneous",
      "intermediate"
    ],
    "explanation": "There are two different ways to create components in ReactJS. The main differences are listed down as below,",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "There are two different ways to create components in ReactJS",
        "isCorrect": true,
        "explanation": "There are two different ways to create components in ReactJS. The main differences are listed down as below,"
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

console.log(`✅ Added ${newQuestions.length} questions for Miscellaneous (Batch 24)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
