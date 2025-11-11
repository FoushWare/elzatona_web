const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-03-sec22",
    "title": "Which practices reduce the risk of XSS in frontend frameworks like React?",
    "content": "Select all that apply.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:22:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.830Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "intermediate"
    ],
    "explanation": "React escapes content by default. Using DOMPurify for dangerouslySetInnerHTML and avoiding inline JS reduces XSS risk. LocalStorage is vulnerable to XSS.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use React’s JSX variable escaping",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Sanitize any HTML before using dangerouslySetInnerHTML",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Avoid inline event handlers",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Store all sensitive data in localStorage",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "subcategory": "XSS",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-03-sec26",
    "title": "What is the difference between stored and reflected XSS?",
    "content": "Explain the differences between stored (persistent) and reflected (non-persistent) XSS attacks.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:26:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.830Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "intermediate"
    ],
    "explanation": "Stored XSS saves the malicious script on the server/database and executes when users visit the page. Reflected XSS occurs when the server reflects user input immediately without storing it, often via URL parameters.",
    "points": 10,
    "sampleAnswers": [
      "Stored XSS saves the malicious script on the server/database and executes when users visit the page. Reflected XSS occurs when the server reflects user input immediately without storing it, often via URL parameters."
    ],
    "subcategory": "XSS",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Stored XSS saves the malicious script on the server/database and executes when users visit the page. Reflected XSS occurs when the server reflects user input immediately without storing it, often via URL parameters.",
        "isCorrect": true,
        "explanation": "Stored XSS saves the malicious script on the server/database and executes when users visit the page. Reflected XSS occurs when the server reflects user input immediately without storing it, often via URL parameters."
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
    "id": "sec-05-sec39",
    "title": "What is the difference between Reflected, Stored, and DOM-based XSS?",
    "content": "Explain the three main types of XSS attacks.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:39:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.831Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "intermediate"
    ],
    "explanation": "Reflected XSS: Malicious input is reflected immediately in a response. Stored XSS: Malicious input is stored in the server (DB) and executed for all users. DOM-based XSS: Payload executes by manipulating the DOM on the client side.",
    "points": 10,
    "sampleAnswers": [
      "Reflected XSS: Malicious input is reflected immediately in a response. Stored XSS: Malicious input is stored in the server (DB) and executed for all users. DOM-based XSS: Payload executes by manipulating the DOM on the client side."
    ],
    "subcategory": "XSS",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Reflected XSS: Malicious input is reflected immediately in a response. Stored XSS: Malicious input is stored in the server (DB) and executed for all users. DOM-based XSS: Payload executes by manipulating the DOM on the client side.",
        "isCorrect": true,
        "explanation": "Reflected XSS: Malicious input is reflected immediately in a response. Stored XSS: Malicious input is stored in the server (DB) and executed for all users. DOM-based XSS: Payload executes by manipulating the DOM on the client side."
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

console.log(`✅ Added ${newQuestions.length} questions for XSS (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
