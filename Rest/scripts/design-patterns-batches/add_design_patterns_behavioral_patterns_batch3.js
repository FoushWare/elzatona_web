const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-mediator-pattern-31",
    "title": "Mediator vs Observer",
    "content": "How does the Mediator Pattern differ from the Observer Pattern?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Behavioral Patterns",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.205Z",
    "updatedAt": "2025-11-11T18:36:58.261Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "advanced",
      "advanced"
    ],
    "explanation": "Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants. Mediator reduces direct object references, Observer reduces direct polling.",
    "points": 10,
    "sampleAnswers": [
      "Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants.",
      "Mediator reduces direct object references, Observer reduces direct polling."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants.",
        "isCorrect": true,
        "explanation": "Observer Pattern is event-driven, where subscribers listen to changes. Mediator centralizes interactions by routing communication between participants. Mediator reduces direct object references, Observer reduces direct polling."
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
    "id": "design-patterns-mediator-pattern-32",
    "title": "Debugging Middleware Flow",
    "content": "Given this Express code:\n\n<pre><code>app.use(\n  \"/\",\n  (req, res, next) =&gt; {\n    req.headers[\"test-header\"] = 1234;\n    next();\n  },\n  (req, res, next) =&gt; {\n    console.log(<code>Request has test header: ${!!req.headers[\"test-header\"]}</code>);\n    next();\n  }\n);</code></pre>\nWhat will the second middleware log?",
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
    "explanation": "The correct answer is: Request has test header: true",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Request has test header: false",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "Request has test header: true",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "Request has test header: undefined",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-observer-pattern-49",
    "title": "Definition of Observer Pattern",
    "content": "What is the Observer Pattern and why is it useful in JavaScript applications?",
    "type": "multiple-choice",
    "category": "Design Patterns",
    "topic": "Behavioral Patterns",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-15T00:47:17.207Z",
    "updatedAt": "2025-11-11T18:36:58.271Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "design-patterns",
      "general-design-patterns",
      "beginner",
      "intermediate"
    ],
    "explanation": "The Observer Pattern allows objects (observers) to subscribe to another object (observable) so they get notified when events occur. It’s useful because it enables decoupling and supports event-driven programming.",
    "points": 10,
    "sampleAnswers": [
      "The Observer Pattern allows objects (observers) to subscribe to another object (observable) so they get notified when events occur.",
      "It’s useful because it enables decoupling and supports event-driven programming."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "The Observer Pattern allows objects (observers) to subscribe to another object (observable) so they get notified when events occur.",
        "isCorrect": true,
        "explanation": "The Observer Pattern allows objects (observers) to subscribe to another object (observable) so they get notified when events occur. It’s useful because it enables decoupling and supports event-driven programming."
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

console.log(`✅ Added ${newQuestions.length} questions for Behavioral Patterns (Batch 3)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
