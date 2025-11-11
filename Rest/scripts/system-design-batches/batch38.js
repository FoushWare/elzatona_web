const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q118",
    "title": "What is the difference between SameSite=Lax, Strict, and None for cookies?",
    "content": "Explain cookie SameSite attribute options.",
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
    "explanation": "The correct answer is: Strict: cookie only sent for same-site requests",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Strict: cookie only sent for same-site requests",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Lax: cookie sent for same-site and top-level navigations",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "None: cookie sent in all requests but must be Secure",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q119",
    "title": "What are signed URLs and how do they improve security?",
    "content": "Explain signed URLs in the context of serving private assets.",
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
    "explanation": "Signed URLs include a token or signature allowing temporary access to private assets like images or videos. They protect resources without exposing them publicly.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Signed URLs include a token or signature allowing temporary access to private assets like images or videos. They protect resources without exposing them publicly.",
        "isCorrect": true,
        "explanation": "Signed URLs include a token or signature allowing temporary access to private assets like images or videos. They protect resources without exposing them publicly."
      },
      {
        "id": "o2",
        "text": "Signed URLs include a token or signature allowing temporary access to private assets like images or videos",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " They protect resources without exposing them publicly",
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
    "id": "system-design-q120",
    "title": "How do you implement secure logout in a frontend application?",
    "content": "Explain best practices for logging users out securely.",
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
    "explanation": "On logout, clear tokens from memory/storage, invalidate session cookies, revoke refresh tokens server-side, and redirect users to a safe page.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "On logout, clear tokens from memory/storage, invalidate session cookies, revoke refresh tokens server-side, and redirect users to a safe page.",
        "isCorrect": true,
        "explanation": "On logout, clear tokens from memory/storage, invalidate session cookies, revoke refresh tokens server-side, and redirect users to a safe page."
      },
      {
        "id": "o2",
        "text": "On logout, clear tokens from memory/storage, invalidate session cookies, revoke refresh tokens server-side, and redirect users to a safe page",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 38)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
