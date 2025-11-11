const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-02-sec15",
    "title": "True or False: Using HTTPS alone completely protects against XSS.",
    "content": "Evaluate the statement.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:15:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.829Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: False",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": false,
        "explanation": "HTTPS protects data in transit but does not prevent script injection on the client side."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "HTTPS protects data in transit but does not prevent script injection on the client side."
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
    "subcategory": "XSS",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-02-sec16",
    "title": "How can you prevent DOM-based XSS in JavaScript?",
    "content": "Explain best practices for preventing DOM-based XSS attacks in frontend code.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:16:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.829Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "advanced"
    ],
    "explanation": "Avoid setting innerHTML with untrusted input, sanitize inputs with libraries like DOMPurify, use textContent instead of innerHTML, and avoid inline event handlers.",
    "points": 10,
    "sampleAnswers": [
      "Avoid setting innerHTML with untrusted input, sanitize inputs with libraries like DOMPurify, use textContent instead of innerHTML, and avoid inline event handlers."
    ],
    "subcategory": "XSS",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Avoid setting innerHTML with untrusted input, sanitize inputs with libraries like DOMPurify, use textContent instead of innerHTML, and avoid inline event handlers.",
        "isCorrect": true,
        "explanation": "Avoid setting innerHTML with untrusted input, sanitize inputs with libraries like DOMPurify, use textContent instead of innerHTML, and avoid inline event handlers."
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
    "id": "sec-03-sec21",
    "title": "True or False: DOM-based XSS only occurs on the server side.",
    "content": "Evaluate whether this statement is true or false.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "XSS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:21:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.830Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-scripting-xss",
      "xss",
      "intermediate"
    ],
    "explanation": "The correct answer is: False",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": false,
        "explanation": "DOM-based XSS occurs entirely on the client-side, manipulating the DOM with JavaScript."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "DOM-based XSS occurs entirely on the client-side, manipulating the DOM with JavaScript."
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
    "subcategory": "XSS",
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

console.log(`✅ Added ${newQuestions.length} questions for XSS (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
