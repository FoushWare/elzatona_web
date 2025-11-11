const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-import-on-visibility-10",
    "title": "Which browser API can be used to detect when an element enters the viewport?",
    "content": "The IntersectionObserver API lets developers detect when elements intersect with the viewport and trigger actions like lazy loading.",
    "type": "concept",
    "category": "Performance Patterns",
    "topic": "Browser APIs",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10",
    "updatedAt": "2025-11-11T18:50:32.209Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "browser-apis",
      null,
      "intermediate"
    ],
    "explanation": "IntersectionObserver efficiently tracks element visibility changes without heavy scroll listeners.",
    "points": 10,
    "options": [
      {
        "0": "R",
        "1": "e",
        "2": "s",
        "3": "i",
        "4": "z",
        "5": "e",
        "6": "O",
        "7": "b",
        "8": "s",
        "9": "e",
        "10": "r",
        "11": "v",
        "12": "e",
        "13": "r",
        "explanation": ""
      },
      {
        "0": "I",
        "1": "n",
        "2": "t",
        "3": "e",
        "4": "r",
        "5": "s",
        "6": "e",
        "7": "c",
        "8": "t",
        "9": "i",
        "10": "o",
        "11": "n",
        "12": "O",
        "13": "b",
        "14": "s",
        "15": "e",
        "16": "r",
        "17": "v",
        "18": "e",
        "19": "r",
        "explanation": ""
      },
      {
        "0": "M",
        "1": "u",
        "2": "t",
        "3": "a",
        "4": "t",
        "5": "i",
        "6": "o",
        "7": "n",
        "8": "O",
        "9": "b",
        "10": "s",
        "11": "e",
        "12": "r",
        "13": "v",
        "14": "e",
        "15": "r",
        "explanation": ""
      },
      {
        "0": "E",
        "1": "v",
        "2": "e",
        "3": "n",
        "4": "t",
        "5": "T",
        "6": "a",
        "7": "r",
        "8": "g",
        "9": "e",
        "10": "t",
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "IntersectionObserver"
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

console.log(`✅ Added ${newQuestions.length} questions for Browser APIs (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
