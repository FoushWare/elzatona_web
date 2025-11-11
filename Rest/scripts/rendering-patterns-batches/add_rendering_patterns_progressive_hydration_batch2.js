const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-render7-4",
    "title": "When to Use Selective Prefetching",
    "content": "In what scenario is Selective Prefetching most effective?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Progressive Hydration",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.538Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "progressive-hydration",
      "intermediate"
    ],
    "explanation": "On pages with many navigation routes where user intent can be predicted",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "On pages with many navigation routes where user intent can be predicted",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "On static single-page apps with no dynamic routing",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "When caching is disabled entirely",
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
    "id": "rendering-patterns-render7-5",
    "title": "Lazy Streaming Rendering",
    "content": "What is Lazy Streaming Rendering and how does it differ from normal streaming?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Progressive Hydration",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.538Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "progressive-hydration",
      "advanced"
    ],
    "explanation": "Lazy Streaming defers rendering of non-critical content until it’s needed, reducing initial TTFB.",
    "points": 10,
    "sampleAnswers": [
      "Lazy Streaming defers rendering of non-critical content until it’s needed, reducing initial TTFB.",
      "Unlike standard streaming, it doesn’t stream everything immediately—it prioritizes essential chunks."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Lazy Streaming defers rendering of non-critical content until it’s needed, reducing initial TTFB.",
        "isCorrect": true,
        "explanation": "Lazy Streaming defers rendering of non-critical content until it’s needed, reducing initial TTFB."
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
    "id": "rendering-patterns-render7-6",
    "title": "React Suspense for Data Fetching",
    "content": "What role does React Suspense play in rendering optimization?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Progressive Hydration",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.538Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "progressive-hydration",
      "advanced"
    ],
    "explanation": "It allows components to wait for data before rendering while showing fallback UI",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "It allows components to wait for data before rendering while showing fallback UI",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "It blocks all rendering until the entire app loads",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "It only works for routing, not data fetching",
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

console.log(`✅ Added ${newQuestions.length} questions for Progressive Hydration (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
