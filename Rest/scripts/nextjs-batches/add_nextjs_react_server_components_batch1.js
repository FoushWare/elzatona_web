const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next1-20-nextjs-q4",
    "title": "What are React Server Components in Next.js?",
    "content": "React Server Components (RSC) run only on the server, can access databases directly, and send only JSON to the client—reducing JavaScript bundle size.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "React Server Components",
    "difficulty": "advanced",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.797Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "react-server-components",
      "advanced"
    ],
    "explanation": "RSCs enable zero-bundle-size components and direct backend access without API layers.",
    "points": 9,
    "sampleAnswers": [
      "Server Components run on the server, fetch data directly, and send serialized output to the client—no hydration needed.",
      "They’re a core part of Next.js App Router, enabling highly optimized full-stack applications."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Server Components run on the server, fetch data directly, and send serialized output to the client—no hydration needed.",
        "isCorrect": true,
        "explanation": "RSCs enable zero-bundle-size components and direct backend access without API layers."
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

console.log(`✅ Added ${newQuestions.length} questions for React Server Components (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
