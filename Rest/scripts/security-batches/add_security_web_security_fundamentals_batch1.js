const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-01-sec6",
    "title": "True or False: MITM attacks only affect unsecured HTTP connections.",
    "content": "Evaluate whether this statement is true or false.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.827Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "mitm",
      "intermediate"
    ],
    "explanation": "The correct answer is: False",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": false,
        "explanation": "MITM can also target HTTPS via certificate spoofing or rogue networks."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "MITM can also target HTTPS via certificate spoofing or rogue networks."
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
    "subcategory": "MITM",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-02-sec12",
    "title": "True or False: MITM attacks can steal data from HTTPS connections if SSL/TLS is not validated correctly.",
    "content": "Evaluate whether this statement is true or false.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:12:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.829Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "mitm",
      "intermediate"
    ],
    "explanation": "The correct answer is: True",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": true,
        "explanation": "Improper certificate validation or self-signed certs allow MITM attacks even over HTTPS."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": ""
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
    "subcategory": "MITM",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-02-sec18",
    "title": "True or False: Using third-party JavaScript libraries without review is safe if your site uses HTTPS.",
    "content": "Evaluate this statement.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "Web Security Fundamentals",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:18:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.829Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "web-security-fundamentals",
      "third-party",
      "intermediate"
    ],
    "explanation": "The correct answer is: False",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": false,
        "explanation": "Even over HTTPS, malicious or vulnerable third-party JS can introduce XSS or malware."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "Even over HTTPS, malicious or vulnerable third-party JS can introduce XSS or malware."
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
    "subcategory": "Third-Party",
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

console.log(`✅ Added ${newQuestions.length} questions for Web Security Fundamentals (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
