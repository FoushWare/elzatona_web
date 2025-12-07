const fs = require('fs');
const path = require('path');

/**
 * Comprehensive fix for nested code tags using a stack-based approach
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/css-questions.json'
);
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

function fixNestedCodeTags(text) {
  if (!text || typeof text !== 'string') return text;
  if (!text.includes('<code>')) return text;

  let result = '';
  let i = 0;
  const stack = [];

  while (i < text.length) {
    // Check for opening code tag
    if (text.substring(i, i + 6) === '<code>') {
      if (stack.length > 0) {
        // Already inside a code tag, skip this opening tag but keep the text
        i += 6;
      } else {
        // Start new code tag
        stack.push('code');
        result += '<code>';
        i += 6;
      }
    }
    // Check for closing code tag
    else if (text.substring(i, i + 7) === '</code>') {
      if (stack.length > 0) {
        stack.pop();
        result += '</code>';
        i += 7;
      } else {
        // Orphaned closing tag, skip it
        i += 7;
      }
    } else {
      result += text[i];
      i++;
    }
  }

  // Close any unclosed tags
  while (stack.length > 0) {
    result += '</code>';
    stack.pop();
  }

  return result;
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

console.log('🔧 Comprehensive fix for nested <code> tags...\n');

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

// Verify no nested tags remain
let nestedCount = 0;
questions.forEach(q => {
  const text = JSON.stringify(q);
  if (text.includes('<code>') && text.match(/<code>[^<]*<code>/)) {
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
