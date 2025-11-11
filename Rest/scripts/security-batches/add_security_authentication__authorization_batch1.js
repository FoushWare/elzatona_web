const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-07-sec57",
    "title": "What is JWT and how does it help with security?",
    "content": "Explain JWT (JSON Web Token) and its use in authentication.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Authentication & Authorization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:57:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "authentication-&-authorization",
      "authentication",
      "intermediate"
    ],
    "explanation": "JWT is a compact token used to securely transmit information between client and server. It ensures authenticity and integrity of the payload, commonly used for stateless authentication.",
    "points": 10,
    "sampleAnswers": [
      "JWT is a compact token used to securely transmit information between client and server. It ensures authenticity and integrity of the payload, commonly used for stateless authentication."
    ],
    "subcategory": "Authentication",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "JWT is a compact token used to securely transmit information between client and server. It ensures authenticity and integrity of the payload, commonly used for stateless authentication.",
        "isCorrect": true,
        "explanation": "JWT is a compact token used to securely transmit information between client and server. It ensures authenticity and integrity of the payload, commonly used for stateless authentication."
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
    "id": "sec-08-sec64",
    "title": "What is token expiration and why is it important?",
    "content": "Explain token expiration in authentication and session management.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Authentication & Authorization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:04:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "authentication-&-authorization",
      "authentication",
      "intermediate"
    ],
    "explanation": "Token expiration limits how long an authentication token is valid. This reduces risk if a token is leaked or stolen and forces users to re-authenticate after a set period.",
    "points": 10,
    "sampleAnswers": [
      "Token expiration limits how long an authentication token is valid. This reduces risk if a token is leaked or stolen and forces users to re-authenticate after a set period."
    ],
    "subcategory": "Authentication",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Token expiration limits how long an authentication token is valid. This reduces risk if a token is leaked or stolen and forces users to re-authenticate after a set period.",
        "isCorrect": true,
        "explanation": "Token expiration limits how long an authentication token is valid. This reduces risk if a token is leaked or stolen and forces users to re-authenticate after a set period."
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
    "id": "sec-08-sec66",
    "title": "What is OAuth 2.0?",
    "content": "Explain OAuth 2.0 and its use in web applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Authentication & Authorization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:06:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "authentication-&-authorization",
      "authentication",
      "intermediate"
    ],
    "explanation": "OAuth 2.0 is an authorization framework that allows third-party applications to access user resources without exposing credentials. It issues tokens with limited scope and duration.",
    "points": 10,
    "sampleAnswers": [
      "OAuth 2.0 is an authorization framework that allows third-party applications to access user resources without exposing credentials. It issues tokens with limited scope and duration."
    ],
    "subcategory": "Authentication",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "OAuth 2.0 is an authorization framework that allows third-party applications to access user resources without exposing credentials. It issues tokens with limited scope and duration.",
        "isCorrect": true,
        "explanation": "OAuth 2.0 is an authorization framework that allows third-party applications to access user resources without exposing credentials. It issues tokens with limited scope and duration."
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

console.log(`✅ Added ${newQuestions.length} questions for Authentication & Authorization (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
