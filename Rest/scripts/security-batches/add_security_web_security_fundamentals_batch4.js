const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-05-sec38",
    "title": "How can HTTPS prevent MITM attacks?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:38:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.831Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "mitm",
      "intermediate"
    ],
    "explanation": "HTTPS (TLS) encrypts data, ensures integrity, and authenticates the server. It does not automatically detect phishing sites.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Encrypts traffic between client and server",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Prevents tampering of data in transit",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Automatically detects phishing websites",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Ensures integrity via TLS certificates",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "subcategory": "MITM",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-07-sec51",
    "title": "What is a Man-in-the-Middle (MITM) attack?",
    "content": "Explain how MITM attacks work and their potential impact on web applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:51:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "mitm",
      "intermediate"
    ],
    "explanation": "In a MITM attack, an attacker intercepts communication between a client and server, potentially stealing sensitive data like passwords, cookies, or session tokens, or modifying the communication without the user's knowledge.",
    "points": 10,
    "sampleAnswers": [
      "In a MITM attack, an attacker intercepts communication between a client and server, potentially stealing sensitive data like passwords, cookies, or session tokens, or modifying the communication without the user's knowledge."
    ],
    "subcategory": "MITM",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "In a MITM attack, an attacker intercepts communication between a client and server, potentially stealing sensitive data like passwords, cookies, or session tokens, or modifying the communication without the user's knowledge.",
        "isCorrect": true,
        "explanation": "In a MITM attack, an attacker intercepts communication between a client and server, potentially stealing sensitive data like passwords, cookies, or session tokens, or modifying the communication without the user's knowledge."
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
    "id": "sec-07-sec52",
    "title": "How can HTTPS prevent MITM attacks?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:52:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "mitm",
      "beginner",
      "intermediate"
    ],
    "explanation": "HTTPS encrypts communication, validates the server's certificate, and combined with Secure cookies, helps prevent MITM attacks.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Encrypts data between client and server",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Validates server identity using certificates",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Blocks phishing emails automatically",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Prevents cookie theft if Secure flag is set",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "subcategory": "MITM",
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

console.log(`✅ Added ${newQuestions.length} questions for Web Security Fundamentals (Batch 4)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
