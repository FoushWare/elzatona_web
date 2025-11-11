const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-mediator-pattern-25",
    "title": "Definition of Mediator Pattern",
    "content": "What is the Mediator Pattern, and why is it useful?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Behavioral Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.261Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "mediator-pattern",
      "beginner",
      "intermediate"
    ],
    "explanation": "It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly. It reduces many-to-many relationships into one-to-many, improving code organization and reducing coupling.",
    "points": 10,
    "sampleAnswers": [
      "It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly.",
      "It reduces many-to-many relationships into one-to-many, improving code organization and reducing coupling."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly.",
        "isCorrect": true,
        "explanation": "It’s a behavioral design pattern that centralizes communication between objects instead of letting them reference each other directly. It reduces many-to-many relationships into one-to-many, improving code organization and reducing coupling."
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
    "id": "design-patterns-mediator-pattern-26",
    "title": "Mediator Pattern Analogy",
    "content": "Which analogy best describes the Mediator Pattern?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Behavioral Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.261Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "The correct answer is: An air traffic controller guiding planes so they don’t talk to each other directly",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "A librarian managing which books readers can borrow",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "An air traffic controller guiding planes so they don’t talk to each other directly",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "A teacher grading exams",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "d",
        "text": "A vending machine dispensing products",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-mediator-pattern-27",
    "title": "Chatroom Example",
    "content": "In the following code, how does the User class send messages?\n\n<pre><code>class User {\n  constructor(name, chatroom) {\n    this.name = name;\n    this.chatroom = chatroom;\n  }\n\n  send(message) {\n    this.chatroom.logMessage(this, message);\n  }\n}</code></pre>\n",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Behavioral Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.261Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "intermediate"
    ],
    "explanation": "The User calls the <code>send</code> method, which forwards the message to the mediator (<code>chatroom</code>) instead of directly to another user. The ChatRoom logs the message with the sender’s name and timestamp.",
    "points": 10,
    "sampleAnswers": [
      "The User calls the `send` method, which forwards the message to the mediator (`chatroom`) instead of directly to another user.",
      "The ChatRoom logs the message with the sender’s name and timestamp."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "The User calls the `send` method, which forwards the message to the mediator (`chatroom`) instead of directly to another user.",
        "isCorrect": true,
        "explanation": "The User calls the <code>send</code> method, which forwards the message to the mediator (<code>chatroom</code>) instead of directly to another user. The ChatRoom logs the message with the sender’s name and timestamp."
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

console.log(`✅ Added ${newQuestions.length} questions for Behavioral Patterns (Batch 1)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
