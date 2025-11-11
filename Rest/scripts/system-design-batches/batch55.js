const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-senior-10",
    "title": "How do you design a frontend search system with autocomplete?",
    "content": "You need to implement search with real-time autocomplete for millions of items. How would you architect this?",
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
    "explanation": "Debouncing reduces API calls. Query caching improves performance. Virtual scrolling handles large result sets. Highlighting improves UX. Suggestions guide users.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Debounce input, use search API with query caching, implement virtual scrolling for results, highlight matches, and provide search suggestions",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Search on every keystroke without debouncing",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Load all items and filter client-side",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "No autocomplete needed",
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
    "id": "system-design-senior-11",
    "title": "How would you design a frontend data visualization system?",
    "content": "You need to display complex charts and graphs with real-time updates. How would you architect this?",
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
    "explanation": "Visualization libraries provide chart components. WebSockets enable real-time updates. Canvas/SVG handle complex rendering. Aggregation improves performance. Responsive design ensures mobile compatibility.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use visualization library (D3.js, Chart.js), implement WebSocket for real-time updates, use canvas/SVG for rendering, implement data aggregation, and provide responsive charts",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use only HTML tables",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Render all data points without aggregation",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "No real-time updates needed",
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
    "id": "system-design-senior-12",
    "title": "How do you design a frontend authentication and authorization system?",
    "content": "Your app needs secure authentication with role-based access control. How would you implement this?",
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
    "explanation": "httpOnly cookies prevent XSS attacks. Refresh tokens enable secure token renewal. Route guards protect pages. Token expiration handling improves security. Secure logout clears all tokens.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use JWT tokens stored in httpOnly cookies, implement refresh token rotation, use route guards for authorization, handle token expiration, and provide secure logout",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Store passwords in localStorage",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only session storage",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "No authentication needed",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 55)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
