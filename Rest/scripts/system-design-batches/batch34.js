const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q106",
    "title": "How does IndexedDB help with offline frontend applications?",
    "content": "Explain the role of IndexedDB for client-side storage.",
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
    "explanation": "IndexedDB is a low-level NoSQL database in the browser. It stores structured data, useful for offline applications where data must persist across sessions.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "IndexedDB is a low-level NoSQL database in the browser. It stores structured data, useful for offline applications where data must persist across sessions.",
        "isCorrect": true,
        "explanation": "IndexedDB is a low-level NoSQL database in the browser. It stores structured data, useful for offline applications where data must persist across sessions."
      },
      {
        "id": "o2",
        "text": "IndexedDB is a low-level NoSQL database in the browser",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " It stores structured data, useful for offline applications where data must persist across sessions",
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
    "id": "system-design-q107",
    "title": "How do you implement offline-first design in frontend apps?",
    "content": "Describe strategies to make a web app work offline.",
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
    "explanation": "Use service workers for caching, IndexedDB for persistent storage, queue requests for background sync, and gracefully degrade UI when offline.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use service workers for caching, IndexedDB for persistent storage, queue requests for background sync, and gracefully degrade UI when offline.",
        "isCorrect": true,
        "explanation": "Use service workers for caching, IndexedDB for persistent storage, queue requests for background sync, and gracefully degrade UI when offline."
      },
      {
        "id": "o2",
        "text": "Use service workers for caching, IndexedDB for persistent storage, queue requests for background sync, and gracefully degrade UI when offline",
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
    "id": "system-design-q108",
    "title": "What is background sync and how does it work with service workers?",
    "content": "Explain background sync and its benefits for frontend apps.",
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
    "explanation": "Background sync allows deferred actions like sending requests once connectivity is restored. Service workers handle queued tasks even when the app is closed.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Background sync allows deferred actions like sending requests once connectivity is restored. Service workers handle queued tasks even when the app is closed.",
        "isCorrect": true,
        "explanation": "Background sync allows deferred actions like sending requests once connectivity is restored. Service workers handle queued tasks even when the app is closed."
      },
      {
        "id": "o2",
        "text": "Background sync allows deferred actions like sending requests once connectivity is restored",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Service workers handle queued tasks even when the app is closed",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 34)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
