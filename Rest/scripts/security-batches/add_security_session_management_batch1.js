const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-01-sec7",
    "title": "How do HttpOnly and Secure cookies improve security?",
    "content": "Explain how the HttpOnly and Secure flags help prevent attacks.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Session Management",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.827Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "session-management",
      "cookies",
      "intermediate"
    ],
    "explanation": "HttpOnly prevents JavaScript from reading cookies (protects against XSS). Secure ensures cookies are only sent over HTTPS.",
    "points": 10,
    "sampleAnswers": [
      "HttpOnly prevents JavaScript from reading cookies (protects against XSS). Secure ensures cookies are only sent over HTTPS."
    ],
    "subcategory": "Cookies",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "HttpOnly prevents JavaScript from reading cookies (protects against XSS). Secure ensures cookies are only sent over HTTPS.",
        "isCorrect": true,
        "explanation": "HttpOnly prevents JavaScript from reading cookies (protects against XSS). Secure ensures cookies are only sent over HTTPS."
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
    "id": "sec-02-sec17",
    "title": "Which of these are valid ways to secure cookies against XSS and CSRF?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Session Management",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:17:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.829Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "session-management",
      "cookies",
      "intermediate"
    ],
    "explanation": "HttpOnly prevents JS access, Secure restricts to HTTPS, and SameSite limits cross-site requests. LocalStorage is accessible by JS and vulnerable to XSS.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Set HttpOnly flag",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Set Secure flag",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use SameSite=strict",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Store sensitive info in localStorage",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "subcategory": "Cookies",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-04-sec34",
    "title": "Which practices improve frontend security regarding cookies?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Session Management",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:34:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.831Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "session-management",
      "cookies",
      "intermediate"
    ],
    "explanation": "HttpOnly, Secure, and SameSite protect cookies from XSS, MITM, and CSRF. Storing passwords in cookies is insecure.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Set HttpOnly flag",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Set Secure flag for HTTPS",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use SameSite attribute",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Store passwords directly in cookies",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "subcategory": "Cookies",
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

console.log(`✅ Added ${newQuestions.length} questions for Session Management (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
