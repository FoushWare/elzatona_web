const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-virtualization-lv4",
    "title": "What is the role of a 'window' in list virtualization?",
    "content": "Explain what a 'window' represents in the context of virtualized lists.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Virtual Lists Windowing",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.271Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "virtual-lists-windowing",
      "intermediate"
    ],
    "explanation": "The 'window' refers to the subset of list items that are currently visible and rendered in the DOM. As the user scrolls, the window moves along the list, rendering new items and removing old ones.",
    "points": 10,
    "sampleAnswers": [
      "The 'window' refers to the subset of list items that are currently visible and rendered in the DOM. As the user scrolls, the window moves along the list, rendering new items and removing old ones."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "The 'window' refers to the subset of list items that are currently visible and rendered in the DOM. As the user scrolls, the window moves along the list, rendering new items and removing old ones.",
        "isCorrect": true,
        "explanation": "The 'window' refers to the subset of list items that are currently visible and rendered in the DOM. As the user scrolls, the window moves along the list, rendering new items and removing old ones."
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

console.log(`✅ Added ${newQuestions.length} questions for Virtual Lists Windowing (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
