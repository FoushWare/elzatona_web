const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../final-questions-v01/css-questions.json');
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () => `css-06-css${String(questionCounter++).padStart(2, '0')}`;

const createQuestion = (title, content, difficulty, tags, explanation, points, options, questionType = "multiple-choice") => ({
  id: getQuestionId(),
  title, content, type: questionType, category: "CSS", topic: "Performance", difficulty,
  learningCardId: "core-technologies", isActive: true,
  createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  createdBy: "admin", updatedBy: "admin", tags, explanation, points, options,
  hints: ["Consider browser compatibility", "Think about performance", "Remember optimization"],
  metadata: {}
});

const newQuestions = [
  createQuestion(
    "Explain critical CSS. How does it improve First Contentful Paint (FCP)?",
    "Critical CSS is above-the-fold CSS. Explain critical CSS extraction and its impact on FCP.",
    "intermediate", ["css", "performance", "critical-css", "fcp", "intermediate"],
    "Critical CSS: styles needed for above-the-fold content. Inline in <head>, load rest asynchronously. Improves FCP by reducing render-blocking CSS. Extract with tools, inline manually, or use loadCSS.",
    15,
    [
      { id: "o1", text: "Above-the-fold CSS; inline in <head>; improves FCP by reducing render-blocking", isCorrect: true, explanation: "Correct. Critical CSS improves initial render." },
      { id: "o2", text: "All CSS is critical", isCorrect: false, explanation: "Incorrect. Only above-fold is critical." },
      { id: "o3", text: "Slows down rendering", isCorrect: false, explanation: "Incorrect. It speeds up initial render." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. Critical CSS is best practice." }
    ]
  ),
  createQuestion(
    "Which CSS loading strategies improve performance? (Select all that apply)",
    "CSS loading affects performance. Identify strategies that optimize CSS delivery.",
    "intermediate", ["css", "performance", "loading", "strategies", "intermediate"],
    "Strategies: media attribute (load conditionally), preload (hint browser), async loading, critical CSS inline, split CSS files, remove unused CSS. All improve performance.",
    15,
    "multiple-select",
    [
      { id: "o1", text: "media attribute (conditional loading)", isCorrect: true, explanation: "Correct. Enables conditional loading." },
      { id: "o2", text: "preload (hint browser)", isCorrect: true, explanation: "Correct. Improves resource hints." },
      { id: "o3", text: "Critical CSS inline", isCorrect: true, explanation: "Correct. Reduces render-blocking." },
      { id: "o4", text: "Load all CSS synchronously (not optimal)", isCorrect: false, explanation: "Incorrect. Synchronous loading blocks render." }
    ]
  ),
  createQuestion(
    "What is the purpose of 'font-display' property? How does it affect text rendering performance?",
    "Font display controls font loading behavior. Explain font-display values and their impact on performance.",
    "difficult", ["css", "performance", "font-display", "typography", "difficult"],
    "font-display: auto (browser default), block (3s block, infinite swap), swap (immediate swap), fallback (100ms block, 3s swap), optional (100ms block, no swap). Controls FOIT/FOUT, affects CLS.",
    20,
    [
      { id: "o1", text: "Controls font loading: block/swap/fallback/optional; affects FOIT/FOUT and CLS", isCorrect: true, explanation: "Correct. font-display controls loading behavior." },
      { id: "o2", text: "Only affects visual appearance", isCorrect: false, explanation: "Incorrect. It affects performance metrics." },
      { id: "o3", text: "Slows down rendering", isCorrect: false, explanation: "Incorrect. Proper use improves performance." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. font-display is essential for performance." }
    ]
  )
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));
console.log(`✅ Added ${newQuestions.length} Performance questions (Batch 2)`);
console.log(`📊 Total: ${existingQuestions.length} questions`);


