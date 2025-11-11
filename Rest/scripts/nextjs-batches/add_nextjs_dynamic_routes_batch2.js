const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next41-60-nextjs-q51",
    "title": "How do you handle dynamic routes in the App Router?",
    "content": "Use dynamic segments like <code>app/users/[id]/page.js</code>. Fetch data using <code>params.id</code> in the Server Component.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Dynamic Routes",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "dynamic-routes",
      "intermediate"
    ],
    "explanation": "The <code>params</code> object is passed to <code>page.js</code>, <code>layout.js</code>, and other route handlers automatically.",
    "points": 7,
    "sampleAnswers": [
      "Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`",
      "Use `generateStaticParams` to pre-render dynamic routes at build time for SSG."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Create `app/blog/[slug]/page.js`. The `slug` is available via `params.slug` in the component: `export default async function Page({ params }) { ... }`",
        "isCorrect": true,
        "explanation": "The <code>params</code> object is passed to <code>page.js</code>, <code>layout.js</code>, and other route handlers automatically."
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

console.log(`✅ Added ${newQuestions.length} questions for Dynamic Routes (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
