const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering9-7",
    "title": "Real User Monitoring (RUM)",
    "content": "What is Real User Monitoring and how does it differ from synthetic testing?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Resumability",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "resumability",
      "advanced"
    ],
    "explanation": "RUM collects performance data from actual users in the wild, giving real-world insights.",
    "points": 10,
    "sampleAnswers": [
      "RUM collects performance data from actual users in the wild, giving real-world insights.",
      "Synthetic testing simulates performance in controlled environments, not actual usage."
    ],
    "options": [
      {
        "id": "o1",
        "text": "RUM collects performance data from actual users in the wild, giving real-world insights.",
        "isCorrect": true,
        "explanation": "RUM collects performance data from actual users in the wild, giving real-world insights."
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
    "id": "rendering-patterns-rendering9-8",
    "title": "Performance Budgets",
    "content": "How do performance budgets help teams maintain rendering performance?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Resumability",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "resumability",
      "intermediate"
    ],
    "explanation": "They define quantitative limits (like max JS size or LCP time) to prevent regressions",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "They define quantitative limits (like max JS size or LCP time) to prevent regressions",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "They automatically compress code bundles",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "They control the rendering order of components",
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
    "id": "rendering-patterns-rendering9-9",
    "title": "Hydration and Performance Monitoring",
    "content": "Which metric is most affected by slow hydration in client-side rendered apps?",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Resumability",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.541Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "resumability",
      "advanced"
    ],
    "explanation": "First Input Delay (FID)",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "First Input Delay (FID)",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Cumulative Layout Shift (CLS)",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "Time To First Byte (TTFB)",
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

console.log(`✅ Added ${newQuestions.length} questions for Resumability (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
