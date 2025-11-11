const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q34",
    "title": "What is a pessimistic update in frontend state management?",
    "content": "Explain pessimistic updates and how they differ from optimistic updates.",
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
    "explanation": "Pessimistic updates wait for server confirmation before updating the UI. This ensures consistency but may feel slower to the user.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Pessimistic updates wait for server confirmation before updating the UI. This ensures consistency but may feel slower to the user.",
        "isCorrect": true,
        "explanation": "Pessimistic updates wait for server confirmation before updating the UI. This ensures consistency but may feel slower to the user."
      },
      {
        "id": "o2",
        "text": "Pessimistic updates wait for server confirmation before updating the UI",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " This ensures consistency but may feel slower to the user",
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
    "id": "system-design-q35",
    "title": "What is long-polling and when would you use it?",
    "content": "Explain how long-polling works for real-time updates.",
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
    "explanation": "Long-polling keeps an HTTP request open until the server has data, then immediately sends a new request for the next update.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Client repeatedly sends requests at a fixed interval",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Client sends a request, server responds only when new data is available, then client repeats",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Client uses WebSocket connection for continuous streaming",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q36",
    "title": "What is WebSocket and why is it used in frontend apps?",
    "content": "Explain the WebSocket protocol and its benefits for real-time communication.",
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
    "explanation": "WebSocket establishes a persistent bidirectional connection between client and server, allowing real-time updates with lower overhead compared to HTTP polling.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "WebSocket establishes a persistent bidirectional connection between client and server, allowing real-time updates with lower overhead compared to HTTP polling.",
        "isCorrect": true,
        "explanation": "WebSocket establishes a persistent bidirectional connection between client and server, allowing real-time updates with lower overhead compared to HTTP polling."
      },
      {
        "id": "o2",
        "text": "WebSocket establishes a persistent bidirectional connection between client and server, allowing real-time updates with lower overhead compared to HTTP polling",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 10)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
