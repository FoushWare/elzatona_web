const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q146",
    "title": "What are HttpOnly cookies and why are they important for frontend security?",
    "content": "Explain how HttpOnly cookies protect authentication tokens.",
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
    "explanation": "HttpOnly cookies cannot be accessed via JavaScript, protecting tokens from XSS attacks. They are recommended for storing session tokens securely.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "HttpOnly cookies cannot be accessed via JavaScript, protecting tokens from XSS attacks. They are recommended for storing session tokens securely.",
        "isCorrect": true,
        "explanation": "HttpOnly cookies cannot be accessed via JavaScript, protecting tokens from XSS attacks. They are recommended for storing session tokens securely."
      },
      {
        "id": "o2",
        "text": "HttpOnly cookies cannot be accessed via JavaScript, protecting tokens from XSS attacks",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " They are recommended for storing session tokens securely",
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
    "id": "system-design-q147",
    "title": "What is OAuth 2.0 and how is it used in frontend applications?",
    "content": "Describe OAuth 2.0 flows and their relevance to frontend apps.",
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
    "explanation": "OAuth 2.0 is an authorization framework. Frontend apps use flows like Authorization Code with PKCE to securely authenticate users and obtain tokens.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "OAuth 2.0 is an authorization framework. Frontend apps use flows like Authorization Code with PKCE to securely authenticate users and obtain tokens.",
        "isCorrect": true,
        "explanation": "OAuth 2.0 is an authorization framework. Frontend apps use flows like Authorization Code with PKCE to securely authenticate users and obtain tokens."
      },
      {
        "id": "o2",
        "text": "0 is an authorization framework",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Frontend apps use flows like Authorization Code with PKCE to securely authenticate users and obtain tokens",
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
    "id": "system-design-q148",
    "title": "What is multi-factor authentication (MFA) and how is it implemented in frontend apps?",
    "content": "Explain MFA and how frontend applications can support it.",
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
    "explanation": "MFA requires multiple verification factors (e.g., password + SMS code). Frontend apps can support MFA by integrating with APIs for OTPs, push notifications, or authenticator apps.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "MFA requires multiple verification factors (e.g., password + SMS code). Frontend apps can support MFA by integrating with APIs for OTPs, push notifications, or authenticator apps.",
        "isCorrect": true,
        "explanation": "MFA requires multiple verification factors (e.g., password + SMS code). Frontend apps can support MFA by integrating with APIs for OTPs, push notifications, or authenticator apps."
      },
      {
        "id": "o2",
        "text": "MFA requires multiple verification factors (e",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": ", password + SMS code)",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 47)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
