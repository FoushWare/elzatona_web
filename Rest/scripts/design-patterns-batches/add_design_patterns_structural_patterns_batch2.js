const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-flyweight-pattern-20",
    "title": "Disadvantages of Flyweight Pattern",
    "content": "What is a drawback of using the Flyweight Pattern?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.260Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "It can increase code complexity by adding an extra layer of object management. Modern hardware often has enough memory, so the benefit may be negligible in many applications.",
    "points": 10,
    "sampleAnswers": [
      "It can increase code complexity by adding an extra layer of object management.",
      "Modern hardware often has enough memory, so the benefit may be negligible in many applications."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "It can increase code complexity by adding an extra layer of object management.",
        "isCorrect": true,
        "explanation": "It can increase code complexity by adding an extra layer of object management. Modern hardware often has enough memory, so the benefit may be negligible in many applications."
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
    "id": "design-patterns-flyweight-pattern-21",
    "title": "Flyweight vs Factory Pattern",
    "content": "How does the Flyweight Pattern differ from the Factory Pattern?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.260Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "advanced",
      "advanced"
    ],
    "explanation": "Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory. Factory decides *how* to create, Flyweight decides *whether to reuse*.",
    "points": 10,
    "sampleAnswers": [
      "Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory.",
      "Factory decides *how* to create, Flyweight decides *whether to reuse*."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory.",
        "isCorrect": true,
        "explanation": "Factory Pattern abstracts object creation, while Flyweight Pattern focuses on sharing existing objects to save memory. Factory decides *how* to create, Flyweight decides *whether to reuse*."
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
    "id": "design-patterns-flyweight-pattern-22",
    "title": "Fix the Bug",
    "content": "What’s wrong with this implementation?\n\n<pre><code>const isbnNumbers = new Set();\n\nconst createBook = (title, author, isbn) =&gt; {\n  const book = isbnNumbers.has(isbn);\n  if (book) {\n    return book;\n  } else {\n    const book = new Book(title, author, isbn);\n    isbnNumbers.add(isbn);\n    return book;\n  }\n};</code></pre>",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Structural Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.260Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "advanced",
      "advanced"
    ],
    "explanation": "The code incorrectly treats <code>isbnNumbers.has(isbn)</code> as the book object, but it returns a boolean. A <code>Map</code> or dictionary should be used to store ISBN → Book mappings, not just a <code>Set</code>.",
    "points": 10,
    "sampleAnswers": [
      "The code incorrectly treats `isbnNumbers.has(isbn)` as the book object, but it returns a boolean.",
      "A `Map` or dictionary should be used to store ISBN → Book mappings, not just a `Set`."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "The code incorrectly treats `isbnNumbers.has(isbn)` as the book object, but it returns a boolean.",
        "isCorrect": true,
        "explanation": "The code incorrectly treats <code>isbnNumbers.has(isbn)</code> as the book object, but it returns a boolean. A <code>Map</code> or dictionary should be used to store ISBN → Book mappings, not just a <code>Set</code>."
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

console.log(`✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
