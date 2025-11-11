const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-virtualization-lv3",
    "title": "True or False: List virtualization renders all items in the DOM at once.",
    "content": "Evaluate whether virtualization renders all items immediately.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Virtual Lists Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.271Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "virtual-lists-rendering",
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
        "explanation": "Virtualization renders only the visible items, not the entire list, to improve performance."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "Virtualization renders only the visible items, not the entire list, to improve performance."
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

console.log(`✅ Added ${newQuestions.length} questions for Virtual Lists Rendering (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
