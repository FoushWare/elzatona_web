const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/performance-patterns-questions.json');

const newQuestions = [
  {
    "id": "performance-patterns-bundle-splitting-pp4",
    "title": "Which performance metrics are most directly improved by Bundle Splitting?",
    "content": "Identify which performance metrics benefit most from applying bundle splitting.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Code Splitting",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.164Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "bundle-splitting",
      "intermediate"
    ],
    "explanation": "FCP, LCP, and TTI improve as less code needs to be parsed and executed before meaningful content appears.",
    "points": 10,
    "options": [
      {
        "id": "m1",
        "text": "First Contentful Paint (FCP)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "m2",
        "text": "Largest Contentful Paint (LCP)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "m3",
        "text": "Cumulative Layout Shift (CLS)",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "m4",
        "text": "Time To Interactive (TTI)",
        "isCorrect": true,
        "explanation": ""
      }
    ],
    "hints": [],
    "metadata": {}
  },
  {
    "id": "performance-patterns-bundle-splitting-pp5",
    "title": "What problem does Bundle Splitting aim to solve?",
    "content": "### Problem Description\nLarge bundles can delay the time it takes before the browser paints the first visible content and becomes interactive. Even unused code has to be downloaded and parsed before rendering.\n\n**Question:**\nWhat core issue does bundle splitting address in modern web applications?",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Code Splitting",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.164Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "bundle-splitting",
      "intermediate"
    ],
    "explanation": "Bundle splitting addresses slow load times caused by downloading and parsing large monolithic bundles that contain code not needed on initial render.",
    "points": 10,
    "sampleAnswers": [
      "Bundle splitting addresses slow load times caused by downloading and parsing large monolithic bundles that contain code not needed on initial render."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Bundle splitting addresses slow load times caused by downloading and parsing large monolithic bundles that contain code not needed on initial render.",
        "isCorrect": true,
        "explanation": "Bundle splitting addresses slow load times caused by downloading and parsing large monolithic bundles that contain code not needed on initial render."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review performance optimization concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider web performance best practices.",
        "isCorrect": false,
        "explanation": ""
      }
    ]
  },
  {
    "id": "performance-patterns-performance-1-pp7",
    "title": "How does Dynamic Import relate to Bundle Splitting?",
    "content": "### Dynamic Import\nDynamic imports allow us to load JavaScript modules only when needed rather than at initial load. This enables bundle splitting by creating separate chunks for on-demand code.\n\n**Example:**\n<pre><code>import('./EmojiPicker').then(module =&gt; {\n  const EmojiPicker = module.default;\n  render(&lt;EmojiPicker /&gt;);\n});</code></pre>\n\n**Question:**\nExplain how dynamic import statements contribute to bundle splitting and performance optimization.",
    "type": "multiple-choice",
    "category": "Performance Patterns",
    "topic": "Code Splitting",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-10T00:00:00.000Z",
    "updatedAt": "2025-11-11T18:50:32.225Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "performance-patterns",
      "dynamic-import",
      "advanced"
    ],
    "explanation": "Dynamic imports allow JavaScript modules to be fetched on demand, automatically creating separate bundles for lazy-loaded components and reducing initial load size.",
    "points": 10,
    "sampleAnswers": [
      "Dynamic imports allow JavaScript modules to be fetched on demand, automatically creating separate bundles for lazy-loaded components and reducing initial load size."
    ],
    "hints": [],
    "metadata": {},
    "options": [
      {
        "id": "o1",
        "text": "Dynamic imports allow JavaScript modules to be fetched on demand, automatically creating separate bundles for lazy-loaded components and reducing initial load size.",
        "isCorrect": true,
        "explanation": "Dynamic imports allow JavaScript modules to be fetched on demand, automatically creating separate bundles for lazy-loaded components and reducing initial load size."
      },
      {
        "id": "o2",
        "text": "This is not correct. Please refer to the explanation.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Incorrect. Review performance optimization concepts.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "This is a common misconception. The correct answer is different.",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o5",
        "text": "Not quite. Consider web performance best practices.",
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

console.log(`✅ Added ${newQuestions.length} questions for Code Splitting (Batch 2)`);
console.log(`📝 Total questions: ${existingQuestions.length}`);
