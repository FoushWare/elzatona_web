const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-compression-9",
    "title": "Which Webpack plugin enables Brotli compression?",
    "content": "You can use the BrotliWebpackPlugin in Webpack to enable Brotli compression for bundled assets.",
    "type": "mcq",
    "category": "Performance Patterns",
    "topic": "Webpack Configuration",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.172Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "webpack-configuration",
      null,
      "intermediate"
    ],
    "explanation": "Webpack supports Brotli through BrotliWebpackPlugin, enabling efficient compression of assets for production builds.",
    "points": 10,
    "options": [
      {
        "0": "C",
        "1": "o",
        "2": "m",
        "3": "p",
        "4": "r",
        "5": "e",
        "6": "s",
        "7": "s",
        "8": "i",
        "9": "o",
        "10": "n",
        "11": "P",
        "12": "l",
        "13": "u",
        "14": "g",
        "15": "i",
        "16": "n",
        "explanation": ""
      },
      {
        "0": "M",
        "1": "i",
        "2": "n",
        "3": "i",
        "4": "f",
        "5": "y",
        "6": "P",
        "7": "l",
        "8": "u",
        "9": "g",
        "10": "i",
        "11": "n",
        "explanation": ""
      },
      {
        "0": "B",
        "1": "r",
        "2": "o",
        "3": "t",
        "4": "l",
        "5": "i",
        "6": "W",
        "7": "e",
        "8": "b",
        "9": "p",
        "10": "a",
        "11": "c",
        "12": "k",
        "13": "P",
        "14": "l",
        "15": "u",
        "16": "g",
        "17": "i",
        "18": "n",
        "explanation": ""
      },
      {
        "0": "O",
        "1": "p",
        "2": "t",
        "3": "i",
        "4": "m",
        "5": "i",
        "6": "z",
        "7": "e",
        "8": "C",
        "9": "S",
        "10": "S",
        "11": "A",
        "12": "s",
        "13": "s",
        "14": "e",
        "15": "t",
        "16": "s",
        "17": "P",
        "18": "l",
        "19": "u",
        "20": "g",
        "21": "i",
        "22": "n",
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "BrotliWebpackPlugin"
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-performance-1-pp9",
    "title": "True or False: Bundle Splitting can be applied manually using Webpack entry points.",
    "content": "Evaluate whether developers can configure multiple entry points in Webpack to create separate bundles manually.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Webpack Configuration",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.225Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "webpack-configuration",
      "intermediate"
    ],
    "explanation": "The correct answer is: True",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": true,
        "explanation": "Developers can define multiple entry points in Webpack to generate multiple bundles, allowing control over what loads initially versus later."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "Webpack supports manual splitting via multiple entry points or dynamic imports."
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

console.log(`✅ Added ${newQuestions.length} questions for Webpack Configuration (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
