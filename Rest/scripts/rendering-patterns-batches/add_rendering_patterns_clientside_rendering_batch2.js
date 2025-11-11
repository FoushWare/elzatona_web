const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering4-4",
    "title": "CSR vs SSR Trade-offs",
    "content": "Which of the following best describes the difference between CSR and SSR?",
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
    "explanation": "CSR renders pages on the client, SSR renders them on the server before sending HTML",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "CSR renders pages on the client, SSR renders them on the server before sending HTML",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "SSR requires no JavaScript on the client",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "CSR is faster than SSR in all cases",
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
    "id": "rendering-patterns-rendering4-5",
    "title": "Islands Architecture Concept",
    "content": "What is the core principle of the Islands Architecture pattern?",
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
    "explanation": "Islands Architecture renders mostly static HTML on the server and hydrates only small interactive 'islands' on the client.",
    "points": 10,
    "sampleAnswers": [
      "Islands Architecture renders mostly static HTML on the server and hydrates only small interactive 'islands' on the client.",
      "It helps reduce the amount of JavaScript shipped to the user."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Islands Architecture renders mostly static HTML on the server and hydrates only small interactive 'islands' on the client.",
        "isCorrect": true,
        "explanation": "Islands Architecture renders mostly static HTML on the server and hydrates only small interactive 'islands' on the client."
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
    "id": "rendering-patterns-rendering4-6",
    "title": "Dynamic Islands Example",
    "content": "Which of these is an example of a dynamic island on a static page?",
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
    "explanation": "A social media share widget inside a static blog post",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "A social media share widget inside a static blog post",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Static article text with no JavaScript",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Server-rendered navigation bar",
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

console.log(`✅ Added ${newQuestions.length} questions for Client-Side Rendering (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
