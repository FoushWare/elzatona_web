const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = [
  {
    "id": "react-ft-19",
    "title": "How should you implement routing in a frontend task with multiple pages?",
    "content": "Your app needs multiple pages: home, products, cart, checkout. What routing solution should you use?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Router",
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
      "react-router",
      "intermediate"
    ],
    "explanation": "React Router provides declarative routing. Use BrowserRouter for history API, Routes for route matching, Route for individual routes.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use React Router with BrowserRouter, Routes, and Route components for declarative routing",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use only window.location",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Create separate HTML files",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Routing is not needed in React",
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
    "id": "react-ft-20",
    "title": "How do you protect routes in a frontend task that requires authentication?",
    "content": "Some pages should only be accessible to logged-in users. How do you implement this?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Router",
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
      "react-router",
      "intermediate"
    ],
    "explanation": "Create ProtectedRoute wrapper component. Check authentication, redirect to login if needed, or render children if authenticated.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Create a ProtectedRoute component that checks auth state and redirects to login if not authenticated",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Check auth in every component",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only server-side protection",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "All routes should be public",
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
    "id": "react-ft-21",
    "title": "How should you handle deep linking in a frontend task?",
    "content": "Users should be able to bookmark and share specific product pages. How do you enable this?",
    "type": "multiple-choice",
    "category": "React",
    "topic": "React Router",
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
      "react-router",
      "intermediate"
    ],
    "explanation": "React Router enables deep linking. Ensure server returns index.html for all routes (SPA catch-all) so React Router can handle routing.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use React Router with proper route structure, ensure server supports client-side routing (catch-all route)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Deep linking is not possible",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only hash routing",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Require users to navigate from home page",
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

console.log(`✅ Added ${newQuestions.length} frontend task questions (Batch 7)`);
console.log(`📝 Total React questions: ${existingQuestions.length}`);
