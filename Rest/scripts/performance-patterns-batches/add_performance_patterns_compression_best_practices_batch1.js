const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-compression-5",
    "title": "Which compression type should be used for JavaScript files?",
    "content": "JavaScript should always use lossless compression to ensure code runs correctly after decompression.",
    "type": "mcq",
    "category": "Performance Patterns",
    "topic": "Compression Best Practices",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.172Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "compression-best-practices",
      "beginner",
      "intermediate"
    ],
    "explanation": "Since JavaScript must remain valid after compression, only lossless algorithms like Brotli or Gzip should be used.",
    "points": 10,
    "options": [
      {
        "0": "L",
        "1": "o",
        "2": "s",
        "3": "s",
        "4": "y",
        "5": " ",
        "6": "c",
        "7": "o",
        "8": "m",
        "9": "p",
        "10": "r",
        "11": "e",
        "12": "s",
        "13": "s",
        "14": "i",
        "15": "o",
        "16": "n",
        "explanation": ""
      },
      {
        "0": "L",
        "1": "o",
        "2": "s",
        "3": "s",
        "4": "l",
        "5": "e",
        "6": "s",
        "7": "s",
        "8": " ",
        "9": "c",
        "10": "o",
        "11": "m",
        "12": "p",
        "13": "r",
        "14": "e",
        "15": "s",
        "16": "s",
        "17": "i",
        "18": "o",
        "19": "n",
        "explanation": ""
      },
      {
        "0": "D",
        "1": "y",
        "2": "n",
        "3": "a",
        "4": "m",
        "5": "i",
        "6": "c",
        "7": " ",
        "8": "c",
        "9": "o",
        "10": "m",
        "11": "p",
        "12": "r",
        "13": "e",
        "14": "s",
        "15": "s",
        "16": "i",
        "17": "o",
        "18": "n",
        "19": " ",
        "20": "o",
        "21": "n",
        "22": "l",
        "23": "y",
        "explanation": ""
      },
      {
        "0": "N",
        "1": "o",
        "2": " ",
        "3": "c",
        "4": "o",
        "5": "m",
        "6": "p",
        "7": "r",
        "8": "e",
        "9": "s",
        "10": "s",
        "11": "i",
        "12": "o",
        "13": "n",
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "Lossless compression"
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

console.log(`✅ Added ${newQuestions.length} questions for Compression Best Practices (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
