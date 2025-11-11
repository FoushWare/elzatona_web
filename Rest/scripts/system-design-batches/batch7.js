const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q24",
    "title": "What is lazy loading and how does it improve frontend performance?",
    "content": "Explain lazy loading for images, components, and modules in a web app.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Lazy Loading",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-08T00:00:00Z",
    "updatedAt": "2025-10-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "lazy-loading",
      "beginner"
    ],
    "explanation": "Lazy loading is especially useful for images, videos, and code-splitting in large applications.",
    "points": 10,
    "options": [
      {
        "id": "1",
        "text": "Lazy loading defers the loading of non-critical resources until they are needed.",
        "isCorrect": true,
        "explanation": "Helps reduce initial load time and improves perceived performance."
      },
      {
        "id": "2",
        "text": "Lazy loading means loading all resources as early as possible.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "3",
        "text": "Lazy loading only applies to JavaScript modules, not images.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q25",
    "title": "What is tree-shaking in frontend build optimization?",
    "content": "Explain how tree-shaking helps in reducing bundle size and when it is most effective.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "intermediate"
    ],
    "explanation": "Tree-shaking removes unused code from bundles. It works best with ES6 module imports.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Removes unused CSS from the DOM",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Removes unused JavaScript exports from bundles",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Shakes DOM nodes to re-render faster",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Optimizes images automatically",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q26",
    "title": "What are Web Workers and when should you use them?",
    "content": "Discuss how Web Workers improve performance in web applications and provide an example use case.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "intermediate"
    ],
    "explanation": "Web Workers run scripts in background threads separate from the main UI thread. They are useful for CPU-intensive tasks like parsing large JSON, image processing, or data transformations without blocking the UI.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Web Workers run scripts in background threads separate from the main UI thread. They are useful for CPU-intensive tasks like parsing large JSON, image processing, or data transformations without block...",
        "isCorrect": true,
        "explanation": "Web Workers run scripts in background threads separate from the main UI thread. They are useful for CPU-intensive tasks like parsing large JSON, image processing, or data transformations without blocking the UI."
      },
      {
        "id": "o2",
        "text": "Web Workers run scripts in background threads separate from the main UI thread",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " They are useful for CPU-intensive tasks like parsing large JSON, image processing, or data transformations without blocking the UI",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is incorrect. Please refer to system design best practices.",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 7)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
