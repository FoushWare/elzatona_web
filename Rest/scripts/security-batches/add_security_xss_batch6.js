const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-10-sec84",
    "title": "Why should you avoid using inline scripts in your frontend code?",
    "content": "Explain the security risk associated with inline JavaScript.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:23:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "intermediate"
    ],
    "explanation": "Inline scripts can easily be exploited by attackers in XSS attacks. Using external scripts and event bindings reduces the risk of executing malicious code.",
    "points": 10,
    "sampleAnswers": [
      "Inline scripts can easily be exploited by attackers in XSS attacks. Using external scripts and event bindings reduces the risk of executing malicious code."
    ],
    "subcategory": "XSS",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Inline scripts can easily be exploited by attackers in XSS attacks. Using external scripts and event bindings reduces the risk of executing malicious code.",
        "isCorrect": true,
        "explanation": "Inline scripts can easily be exploited by attackers in XSS attacks. Using external scripts and event bindings reduces the risk of executing malicious code."
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
    "id": "sec-10-sec86",
    "title": "Why is sanitizing user input important in frontend security?",
    "content": "Explain the consequences of unsanitized inputs.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:25:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "intermediate"
    ],
    "explanation": "Unsanitized input can contain scripts or HTML that execute in the user's browser, leading to XSS attacks, data theft, or session hijacking.",
    "points": 10,
    "sampleAnswers": [
      "Unsanitized input can contain scripts or HTML that execute in the user's browser, leading to XSS attacks, data theft, or session hijacking."
    ],
    "subcategory": "XSS",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Unsanitized input can contain scripts or HTML that execute in the user's browser, leading to XSS attacks, data theft, or session hijacking.",
        "isCorrect": true,
        "explanation": "Unsanitized input can contain scripts or HTML that execute in the user's browser, leading to XSS attacks, data theft, or session hijacking."
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
    "id": "sec-10-sec89",
    "title": "What is the risk of using eval() in frontend JavaScript?",
    "content": "Explain why eval() can be dangerous in web applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:28:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "intermediate"
    ],
    "explanation": "eval() executes arbitrary strings as code, which can lead to remote code execution if user input is passed, making applications vulnerable to XSS and other attacks.",
    "points": 10,
    "sampleAnswers": [
      "eval() executes arbitrary strings as code, which can lead to remote code execution if user input is passed, making applications vulnerable to XSS and other attacks."
    ],
    "subcategory": "XSS",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "eval() executes arbitrary strings as code, which can lead to remote code execution if user input is passed, making applications vulnerable to XSS and other attacks.",
        "isCorrect": true,
        "explanation": "eval() executes arbitrary strings as code, which can lead to remote code execution if user input is passed, making applications vulnerable to XSS and other attacks."
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

console.log(`✅ Added ${newQuestions.length} questions for XSS (Batch 6)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
