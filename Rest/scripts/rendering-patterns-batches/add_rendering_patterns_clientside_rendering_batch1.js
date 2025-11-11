const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering4-1",
    "title": "Client-Side Rendering (CSR) Fundamentals",
    "content": "What happens during the Client-Side Rendering (CSR) process in a React application?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Client-Side Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.540Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "client-side-rendering",
      "intermediate"
    ],
    "explanation": "In CSR, the browser loads a minimal HTML shell and JavaScript bundles.",
    "points": 10,
    "sampleAnswers": [
      "In CSR, the browser loads a minimal HTML shell and JavaScript bundles.",
      "React builds and renders the entire UI in the client’s browser."
    ],
    "options": [
      {
        "id": "o1",
        "text": "In CSR, the browser loads a minimal HTML shell and JavaScript bundles.",
        "isCorrect": true,
        "explanation": "In CSR, the browser loads a minimal HTML shell and JavaScript bundles."
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
    "id": "rendering-patterns-rendering4-2",
    "title": "CSR and SEO Challenges",
    "content": "Why can Client-Side Rendering negatively affect SEO?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Client-Side Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.540Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "client-side-rendering",
      "intermediate"
    ],
    "explanation": "Search engines struggle to index JavaScript-rendered pages",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Search engines struggle to index JavaScript-rendered pages",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "CSR prevents the use of meta tags",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "CSR makes sites slower for all users",
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
    "id": "rendering-patterns-rendering4-3",
    "title": "Improving CSR Performance",
    "content": "What is a common technique to improve perceived performance in Client-Side Rendering?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Client-Side Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.540Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "client-side-rendering",
      "intermediate"
    ],
    "explanation": "Use code-splitting and lazy loading to reduce the initial bundle size.",
    "points": 10,
    "sampleAnswers": [
      "Use code-splitting and lazy loading to reduce the initial bundle size.",
      "Show loading skeletons while data is being fetched."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Use code-splitting and lazy loading to reduce the initial bundle size.",
        "isCorrect": true,
        "explanation": "Use code-splitting and lazy loading to reduce the initial bundle size."
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

console.log(`✅ Added ${newQuestions.length} questions for Client-Side Rendering (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
