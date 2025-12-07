const fs = require('fs');
const path = require('path');

/**
 * Fixes nested <code> tags in JavaScript questions
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/javascript-questions.json'
);
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

function fixNestedCodeTags(text) {
  if (!text || typeof text !== 'string') return text;

  let fixed = text;

  // Remove all nested code tags by keeping only the outermost
  // Pattern: <code>...<code>...</code>...</code>
  let previous = '';
  let iterations = 0;
  const maxIterations = 10;

  while (previous !== fixed && iterations < maxIterations) {
    previous = fixed;
    iterations++;

    // Fix nested code tags by extracting content and rebuilding
    fixed = fixed.replace(
      /<code>((?:[^<]|<(?!\/?code>))*?)<code>((?:[^<]|<(?!\/?code>))*?)<\/code>((?:[^<]|<(?!\/?code>))*?)<\/code>/g,
      (match, before, inner, after) => {
        const combined = (before + inner + after).trim();
        return `<code>${combined}</code>`;
      }
    );
  }

  // Also fix malformed patterns like <<code>code>
  fixed = fixed.replace(/<+code>/g, '<code>');
  fixed = fixed.replace(/<\/code>+/g, '</code>');

  return fixed;
}

function formatQuestion(question) {
  const formatted = { ...question };

  if (formatted.title) {
    formatted.title = fixNestedCodeTags(formatted.title);
  }

  if (formatted.content) {
    formatted.content = fixNestedCodeTags(formatted.content);
  }

  if (formatted.explanation) {
    formatted.explanation = fixNestedCodeTags(formatted.explanation);
  }

  if (formatted.options && Array.isArray(formatted.options)) {
    formatted.options = formatted.options.map(option => ({
      ...option,
      text: fixNestedCodeTags(option.text),
      explanation: option.explanation
        ? fixNestedCodeTags(option.explanation)
        : option.explanation,
    }));
  }

  if (formatted.hints && Array.isArray(formatted.hints)) {
    formatted.hints = formatted.hints.map(hint => fixNestedCodeTags(hint));
  }

  return formatted;
}

console.log('🔧 Fixing nested <code> tags in JavaScript questions...\n');

let fixedCount = 0;
questions = questions.map(question => {
  const original = JSON.stringify(question);
  const formatted = formatQuestion(question);
  const changed = JSON.stringify(formatted) !== original;

  if (changed) {
    fixedCount++;
  }

  return formatted;
});

fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));

console.log(`✅ Fix complete!`);
console.log(`   Total questions: ${questions.length}`);
console.log(`   Questions fixed: ${fixedCount}`);

// Verify no nested tags remain
let nestedCount = 0;
questions.forEach(q => {
  const text = JSON.stringify(q);
  if (text.match(/<code>[^<]*<code>/)) {
    nestedCount++;
  }
});

if (nestedCount > 0) {
  console.log(
    `   ⚠️  Warning: ${nestedCount} questions still have nested code tags`
  );
} else {
  console.log(`   ✅ No nested code tags remaining`);
}
