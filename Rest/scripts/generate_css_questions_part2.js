const fs = require('fs');
const path = require('path');

/**
 * Generates remaining CSS questions (Layout, Responsive, Animations, etc.)
 * This is part 2 - continues from where part 1 left off
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/css-questions.json');
let questionCounter = 11; // Continue from css-01-css10

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
  if (existingQuestions.length > 0) {
    const lastId = existingQuestions[existingQuestions.length - 1].id;
    const match = lastId.match(/css-\d+-css(\d+)/);
    if (match) {
      questionCounter = parseInt(match[1]) + 1;
    }
  }
}

const getQuestionId = (topicNum) => {
  const id = `css-0${topicNum}-css${String(questionCounter++).padStart(2, '0')}`;
  return id;
};

const createQuestion = (topicNum, title, content, topic, difficulty, tags, explanation, points, options, questionType = "multiple-choice") => {
  return {
    id: getQuestionId(topicNum),
    title,
    content,
    type: questionType,
    category: "CSS",
    topic,
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

const newQuestions = [];

console.log('Starting CSS questions generation (Part 2)...');
console.log(`Current question count: ${existingQuestions.length}`);
console.log(`Starting from question ID counter: ${questionCounter}\n`);

// TOPIC 2: Layout (10 questions)
console.log('Generating Layout questions...');
const layout = [
  {
    title: "Explain Flexbox alignment properties. What is the difference between 'justify-content' and 'align-items'?",
    content: "Flexbox alignment is crucial for layouts. Explain when to use justify-content vs align-items and their different axes.",
    difficulty: "intermediate",
    tags: ["css", "layout", "flexbox", "intermediate"],
    explanation: "justify-content aligns items along main axis (row: horizontal, column: vertical). align-items aligns items along cross axis (row: vertical, column: horizontal). Use justify-content for main axis spacing, align-items for cross-axis alignment.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "justify-content: main axis; align-items: cross axis", isCorrect: true, explanation: "Correct. They work on different axes." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They work on different axes." },
      { id: "o3", text: "justify-content: cross axis; align-items: main axis", isCorrect: false, explanation: "Incorrect. It's the opposite." },
      { id: "o4", text: "Both work on the same axis", isCorrect: false, explanation: "Incorrect. They work on perpendicular axes." }
    ]
  },
  {
    title: "Which CSS Grid properties control grid item placement? (Select all that apply)",
    content: "CSS Grid provides powerful layout control. Identify properties that control where items are placed in the grid.",
    difficulty: "intermediate",
    tags: ["css", "layout", "grid", "intermediate"],
    explanation: "grid-column, grid-row, grid-area, and grid-template-areas control item placement. grid-gap controls spacing. grid-template-columns/rows define the grid structure.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "grid-column (column placement)", isCorrect: true, explanation: "Correct. grid-column controls column placement." },
      { id: "o2", text: "grid-row (row placement)", isCorrect: true, explanation: "Correct. grid-row controls row placement." },
      { id: "o3", text: "grid-area (named area placement)", isCorrect: true, explanation: "Correct. grid-area places items in named areas." },
      { id: "o4", text: "grid-gap (spacing between items)", isCorrect: false, explanation: "Incorrect. grid-gap controls spacing, not placement." }
    ]
  },
  {
    title: "What is the difference between 'flex-grow', 'flex-shrink', and 'flex-basis'?",
    content: "Flexbox sizing requires understanding these properties. Explain how they work together to control flex item sizes.",
    difficulty: "difficult",
    tags: ["css", "layout", "flexbox", "difficult"],
    explanation: "flex-basis: initial size before growing/shrinking. flex-grow: how much item grows relative to others (0 = no grow). flex-shrink: how much item shrinks relative to others (0 = no shrink). flex: shorthand for grow shrink basis.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "flex-basis: initial size; flex-grow: growth factor; flex-shrink: shrink factor", isCorrect: true, explanation: "Correct. This describes their roles." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They control different aspects of sizing." },
      { id: "o3", text: "flex-grow controls initial size", isCorrect: false, explanation: "Incorrect. flex-basis controls initial size." },
      { id: "o4", text: "flex-shrink prevents items from growing", isCorrect: false, explanation: "Incorrect. flex-shrink controls shrinking, not growing." }
    ]
  },
  {
    title: "Explain CSS Grid 'fr' unit. How does it differ from percentages?",
    content: "Grid fractional units are powerful for responsive layouts. Explain how 'fr' units work and when to use them.",
    difficulty: "intermediate",
    tags: ["css", "layout", "grid", "units", "intermediate"],
    explanation: "'fr' (fraction) distributes available space proportionally. 1fr 2fr means second column gets twice the space. Percentages are fixed relative to container. 'fr' is more flexible for responsive grids. Use 'fr' for flexible columns, % for fixed proportions.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "fr distributes available space proportionally; % is fixed relative to container", isCorrect: true, explanation: "Correct. fr is more flexible for grid layouts." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. fr is more flexible than percentages." },
      { id: "o3", text: "% is always better for grids", isCorrect: false, explanation: "Incorrect. fr is often better for flexible grid layouts." },
      { id: "o4", text: "fr only works with fixed widths", isCorrect: false, explanation: "Incorrect. fr works with flexible/available space." }
    ]
  },
  {
    title: "Which positioning values remove elements from normal document flow? (Select all that apply)",
    content: "Understanding positioning and flow is crucial. Identify which position values remove elements from normal flow.",
    difficulty: "intermediate",
    tags: ["css", "layout", "positioning", "intermediate"],
    explanation: "absolute and fixed remove from flow. relative and sticky stay in flow (sticky can overlap but starts in flow). static is default (in flow). Elements removed from flow don't affect sibling positioning.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "absolute (removed from flow)", isCorrect: true, explanation: "Correct. absolute removes from flow." },
      { id: "o2", text: "fixed (removed from flow, relative to viewport)", isCorrect: true, explanation: "Correct. fixed removes from flow." },
      { id: "o3", text: "relative (stays in flow)", isCorrect: false, explanation: "Incorrect. relative stays in normal flow." },
      { id: "o4", text: "static (default, in flow)", isCorrect: false, explanation: "Incorrect. static is in normal flow." }
    ]
  },
  {
    title: "What is the purpose of 'align-self' in Flexbox? How does it differ from 'align-items'?",
    content: "Flexbox provides both container and item-level alignment. Explain align-self vs align-items.",
    difficulty: "intermediate",
    tags: ["css", "layout", "flexbox", "intermediate"],
    explanation: "align-items sets alignment for all flex items (container property). align-self overrides align-items for individual items (item property). Use align-items for uniform alignment, align-self for exceptions.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "align-items: all items; align-self: individual item override", isCorrect: true, explanation: "Correct. align-self overrides align-items for specific items." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. One is container-level, one is item-level." },
      { id: "o3", text: "align-items is deprecated", isCorrect: false, explanation: "Incorrect. Both are valid and serve different purposes." },
      { id: "o4", text: "align-self sets alignment for all items", isCorrect: false, explanation: "Incorrect. align-self is for individual items." }
    ]
  },
  {
    title: "Explain CSS Grid 'subgrid'. What problem does it solve?",
    content: "Subgrid is a modern CSS Grid feature. Explain its purpose and use cases for nested grid layouts.",
    difficulty: "difficult",
    tags: ["css", "layout", "grid", "subgrid", "difficult"],
    explanation: "subgrid allows nested grid to inherit parent grid tracks. Solves alignment issues in nested grids. Without subgrid, nested grids are independent. With subgrid, child grid aligns with parent tracks. Limited browser support (Firefox, Safari).",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Allows nested grid to inherit parent grid tracks for alignment", isCorrect: true, explanation: "Correct. subgrid solves nested grid alignment." },
      { id: "o2", text: "Creates a smaller grid within a larger grid", isCorrect: false, explanation: "Incorrect. That's just a nested grid, not subgrid." },
      { id: "o3", text: "Is deprecated in favor of Flexbox", isCorrect: false, explanation: "Incorrect. subgrid is a modern feature." },
      { id: "o4", text: "Only works with fixed grid sizes", isCorrect: false, explanation: "Incorrect. subgrid works with flexible grids." }
    ]
  },
  {
    title: "Which Flexbox properties control item wrapping? (Select all that apply)",
    content: "Flexbox wrapping controls multi-line layouts. Identify properties that affect how flex items wrap.",
    difficulty: "intermediate",
    tags: ["css", "layout", "flexbox", "intermediate"],
    explanation: "flex-wrap controls wrapping (nowrap, wrap, wrap-reverse). flex-direction affects wrap direction. align-content aligns wrapped lines. flex-basis affects when items wrap (if too large).",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "flex-wrap (controls wrapping behavior)", isCorrect: true, explanation: "Correct. flex-wrap directly controls wrapping." },
      { id: "o2", text: "align-content (aligns wrapped lines)", isCorrect: true, explanation: "Correct. align-content affects wrapped content." },
      { id: "o3", text: "justify-content (main axis alignment)", isCorrect: false, explanation: "Incorrect. justify-content doesn't control wrapping." },
      { id: "o4", text: "flex-basis (affects when items wrap)", isCorrect: true, explanation: "Correct. Item size affects wrapping." }
    ]
  },
  {
    title: "What is the difference between 'grid-template-areas' and 'grid-template-columns/rows'?",
    content: "CSS Grid provides multiple ways to define layouts. Explain when to use named areas vs explicit tracks.",
    difficulty: "intermediate",
    tags: ["css", "layout", "grid", "intermediate"],
    explanation: "grid-template-areas: visual/declarative layout with named areas (easier to read, maintain). grid-template-columns/rows: explicit track sizing (more control, less readable). Can combine both. Areas are better for semantic layouts, explicit tracks for precise control.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "grid-template-areas: visual named layout; grid-template-columns/rows: explicit track sizing", isCorrect: true, explanation: "Correct. Areas are more visual, explicit tracks more precise." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They define grids differently." },
      { id: "o3", text: "grid-template-areas is deprecated", isCorrect: false, explanation: "Incorrect. Both are valid approaches." },
      { id: "o4", text: "grid-template-columns/rows is only for 1D layouts", isCorrect: false, explanation: "Incorrect. Both work for 2D grid layouts." }
    ]
  },
  {
    title: "Explain 'position: sticky'. How does it differ from 'position: fixed'?",
    content: "Sticky positioning is useful for headers and navigation. Explain how it works and when to use it vs fixed.",
    difficulty: "intermediate",
    tags: ["css", "layout", "positioning", "sticky", "intermediate"],
    explanation: "sticky: element sticks when scrolling reaches threshold (within container). fixed: always positioned relative to viewport. sticky stays in flow until threshold, then sticks. fixed is always removed from flow. Use sticky for headers in scrollable content, fixed for always-visible nav.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "sticky: sticks within container when scrolling; fixed: always relative to viewport", isCorrect: true, explanation: "Correct. sticky is container-relative, fixed is viewport-relative." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They behave differently." },
      { id: "o3", text: "sticky is always removed from flow", isCorrect: false, explanation: "Incorrect. sticky starts in flow, then sticks." },
      { id: "o4", text: "fixed sticks within container", isCorrect: false, explanation: "Incorrect. fixed is always viewport-relative." }
    ]
  }
];

layout.forEach((q) => {
  newQuestions.push(createQuestion(2, q.title, q.content, "Layout", q.difficulty, q.tags, q.explanation, q.points, q.options, q.type));
});

console.log(`✅ Generated ${layout.length} Layout questions`);
console.log(`Total new questions: ${newQuestions.length}\n`);

// Write questions to file
const allQuestions = [...existingQuestions, ...newQuestions];
fs.writeFileSync(questionsFile, JSON.stringify(allQuestions, null, 2));

console.log(`✅ Written ${allQuestions.length} total questions to ${questionsFile}`);
console.log(`\n📝 Progress: Basics (10) + Layout (10) = ${allQuestions.length} questions`);
console.log(`📝 Remaining: Responsive, Animations, Preprocessors, Performance, Architecture`);


