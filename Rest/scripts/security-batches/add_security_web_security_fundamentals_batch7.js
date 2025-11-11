const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-09-sec80",
    "title": "What is the principle of least privilege in frontend security?",
    "content": "Explain how least privilege applies to frontend applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:20:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.833Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "least privilege",
      "intermediate"
    ],
    "explanation": "Least privilege restricts access to only what is necessary for a user or application to perform its tasks, reducing the risk of data breaches and unauthorized actions.",
    "points": 10,
    "sampleAnswers": [
      "Least privilege restricts access to only what is necessary for a user or application to perform its tasks, reducing the risk of data breaches and unauthorized actions."
    ],
    "subcategory": "Least Privilege",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Least privilege restricts access to only what is necessary for a user or application to perform its tasks, reducing the risk of data breaches and unauthorized actions.",
        "isCorrect": true,
        "explanation": "Least privilege restricts access to only what is necessary for a user or application to perform its tasks, reducing the risk of data breaches and unauthorized actions."
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
    "id": "sec-11-sec92",
    "title": "How can you prevent Clickjacking attacks?",
    "content": "Select all correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:31:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "ui redressing",
      "intermediate"
    ],
    "explanation": "X-Frame-Options, CSP frame-ancestors, and frame-busting scripts protect against clickjacking. HTTPS alone does not prevent it.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use X-Frame-Options header to deny framing",
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
        "text": "Ensure HTTPS is used",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Use JavaScript frame-busting techniques",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "subcategory": "UI Redressing",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-11-sec93",
    "title": "What is a Man-in-the-Middle (MITM) attack?",
    "content": "Explain how MITM attacks can compromise web applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:32:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "network",
      "intermediate"
    ],
    "explanation": "MITM occurs when an attacker intercepts communication between a user and a server, allowing them to read, modify, or inject malicious data without either party knowing.",
    "points": 10,
    "sampleAnswers": [
      "MITM occurs when an attacker intercepts communication between a user and a server, allowing them to read, modify, or inject malicious data without either party knowing."
    ],
    "subcategory": "Network",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "MITM occurs when an attacker intercepts communication between a user and a server, allowing them to read, modify, or inject malicious data without either party knowing.",
        "isCorrect": true,
        "explanation": "MITM occurs when an attacker intercepts communication between a user and a server, allowing them to read, modify, or inject malicious data without either party knowing."
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

console.log(`✅ Added ${newQuestions.length} questions for Web Security Fundamentals (Batch 7)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
