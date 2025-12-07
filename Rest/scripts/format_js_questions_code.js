const fs = require('fs');
const path = require('path');

/**
 * Formats code snippets in JavaScript questions for better frontend display
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/javascript-questions.json'
);
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

// Patterns to identify code snippets
const codePatterns = [
  // JavaScript keywords
  /\b(var|let|const|function|class|extends|super|this|new|typeof|instanceof|in|of|async|await|yield|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|from|as)\b/gi,
  // Built-in objects and methods
  /\b(Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|Date|RegExp|Error|console|window|global|document)\b/gi,
  // Common methods
  /\b(console\.log|console\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\.parse|JSON\.stringify|Object\.keys|Object\.values|Object\.entries|Object\.assign|Object\.freeze|Object\.seal|Object\.defineProperty|Array\.from|Array\.isArray|Array\.prototype|Array\.map|Array\.filter|Array\.reduce|Array\.forEach|Array\.push|Array\.pop|Array\.slice|Array\.splice)\b/gi,
  // Operators and syntax
  /\b(===|!==|==|!=|&&|\|\||\.\.\.|=>|\(\)|\[\]|{})\b/g,
  // Primitives
  /\b(undefined|null|NaN|Infinity|true|false)\b/gi,
  // Function calls
  /\b([a-zA-Z_$][a-zA-Z0-9_$]*\s*\(\))/g,
  // Template literals
  /`[^`]+`/g,
  // Property access
  /\.[a-zA-Z_$][a-zA-Z0-9_$]*/g,
];

// Function to wrap code snippets in <code> tags
function formatCodeInText(text) {
  if (!text || typeof text !== 'string') return text;
  if (text.includes('<code>')) return text; // Skip if already formatted

  let formatted = text;
  const codeSnippets = new Set();

  // Find all code snippets
  codePatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const snippet = match[0];
      if (!snippet.includes('<code>') && snippet.length > 0) {
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

  if (formatted.title) {
    formatted.title = formatCodeInText(formatted.title);
  }

  if (formatted.content) {
    formatted.content = formatCodeInText(formatted.content);
  }

  if (formatted.explanation) {
    formatted.explanation = formatCodeInText(formatted.explanation);
  }

  if (formatted.options && Array.isArray(formatted.options)) {
    formatted.options = formatted.options.map(option => ({
      ...option,
      text: formatCodeInText(option.text),
      explanation: option.explanation
        ? formatCodeInText(option.explanation)
        : option.explanation,
    }));
  }

  if (formatted.hints && Array.isArray(formatted.hints)) {
    formatted.hints = formatted.hints.map(hint => formatCodeInText(hint));
  }

  return formatted;
}

console.log('🔍 Formatting code snippets in JavaScript questions...\n');

let formattedCount = 0;
questions = questions.map(question => {
  const original = JSON.stringify(question);
  const formatted = formatQuestion(question);
  const changed = JSON.stringify(formatted) !== original;

  if (changed) {
    formattedCount++;
  }

  return formatted;
});

// Write formatted questions back to file
fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));

console.log(`✅ Formatting complete!`);
console.log(`   Total questions: ${questions.length}`);
console.log(`   Questions with code formatting: ${formattedCount}`);
console.log(
  `   Code snippets are now wrapped in <code> tags for better frontend display`
);
