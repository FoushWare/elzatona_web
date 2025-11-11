const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-pre-load-3",
    "title": "Webpack Preload Magic Comment",
    "content": "What does adding <code>/* webpackPreload: true */</code> to a dynamic import do?",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Webpack Optimization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.232Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "webpack-optimization",
      null,
      "intermediate"
    ],
    "explanation": "The magic comment tells Webpack to emit a preload link for that resource, so the browser fetches it immediately.",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "It bundles the module into the main chunk",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "It adds a `<link rel='preload'>` tag for that chunk",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "It delays loading of the module until user interaction",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "It signals Webpack to preload that module so it’s available on initial render."
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-prefetch-3",
    "title": "Webpack Prefetch Magic Comment",
    "content": "What is the purpose of adding the <code>/* webpackPrefetch: true */</code> comment to a dynamic import?",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Webpack Optimization",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00Z",
    "updatedAt": "2025-11-11T18:50:32.241Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "webpack-optimization",
      null,
      "intermediate"
    ],
    "explanation": "The magic comment tells Webpack to include a <code>&lt;link rel='prefetch'&gt;</code> for the specified chunk, allowing the browser to load it in advance.",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "To bundle the file immediately into the main chunk",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "To hint the browser to prefetch the resource during idle time",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "To force lazy loading of the component",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "sampleAnswers": [
      "It hints the browser to prefetch the module, improving perceived load time."
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

console.log(`✅ Added ${newQuestions.length} questions for Webpack Optimization (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
