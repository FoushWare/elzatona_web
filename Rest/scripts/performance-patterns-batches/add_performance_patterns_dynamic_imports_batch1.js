const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-import-on-interaction-6",
    "title": "Which JavaScript feature enables dynamic Import On Interaction?",
    "content": "The dynamic <code>import()</code> function allows modules to be loaded only when needed.",
    "type": "mcq",
    "category": "Performance Patterns",
    "topic": "Dynamic Imports",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.201Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "dynamic-imports",
      "beginner",
      "intermediate"
    ],
    "explanation": "Dynamic <code>import()</code> returns a promise and can load modules lazily, which is ideal for import-on-interaction use cases.",
    "points": 10,
    "options": [
      {
        "0": "r",
        "1": "e",
        "2": "q",
        "3": "u",
        "4": "i",
        "5": "r",
        "6": "e",
        "7": "(",
        "8": ")",
        "explanation": ""
      },
      {
        "0": "i",
        "1": "m",
        "2": "p",
        "3": "o",
        "4": "r",
        "5": "t",
        "6": " ",
        "7": "*",
        "8": " ",
        "9": "f",
        "10": "r",
        "11": "o",
        "12": "m",
        "13": " ",
        "14": "'",
        "15": "m",
        "16": "o",
        "17": "d",
        "18": "u",
        "19": "l",
        "20": "e",
        "21": "'",
        "explanation": ""
      },
      {
        "0": "d",
        "1": "y",
        "2": "n",
        "3": "a",
        "4": "m",
        "5": "i",
        "6": "c",
        "7": " ",
        "8": "i",
        "9": "m",
        "10": "p",
        "11": "o",
        "12": "r",
        "13": "t",
        "14": "(",
        "15": ")",
        "explanation": ""
      },
      {
        "0": "a",
        "1": "s",
        "2": "y",
        "3": "n",
        "4": "c",
        "5": " ",
        "6": "a",
        "7": "w",
        "8": "a",
        "9": "i",
        "10": "t",
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "dynamic import()"
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

console.log(`✅ Added ${newQuestions.length} questions for Dynamic Imports (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
