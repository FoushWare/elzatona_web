const fs = require('fs');
const path = require('path');

/**
 * Fixes nested <code> tags in CSS questions
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

function fixNestedCodeTags(text) {
  if (!text || typeof text !== 'string') return text;

  let fixed = text;

  // Fix nested code tags by removing inner code tags and keeping outer content
  // Pattern: <code>...<code>...</code>...</code>
  // Strategy: Find all code tags, extract their content, and rebuild without nesting

  // Keep fixing until no more nested tags found
  let previous = '';
  let iterations = 0;
  const maxIterations = 10; // Prevent infinite loops

  while (previous !== fixed && iterations < maxIterations) {
    previous = fixed;
    iterations++;

    // Fix pattern: <code>text<code>inner</code>text</code>
    fixed = fixed.replace(
      /<code>([^<]*)<code>([^<]*)<\/code>([^<]*)<\/code>/g,
      (match, before, inner, after) => {
        // Combine all parts, removing inner code tags
        const combined = (before + inner + after).trim();
        return `<code>${combined}</code>`;
      }
    );

    // Fix pattern with multiple inner code tags: <code>text<code>a</code>text<code>b</code>text</code>
    fixed = fixed.replace(
      /<code>((?:[^<]|<(?!\/?code>))*?)<code>([^<]*)<\/code>((?:[^<]|<(?!\/?code>))*?)<code>([^<]*)<\/code>((?:[^<]|<(?!\/?code>))*?)<\/code>/g,
      (match, before, inner1, middle, inner2, after) => {
        const combined = (before + inner1 + middle + inner2 + after).trim();
        return `<code>${combined}</code>`;
      }
    );

    // Fix pattern with three inner code tags
    fixed = fixed.replace(
      /<code>((?:[^<]|<(?!\/?code>))*?)<code>([^<]*)<\/code>((?:[^<]|<(?!\/?code>))*?)<code>([^<]*)<\/code>((?:[^<]|<(?!\/?code>))*?)<code>([^<]*)<\/code>((?:[^<]|<(?!\/?code>))*?)<\/code>/g,
      (match, before, inner1, mid1, inner2, mid2, inner3, after) => {
        const combined = (
          before +
          inner1 +
          mid1 +
          inner2 +
          mid2 +
          inner3 +
          after
        ).trim();
        return `<code>${combined}</code>`;
      }
    );
  }

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

console.log('🔧 Fixing nested <code> tags in CSS questions...\n');

let fixedCount = 0;
questions = questions.map(question => {
  const original = JSON.stringify(question);
  const formatted = formatQuestion(question);
  const changed = JSON.stringify(formatted) !== original;

  if (changed) {
    fixedCount++;
    if (fixedCount <= 5) {
      console.log(`✅ Fixed question ${question.id}`);
    }
  }

  return formatted;
});

if (fixedCount > 5) {
  console.log(`✅ ... and ${fixedCount - 5} more questions`);
}

fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));

console.log(`\n✅ Fix complete!`);
console.log(`   Total questions: ${questions.length}`);
console.log(`   Questions fixed: ${fixedCount}`);
