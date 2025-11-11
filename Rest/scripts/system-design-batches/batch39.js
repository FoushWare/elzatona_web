const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q121",
    "title": "What is the difference between vertical and horizontal scaling in frontend systems?",
    "content": "Explain how vertical and horizontal scaling apply to frontend deployments.",
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
    "explanation": "Vertical scaling means adding more power (CPU/RAM) to a single server. Horizontal scaling means adding more servers and distributing traffic using load balancers or CDNs.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Vertical scaling means adding more power (CPU/RAM) to a single server. Horizontal scaling means adding more servers and distributing traffic using load balancers or CDNs.",
        "isCorrect": true,
        "explanation": "Vertical scaling means adding more power (CPU/RAM) to a single server. Horizontal scaling means adding more servers and distributing traffic using load balancers or CDNs."
      },
      {
        "id": "o2",
        "text": "Vertical scaling means adding more power (CPU/RAM) to a single server",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Horizontal scaling means adding more servers and distributing traffic using load balancers or CDNs",
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
    "id": "system-design-q122",
    "title": "How do CDNs help with frontend scalability?",
    "content": "Explain the role of Content Delivery Networks in frontend performance and scalability.",
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
    "explanation": "CDNs distribute static assets across global edge servers. This reduces latency, improves performance, and reduces load on origin servers.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "CDNs distribute static assets across global edge servers. This reduces latency, improves performance, and reduces load on origin servers.",
        "isCorrect": true,
        "explanation": "CDNs distribute static assets across global edge servers. This reduces latency, improves performance, and reduces load on origin servers."
      },
      {
        "id": "o2",
        "text": "CDNs distribute static assets across global edge servers",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " This reduces latency, improves performance, and reduces load on origin servers",
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
    "id": "system-design-q123",
    "title": "What is edge computing and how can frontend apps benefit from it?",
    "content": "Explain edge computing in the context of frontend applications.",
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
    "explanation": "Edge computing runs code closer to users, reducing latency. Frontend apps benefit from edge functions for caching, authentication, and A/B testing.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Edge computing runs code closer to users, reducing latency. Frontend apps benefit from edge functions for caching, authentication, and A/B testing.",
        "isCorrect": true,
        "explanation": "Edge computing runs code closer to users, reducing latency. Frontend apps benefit from edge functions for caching, authentication, and A/B testing."
      },
      {
        "id": "o2",
        "text": "Edge computing runs code closer to users, reducing latency",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Frontend apps benefit from edge functions for caching, authentication, and A/B testing",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 39)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
