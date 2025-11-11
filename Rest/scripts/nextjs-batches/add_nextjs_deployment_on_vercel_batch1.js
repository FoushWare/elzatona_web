const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-21-40-nextjs-q38",
    "title": "How do you deploy a Next.js app?",
    "content": "Deploy to Vercel (official platform), Netlify, AWS, or any Node.js-compatible host. Vercel provides automatic SSR/SSG, edge functions, and preview deployments.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Deployment on Vercel",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.794Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "deployment-on-vercel",
      "intermediate"
    ],
    "explanation": "Vercel is optimized for Next.js with zero-config deployments and Git integration.",
    "points": 6,
    "sampleAnswers": [
      "Push to GitHub and deploy on Vercel for automatic builds, preview URLs, and edge network caching.",
      "For self-hosting, run `next build` and `next start` on a Node.js server—but you lose edge functions and ISR."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Push to GitHub and deploy on Vercel for automatic builds, preview URLs, and edge network caching.",
        "isCorrect": true,
        "explanation": "Vercel is optimized for Next.js with zero-config deployments and Git integration."
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
    "id": "next1-20-nextjs-q15",
    "title": "How do you deploy a Next.js app?",
    "content": "Deploy to Vercel (official platform), Netlify, AWS, or any Node.js-compatible host. Vercel provides automatic SSR/SSG, edge functions, and preview deployments.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Deployment on Vercel",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "deployment-on-vercel",
      "intermediate"
    ],
    "explanation": "Vercel is optimized for Next.js with zero-config deployments and Git integration.",
    "points": 6,
    "sampleAnswers": [
      "Push to GitHub and deploy on Vercel for automatic builds, preview URLs, and edge network caching.",
      "For self-hosting, run `next build` and `next start` on a Node.js server—but you lose edge functions and ISR."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Push to GitHub and deploy on Vercel for automatic builds, preview URLs, and edge network caching.",
        "isCorrect": true,
        "explanation": "Vercel is optimized for Next.js with zero-config deployments and Git integration."
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

console.log(`✅ Added ${newQuestions.length} questions for Deployment on Vercel (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
