const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering2-10",
    "title": "Combining Rendering Strategies",
    "content": "Which rendering approach combines static and dynamic techniques for optimal performance?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Server-Side Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.539Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "server-side-rendering",
      "intermediate"
    ],
    "explanation": "Hybrid Rendering — mixing SSG, SSR, and ISR depending on route needs",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Hybrid Rendering — mixing SSG, SSR, and ISR depending on route needs",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Full Client-Side Rendering only",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Single Static HTML rendering",
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

console.log(`✅ Added ${newQuestions.length} questions for Server-Side Rendering (Batch 4)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
