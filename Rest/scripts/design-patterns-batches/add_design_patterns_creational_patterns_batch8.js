const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-singleton-pattern-81",
    "title": "Singleton vs Object Literal",
    "content": "Why might using a simple object literal sometimes be a better option than implementing a Singleton class in JavaScript?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.298Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "Because JavaScript objects are naturally passed by reference, so a single object can already behave like a Singleton. Using a class adds unnecessary complexity if you don’t need instantiation control.",
    "points": 10,
    "sampleAnswers": [
      "Because JavaScript objects are naturally passed by reference, so a single object can already behave like a Singleton.",
      "Using a class adds unnecessary complexity if you don’t need instantiation control."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Because JavaScript objects are naturally passed by reference, so a single object can already behave like a Singleton.",
        "isCorrect": true,
        "explanation": "Because JavaScript objects are naturally passed by reference, so a single object can already behave like a Singleton. Using a class adds unnecessary complexity if you don’t need instantiation control."
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
    "id": "design-patterns-singleton-pattern-82",
    "title": "Testing Challenges",
    "content": "Why can Singletons be difficult to test?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.298Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "advanced",
      "advanced"
    ],
    "explanation": "All tests share the same instance, so modifications in one test affect others. Resetting state between tests can be cumbersome and error-prone.",
    "points": 10,
    "sampleAnswers": [
      "All tests share the same instance, so modifications in one test affect others.",
      "Resetting state between tests can be cumbersome and error-prone."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "All tests share the same instance, so modifications in one test affect others.",
        "isCorrect": true,
        "explanation": "All tests share the same instance, so modifications in one test affect others. Resetting state between tests can be cumbersome and error-prone."
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
    "id": "design-patterns-singleton-pattern-83",
    "title": "Global Behavior",
    "content": "How is the behavior of a Singleton similar to that of a global variable?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.298Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: Both are accessible throughout the application",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Both are accessible throughout the application",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Both prevent mutation of values",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "Both are automatically garbage collected",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
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

console.log(`✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 8)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
