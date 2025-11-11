const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/security-questions.json');

const newQuestions = [
  {
    "id": "sec-01-sec3",
    "title": "True or False: CSRF attacks rely on user authentication.",
    "content": "Evaluate whether this statement is true or false.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "CSRF",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.827Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-request-forgery-csrf",
      "csrf",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: True",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": true,
        "explanation": "CSRF exploits the fact that the user is already authenticated."
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
    "subcategory": "CSRF",
    "hints": [],
    "metadata": {}
  },
  {
    "id": "sec-02-sec10",
    "title": "What is CSRF (Cross-Site Request Forgery)?",
    "content": "Explain what CSRF attacks are and how they work in web applications.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "CSRF",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:10:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.828Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-request-forgery-csrf",
      "csrf",
      "intermediate"
    ],
    "explanation": "CSRF tricks a logged-in user into performing unwanted actions on a web application by submitting requests without their consent, using their authentication credentials.",
    "points": 10,
    "sampleAnswers": [
      "CSRF tricks a logged-in user into performing unwanted actions on a web application by submitting requests without their consent, using their authentication credentials."
    ],
    "subcategory": "CSRF",
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "CSRF tricks a logged-in user into performing unwanted actions on a web application by submitting requests without their consent, using their authentication credentials.",
        "isCorrect": true,
        "explanation": "CSRF tricks a logged-in user into performing unwanted actions on a web application by submitting requests without their consent, using their authentication credentials."
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
    "id": "sec-02-sec11",
    "title": "Which measures can prevent CSRF attacks?",
    "content": "Select all correct prevention techniques.",
    "type": "multiple-choice",
    "category": "Security",
    "topic": "CSRF",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:11:00.000Z",
    "updatedAt": "2025-11-11T19:01:36.829Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "security",
      "cross-site-request-forgery-csrf",
      "csrf",
      "intermediate"
    ],
    "explanation": "CSRF prevention uses tokens, checks headers, and sometimes asks users for confirmation.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use anti-CSRF tokens in forms",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Validate the Origin and Referer headers",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Enable HttpOnly cookies",
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
    "subcategory": "CSRF",
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

console.log(`✅ Added ${newQuestions.length} questions for CSRF (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
