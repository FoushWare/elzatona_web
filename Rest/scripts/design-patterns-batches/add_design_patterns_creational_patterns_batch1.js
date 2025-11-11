const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-factory-pattern-9",
    "title": "Definition of Factory Pattern",
    "content": "What is the Factory Pattern in JavaScript?",
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
      "factory-pattern",
      "beginner",
      "intermediate"
    ],
    "explanation": "It’s a design pattern where a function (factory function) creates and returns objects without using the <code>new</code> keyword. It provides an abstraction for object creation.",
    "points": 10,
    "sampleAnswers": [
      "It’s a design pattern where a function (factory function) creates and returns objects without using the `new` keyword.",
      "It provides an abstraction for object creation."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "It’s a design pattern where a function (factory function) creates and returns objects without using the `new` keyword.",
        "isCorrect": true,
        "explanation": "It’s a design pattern where a function (factory function) creates and returns objects without using the <code>new</code> keyword. It provides an abstraction for object creation."
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
    "id": "design-patterns-factory-pattern-10",
    "title": "Factory Pattern Example",
    "content": "What will this code log?\n\n<pre><code>const createUser = ({ firstName, lastName, email }) =&gt; ({\n  firstName,\n  lastName,\n  email,\n  fullName() {\n    return <code>${this.firstName} ${this.lastName}</code>;\n  }\n});\n\nconst user = createUser({ firstName: 'John', lastName: 'Doe', email: 'john@doe.com' });\n\nconsole.log(user.fullName());</code></pre>",
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
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: John Doe",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "undefined undefined",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "John Doe",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "[object Object]",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-factory-pattern-11",
    "title": "Pros of Factory Pattern",
    "content": "Which of the following are benefits of using the Factory Pattern?",
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
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: Encapsulation of object creation",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Encapsulation of object creation",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Easier to configure objects dynamically",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "No need to repeat object structure",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "Faster performance than constructors",
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

console.log(`✅ Added ${newQuestions.length} questions for Creational Patterns (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
