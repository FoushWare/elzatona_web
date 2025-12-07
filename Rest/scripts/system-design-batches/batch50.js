const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../../final-questions-v01/system-design-questions.json'
);

const newQuestions = [
  {
    id: 'system-design-q155',
    title: 'What causes flaky tests and how do you fix them?',
    content:
      'Explain common causes of flaky tests (timing, network, order dependency) and strategies to make tests reliable.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'advanced',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-08T11:04:00Z',
    updatedAt: '2025-10-08T11:04:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'advanced'],
    explanation:
      'Flakiness can be caused by race conditions, unstable selectors, reliance on real network, or shared state. Fix by using stable selectors, mock network calls, add deterministic waits or better synchronization, isolate tests, and reset environment between runs.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Flakiness can be caused by race conditions, unstable selectors, reliance on real network, or shared state. Fix by using stable selectors, mock network calls, add deterministic waits or better synchron...',
        isCorrect: true,
        explanation:
          'Flakiness can be caused by race conditions, unstable selectors, reliance on real network, or shared state. Fix by using stable selectors, mock network calls, add deterministic waits or better synchronization, isolate tests, and reset environment between runs.',
      },
      {
        id: 'o2',
        text: 'Flakiness can be caused by race conditions, unstable selectors, reliance on real network, or shared state',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: ' Fix by using stable selectors, mock network calls, add deterministic waits or better synchronization, isolate tests, and reset environment between runs',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q156',
    title: 'Which checks should run locally vs in CI?',
    content:
      'Decide which tasks are suitable for local developer runs and which should be enforced in CI (lint, unit tests, integration, E2E, build).',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-08T11:05:00Z',
    updatedAt: '2025-10-08T11:05:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Developers should run fast checks locally; heavier/integration/E2E tests and release builds should run in CI.',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Run lint and unit tests locally before PR',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o2',
        text: 'Run full E2E suite in CI (not required for every local dev run)',
        isCorrect: true,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'Skip build step in CI',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'Run heavy integration tests only in CI pipelines',
        isCorrect: true,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
  {
    id: 'system-design-q157',
    title: 'How do you design a CI pipeline for a frontend app?',
    content:
      'Outline a typical CI pipeline stages for frontend: install, lint, unit tests, build, integration/E2E, artifact publish, and deploy.',
    type: 'multiple-choice',
    category: 'System Design',
    topic: 'Frontend System Design',
    difficulty: 'intermediate',
    learningCardId: 'system-design',
    isActive: true,
    createdAt: '2025-10-08T11:06:00Z',
    updatedAt: '2025-10-08T11:06:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: ['system-design', 'frontend-system-design', 'intermediate'],
    explanation:
      'Typical pipeline: checkout -> install deps -> lint -> unit tests -> build -> static analysis/security scan -> run integration/E2E in parallel -> publish artifacts -> deploy to staging -> run smoke tests -> promote to production with deployment strategy (canary/blue-green).',
    points: 10,
    options: [
      {
        id: 'o1',
        text: 'Typical pipeline: checkout -> install deps -> lint -> unit tests -> build -> static analysis/security scan -> run integration/E2E in parallel -> publish artifacts -> deploy to staging -> run smoke tes...',
        isCorrect: true,
        explanation:
          'Typical pipeline: checkout -> install deps -> lint -> unit tests -> build -> static analysis/security scan -> run integration/E2E in parallel -> publish artifacts -> deploy to staging -> run smoke tests -> promote to production with deployment strategy (canary/blue-green).',
      },
      {
        id: 'o2',
        text: 'Typical pipeline: checkout -> install deps -> lint -> unit tests -> build -> static analysis/security scan -> run integration/E2E in parallel -> publish artifacts -> deploy to staging -> run smoke tests -> promote to production with deployment strategy (canary/blue-green)',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o3',
        text: 'This method prioritizes user experience and maintainability.',
        isCorrect: false,
        explanation: '',
      },
      {
        id: 'o4',
        text: 'This is incorrect. Please refer to system design best practices.',
        isCorrect: false,
        explanation: '',
      },
    ],
    hints: [],
    metadata: {},
  },
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

console.log(
  `✅ Added ${newQuestions.length} system design questions (Batch 50)`
);
console.log(`📝 Total System Design questions: ${existingQuestions.length}`);
