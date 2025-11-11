const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-21-40-nextjs-q22",
    "title": "How do you handle loading states in the App Router?",
    "content": "Use the <code>loading.js</code> file in a route segment to show a loading UI while data is being fetched. It works with React Suspense.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Data Fetching",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.794Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "loading-states",
      "intermediate"
    ],
    "explanation": "<code>loading.js</code> provides an instant loading UI without client-side JavaScript, improving perceived performance.",
    "points": 7,
    "sampleAnswers": [
      "Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.",
      "This is built on React Suspense—no need for `useState` or `useEffect` to manage loading states manually."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.",
        "isCorrect": true,
        "explanation": "<code>loading.js</code> provides an instant loading UI without client-side JavaScript, improving perceived performance."
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
    "id": "next-61-80-nextjs-q67",
    "title": "How do you handle loading states in the App Router?",
    "content": "Use the <code>loading.js</code> file in a route segment to show a loading UI while data is being fetched. It works with React Suspense.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Data Fetching",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.796Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "loading-states",
      "intermediate"
    ],
    "explanation": "<code>loading.js</code> provides an instant loading UI without client-side JavaScript, improving perceived performance.",
    "points": 7,
    "sampleAnswers": [
      "Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.",
      "This is built on React Suspense—no need for `useState` or `useEffect` to manage loading states manually."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.",
        "isCorrect": true,
        "explanation": "<code>loading.js</code> provides an instant loading UI without client-side JavaScript, improving perceived performance."
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
    "id": "next41-60-nextjs-q47",
    "title": "How do you handle loading states in the App Router?",
    "content": "Use the <code>loading.js</code> file in a route segment to show a loading UI while data is being fetched. It works with React Suspense.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Data Fetching",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "loading-states",
      "intermediate"
    ],
    "explanation": "<code>loading.js</code> provides an instant loading UI without client-side JavaScript, improving perceived performance.",
    "points": 7,
    "sampleAnswers": [
      "Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.",
      "This is built on React Suspense—no need for `useState` or `useEffect` to manage loading states manually."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Create `app/dashboard/loading.js` that exports a component. Next.js shows it immediately while the `page.js` data loads.",
        "isCorrect": true,
        "explanation": "<code>loading.js</code> provides an instant loading UI without client-side JavaScript, improving perceived performance."
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

console.log(`✅ Added ${newQuestions.length} questions for Data Fetching (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
