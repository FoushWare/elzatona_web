const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-prototype-pattern-58",
    "title": "Prototype vs Instance Properties",
    "content": "In the Dog class example, where is the bark() method stored?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.281Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: On Dog.prototype, shared by all instances",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "On each Dog instance",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "On Dog.prototype, shared by all instances",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "Inside the Dog constructor",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "In the global window object",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-prototype-pattern-59",
    "title": "Adding Properties Dynamically",
    "content": "If you add Dog.prototype.play after creating instances, will existing instances have access to play()?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.281Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "The correct answer is: Yes, because all instances reference the same prototype",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Yes, because all instances reference the same prototype",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "No, only future instances get it",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "It depends on whether the object was frozen",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "JavaScript throws an error",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-prototype-pattern-60",
    "title": "Prototype Chain",
    "content": "How does JavaScript resolve a property that isn’t found directly on an object?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.208Z",
    "updatedAt": "2025-11-11T18:36:58.281Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "It traverses the prototype chain via __proto__ until it finds the property or reaches null. This process is called prototype chaining.",
    "points": 10,
    "sampleAnswers": [
      "It traverses the prototype chain via __proto__ until it finds the property or reaches null.",
      "This process is called prototype chaining."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "It traverses the prototype chain via __proto__ until it finds the property or reaches null.",
        "isCorrect": true,
        "explanation": "It traverses the prototype chain via __proto__ until it finds the property or reaches null. This process is called prototype chaining."
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

console.log(`✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 4)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
