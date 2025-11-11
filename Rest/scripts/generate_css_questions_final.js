const fs = require('fs');
const path = require('path');

/**
 * Generates final CSS questions (Animations, Preprocessors, Performance, Architecture)
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/css-questions.json');
let questionCounter = 31;

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

console.log('Starting CSS questions generation (Final Part)...');
console.log(`Current question count: ${existingQuestions.length}`);
console.log(`Starting from question ID counter: ${questionCounter}\n`);

// TOPIC 4: Animations (10 questions)
console.log('Generating Animations questions...');
const animations = [
  {
    title: "Explain the difference between CSS 'transition' and 'animation'. When should each be used?",
    content: "CSS provides two animation mechanisms. Explain transitions vs animations and their use cases.",
    difficulty: "intermediate",
    tags: ["css", "animations", "transitions", "intermediate"],
    explanation: "transition: simple state changes (hover, focus), single property changes, triggered by state. animation: complex multi-step animations, keyframe-based, can loop/reverse, more control. Use transition for simple changes, animation for complex sequences.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "transition: simple state changes; animation: complex keyframe sequences", isCorrect: true, explanation: "Correct. Transitions are simpler, animations more powerful." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They serve different purposes." },
      { id: "o3", text: "transition is deprecated", isCorrect: false, explanation: "Incorrect. Both are valid and useful." },
      { id: "o4", text: "animation only works with JavaScript", isCorrect: false, explanation: "Incorrect. CSS animations are pure CSS." }
    ]
  },
  {
    title: "Which properties can be animated in CSS? (Select all that apply)",
    content: "Not all CSS properties are animatable. Identify which properties can be animated smoothly.",
    difficulty: "intermediate",
    tags: ["css", "animations", "properties", "intermediate"],
    explanation: "Animatable: transform, opacity, color, background-color, width, height, margin, padding, border-radius, etc. Non-animatable: display, position (static/relative/absolute), font-family, z-index (discrete). Transform and opacity are most performant (GPU-accelerated).",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "transform (GPU-accelerated, performant)", isCorrect: true, explanation: "Correct. transform is highly performant." },
      { id: "o2", text: "opacity (GPU-accelerated, performant)", isCorrect: true, explanation: "Correct. opacity is highly performant." },
      { id: "o3", text: "display (not animatable)", isCorrect: false, explanation: "Incorrect. display cannot be animated." },
      { id: "o4", text: "color (animatable)", isCorrect: true, explanation: "Correct. color can be animated." }
    ]
  },
  {
    title: "What is the purpose of 'will-change' property? When should it be used?",
    content: "Performance optimization for animations. Explain will-change and best practices for usage.",
    difficulty: "difficult",
    tags: ["css", "animations", "performance", "will-change", "difficult"],
    explanation: "will-change hints browser about upcoming changes, enables optimization (GPU layer promotion). Use sparingly: only when animation is about to start, remove after. Overuse causes memory issues. Better to use only when needed, not preemptively.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Hints browser about upcoming changes for optimization; use sparingly, remove after animation", isCorrect: true, explanation: "Correct. will-change should be used carefully." },
      { id: "o2", text: "Should be applied to all animated elements", isCorrect: false, explanation: "Incorrect. Overuse causes performance issues." },
      { id: "o3", text: "Is required for all animations", isCorrect: false, explanation: "Incorrect. Most animations work fine without it." },
      { id: "o4", text: "Prevents animations from running", isCorrect: false, explanation: "Incorrect. will-change optimizes animations." }
    ]
  },
  {
    title: "Explain 'animation-fill-mode' property. What do 'forwards', 'backwards', and 'both' mean?",
    content: "Animation fill modes control element state before/after animation. Explain the different fill modes.",
    difficulty: "intermediate",
    tags: ["css", "animations", "fill-mode", "intermediate"],
    explanation: "none: no styles before/after. forwards: keeps final keyframe styles after animation. backwards: applies first keyframe styles before delay. both: forwards + backwards. Useful for maintaining animation end state or starting state during delay.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "forwards: keep final styles; backwards: apply first styles during delay; both: combine both", isCorrect: true, explanation: "Correct. fill-mode controls pre/post animation styles." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They control different aspects." },
      { id: "o3", text: "forwards prevents animation", isCorrect: false, explanation: "Incorrect. forwards maintains end state." },
      { id: "o4", text: "backwards only works with JavaScript", isCorrect: false, explanation: "Incorrect. fill-mode is pure CSS." }
    ]
  },
  {
    title: "Which animation properties affect performance? (Select all that apply)",
    content: "Animation performance matters for smooth UX. Identify properties that impact animation performance.",
    difficulty: "intermediate",
    tags: ["css", "animations", "performance", "intermediate"],
    explanation: "Properties: transform and opacity are GPU-accelerated (best). width, height, margin, padding trigger layout (slow). background-color triggers paint (medium). Use transform/opacity when possible. Avoid animating layout-triggering properties.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "transform (GPU-accelerated, best performance)", isCorrect: true, explanation: "Correct. transform is highly performant." },
      { id: "o2", text: "opacity (GPU-accelerated, best performance)", isCorrect: true, explanation: "Correct. opacity is highly performant." },
      { id: "o3", text: "width/height (triggers layout, slower)", isCorrect: true, explanation: "Correct. Layout-triggering properties are slower." },
      { id: "o4", text: "All properties have equal performance", isCorrect: false, explanation: "Incorrect. Performance varies significantly." }
    ]
  },
  {
    title: "What is the difference between 'transform: translate()' and changing 'left/top' properties for animation?",
    content: "Positioning animations can be done multiple ways. Explain why transform is preferred over position properties.",
    difficulty: "intermediate",
    tags: ["css", "animations", "transform", "performance", "intermediate"],
    explanation: "transform: translate() uses GPU, doesn't trigger layout, smoother. left/top: triggers layout recalculation, repaint, slower. Transform is composited on GPU layer. Position properties cause reflow. Always prefer transform for animations.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "transform: GPU-accelerated, no layout; left/top: triggers layout, slower", isCorrect: true, explanation: "Correct. transform is much more performant." },
      { id: "o2", text: "They are identical in performance", isCorrect: false, explanation: "Incorrect. transform is significantly faster." },
      { id: "o3", text: "left/top is always better", isCorrect: false, explanation: "Incorrect. transform is preferred for animations." },
      { id: "o4", text: "transform only works with JavaScript", isCorrect: false, explanation: "Incorrect. CSS transform is pure CSS." }
    ]
  },
  {
    title: "Explain 'prefers-reduced-motion' media query. How should animations respect user preferences?",
    content: "Accessibility requires respecting user motion preferences. Explain prefers-reduced-motion and implementation.",
    difficulty: "intermediate",
    tags: ["css", "animations", "accessibility", "prefers-reduced-motion", "intermediate"],
    explanation: "prefers-reduced-motion: user prefers less animation (accessibility setting). Should disable or reduce animations. Use @media (prefers-reduced-motion: reduce) to disable animations. Essential for accessibility, prevents motion sickness, respects user choice.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Detects user preference for reduced motion; should disable/reduce animations for accessibility", isCorrect: true, explanation: "Correct. Essential for accessibility." },
      { id: "o2", text: "Increases animation speed", isCorrect: false, explanation: "Incorrect. It detects preference to reduce motion." },
      { id: "o3", text: "Is optional and not important", isCorrect: false, explanation: "Incorrect. It's important for accessibility." },
      { id: "o4", text: "Only works on mobile devices", isCorrect: false, explanation: "Incorrect. Works on all devices with the setting." }
    ]
  },
  {
    title: "What is the purpose of 'animation-timing-function'? Explain 'ease', 'linear', and 'cubic-bezier()'.",
    content: "Timing functions control animation speed curves. Explain different timing functions and their effects.",
    difficulty: "intermediate",
    tags: ["css", "animations", "timing-function", "intermediate"],
    explanation: "Timing function controls speed curve: ease (slow-fast-slow, default), linear (constant speed), ease-in (slow start), ease-out (slow end), ease-in-out (slow both ends), cubic-bezier() (custom curve). Creates natural-feeling motion.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Controls animation speed curve; ease: slow-fast-slow; linear: constant; cubic-bezier: custom", isCorrect: true, explanation: "Correct. Timing functions create motion curves." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They create different motion feels." },
      { id: "o3", text: "Controls animation duration", isCorrect: false, explanation: "Incorrect. animation-duration controls duration." },
      { id: "o4", text: "Only works with JavaScript", isCorrect: false, explanation: "Incorrect. Timing functions are pure CSS." }
    ]
  },
  {
    title: "Which properties should be animated together for best performance? (Select all that apply)",
    content: "Grouping animated properties affects performance. Identify best practices for property grouping.",
    difficulty: "intermediate",
    tags: ["css", "animations", "performance", "intermediate"],
    explanation: "Group GPU-accelerated properties (transform, opacity) together. Avoid mixing layout properties (width, margin) with transform. Animate transform properties together (translate, rotate, scale). Keep animations on same composite layer.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "transform properties together (translate, rotate, scale)", isCorrect: true, explanation: "Correct. Transform properties work well together." },
      { id: "o2", text: "opacity with transform (both GPU-accelerated)", isCorrect: true, explanation: "Correct. Both are performant together." },
      { id: "o3", text: "width with transform (mixing layout and composite)", isCorrect: false, explanation: "Incorrect. Mixing layout and composite hurts performance." },
      { id: "o4", text: "All properties should always be animated separately", isCorrect: false, explanation: "Incorrect. Grouping compatible properties is better." }
    ]
  },
  {
    title: "Explain 'transform-origin' property. How does it affect rotation and scaling?",
    content: "Transform origin controls the point around which transformations occur. Explain its purpose and usage.",
    difficulty: "intermediate",
    tags: ["css", "animations", "transform", "intermediate"],
    explanation: "transform-origin sets the point for transform operations (rotate, scale, skew). Default: center (50% 50%). Can be keywords (top, left, center) or coordinates. Affects where element rotates/scales from. Essential for natural-looking animations.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Sets the point for transform operations (rotate/scale); default is center", isCorrect: true, explanation: "Correct. transform-origin controls transformation point." },
      { id: "o2", text: "Controls animation speed", isCorrect: false, explanation: "Incorrect. It controls transformation point, not speed." },
      { id: "o3", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. transform-origin is a standard property." },
      { id: "o4", text: "Only works with JavaScript", isCorrect: false, explanation: "Incorrect. transform-origin is pure CSS." }
    ]
  }
];

animations.forEach((q) => {
  newQuestions.push(createQuestion(4, q.title, q.content, "Animations", q.difficulty, q.tags, q.explanation, q.points, q.options, q.type));
});

console.log(`✅ Generated ${animations.length} Animations questions`);

// TOPIC 5: Preprocessors (10 questions)
console.log('Generating Preprocessors questions...');
const preprocessors = [
  {
    title: "What is the main advantage of SASS/SCSS over plain CSS? (Select all that apply)",
    content: "CSS preprocessors add features. Identify the main advantages SASS provides over vanilla CSS.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "sass", "intermediate"],
    explanation: "SASS advantages: variables, nesting, mixins, functions, partials/modularity, inheritance (@extend), operators. Enables DRY code, better organization, maintainability. Compiles to CSS.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "Variables (reusable values)", isCorrect: true, explanation: "Correct. Variables enable DRY code." },
      { id: "o2", text: "Nesting (hierarchical structure)", isCorrect: true, explanation: "Correct. Nesting improves organization." },
      { id: "o3", text: "Mixins (reusable code blocks)", isCorrect: true, explanation: "Correct. Mixins enable code reuse." },
      { id: "o4", text: "Native browser support (no compilation needed)", isCorrect: false, explanation: "Incorrect. SASS requires compilation to CSS." }
    ]
  },
  {
    title: "Explain the difference between SASS and SCSS syntax. When should each be used?",
    content: "SASS has two syntaxes. Explain the differences and use cases for each.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "sass", "scss", "intermediate"],
    explanation: "SCSS: CSS-like syntax, uses braces and semicolons, easier migration from CSS. SASS: indented syntax, no braces/semicolons, more concise. SCSS is more popular, easier for teams. SASS is more concise but less familiar.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "SCSS: CSS-like with braces; SASS: indented syntax, more concise", isCorrect: true, explanation: "Correct. SCSS is more popular and familiar." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They have different syntaxes." },
      { id: "o3", text: "SASS is deprecated", isCorrect: false, explanation: "Incorrect. Both syntaxes are valid." },
      { id: "o4", text: "SCSS only works with JavaScript", isCorrect: false, explanation: "Incorrect. SCSS is a CSS preprocessor." }
    ]
  },
  {
    title: "What is the purpose of PostCSS? How does it differ from SASS/LESS?",
    content: "PostCSS is a different type of CSS tool. Explain its purpose and how it compares to preprocessors.",
    difficulty: "difficult",
    tags: ["css", "preprocessors", "postcss", "difficult"],
    explanation: "PostCSS: CSS transformer (not preprocessor), plugin-based, processes CSS with JavaScript. SASS/LESS: preprocessors, compile to CSS. PostCSS can add features (autoprefixer, nesting), optimize, lint. More flexible, modern approach. Often used with preprocessors.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "PostCSS: CSS transformer with plugins; SASS/LESS: preprocessors that compile to CSS", isCorrect: true, explanation: "Correct. PostCSS is more flexible and plugin-based." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. PostCSS is a transformer, not a preprocessor." },
      { id: "o3", text: "PostCSS replaces all preprocessors", isCorrect: false, explanation: "Incorrect. They can work together." },
      { id: "o4", text: "PostCSS only works with React", isCorrect: false, explanation: "Incorrect. PostCSS is framework-agnostic." }
    ]
  },
  {
    title: "Which SASS features help with code organization? (Select all that apply)",
    content: "SASS provides organizational features. Identify features that improve CSS code structure.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "sass", "organization", "intermediate"],
    explanation: "Partials (@import/_file.scss): modular files. @use/@forward: modern module system. Nesting: hierarchical structure. Mixins: reusable blocks. Functions: reusable logic. All help organize and maintain CSS.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "Partials (@import, @use) for modular files", isCorrect: true, explanation: "Correct. Partials enable modular organization." },
      { id: "o2", text: "Nesting for hierarchical structure", isCorrect: true, explanation: "Correct. Nesting improves organization." },
      { id: "o3", text: "Mixins for reusable code", isCorrect: true, explanation: "Correct. Mixins enable code reuse." },
      { id: "o4", text: "Inline styles (not a SASS feature)", isCorrect: false, explanation: "Incorrect. This is not a SASS organizational feature." }
    ]
  },
  {
    title: "Explain SASS '@extend' vs '@mixin'. When should each be used?",
    content: "SASS provides two code reuse mechanisms. Explain extend vs mixin and their trade-offs.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "sass", "extend", "mixin", "intermediate"],
    explanation: "@extend: shares selector (groups selectors), less CSS output, but can create specificity issues, less flexible. @mixin: duplicates code (more output), more flexible with parameters, clearer intent. Prefer @mixin for flexibility, @extend for simple sharing.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "@extend: shares selector; @mixin: duplicates code with parameters (more flexible)", isCorrect: true, explanation: "Correct. Mixins are generally more flexible." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They work differently." },
      { id: "o3", text: "@extend is always better", isCorrect: false, explanation: "Incorrect. Mixins are often preferred for flexibility." },
      { id: "o4", text: "@mixin is deprecated", isCorrect: false, explanation: "Incorrect. Both are valid and useful." }
    ]
  },
  {
    title: "What is the purpose of 'autoprefixer' in PostCSS? How does it help with browser compatibility?",
    content: "Browser prefixes are tedious. Explain autoprefixer and how it automates vendor prefixing.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "postcss", "autoprefixer", "intermediate"],
    explanation: "autoprefixer: PostCSS plugin that automatically adds vendor prefixes (-webkit-, -moz-, -ms-) based on browser support data. Write modern CSS, autoprefixer adds needed prefixes. Keeps CSS clean, ensures compatibility, uses Can I Use data.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Automatically adds vendor prefixes based on browser support data", isCorrect: true, explanation: "Correct. autoprefixer automates prefixing." },
      { id: "o2", text: "Removes all prefixes", isCorrect: false, explanation: "Incorrect. It adds prefixes, not removes them." },
      { id: "o3", text: "Only works with SASS", isCorrect: false, explanation: "Incorrect. autoprefixer works with any CSS." },
      { id: "o4", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. autoprefixer is widely used." }
    ]
  },
  {
    title: "Which LESS features are similar to SASS? (Select all that apply)",
    content: "LESS is another CSS preprocessor. Identify features it shares with SASS.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "less", "intermediate"],
    explanation: "Both LESS and SASS provide: variables, nesting, mixins, functions, imports. SASS has more features (extend, advanced functions). LESS can run in browser (JavaScript), SASS requires compilation. Both compile to CSS.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "Variables", isCorrect: true, explanation: "Correct. Both support variables." },
      { id: "o2", text: "Nesting", isCorrect: true, explanation: "Correct. Both support nesting." },
      { id: "o3", text: "Mixins", isCorrect: true, explanation: "Correct. Both support mixins." },
      { id: "o4", text: "Native browser support without compilation", isCorrect: false, explanation: "Incorrect. Both require compilation (though LESS can run client-side)." }
    ]
  },
  {
    title: "Explain CSS custom properties (CSS variables). How do they differ from SASS variables?",
    content: "CSS now has native variables. Explain CSS custom properties vs SASS variables and when to use each.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "css-variables", "custom-properties", "intermediate"],
    explanation: "CSS custom properties: native CSS, runtime values (can change with JS), cascade, scoped. SASS variables: compile-time, static, no runtime access. Use CSS variables for theming, dynamic values. Use SASS for compile-time constants, calculations.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "CSS variables: runtime, dynamic, cascade; SASS: compile-time, static", isCorrect: true, explanation: "Correct. CSS variables are more powerful for dynamic theming." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. CSS variables are runtime, SASS is compile-time." },
      { id: "o3", text: "SASS variables are always better", isCorrect: false, explanation: "Incorrect. CSS variables enable dynamic theming." },
      { id: "o4", text: "CSS variables require a preprocessor", isCorrect: false, explanation: "Incorrect. CSS variables are native CSS." }
    ]
  },
  {
    title: "What is the purpose of 'cssnano' in PostCSS? How does it optimize CSS?",
    content: "CSS optimization tools reduce file size. Explain cssnano and its optimization techniques.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "postcss", "cssnano", "optimization", "intermediate"],
    explanation: "cssnano: PostCSS plugin that minifies CSS. Removes whitespace, comments, unused rules, optimizes values, merges rules. Reduces file size significantly. Essential for production builds. Part of modern build pipelines.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Minifies CSS: removes whitespace, comments, optimizes values for smaller file size", isCorrect: true, explanation: "Correct. cssnano optimizes CSS for production." },
      { id: "o2", text: "Adds vendor prefixes", isCorrect: false, explanation: "Incorrect. That's autoprefixer." },
      { id: "o3", text: "Compiles SASS to CSS", isCorrect: false, explanation: "Incorrect. cssnano minifies already-compiled CSS." },
      { id: "o4", text: "Only works with LESS", isCorrect: false, explanation: "Incorrect. cssnano works with any CSS." }
    ]
  },
  {
    title: "Which SASS functions are useful for color manipulation? (Select all that apply)",
    content: "SASS provides color functions. Identify functions that help manipulate colors programmatically.",
    difficulty: "intermediate",
    tags: ["css", "preprocessors", "sass", "colors", "functions", "intermediate"],
    explanation: "SASS color functions: lighten(), darken(), saturate(), desaturate(), fade-in(), fade-out(), mix(), adjust-color(), scale-color(). Enable programmatic color manipulation, theming, variations. Very useful for design systems.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "lighten() / darken() (adjust lightness)", isCorrect: true, explanation: "Correct. These adjust color brightness." },
      { id: "o2", text: "saturate() / desaturate() (adjust saturation)", isCorrect: true, explanation: "Correct. These adjust color intensity." },
      { id: "o3", text: "mix() (blend colors)", isCorrect: true, explanation: "Correct. mix() blends two colors." },
      { id: "o4", text: "compile() (not a color function)", isCorrect: false, explanation: "Incorrect. This is not a color manipulation function." }
    ]
  }
];

preprocessors.forEach((q) => {
  newQuestions.push(createQuestion(5, q.title, q.content, "Preprocessors", q.difficulty, q.tags, q.explanation, q.points, q.options, q.type));
});

console.log(`✅ Generated ${preprocessors.length} Preprocessors questions`);

// Continue with Performance and Architecture in the same file...
// Writing intermediate progress
let allQuestions = [...existingQuestions, ...newQuestions];
fs.writeFileSync(questionsFile, JSON.stringify(allQuestions, null, 2));
console.log(`✅ Intermediate save: ${allQuestions.length} questions`);

// TOPIC 6: Performance (10 questions)
console.log('Generating Performance questions...');
const performance = [
  {
    title: "What is Critical CSS? How does it improve page load performance?",
    content: "Performance optimization requires understanding Critical CSS. Explain its purpose and implementation.",
    difficulty: "intermediate",
    tags: ["css", "performance", "critical-css", "intermediate"],
    explanation: "Critical CSS: above-the-fold styles needed for initial render. Inline in <head> to avoid render-blocking. Remaining CSS loads asynchronously. Improves First Contentful Paint (FCP), reduces render-blocking. Essential for performance.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Above-the-fold styles inlined in head; improves First Contentful Paint", isCorrect: true, explanation: "Correct. Critical CSS reduces render-blocking." },
      { id: "o2", text: "All CSS in one file", isCorrect: false, explanation: "Incorrect. Critical CSS is only above-the-fold styles." },
      { id: "o3", text: "CSS loaded after page render", isCorrect: false, explanation: "Incorrect. Critical CSS loads first, inline." },
      { id: "o4", text: "Only needed for mobile", isCorrect: false, explanation: "Incorrect. Critical CSS helps on all devices." }
    ]
  },
  {
    title: "Which techniques reduce CSS file size? (Select all that apply)",
    content: "Smaller CSS files load faster. Identify techniques that reduce CSS file size.",
    difficulty: "intermediate",
    tags: ["css", "performance", "optimization", "intermediate"],
    explanation: "Minification (remove whitespace, comments), unused CSS removal (PurgeCSS), compression (gzip/brotli), code splitting, removing duplicate rules, using shorthand properties, avoiding !important overuse.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "Minification (remove whitespace, comments)", isCorrect: true, explanation: "Correct. Minification reduces file size." },
      { id: "o2", text: "Unused CSS removal (PurgeCSS)", isCorrect: true, explanation: "Correct. Removing unused CSS reduces size." },
      { id: "o3", text: "Compression (gzip, brotli)", isCorrect: true, explanation: "Correct. Compression reduces transfer size." },
      { id: "o4", text: "Adding more comments", isCorrect: false, explanation: "Incorrect. Comments increase file size." }
    ]
  },
  {
    title: "Explain CSS loading strategies. What is the difference between render-blocking and non-blocking CSS?",
    content: "CSS loading affects page performance. Explain render-blocking vs non-blocking CSS and optimization strategies.",
    difficulty: "intermediate",
    tags: ["css", "performance", "loading", "intermediate"],
    explanation: "Render-blocking: CSS in <head> blocks HTML parsing until loaded (default). Non-blocking: load asynchronously (media='print' then switch, or load via JS). Critical CSS inline, non-critical async. Improves Time to First Byte, FCP.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Render-blocking: blocks parsing (default); Non-blocking: async loading for non-critical CSS", isCorrect: true, explanation: "Correct. Non-blocking improves performance." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They affect performance differently." },
      { id: "o3", text: "All CSS should be render-blocking", isCorrect: false, explanation: "Incorrect. Non-critical CSS should load async." },
      { id: "o4", text: "Non-blocking CSS doesn't work", isCorrect: false, explanation: "Incorrect. Non-blocking CSS is a valid optimization." }
    ]
  },
  {
    title: "What is the purpose of 'content-visibility' property? How does it improve rendering performance?",
    content: "Modern CSS provides rendering optimizations. Explain content-visibility and its performance benefits.",
    difficulty: "difficult",
    tags: ["css", "performance", "content-visibility", "difficult"],
    explanation: "content-visibility: auto skips rendering off-screen content until needed. Significantly improves initial render for long pages. Similar to lazy loading but for rendering. Use on sections that are initially off-screen. Limited browser support.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Skips rendering off-screen content until needed; improves initial render performance", isCorrect: true, explanation: "Correct. content-visibility optimizes rendering." },
      { id: "o2", text: "Hides content permanently", isCorrect: false, explanation: "Incorrect. It defers rendering, doesn't hide." },
      { id: "o3", text: "Only works with JavaScript", isCorrect: false, explanation: "Incorrect. content-visibility is pure CSS." },
      { id: "o4", text: "Increases rendering time", isCorrect: false, explanation: "Incorrect. It reduces rendering time." }
    ]
  },
  {
    title: "Which CSS properties trigger expensive layout recalculations? (Select all that apply)",
    content: "Layout performance matters. Identify properties that trigger layout (reflow) and should be avoided in animations.",
    difficulty: "intermediate",
    tags: ["css", "performance", "layout", "reflow", "intermediate"],
    explanation: "Layout-triggering properties: width, height, margin, padding, border, display, position (static/relative), top/left/right/bottom, font-size, line-height. These cause reflow (expensive). Use transform/opacity for animations instead.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "width / height (triggers layout)", isCorrect: true, explanation: "Correct. These trigger expensive layout." },
      { id: "o2", text: "margin / padding (triggers layout)", isCorrect: true, explanation: "Correct. These trigger layout recalculation." },
      { id: "o3", text: "transform (GPU-accelerated, no layout)", isCorrect: false, explanation: "Incorrect. transform doesn't trigger layout." },
      { id: "o4", text: "opacity (GPU-accelerated, no layout)", isCorrect: false, explanation: "Incorrect. opacity doesn't trigger layout." }
    ]
  },
  {
    title: "Explain CSS containment. How does 'contain' property optimize rendering?",
    content: "CSS containment is a performance feature. Explain the contain property and its optimization benefits.",
    difficulty: "difficult",
    tags: ["css", "performance", "containment", "difficult"],
    explanation: "contain: isolates element's rendering (layout, style, paint, size). Prevents changes from affecting outside. Optimizes: layout (contain: layout), paint (contain: paint), style recalculation. Use on isolated components. Improves performance for complex pages.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Isolates element rendering; prevents changes from affecting outside; optimizes layout/paint", isCorrect: true, explanation: "Correct. Containment optimizes rendering scope." },
      { id: "o2", text: "Hides the element", isCorrect: false, explanation: "Incorrect. contain optimizes, doesn't hide." },
      { id: "o3", text: "Only works with Flexbox", isCorrect: false, explanation: "Incorrect. contain works with any layout." },
      { id: "o4", text: "Increases rendering cost", isCorrect: false, explanation: "Incorrect. contain reduces rendering cost." }
    ]
  },
  {
    title: "What is the difference between 'will-change' and 'contain' for performance optimization?",
    content: "Both properties optimize performance. Explain when to use will-change vs contain and their different purposes.",
    difficulty: "difficult",
    tags: ["css", "performance", "will-change", "contain", "difficult"],
    explanation: "will-change: hints about upcoming changes, promotes to GPU layer, use for animations about to start. contain: isolates rendering scope, prevents cascade effects, use for isolated components. Different purposes: will-change for animations, contain for isolation.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "will-change: animation optimization; contain: rendering isolation for components", isCorrect: true, explanation: "Correct. They optimize different aspects." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They serve different optimization purposes." },
      { id: "o3", text: "contain is deprecated", isCorrect: false, explanation: "Incorrect. Both are modern features." },
      { id: "o4", text: "will-change isolates rendering", isCorrect: false, explanation: "Incorrect. That's contain's purpose." }
    ]
  },
  {
    title: "Which strategies improve CSS delivery performance? (Select all that apply)",
    content: "CSS delivery affects page load. Identify strategies that improve CSS loading and rendering performance.",
    difficulty: "intermediate",
    tags: ["css", "performance", "delivery", "intermediate"],
    explanation: "Critical CSS inline, non-critical async, HTTP/2 server push, preload for critical CSS, code splitting, CDN delivery, compression (gzip/brotli), remove unused CSS, minification.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "Critical CSS inline in <head>", isCorrect: true, explanation: "Correct. Inline critical CSS reduces render-blocking." },
      { id: "o2", text: "Preload for critical CSS files", isCorrect: true, explanation: "Correct. Preload prioritizes critical resources." },
      { id: "o3", text: "Code splitting (separate CSS per route)", isCorrect: true, explanation: "Correct. Code splitting reduces initial payload." },
      { id: "o4", text: "Load all CSS synchronously", isCorrect: false, explanation: "Incorrect. Async loading is better for non-critical CSS." }
    ]
  },
  {
    title: "Explain 'font-display' property. How does it affect font loading performance?",
    content: "Web fonts can block rendering. Explain font-display and its impact on performance and user experience.",
    difficulty: "intermediate",
    tags: ["css", "performance", "fonts", "font-display", "intermediate"],
    explanation: "font-display controls font rendering: block (invisible until loaded, FOIT), swap (show fallback immediately, FOUT), fallback (short block then swap), optional (only if cached). swap is best for performance, prevents invisible text.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Controls font rendering strategy; swap shows fallback immediately (best for performance)", isCorrect: true, explanation: "Correct. swap prevents invisible text." },
      { id: "o2", text: "Controls font file size", isCorrect: false, explanation: "Incorrect. font-display controls rendering, not file size." },
      { id: "o3", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. font-display is a modern, important feature." },
      { id: "o4", text: "Only works with system fonts", isCorrect: false, explanation: "Incorrect. font-display works with web fonts." }
    ]
  },
  {
    title: "What is the purpose of CSS 'contain: layout'? How does it optimize layout calculations?",
    content: "Layout containment is a performance feature. Explain contain: layout and its optimization benefits.",
    difficulty: "intermediate",
    tags: ["css", "performance", "containment", "layout", "intermediate"],
    explanation: "contain: layout isolates element's layout calculations. Changes inside don't affect outside layout. Browser can skip layout calculations for outside elements. Use on isolated components. Improves performance for complex layouts.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Isolates layout calculations; changes inside don't affect outside; optimizes performance", isCorrect: true, explanation: "Correct. Layout containment optimizes calculations." },
      { id: "o2", text: "Prevents layout from working", isCorrect: false, explanation: "Incorrect. It optimizes layout, doesn't prevent it." },
      { id: "o3", text: "Only works with Grid", isCorrect: false, explanation: "Incorrect. contain works with any layout method." },
      { id: "o4", text: "Increases layout calculations", isCorrect: false, explanation: "Incorrect. It reduces layout calculations." }
    ]
  }
];

performance.forEach((q) => {
  newQuestions.push(createQuestion(6, q.title, q.content, "Performance", q.difficulty, q.tags, q.explanation, q.points, q.options, q.type));
});

console.log(`✅ Generated ${performance.length} Performance questions`);

// TOPIC 7: Architecture (10 questions)
console.log('Generating Architecture questions...');
const architecture = [
  {
    title: "Explain BEM methodology. What do Block, Element, and Modifier mean?",
    content: "CSS architecture requires methodologies. Explain BEM naming convention and its structure.",
    difficulty: "intermediate",
    tags: ["css", "architecture", "bem", "methodology", "intermediate"],
    explanation: "BEM: Block__Element--Modifier. Block: standalone component (button). Element: part of block (button__icon). Modifier: variation (button--primary). Naming: .block__element--modifier. Benefits: clear structure, avoids specificity issues, self-documenting.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Block__Element--Modifier: component, part, variation; clear naming structure", isCorrect: true, explanation: "Correct. BEM provides clear, maintainable naming." },
      { id: "o2", text: "Only works with SASS", isCorrect: false, explanation: "Incorrect. BEM works with any CSS." },
      { id: "o3", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. BEM is widely used." },
      { id: "o4", text: "Requires JavaScript", isCorrect: false, explanation: "Incorrect. BEM is a CSS naming convention." }
    ]
  },
  {
    title: "Which CSS architecture methodologies exist? (Select all that apply)",
    content: "CSS organization requires methodologies. Identify popular CSS architecture approaches.",
    difficulty: "intermediate",
    tags: ["css", "architecture", "methodologies", "intermediate"],
    explanation: "BEM (Block Element Modifier), OOCSS (Object-Oriented), SMACSS (Scalable and Modular), ITCSS (Inverted Triangle), Atomic CSS, Utility-first (Tailwind approach). Each has different organization principles.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "BEM (Block Element Modifier)", isCorrect: true, explanation: "Correct. BEM is a popular methodology." },
      { id: "o2", text: "OOCSS (Object-Oriented CSS)", isCorrect: true, explanation: "Correct. OOCSS is a methodology." },
      { id: "o3", text: "SMACSS (Scalable and Modular)", isCorrect: true, explanation: "Correct. SMACSS is a methodology." },
      { id: "o4", text: "Inline styles (not a methodology)", isCorrect: false, explanation: "Incorrect. This is not a CSS architecture methodology." }
    ]
  },
  {
    title: "What is the purpose of ITCSS? How does it organize CSS layers?",
    content: "ITCSS provides a layered CSS architecture. Explain its inverted triangle structure and layer organization.",
    difficulty: "difficult",
    tags: ["css", "architecture", "itcss", "difficult"],
    explanation: "ITCSS: Inverted Triangle CSS. Layers (bottom to top): Settings (variables), Tools (mixins), Generic (resets), Elements (base styles), Objects (layout), Components (UI), Utilities (helpers). Specificity increases upward. Prevents specificity conflicts.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Organizes CSS in layers from generic to specific; prevents specificity conflicts", isCorrect: true, explanation: "Correct. ITCSS provides layered architecture." },
      { id: "o2", text: "Only works with PostCSS", isCorrect: false, explanation: "Incorrect. ITCSS is a methodology, not a tool." },
      { id: "o3", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. ITCSS is a valid methodology." },
      { id: "o4", text: "Requires JavaScript", isCorrect: false, explanation: "Incorrect. ITCSS is a CSS organization method." }
    ]
  },
  {
    title: "Explain OOCSS principles. What is separation of structure from skin?",
    content: "Object-Oriented CSS provides principles. Explain OOCSS and its core concepts.",
    difficulty: "intermediate",
    tags: ["css", "architecture", "oocss", "intermediate"],
    explanation: "OOCSS: Object-Oriented CSS. Principles: 1) Separate structure (layout) from skin (visual), 2) Separate container from content. Reusable objects, avoid location-dependent styles. Enables code reuse, maintainability. Example: .button (structure) + .button-primary (skin).",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Separates structure (layout) from skin (visual); enables reusable objects", isCorrect: true, explanation: "Correct. OOCSS promotes reusability." },
      { id: "o2", text: "Only works with classes", isCorrect: false, explanation: "Incorrect. OOCSS is a principle, works with any selectors." },
      { id: "o3", text: "Is deprecated", isCorrect: false, explanation: "Incorrect. OOCSS principles are still valid." },
      { id: "o4", text: "Requires SASS", isCorrect: false, explanation: "Incorrect. OOCSS works with plain CSS." }
    ]
  },
  {
    title: "Which strategies help organize large CSS codebases? (Select all that apply)",
    content: "Large projects need organization. Identify strategies for managing complex CSS codebases.",
    difficulty: "intermediate",
    tags: ["css", "architecture", "organization", "intermediate"],
    explanation: "Modular files (partials), naming conventions (BEM), component-based organization, utility classes, CSS-in-JS (for component frameworks), design tokens, style guides, documentation. All help maintain large codebases.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "Modular files (partials, components)", isCorrect: true, explanation: "Correct. Modularity improves organization." },
      { id: "o2", text: "Naming conventions (BEM, etc.)", isCorrect: true, explanation: "Correct. Consistent naming helps maintainability." },
      { id: "o3", text: "Component-based organization", isCorrect: true, explanation: "Correct. Component organization scales well." },
      { id: "o4", text: "One large CSS file (anti-pattern)", isCorrect: false, explanation: "Incorrect. Large files are hard to maintain." }
    ]
  },
  {
    title: "What is the difference between utility-first CSS (Tailwind) and component-based CSS?",
    content: "CSS approaches differ. Explain utility-first vs component-based CSS and their trade-offs.",
    difficulty: "difficult",
    tags: ["css", "architecture", "utility-first", "tailwind", "difficult"],
    explanation: "Utility-first: small utility classes (flex, p-4, text-center), compose in HTML, less custom CSS, faster development, larger HTML. Component-based: semantic classes, styles in CSS, more maintainable CSS, cleaner HTML. Tailwind is utility-first, BEM is component-based.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Utility-first: compose in HTML; Component-based: semantic classes in CSS", isCorrect: true, explanation: "Correct. Different approaches with different trade-offs." },
      { id: "o2", text: "They are identical", isCorrect: false, explanation: "Incorrect. They have fundamentally different approaches." },
      { id: "o3", text: "Utility-first is deprecated", isCorrect: false, explanation: "Incorrect. Utility-first is popular (Tailwind)." },
      { id: "o4", text: "Component-based only works with React", isCorrect: false, explanation: "Incorrect. Component-based CSS works with any framework." }
    ]
  },
  {
    title: "Explain CSS custom properties for theming. How do they enable dynamic themes?",
    content: "Theming requires flexible CSS. Explain how CSS custom properties enable dynamic theming systems.",
    difficulty: "intermediate",
    tags: ["css", "architecture", "theming", "css-variables", "intermediate"],
    explanation: "CSS custom properties (--variable) enable runtime theming. Define theme variables at :root, override in themes. Change with JavaScript (setProperty). Enables dark mode, user preferences, dynamic themes. More flexible than SASS variables (compile-time).",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Runtime variables enable dynamic theming; change with JS; supports dark mode, user preferences", isCorrect: true, explanation: "Correct. CSS variables enable dynamic theming." },
      { id: "o2", text: "Only works at compile time", isCorrect: false, explanation: "Incorrect. CSS variables work at runtime." },
      { id: "o3", text: "Requires SASS", isCorrect: false, explanation: "Incorrect. CSS custom properties are native CSS." },
      { id: "o4", text: "Cannot be changed dynamically", isCorrect: false, explanation: "Incorrect. CSS variables can be changed with JavaScript." }
    ]
  },
  {
    title: "Which file organization strategies work well for CSS? (Select all that apply)",
    content: "File structure affects maintainability. Identify effective CSS file organization strategies.",
    difficulty: "intermediate",
    tags: ["css", "architecture", "organization", "intermediate"],
    explanation: "Component-based (one file per component), feature-based (grouped by feature), layer-based (ITCSS), utility files (separate utilities), vendor files (third-party), main file (imports all). Choose based on project size and team preference.",
    points: 15,
    type: "multiple-select",
    options: [
      { id: "o1", text: "Component-based (one file per component)", isCorrect: true, explanation: "Correct. Component organization scales well." },
      { id: "o2", text: "Feature-based (grouped by feature)", isCorrect: true, explanation: "Correct. Feature organization works for large apps." },
      { id: "o3", text: "Layer-based (ITCSS approach)", isCorrect: true, explanation: "Correct. Layer organization prevents conflicts." },
      { id: "o4", text: "One massive file (anti-pattern)", isCorrect: false, explanation: "Incorrect. Large files are hard to maintain." }
    ]
  },
  {
    title: "What is the purpose of CSS design tokens? How do they improve consistency?",
    content: "Design systems use tokens. Explain CSS design tokens and their role in maintaining design consistency.",
    difficulty: "intermediate",
    tags: ["css", "architecture", "design-tokens", "intermediate"],
    explanation: "Design tokens: named values (colors, spacing, typography) stored as CSS variables. Single source of truth, ensures consistency, easy theming, maintainable. Example: --color-primary: #007bff. Used throughout codebase, changed in one place.",
    points: 15,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Named values (colors, spacing) as CSS variables; single source of truth for consistency", isCorrect: true, explanation: "Correct. Design tokens ensure consistency." },
      { id: "o2", text: "Only work with SASS", isCorrect: false, explanation: "Incorrect. Design tokens work with CSS variables." },
      { id: "o3", text: "Are deprecated", isCorrect: false, explanation: "Incorrect. Design tokens are modern best practice." },
      { id: "o4", text: "Require JavaScript", isCorrect: false, explanation: "Incorrect. Design tokens are CSS variables." }
    ]
  },
  {
    title: "Explain CSS specificity conflicts in large codebases. How do methodologies help prevent them?",
    content: "Specificity wars are a problem. Explain how CSS methodologies prevent specificity conflicts.",
    difficulty: "difficult",
    tags: ["css", "architecture", "specificity", "methodologies", "difficult"],
    explanation: "Large codebases: specificity conflicts, !important overuse, hard to override. Methodologies help: BEM (flat specificity), ITCSS (layered specificity), OOCSS (avoid nesting). Consistent naming, flat selectors, avoid deep nesting. Prevents specificity wars.",
    points: 20,
    type: "multiple-choice",
    options: [
      { id: "o1", text: "Methodologies provide flat specificity (BEM), layered structure (ITCSS) to prevent conflicts", isCorrect: true, explanation: "Correct. Methodologies prevent specificity issues." },
      { id: "o2", text: "Methodologies increase specificity conflicts", isCorrect: false, explanation: "Incorrect. They help prevent conflicts." },
      { id: "o3", text: "Specificity conflicts are unavoidable", isCorrect: false, explanation: "Incorrect. Methodologies help prevent them." },
      { id: "o4", text: "Only !important solves conflicts", isCorrect: false, explanation: "Incorrect. !important is an anti-pattern." }
    ]
  }
];

architecture.forEach((q) => {
  newQuestions.push(createQuestion(7, q.title, q.content, "Architecture", q.difficulty, q.tags, q.explanation, q.points, q.options, q.type));
});

console.log(`✅ Generated ${architecture.length} Architecture questions`);

// Final write
allQuestions = [...existingQuestions, ...newQuestions];
fs.writeFileSync(questionsFile, JSON.stringify(allQuestions, null, 2));

console.log(`\n✅ FINAL: Written ${allQuestions.length} total CSS questions to ${questionsFile}`);
console.log(`\n📊 Summary:`);
console.log(`   Basics: 10`);
console.log(`   Layout: 10`);
console.log(`   Responsive: 10`);
console.log(`   Animations: 10`);
console.log(`   Preprocessors: 10`);
console.log(`   Performance: 10`);
console.log(`   Architecture: 10`);
console.log(`   TOTAL: ${allQuestions.length} questions`);
console.log(`\n✅ All CSS questions generated successfully!`);


