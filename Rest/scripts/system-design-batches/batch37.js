const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q115",
    "title": "What is CSRF and how do you prevent it?",
    "content": "Explain Cross-Site Request Forgery and prevention techniques.",
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
    "explanation": "CSRF tricks users into executing actions unknowingly. Prevent it using SameSite cookies, CSRF tokens in forms, and double-submit cookie patterns.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "CSRF tricks users into executing actions unknowingly. Prevent it using SameSite cookies, CSRF tokens in forms, and double-submit cookie patterns.",
        "isCorrect": true,
        "explanation": "CSRF tricks users into executing actions unknowingly. Prevent it using SameSite cookies, CSRF tokens in forms, and double-submit cookie patterns."
      },
      {
        "id": "o2",
        "text": "CSRF tricks users into executing actions unknowingly",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Prevent it using SameSite cookies, CSRF tokens in forms, and double-submit cookie patterns",
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
    "id": "system-design-q116",
    "title": "What is XSS and how can frontend apps defend against it?",
    "content": "Explain Cross-Site Scripting attacks and mitigation strategies.",
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
    "explanation": "XSS injects malicious scripts into webpages. Defenses include escaping user input, using CSP (Content Security Policy), sanitizing HTML, and avoiding <code>eval</code>.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "XSS injects malicious scripts into webpages. Defenses include escaping user input, using CSP (Content Security Policy), sanitizing HTML, and avoiding `eval`.",
        "isCorrect": true,
        "explanation": "XSS injects malicious scripts into webpages. Defenses include escaping user input, using CSP (Content Security Policy), sanitizing HTML, and avoiding `eval`."
      },
      {
        "id": "o2",
        "text": "XSS injects malicious scripts into webpages",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Defenses include escaping user input, using CSP (Content Security Policy), sanitizing HTML, and avoiding `eval`",
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
    "id": "system-design-q117",
    "title": "What is CORS and why does it matter in frontend apps?",
    "content": "Explain Cross-Origin Resource Sharing and its impact on frontend development.",
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
    "explanation": "CORS defines which domains can access APIs from a frontend app. It prevents malicious websites from making unauthorized requests on behalf of users.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "CORS defines which domains can access APIs from a frontend app. It prevents malicious websites from making unauthorized requests on behalf of users.",
        "isCorrect": true,
        "explanation": "CORS defines which domains can access APIs from a frontend app. It prevents malicious websites from making unauthorized requests on behalf of users."
      },
      {
        "id": "o2",
        "text": "CORS defines which domains can access APIs from a frontend app",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " It prevents malicious websites from making unauthorized requests on behalf of users",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 37)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
