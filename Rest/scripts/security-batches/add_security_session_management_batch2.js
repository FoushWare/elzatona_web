const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-06-sec48",
    "title": "True or False: Using HttpOnly and Secure flags on cookies protects against XSS and MITM attacks.",
    "content": "Evaluate the statement.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Session Management",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:48:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.832Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "session-management",
      "cookies",
      "intermediate"
    ],
    "explanation": "The correct answer is: True",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": true,
        "explanation": "HttpOnly prevents JavaScript access to cookies, mitigating XSS; Secure ensures cookies are only sent over HTTPS, mitigating MITM attacks."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Partially true - depends on the context",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Not applicable",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "subcategory": "Cookies",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-08-sec63",
    "title": "What is the purpose of the SameSite cookie attribute?",
    "content": "Explain how SameSite helps with web security.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Session Management",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:03:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "session-management",
      "cookies",
      "intermediate"
    ],
    "explanation": "The SameSite attribute restricts how cookies are sent with cross-site requests. 'Strict' blocks all cross-site cookie usage, 'Lax' allows certain safe methods, helping prevent CSRF attacks.",
    "points": 10,
    "sampleAnswers": [
      "The SameSite attribute restricts how cookies are sent with cross-site requests. 'Strict' blocks all cross-site cookie usage, 'Lax' allows certain safe methods, helping prevent CSRF attacks."
    ],
    "subcategory": "Cookies",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "The SameSite attribute restricts how cookies are sent with cross-site requests. 'Strict' blocks all cross-site cookie usage, 'Lax' allows certain safe methods, helping prevent CSRF attacks.",
        "isCorrect": true,
        "explanation": "The SameSite attribute restricts how cookies are sent with cross-site requests. 'Strict' blocks all cross-site cookie usage, 'Lax' allows certain safe methods, helping prevent CSRF attacks."
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
    "id": "sec-08-sec68",
    "title": "What is the purpose of HttpOnly cookies?",
    "content": "Explain how HttpOnly cookies improve security.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Session Management",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:08:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "session-management",
      "cookies",
      "intermediate"
    ],
    "explanation": "HttpOnly cookies cannot be accessed via JavaScript in the browser, reducing the risk of session theft through XSS attacks.",
    "points": 10,
    "sampleAnswers": [
      "HttpOnly cookies cannot be accessed via JavaScript in the browser, reducing the risk of session theft through XSS attacks."
    ],
    "subcategory": "Cookies",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "HttpOnly cookies cannot be accessed via JavaScript in the browser, reducing the risk of session theft through XSS attacks.",
        "isCorrect": true,
        "explanation": "HttpOnly cookies cannot be accessed via JavaScript in the browser, reducing the risk of session theft through XSS attacks."
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

console.log(`✅ Added ${newQuestions.length} questions for Session Management (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
