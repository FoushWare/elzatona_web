const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-21-40-nextjs-q21",
    "title": "What is the App Router in Next.js?",
    "content": "The App Router is a new routing system in Next.js 13+ based on the <code>app/</code> directory, React Server Components, and nested layouts.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Routing",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.782Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "app-router",
      "advanced"
    ],
    "explanation": "It replaces the Pages Router with a more powerful, server-first architecture that supports streaming, partial rendering, and built-in data fetching.",
    "points": 8,
    "sampleAnswers": [
      "The App Router uses the `app/` directory with file-based routing, React Server Components by default, and supports nested layouts via `layout.js` files.",
      "It enables features like streaming with Suspense, automatic code splitting, and colocation of components, data, and styles."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "The App Router uses the `app/` directory with file-based routing, React Server Components by default, and supports nested layouts via `layout.js` files.",
        "isCorrect": true,
        "explanation": "It replaces the Pages Router with a more powerful, server-first architecture that supports streaming, partial rendering, and built-in data fetching."
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
  },
  {
    "id": "next1-20-nextjs-q3",
    "title": "What is the difference between Pages Router and App Router in Next.js?",
    "content": "Pages Router uses the <code>pages/</code> directory with client-side navigation. App Router uses the <code>app/</code> directory with React Server Components, nested layouts, and streaming.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Routing",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "app-router-vs-pages-router",
      "advanced"
    ],
    "explanation": "App Router is the modern architecture with server-first rendering, layouts, and better data fetching.",
    "points": 8,
    "sampleAnswers": [
      "Pages Router: `pages/` directory, client-side navigation, no layouts. App Router: `app/` directory, React Server Components, nested layouts, and streaming support.",
      "App Router enables partial rendering with Suspense and automatic code splitting by route."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Pages Router: `pages/` directory, client-side navigation, no layouts. App Router: `app/` directory, React Server Components, nested layouts, and streaming support.",
        "isCorrect": true,
        "explanation": "App Router is the modern architecture with server-first rendering, layouts, and better data fetching."
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

console.log(`✅ Added ${newQuestions.length} questions for Routing (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
