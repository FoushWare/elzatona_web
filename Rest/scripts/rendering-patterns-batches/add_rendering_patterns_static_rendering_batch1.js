const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering-1",
    "title": "Understanding Static Rendering",
    "content": "What is Static Rendering and when is it most suitable?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Static Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "static-rendering",
      "intermediate"
    ],
    "explanation": "Static Rendering generates HTML at build time and serves pre-rendered pages from a CDN or edge cache.",
    "points": 10,
    "sampleAnswers": [
      "Static Rendering generates HTML at build time and serves pre-rendered pages from a CDN or edge cache.",
      "It's best for content that doesn't change often, like blogs, marketing pages, or documentation."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Static Rendering generates HTML at build time and serves pre-rendered pages from a CDN or edge cache.",
        "isCorrect": true,
        "explanation": "Static Rendering generates HTML at build time and serves pre-rendered pages from a CDN or edge cache."
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
    "id": "rendering-patterns-rendering-2",
    "title": "Benefits of Static Rendering",
    "content": "Which of the following is a key advantage of static rendering?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Static Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "static-rendering",
      "intermediate"
    ],
    "explanation": "HTML is pre-generated and can be cached for near-instant TTFB",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "HTML is pre-generated and can be cached for near-instant TTFB",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "The server generates HTML for every request",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Users must fetch data before rendering",
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
    "id": "rendering-patterns-rendering-3",
    "title": "Static Rendering with Client-Side Fetch",
    "content": "What is the drawback of using Client-Side fetch in a static rendered page?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Static Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "static-rendering",
      "intermediate"
    ],
    "explanation": "Delayed Largest Contentful Paint (LCP) since main content loads after client fetch",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Poor SEO due to server-side rendering",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Delayed Largest Contentful Paint (LCP) since main content loads after client fetch",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Cannot cache responses on a CDN",
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

console.log(`✅ Added ${newQuestions.length} questions for Static Rendering (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
