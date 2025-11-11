const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering-10",
    "title": "Choosing Between Static and Server Rendering",
    "content": "When should you avoid using Static Rendering?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Static Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "static-rendering",
      "intermediate"
    ],
    "explanation": "For highly personalized pages or data that changes per user request",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "For highly personalized pages or data that changes per user request",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "For blogs and documentation",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "For e-commerce product pages updated daily",
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

console.log(`✅ Added ${newQuestions.length} questions for Static Rendering (Batch 4)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
