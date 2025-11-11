const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q55",
    "title": "How do you structure a component dependency graph from a Figma design?",
    "content": "Describe the process of identifying components and their hierarchy from design files.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "advanced"
    ],
    "explanation": "Analyze the design, identify repeated patterns, break down UI into smallest reusable components, map dependencies, and visualize parent-child relationships in a graph.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Analyze the design, identify repeated patterns, break down UI into smallest reusable components, map dependencies, and visualize parent-child relationships in a graph.",
        "isCorrect": true,
        "explanation": "Analyze the design, identify repeated patterns, break down UI into smallest reusable components, map dependencies, and visualize parent-child relationships in a graph."
      },
      {
        "id": "o2",
        "text": "Analyze the design, identify repeated patterns, break down UI into smallest reusable components, map dependencies, and visualize parent-child relationships in a graph",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "This method prioritizes user experience and maintainability.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is incorrect. Please refer to system design best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q56",
    "title": "What are the best practices for designing reusable UI components?",
    "content": "Discuss principles for making components modular and reusable.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "intermediate"
    ],
    "explanation": "Keep components focused on a single responsibility, accept props for configuration, avoid hardcoding styles or behavior, and make them testable and composable.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Keep components focused on a single responsibility, accept props for configuration, avoid hardcoding styles or behavior, and make them testable and composable.",
        "isCorrect": true,
        "explanation": "Keep components focused on a single responsibility, accept props for configuration, avoid hardcoding styles or behavior, and make them testable and composable."
      },
      {
        "id": "o2",
        "text": "Keep components focused on a single responsibility, accept props for configuration, avoid hardcoding styles or behavior, and make them testable and composable",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "This method prioritizes user experience and maintainability.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is incorrect. Please refer to system design best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q57",
    "title": "What is the difference between REST and GraphQL when designing frontend APIs?",
    "content": "Explain how each API style affects data fetching, over-fetching, and frontend flexibility.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-01-08T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "intermediate"
    ],
    "explanation": "The correct answer is: REST endpoints return fixed data structures",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "REST endpoints return fixed data structures",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "GraphQL allows querying only required fields",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "GraphQL eliminates the need for pagination",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 17)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
