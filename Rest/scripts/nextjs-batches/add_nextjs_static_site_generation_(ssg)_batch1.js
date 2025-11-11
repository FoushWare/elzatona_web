const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-21-40-nextjs-q25",
    "title": "What is the difference between `generateStaticParams` and `getStaticPaths`?",
    "content": "<code>generateStaticParams</code> is used in App Router for dynamic routes with SSG. <code>getStaticPaths</code> is the Pages Router equivalent.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Static Site Generation (SSG)",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.794Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "static-site-generation-(ssg)",
      "intermediate"
    ],
    "explanation": "Both define which dynamic routes to pre-render at build time.",
    "points": 7,
    "options": [
      {
        "id": "a",
        "text": "`generateStaticParams`: App Router; `getStaticPaths`: Pages Router",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "They are the same function",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "`getStaticPaths` works in App Router",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "`generateStaticParams` is for SSR",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "next-61-80-nextjs-q70",
    "title": "What is the difference between `generateStaticParams` and `getStaticPaths`?",
    "content": "<code>generateStaticParams</code> is used in App Router for dynamic routes with SSG. <code>getStaticPaths</code> is the Pages Router equivalent.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Static Site Generation (SSG)",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.796Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "static-site-generation-(ssg)",
      "intermediate"
    ],
    "explanation": "Both define which dynamic routes to pre-render at build time.",
    "points": 7,
    "options": [
      {
        "id": "a",
        "text": "`generateStaticParams`: App Router; `getStaticPaths`: Pages Router",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "They are the same function",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "`getStaticPaths` works in App Router",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "`generateStaticParams` is for SSR",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "next1-20-nextjs-q6",
    "title": "What is getStaticProps in Next.js?",
    "content": "<code>getStaticProps</code> is a Pages Router function that fetches data at build time for static generation (SSG).",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Static Site Generation (SSG)",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "static-site-generation-(ssg)",
      "intermediate"
    ],
    "explanation": "It runs only at build time and returns props to the page component.",
    "points": 7,
    "sampleAnswers": [
      "`getStaticProps` fetches data during build and generates static HTML. It’s ideal for content that doesn’t change often, like blogs or docs.",
      "It only works in the `pages/` directory and cannot be used in the App Router."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "`getStaticProps` fetches data during build and generates static HTML. It’s ideal for content that doesn’t change often, like blogs or docs.",
        "isCorrect": true,
        "explanation": "It runs only at build time and returns props to the page component."
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

console.log(`✅ Added ${newQuestions.length} questions for Static Site Generation (SSG) (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
