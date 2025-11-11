const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering2-1",
    "title": "Understanding Server-Side Rendering (SSR)",
    "content": "What happens during the Server-Side Rendering (SSR) process in frameworks like Next.js?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Server-Side Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.539Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "server-side-rendering",
      "intermediate"
    ],
    "explanation": "The server executes React components to generate HTML on each request and sends it to the client.",
    "points": 10,
    "sampleAnswers": [
      "The server executes React components to generate HTML on each request and sends it to the client.",
      "The client then hydrates the HTML to make it interactive."
    ],
    "options": [
      {
        "id": "o1",
        "text": "The server executes React components to generate HTML on each request and sends it to the client.",
        "isCorrect": true,
        "explanation": "The server executes React components to generate HTML on each request and sends it to the client."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review rendering pattern concepts.",
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
        "text": "Not quite. Consider rendering strategy best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
  },
  {
    "id": "rendering-patterns-rendering2-2",
    "title": "SSR Performance Trade-off",
    "content": "What is the main trade-off when using Server-Side Rendering?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Server-Side Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.539Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "server-side-rendering",
      "intermediate"
    ],
    "explanation": "Higher server load and slower TTFB compared to static rendering",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Faster Time to First Byte (TTFB)",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Higher server load and slower TTFB compared to static rendering",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Improved client-side bundle size",
        "isCorrect": false
      }
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
  },
  {
    "id": "rendering-patterns-rendering2-3",
    "title": "SSR Use Case",
    "content": "Which scenario best benefits from Server-Side Rendering?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Server-Side Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.539Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "server-side-rendering",
      "intermediate"
    ],
    "explanation": "A dashboard showing real-time user data",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "A marketing blog updated monthly",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "A dashboard showing real-time user data",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "A static documentation website",
        "isCorrect": false
      }
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
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

console.log(`✅ Added ${newQuestions.length} questions for Server-Side Rendering (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
