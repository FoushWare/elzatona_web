const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-module-pattern-43",
    "title": "Encapsulation in Module Pattern",
    "content": "How does the Module Pattern achieve encapsulation?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.206Z",
    "updatedAt": "2025-11-11T18:36:58.266Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "By using an Immediately Invoked Function Expression (IIFE) to create a private scope. Only the returned object exposes public members, while variables/functions inside the closure remain private.",
    "points": 10,
    "sampleAnswers": [
      "By using an Immediately Invoked Function Expression (IIFE) to create a private scope.",
      "Only the returned object exposes public members, while variables/functions inside the closure remain private."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "By using an Immediately Invoked Function Expression (IIFE) to create a private scope.",
        "isCorrect": true,
        "explanation": "By using an Immediately Invoked Function Expression (IIFE) to create a private scope. Only the returned object exposes public members, while variables/functions inside the closure remain private."
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
    "id": "design-patterns-module-pattern-44",
    "title": "Drawback of Module Pattern",
    "content": "Which of the following is a drawback of the Module Pattern?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.206Z",
    "updatedAt": "2025-11-11T18:36:58.266Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "The correct answer is: Private members cannot be accessed or modified without changing the original module",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "It makes code modular and organized",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Private members cannot be accessed or modified without changing the original module",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "It always requires classes",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-module-pattern-45",
    "title": "Revealing Module Pattern",
    "content": "What is the difference between the classic Module Pattern and the Revealing Module Pattern?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.206Z",
    "updatedAt": "2025-11-11T18:36:58.266Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "The Revealing Module Pattern maps private functions/variables to a returned object explicitly, improving readability. It makes it clear which functions are public and which remain private.",
    "points": 10,
    "sampleAnswers": [
      "The Revealing Module Pattern maps private functions/variables to a returned object explicitly, improving readability.",
      "It makes it clear which functions are public and which remain private."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "The Revealing Module Pattern maps private functions/variables to a returned object explicitly, improving readability.",
        "isCorrect": true,
        "explanation": "The Revealing Module Pattern maps private functions/variables to a returned object explicitly, improving readability. It makes it clear which functions are public and which remain private."
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

console.log(`✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 7)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
