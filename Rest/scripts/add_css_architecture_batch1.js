const fs = require('fs');
const path = require('path');

/**
 * Adds 3 more CSS Architecture questions (Batch 1)
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/css-questions.json');
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () => {
  const id = `css-07-css${String(questionCounter++).padStart(2, '0')}`;
  return id;
};

const createQuestion = (title, content, difficulty, tags, explanation, points, options, questionType = "multiple-choice") => {
  return {
    id: getQuestionId(),
    title,
    content,
    type: questionType,
    category: "CSS",
    topic: "Architecture",
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
    "Explain ITCSS (Inverted Triangle CSS) architecture. What are its layers and principles?",
    "ITCSS is a CSS architecture methodology. Explain the inverted triangle structure and how it organizes CSS.",
    "intermediate",
    ["css", "architecture", "itcss", "methodology", "intermediate"],
    "ITCSS layers (bottom to top): Settings (variables), Tools (mixins), Generic (resets), Elements (base styles), Objects (layout), Components (UI), Utilities (helpers). Organizes CSS by specificity and reach. Prevents specificity conflicts.",
    15,
    [
      { id: "o1", text: "Layers: Settings → Tools → Generic → Elements → Objects → Components → Utilities; organizes by specificity", isCorrect: true, explanation: "Correct. ITCSS uses layered architecture." },
      { id: "o2", text: "Only one layer", isCorrect: false, explanation: "Incorrect. ITCSS has multiple layers." },
      { id: "o3", text: "Utilities come first", isCorrect: false, explanation: "Incorrect. Utilities are at the top." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. ITCSS is still used." }
    ]
  ),
  createQuestion(
    "Which CSS architecture methodologies emphasize component-based organization? (Select all that apply)",
    "Component-based CSS organization is common. Identify methodologies that focus on component structure.",
    "intermediate",
    ["css", "architecture", "components", "methodology", "intermediate"],
    "Component-based: BEM (Block Element Modifier), CSS Modules, Styled Components, CSS-in-JS. These organize CSS around components rather than pages. Better for component libraries, React/Vue apps.",
    15,
    "multiple-select",
    [
      { id: "o1", text: "BEM (Block Element Modifier)", isCorrect: true, explanation: "Correct. BEM is component-based." },
      { id: "o2", text: "CSS Modules", isCorrect: true, explanation: "Correct. CSS Modules are component-scoped." },
      { id: "o3", text: "OOCSS (object-oriented, not necessarily component-based)", isCorrect: false, explanation: "Incorrect. OOCSS focuses on objects, not components." },
      { id: "o4", text: "Utility-first (not component-based)", isCorrect: false, explanation: "Incorrect. Utility-first is different approach." }
    ]
  ),
  createQuestion(
    "What is the purpose of CSS design tokens? How do they improve maintainability and consistency?",
    "Design tokens standardize design values. Explain CSS custom properties as design tokens and their benefits.",
    "difficult",
    ["css", "architecture", "design-tokens", "custom-properties", "difficult"],
    "Design tokens: standardized design values (colors, spacing, typography). CSS custom properties enable tokens. Benefits: single source of truth, easy theming, consistency, maintainability. Use for colors, spacing, typography scales.",
    20,
    [
      { id: "o1", text: "Standardized design values; single source of truth; enables theming and consistency", isCorrect: true, explanation: "Correct. Design tokens improve maintainability." },
      { id: "o2", text: "Only for colors", isCorrect: false, explanation: "Incorrect. Tokens can be any design value." },
      { id: "o3", text: "Require JavaScript", isCorrect: false, explanation: "Incorrect. CSS custom properties work without JS." },
      { id: "o4", text: "Are deprecated", isCorrect: false, explanation: "Incorrect. Design tokens are modern best practice." }
    ]
  )
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(`✅ Added ${newQuestions.length} Architecture questions (Batch 1)`);
console.log(`📊 Total CSS questions: ${existingQuestions.length}`);


