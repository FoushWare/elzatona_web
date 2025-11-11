const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-tree-shaking-ts1",
    "title": "What is tree shaking in JavaScript?",
    "content": "Define tree shaking and its main purpose.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Code Optimization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "tree-shaking",
      "beginner",
      "intermediate"
    ],
    "explanation": "Tree shaking is the process of eliminating unused code from the final JavaScript bundle to reduce size, download, parse, and execution time.",
    "points": 10,
    "sampleAnswers": [
      "Tree shaking is the process of eliminating unused code from the final JavaScript bundle to reduce size, download, parse, and execution time."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Tree shaking is the process of eliminating unused code from the final JavaScript bundle to reduce size, download, parse, and execution time.",
        "isCorrect": true,
        "explanation": "Tree shaking is the process of eliminating unused code from the final JavaScript bundle to reduce size, download, parse, and execution time."
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
    "id": "performance-patterns-tree-shaking-ts2",
    "title": "True or False: Tree shaking works with CommonJS modules.",
    "content": "Evaluate whether tree shaking can remove dead code from CommonJS modules.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Code Optimization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "tree-shaking-modules",
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
        "explanation": "Tree shaking only works reliably with ES2015 (ES6) modules using import/export syntax."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "Tree shaking only works reliably with ES2015 (ES6) modules using import/export syntax."
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

console.log(`✅ Added ${newQuestions.length} questions for Code Optimization (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
