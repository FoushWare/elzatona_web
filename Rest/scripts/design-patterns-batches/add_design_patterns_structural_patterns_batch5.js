const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-mixin-pattern-37",
    "title": "Real World Browser Example",
    "content": "Which of the following are examples of mixins in the browser Window object?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.206Z",
    "updatedAt": "2025-11-11T18:36:58.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "The correct answer is: setTimeout and setInterval (from WindowOrWorkerGlobalScope)",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "setTimeout and setInterval (from WindowOrWorkerGlobalScope)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "onbeforeunload (from WindowEventHandlers)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "document.querySelector",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "console.log",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-mixin-pattern-38",
    "title": "Disadvantages of Mixins",
    "content": "What are potential disadvantages of using Mixins?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.206Z",
    "updatedAt": "2025-11-11T18:36:58.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "They can cause prototype pollution, making it unclear where a function originated. They can introduce naming conflicts if two mixins define the same property. In React, they added complexity, leading the team to recommend HOCs and Hooks instead.",
    "points": 10,
    "sampleAnswers": [
      "They can cause prototype pollution, making it unclear where a function originated.",
      "They can introduce naming conflicts if two mixins define the same property.",
      "In React, they added complexity, leading the team to recommend HOCs and Hooks instead."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "They can cause prototype pollution, making it unclear where a function originated.",
        "isCorrect": true,
        "explanation": "They can cause prototype pollution, making it unclear where a function originated. They can introduce naming conflicts if two mixins define the same property. In React, they added complexity, leading the team to recommend HOCs and Hooks instead."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review the design pattern concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "design-patterns-mixin-pattern-39",
    "title": "Mixin vs Higher Order Components",
    "content": "Why did React discourage mixins in favor of Higher Order Components (HOCs) and later Hooks?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.206Z",
    "updatedAt": "2025-11-11T18:36:58.264Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "advanced",
      "advanced"
    ],
    "explanation": "Mixins often lead to implicit dependencies and complexity, while HOCs and Hooks are more explicit, composable, and predictable. Hooks allow better reusability and cleaner separation of concerns than mixins.",
    "points": 10,
    "sampleAnswers": [
      "Mixins often lead to implicit dependencies and complexity, while HOCs and Hooks are more explicit, composable, and predictable.",
      "Hooks allow better reusability and cleaner separation of concerns than mixins."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Mixins often lead to implicit dependencies and complexity, while HOCs and Hooks are more explicit, composable, and predictable.",
        "isCorrect": true,
        "explanation": "Mixins often lead to implicit dependencies and complexity, while HOCs and Hooks are more explicit, composable, and predictable. Hooks allow better reusability and cleaner separation of concerns than mixins."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review the design pattern concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
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

console.log(`✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 5)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
