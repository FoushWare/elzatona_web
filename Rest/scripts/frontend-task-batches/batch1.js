const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ft-1",
    "title": "When building a social media dashboard frontend task, what is the best approach for component structure?",
    "content": "You need to build a social media dashboard with posts, comments, and user profiles. How should you organize your React components?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "Core React",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2025-11-11T19:33:22.943Z",
    "updatedAt": "2025-11-11T19:33:22.944Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "react",
      "frontend-tasks",
      "core-react",
      "intermediate"
    ],
    "explanation": "Break down complex UIs into smaller, reusable components. Use composition to build complex features from simple components.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Create reusable components (PostCard, CommentList, UserProfile) and compose them in a Dashboard container",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Put everything in one large component for simplicity",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Create separate components for each feature without composition",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use only class components for all features",
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
    "id": "react-ft-2",
    "title": "How should you structure components for a todo list frontend task?",
    "content": "You need to build a todo list with add, edit, delete, and filter functionality. What component structure is best?",
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
    "explanation": "Break down into logical components: container for state, item for display, form for input, filter for UI controls.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "TodoList container, TodoItem component, TodoForm component, FilterBar component",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "One component with all functionality",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Separate components for each todo item only",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "No component structure needed",
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
    "id": "react-ft-3",
    "title": "What is the best pattern for sharing data between sibling components in a frontend task?",
    "content": "You have a ProductList and ShoppingCart component that need to share cart state. What approach should you use?",
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
    "explanation": "Lift state to common parent or use Context API. Props cannot be passed directly between siblings.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Lift state up to a common parent component or use Context API",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use props to pass data between siblings directly",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Store state in localStorage only",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use global variables",
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

console.log(`✅ Added ${newQuestions.length} frontend task questions (Batch 1)`);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
