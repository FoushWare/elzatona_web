const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/system-design-questions.json');

const newQuestions = [
  {
    "id": "system-design-q158",
    "title": "How can you speed up test suites in CI?",
    "content": "Discuss techniques such as test parallelization, caching node_modules, test sharding, and running only affected tests.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "advanced",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-08T11:07:00Z",
    "updatedAt": "2025-10-08T11:07:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "advanced"
    ],
    "explanation": "Speedups: enable CI caching for dependencies, run tests in parallel across workers, shard E2E tests by test suites, run only affected tests using changed-file detection, and use lightweight mocked E2E for quick smoke.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Speedups: enable CI caching for dependencies, run tests in parallel across workers, shard E2E tests by test suites, run only affected tests using changed-file detection, and use lightweight mocked E2E...",
        "isCorrect": true,
        "explanation": "Speedups: enable CI caching for dependencies, run tests in parallel across workers, shard E2E tests by test suites, run only affected tests using changed-file detection, and use lightweight mocked E2E for quick smoke."
      },
      {
        "id": "o2",
        "text": "Speedups: enable CI caching for dependencies, run tests in parallel across workers, shard E2E tests by test suites, run only affected tests using changed-file detection, and use lightweight mocked E2E for quick smoke",
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
    "id": "system-design-q159",
    "title": "What is visual regression testing and when should you use it?",
    "content": "Explain visual regression testing and tools for it (Percy, Chromatic, Playwright snapshot).",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-08T11:08:00Z",
    "updatedAt": "2025-10-08T11:08:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "intermediate"
    ],
    "explanation": "Visual regression testing captures UI screenshots and compares diffs to detect unintended UI changes. Use for design-critical components, theming changes, or when CSS changes might break layouts.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Visual regression testing captures UI screenshots and compares diffs to detect unintended UI changes. Use for design-critical components, theming changes, or when CSS changes might break layouts.",
        "isCorrect": true,
        "explanation": "Visual regression testing captures UI screenshots and compares diffs to detect unintended UI changes. Use for design-critical components, theming changes, or when CSS changes might break layouts."
      },
      {
        "id": "o2",
        "text": "Visual regression testing captures UI screenshots and compares diffs to detect unintended UI changes",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": " Use for design-critical components, theming changes, or when CSS changes might break layouts",
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
    "id": "system-design-q160",
    "title": "How do you enforce quality gates in CI and integrate them with code review?",
    "content": "Describe quality gates like test coverage thresholds, linting, security scans, and how to integrate results into pull requests and CI protections.",
    "type": "multiple-choice",
    "category": "System Design",
    "topic": "Frontend System Design",
    "difficulty": "intermediate",
    "learningCardId": "system-design",
    "isActive": true,
    "createdAt": "2025-10-08T11:09:00Z",
    "updatedAt": "2025-10-08T11:09:00Z",
    "createdBy": "admin",
    "updatedBy": "admin",
    "tags": [
      "system-design",
      "frontend-system-design",
      "intermediate"
    ],
    "explanation": "Quality gates ensure that only PRs meeting minimum quality metrics are merged; surface results in PRs for reviewer context.",
    "points": 10,
    "options": [
      {
        "id": "o1",
        "text": "Fail CI build on critical lint or test failures",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o2",
        "text": "Block merge unless coverage meets threshold (e.g., >80%)",
        "isCorrect": true,
        "explanation": ""
      },
      {
        "id": "o3",
        "text": "Ignore E2E failures permanently",
        "isCorrect": false,
        "explanation": ""
      },
      {
        "id": "o4",
        "text": "Publish test reports and comments on PR for visibility",
        "isCorrect": true,
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

console.log(`✅ Added ${newQuestions.length} system design questions (Batch 51)`);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
