const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering-4",
    "title": "Static Rendering with getStaticProps",
    "content": "What is the primary purpose of using getStaticProps in Next.js?",
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
    "explanation": "It allows fetching data at build time to generate static HTML with data baked in, avoiding client-side API calls.",
    "points": 10,
    "sampleAnswers": [
      "It allows fetching data at build time to generate static HTML with data baked in, avoiding client-side API calls.",
      "It improves performance by reducing runtime data fetching."
    ],
    "options": [
      {
        "id": "o1",
        "text": "It allows fetching data at build time to generate static HTML with data baked in, avoiding client-side API calls.",
        "isCorrect": true,
        "explanation": "It allows fetching data at build time to generate static HTML with data baked in, avoiding client-side API calls."
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
    "id": "rendering-patterns-rendering-5",
    "title": "Drawback of getStaticProps",
    "content": "What problem can arise when using getStaticProps for large sites with many pages?",
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
    "explanation": "Long build times and hitting API request limits",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Long build times and hitting API request limits",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Poor SEO optimization",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Increased client-side bundle size",
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
    "id": "rendering-patterns-rendering-6",
    "title": "Incremental Static Regeneration (ISR)",
    "content": "How does Incremental Static Regeneration improve over plain static rendering?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Static Rendering",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "static-rendering",
      "advanced"
    ],
    "explanation": "ISR allows selective regeneration of pages after deployment without rebuilding the whole site.",
    "points": 10,
    "sampleAnswers": [
      "ISR allows selective regeneration of pages after deployment without rebuilding the whole site.",
      "It reduces build times and enables automatic cache invalidation for dynamic content."
    ],
    "options": [
      {
        "id": "o1",
        "text": "ISR allows selective regeneration of pages after deployment without rebuilding the whole site.",
        "isCorrect": true,
        "explanation": "ISR allows selective regeneration of pages after deployment without rebuilding the whole site."
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

console.log(`✅ Added ${newQuestions.length} questions for Static Rendering (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
