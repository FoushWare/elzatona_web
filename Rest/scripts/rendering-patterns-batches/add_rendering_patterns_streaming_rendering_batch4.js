const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering8-10",
    "title": "Stale-While-Revalidate",
    "content": "What does the stale-while-revalidate caching strategy do?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Streaming Rendering",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "streaming-rendering",
      "advanced"
    ],
    "explanation": "Serves a stale cache immediately and revalidates it in the background",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Serves a stale cache immediately and revalidates it in the background",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Deletes old cache entries before fetching new ones",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Disables revalidation for dynamic pages",
        "isCorrect": false
      }
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
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

console.log(`✅ Added ${newQuestions.length} questions for Streaming Rendering (Batch 4)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
