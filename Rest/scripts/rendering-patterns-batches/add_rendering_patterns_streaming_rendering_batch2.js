const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering8-4",
    "title": "CDN Edge Caching",
    "content": "How does CDN edge caching improve rendering performance?",
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
    "explanation": "It stores static assets closer to the user geographically to reduce latency",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "It stores static assets closer to the user geographically to reduce latency",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "It only caches dynamic content for faster hydration",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "It disables browser caching entirely",
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
    "id": "rendering-patterns-rendering8-5",
    "title": "Preconnect and Prefetch",
    "content": "What is the difference between preconnect and prefetch in web performance optimization?",
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
    "explanation": "Preconnect establishes early network connections (DNS, TCP, TLS) to improve later requests.",
    "points": 10,
    "sampleAnswers": [
      "Preconnect establishes early network connections (DNS, TCP, TLS) to improve later requests.",
      "Prefetch fetches resources ahead of time that the user is likely to need soon."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Preconnect establishes early network connections (DNS, TCP, TLS) to improve later requests.",
        "isCorrect": true,
        "explanation": "Preconnect establishes early network connections (DNS, TCP, TLS) to improve later requests."
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
    "id": "rendering-patterns-rendering8-6",
    "title": "Static Asset Versioning",
    "content": "Why is versioning important for static assets in caching?",
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
    "explanation": "It ensures browsers fetch updated assets when changes occur",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "It ensures browsers fetch updated assets when changes occur",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "It prevents caching altogether",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "It slows down content delivery",
        "isCorrect": false
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

console.log(`✅ Added ${newQuestions.length} questions for Streaming Rendering (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
