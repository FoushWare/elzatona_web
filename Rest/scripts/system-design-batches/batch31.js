const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q97",
    "title": "How do you secure WebSocket connections in frontend apps?",
    "content": "Discuss authentication and encryption for WebSocket connections.",
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
    "explanation": "Use WSS (WebSocket over TLS), validate tokens or cookies on handshake, limit origin access, and avoid exposing sensitive data over the connection.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use WSS (WebSocket over TLS), validate tokens or cookies on handshake, limit origin access, and avoid exposing sensitive data over the connection.",
        "isCorrect": true,
        "explanation": "Use WSS (WebSocket over TLS), validate tokens or cookies on handshake, limit origin access, and avoid exposing sensitive data over the connection."
      },
      {
        "id": "o2",
        "text": "Use WSS (WebSocket over TLS), validate tokens or cookies on handshake, limit origin access, and avoid exposing sensitive data over the connection",
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
    "id": "system-design-q98",
    "title": "How do you manage subscriptions to multiple real-time channels efficiently?",
    "content": "Explain strategies for handling multiple feeds in frontend apps.",
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
    "explanation": "Use a central subscription manager, reuse connections, dynamically subscribe/unsubscribe as needed, and debounce updates from high-frequency channels.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use a central subscription manager, reuse connections, dynamically subscribe/unsubscribe as needed, and debounce updates from high-frequency channels.",
        "isCorrect": true,
        "explanation": "Use a central subscription manager, reuse connections, dynamically subscribe/unsubscribe as needed, and debounce updates from high-frequency channels."
      },
      {
        "id": "o2",
        "text": "Use a central subscription manager, reuse connections, dynamically subscribe/unsubscribe as needed, and debounce updates from high-frequency channels",
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
    "id": "system-design-q99",
    "title": "How do you handle fallback mechanisms if WebSocket or SSE fails?",
    "content": "Describe strategies to maintain real-time updates when primary methods fail.",
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
    "explanation": "Use long polling as a fallback, retry WebSocket connections periodically, or display stale cached data with visual indication until connection restores.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use long polling as a fallback, retry WebSocket connections periodically, or display stale cached data with visual indication until connection restores.",
        "isCorrect": true,
        "explanation": "Use long polling as a fallback, retry WebSocket connections periodically, or display stale cached data with visual indication until connection restores."
      },
      {
        "id": "o2",
        "text": "Use long polling as a fallback, retry WebSocket connections periodically, or display stale cached data with visual indication until connection restores",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 31)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
