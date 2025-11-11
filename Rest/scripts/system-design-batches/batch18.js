const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q58",
    "title": "How do you design a frontend data store for posts and comments?",
    "content": "Explain the structure and normalization strategies for storing related entities in frontend state.",
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
    "explanation": "Normalize entities: store posts in a dictionary keyed by id, store comments separately keyed by id, reference relationships via ids to reduce duplication and simplify updates.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Normalize entities: store posts in a dictionary keyed by id, store comments separately keyed by id, reference relationships via ids to reduce duplication and simplify updates.",
        "isCorrect": true,
        "explanation": "Normalize entities: store posts in a dictionary keyed by id, store comments separately keyed by id, reference relationships via ids to reduce duplication and simplify updates."
      },
      {
        "id": "o2",
        "text": "Normalize entities: store posts in a dictionary keyed by id, store comments separately keyed by id, reference relationships via ids to reduce duplication and simplify updates",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "This method prioritizes user experience and maintainability.",
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
    "id": "system-design-q59",
    "title": "How do you handle data caching in frontend applications?",
    "content": "Explain strategies for caching API responses and syncing with the server.",
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
    "explanation": "Use in-memory stores, IndexedDB, or libraries like React Query / SWR to cache API responses, invalidate stale data, and optionally persist cache across sessions.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use in-memory stores, IndexedDB, or libraries like React Query / SWR to cache API responses, invalidate stale data, and optionally persist cache across sessions.",
        "isCorrect": true,
        "explanation": "Use in-memory stores, IndexedDB, or libraries like React Query / SWR to cache API responses, invalidate stale data, and optionally persist cache across sessions."
      },
      {
        "id": "o2",
        "text": "Use in-memory stores, IndexedDB, or libraries like React Query / SWR to cache API responses, invalidate stale data, and optionally persist cache across sessions",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "This method prioritizes user experience and maintainability.",
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
    "id": "system-design-q60",
    "title": "What is the difference between localStorage, sessionStorage, and IndexedDB?",
    "content": "Explain when to use each browser storage type for frontend data persistence.",
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
      "beginner"
    ],
    "explanation": "The correct answer is: localStorage persists data indefinitely across sessions",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "localStorage persists data indefinitely across sessions",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "sessionStorage persists data only for the session",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "IndexedDB is useful for storing large structured data",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "localStorage automatically syncs with the server",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 18)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
