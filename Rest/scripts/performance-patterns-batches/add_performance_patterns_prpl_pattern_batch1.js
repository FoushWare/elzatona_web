const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-prpl-pp1",
    "title": "What is the PRPL Pattern?",
    "content": "### PRPL Pattern\nThe **PRPL Pattern** is a web performance optimization strategy that focuses on making applications load and run efficiently, even on low-end devices or slow networks.\n\n**PRPL** stands for:\n- **P**: Push critical resources for the initial route.\n- **R**: Render the initial route as soon as possible.\n- **P**: Pre-cache assets for future routes.\n- **L**: Lazy-load remaining routes and assets.\n\nThis approach improves load times, offline experience, and caching efficiency.\n\n**Example:** Progressive Web Apps (PWAs) that use an app shell, service workers, and code-splitting to load only what’s needed.\n\n**Pros:**\n- Faster first render.\n- Improved caching and offline usability.\n- Reduced bandwidth usage.\n\n**Cons:**\n- Requires careful bundling and caching strategy.\n- Over-pushing or preloading can waste bandwidth.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "intermediate"
    ],
    "explanation": "A web performance pattern that optimizes loading by pushing critical resources, rendering fast, pre-caching assets, and lazy-loading the rest.",
    "points": 10,
    "sampleAnswers": [
      "A web performance pattern that optimizes loading by pushing critical resources, rendering fast, pre-caching assets, and lazy-loading the rest."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "A web performance pattern that optimizes loading by pushing critical resources, rendering fast, pre-caching assets, and lazy-loading the rest.",
        "isCorrect": true,
        "explanation": "A web performance pattern that optimizes loading by pushing critical resources, rendering fast, pre-caching assets, and lazy-loading the rest."
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
    "id": "performance-patterns-prpl-pp2",
    "title": "What does each letter in the PRPL acronym stand for?",
    "content": "Choose the correct expansion of PRPL.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "beginner",
      "intermediate"
    ],
    "explanation": "PRPL stands for Push critical resources, Render initial route, Pre-cache assets, and Lazy-load remaining routes.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Push, Render, Pre-cache, Lazy-load",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Preload, Render, Pre-fetch, Load",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Push, Render, Preload, Link",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Prepare, Run, Pre-cache, Load",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-prpl-pp3",
    "title": "True or False: The PRPL pattern focuses on optimizing the first route before loading any other resources.",
    "content": "Evaluate the statement about PRPL’s optimization focus.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: True",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": true,
        "explanation": "PRPL prioritizes loading and rendering the initial route first, then caching and lazy-loading the rest."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "Other resources load only after the initial route completes."
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

console.log(`✅ Added ${newQuestions.length} questions for PRPL Pattern (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
