const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-islandarcheticure-1",
    "title": "Understanding Islands Architecture",
    "content": "What is the core idea behind the Islands Architecture rendering pattern?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Islands Architecture",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.524Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "islands-architecture",
      "intermediate"
    ],
    "explanation": "It divides a web page into small independent interactive sections called islands, while keeping the rest of the page static HTML.",
    "points": 10,
    "sampleAnswers": [
      "It divides a web page into small independent interactive sections called islands, while keeping the rest of the page static HTML.",
      "Each island is hydrated independently, reducing JavaScript load and improving performance."
    ],
    "options": [
      {
        "id": "o1",
        "text": "It divides a web page into small independent interactive sections called islands, while keeping the rest of the page static HTML.",
        "isCorrect": true,
        "explanation": "It divides a web page into small independent interactive sections called islands, while keeping the rest of the page static HTML."
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
    "id": "rendering-patterns-islandarcheticure-2",
    "title": "Islands vs Client-Side Rendering",
    "content": "How does Islands Architecture differ from traditional Client-Side Rendering (CSR)?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Islands Architecture",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.536Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "islands-architecture",
      "intermediate"
    ],
    "explanation": "CSR loads all JavaScript at once, while Islands only hydrate interactive components",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "CSR loads all JavaScript at once, while Islands only hydrate interactive components",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Islands Architecture doesn’t support user interactions",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "CSR is faster than Islands because it’s fully client-driven",
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
    "id": "rendering-patterns-islandarcheticure-3",
    "title": "Performance Benefits",
    "content": "Why does Islands Architecture improve performance?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Islands Architecture",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.536Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "islands-architecture",
      "intermediate"
    ],
    "explanation": "Because it ships less JavaScript and hydrates only necessary interactive components.",
    "points": 10,
    "sampleAnswers": [
      "Because it ships less JavaScript and hydrates only necessary interactive components.",
      "The static HTML renders instantly while islands load independently without blocking the main thread."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Because it ships less JavaScript and hydrates only necessary interactive components.",
        "isCorrect": true,
        "explanation": "Because it ships less JavaScript and hydrates only necessary interactive components."
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

console.log(`✅ Added ${newQuestions.length} questions for Islands Architecture (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
