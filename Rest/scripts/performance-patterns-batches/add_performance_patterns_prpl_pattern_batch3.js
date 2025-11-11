const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-prpl-pp7",
    "title": "What is a potential drawback of pushing too many resources in PRPL?",
    "content": "Select the correct consequence of over-pushing or over-preloading resources.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "intermediate"
    ],
    "explanation": "Pushing unnecessary files wastes bandwidth and fills the browser cache, reducing overall performance.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Improved caching performance",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Wasted bandwidth and filled browser cache",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Better offline support",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Reduced initial load time",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-prpl-pp8",
    "title": "How does HTTP/2 improve performance for the PRPL pattern?",
    "content": "### HTTP/2 and PRPL\nHTTP/2 enables multiplexing — allowing multiple request/response streams over a single TCP connection. This reduces 'head-of-line' blocking and speeds up resource delivery, which complements PRPL’s 'Push' and 'Render' steps.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "advanced"
    ],
    "explanation": "HTTP/2 allows multiple requests in one TCP connection, reducing latency and supporting PRPL’s goal of faster initial route rendering.",
    "points": 10,
    "sampleAnswers": [
      "HTTP/2 allows multiple requests in one TCP connection, reducing latency and supporting PRPL’s goal of faster initial route rendering."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "HTTP/2 allows multiple requests in one TCP connection, reducing latency and supporting PRPL’s goal of faster initial route rendering.",
        "isCorrect": true,
        "explanation": "HTTP/2 allows multiple requests in one TCP connection, reducing latency and supporting PRPL’s goal of faster initial route rendering."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review performance optimization concepts.",
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
        "text": "Not quite. Consider web performance best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "performance-patterns-prpl-pp9",
    "title": "What role does the App Shell play in the PRPL pattern?",
    "content": "Identify how the App Shell architecture supports the PRPL pattern.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "intermediate"
    ],
    "explanation": "The App Shell delivers the minimal UI structure immediately, allowing PRPL to render the first route quickly and cache other assets later.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Provides a minimal structure that loads instantly and handles routing",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Delays rendering until all assets are fetched",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Caches server responses in memory only",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Forces the app to reload on each navigation",
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

console.log(`✅ Added ${newQuestions.length} questions for PRPL Pattern (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
