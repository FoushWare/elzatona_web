const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering4-7",
    "title": "Partial Hydration",
    "content": "How does Partial Hydration improve performance in the Islands Architecture?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Client-Side Rendering",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.540Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "client-side-rendering",
      "advanced"
    ],
    "explanation": "It allows each component to hydrate independently rather than rehydrating the entire page.",
    "points": 10,
    "sampleAnswers": [
      "It allows each component to hydrate independently rather than rehydrating the entire page.",
      "This reduces JavaScript execution time and memory usage."
    ],
    "options": [
      {
        "id": "o1",
        "text": "It allows each component to hydrate independently rather than rehydrating the entire page.",
        "isCorrect": true,
        "explanation": "It allows each component to hydrate independently rather than rehydrating the entire page."
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
    "id": "rendering-patterns-rendering4-8",
    "title": "Frameworks Supporting Islands",
    "content": "Which frameworks natively support Islands Architecture?",
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
    "explanation": "Astro and Marko",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Astro and Marko",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Next.js only",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Create React App",
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
    "id": "rendering-patterns-rendering4-9",
    "title": "Advantages of Islands Architecture",
    "content": "What are some benefits of adopting the Islands Architecture?",
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
    "explanation": "Reduces the amount of JavaScript shipped to the client.",
    "points": 10,
    "sampleAnswers": [
      "Reduces the amount of JavaScript shipped to the client.",
      "Improves SEO and accessibility due to static HTML.",
      "Allows independent hydration of interactive components."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Reduces the amount of JavaScript shipped to the client.",
        "isCorrect": true,
        "explanation": "Reduces the amount of JavaScript shipped to the client."
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

console.log(`✅ Added ${newQuestions.length} questions for Client-Side Rendering (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
