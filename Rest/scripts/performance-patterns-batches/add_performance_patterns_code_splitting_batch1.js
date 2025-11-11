const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-bundle-splitting-pp1",
    "title": "What is Bundle Splitting?",
    "content": "### Bundle Splitting\nBundle Splitting is a performance optimization technique that divides a large JavaScript bundle into smaller chunks. Instead of loading one huge file containing all code (even unused code), the application loads only what’s required for the current view.\n\n**Example:**\nSplitting <code>main.bundle.js</code> into <code>main.bundle.js</code> and <code>emoji-picker.bundle.js</code> reduces initial load time by fetching less data.\n\n**Why it matters:**\n- Reduces time to First Contentful Paint (FCP) and Largest Contentful Paint (LCP)\n- Decreases loading and execution time\n- Improves Time To Interactive (TTI)\n\n**Goal:** Deliver visible and interactive content to the user faster by minimizing unnecessary code loading.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Code Splitting",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.133Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "bundle-splitting",
      "intermediate"
    ],
    "explanation": "Bundle Splitting divides a large JavaScript file into smaller bundles so the browser loads only necessary code for the current route or view, improving load performance.",
    "points": 10,
    "sampleAnswers": [
      "Bundle Splitting divides a large JavaScript file into smaller bundles so the browser loads only necessary code for the current route or view, improving load performance."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Bundle Splitting divides a large JavaScript file into smaller bundles so the browser loads only necessary code for the current route or view, improving load performance.",
        "isCorrect": true,
        "explanation": "Bundle Splitting divides a large JavaScript file into smaller bundles so the browser loads only necessary code for the current route or view, improving load performance."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review performance optimization concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider web performance best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "performance-patterns-bundle-splitting-pp2",
    "title": "What are the main benefits of Bundle Splitting?",
    "content": "Select all benefits that result from splitting your bundle into smaller chunks.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Code Splitting",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.157Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "bundle-splitting",
      "beginner",
      "intermediate"
    ],
    "explanation": "Splitting bundles reduces loading and execution times, improving FCP, LCP, and TTI metrics—especially for low-end devices or slow networks.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Reduced time to First Contentful Paint (FCP)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Reduced Time To Interactive (TTI)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Larger initial download size",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Improved perceived performance on slower networks",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-bundle-splitting-pp3",
    "title": "True or False: Bundle Splitting reduces the total amount of JavaScript your app needs to execute.",
    "content": "Evaluate this statement based on the performance pattern.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Code Splitting",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.164Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "bundle-splitting",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: False",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": false,
        "explanation": "The total code size remains the same; bundle splitting optimizes loading sequence, not total size."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "The total code size remains the same; bundle splitting optimizes loading sequence, not total size."
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

console.log(`✅ Added ${newQuestions.length} questions for Code Splitting (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
