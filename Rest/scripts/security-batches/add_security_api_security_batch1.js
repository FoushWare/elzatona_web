const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-07-sec55",
    "title": "What is rate limiting and why is it important?",
    "content": "Explain how rate limiting protects web applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "API Security",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:55:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "api-security",
      "rate limiting",
      "intermediate"
    ],
    "explanation": "Rate limiting restricts the number of requests a client can make in a given time period, protecting the server from abuse, brute-force attacks, and denial-of-service attacks.",
    "points": 10,
    "sampleAnswers": [
      "Rate limiting restricts the number of requests a client can make in a given time period, protecting the server from abuse, brute-force attacks, and denial-of-service attacks."
    ],
    "subcategory": "Rate Limiting",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Rate limiting restricts the number of requests a client can make in a given time period, protecting the server from abuse, brute-force attacks, and denial-of-service attacks.",
        "isCorrect": true,
        "explanation": "Rate limiting restricts the number of requests a client can make in a given time period, protecting the server from abuse, brute-force attacks, and denial-of-service attacks."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review web security concepts.",
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
        "text": "Not quite. Consider security best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "sec-08-sec65",
    "title": "How can you secure API endpoints in a frontend application?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "API Security",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:05:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "api-security",
      "api security",
      "intermediate"
    ],
    "explanation": "Server-side validation, HTTPS, and token-based authentication are essential. Client-side checks alone cannot ensure security.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use authentication tokens like JWT",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Enforce HTTPS for all API requests",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Validate all user inputs on the server",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Rely only on client-side checks",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "subcategory": "API Security",
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

console.log(`✅ Added ${newQuestions.length} questions for API Security (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
