const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-islandarcheticure-7",
    "title": "Use Case Fit",
    "content": "Which type of application benefits most from Islands Architecture?",
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
    "explanation": "Content-heavy websites like blogs or marketing pages",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Highly interactive dashboards",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "Content-heavy websites like blogs or marketing pages",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "Real-time gaming apps",
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
    "id": "rendering-patterns-islandarcheticure-8",
    "title": "Tradeoffs",
    "content": "What’s one major drawback of adopting Islands Architecture today?",
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
    "explanation": "Limited framework support outside of Astro and Marko.",
    "points": 10,
    "sampleAnswers": [
      "Limited framework support outside of Astro and Marko.",
      "Migration from traditional CSR or SSR frameworks can be complex."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Limited framework support outside of Astro and Marko.",
        "isCorrect": true,
        "explanation": "Limited framework support outside of Astro and Marko."
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
    "id": "rendering-patterns-islandarcheticure-9",
    "title": "SEO Advantage",
    "content": "Why is Islands Architecture more SEO-friendly compared to Client-Side Rendering?",
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
    "explanation": "It serves fully rendered HTML to crawlers before hydration",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "It serves fully rendered HTML to crawlers before hydration",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "It delays rendering until user interaction",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "It hides interactive components from crawlers",
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

console.log(`✅ Added ${newQuestions.length} questions for Islands Architecture (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
