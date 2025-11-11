const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-senior-13",
    "title": "How would you design a frontend form validation and submission system?",
    "content": "You have complex forms with nested fields and conditional validation. How would you architect this?",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-11-11T20:11:00.309Z",
    "updatedAt": "2025-11-11T20:11:00.309Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "senior",
      "intermediate"
    ],
    "explanation": "Form libraries handle state management. Schema validation ensures data integrity. Async validation checks server-side rules. Field-level errors improve UX. Optimistic submission provides instant feedback.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use form library (React Hook Form, Formik), implement schema validation (Yup, Zod), handle async validation, provide field-level and form-level errors, and implement optimistic submission",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Validate only on submit",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only HTML5 validation",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "No validation needed",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider system design principles and scalability",
      "Think about performance and user experience",
      "Review frontend architecture patterns"
    ],
    "metadata": {}
  },
  {
    "id": "system-design-senior-14",
    "title": "How do you design a frontend notification system?",
    "content": "Your app needs to show real-time notifications to users. How would you architect this?",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-11-11T20:11:00.309Z",
    "updatedAt": "2025-11-11T20:11:00.309Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "senior",
      "intermediate"
    ],
    "explanation": "WebSocket/SSE enable real-time delivery. Notification queue manages display order. Browser API enables system notifications. Notification center provides history. Persistence ensures notifications survive page reloads.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use WebSocket/SSE for real-time delivery, implement notification queue, use browser notifications API, provide notification center, and handle notification persistence",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Poll server every second",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Show all notifications at once",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "No notifications needed",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider system design principles and scalability",
      "Think about performance and user experience",
      "Review frontend architecture patterns"
    ],
    "metadata": {}
  },
  {
    "id": "system-design-senior-15",
    "title": "How would you design a frontend analytics and tracking system?",
    "content": "You need to track user behavior and business metrics. How would you implement analytics?",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-11-11T20:11:00.309Z",
    "updatedAt": "2025-11-11T20:11:00.309Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "senior",
      "intermediate"
    ],
    "explanation": "Analytics platforms provide tracking infrastructure. Event tracking captures user actions. Data layer pattern decouples tracking. Privacy compliance is required. Batching reduces network overhead.",
    "points": 15,
    "options": [
      {
        "id": "o1",
        "text": "Use analytics platform (Google Analytics, Mixpanel), implement event tracking, use data layer pattern, respect user privacy (GDPR), and batch events to reduce overhead",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Track everything without batching",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Use only page views",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "No analytics needed",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [
      "Consider system design principles and scalability",
      "Think about performance and user experience",
      "Review frontend architecture patterns"
    ],
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 56)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
