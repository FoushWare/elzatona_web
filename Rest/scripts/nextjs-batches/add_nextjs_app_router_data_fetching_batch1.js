const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next1-20-nextjs-q8",
    "title": "How do you fetch data in the App Router?",
    "content": "In App Router, fetch data directly in Server Components using <code>async</code> components and the native <code>fetch()</code> API with automatic deduping and streaming.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "App Router Data Fetching",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "app-router-data-fetching",
      "advanced"
    ],
    "explanation": "Next.js extends <code>fetch()</code> with caching, revalidation, and deduping—no need for <code>getStaticProps</code> or <code>getServerSideProps</code>.",
    "points": 8,
    "sampleAnswers": [
      "Write async Server Components that call `fetch()` directly. Next.js handles caching and deduping automatically.",
      "Example: `async function Page() { const res = await fetch('...'); const data = await res.json(); return <div>{data.title}</div>; }`"
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Write async Server Components that call `fetch()` directly. Next.js handles caching and deduping automatically.",
        "isCorrect": true,
        "explanation": "Next.js extends <code>fetch()</code> with caching, revalidation, and deduping—no need for <code>getStaticProps</code> or <code>getServerSideProps</code>."
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

console.log(`✅ Added ${newQuestions.length} questions for App Router Data Fetching (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
