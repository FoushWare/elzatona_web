const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-import-on-visibility-13",
    "title": "How does import-on-visibility differ from basic dynamic import?",
    "content": "Dynamic import loads modules when triggered by user action, while import-on-visibility loads them automatically when they become visible on screen.",
    "type": "concept",
    "category": "Performance Patterns",
    "topic": "Import Strategies",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10",
    "updatedAt": "2025-11-11T18:50:32.209Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "import-strategies",
      null,
      "intermediate"
    ],
    "explanation": "Import-on-visibility uses viewport detection rather than explicit user events to trigger the import.",
    "points": 10,
    "options": [],
    "sampleAnswers": [
      "It loads on visibility, not just user click."
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

console.log(`✅ Added ${newQuestions.length} questions for Import Strategies (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
