const fs = require('fs');
const path = require('path');

/**
 * Adds 3 more CSS Performance questions (Batch 1)
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/css-questions.json');
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () => {
  const id = `css-06-css${String(questionCounter++).padStart(2, '0')}`;
  return id;
};

const createQuestion = (title, content, difficulty, tags, explanation, points, options, questionType = "multiple-choice") => {
  return {
    id: getQuestionId(),
    title,
    content,
    type: questionType,
    category: "CSS",
    topic: "Performance",
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
    "Explain CSS 'contain' property. How does it improve rendering performance?",
    "CSS containment enables performance optimizations. Explain the contain property and its performance benefits.",
    "intermediate",
    ["css", "performance", "contain", "rendering", "intermediate"],
    "contain: layout (isolates layout), paint (isolates paint), size (size depends only on self), style (isolates counters). Enables browser optimizations: skip layout/paint for contained elements, improves performance.",
    15,
    [
      { id: "o1", text: "Isolates layout/paint/size; enables browser optimizations; improves rendering performance", isCorrect: true, explanation: "Correct. contain enables performance optimizations." },
      { id: "o2", text: "Only affects visual appearance", isCorrect: false, explanation: "Incorrect. contain affects rendering performance." },
      { id: "o3", text: "Slows down rendering", isCorrect: false, explanation: "Incorrect. contain improves performance." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. contain is a modern performance feature." }
    ]
  ),
  createQuestion(
    "Which CSS properties trigger layout reflow? (Select all that apply)",
    "Layout reflow is expensive. Identify CSS properties that trigger layout calculations and should be avoided in animations.",
    "intermediate",
    ["css", "performance", "reflow", "layout", "intermediate"],
    "Properties that trigger reflow: width, height, top, left, margin, padding, border, display, position, float. These cause layout recalculation. Use transform/opacity for animations instead.",
    15,
    "multiple-select",
    [
      { id: "o1", text: "width / height (trigger reflow)", isCorrect: true, explanation: "Correct. These trigger layout." },
      { id: "o2", text: "top / left (trigger reflow)", isCorrect: true, explanation: "Correct. These trigger layout." },
      { id: "o3", text: "margin / padding (trigger reflow)", isCorrect: true, explanation: "Correct. These trigger layout." },
      { id: "o4", text: "transform (doesn't trigger reflow)", isCorrect: false, explanation: "Incorrect. transform doesn't trigger reflow." }
    ]
  ),
  createQuestion(
    "What is the purpose of 'content-visibility' property? How does it improve page load performance?",
    "Content visibility enables lazy rendering. Explain content-visibility and its performance benefits for long pages.",
    "difficult",
    ["css", "performance", "content-visibility", "lazy-rendering", "difficult"],
    "content-visibility: auto (skips rendering until needed), hidden (skips rendering), visible (normal). Enables virtual scrolling, improves initial render. Browser skips layout/paint for off-screen content. Use for long lists, feeds.",
    20,
    [
      { id: "o1", text: "Skips rendering off-screen content; improves initial load; enables virtual scrolling", isCorrect: true, explanation: "Correct. content-visibility improves performance." },
      { id: "o2", text: "Only affects visual appearance", isCorrect: false, explanation: "Incorrect. It affects rendering performance." },
      { id: "o3", text: "Slows down rendering", isCorrect: false, explanation: "Incorrect. It improves performance." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. content-visibility is a modern feature." }
    ]
  )
];

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(`✅ Added ${newQuestions.length} Performance questions (Batch 1)`);
console.log(`📊 Total CSS questions: ${existingQuestions.length}`);


