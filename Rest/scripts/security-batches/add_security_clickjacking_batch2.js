const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-03-sec20",
    "title": "How can you prevent clickjacking?",
    "content": "Select all correct methods to prevent clickjacking attacks.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Clickjacking",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:20:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.830Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "clickjacking",
      "clickjacking",
      "intermediate"
    ],
    "explanation": "X-Frame-Options and frame-ancestors protect against embedding. JS detection can add extra protection; disabling JS is impractical.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use X-Frame-Options: DENY or SAMEORIGIN",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use Content Security Policy frame-ancestors",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Disable JavaScript entirely",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Detect and prevent iframes using JS",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "subcategory": "Clickjacking",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-05-sec35",
    "title": "What is Clickjacking (UI Redressing)?",
    "content": "Explain how clickjacking works and its impact on users.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Clickjacking",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:35:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.831Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "clickjacking",
      "clickjacking",
      "intermediate"
    ],
    "explanation": "Clickjacking tricks users into clicking hidden or disguised UI elements, performing unintended actions such as changing settings, submitting forms, or executing transactions.",
    "points": 10,
    "sampleAnswers": [
      "Clickjacking tricks users into clicking hidden or disguised UI elements, performing unintended actions such as changing settings, submitting forms, or executing transactions."
    ],
    "subcategory": "Clickjacking",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Clickjacking tricks users into clicking hidden or disguised UI elements, performing unintended actions such as changing settings, submitting forms, or executing transactions.",
        "isCorrect": true,
        "explanation": "Clickjacking tricks users into clicking hidden or disguised UI elements, performing unintended actions such as changing settings, submitting forms, or executing transactions."
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
    "id": "sec-05-sec36",
    "title": "How can you prevent Clickjacking attacks?",
    "content": "Select all correct mitigation strategies.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Clickjacking",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:36:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.831Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "clickjacking",
      "clickjacking",
      "intermediate"
    ],
    "explanation": "X-Frame-Options and CSP frame-ancestors prevent your site from being framed; additional user confirmation mitigates risk. CSS obfuscation is not a reliable defense.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use X-Frame-Options header",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Use Content Security Policy frame-ancestors directive",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Obfuscate your buttons with CSS",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Require user confirmation for critical actions",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "subcategory": "Clickjacking",
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

console.log(`✅ Added ${newQuestions.length} questions for Clickjacking (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
