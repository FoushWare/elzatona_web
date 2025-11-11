const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-21-40-nextjs-q31",
    "title": "What is the difference between `resolving` and `fetching` in Next.js?",
    "content": "Resolving is determining which route to render. Fetching is retrieving data for that route.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "App Router Internals",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.794Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "app-router-internals",
      "advanced"
    ],
    "explanation": "Next.js first resolves the route (e.g., <code>/blog/[slug]</code>), then fetches data for it using Server Components.",
    "points": 8,
    "sampleAnswers": [
      "Resolving matches the URL to a file in `app/`. Fetching runs the Server Component to get data and render HTML.",
      "These phases enable streaming: the shell renders while data fetches in parallel."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Resolving matches the URL to a file in `app/`. Fetching runs the Server Component to get data and render HTML.",
        "isCorrect": true,
        "explanation": "Next.js first resolves the route (e.g., <code>/blog/[slug]</code>), then fetches data for it using Server Components."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review Next.js documentation and concepts.",
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
        "text": "Not quite. Consider Next.js best practices and architecture.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
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

console.log(`✅ Added ${newQuestions.length} questions for App Router Internals (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
