const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q20",
    "title": "What are micro-frontends and when would you use them?",
    "content": "Explain the concept of micro-frontends and their trade-offs.",
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
    "explanation": "Micro-frontends split the UI into smaller, independently deployable apps. They improve scalability but increase complexity.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Micro-frontends allow independent teams to build and deploy parts of the UI",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Micro-frontends always simplify performance optimization",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "They increase architectural complexity",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q21",
    "title": "What is the difference between Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Static Site Generation (SSG)?",
    "content": "Compare CSR, SSR, and SSG in terms of performance, SEO, and user experience.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Rendering Strategies",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-08T00:00:00Z",
    "updatedAt": "2025-10-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "rendering-strategies",
      "intermediate"
    ],
    "explanation": "CSR is good for highly interactive apps, SSR helps SEO-driven apps like e-commerce, and SSG is ideal for blogs, docs, and marketing sites.",
    "points": 10,
    "options": [
      {
        "id": "1",
        "text": "CSR loads JavaScript first and renders in the browser; SSR renders HTML on the server per request; SSG pre-renders HTML at build time.",
        "isCorrect": true,
        "explanation": "CSR delays first render but enables rich interactivity; SSR improves SEO and first load but adds server cost; SSG is best for static content with CDN delivery."
      },
      {
        "id": "2",
        "text": "CSR is faster than SSR in all cases.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "3",
        "text": "SSG cannot be cached on CDN.",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q22",
    "title": "What are frontend caching strategies?",
    "content": "Discuss strategies like browser cache, CDN cache, service workers, and caching APIs.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Caching",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-08T00:00:00Z",
    "updatedAt": "2025-10-08T00:00:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "caching",
      "intermediate"
    ],
    "explanation": "Caching reduces redundant network requests and speeds up page loads. Browser caching handles static assets, CDN caching distributes content closer to users, and service workers enable offline support.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Caching reduces redundant network requests and speeds up page loads. Browser caching handles static assets, CDN caching distributes content closer to users, and service workers enable offline support.",
        "isCorrect": true,
        "explanation": "Caching reduces redundant network requests and speeds up page loads. Browser caching handles static assets, CDN caching distributes content closer to users, and service workers enable offline support."
      },
      {
        "id": "o2",
        "text": "Caching reduces redundant network requests and speeds up page loads",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Browser caching handles static assets, CDN caching distributes content closer to users, and service workers enable offline support",
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
    "hints": [
      "Think of caching at multiple layers: browser, CDN, service worker."
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 6)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
