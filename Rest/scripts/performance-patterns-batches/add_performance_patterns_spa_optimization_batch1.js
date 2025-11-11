const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-import-on-visibility-14",
    "title": "What benefits does import-on-visibility offer for large single-page applications?",
    "content": "It helps reduce main bundle size, optimizes network requests, and improves time-to-interactive (TTI) by loading only visible components.",
    "type": "concept",
    "category": "Performance Patterns",
    "topic": "SPA Optimization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10",
    "updatedAt": "2025-11-11T18:50:32.209Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "spa-optimization",
      null,
      "intermediate"
    ],
    "explanation": "Users experience faster initial render and smoother scrolling as code loads progressively.",
    "points": 10,
    "options": [],
    "sampleAnswers": [
      "Smaller bundles and faster initial render."
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-pre-load-5",
    "title": "Preload in Single-Page Applications",
    "content": "In SPAs, when is preloading most useful?",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "SPA Optimization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.240Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "spa-optimization",
      null,
      "intermediate"
    ],
    "explanation": "Preloading helps ensure components needed immediately after page load are ready without waiting for network fetches.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "When a component or font must be available instantly on the first render.",
        "isCorrect": true,
        "explanation": "Preloading helps ensure components needed immediately after page load are ready without waiting for network fetches."
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
    ],
    "sampleAnswers": [
      "When a component or font must be available instantly on the first render."
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

console.log(`✅ Added ${newQuestions.length} questions for SPA Optimization (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
