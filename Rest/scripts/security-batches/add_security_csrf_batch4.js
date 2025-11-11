const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-10-sec81",
    "title": "How does CSRF (Cross-Site Request Forgery) work?",
    "content": "Explain the mechanism of a CSRF attack and its potential impact.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "CSRF",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:20:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-request-forgery-csrf",
      "csrf",
      "intermediate"
    ],
    "explanation": "CSRF tricks an authenticated user into unknowingly performing actions on a web application, like changing account details or transferring funds, by submitting malicious requests from another site.",
    "points": 10,
    "sampleAnswers": [
      "CSRF tricks an authenticated user into unknowingly performing actions on a web application, like changing account details or transferring funds, by submitting malicious requests from another site."
    ],
    "subcategory": "CSRF",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "CSRF tricks an authenticated user into unknowingly performing actions on a web application, like changing account details or transferring funds, by submitting malicious requests from another site.",
        "isCorrect": true,
        "explanation": "CSRF tricks an authenticated user into unknowingly performing actions on a web application, like changing account details or transferring funds, by submitting malicious requests from another site."
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
    "id": "sec-10-sec82",
    "title": "How can you prevent CSRF attacks?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "CSRF",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:21:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-request-forgery-csrf",
      "csrf",
      "intermediate"
    ],
    "explanation": "CSRF tokens, SameSite cookies, and HTTPS help prevent CSRF attacks. Disabling cookies is not practical for most web apps.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use CSRF tokens in forms",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use SameSite cookie attribute",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use HTTPS",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Disable cookies completely",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "subcategory": "CSRF",
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

console.log(`✅ Added ${newQuestions.length} questions for CSRF (Batch 4)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
