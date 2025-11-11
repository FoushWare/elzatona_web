const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next1-20-nextjs-q5",
    "title": "How does Next.js handle routing?",
    "content": "Next.js uses file-based routing: files in <code>pages/</code> or <code>app/</code> automatically become routes based on their path.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Next.js Routing",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "next.js-routing",
      "intermediate"
    ],
    "explanation": "No manual route configuration is needed—just create files in the correct directory structure.",
    "points": 6,
    "options": [
      {
        "id": "a",
        "text": "File-based routing in pages/ or app/ directories",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Manual route configuration with React Router",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "Only hash-based routing",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "Routing requires server setup",
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

console.log(`✅ Added ${newQuestions.length} questions for Next.js Routing (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
