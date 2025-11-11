const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-prpl-pp10",
    "title": "True or False: Service Workers are essential to implement the 'Pre-cache' and 'Lazy-load' steps of PRPL.",
    "content": "Assess whether Service Workers are necessary for caching and lazy loading in PRPL.",
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
    "explanation": "The correct answer is: True",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": true,
        "explanation": "Service Workers enable background caching and lazy-loading of routes and assets in PRPL."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "PRPL relies heavily on Service Workers for offline caching and background resource fetching."
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
  },
  {
    "id": "performance-patterns-prpl-pp11",
    "title": "What happens if we preload too many resources in the PRPL pattern?",
    "content": "### Over-Preloading\nPreloading too many assets increases competition for bandwidth, delaying critical resources like CSS or hero images and worsening Core Web Vitals such as Largest Contentful Paint (LCP).",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "PRPL Pattern",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "prpl-pattern",
      "advanced"
    ],
    "explanation": "It can delay critical rendering assets like CSS and images, worsening user-perceived performance metrics.",
    "points": 10,
    "sampleAnswers": [
      "It can delay critical rendering assets like CSS and images, worsening user-perceived performance metrics."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "It can delay critical rendering assets like CSS and images, worsening user-perceived performance metrics.",
        "isCorrect": true,
        "explanation": "It can delay critical rendering assets like CSS and images, worsening user-perceived performance metrics."
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
    "id": "performance-patterns-prpl-pp12",
    "title": "Which PRPL step directly improves the Time to Interactive (TTI) metric?",
    "content": "Select which part of the PRPL process helps achieve a faster TTI.",
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
    "explanation": "Rendering the initial route early reduces the time before a user can interact, improving TTI.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Render initial route quickly",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Pre-cache assets in background",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Lazy-load unused modules",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Push critical resources after render",
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

console.log(`✅ Added ${newQuestions.length} questions for PRPL Pattern (Batch 4)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
