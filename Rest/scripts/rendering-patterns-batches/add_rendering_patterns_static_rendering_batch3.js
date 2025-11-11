const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering-7",
    "title": "ISR Fallback Behavior",
    "content": "What happens when a user requests a page that hasn’t been generated yet in ISR?",
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
    "explanation": "The page is generated on-demand and cached for future requests",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "The server immediately returns a 404 error",
        "isCorrect": false
      },
      {
        "id": "b",
        "text": "The page is generated on-demand and cached for future requests",
        "isCorrect": true
      },
      {
        "id": "c",
        "text": "The user sees a loading spinner until next build",
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
    "id": "rendering-patterns-rendering-8",
    "title": "On-Demand Incremental Static Regeneration",
    "content": "How does On-Demand ISR differ from regular ISR?",
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
    "explanation": "Instead of regenerating pages at fixed intervals, On-Demand ISR regenerates pages in response to specific events like webhooks or data updates.",
    "points": 10,
    "sampleAnswers": [
      "Instead of regenerating pages at fixed intervals, On-Demand ISR regenerates pages in response to specific events like webhooks or data updates.",
      "It reduces unnecessary rebuilds and operational costs."
    ],
    "options": [
      {
        "id": "o1",
        "text": "Instead of regenerating pages at fixed intervals, On-Demand ISR regenerates pages in response to specific events like webhooks or data updates.",
        "isCorrect": true,
        "explanation": "Instead of regenerating pages at fixed intervals, On-Demand ISR regenerates pages in response to specific events like webhooks or data updates."
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
    "id": "rendering-patterns-rendering-9",
    "title": "Performance Metric Association",
    "content": "Which Core Web Vital is most improved by Static Rendering?",
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
    "explanation": "Largest Contentful Paint (LCP)",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Largest Contentful Paint (LCP)",
        "isCorrect": true
      },
      {
        "id": "b",
        "text": "Cumulative Layout Shift (CLS)",
        "isCorrect": false
      },
      {
        "id": "c",
        "text": "First Input Delay (FID)",
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

console.log(`✅ Added ${newQuestions.length} questions for Static Rendering (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
