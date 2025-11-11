const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-06-sec49",
    "title": "What is input validation and why is it important for security?",
    "content": "Explain the role of input validation in preventing attacks like XSS and SQL Injection.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Input Validation & Sanitization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:49:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.832Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "input-validation-&-sanitization",
      "input validation",
      "intermediate"
    ],
    "explanation": "Input validation ensures that user-supplied data matches expected formats and content. It prevents malicious scripts or commands from being injected, mitigating XSS, SQL Injection, and other attacks.",
    "points": 10,
    "sampleAnswers": [
      "Input validation ensures that user-supplied data matches expected formats and content. It prevents malicious scripts or commands from being injected, mitigating XSS, SQL Injection, and other attacks."
    ],
    "subcategory": "Input Validation",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Input validation ensures that user-supplied data matches expected formats and content. It prevents malicious scripts or commands from being injected, mitigating XSS, SQL Injection, and other attacks.",
        "isCorrect": true,
        "explanation": "Input validation ensures that user-supplied data matches expected formats and content. It prevents malicious scripts or commands from being injected, mitigating XSS, SQL Injection, and other attacks."
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

console.log(`✅ Added ${newQuestions.length} questions for Input Validation & Sanitization (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
