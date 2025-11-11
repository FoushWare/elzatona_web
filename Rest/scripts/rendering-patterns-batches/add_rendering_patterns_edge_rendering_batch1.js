const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-render6-1",
    "title": "Edge Rendering Basics",
    "content": "What is Edge Rendering and how does it differ from traditional SSR?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Edge Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.537Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "edge-rendering",
      "intermediate"
    ],
    "explanation": "Edge Rendering executes server-side logic at CDN edge locations, closer to the user.",
    "points": 10,
    "sampleAnswers": [
      "Edge Rendering executes server-side logic at CDN edge locations, closer to the user.",
      "It differs from traditional SSR because responses are generated with lower latency and faster Time To First Byte (TTFB)."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Edge Rendering executes server-side logic at CDN edge locations, closer to the user.",
        "isCorrect": true,
        "explanation": "Edge Rendering executes server-side logic at CDN edge locations, closer to the user."
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
    "id": "rendering-patterns-render6-2",
    "title": "Advantages of Edge Rendering",
    "content": "Which of the following is a main advantage of Edge Rendering?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Edge Rendering",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.537Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "edge-rendering",
      "intermediate"
    ],
    "explanation": "Reduced latency due to geographical proximity to users",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Reduced latency due to geographical proximity to users",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "It replaces all client-side rendering logic",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "It always increases server costs",
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
    "id": "rendering-patterns-render6-3",
    "title": "Edge vs CDN Caching",
    "content": "How is Edge Rendering different from traditional CDN caching?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Edge Rendering",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.537Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "edge-rendering",
      "advanced"
    ],
    "explanation": "CDN caching serves static assets, while Edge Rendering runs dynamic server code at the edge.",
    "points": 10,
    "sampleAnswers": [
      "CDN caching serves static assets, while Edge Rendering runs dynamic server code at the edge.",
      "Edge rendering can personalize responses per user, unlike static CDN cache."
    ],
    "options": [
      {
        "id": "o1",
        "text": "CDN caching serves static assets, while Edge Rendering runs dynamic server code at the edge.",
        "isCorrect": true,
        "explanation": "CDN caching serves static assets, while Edge Rendering runs dynamic server code at the edge."
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

console.log(`✅ Added ${newQuestions.length} questions for Edge Rendering (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
