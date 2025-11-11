const fs = require('fs');
const path = require('path');

/**
 * Adds 3 more CSS Preprocessors questions (Batch 1)
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/css-questions.json');
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () => {
  const id = `css-05-css${String(questionCounter++).padStart(2, '0')}`;
  return id;
};

const createQuestion = (title, content, difficulty, tags, explanation, points, options, questionType = "multiple-choice") => {
  return {
    id: getQuestionId(),
    title,
    content,
    type: questionType,
    category: "CSS",
    topic: "Preprocessors",
    difficulty,
    learningCardId: "core-technologies",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin",
    updatedBy: "admin",
    tags,
    explanation,
    points,
    options,
    hints: [
      "Consider browser compatibility and modern CSS features",
      "Think about performance implications and best practices",
      "Remember that CSS affects both visual design and user experience"
    ],
    metadata: {}
  };
};

const newQuestions = [
  createQuestion(
    "Explain SASS/SCSS mixins vs functions. What are the differences and when should each be used?",
    "SASS provides mixins and functions. Explain the differences between mixins and functions and their use cases.",
    "intermediate",
    ["css", "preprocessors", "sass", "mixins", "functions", "intermediate"],
    "Mixins: generate CSS code blocks, can include properties, can take parameters, output CSS. Functions: return values, used in calculations, don't output CSS directly. Use mixins for reusable styles, functions for calculations.",
    15,
    [
      { id: "o1", text: "Mixins: generate CSS blocks; Functions: return values for calculations", isCorrect: true, explanation: "Correct. They serve different purposes." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They work differently." },
      { id: "o3", text: "Functions generate CSS", isCorrect: false, explanation: "Incorrect. Functions return values, not CSS." },
      { id: "o4", text: "Mixins are deprecated", isCorrect: false, explanation: "Incorrect. Mixins are still widely used." }
    ]
  ),
  createQuestion(
    "Which PostCSS plugins are commonly used in modern CSS workflows? (Select all that apply)",
    "PostCSS is a powerful CSS tool. Identify commonly used PostCSS plugins and their purposes.",
    "intermediate",
    ["css", "preprocessors", "postcss", "plugins", "intermediate"],
    "Common plugins: autoprefixer (adds vendor prefixes), cssnano (minification), postcss-preset-env (modern CSS), postcss-nested (nesting), postcss-import (imports). Essential for modern CSS workflows.",
    15,
    "multiple-select",
    [
      { id: "o1", text: "autoprefixer (vendor prefixes)", isCorrect: true, explanation: "Correct. autoprefixer is essential." },
      { id: "o2", text: "cssnano (minification)", isCorrect: true, explanation: "Correct. cssnano optimizes CSS." },
      { id: "o3", text: "postcss-preset-env (modern CSS)", isCorrect: true, explanation: "Correct. Enables modern CSS features." },
      { id: "o4", text: "jQuery (not a PostCSS plugin)", isCorrect: false, explanation: "Incorrect. jQuery is a JavaScript library." }
    ]
  ),
  createQuestion(
    "What is the purpose of SASS '@extend' directive? What are its advantages and potential issues?",
    "SASS @extend enables selector inheritance. Explain @extend, its benefits, and common pitfalls.",
    "difficult",
    ["css", "preprocessors", "sass", "extend", "difficult"],
    "@extend: shares styles between selectors, creates selector groups. Advantages: DRY, maintains relationships. Issues: can create large selector groups, specificity issues, harder to debug. Use mixins for better control.",
    20,
    [
      { id: "o1", text: "Shares styles between selectors; can create large selector groups; use mixins for better control", isCorrect: true, explanation: "Correct. @extend has trade-offs." },
      { id: "o2", text: "Always better than mixins", isCorrect: false, explanation: "Incorrect. Mixins often provide better control." },
      { id: "o3", text: "Only works with JavaScript", isCorrect: false, explanation: "Incorrect. @extend is SASS feature." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. @extend is still valid but use carefully." }
    ]
  )
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(`✅ Added ${newQuestions.length} Preprocessors questions (Batch 1)`);
console.log(`📊 Total CSS questions: ${existingQuestions.length}`);


