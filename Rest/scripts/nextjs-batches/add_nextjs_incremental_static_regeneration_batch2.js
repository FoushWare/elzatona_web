const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next1-20-nextjs-q10",
    "title": "What is ISR (Incremental Static Regeneration)?",
    "content": "ISR allows you to update static content after build time by revalidating pages at a specified interval.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Incremental Static Regeneration",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "incremental-static-regeneration",
      "advanced"
    ],
    "explanation": "With <code>revalidate</code>, Next.js regenerates pages in the background when traffic hits them.",
    "points": 8,
    "sampleAnswers": [
      "ISR combines the speed of SSG with the freshness of SSR. Use `revalidate: 60` in `getStaticProps` to update every 60 seconds.",
      "It’s perfect for blogs, e-commerce, or dashboards where content changes periodically but doesn’t need real-time updates."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "ISR combines the speed of SSG with the freshness of SSR. Use `revalidate: 60` in `getStaticProps` to update every 60 seconds.",
        "isCorrect": true,
        "explanation": "With <code>revalidate</code>, Next.js regenerates pages in the background when traffic hits them."
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
    "id": "next41-60-nextjs-q44",
    "title": "What is ISR (Incremental Static Regeneration)?",
    "content": "ISR allows you to update static content after build time by revalidating pages at a specified interval.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Incremental Static Regeneration",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "incremental-static-regeneration",
      "advanced"
    ],
    "explanation": "With <code>revalidate</code>, Next.js regenerates pages in the background when traffic hits them.",
    "points": 8,
    "sampleAnswers": [
      "ISR combines the speed of SSG with the freshness of SSR. Use `revalidate: 60` in `getStaticProps` to update every 60 seconds.",
      "It’s perfect for blogs, e-commerce, or dashboards where content changes periodically but doesn’t need real-time updates."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "ISR combines the speed of SSG with the freshness of SSR. Use `revalidate: 60` in `getStaticProps` to update every 60 seconds.",
        "isCorrect": true,
        "explanation": "With <code>revalidate</code>, Next.js regenerates pages in the background when traffic hits them."
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
    "id": "next41-60-nextjs-q56",
    "title": "What is on-demand revalidation in Next.js?",
    "content": "On-demand revalidation allows you to purge cached data and regenerate pages after build time using <code>revalidateTag</code> or <code>revalidatePath</code>.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Incremental Static Regeneration",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "incremental-static-regeneration",
      "advanced"
    ],
    "explanation": "It’s the App Router equivalent of ISR but triggered manually via API routes or webhooks.",
    "points": 8,
    "sampleAnswers": [
      "Tag a `fetch` with `next: { tags: ['product-123'] }`. Later, call `revalidateTag('product-123')` in an API route to update the page.",
      "Useful for CMS webhooks, e-commerce inventory updates, or admin actions that require immediate content refresh."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Tag a `fetch` with `next: { tags: ['product-123'] }`. Later, call `revalidateTag('product-123')` in an API route to update the page.",
        "isCorrect": true,
        "explanation": "It’s the App Router equivalent of ISR but triggered manually via API routes or webhooks."
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

console.log(`✅ Added ${newQuestions.length} questions for Incremental Static Regeneration (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
