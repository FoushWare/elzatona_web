const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ft-28",
    "title": "How should you structure a large frontend task application?",
    "content": "Your app is growing with many features. How should you organize the codebase?",
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
    "explanation": "Organize by features (feature-based structure), separate components/hooks/utils/types, use barrel exports, configure path aliases for clean imports.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Organize by features/modules, use barrel exports, separate concerns (components, hooks, utils, types), and use absolute imports",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Put everything in one file",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Organize only by file type",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "No organization needed",
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
    "id": "react-ft-29",
    "title": "How do you handle error boundaries in a frontend task?",
    "content": "You want to prevent one component error from crashing the entire app. How do you implement this?",
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
    "explanation": "Error Boundaries catch errors in component tree. Create class component with componentDidCatch, wrap sections, show fallback UI.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Create ErrorBoundary class component with componentDidCatch, wrap error-prone sections, display fallback UI",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use try-catch in every component",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Errors always crash the app",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use only console.error",
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
    "id": "react-ft-30",
    "title": "How should you optimize bundle size for a production frontend task?",
    "content": "Your app bundle is too large. What optimization strategies should you use?",
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
    "explanation": "Code splitting reduces initial load. Tree shaking removes unused code. Analyze bundle, remove unused deps, use dynamic imports, optimize assets.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use code splitting, tree shaking, analyze bundle, remove unused dependencies, use dynamic imports, and optimize images/assets",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Bundle size doesn't matter",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Include all libraries",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Optimization is automatic",
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

console.log(`✅ Added ${newQuestions.length} frontend task questions (Batch 10)`);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
