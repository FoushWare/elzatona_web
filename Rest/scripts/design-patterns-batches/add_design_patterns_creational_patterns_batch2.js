const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-factory-pattern-12",
    "title": "Cons of Factory Pattern",
    "content": "What is a major drawback of using the Factory Pattern in JavaScript?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "It can be less memory efficient since new objects are created each time without shared methods. May add unnecessary abstraction for simple cases.",
    "points": 10,
    "sampleAnswers": [
      "It can be less memory efficient since new objects are created each time without shared methods.",
      "May add unnecessary abstraction for simple cases."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "It can be less memory efficient since new objects are created each time without shared methods.",
        "isCorrect": true,
        "explanation": "It can be less memory efficient since new objects are created each time without shared methods. May add unnecessary abstraction for simple cases."
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
    "id": "design-patterns-factory-pattern-13",
    "title": "When to Use",
    "content": "When should the Factory Pattern be used instead of the Common Pattern?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "When creating many similar objects that need custom configurations. When object creation depends on environment or dynamic input.",
    "points": 10,
    "sampleAnswers": [
      "When creating many similar objects that need custom configurations.",
      "When object creation depends on environment or dynamic input."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "When creating many similar objects that need custom configurations.",
        "isCorrect": true,
        "explanation": "When creating many similar objects that need custom configurations. When object creation depends on environment or dynamic input."
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
    "id": "design-patterns-factory-pattern-14",
    "title": "Debugging Factory Pattern",
    "content": "What is wrong with this code?\n\n<pre><code>const createCar = (brand, model) =&gt; {\n  this.brand = brand;\n  this.model = model;\n  return { brand, model };\n};\n\nconst car = createCar('Toyota', 'Corolla');\nconsole.log(car.brand);</code></pre>",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Creational Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.257Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "Using <code>this</code> inside a factory function doesn’t work as expected because factory functions don’t use <code>new</code>. The correct approach is just returning <code>{ brand, model }</code> without <code>this</code>.",
    "points": 10,
    "sampleAnswers": [
      "Using `this` inside a factory function doesn’t work as expected because factory functions don’t use `new`.",
      "The correct approach is just returning `{ brand, model }` without `this`."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Using `this` inside a factory function doesn’t work as expected because factory functions don’t use `new`.",
        "isCorrect": true,
        "explanation": "Using <code>this</code> inside a factory function doesn’t work as expected because factory functions don’t use <code>new</code>. The correct approach is just returning <code>{ brand, model }</code> without <code>this</code>."
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

console.log(`✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
