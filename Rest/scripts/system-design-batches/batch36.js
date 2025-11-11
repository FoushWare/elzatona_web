const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q112",
    "title": "What is OAuth2 and how is it used in frontend apps?",
    "content": "Explain OAuth2 flow and its role in frontend authentication.",
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
    "explanation": "OAuth2 is an authorization framework allowing apps to access resources on behalf of users. Frontend apps use it for social logins and delegated access with access tokens.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "OAuth2 is an authorization framework allowing apps to access resources on behalf of users. Frontend apps use it for social logins and delegated access with access tokens.",
        "isCorrect": true,
        "explanation": "OAuth2 is an authorization framework allowing apps to access resources on behalf of users. Frontend apps use it for social logins and delegated access with access tokens."
      },
      {
        "id": "o2",
        "text": "OAuth2 is an authorization framework allowing apps to access resources on behalf of users",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Frontend apps use it for social logins and delegated access with access tokens",
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
    "id": "system-design-q113",
    "title": "What is the difference between JWT and opaque tokens?",
    "content": "Compare JSON Web Tokens and opaque tokens in terms of usage and security.",
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
    "explanation": "JWTs are self-contained tokens with claims, verifiable by signature, no DB lookup needed. Opaque tokens are random strings requiring server lookup. JWTs scale better but must be handled securely.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "JWTs are self-contained tokens with claims, verifiable by signature, no DB lookup needed. Opaque tokens are random strings requiring server lookup. JWTs scale better but must be handled securely.",
        "isCorrect": true,
        "explanation": "JWTs are self-contained tokens with claims, verifiable by signature, no DB lookup needed. Opaque tokens are random strings requiring server lookup. JWTs scale better but must be handled securely."
      },
      {
        "id": "o2",
        "text": "JWTs are self-contained tokens with claims, verifiable by signature, no DB lookup needed",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Opaque tokens are random strings requiring server lookup",
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
    "id": "system-design-q114",
    "title": "What are HttpOnly cookies and why are they important?",
    "content": "Explain HttpOnly cookies and their role in frontend security.",
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
    "explanation": "HttpOnly cookies cannot be accessed via JavaScript, preventing XSS attacks from stealing tokens. They are useful for securely storing session tokens.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "HttpOnly cookies cannot be accessed via JavaScript, preventing XSS attacks from stealing tokens. They are useful for securely storing session tokens.",
        "isCorrect": true,
        "explanation": "HttpOnly cookies cannot be accessed via JavaScript, preventing XSS attacks from stealing tokens. They are useful for securely storing session tokens."
      },
      {
        "id": "o2",
        "text": "HttpOnly cookies cannot be accessed via JavaScript, preventing XSS attacks from stealing tokens",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " They are useful for securely storing session tokens",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 36)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
