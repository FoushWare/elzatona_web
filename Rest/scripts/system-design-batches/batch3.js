const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q9",
    "title": "How do you design a component dependency graph from a Figma design?",
    "content": "Describe how to break down a Figma design into smaller components and map their dependencies.",
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
    "explanation": "Start with high-level layout containers, identify reusable UI elements (buttons, cards, forms), then map parent-child relationships. Use a dependency graph to track composition and shared props.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Start with high-level layout containers, identify reusable UI elements (buttons, cards, forms), then map parent-child relationships. Use a dependency graph to track composition and shared props.",
        "isCorrect": true,
        "explanation": "Start with high-level layout containers, identify reusable UI elements (buttons, cards, forms), then map parent-child relationships. Use a dependency graph to track composition and shared props."
      },
      {
        "id": "o2",
        "text": "Start with high-level layout containers, identify reusable UI elements (buttons, cards, forms), then map parent-child relationships",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Use a dependency graph to track composition and shared props",
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
    "id": "system-design-q10",
    "title": "What are different approaches for real-time data updates in frontend?",
    "content": "Compare long polling, WebSockets, and Server-Sent Events (SSE).",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "advanced"
    ],
    "explanation": "Long polling repeatedly requests updates. WebSockets provide bi-directional communication. SSE streams updates one way from server to client.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Long polling sends repeated HTTP requests to check for updates",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "WebSockets provide full-duplex communication between client and server",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "SSE is a one-way push from server to client",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "WebSockets are always the best choice",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q11",
    "title": "What is the difference between lazy loading and code splitting?",
    "content": "Explain how lazy loading and code splitting optimize performance.",
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
    "explanation": "Code splitting breaks the app into chunks. Lazy loading ensures chunks load only when needed.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Lazy loading delays loading of code/resources until needed",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Code splitting divides the app into smaller chunks",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "They are the same concept with different names",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 3)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
