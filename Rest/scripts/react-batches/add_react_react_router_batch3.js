const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ref-81",
    "title": "Why you get \"Router may have only one child element\" warning?",
    "content": "Why you get \"Router may have only one child element\" warning?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Router",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-router",
      "intermediate"
    ],
    "explanation": "You have to wrap your Route's in a <code>&lt;Switch&gt;</code> block because <code>&lt;Switch&gt;</code> is unique in that it renders a route exclusively.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "You have to wrap your Route's in a `<Switch>` block because `<Switch>` is unique in that it renders a route exclusively.",
        "isCorrect": true,
        "explanation": "You have to wrap your Route's in a `<Switch>` block because `<Switch>` is unique in that it renders a route exclusively."
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
    "id": "react-ref-82",
    "title": "How to pass params to `history.push` method in React Router v4?",
    "content": "How to pass params to <code>history.push</code> method in React Router v4?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Router",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-router",
      "intermediate"
    ],
    "explanation": "While navigating you can pass props to the <code>history</code> object:",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "While navigating you can pass props to the `history` object:",
        "isCorrect": true,
        "explanation": "While navigating you can pass props to the `history` object:"
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
    "id": "react-ref-83",
    "title": "How to implement _default_ or _NotFound_ page?",
    "content": "How to implement _default_ or _NotFound_ page?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Router",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:25:10.701Z",
    "updatedAt": "2025-11-11T19:25:10.701Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "react-router",
      "intermediate"
    ],
    "explanation": "A <code>&lt;Switch&gt;</code> renders the first child <code>&lt;Route&gt;</code> that matches. A <code>&lt;Route&gt;</code> with no path always matches. So you just need to simply drop path attribute as below",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "A `<Switch>` renders the first child `<Route>` that matches",
        "isCorrect": true,
        "explanation": "A `<Switch>` renders the first child `<Route>` that matches. A `<Route>` with no path always matches. So you just need to simply drop path attribute as below"
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

console.log(`✅ Added ${newQuestions.length} questions for React Router (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
