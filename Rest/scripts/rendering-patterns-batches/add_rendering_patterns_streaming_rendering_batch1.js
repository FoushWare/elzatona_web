const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering8-1",
    "title": "HTTP Caching Basics",
    "content": "What is the main purpose of HTTP caching in web applications?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Streaming Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "streaming-rendering",
      "intermediate"
    ],
    "explanation": "To store responses locally or on a CDN to reduce server load and speed up subsequent requests.",
    "points": 10,
    "sampleAnswers": [
      "To store responses locally or on a CDN to reduce server load and speed up subsequent requests.",
      "It improves performance by serving cached responses without re-fetching from the server."
    ],
    "options": [
      {
        "id": "o1",
        "text": "To store responses locally or on a CDN to reduce server load and speed up subsequent requests.",
        "isCorrect": true,
        "explanation": "To store responses locally or on a CDN to reduce server load and speed up subsequent requests."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review rendering pattern concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider rendering strategy best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
  },
  {
    "id": "rendering-patterns-rendering8-2",
    "title": "Cache-Control Headers",
    "content": "Which HTTP header directive ensures a resource is revalidated after expiration?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Streaming Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "streaming-rendering",
      "intermediate"
    ],
    "explanation": "Cache-Control: must-revalidate",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Cache-Control: must-revalidate",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Cache-Control: immutable",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "ETag: strong",
        "isCorrect": false
      }
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
  },
  {
    "id": "rendering-patterns-rendering8-3",
    "title": "ETag Function",
    "content": "What role does an ETag header play in caching?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Streaming Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "streaming-rendering",
      "intermediate"
    ],
    "explanation": "ETag is a unique identifier for a resource version that helps browsers validate if content has changed.",
    "points": 10,
    "sampleAnswers": [
      "ETag is a unique identifier for a resource version that helps browsers validate if content has changed.",
      "If the ETag matches, the cached version is reused without downloading the full file."
    ],
    "options": [
      {
        "id": "o1",
        "text": "ETag is a unique identifier for a resource version that helps browsers validate if content has changed.",
        "isCorrect": true,
        "explanation": "ETag is a unique identifier for a resource version that helps browsers validate if content has changed."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review rendering pattern concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider rendering strategy best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
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

console.log(`✅ Added ${newQuestions.length} questions for Streaming Rendering (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
