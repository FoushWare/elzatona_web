const fs = require('fs');
const path = require('path');

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () =>
  `css-05-css${String(questionCounter++).padStart(2, '0')}`;

const createQuestion = (
  title,
  content,
  difficulty,
  tags,
  explanation,
  points,
  options,
  questionType = 'multiple-choice'
) => ({
  id: getQuestionId(),
  title,
  content,
  type: questionType,
  category: 'CSS',
  topic: 'Preprocessors',
  difficulty,
  learningCardId: 'core-technologies',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  createdBy: 'admin',
  updatedBy: 'admin',
  tags,
  explanation,
  points,
  options,
  hints: [
    'Consider browser compatibility',
    'Think about performance',
    'Remember maintainability',
  ],
  metadata: {},
});

const newQuestions = [
  createQuestion(
    'Explain SASS partials and @import. How do they improve code organization?',
    'SASS partials enable modular CSS. Explain partials, @import, and how they organize code.',
    'intermediate',
    ['css', 'preprocessors', 'sass', 'partials', 'import', 'intermediate'],
    'Partials: files starting with _ (e.g., _variables.scss). @import includes partials, combines into single CSS. Enables modular organization, reusability. Modern: use @use/@forward instead of @import.',
    15,
    [
      {
        id: 'o1',
        text: 'Partials: _filename.scss; @import includes them; enables modular organization',
        isCorrect: true,
        explanation: 'Correct. Partials improve organization.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. Partials are special imports.',
      },
      {
        id: 'o3',
        text: 'Only work with JavaScript',
        isCorrect: false,
        explanation: 'Incorrect. Partials are SASS feature.',
      },
      {
        id: 'o4',
        text: 'Are deprecated',
        isCorrect: false,
        explanation: 'Incorrect. Still used, though @use is preferred.',
      },
    ]
  ),
  createQuestion(
    'What is the difference between SASS @use and @import? When should each be used?',
    'SASS @use is modern replacement for @import. Explain differences and migration considerations.',
    'difficult',
    ['css', 'preprocessors', 'sass', 'use', 'import', 'difficult'],
    '@use: modern module system, namespaced, loaded once. @import: legacy, global scope, can cause duplicates. @use prevents conflicts, better performance. Migrate from @import to @use for new code.',
    20,
    [
      {
        id: 'o1',
        text: '@use: modern, namespaced, loaded once; @import: legacy, global, can duplicate; prefer @use',
        isCorrect: true,
        explanation: 'Correct. @use is preferred.',
      },
      {
        id: 'o2',
        text: 'They are identical',
        isCorrect: false,
        explanation: 'Incorrect. @use is improved version.',
      },
      {
        id: 'o3',
        text: '@import is always better',
        isCorrect: false,
        explanation: 'Incorrect. @use is preferred.',
      },
      {
        id: 'o4',
        text: 'Both are deprecated',
        isCorrect: false,
        explanation: 'Incorrect. @use is modern standard.',
      },
    ]
  ),
  createQuestion(
    'Which PostCSS features enable modern CSS syntax in older browsers? (Select all that apply)',
    'PostCSS can transform modern CSS. Identify features that enable modern syntax support.',
    'intermediate',
    ['css', 'preprocessors', 'postcss', 'transforms', 'intermediate'],
    'postcss-preset-env: enables modern CSS (custom properties, nesting, etc.). autoprefixer: adds vendor prefixes. cssnano: minifies. These enable modern syntax with fallbacks.',
    15,
    'multiple-select',
    [
      {
        id: 'o1',
        text: 'postcss-preset-env (modern CSS features)',
        isCorrect: true,
        explanation: 'Correct. Enables modern CSS.',
      },
      {
        id: 'o2',
        text: 'autoprefixer (vendor prefixes)',
        isCorrect: true,
        explanation: 'Correct. Adds compatibility.',
      },
      {
        id: 'o3',
        text: 'cssnano (minification, not syntax)',
        isCorrect: false,
        explanation: "Incorrect. cssnano minifies, doesn't transform syntax.",
      },
      {
        id: 'o4',
        text: 'jQuery (not PostCSS)',
        isCorrect: false,
        explanation: 'Incorrect. jQuery is JavaScript library.',
      },
    ]
  ),
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));
console.log(
  `✅ Added ${newQuestions.length} Preprocessors questions (Batch 2)`
);
console.log(`📊 Total: ${existingQuestions.length} questions`);
