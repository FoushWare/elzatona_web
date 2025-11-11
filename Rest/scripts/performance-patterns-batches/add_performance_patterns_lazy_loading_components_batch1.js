const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-import-on-visibility-9",
    "title": "What is the purpose of the “import on visibility” pattern?",
    "content": "“Import on visibility” defers loading of components until they are actually visible in the viewport, reducing the initial load time and improving performance.",
    "type": "concept",
    "category": "Performance Patterns",
    "topic": "Lazy Loading Components",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10",
    "updatedAt": "2025-11-11T18:50:32.209Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "lazy-loading-components",
      "beginner",
      "intermediate"
    ],
    "explanation": "By only importing components when they come into view, the application avoids loading unnecessary code at startup.",
    "points": 10,
    "options": [],
    "sampleAnswers": [
      "It delays loading of components until they become visible."
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

console.log(`✅ Added ${newQuestions.length} questions for Lazy Loading Components (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
