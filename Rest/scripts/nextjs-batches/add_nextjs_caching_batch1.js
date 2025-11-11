const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-21-40-nextjs-q32",
    "title": "How does Next.js handle caching?",
    "content": "Next.js extends <code>fetch()</code> with automatic caching, revalidation, and deduping. Use <code>cache</code>, <code>next.revalidate</code>, and <code>next.tags</code> options.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Caching",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.794Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "caching",
      "advanced"
    ],
    "explanation": "Caching is opt-in via <code>fetch</code> options, replacing <code>getStaticProps</code>/<code>getServerSideProps</code>.",
    "points": 9,
    "sampleAnswers": [
      "`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: 'no-store' })` disables caching for SSR.",
      "Use `tags` for on-demand revalidation: `fetch(url, { next: { tags: ['posts'] } })` then `revalidateTag('posts')` in an API route."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: 'no-store' })` disables caching for SSR.",
        "isCorrect": true,
        "explanation": "Caching is opt-in via <code>fetch</code> options, replacing <code>getStaticProps</code>/<code>getServerSideProps</code>."
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
    "id": "next-61-80-nextjs-q75",
    "title": "How does Next.js handle caching?",
    "content": "Next.js extends <code>fetch()</code> with automatic caching, revalidation, and deduping. Use <code>cache</code>, <code>next.revalidate</code>, and <code>next.tags</code> options.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Caching",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.796Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "caching",
      "advanced"
    ],
    "explanation": "Caching is opt-in via <code>fetch</code> options, replacing <code>getStaticProps</code>/<code>getServerSideProps</code>.",
    "points": 9,
    "sampleAnswers": [
      "`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: 'no-store' })` disables caching for SSR.",
      "Use `tags` for on-demand revalidation: `fetch(url, { next: { tags: ['posts'] } })` then `revalidateTag('posts')` in an API route."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: 'no-store' })` disables caching for SSR.",
        "isCorrect": true,
        "explanation": "Caching is opt-in via <code>fetch</code> options, replacing <code>getStaticProps</code>/<code>getServerSideProps</code>."
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
    "id": "next41-60-nextjs-q55",
    "title": "How does Next.js handle caching?",
    "content": "Next.js extends <code>fetch()</code> with automatic caching, revalidation, and deduping. Use <code>cache</code>, <code>next.revalidate</code>, and <code>next.tags</code> options.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Caching",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "caching",
      "advanced"
    ],
    "explanation": "Caching is opt-in via <code>fetch</code> options, replacing <code>getStaticProps</code>/<code>getServerSideProps</code>.",
    "points": 9,
    "sampleAnswers": [
      "`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: 'no-store' })` disables caching for SSR.",
      "Use `tags` for on-demand revalidation: `fetch(url, { next: { tags: ['posts'] } })` then `revalidateTag('posts')` in an API route."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "`fetch(url, { next: { revalidate: 60 } })` caches for 60 seconds. `fetch(url, { cache: 'no-store' })` disables caching for SSR.",
        "isCorrect": true,
        "explanation": "Caching is opt-in via <code>fetch</code> options, replacing <code>getStaticProps</code>/<code>getServerSideProps</code>."
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

console.log(`✅ Added ${newQuestions.length} questions for Caching (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
