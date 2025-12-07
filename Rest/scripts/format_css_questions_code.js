const fs = require('fs');
const path = require('path');

/**
 * Formats code snippets in CSS questions for better frontend display
 * Wraps code snippets in <code> tags and ensures proper formatting
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

// Patterns to identify code snippets
const codePatterns = [
  // CSS properties and values
  /\b(clamp|calc|var|min|max|rgba?|hsla?|url)\([^)]+\)/gi,
  // CSS selectors
  /(#[a-zA-Z][\w-]*|\.\w[\w-]*|\[[\w-]+(?:[=~|^$*]?=["']?[^"']*["']?)?\]|::?\w[\w-]*|:nth-\w+\([^)]*\))/g,
  // CSS at-rules
  /@(media|container|keyframes|import|charset|namespace|page|supports|document|font-face|viewport)\b[^{]*\{?/gi,
  // CSS functions
  /\b(translate|scale|rotate|skew|matrix|perspective|rotateX|rotateY|rotateZ)\([^)]*\)/gi,
  // CSS units and values
  /\b(\d+(?:\.\d+)?(?:px|em|rem|vh|vw|vmin|vmax|%|deg|rad|turn|s|ms|fr|ch|ex|cm|mm|in|pt|pc))\b/g,
  // CSS properties
  /\b(display|position|flex|grid|animation|transition|transform|filter|backdrop-filter|clip-path|mask|contain|content-visibility|will-change|aspect-ratio|object-fit|object-position|font-display|gap|grid-gap|flex-grow|flex-shrink|flex-basis|grid-column|grid-row|grid-area|grid-template|align-items|justify-content|align-content|align-self|justify-self|place-items|place-content|place-self)\s*:/gi,
  // HTML/CSS tags and attributes
  /<(style|link|script|pre|code)[^>]*>/gi,
  // File extensions
  /\.(css|scss|sass|less|styl|js|ts|jsx|tsx|html|htm)\b/gi,
  // CSS custom properties
  /--[\w-]+/g,
  // BEM notation
  /\.\w+__\w+(?:--\w+)?/g,
  // SASS/LESS syntax
  /(@mixin|@include|@extend|@function|@return|@if|@else|@for|@each|@while|@use|@forward|@import|@media|@supports)\b/gi,
];

// Function to wrap code snippets in <code> tags
function formatCodeInText(text) {
  if (!text || typeof text !== 'string') return text;

  // Skip if already contains code tags (to avoid double processing)
  if (text.includes('<code>')) return text;

  let formatted = text;
  const codeSnippets = new Set();

  // Find all code snippets
  codePatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const snippet = match[0];
      // Skip if already in code tags or backticks
      if (
        !snippet.includes('<code>') &&
        !snippet.includes('`') &&
        snippet.length > 0
      ) {
        codeSnippets.add(snippet);
      }
    }
  });

  // Sort by length (longest first) to avoid partial replacements
  const sortedSnippets = Array.from(codeSnippets).sort(
    (a, b) => b.length - a.length
  );

  // Track positions to avoid overlapping replacements
  const replacements = [];

  sortedSnippets.forEach(snippet => {
    // Escape HTML in the snippet
    const escaped = snippet
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Wrap in code tag
    const wrapped = `<code>${escaped}</code>`;

    // Find all occurrences
    const regex = new RegExp(
      snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'g'
    );
    let match;
    while ((match = regex.exec(formatted)) !== null) {
      // Check if this position is already inside a code tag
      const beforeMatch = formatted.substring(0, match.index);
      const openTags = (beforeMatch.match(/<code>/g) || []).length;
      const closeTags = (beforeMatch.match(/<\/code>/g) || []).length;

      // Only replace if not already inside a code tag
      if (openTags === closeTags) {
        replacements.push({
          index: match.index,
          length: match[0].length,
          replacement: wrapped,
        });
      }
    }
  });

  // Sort replacements by index (descending) to replace from end to start
  replacements.sort((a, b) => b.index - a.index);

  // Apply replacements
  replacements.forEach(({ index, length, replacement }) => {
    formatted =
      formatted.substring(0, index) +
      replacement +
      formatted.substring(index + length);
  });

  return formatted;
}

// Function to format a question object
function formatQuestion(question) {
  const formatted = { ...question };

  // Format title
  if (formatted.title) {
    formatted.title = formatCodeInText(formatted.title);
  }

  // Format content
  if (formatted.content) {
    formatted.content = formatCodeInText(formatted.content);
  }

  // Format explanation
  if (formatted.explanation) {
    formatted.explanation = formatCodeInText(formatted.explanation);
  }

  // Format options
  if (formatted.options && Array.isArray(formatted.options)) {
    formatted.options = formatted.options.map(option => ({
      ...option,
      text: formatCodeInText(option.text),
      explanation: option.explanation
        ? formatCodeInText(option.explanation)
        : option.explanation,
    }));
  }

  // Format hints
  if (formatted.hints && Array.isArray(formatted.hints)) {
    formatted.hints = formatted.hints.map(hint => formatCodeInText(hint));
  }

  return formatted;
}

console.log('🔍 Formatting code snippets in CSS questions...\n');

let formattedCount = 0;
const totalQuestions = questions.length;

questions = questions.map((question, index) => {
  const original = JSON.stringify(question);
  const formatted = formatQuestion(question);
  const changed = JSON.stringify(formatted) !== original;

  if (changed) {
    formattedCount++;
    if (formattedCount <= 5) {
      console.log(`✅ Formatted question ${question.id}`);
    }
  }

  return formatted;
});

if (formattedCount > 5) {
  console.log(`✅ ... and ${formattedCount - 5} more questions`);
}

// Write formatted questions back to file
fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));

console.log(`\n✅ Formatting complete!`);
console.log(`   Total questions: ${totalQuestions}`);
console.log(`   Questions with code formatting: ${formattedCount}`);
console.log(
  `   Code snippets are now wrapped in <code> tags for better frontend display`
);
