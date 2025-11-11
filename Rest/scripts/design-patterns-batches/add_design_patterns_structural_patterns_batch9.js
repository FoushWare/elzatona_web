const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-proxy-pattern-66",
    "title": "Introduction to Proxy Pattern",
    "content": "What is the Proxy Pattern in JavaScript and how does it differ from directly interacting with an object?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.284Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "No explanation provided.",
    "points": 10,
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "No explanation provided",
        "isCorrect": true,
        "explanation": "No explanation provided."
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
    "id": "design-patterns-proxy-pattern-67",
    "title": "Basic Proxy Usage",
    "content": "You have an object <code>person = { name: 'John', age: 30 }</code>. Create a proxy that logs whenever any property is accessed.",
    "type": "code",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.284Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "No explanation provided.",
    "points": 10,
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-proxy-pattern-68",
    "title": "Handler Methods",
    "content": "Which two handler methods are most commonly used in JavaScript Proxies?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.284Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "No explanation provided.",
    "points": 10,
    "options": [
      {
        "0": "a",
        "1": "p",
        "2": "p",
        "3": "l",
        "4": "y",
        "5": " ",
        "6": "a",
        "7": "n",
        "8": "d",
        "9": " ",
        "10": "c",
        "11": "o",
        "12": "n",
        "13": "s",
        "14": "t",
        "15": "r",
        "16": "u",
        "17": "c",
        "18": "t",
        "explanation": ""
      },
      {
        "0": "g",
        "1": "e",
        "2": "t",
        "3": " ",
        "4": "a",
        "5": "n",
        "6": "d",
        "7": " ",
        "8": "s",
        "9": "e",
        "10": "t",
        "explanation": ""
      },
      {
        "0": "d",
        "1": "e",
        "2": "l",
        "3": "e",
        "4": "t",
        "5": "e",
        "6": "P",
        "7": "r",
        "8": "o",
        "9": "p",
        "10": "e",
        "11": "r",
        "12": "t",
        "13": "y",
        "14": " ",
        "15": "a",
        "16": "n",
        "17": "d",
        "18": " ",
        "19": "d",
        "20": "e",
        "21": "f",
        "22": "i",
        "23": "n",
        "24": "e",
        "25": "P",
        "26": "r",
        "27": "o",
        "28": "p",
        "29": "e",
        "30": "r",
        "31": "t",
        "32": "y",
        "explanation": ""
      },
      {
        "0": "o",
        "1": "w",
        "2": "n",
        "3": "K",
        "4": "e",
        "5": "y",
        "6": "s",
        "7": " ",
        "8": "a",
        "9": "n",
        "10": "d",
        "11": " ",
        "12": "h",
        "13": "a",
        "14": "s",
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

console.log(`✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 9)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
