const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q85",
    "title": "What is internationalization (i18n) in frontend applications?",
    "content": "Explain the purpose of i18n and how it impacts frontend design.",
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
      "beginner"
    ],
    "explanation": "Internationalization (i18n) is the process of designing a frontend app to support multiple languages, locales, and cultural conventions without changing code.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Internationalization (i18n) is the process of designing a frontend app to support multiple languages, locales, and cultural conventions without changing code.",
        "isCorrect": true,
        "explanation": "Internationalization (i18n) is the process of designing a frontend app to support multiple languages, locales, and cultural conventions without changing code."
      },
      {
        "id": "o2",
        "text": "Internationalization (i18n) is the process of designing a frontend app to support multiple languages, locales, and cultural conventions without changing code",
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
    "id": "system-design-q86",
    "title": "What is the difference between i18n and l10n?",
    "content": "Compare internationalization and localization in frontend development.",
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
      "beginner"
    ],
    "explanation": "The correct answer is: i18n is the process of designing for multiple languages",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "i18n is the process of designing for multiple languages",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "l10n is the process of adapting content for a specific locale",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "i18n and l10n are the same",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q87",
    "title": "How do you handle right-to-left (RTL) languages in frontend apps?",
    "content": "Explain strategies for supporting RTL layouts and text.",
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
    "explanation": "Use CSS logical properties (<code>margin-inline-start</code>), direction attributes (<code>dir='rtl'</code>), mirrored layout components, and test with RTL content to ensure proper alignment.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use CSS logical properties (`margin-inline-start`), direction attributes (`dir='rtl'`), mirrored layout components, and test with RTL content to ensure proper alignment.",
        "isCorrect": true,
        "explanation": "Use CSS logical properties (`margin-inline-start`), direction attributes (`dir='rtl'`), mirrored layout components, and test with RTL content to ensure proper alignment."
      },
      {
        "id": "o2",
        "text": "Use CSS logical properties (`margin-inline-start`), direction attributes (`dir='rtl'`), mirrored layout components, and test with RTL content to ensure proper alignment",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 27)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
