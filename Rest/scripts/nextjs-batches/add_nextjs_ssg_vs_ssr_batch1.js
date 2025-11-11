const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-61-80-nextjs-q63",
    "title": "What is the difference between SSG and SSR in Next.js?",
    "content": "SSG (Static Site Generation) renders pages at build time. SSR (Server-Side Rendering) renders on every request.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "SSG vs SSR",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.796Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "ssg-vs-ssr",
      "intermediate"
    ],
    "explanation": "SSG is faster and cacheable; SSR is for dynamic, user-specific content.",
    "points": 7,
    "options": [
      {
        "id": "a",
        "text": "SSG: build-time render; SSR: per-request render",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "SSR is always faster than SSG",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "SSG doesn’t support dynamic data",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "They are the same",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "next1-20-nextjs-q18",
    "title": "What is the difference between SSG and SSR in Next.js?",
    "content": "SSG (Static Site Generation) renders pages at build time. SSR (Server-Side Rendering) renders on every request.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "SSG vs SSR",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "ssg-vs-ssr",
      "intermediate"
    ],
    "explanation": "SSG is faster and cacheable; SSR is for dynamic, user-specific content.",
    "points": 7,
    "options": [
      {
        "id": "a",
        "text": "SSG: build-time render; SSR: per-request render",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "SSR is always faster than SSG",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "SSG doesn’t support dynamic data",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "They are the same",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "next41-60-nextjs-q43",
    "title": "What is the difference between SSG and SSR in Next.js?",
    "content": "SSG (Static Site Generation) renders pages at build time. SSR (Server-Side Rendering) renders on every request.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "SSG vs SSR",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "ssg-vs-ssr",
      "intermediate"
    ],
    "explanation": "SSG is faster and cacheable; SSR is for dynamic, user-specific content.",
    "points": 7,
    "options": [
      {
        "id": "a",
        "text": "SSG: build-time render; SSR: per-request render",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "SSR is always faster than SSG",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "SSG doesn’t support dynamic data",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "They are the same",
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

console.log(`✅ Added ${newQuestions.length} questions for SSG vs SSR (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
