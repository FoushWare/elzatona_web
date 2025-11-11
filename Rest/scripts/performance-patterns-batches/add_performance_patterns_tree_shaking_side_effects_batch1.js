const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-tree-shaking-ts3",
    "title": "Why does tree shaking consider side effects in modules?",
    "content": "Explain what side effects are and why they affect tree shaking.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Tree Shaking Side Effects",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "tree-shaking-side-effects",
      "intermediate"
    ],
    "explanation": "A module has side effects if importing it changes the global scope or performs actions even if its exports are not used. Such modules cannot be safely removed by tree shaking.",
    "points": 10,
    "sampleAnswers": [
      "A module has side effects if importing it changes the global scope or performs actions even if its exports are not used. Such modules cannot be safely removed by tree shaking."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "A module has side effects if importing it changes the global scope or performs actions even if its exports are not used. Such modules cannot be safely removed by tree shaking.",
        "isCorrect": true,
        "explanation": "A module has side effects if importing it changes the global scope or performs actions even if its exports are not used. Such modules cannot be safely removed by tree shaking."
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

console.log(`✅ Added ${newQuestions.length} questions for Tree Shaking Side Effects (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
