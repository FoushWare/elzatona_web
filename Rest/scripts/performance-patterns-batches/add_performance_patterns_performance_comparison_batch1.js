const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-pre-load-2",
    "title": "Preload vs Prefetch",
    "content": "What is the main difference between preloading and prefetching resources?",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Performance Comparison",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.232Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "performance-comparison",
      null,
      "intermediate"
    ],
    "explanation": "Preload prioritizes resources needed right away; prefetch prepares resources for potential future use.",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Preload is for resources needed immediately, prefetch is for resources needed soon",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Prefetch loads higher priority resources than preload",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "Preload is always handled automatically by the browser",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "Preload fetches resources needed instantly, while prefetch prepares for later needs."
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

console.log(`✅ Added ${newQuestions.length} questions for Performance Comparison (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
