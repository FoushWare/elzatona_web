const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-06-sec50",
    "title": "Which is safer for sensitive data transmission: HTTP or HTTPS?",
    "content": "Select the correct answer.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "HTTPS & SSL/TLS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:50:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "https-&-ssl/tls",
      "transport security",
      "beginner",
      "intermediate"
    ],
    "explanation": "HTTPS encrypts data in transit, ensuring confidentiality, integrity, and protection against MITM attacks, unlike HTTP.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "HTTP",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "HTTPS",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Both are equally safe",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Depends on browser",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "subcategory": "Transport Security",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-09-sec77",
    "title": "How do HTTPS and TLS protect against web attacks?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "HTTPS & SSL/TLS",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:17:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "https-&-ssl/tls",
      "tls",
      "intermediate"
    ],
    "explanation": "HTTPS/TLS encrypts data, ensures integrity, and authenticates servers. It does not sanitize inputs.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Encrypts data in transit",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Prevents eavesdropping and tampering",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Automatically sanitizes user inputs",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Provides server authentication",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "subcategory": "TLS",
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

console.log(`✅ Added ${newQuestions.length} questions for HTTPS & SSL/TLS (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
