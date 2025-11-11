const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-third-party-tp3",
    "title": "How can you optimize non-critical third-party JavaScript?",
    "content": "Explain async and defer usage for non-critical third-party scripts.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Third-Party Loading",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "third-party-loading",
      "intermediate"
    ],
    "explanation": "Use defer to fetch scripts in parallel and execute after DOM parsing, or async to execute as soon as available without blocking the parser, for scripts that are not critical to initial rendering.",
    "points": 10,
    "sampleAnswers": [
      "Use defer to fetch scripts in parallel and execute after DOM parsing, or async to execute as soon as available without blocking the parser, for scripts that are not critical to initial rendering."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Use defer to fetch scripts in parallel and execute after DOM parsing, or async to execute as soon as available without blocking the parser, for scripts that are not critical to initial rendering.",
        "isCorrect": true,
        "explanation": "Use defer to fetch scripts in parallel and execute after DOM parsing, or async to execute as soon as available without blocking the parser, for scripts that are not critical to initial rendering."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review performance optimization concepts.",
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
        "text": "Not quite. Consider web performance best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "performance-patterns-third-party-tp4",
    "title": "True or False: Preconnect and dns-prefetch can speed up third-party resource loading.",
    "content": "Evaluate whether resource hints improve third-party performance.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Third-Party Loading",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "third-party-loading",
      "intermediate"
    ],
    "explanation": "The correct answer is: True",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "True",
        "isCorrect": true,
        "explanation": "Resource hints like dns-prefetch and preconnect reduce latency by initiating DNS lookups and TCP/TLS connections early."
      },
      {
        "id": "o2",
        "text": "False",
        "isCorrect": false,
        "explanation": "Resource hints are effective and recommended for critical third-party resources."
      },
      {
        "id": "o3",
        "text": "Partially true - depends on the context",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Not applicable",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-third-party-tp5",
    "title": "What is the benefit of lazy-loading third-party embeds?",
    "content": "Explain why lazy-loading YouTube, maps, and social media embeds improves page performance.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Third-Party Loading",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "third-party-loading",
      "intermediate"
    ],
    "explanation": "Embeds not visible on page load are delayed until needed, reducing initial load times and blocking of critical rendering.",
    "points": 10,
    "sampleAnswers": [
      "Embeds not visible on page load are delayed until needed, reducing initial load times and blocking of critical rendering."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Embeds not visible on page load are delayed until needed, reducing initial load times and blocking of critical rendering.",
        "isCorrect": true,
        "explanation": "Embeds not visible on page load are delayed until needed, reducing initial load times and blocking of critical rendering."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review performance optimization concepts.",
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
        "text": "Not quite. Consider web performance best practices.",
        "isCorrect": false,
        "explanation": ""
      }
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

console.log(`✅ Added ${newQuestions.length} questions for Third-Party Loading (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
