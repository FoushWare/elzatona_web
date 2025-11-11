const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/rendering-patterns-questions.json');

const newQuestions = [
  {
    "id": "rendering-patterns-rendering10-16",
    "title": "Which events does Turn hook into to manage the flow of page animations?",
    "content": "Turn listens to Turbo events such as turbo:visit, turbo:before-render, and turbo:render to control animations.",
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
    "explanation": "Turn listens to Turbo events such as turbo:visit, turbo:before-render, and turbo:render to control animations.",
    "points": 10,
    "options": [
      "turbo:start and turbo:end",
      "turbo:visit, turbo:before-render, turbo:render",
      "turbo:click and turbo:load",
      "animationstart and animationend"
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
  },
  {
    "id": "rendering-patterns-rendering10-17",
    "title": "What does setting Turn.config.experimental.viewTransitions = true enable?",
    "content": "It activates experimental support for the View Transitions API, falling back to CSS animations when unsupported.",
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
    "explanation": "It activates experimental support for the View Transitions API, falling back to CSS animations when unsupported.",
    "points": 10,
    "options": [
      "It disables animations completely",
      "It enables experimental view transitions with fallback",
      "It triggers full page reloads",
      "It forces server-side rendering"
    ],
    "hints": [
      "Review rendering pattern documentation",
      "Consider server vs client rendering trade-offs",
      "Think about performance and SEO implications"
    ]
  },
  {
    "id": "rendering-patterns-rendering10-18",
    "title": "What is the main design trade-off between the View Transitions API and traditional exit animations?",
    "content": "The View Transitions API can animate shared elements across pages but requires waiting for new content, while exit animations give instant feedback but can’t transition shared elements.",
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
    "explanation": "The View Transitions API can animate shared elements across pages but requires waiting for new content, while exit animations give instant feedback but can’t transition shared elements.",
    "points": 10,
    "options": [
      "View transitions are faster in all cases",
      "Exit animations support cross-page element morphing",
      "View transitions handle shared elements but may delay feedback",
      "Exit animations require the new HTML before starting"
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

console.log(`✅ Added ${newQuestions.length} questions for Advanced Patterns (Batch 6)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
