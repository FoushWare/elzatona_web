const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q31",
    "title": "What is color contrast and how does it affect accessibility?",
    "content": "Explain the importance of sufficient color contrast in frontend UI design.",
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
    "explanation": "Color contrast ensures that text and UI elements are distinguishable for users with visual impairments. WCAG recommends a minimum contrast ratio of 4.5:1 for normal text.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Color contrast ensures that text and UI elements are distinguishable for users with visual impairments. WCAG recommends a minimum contrast ratio of 4.5:1 for normal text.",
        "isCorrect": true,
        "explanation": "Color contrast ensures that text and UI elements are distinguishable for users with visual impairments. WCAG recommends a minimum contrast ratio of 4.5:1 for normal text."
      },
      {
        "id": "o2",
        "text": "Color contrast ensures that text and UI elements are distinguishable for users with visual impairments",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " WCAG recommends a minimum contrast ratio of 4",
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
    "id": "system-design-q32",
    "title": "How can you ensure keyboard navigability for custom components?",
    "content": "Describe best practices to make interactive components accessible via keyboard.",
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
    "explanation": "Ensure focusable elements have <code>tabindex</code>, use <code>aria</code> attributes correctly, manage focus order for dialogs/modals, and provide keyboard shortcuts where necessary.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Ensure focusable elements have `tabindex`, use `aria` attributes correctly, manage focus order for dialogs/modals, and provide keyboard shortcuts where necessary.",
        "isCorrect": true,
        "explanation": "Ensure focusable elements have `tabindex`, use `aria` attributes correctly, manage focus order for dialogs/modals, and provide keyboard shortcuts where necessary."
      },
      {
        "id": "o2",
        "text": "Ensure focusable elements have `tabindex`, use `aria` attributes correctly, manage focus order for dialogs/modals, and provide keyboard shortcuts where necessary",
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
    "id": "system-design-q33",
    "title": "What is an optimistic update in frontend state management?",
    "content": "Explain optimistic updates and when they are used.",
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
    "explanation": "Optimistic updates immediately update the UI assuming the server request will succeed. If the request fails, the UI is reverted. It improves perceived responsiveness.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Optimistic updates immediately update the UI assuming the server request will succeed. If the request fails, the UI is reverted. It improves perceived responsiveness.",
        "isCorrect": true,
        "explanation": "Optimistic updates immediately update the UI assuming the server request will succeed. If the request fails, the UI is reverted. It improves perceived responsiveness."
      },
      {
        "id": "o2",
        "text": "Optimistic updates immediately update the UI assuming the server request will succeed",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " If the request fails, the UI is reverted",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 9)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
