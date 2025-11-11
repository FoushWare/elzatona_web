const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-provider-pattern-67",
    "title": "Multiple Providers",
    "content": "How can you avoid unnecessary re-renders when using Providers for frequently changing values?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "React Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.282Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "advanced",
      "advanced"
    ],
    "explanation": "By splitting contexts into multiple smaller providers so that components only re-render when the specific value they consume changes. Using memoization or selective context providers to isolate updates.",
    "points": 10,
    "sampleAnswers": [
      "By splitting contexts into multiple smaller providers so that components only re-render when the specific value they consume changes.",
      "Using memoization or selective context providers to isolate updates."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "By splitting contexts into multiple smaller providers so that components only re-render when the specific value they consume changes.",
        "isCorrect": true,
        "explanation": "By splitting contexts into multiple smaller providers so that components only re-render when the specific value they consume changes. Using memoization or selective context providers to isolate updates."
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
    "id": "design-patterns-provider-pattern-68",
    "title": "Custom Hook for Context",
    "content": "What is the benefit of creating a custom hook like <code>useThemeContext()</code> instead of calling <code>useContext(ThemeContext)</code> directly in every component?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "React Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.282Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "The correct answer is: It enforces correct usage and can throw errors if used outside the provider",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "It enforces correct usage and can throw errors if used outside the provider",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "It avoids the need to import useContext at all",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "It improves runtime performance automatically",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-provider-pattern-69",
    "title": "Provider vs Redux",
    "content": "How does the Provider Pattern differ from using Redux for global state management?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "React Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.282Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "advanced",
      "advanced"
    ],
    "explanation": "Provider Pattern with context is simpler and built into React, but doesn’t offer advanced features like middleware, devtools, or predictable reducers. Redux adds structure and tooling, while Context Providers are best for simpler shared state.",
    "points": 10,
    "sampleAnswers": [
      "Provider Pattern with context is simpler and built into React, but doesn’t offer advanced features like middleware, devtools, or predictable reducers.",
      "Redux adds structure and tooling, while Context Providers are best for simpler shared state."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Provider Pattern with context is simpler and built into React, but doesn’t offer advanced features like middleware, devtools, or predictable reducers.",
        "isCorrect": true,
        "explanation": "Provider Pattern with context is simpler and built into React, but doesn’t offer advanced features like middleware, devtools, or predictable reducers. Redux adds structure and tooling, while Context Providers are best for simpler shared state."
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

console.log(`✅ Added ${newQuestions.length} questions for React Patterns (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
