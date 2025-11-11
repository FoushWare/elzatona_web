const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q70",
    "title": "What are some strategies to monitor frontend errors in production?",
    "content": "Explain how to track and report frontend runtime errors effectively.",
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
    "explanation": "Use services like Sentry, LogRocket, or Rollbar to capture uncaught errors, promise rejections, and user sessions. Include context and stack traces for debugging.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use services like Sentry, LogRocket, or Rollbar to capture uncaught errors, promise rejections, and user sessions. Include context and stack traces for debugging.",
        "isCorrect": true,
        "explanation": "Use services like Sentry, LogRocket, or Rollbar to capture uncaught errors, promise rejections, and user sessions. Include context and stack traces for debugging."
      },
      {
        "id": "o2",
        "text": "Use services like Sentry, LogRocket, or Rollbar to capture uncaught errors, promise rejections, and user sessions",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Include context and stack traces for debugging",
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
    "id": "system-design-q71",
    "title": "What is a signed URL and why is it important for security?",
    "content": "Explain the purpose of signed URLs for accessing private resources.",
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
    "explanation": "Signed URLs provide temporary, time-limited access to private resources on a server or CDN. They prevent unauthorized access and allow caching while maintaining security.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Signed URLs provide temporary, time-limited access to private resources on a server or CDN. They prevent unauthorized access and allow caching while maintaining security.",
        "isCorrect": true,
        "explanation": "Signed URLs provide temporary, time-limited access to private resources on a server or CDN. They prevent unauthorized access and allow caching while maintaining security."
      },
      {
        "id": "o2",
        "text": "Signed URLs provide temporary, time-limited access to private resources on a server or CDN",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " They prevent unauthorized access and allow caching while maintaining security",
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
    "id": "system-design-q72",
    "title": "How do you prevent CSRF attacks in frontend applications?",
    "content": "Describe techniques to protect against Cross-Site Request Forgery.",
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
    "explanation": "Use anti-CSRF tokens in requests, ensure same-site cookies, validate origin headers, and use secure HTTP methods for state-changing requests.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use anti-CSRF tokens in requests, ensure same-site cookies, validate origin headers, and use secure HTTP methods for state-changing requests.",
        "isCorrect": true,
        "explanation": "Use anti-CSRF tokens in requests, ensure same-site cookies, validate origin headers, and use secure HTTP methods for state-changing requests."
      },
      {
        "id": "o2",
        "text": "Use anti-CSRF tokens in requests, ensure same-site cookies, validate origin headers, and use secure HTTP methods for state-changing requests",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 22)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
