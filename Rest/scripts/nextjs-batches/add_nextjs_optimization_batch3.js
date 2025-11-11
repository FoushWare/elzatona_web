const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next41-60-nextjs-q41",
    "title": "What is the purpose of next/image in Next.js?",
    "content": "<code>next/image</code> is an extension of the HTML <code>&lt;img&gt;</code> element that provides automatic image optimization, including resizing, format conversion (WebP/AVIF), and lazy loading.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Optimization",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "image-optimization",
      "intermediate"
    ],
    "explanation": "It reduces bandwidth, improves LCP, prevents layout shift, and integrates with CDNs like Vercel or Imgix.",
    "points": 7,
    "sampleAnswers": [
      "`next/image` automatically serves modern formats like WebP, resizes based on device, and lazy-loads offscreen images—no config needed.",
      "It requires a parent with defined width/height or uses `fill` mode for responsive containers."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "`next/image` automatically serves modern formats like WebP, resizes based on device, and lazy-loads offscreen images—no config needed.",
        "isCorrect": true,
        "explanation": "It reduces bandwidth, improves LCP, prevents layout shift, and integrates with CDNs like Vercel or Imgix."
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
    "id": "next41-60-nextjs-q59",
    "title": "How does Next.js optimize images?",
    "content": "Next.js uses the <code>next/image</code> component to automatically optimize images (resize, compress, modern formats) and lazy-load them.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Optimization",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "image-optimization",
      "intermediate"
    ],
    "explanation": "It reduces bandwidth, improves LCP, and prevents layout shift with automatic sizing.",
    "points": 7,
    "sampleAnswers": [
      "`next/image` serves optimized WebP/AVIF, resizes based on device, and lazy-loads offscreen images—no config needed.",
      "It integrates with CDNs and local file storage, and supports blur-up placeholders."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "`next/image` serves optimized WebP/AVIF, resizes based on device, and lazy-loads offscreen images—no config needed.",
        "isCorrect": true,
        "explanation": "It reduces bandwidth, improves LCP, and prevents layout shift with automatic sizing."
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
    "id": "next41-60-nextjs-q60",
    "title": "What is the difference between `next/image` and `next/future/image`?",
    "content": "<code>next/future/image</code> was an experimental version in Next.js 12. It’s now stable and available as <code>next/image</code> in Next.js 13+.",
    "type": "true-false",
    "category": "Next.js",
    "topic": "Optimization",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "image-optimization",
      "intermediate"
    ],
    "explanation": "As of Next.js 13, <code>next/image</code> is the stable, recommended component.",
    "points": 5,
    "options": [
      {
        "id": "a",
        "text": "False",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "True",
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

console.log(`✅ Added ${newQuestions.length} questions for Optimization (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
