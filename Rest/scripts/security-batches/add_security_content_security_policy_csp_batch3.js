const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-10-sec85",
    "title": "What is the role of Content Security Policy (CSP) in frontend security?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Content Security Policy (CSP)",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:24:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "content-security-policy-csp",
      "headers",
      "intermediate"
    ],
    "explanation": "CSP controls resource loading and helps prevent XSS, but does not replace input validation.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Restricts sources of scripts and other resources",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Helps prevent XSS attacks",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Replaces the need for input validation",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Can block inline styles and scripts if configured",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "subcategory": "Headers",
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

console.log(`✅ Added ${newQuestions.length} questions for Content Security Policy (CSP) (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
