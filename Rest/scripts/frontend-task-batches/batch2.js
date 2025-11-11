const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ft-4",
    "title": "How should you handle state management in a complex frontend task like a video streaming app?",
    "content": "You're building a Netflix-style app with video player, recommendations, and watchlist. What state management approach is best?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:33:22.944Z",
    "updatedAt": "2025-11-11T19:33:22.944Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "frontend-tasks",
      "core-react",
      "intermediate"
    ],
    "explanation": "Use Context API for state shared across multiple components (current video, user). Use useState for component-local state (UI toggles).",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use Context API for global state (current video, user preferences) and useState for local component state",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Put all state in a single useState hook at the root",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only props drilling for all state",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Avoid state management entirely",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider React best practices for component architecture",
      "Think about state management and data flow patterns",
      "Review frontend task implementation patterns"
    ],
    "metadata": {}
  },
  {
    "id": "react-ft-5",
    "title": "When should you use useReducer instead of useState in a frontend task?",
    "content": "You're building a complex form with multiple interdependent fields and validation. Which hook is more appropriate?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:33:22.944Z",
    "updatedAt": "2025-11-11T19:33:22.944Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "frontend-tasks",
      "core-react",
      "intermediate"
    ],
    "explanation": "useReducer is better for complex state logic, multiple related state values, or when state updates depend on previous state.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "useReducer when state logic is complex with multiple sub-values or when next state depends on previous state",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Always use useState - it's simpler",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "useReducer only for arrays",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "useState and useReducer are identical",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider React best practices for component architecture",
      "Think about state management and data flow patterns",
      "Review frontend task implementation patterns"
    ],
    "metadata": {}
  },
  {
    "id": "react-ft-6",
    "title": "How do you prevent unnecessary re-renders in a frontend task with many child components?",
    "content": "Your dashboard has 100+ product cards that re-render when parent state changes. How do you optimize this?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:33:22.944Z",
    "updatedAt": "2025-11-11T19:33:22.944Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "frontend-tasks",
      "core-react",
      "intermediate"
    ],
    "explanation": "React.memo prevents re-renders when props haven't changed. useMemo/useCallback memoize values and functions to prevent recreation.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use React.memo for child components and useMemo/useCallback for expensive computations and callbacks",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Disable re-rendering completely",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Put all components in one file",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use only class components",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider React best practices for component architecture",
      "Think about state management and data flow patterns",
      "Review frontend task implementation patterns"
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

console.log(`✅ Added ${newQuestions.length} frontend task questions (Batch 2)`);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
