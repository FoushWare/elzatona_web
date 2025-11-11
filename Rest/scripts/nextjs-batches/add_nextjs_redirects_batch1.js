const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/nextjs-questions.json');

const newQuestions = [
  {
    "id": "next-21-40-nextjs-q28",
    "title": "How do you redirect in Next.js App Router?",
    "content": "Use <code>redirect()</code> from <code>next/navigation</code> in Server Components, or <code>useRouter().push()</code> in Client Components.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Redirects",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.794Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "redirects",
      "intermediate"
    ],
    "explanation": "<code>redirect()</code> is for server-side redirects (e.g., auth checks); <code>useRouter</code> is for client-side navigation.",
    "points": 7,
    "sampleAnswers": [
      "In a Server Component: `import { redirect } from 'next/navigation'; if (!user) redirect('/login');`",
      "In a Client Component: `const router = useRouter(); router.push('/dashboard');`"
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "In a Server Component: `import { redirect } from 'next/navigation'; if (!user) redirect('/login');`",
        "isCorrect": true,
        "explanation": "<code>redirect()</code> is for server-side redirects (e.g., auth checks); <code>useRouter</code> is for client-side navigation."
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
    "id": "next-61-80-nextjs-q73",
    "title": "How do you redirect in Next.js App Router?",
    "content": "Use <code>redirect()</code> from <code>next/navigation</code> in Server Components, or <code>useRouter().push()</code> in Client Components.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Redirects",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.796Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "redirects",
      "intermediate"
    ],
    "explanation": "<code>redirect()</code> is for server-side redirects (e.g., auth checks); <code>useRouter</code> is for client-side navigation.",
    "points": 7,
    "sampleAnswers": [
      "In a Server Component: `import { redirect } from 'next/navigation'; if (!user) redirect('/login');`",
      "In a Client Component: `const router = useRouter(); router.push('/dashboard');`"
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "In a Server Component: `import { redirect } from 'next/navigation'; if (!user) redirect('/login');`",
        "isCorrect": true,
        "explanation": "<code>redirect()</code> is for server-side redirects (e.g., auth checks); <code>useRouter</code> is for client-side navigation."
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
    "id": "next41-60-nextjs-q53",
    "title": "How do you redirect in Next.js App Router?",
    "content": "Use <code>redirect()</code> from <code>next/navigation</code> in Server Components, or <code>useRouter().push()</code> in Client Components.",
    "type": "multiple-choice",
    "category": "Next.js",
    "topic": "Redirects",
    "difficulty": "intermediate",
    "learningCardId": "framework-questions",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:48:30.798Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "nextjs",
      "redirects",
      "intermediate"
    ],
    "explanation": "<code>redirect()</code> is for server-side redirects (e.g., auth checks); <code>useRouter</code> is for client-side navigation.",
    "points": 7,
    "sampleAnswers": [
      "In a Server Component: `import { redirect } from 'next/navigation'; if (!user) redirect('/login');`",
      "In a Client Component: `const router = useRouter(); router.push('/dashboard');`"
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "In a Server Component: `import { redirect } from 'next/navigation'; if (!user) redirect('/login');`",
        "isCorrect": true,
        "explanation": "<code>redirect()</code> is for server-side redirects (e.g., auth checks); <code>useRouter</code> is for client-side navigation."
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

console.log(`✅ Added ${newQuestions.length} questions for Redirects (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
