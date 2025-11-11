const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-loading-sequence-8",
    "title": "Next.js ScriptLoader Usage",
    "content": "Which Next.js ScriptLoader priority should be used for scripts that run after hydration, such as analytics?",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Script Loading",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.218Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "script-loading",
      null,
      "intermediate"
    ],
    "explanation": "Scripts like analytics should use 'After-Interactive' so they load after hydration without blocking critical rendering.",
    "points": 10,
    "options": [
      {
        "0": "B",
        "1": "e",
        "2": "f",
        "3": "o",
        "4": "r",
        "5": "e",
        "6": "-",
        "7": "I",
        "8": "n",
        "9": "t",
        "10": "e",
        "11": "r",
        "12": "a",
        "13": "c",
        "14": "t",
        "15": "i",
        "16": "v",
        "17": "e",
        "explanation": ""
      },
      {
        "0": "A",
        "1": "f",
        "2": "t",
        "3": "e",
        "4": "r",
        "5": "-",
        "6": "I",
        "7": "n",
        "8": "t",
        "9": "e",
        "10": "r",
        "11": "a",
        "12": "c",
        "13": "t",
        "14": "i",
        "15": "v",
        "16": "e",
        "explanation": ""
      },
      {
        "0": "L",
        "1": "a",
        "2": "z",
        "3": "y",
        "4": "-",
        "5": "O",
        "6": "n",
        "7": "l",
        "8": "o",
        "9": "a",
        "10": "d",
        "explanation": ""
      },
      {
        "0": "A",
        "1": "s",
        "2": "y",
        "3": "n",
        "4": "c",
        "5": "-",
        "6": "P",
        "7": "r",
        "8": "e",
        "9": "l",
        "10": "o",
        "11": "a",
        "12": "d",
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "After-Interactive"
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

console.log(`✅ Added ${newQuestions.length} questions for Script Loading (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
