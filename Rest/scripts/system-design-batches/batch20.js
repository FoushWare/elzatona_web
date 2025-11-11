const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q64",
    "title": "How do you profile rendering performance in a React app?",
    "content": "Discuss tools and techniques for identifying re-render bottlenecks.",
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
    "explanation": "Use React DevTools Profiler to measure component render times, identify unnecessary renders, optimize with memoization, lazy loading, and virtualization.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use React DevTools Profiler to measure component render times, identify unnecessary renders, optimize with memoization, lazy loading, and virtualization.",
        "isCorrect": true,
        "explanation": "Use React DevTools Profiler to measure component render times, identify unnecessary renders, optimize with memoization, lazy loading, and virtualization."
      },
      {
        "id": "o2",
        "text": "Use React DevTools Profiler to measure component render times, identify unnecessary renders, optimize with memoization, lazy loading, and virtualization",
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
    "id": "system-design-q65",
    "title": "What are Lighthouse audits and how do they help in frontend system design?",
    "content": "Explain the purpose of Lighthouse and its reports for performance and accessibility.",
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
    "explanation": "Lighthouse audits provide automated reports for performance, accessibility, best practices, SEO, and PWA compliance, helping developers optimize their apps.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Lighthouse audits provide automated reports for performance, accessibility, best practices, SEO, and PWA compliance, helping developers optimize their apps.",
        "isCorrect": true,
        "explanation": "Lighthouse audits provide automated reports for performance, accessibility, best practices, SEO, and PWA compliance, helping developers optimize their apps."
      },
      {
        "id": "o2",
        "text": "Lighthouse audits provide automated reports for performance, accessibility, best practices, SEO, and PWA compliance, helping developers optimize their apps",
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
    "id": "system-design-q66",
    "title": "How do you monitor accessibility issues in a frontend application?",
    "content": "Describe tools and methods to detect and fix a11y problems.",
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
    "explanation": "Use tools like Axe, Lighthouse, WAVE, or browser extensions to audit accessibility, detect color contrast issues, missing ARIA labels, and keyboard navigation problems.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use tools like Axe, Lighthouse, WAVE, or browser extensions to audit accessibility, detect color contrast issues, missing ARIA labels, and keyboard navigation problems.",
        "isCorrect": true,
        "explanation": "Use tools like Axe, Lighthouse, WAVE, or browser extensions to audit accessibility, detect color contrast issues, missing ARIA labels, and keyboard navigation problems."
      },
      {
        "id": "o2",
        "text": "Use tools like Axe, Lighthouse, WAVE, or browser extensions to audit accessibility, detect color contrast issues, missing ARIA labels, and keyboard navigation problems",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 20)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
