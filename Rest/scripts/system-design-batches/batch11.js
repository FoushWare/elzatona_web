const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q37",
    "title": "What are Server-Sent Events (SSE) and when should they be used?",
    "content": "Explain SSE and how it differs from WebSocket.",
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
    "explanation": "SSE provides a unidirectional stream of updates from server to client over HTTP.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "SSE is unidirectional (server -> client)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "WebSocket is bidirectional (client <-> server)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "SSE requires a persistent TCP connection like WebSocket",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q38",
    "title": "How do you design a frontend entity for a Post with Comments and Media?",
    "content": "Describe the structure of a frontend entity object for a Post.",
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
    "id": "system-design-q39",
    "title": "What is the difference between REST and GraphQL APIs for frontend consumption?",
    "content": "Compare REST and GraphQL in terms of data fetching and flexibility.",
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
    "explanation": "The correct answer is: REST returns fixed data structures per endpoint",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "REST returns fixed data structures per endpoint",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "GraphQL allows client to request exactly the fields needed",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "GraphQL cannot support real-time updates",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "REST APIs can never be cached",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 11)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
