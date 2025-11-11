const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-prefetch-5",
    "title": "Prefetching Trade-offs",
    "content": "Why should developers avoid excessive use of prefetching?",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Performance Best Practices",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.241Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "performance-best-practices",
      null,
      "intermediate"
    ],
    "explanation": "Overusing prefetch may waste bandwidth and slow down critical resource loading if prefetched assets are never used.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Prefetching too many unused resources can waste network bandwidth and harm performance.",
        "isCorrect": true,
        "explanation": "Overusing prefetch may waste bandwidth and slow down critical resource loading if prefetched assets are never used."
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
      "Prefetching too many unused resources can waste network bandwidth and harm performance."
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

console.log(`✅ Added ${newQuestions.length} questions for Performance Best Practices (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
