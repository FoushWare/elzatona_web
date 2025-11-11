const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-third-party-tp2",
    "title": "Why can third-party scripts slow down your website?",
    "content": "Identify the main ways third-party scripts negatively impact performance.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Third-Party Performance Impact",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "third-party-performance-impact",
      "intermediate"
    ],
    "explanation": "Third-party scripts can block rendering, increase network requests, and execute heavy JS, negatively impacting Core Web Vitals.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Additional round trips to other domains",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Bulky or unoptimized JavaScript",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Blocking rendering of critical resources",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Always reduces DNS lookup times",
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

console.log(`✅ Added ${newQuestions.length} questions for Third-Party Performance Impact (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
