const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-static-import-63",
    "title": "Compare Static Import vs Dynamic Import.",
    "content": "Static import loads all modules upfront at build time, increasing initial bundle size. Dynamic import (<code>import()</code>) loads modules only when needed (e.g., on user interaction), improving load performance but adding runtime overhead.",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Performance Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.209Z",
    "updatedAt": "2025-11-11T18:36:58.309Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "advanced",
      "advanced"
    ],
    "explanation": "Static imports are eager, dynamic imports are lazy. Static imports bundle everything, dynamic imports support code-splitting. Static imports run immediately, dynamic imports return a promise.",
    "points": 10,
    "sampleAnswers": [
      "Static imports are eager, dynamic imports are lazy.",
      "Static imports bundle everything, dynamic imports support code-splitting.",
      "Static imports run immediately, dynamic imports return a promise."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Static imports are eager, dynamic imports are lazy.",
        "isCorrect": true,
        "explanation": "Static imports are eager, dynamic imports are lazy. Static imports bundle everything, dynamic imports support code-splitting. Static imports run immediately, dynamic imports return a promise."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review the design pattern concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "design-patterns-static-import-64",
    "title": "What performance optimization can replace some static imports in the chat app example?",
    "content": "Instead of statically importing the <code>EmojiPicker</code>, we can dynamically import it when the user opens the emoji panel. This reduces initial bundle size and speeds up app load.",
    "type": "mcq",
    "category": "Design Patterns",
    "topic": "Performance Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.209Z",
    "updatedAt": "2025-11-11T18:36:58.309Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "No explanation provided.",
    "points": 10,
    "options": [
      {
        "0": "S",
        "1": "t",
        "2": "a",
        "3": "t",
        "4": "i",
        "5": "c",
        "6": " ",
        "7": "e",
        "8": "x",
        "9": "p",
        "10": "o",
        "11": "r",
        "12": "t",
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
        "8": "i",
        "9": "m",
        "10": "p",
        "11": "o",
        "12": "r",
        "13": "t",
        "14": " ",
        "15": "(",
        "16": "`",
        "17": "i",
        "18": "m",
        "19": "p",
        "20": "o",
        "21": "r",
        "22": "t",
        "23": "(",
        "24": ")",
        "25": "`",
        "26": ")",
        "explanation": ""
      },
      {
        "0": "T",
        "1": "r",
        "2": "e",
        "3": "e",
        "4": " ",
        "5": "s",
        "6": "h",
        "7": "a",
        "8": "k",
        "9": "i",
        "10": "n",
        "11": "g",
        "explanation": ""
      },
      {
        "0": "C",
        "1": "o",
        "2": "d",
        "3": "e",
        "4": " ",
        "5": "m",
        "6": "i",
        "7": "n",
        "8": "i",
        "9": "f",
        "10": "i",
        "11": "c",
        "12": "a",
        "13": "t",
        "14": "i",
        "15": "o",
        "16": "n",
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

console.log(`✅ Added ${newQuestions.length} questions for Performance Patterns (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
