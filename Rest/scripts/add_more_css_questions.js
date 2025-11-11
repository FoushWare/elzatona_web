const fs = require('fs');
const path = require('path');

/**
 * Adds more CSS questions to existing css-questions.json
 * This script adds 70 more questions (10 per existing topic + 30 for new topics)
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/css-questions.json');
let questionCounter = 81; // Continue from existing questions

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

console.log('Starting to add more CSS questions...');
console.log(`Current question count: ${existingQuestions.length}`);
console.log(`Starting from question ID counter: ${questionCounter}\n`);

// MORE BASICS QUESTIONS (10)
console.log('Adding more Basics questions...');
const moreBasics = [
  {
    title: "Explain advanced CSS selectors. What is the difference between ':nth-child()' and ':nth-of-type()'?",
    content: "Advanced selectors enable precise targeting. Explain nth-child vs nth-of-type and when to use each.",
    difficulty: "intermediate",
    tags: ["css", "basics", "selectors", "nth-child", "intermediate"],
    explanation: ":nth-child(n) selects nth child element regardless of type. :nth-of-type(n) selects nth element of specific type. :nth-child(2) = 2nd child (any type). :nth-of-type(2) = 2nd <p> if selector is p:nth-of-type(2). Use nth-child for position-based, nth-of-type for type-based selection.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: ":nth-child: position-based (any type); :nth-of-type: type-based selection", isCorrect: true, explanation: "Correct. They select based on different criteria." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They work differently." },
      { id: "o3", text: ":nth-child only works with classes", isCorrect: false, explanation: "Incorrect. nth-child works with any element." },
      { id: "o4", text: ":nth-of-type is deprecated", isCorrect: false, explanation: "Incorrect. Both are standard CSS selectors." }
    ]
  },
  {
    title: "Which pseudo-elements can be used with the '::before' and '::after' syntax? (Select all that apply)",
    content: "Pseudo-elements create virtual elements. Identify valid pseudo-elements in CSS.",
    difficulty: "intermediate",
    tags: ["css", "basics", "pseudo-elements", "intermediate"],
    explanation: "Valid pseudo-elements: ::before, ::after, ::first-line, ::first-letter, ::selection, ::placeholder, ::backdrop. Double colon (::) is modern syntax, single colon (:) works for backward compatibility. ::before and ::after require content property.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "::before (creates element before)", isCorrect: true, explanation: "Correct. ::before is a valid pseudo-element." },
      { id: "o2", text: "::after (creates element after)", isCorrect: true, explanation: "Correct. ::after is a valid pseudo-element." },
      { id: "o3", text: "::first-letter (styles first letter)", isCorrect: true, explanation: "Correct. ::first-letter is a valid pseudo-element." },
      { id: "o4", text: "::hover (not a pseudo-element, it's a pseudo-class)", isCorrect: false, explanation: "Incorrect. ::hover is a pseudo-class, not pseudo-element." }
    ]
  },
  {
    title: "What is the CSS cascade order when multiple rules have the same specificity?",
    content: "Understanding cascade order is crucial. Explain how source order affects which styles are applied.",
    difficulty: "intermediate",
    tags: ["css", "basics", "cascade", "specificity", "intermediate"],
    explanation: "When specificity is equal, later rules win (source order). Stylesheet order matters: earlier < later. Inline styles (highest specificity) > embedded < external. Within same specificity, last declared wins. This is why order matters in CSS.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Later rules win when specificity is equal (source order determines winner)", isCorrect: true, explanation: "Correct. Source order breaks ties when specificity is equal." },
      { id: "o2", text: "Earlier rules always win", isCorrect: false, explanation: "Incorrect. Later rules win when specificity is equal." },
      { id: "o3", text: "Random selection", isCorrect: false, explanation: "Incorrect. Source order determines the winner." },
      { id: "o4", text: "Specificity doesn't matter", isCorrect: false, explanation: "Incorrect. Specificity matters first, then source order." }
    ]
  },
  {
    title: "Explain CSS attribute selectors. What is the difference between '[attr]', '[attr=value]', and '[attr~=value]'?",
    content: "Attribute selectors provide powerful targeting. Explain different attribute selector syntaxes and their meanings.",
    difficulty: "intermediate",
    tags: ["css", "basics", "selectors", "attributes", "intermediate"],
    explanation: "[attr]: element has attribute. [attr=value]: exact match. [attr~=value]: value in space-separated list. [attr|=value]: value or value- prefix. [attr^=value]: starts with. [attr$=value]: ends with. [attr*=value]: contains substring.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "[attr]: has attribute; [attr=value]: exact match; [attr~=value]: in space-separated list", isCorrect: true, explanation: "Correct. Different operators match differently." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They match differently." },
      { id: "o3", text: "[attr~=value] means exact match", isCorrect: false, explanation: "Incorrect. ~= means in space-separated list." },
      { id: "o4", text: "Attribute selectors don't work", isCorrect: false, explanation: "Incorrect. Attribute selectors are powerful and widely supported." }
    ]
  },
  {
    title: "Which CSS units are relative to the viewport? (Select all that apply)",
    content: "Viewport units enable responsive sizing. Identify CSS units that are relative to viewport dimensions.",
    difficulty: "intermediate",
    tags: ["css", "basics", "units", "viewport", "intermediate"],
    explanation: "Viewport units: vw (viewport width 1%), vh (viewport height 1%), vmin (smaller of vw/vh), vmax (larger of vw/vh). These are relative to viewport size, not parent elements. Useful for full-screen layouts, hero sections.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "vw (viewport width)", isCorrect: true, explanation: "Correct. vw is relative to viewport width." },
      { id: "o2", text: "vh (viewport height)", isCorrect: true, explanation: "Correct. vh is relative to viewport height." },
      { id: "o3", text: "vmin (smaller of vw/vh)", isCorrect: true, explanation: "Correct. vmin is relative to smaller viewport dimension." },
      { id: "o4", text: "em (relative to parent)", isCorrect: false, explanation: "Incorrect. em is relative to parent, not viewport." }
    ]
  },
  {
    title: "What is the purpose of the ':is()' and ':where()' pseudo-class functions? How do they differ?",
    content: "Modern CSS provides selector grouping functions. Explain :is() and :where() and their specificity differences.",
    difficulty: "difficult",
    tags: ["css", "basics", "selectors", "is", "where", "difficult"],
    explanation: ":is(selector1, selector2) groups selectors, specificity = most specific in group. :where(selector1, selector2) groups selectors, specificity = 0 (always). :is() maintains specificity, :where() resets it. Use :where() to avoid specificity conflicts, :is() when you need specificity.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: ":is() maintains specificity; :where() has zero specificity (always)", isCorrect: true, explanation: "Correct. This is the key difference." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They handle specificity differently." },
      { id: "o3", text: ":where() has higher specificity", isCorrect: false, explanation: "Incorrect. :where() has zero specificity." },
      { id: "o4", text: "Both are deprecated", isCorrect: false, explanation: "Incorrect. Both are modern, useful features." }
    ]
  },
  {
    title: "Explain CSS custom properties (variables) scoping. How does inheritance work with CSS variables?",
    content: "CSS variables have scoping rules. Explain how custom properties inherit and can be overridden.",
    difficulty: "intermediate",
    tags: ["css", "basics", "css-variables", "custom-properties", "intermediate"],
    explanation: "CSS variables inherit (cascade down). Define at :root for global scope. Override in any selector for local scope. Child elements inherit parent's variable values. Use var(--name, fallback) for fallback values. Scoped to selector and descendants.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Variables inherit down the DOM tree; can be overridden in any selector for local scope", isCorrect: true, explanation: "Correct. CSS variables cascade and can be scoped." },
      { id: "o2", text: "Variables don't inherit", isCorrect: false, explanation: "Incorrect. CSS variables do inherit." },
      { id: "o3", text: "Only work at :root level", isCorrect: false, explanation: "Incorrect. Variables can be defined at any level." },
      { id: "o4", text: "Require JavaScript to work", isCorrect: false, explanation: "Incorrect. CSS variables are pure CSS." }
    ]
  },
  {
    title: "Which CSS properties are not inherited by default? (Select all that apply)",
    content: "Understanding inheritance helps write efficient CSS. Identify properties that are not inherited.",
    difficulty: "intermediate",
    tags: ["css", "basics", "inheritance", "intermediate"],
    explanation: "Non-inherited: margin, padding, border, width, height, display, position, float, clear, background, z-index, overflow, text-decoration (some values), vertical-align. These must be set on each element or use 'inherit' keyword.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "margin (not inherited)", isCorrect: true, explanation: "Correct. margin is not inherited." },
      { id: "o2", text: "padding (not inherited)", isCorrect: true, explanation: "Correct. padding is not inherited." },
      { id: "o3", text: "width / height (not inherited)", isCorrect: true, explanation: "Correct. width and height are not inherited." },
      { id: "o4", text: "color (inherited)", isCorrect: false, explanation: "Incorrect. color is inherited." }
    ]
  },
  {
    title: "What is the difference between '::first-line' and '::first-letter' pseudo-elements?",
    content: "Text pseudo-elements style specific parts. Explain first-line vs first-letter and their use cases.",
    difficulty: "intermediate",
    tags: ["css", "basics", "pseudo-elements", "typography", "intermediate"],
    explanation: "::first-line styles first line of block element (wraps based on width). ::first-letter styles first letter (drop caps, styling). ::first-line can style multiple words, ::first-letter is single character. Both only work on block-level elements.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "::first-line: entire first line; ::first-letter: single first character", isCorrect: true, explanation: "Correct. They target different scopes." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They target different parts of text." },
      { id: "o3", text: "::first-letter styles the whole line", isCorrect: false, explanation: "Incorrect. ::first-letter only styles the first character." },
      { id: "o4", text: "Only work on inline elements", isCorrect: false, explanation: "Incorrect. They work on block-level elements." }
    ]
  },
  {
    title: "Explain the ':has()' pseudo-class. What problem does it solve and what are its limitations?",
    content: ":has() is a powerful modern selector. Explain its purpose, use cases, and browser support considerations.",
    difficulty: "difficult",
    tags: ["css", "basics", "selectors", "has", "difficult"],
    explanation: ":has() is parent selector - selects parent based on child. Example: div:has(> img) selects divs containing img. Solves 'parent selector problem'. Limited browser support (Safari 15.4+, Chrome 105+). Enables conditional styling based on content.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Parent selector - selects element based on descendants; limited browser support", isCorrect: true, explanation: "Correct. :has() enables parent selection." },
      { id: "o2", text: "Only selects children", isCorrect: false, explanation: "Incorrect. :has() selects the parent based on children." },
      { id: "o3", text: "Works in all browsers", isCorrect: false, explanation: "Incorrect. Browser support is limited." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. :has() is a modern, powerful feature." }
    ]
  }
];

moreBasics.forEach((q) => {
  newQuestions.push(createQuestion(1, q.title, q.content, "Basics", q.difficulty, q.tags, q.explanation, q.points, q.options, q.type));
});

console.log(`✅ Added ${moreBasics.length} more Basics questions`);

// MORE LAYOUT QUESTIONS (10)
console.log('Adding more Layout questions...');
const moreLayout = [
  {
    title: "Explain CSS Grid 'subgrid' feature. What problem does it solve and what are its limitations?",
    content: "Subgrid is an advanced Grid feature. Explain its purpose, use cases, and browser support.",
    difficulty: "difficult",
    tags: ["css", "layout", "grid", "subgrid", "difficult"],
    explanation: "subgrid allows nested grid to inherit parent's grid tracks. Solves alignment in nested grids. Without subgrid, nested grids are independent. With subgrid, child aligns with parent. Limited support: Firefox 71+, Safari 16+. Use for card layouts, complex nested structures.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Inherits parent grid tracks for alignment; limited browser support (Firefox, Safari)", isCorrect: true, explanation: "Correct. subgrid solves nested grid alignment." },
      { id: "o2", text: "Creates independent nested grid", isCorrect: false, explanation: "Incorrect. That's regular nested grid, not subgrid." },
      { id: "o3", text: "Works in all browsers", isCorrect: false, explanation: "Incorrect. Browser support is limited." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. subgrid is a modern feature." }
    ]
  },
  {
    title: "Which Flexbox properties control item alignment on the cross axis? (Select all that apply)",
    content: "Flexbox cross-axis alignment requires specific properties. Identify properties that control cross-axis alignment.",
    difficulty: "intermediate",
    tags: ["css", "layout", "flexbox", "alignment", "intermediate"],
    explanation: "Cross-axis alignment: align-items (all items), align-self (individual item), align-content (wrapped lines). These work on cross axis (perpendicular to main axis). justify-content works on main axis.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "align-items (all items on cross axis)", isCorrect: true, explanation: "Correct. align-items controls cross-axis alignment." },
      { id: "o2", text: "align-self (individual item on cross axis)", isCorrect: true, explanation: "Correct. align-self overrides align-items." },
      { id: "o3", text: "align-content (wrapped lines on cross axis)", isCorrect: true, explanation: "Correct. align-content aligns wrapped content." },
      { id: "o4", text: "justify-content (main axis, not cross axis)", isCorrect: false, explanation: "Incorrect. justify-content works on main axis." }
    ]
  },
  {
    title: "What is the difference between 'grid-auto-rows' and 'grid-template-rows' in CSS Grid?",
    content: "Grid row definition has multiple approaches. Explain grid-template-rows vs grid-auto-rows and when to use each.",
    difficulty: "intermediate",
    tags: ["css", "layout", "grid", "intermediate"],
    explanation: "grid-template-rows: defines explicit rows (named or sized). grid-auto-rows: defines size for implicit rows (created automatically when items exceed explicit rows). Use template for known structure, auto for dynamic content. Can combine both.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "grid-template-rows: explicit rows; grid-auto-rows: implicit/auto-created rows", isCorrect: true, explanation: "Correct. Template is for explicit, auto is for implicit rows." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They define different row types." },
      { id: "o3", text: "grid-auto-rows is deprecated", isCorrect: false, explanation: "Incorrect. Both are valid and useful." },
      { id: "o4", text: "Only grid-template-rows works", isCorrect: false, explanation: "Incorrect. Both serve different purposes." }
    ]
  },
  {
    title: "Explain 'position: sticky' behavior. What are the requirements for sticky positioning to work?",
    content: "Sticky positioning has specific requirements. Explain what's needed for sticky to function correctly.",
    difficulty: "intermediate",
    tags: ["css", "layout", "positioning", "sticky", "intermediate"],
    explanation: "Requirements: top/left/right/bottom must be set (defines stick point). Parent container must have space (can't overflow). Works within containing block. If parent has overflow: hidden/scroll, sticky may not work. Needs scrollable ancestor.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Requires top/left/right/bottom value; parent must allow scrolling; can break with overflow: hidden", isCorrect: true, explanation: "Correct. Sticky has specific requirements." },
      { id: "o2", text: "Works without any properties", isCorrect: false, explanation: "Incorrect. Requires positioning values." },
      { id: "o3", text: "Always works regardless of parent", isCorrect: false, explanation: "Incorrect. Parent properties affect it." },
      { id: "o4", text: "Only works with JavaScript", isCorrect: false, explanation: "Incorrect. Sticky is pure CSS." }
    ]
  },
  {
    title: "Which CSS Grid properties enable responsive grid layouts without media queries? (Select all that apply)",
    content: "Grid provides responsive capabilities. Identify Grid features that enable responsive layouts without media queries.",
    difficulty: "intermediate",
    tags: ["css", "layout", "grid", "responsive", "intermediate"],
    explanation: "auto-fit/auto-fill with minmax() create responsive columns. fr units distribute space flexibly. min-content, max-content adapt to content. repeat(auto-fit, minmax(200px, 1fr)) creates responsive grid. No media queries needed.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "auto-fit / auto-fill with minmax() (responsive columns)", isCorrect: true, explanation: "Correct. auto-fit/auto-fill enable responsive grids." },
      { id: "o2", text: "fr units (flexible distribution)", isCorrect: true, explanation: "Correct. fr units are flexible." },
      { id: "o3", text: "min-content / max-content (content-based sizing)", isCorrect: true, explanation: "Correct. These adapt to content." },
      { id: "o4", text: "Fixed pixel values (not responsive)", isCorrect: false, explanation: "Incorrect. Fixed pixels are not responsive." }
    ]
  },
  {
    title: "What is the purpose of 'gap' property in Flexbox and Grid? How does it differ from margins?",
    content: "Gap property simplifies spacing. Explain gap vs margins and when to use each.",
    difficulty: "intermediate",
    tags: ["css", "layout", "flexbox", "grid", "gap", "intermediate"],
    explanation: "gap: spacing between flex/grid items (row-gap, column-gap). Only works in Flexbox/Grid. Margins: spacing around any element, works everywhere. gap is simpler (no negative margins, no first/last child exceptions), margins more flexible but more complex.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "gap: spacing between items in Flexbox/Grid; simpler than margins, no edge cases", isCorrect: true, explanation: "Correct. gap is cleaner for Flexbox/Grid spacing." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. gap only works in Flexbox/Grid." },
      { id: "o3", text: "gap works on all elements", isCorrect: false, explanation: "Incorrect. gap only works in Flexbox/Grid contexts." },
      { id: "o4", text: "margins are always better", isCorrect: false, explanation: "Incorrect. gap is often simpler for Flexbox/Grid." }
    ]
  },
  {
    title: "Explain CSS Grid 'masonry' layout. What is it and what's the current browser support?",
    content: "Masonry is a proposed Grid feature. Explain masonry layout and its implementation status.",
    difficulty: "difficult",
    tags: ["css", "layout", "grid", "masonry", "difficult"],
    explanation: "Masonry: Pinterest-style layout where items flow into shortest column. Proposed for CSS Grid but not yet standardized. Firefox has experimental support behind flag. Workaround: use JavaScript libraries or column-based approaches. Not production-ready yet.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Pinterest-style layout; experimental, not standardized; limited browser support", isCorrect: true, explanation: "Correct. Masonry is experimental." },
      { id: "o2", text: "Standard CSS Grid feature", isCorrect: false, explanation: "Incorrect. Masonry is not yet standardized." },
      { id: "o3", text: "Works in all browsers", isCorrect: false, explanation: "Incorrect. Support is very limited." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. It's a proposed feature, not deprecated." }
    ]
  },
  {
    title: "Which Flexbox properties control item sizing when there's extra space? (Select all that apply)",
    content: "Flexbox sizing controls how items grow and shrink. Identify properties that control item sizing.",
    difficulty: "intermediate",
    tags: ["css", "layout", "flexbox", "sizing", "intermediate"],
    explanation: "flex-grow: growth factor (how much item grows). flex-shrink: shrink factor (how much item shrinks). flex-basis: initial size. flex: shorthand (grow shrink basis). min-width/max-width also affect sizing. These control how items use available space.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "flex-grow (growth factor)", isCorrect: true, explanation: "Correct. flex-grow controls growth." },
      { id: "o2", text: "flex-shrink (shrink factor)", isCorrect: true, explanation: "Correct. flex-shrink controls shrinking." },
      { id: "o3", text: "flex-basis (initial size)", isCorrect: true, explanation: "Correct. flex-basis sets initial size." },
      { id: "o4", text: "justify-content (alignment, not sizing)", isCorrect: false, explanation: "Incorrect. justify-content controls alignment, not sizing." }
    ]
  },
  {
    title: "What is the difference between 'align-items' and 'align-content' in Flexbox?",
    content: "Flexbox has two alignment properties for cross axis. Explain the difference between align-items and align-content.",
    difficulty: "intermediate",
    tags: ["css", "layout", "flexbox", "alignment", "intermediate"],
    explanation: "align-items: aligns items within each line (single-line or multi-line). align-content: aligns lines when content wraps (only works with flex-wrap: wrap). align-items: per-line alignment. align-content: between-lines spacing. Use align-items for item alignment, align-content for line spacing.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "align-items: items within lines; align-content: spacing between wrapped lines", isCorrect: true, explanation: "Correct. They control different aspects of alignment." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They work on different levels." },
      { id: "o3", text: "align-content is deprecated", isCorrect: false, explanation: "Incorrect. Both are valid and useful." },
      { id: "o4", text: "align-items only works with single line", isCorrect: false, explanation: "Incorrect. align-items works with wrapped content too." }
    ]
  },
  {
    title: "Explain CSS Grid 'auto-placement' algorithm. How does it determine where items are placed?",
    content: "Grid automatically places items. Explain the auto-placement algorithm and how items flow into the grid.",
    difficulty: "difficult",
    tags: ["css", "layout", "grid", "auto-placement", "difficult"],
    explanation: "Auto-placement: items flow row by row, left to right. grid-auto-flow controls direction: row (default, left-right), column (top-bottom), dense (fills gaps). Items without explicit placement use auto-placement. Can specify grid-auto-flow: dense to fill gaps.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Items flow row by row (default); grid-auto-flow controls direction and gap-filling", isCorrect: true, explanation: "Correct. Auto-placement follows grid-auto-flow rules." },
      { id: "o2", text: "Random placement", isCorrect: false, explanation: "Incorrect. Placement follows specific algorithm." },
      { id: "o3", text: "Only works with explicit placement", isCorrect: false, explanation: "Incorrect. Auto-placement works when no explicit placement." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. Auto-placement is a core Grid feature." }
    ]
  }
];

moreLayout.forEach((q) => {
  newQuestions.push(createQuestion(2, q.title, q.content, "Layout", q.difficulty, q.tags, q.explanation, q.points, q.options, q.type));
});

console.log(`✅ Added ${moreLayout.length} more Layout questions`);

// Continue with remaining topics...
// Writing intermediate progress
let allQuestions = [...existingQuestions, ...newQuestions];
fs.writeFileSync(questionsFile, JSON.stringify(allQuestions, null, 2));
console.log(`\n✅ Intermediate save: ${allQuestions.length} questions`);
console.log(`📝 Progress: Basics (+10) + Layout (+10) = ${newQuestions.length} new questions`);
console.log(`📝 Continuing with remaining topics...\n`);

// MORE RESPONSIVE QUESTIONS (10)
console.log('Adding more Responsive questions...');
const moreResponsive = [
  {
    title: "Explain container queries vs media queries. When should you use container queries?",
    content: "Container queries are a modern alternative to media queries. Explain when container queries are more appropriate.",
    difficulty: "difficult",
    tags: ["css", "responsive", "container-queries", "difficult"],
    explanation: "Media queries: viewport-based (page-level). Container queries: container-based (component-level). Use container queries for reusable components that need to adapt to container size, not viewport. Better for component libraries, cards, widgets. Limited support (Chrome 105+, Safari 16+).",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Container queries: component-level responsiveness; better for reusable components", isCorrect: true, explanation: "Correct. Container queries enable component-level responsiveness." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They query different things." },
      { id: "o3", text: "Media queries are always better", isCorrect: false, explanation: "Incorrect. Container queries solve different problems." },
      { id: "o4", text: "Container queries work in all browsers", isCorrect: false, explanation: "Incorrect. Browser support is limited." }
    ]
  },
  {
    title: "Which techniques enable fluid typography? (Select all that apply)",
    content: "Fluid typography scales smoothly. Identify CSS techniques that create fluid, responsive text sizing.",
    difficulty: "intermediate",
    tags: ["css", "responsive", "typography", "fluid", "intermediate"],
    explanation: "clamp() function (min, preferred, max), calc() with viewport units, vw/vh units, fluid typography formulas. clamp() is most common: clamp(1rem, 4vw, 2rem). Enables text that scales smoothly between breakpoints.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "clamp() function (min, preferred, max)", isCorrect: true, explanation: "Correct. clamp() enables fluid sizing." },
      { id: "o2", text: "vw/vh units (viewport-relative)", isCorrect: true, explanation: "Correct. Viewport units enable fluid sizing." },
      { id: "o3", text: "calc() with viewport units", isCorrect: true, explanation: "Correct. calc() enables fluid calculations." },
      { id: "o4", text: "Fixed px values (not fluid)", isCorrect: false, explanation: "Incorrect. Fixed pixels are not fluid." }
    ]
  },
  {
    title: "What is the purpose of 'aspect-ratio' property in responsive design? How does it prevent layout shift?",
    content: "Layout shift hurts user experience. Explain how aspect-ratio prevents Cumulative Layout Shift (CLS).",
    difficulty: "intermediate",
    tags: ["css", "responsive", "aspect-ratio", "cls", "intermediate"],
    explanation: "aspect-ratio maintains width:height ratio. Prevents layout shift when images/media load. Set aspect-ratio on container, image loads and fills. No height jump = no CLS. Essential for Core Web Vitals. Works with width or height, maintains ratio.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Maintains width:height ratio; prevents layout shift when content loads; improves CLS", isCorrect: true, explanation: "Correct. aspect-ratio prevents layout shift." },
      { id: "o2", text: "Only works with images", isCorrect: false, explanation: "Incorrect. aspect-ratio works with any element." },
      { id: "o3", text: "Causes layout shift", isCorrect: false, explanation: "Incorrect. It prevents layout shift." },
      { id: "o4", text: "Requires JavaScript", isCorrect: false, explanation: "Incorrect. aspect-ratio is pure CSS." }
    ]
  },
  {
    title: "Explain 'min()', 'max()', and 'clamp()' functions. How do they enable responsive sizing?",
    content: "CSS comparison functions enable flexible sizing. Explain min(), max(), and clamp() for responsive design.",
    difficulty: "intermediate",
    tags: ["css", "responsive", "functions", "intermediate"],
    explanation: "min(a, b): returns smaller value (sets maximum). max(a, b): returns larger value (sets minimum). clamp(min, val, max): constrains between min and max. Enable responsive sizing without media queries. clamp() is most useful for fluid typography.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "min(): maximum limit; max(): minimum limit; clamp(): value between min and max", isCorrect: true, explanation: "Correct. Each function serves different comparison purposes." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They perform different comparisons." },
      { id: "o3", text: "Only work with pixels", isCorrect: false, explanation: "Incorrect. They work with any CSS units." },
      { id: "o4", text: "Require media queries", isCorrect: false, explanation: "Incorrect. They enable responsive sizing without media queries." }
    ]
  },
  {
    title: "Which media query features enable dark mode and accessibility preferences? (Select all that apply)",
    content: "Media queries can detect user preferences. Identify features that enable preference-based styling.",
    difficulty: "intermediate",
    tags: ["css", "responsive", "media-queries", "accessibility", "intermediate"],
    explanation: "prefers-color-scheme: dark/light mode. prefers-reduced-motion: motion sensitivity. prefers-contrast: contrast preferences. prefers-reduced-transparency: transparency preferences. These enable accessible, user-preference-aware designs.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "prefers-color-scheme (dark/light mode)", isCorrect: true, explanation: "Correct. Enables dark mode detection." },
      { id: "o2", text: "prefers-reduced-motion (accessibility)", isCorrect: true, explanation: "Correct. Essential for motion-sensitive users." },
      { id: "o3", text: "prefers-contrast (contrast preferences)", isCorrect: true, explanation: "Correct. Enables contrast adjustments." },
      { id: "o4", text: "device-width (not a preference feature)", isCorrect: false, explanation: "Incorrect. device-width is for viewport size, not preferences." }
    ]
  },
  {
    title: "What is the difference between 'min-width' and 'max-width' media queries? When should each be used?",
    content: "Media query direction affects responsive strategy. Explain min-width vs max-width and mobile-first vs desktop-first.",
    difficulty: "intermediate",
    tags: ["css", "responsive", "media-queries", "mobile-first", "intermediate"],
    explanation: "min-width: applies when viewport >= value (mobile-first). max-width: applies when viewport <= value (desktop-first). Mobile-first (min-width) is preferred: progressive enhancement, better performance. Desktop-first (max-width) is legacy approach.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "min-width: mobile-first (viewport >= X); max-width: desktop-first (viewport <= X)", isCorrect: true, explanation: "Correct. min-width is for mobile-first approach." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They work in opposite directions." },
      { id: "o3", text: "max-width is always better", isCorrect: false, explanation: "Incorrect. min-width (mobile-first) is generally preferred." },
      { id: "o4", text: "min-width only works on mobile", isCorrect: false, explanation: "Incorrect. min-width works on all devices." }
    ]
  },
  {
    title: "Explain 'object-fit' and 'object-position' properties. How do they control image/video display in containers?",
    content: "Media elements need proper fitting. Explain object-fit and object-position for responsive media.",
    difficulty: "intermediate",
    tags: ["css", "responsive", "images", "object-fit", "intermediate"],
    explanation: "object-fit: how content fits (fill, contain, cover, none, scale-down). object-position: where content is positioned (like background-position). Essential for responsive images in fixed containers. Prevents distortion, enables cropping/centering.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "object-fit: how content fits container; object-position: where content is positioned", isCorrect: true, explanation: "Correct. They control different aspects of media display." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They control different properties." },
      { id: "o3", text: "Only work with background images", isCorrect: false, explanation: "Incorrect. They work with img and video elements." },
      { id: "o4", text: "Require JavaScript", isCorrect: false, explanation: "Incorrect. They are pure CSS properties." }
    ]
  },
  {
    title: "Which CSS techniques enable responsive images without JavaScript? (Select all that apply)",
    content: "Responsive images are crucial for performance. Identify CSS-only techniques for responsive images.",
    difficulty: "intermediate",
    tags: ["css", "responsive", "images", "intermediate"],
    explanation: "<picture> element with <source> and media queries, <img srcset sizes>, CSS object-fit, max-width: 100%, aspect-ratio. All enable responsive images without JavaScript. Modern approach: use srcset/sizes or picture element.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "<picture> element with media queries", isCorrect: true, explanation: "Correct. Picture element enables responsive images." },
      { id: "o2", text: "srcset and sizes attributes", isCorrect: true, explanation: "Correct. srcset enables responsive images." },
      { id: "o3", text: "object-fit for container fitting", isCorrect: true, explanation: "Correct. object-fit helps with responsive display." },
      { id: "o4", text: "JavaScript resize handlers (not CSS-only)", isCorrect: false, explanation: "Incorrect. This requires JavaScript." }
    ]
  },
  {
    title: "What is the purpose of 'dvw', 'dvh', 'svw', 'svh' viewport units? How do they differ from 'vw' and 'vh'?",
    content: "Modern viewport units account for browser UI. Explain dynamic and small viewport units vs standard units.",
    difficulty: "difficult",
    tags: ["css", "responsive", "viewport-units", "difficult"],
    explanation: "vw/vh: viewport size (can change with browser UI). dvw/dvh: dynamic viewport (accounts for browser UI changes). svw/svh: small viewport (minimum size, ignores browser UI). lvw/lvh: large viewport (maximum size). Use dvw/dvh for mobile where browser UI shows/hides.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "dvw/dvh: dynamic (accounts for browser UI); svw/svh: small (minimum, ignores UI); vw/vh: standard", isCorrect: true, explanation: "Correct. New units handle browser UI better." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They handle browser UI differently." },
      { id: "o3", text: "Only work on desktop", isCorrect: false, explanation: "Incorrect. They're especially useful on mobile." },
      { id: "o4", text: "Are deprecated", isCorrect: false, explanation: "Incorrect. They're modern features for better mobile support." }
    ]
  },
  {
    title: "Explain 'container-type' and 'container-name' properties. How do they enable container queries?",
    content: "Container queries require container setup. Explain container-type and container-name for container queries.",
    difficulty: "difficult",
    tags: ["css", "responsive", "container-queries", "difficult"],
    explanation: "container-type: inline-size (queries width), size (queries width and height), normal (not a container). container-name: names container for @container queries. Must set container-type to enable container queries. Use @container (name) size queries.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "container-type: enables container queries (inline-size/size); container-name: names container for queries", isCorrect: true, explanation: "Correct. These properties enable container queries." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They serve different purposes." },
      { id: "o3", text: "Only work with media queries", isCorrect: false, explanation: "Incorrect. They enable container queries, not media queries." },
      { id: "o4", text: "Are deprecated", isCorrect: false, explanation: "Incorrect. They're modern features for container queries." }
    ]
  }
];

moreResponsive.forEach((q) => {
  newQuestions.push(createQuestion(3, q.title, q.content, "Responsive", q.difficulty, q.tags, q.explanation, q.points, q.options, q.type));
});

console.log(`✅ Added ${moreResponsive.length} more Responsive questions`);

// Continue writing...
allQuestions = [...existingQuestions, ...newQuestions];
fs.writeFileSync(questionsFile, JSON.stringify(allQuestions, null, 2));
console.log(`✅ Progress: ${allQuestions.length} total questions (${newQuestions.length} new)`);


