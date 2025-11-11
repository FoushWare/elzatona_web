const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-11-sec94",
    "title": "How can HTTPS prevent MITM attacks?",
    "content": "Select the correct options.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:33:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "network",
      "intermediate"
    ],
    "explanation": "HTTPS encrypts traffic and verifies server identity, reducing MITM risks. It does not automatically prevent phishing.",
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
        "text": "Authenticates the server using certificates",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Prevents phishing attacks",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Prevents unauthorized data tampering",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "subcategory": "Network",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-11-sec98",
    "title": "What is the main danger of storing JWT tokens in localStorage?",
    "content": "Explain the security risk involved.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:37:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "tokens",
      "intermediate"
    ],
    "explanation": "JWT tokens in localStorage are accessible via JavaScript, making them vulnerable to XSS attacks. If stolen, attackers can impersonate users.",
    "points": 10,
    "sampleAnswers": [
      "JWT tokens in localStorage are accessible via JavaScript, making them vulnerable to XSS attacks. If stolen, attackers can impersonate users."
    ],
    "subcategory": "Tokens",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "JWT tokens in localStorage are accessible via JavaScript, making them vulnerable to XSS attacks. If stolen, attackers can impersonate users.",
        "isCorrect": true,
        "explanation": "JWT tokens in localStorage are accessible via JavaScript, making them vulnerable to XSS attacks. If stolen, attackers can impersonate users."
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
    "id": "sec-11-sec100",
    "title": "What is the role of TLS/SSL certificates in web security?",
    "content": "Explain how TLS/SSL certificates protect users and applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T01:39:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.834Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "network",
      "beginner",
      "intermediate"
    ],
    "explanation": "TLS/SSL certificates encrypt traffic between the browser and server, ensuring data confidentiality, integrity, and authentication, which prevents eavesdropping and MITM attacks.",
    "points": 10,
    "sampleAnswers": [
      "TLS/SSL certificates encrypt traffic between the browser and server, ensuring data confidentiality, integrity, and authentication, which prevents eavesdropping and MITM attacks."
    ],
    "subcategory": "Network",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "TLS/SSL certificates encrypt traffic between the browser and server, ensuring data confidentiality, integrity, and authentication, which prevents eavesdropping and MITM attacks.",
        "isCorrect": true,
        "explanation": "TLS/SSL certificates encrypt traffic between the browser and server, ensuring data confidentiality, integrity, and authentication, which prevents eavesdropping and MITM attacks."
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

console.log(`✅ Added ${newQuestions.length} questions for Web Security Fundamentals (Batch 8)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
