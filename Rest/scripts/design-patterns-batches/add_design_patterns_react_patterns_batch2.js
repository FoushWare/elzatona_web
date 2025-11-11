const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/design-patterns-questions.json');

const newQuestions = [
  {
    "id": "design-patterns-provider-pattern-64",
    "title": "Provider Pattern Code",
    "content": "What will be rendered by the Header component in this example?\n\n<pre><code>const DataContext = React.createContext();\n\nfunction App() {\n  const data = { title: 'Hello Provider' };\n  return (\n    &lt;DataContext.Provider value={data}&gt;\n      &lt;Header /&gt;\n    &lt;/DataContext.Provider&gt;\n  );\n}\n\nfunction Header() {\n  const data = React.useContext(DataContext);\n  return &lt;h1&gt;{data.title}&lt;/h1&gt;;\n}</code></pre>",
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
    "explanation": "The correct answer is: h1 with text 'Hello Provider'",
    "points": 10,
    "options": [
      {
        "id": "a",
        "text": "Nothing, React throws an error",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "b",
        "text": "h1 with text 'Hello Provider'",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "c",
        "text": "h1 with text 'undefined'",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "design-patterns-provider-pattern-65",
    "title": "Performance Concern",
    "content": "What is a potential downside of overusing the Provider Pattern?",
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
    "explanation": "All components consuming the context re-render whenever the value changes, which can hurt performance in large apps. It can cause unnecessary re-renders if too much state is stored in a single provider.",
    "points": 10,
    "sampleAnswers": [
      "All components consuming the context re-render whenever the value changes, which can hurt performance in large apps.",
      "It can cause unnecessary re-renders if too much state is stored in a single provider."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "All components consuming the context re-render whenever the value changes, which can hurt performance in large apps.",
        "isCorrect": true,
        "explanation": "All components consuming the context re-render whenever the value changes, which can hurt performance in large apps. It can cause unnecessary re-renders if too much state is stored in a single provider."
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
    "id": "design-patterns-provider-pattern-66",
    "title": "Theme Provider Use Case",
    "content": "Why is the Provider Pattern a good fit for managing application themes (dark/light mode)?",
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
      "beginner",
      "intermediate"
    ],
    "explanation": "Because many components need access to the theme, and the Provider allows sharing it globally without prop drilling. It centralizes theme state and makes it easy to toggle or update across the entire app.",
    "points": 10,
    "sampleAnswers": [
      "Because many components need access to the theme, and the Provider allows sharing it globally without prop drilling.",
      "It centralizes theme state and makes it easy to toggle or update across the entire app."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Because many components need access to the theme, and the Provider allows sharing it globally without prop drilling.",
        "isCorrect": true,
        "explanation": "Because many components need access to the theme, and the Provider allows sharing it globally without prop drilling. It centralizes theme state and makes it easy to toggle or update across the entire app."
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

console.log(`✅ Added ${newQuestions.length} questions for React Patterns (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
