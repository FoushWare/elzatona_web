const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-flyweight-pattern-17",
    "title": "Definition of Flyweight Pattern",
    "content": "What is the Flyweight Pattern, and why is it useful?",
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
      "flyweight-pattern",
      "beginner",
      "intermediate"
    ],
    "explanation": "It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates. It’s useful when creating a large number of similar objects, e.g., books with the same ISBN.",
    "points": 10,
    "sampleAnswers": [
      "It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates.",
      "It’s useful when creating a large number of similar objects, e.g., books with the same ISBN."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates.",
        "isCorrect": true,
        "explanation": "It’s a structural design pattern that minimizes memory usage by sharing common object data instead of creating duplicates. It’s useful when creating a large number of similar objects, e.g., books with the same ISBN."
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
    "id": "design-patterns-flyweight-pattern-18",
    "title": "Flyweight Example Output",
    "content": "What will this code log?\n\n<pre><code>console.log(\"Total amount of copies: \", bookList.length);\nconsole.log(\"Total amount of books: \", isbnNumbers.size);</code></pre>\nAfter adding 5 copies of 3 different books, what is the output?",
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
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: Total amount of copies: 5, Total amount of books: 3",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Total amount of copies: 5, Total amount of books: 5",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Total amount of copies: 3, Total amount of books: 5",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "Total amount of copies: 5, Total amount of books: 3",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-flyweight-pattern-19",
    "title": "Advantages of Flyweight Pattern",
    "content": "Which of the following are advantages of the Flyweight Pattern?",
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
    "explanation": "The correct answer is: Reduced memory usage by reusing objects",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Reduced memory usage by reusing objects",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Improved performance for large-scale applications",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "Simplifies debugging",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "Reduces network latency",
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

console.log(`✅ Added ${newQuestions.length} questions for Structural Patterns (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
