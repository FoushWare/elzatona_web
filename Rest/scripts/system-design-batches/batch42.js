const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q130",
    "title": "What is progressive rollout in frontend deployments?",
    "content": "Describe progressive rollout strategy in frontend apps.",
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
    "explanation": "Progressive rollout gradually releases new features to specific user groups, regions, or percentages of traffic. It minimizes risk and enables monitoring of issues before full release.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Progressive rollout gradually releases new features to specific user groups, regions, or percentages of traffic. It minimizes risk and enables monitoring of issues before full release.",
        "isCorrect": true,
        "explanation": "Progressive rollout gradually releases new features to specific user groups, regions, or percentages of traffic. It minimizes risk and enables monitoring of issues before full release."
      },
      {
        "id": "o2",
        "text": "Progressive rollout gradually releases new features to specific user groups, regions, or percentages of traffic",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " It minimizes risk and enables monitoring of issues before full release",
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
    "id": "system-design-q131",
    "title": "What is frontend observability and why is it important?",
    "content": "Explain what observability means for frontend applications and how it differs from backend observability.",
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
    "explanation": "Frontend observability provides insights into client-side performance, errors, and user interactions. It's important for detecting issues that backend monitoring cannot catch, like slow rendering or script errors in browsers.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Frontend observability provides insights into client-side performance, errors, and user interactions. It's important for detecting issues that backend monitoring cannot catch, like slow rendering or s...",
        "isCorrect": true,
        "explanation": "Frontend observability provides insights into client-side performance, errors, and user interactions. It's important for detecting issues that backend monitoring cannot catch, like slow rendering or script errors in browsers."
      },
      {
        "id": "o2",
        "text": "Frontend observability provides insights into client-side performance, errors, and user interactions",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " It's important for detecting issues that backend monitoring cannot catch, like slow rendering or script errors in browsers",
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
    "id": "system-design-q132",
    "title": "What are Real User Monitoring (RUM) tools?",
    "content": "Describe RUM and how it helps improve frontend system design.",
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
    "explanation": "RUM tools capture real user interactions, measuring page load time, errors, and responsiveness directly from user devices, giving true performance insights.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "RUM tools capture real user interactions, measuring page load time, errors, and responsiveness directly from user devices, giving true performance insights.",
        "isCorrect": true,
        "explanation": "RUM tools capture real user interactions, measuring page load time, errors, and responsiveness directly from user devices, giving true performance insights."
      },
      {
        "id": "o2",
        "text": "RUM tools capture real user interactions, measuring page load time, errors, and responsiveness directly from user devices, giving true performance insights",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 42)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
