const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering10-7",
    "title": "When should document.startViewTransition ideally be called during page navigation?",
    "content": "After the data request completes to minimize the time the DOM is frozen and improve user experience.",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Advanced Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.539Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "advanced-patterns",
      "intermediate"
    ],
    "explanation": "After the data request completes to minimize the time the DOM is frozen and improve user experience.",
    "points": 10,
    "options": [
      "Before sending the data request",
      "Immediately on link click",
      "After the data request completes",
      "After component unmount"
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
  },
  {
    "id": "rendering-patterns-rendering10-8",
    "title": "How can developers delay the completion of a transition?",
    "content": "By returning a Promise from the callback, which must resolve before the animation completes.",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Advanced Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.539Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "advanced-patterns",
      "advanced"
    ],
    "explanation": "By returning a Promise from the callback, which must resolve before the animation completes.",
    "points": 10,
    "options": [
      "By using setTimeout inside the callback",
      "By returning a Promise that resolves when the DOM update is complete",
      "By pausing the animation manually",
      "By re-rendering the DOM asynchronously"
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
  },
  {
    "id": "rendering-patterns-rendering10-9",
    "title": "Which React lifecycle method is used in the example to prevent premature rendering during a transition?",
    "content": "shouldComponentUpdate() is overridden to return false, delaying rendering until the view transition begins.",
    "type": "multiple-choice",
    "category": "Rendering Patterns",
    "topic": "Advanced Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:59:32.539Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "rendering-patterns",
      "advanced-patterns",
      "advanced"
    ],
    "explanation": "shouldComponentUpdate() is overridden to return false, delaying rendering until the view transition begins.",
    "points": 10,
    "options": [
      "componentDidMount()",
      "componentWillUnmount()",
      "shouldComponentUpdate()",
      "getSnapshotBeforeUpdate()"
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

console.log(`✅ Added ${newQuestions.length} questions for Advanced Patterns (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
