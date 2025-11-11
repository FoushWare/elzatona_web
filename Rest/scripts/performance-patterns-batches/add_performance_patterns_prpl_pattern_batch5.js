const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-prpl-pp13",
    "title": "How does PRPL enhance offline experience?",
    "content": "Explain how PRPL ensures an app remains functional even without an internet connection.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "intermediate"
    ],
    "explanation": "By using Service Workers to pre-cache frequently visited routes and assets, so they can load from cache when offline.",
    "points": 10,
    "sampleAnswers": [
      "By using Service Workers to pre-cache frequently visited routes and assets, so they can load from cache when offline."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "By using Service Workers to pre-cache frequently visited routes and assets, so they can load from cache when offline.",
        "isCorrect": true,
        "explanation": "By using Service Workers to pre-cache frequently visited routes and assets, so they can load from cache when offline."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review performance optimization concepts.",
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
        "text": "Not quite. Consider web performance best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "performance-patterns-prpl-pp14",
    "title": "Which step in PRPL primarily benefits from HTTP/2 server push?",
    "content": "Identify where HTTP/2 server push has the most effect in the PRPL process.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "intermediate"
    ],
    "explanation": "HTTP/2 server push accelerates the 'Push' step by sending critical resources before the browser requests them.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Push",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Render",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Pre-cache",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Lazy-load",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-prpl-pp15",
    "title": "True or False: PRPL can only be implemented in Progressive Web Apps (PWAs).",
    "content": "Evaluate the statement about PRPL’s application scope.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: False",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": false,
        "explanation": "While PWAs benefit most, PRPL can be used in any web app with modular architecture and caching."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "While PWAs benefit most, PRPL can be used in any web app with modular architecture and caching."
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

console.log(`✅ Added ${newQuestions.length} questions for PRPL Pattern (Batch 5)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
