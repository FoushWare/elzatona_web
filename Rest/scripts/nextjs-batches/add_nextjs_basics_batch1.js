const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next1-20-nextjs-q1",
    "title": "What is Next.js?",
    "content": "Next.js is a React framework for building full-stack web applications with features like server-side rendering (SSR), static site generation (SSG), file-based routing, and API routes.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Basics",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "next.js-basics",
      "beginner",
      "intermediate"
    ],
    "explanation": "Next.js simplifies React app development by providing built-in solutions for routing, data fetching, optimization, and deployment.",
    "points": 4,
    "sampleAnswers": [
      "Next.js is a React framework that enables server-rendered, statically generated, and hybrid applications with zero config.",
      "It provides features like file-based routing, API routes, image optimization, and middleware out of the box."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Next.js is a React framework that enables server-rendered, statically generated, and hybrid applications with zero config.",
        "isCorrect": true,
        "explanation": "Next.js simplifies React app development by providing built-in solutions for routing, data fetching, optimization, and deployment."
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
    "id": "next1-20-nextjs-q2",
    "title": "What are the main features of Next.js?",
    "content": "Key features include: file-based routing, server-side rendering (SSR), static site generation (SSG), API routes, image optimization, automatic code splitting, and middleware.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Basics",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "next.js-basics",
      "intermediate"
    ],
    "explanation": "These features enable full-stack development with optimized performance and SEO.",
    "points": 6,
    "options": [
      {
        "id": "a",
        "text": "File-based routing, SSR/SSG, API routes, image optimization, middleware",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Only client-side rendering",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "No built-in routing",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "Requires manual Webpack configuration",
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

console.log(`✅ Added ${newQuestions.length} questions for Basics (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
