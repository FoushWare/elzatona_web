const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q43",
    "title": "What are different approaches for pagination and which is better?",
    "content": "Compare offset-based, cursor-based, and infinite scroll pagination in frontend apps.",
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
    "explanation": "Offset-based pagination is simple but can have duplicates on fast-changing data. Cursor-based is more reliable for real-time feeds. Infinite scroll is UX dependent.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Offset-based: simple, can have duplicates",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Cursor-based: more reliable for dynamic data",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Infinite scroll: UX-friendly but can be tricky to manage state",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "All approaches are identical in performance",
        "isCorrect": false,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "system-design-q44",
    "title": "How do you optimize image loading in frontend apps?",
    "content": "Explain techniques like WebP format, responsive images, lazy loading, and CDN caching.",
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
    "explanation": "Use modern formats like WebP, serve different resolutions with <code>srcset</code>, lazy load offscreen images, compress images, and cache via CDN.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use modern formats like WebP, serve different resolutions with `srcset`, lazy load offscreen images, compress images, and cache via CDN.",
        "isCorrect": true,
        "explanation": "Use modern formats like WebP, serve different resolutions with `srcset`, lazy load offscreen images, compress images, and cache via CDN."
      },
      {
        "id": "o2",
        "text": "Use modern formats like WebP, serve different resolutions with `srcset`, lazy load offscreen images, compress images, and cache via CDN",
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
    "id": "system-design-q45",
    "title": "How do you improve rendering performance for large lists?",
    "content": "Discuss techniques like windowing, virtualization, and memoization for list rendering.",
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
    "explanation": "Use libraries like react-window or react-virtualized to render only visible items, memoize list items to avoid unnecessary re-renders, and paginate data if possible.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Use libraries like react-window or react-virtualized to render only visible items, memoize list items to avoid unnecessary re-renders, and paginate data if possible.",
        "isCorrect": true,
        "explanation": "Use libraries like react-window or react-virtualized to render only visible items, memoize list items to avoid unnecessary re-renders, and paginate data if possible."
      },
      {
        "id": "o2",
        "text": "Use libraries like react-window or react-virtualized to render only visible items, memoize list items to avoid unnecessary re-renders, and paginate data if possible",
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 13)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
