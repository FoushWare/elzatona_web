const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-dynamic-import-19",
    "title": "What happens while a lazy-loaded module is still being fetched?",
    "content": "The fallback component (e.g., a loading message) is rendered until the lazy-loaded component is ready.",
    "type": "mcq",
    "category": "Performance Patterns",
    "topic": "User Experience",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.188Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "user-experience",
      "beginner",
      "intermediate"
    ],
    "explanation": "A fallback placeholder keeps the UI responsive and visually communicates that the module is still loading.",
    "points": 10,
    "options": [
      {
        "0": "T",
        "1": "h",
        "2": "e",
        "3": " ",
        "4": "a",
        "5": "p",
        "6": "p",
        "7": " ",
        "8": "f",
        "9": "r",
        "10": "e",
        "11": "e",
        "12": "z",
        "13": "e",
        "14": "s",
        "explanation": ""
      },
      {
        "0": "T",
        "1": "h",
        "2": "e",
        "3": " ",
        "4": "p",
        "5": "a",
        "6": "g",
        "7": "e",
        "8": " ",
        "9": "r",
        "10": "e",
        "11": "l",
        "12": "o",
        "13": "a",
        "14": "d",
        "15": "s",
        "explanation": ""
      },
      {
        "0": "T",
        "1": "h",
        "2": "e",
        "3": " ",
        "4": "f",
        "5": "a",
        "6": "l",
        "7": "l",
        "8": "b",
        "9": "a",
        "10": "c",
        "11": "k",
        "12": " ",
        "13": "c",
        "14": "o",
        "15": "m",
        "16": "p",
        "17": "o",
        "18": "n",
        "19": "e",
        "20": "n",
        "21": "t",
        "22": " ",
        "23": "d",
        "24": "i",
        "25": "s",
        "26": "p",
        "27": "l",
        "28": "a",
        "29": "y",
        "30": "s",
        "31": " ",
        "32": "t",
        "33": "e",
        "34": "m",
        "35": "p",
        "36": "o",
        "37": "r",
        "38": "a",
        "39": "r",
        "40": "i",
        "41": "l",
        "42": "y",
        "explanation": ""
      },
      {
        "0": "N",
        "1": "o",
        "2": "t",
        "3": "h",
        "4": "i",
        "5": "n",
        "6": "g",
        "7": " ",
        "8": "h",
        "9": "a",
        "10": "p",
        "11": "p",
        "12": "e",
        "13": "n",
        "14": "s",
        "15": " ",
        "16": "u",
        "17": "n",
        "18": "t",
        "19": "i",
        "20": "l",
        "21": " ",
        "22": "i",
        "23": "t",
        "24": " ",
        "25": "l",
        "26": "o",
        "27": "a",
        "28": "d",
        "29": "s",
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "The fallback component displays temporarily"
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

console.log(`✅ Added ${newQuestions.length} questions for User Experience (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
