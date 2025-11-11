const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-senior-1",
    "title": "How would you design a real-time collaborative editor frontend?",
    "content": "You need to build a collaborative editor like Google Docs where multiple users can edit simultaneously. What frontend architecture would you use?",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-11-11T20:11:00.302Z",
    "updatedAt": "2025-11-11T20:11:00.309Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "senior",
      "intermediate"
    ],
    "explanation": "WebSockets enable real-time bidirectional communication. OT or CRDTs handle concurrent edits. Debouncing reduces network traffic. Optimistic updates provide instant feedback.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use WebSockets for real-time sync, Operational Transform (OT) or CRDTs for conflict resolution, debounce/throttle local changes, and optimistic UI updates",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Poll the server every second for updates",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only localStorage for collaboration",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Require users to lock sections before editing",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider system design principles and scalability",
      "Think about performance and user experience",
      "Review frontend architecture patterns"
    ],
    "metadata": {}
  },
  {
    "id": "system-design-senior-2",
    "title": "How do you design a frontend caching strategy for a large-scale e-commerce site?",
    "content": "Your e-commerce site has millions of products. How would you implement caching at the frontend level?",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-11-11T20:11:00.309Z",
    "updatedAt": "2025-11-11T20:11:00.309Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "senior",
      "intermediate"
    ],
    "explanation": "Service workers enable offline functionality. HTTP cache headers control browser caching. React Query/SWR provide intelligent request caching. CDN caches static assets globally.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use service workers for offline caching, HTTP cache headers (Cache-Control, ETag), in-memory cache (React Query/SWR), and CDN for static assets",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Cache everything in localStorage",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "No caching - fetch fresh data every time",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use only browser cache",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider system design principles and scalability",
      "Think about performance and user experience",
      "Review frontend architecture patterns"
    ],
    "metadata": {}
  },
  {
    "id": "system-design-senior-3",
    "title": "How would you architect a micro-frontend application?",
    "content": "You need to build a large application using micro-frontends. What architecture pattern would you use?",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-11-11T20:11:00.309Z",
    "updatedAt": "2025-11-11T20:11:00.309Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "senior",
      "intermediate"
    ],
    "explanation": "Module Federation enables runtime sharing. Single-spa orchestrates multiple frameworks. Shared dependencies reduce bundle size. Independent deployment enables team autonomy.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use Module Federation (Webpack 5), single-spa framework, or iframe-based approach. Implement shared dependencies, independent deployment, and runtime integration",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Put everything in one monolithic React app",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use separate domains for each micro-frontend",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Micro-frontends are not possible",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider system design principles and scalability",
      "Think about performance and user experience",
      "Review frontend architecture patterns"
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 52)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
