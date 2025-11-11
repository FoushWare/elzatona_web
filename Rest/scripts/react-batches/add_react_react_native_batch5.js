const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-143",
    "title": "What is the difference between React and Angular?",
    "content": "What is the difference between React and Angular?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Native",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.702Z",
    "updatedAt": "2025-11-11T19:25:10.702Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-native",
      "intermediate"
    ],
    "explanation": "Let's see the difference between React and Angular in a table format.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Let's see the difference between React and Angular in a table format.",
        "isCorrect": true,
        "explanation": "Let's see the difference between React and Angular in a table format."
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
    "id": "react-ref-144",
    "title": "Why React tab is not showing up in DevTools?",
    "content": "Why React tab is not showing up in DevTools?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Native",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.702Z",
    "updatedAt": "2025-11-11T19:25:10.702Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-native",
      "intermediate"
    ],
    "explanation": "When the page loads, _React DevTools_ sets a global named <code>__REACT_DEVTOOLS_GLOBAL_HOOK__</code>, then React communicates with that hook during initialization. If the website is not using React or if React fails to communicate with DevTools then it won't show up the tab.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "When the page loads, _React DevTools_ sets a global named `__REACT_DEVTOOLS_GLOBAL_HOOK__`, then React communicates with that hook during initializati...",
        "isCorrect": true,
        "explanation": "When the page loads, _React DevTools_ sets a global named `__REACT_DEVTOOLS_GLOBAL_HOOK__`, then React communicates with that hook during initialization. If the website is not using React or if React fails to communicate with DevTools then it won't show up the tab."
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
    "id": "react-ref-145",
    "title": "What are Styled Components?",
    "content": "What are Styled Components?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Native",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.702Z",
    "updatedAt": "2025-11-11T19:25:10.702Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-native",
      "intermediate"
    ],
    "explanation": "<code>styled-components</code> is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "`styled-components` is a JavaScript library for styling React applications",
        "isCorrect": true,
        "explanation": "`styled-components` is a JavaScript library for styling React applications. It removes the mapping between styles and components, and lets you write actual CSS augmented with JavaScript."
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

console.log(`✅ Added ${newQuestions.length} questions for React Native (Batch 5)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
