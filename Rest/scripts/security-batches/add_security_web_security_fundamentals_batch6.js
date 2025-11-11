const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-09-sec75",
    "title": "What is HTTP Strict Transport Security (HSTS)?",
    "content": "Explain how HSTS helps improve web security.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:15:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "headers",
      "intermediate"
    ],
    "explanation": "HSTS tells browsers to only communicate over HTTPS, preventing protocol downgrade attacks and reducing the risk of MITM attacks.",
    "points": 10,
    "sampleAnswers": [
      "HSTS tells browsers to only communicate over HTTPS, preventing protocol downgrade attacks and reducing the risk of MITM attacks."
    ],
    "subcategory": "Headers",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "HSTS tells browsers to only communicate over HTTPS, preventing protocol downgrade attacks and reducing the risk of MITM attacks.",
        "isCorrect": true,
        "explanation": "HSTS tells browsers to only communicate over HTTPS, preventing protocol downgrade attacks and reducing the risk of MITM attacks."
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
    "id": "sec-09-sec76",
    "title": "What is Subresource Integrity (SRI)?",
    "content": "Explain how SRI protects your frontend applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:16:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "headers",
      "intermediate"
    ],
    "explanation": "SRI allows you to provide a hash for external scripts or stylesheets. The browser verifies the file has not been tampered with, protecting against CDN compromises or MITM attacks.",
    "points": 10,
    "sampleAnswers": [
      "SRI allows you to provide a hash for external scripts or stylesheets. The browser verifies the file has not been tampered with, protecting against CDN compromises or MITM attacks."
    ],
    "subcategory": "Headers",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "SRI allows you to provide a hash for external scripts or stylesheets. The browser verifies the file has not been tampered with, protecting against CDN compromises or MITM attacks.",
        "isCorrect": true,
        "explanation": "SRI allows you to provide a hash for external scripts or stylesheets. The browser verifies the file has not been tampered with, protecting against CDN compromises or MITM attacks."
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
    "id": "sec-09-sec78",
    "title": "What are security implications of storing sensitive data in localStorage?",
    "content": "Explain the risks of using localStorage for authentication tokens.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:18:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "storage",
      "intermediate"
    ],
    "explanation": "localStorage is accessible via JavaScript, making it vulnerable to XSS attacks. Sensitive tokens can be stolen if an attacker injects malicious scripts.",
    "points": 10,
    "sampleAnswers": [
      "localStorage is accessible via JavaScript, making it vulnerable to XSS attacks. Sensitive tokens can be stolen if an attacker injects malicious scripts."
    ],
    "subcategory": "Storage",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "localStorage is accessible via JavaScript, making it vulnerable to XSS attacks. Sensitive tokens can be stolen if an attacker injects malicious scripts.",
        "isCorrect": true,
        "explanation": "localStorage is accessible via JavaScript, making it vulnerable to XSS attacks. Sensitive tokens can be stolen if an attacker injects malicious scripts."
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

console.log(`✅ Added ${newQuestions.length} questions for Web Security Fundamentals (Batch 6)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
