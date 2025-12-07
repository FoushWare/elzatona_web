const fs = require('fs');
const path = require('path');

/**
 * Properly formats code in JavaScript questions
 * Removes markdown code blocks and formats code snippets correctly
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/javascript-questions.json'
);
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

// Clean and format code content
function cleanCodeContent(text) {
  if (!text || typeof text !== 'string') return text;

  // Remove markdown code blocks and backticks
  let cleaned = text
    .replace(/```javascript\n?/g, '')
    .replace(/```\n?/g, '')
    .replace(/`/g, '')
    .trim();

  // Remove any malformed code tags
  cleaned = cleaned.replace(/<+code>/g, '');
  cleaned = cleaned.replace(/<\/code>+/g, '');
  cleaned = cleaned.replace(/<<code>/g, '');
  cleaned = cleaned.replace(/<code><\/code>/g, '');

  return cleaned;
}

// Format code snippets properly
function formatCodeSnippets(text) {
  if (!text || typeof text !== 'string') return text;

  // JavaScript keywords and patterns to wrap
  const patterns = [
    // Keywords
    {
      regex:
        /\b(var|let|const|function|class|extends|super|this|new|typeof|instanceof|async|await|yield|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|from|as|in|of)\b/gi,
      replacement: '<code>$1</code>',
    },
    // Built-in objects
    {
      regex:
        /\b(Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|Date|RegExp|Error|console|window|global|document|Math)\b/gi,
      replacement: '<code>$1</code>',
    },
    // Common methods
    {
      regex:
        /\b(console\.log|console\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\.parse|JSON\.stringify|Object\.keys|Object\.values|Object\.entries|Object\.assign|Object\.freeze|Object\.seal|Object\.defineProperty|Array\.from|Array\.isArray|Array\.prototype|Array\.map|Array\.filter|Array\.reduce|Array\.forEach|Array\.push|Array\.pop|Array\.slice|Array\.splice)\b/gi,
      replacement: '<code>$1</code>',
    },
    // Operators
    {
      regex: /\b(===|!==|==|!=|&&|\|\||\.\.\.|=>)\b/g,
      replacement: '<code>$1</code>',
    },
    // Primitives
    {
      regex: /\b(undefined|null|NaN|Infinity|true|false)\b/gi,
      replacement: '<code>$1</code>',
    },
  ];

  let formatted = text;

  // Apply patterns (longest first to avoid partial matches)
  patterns.sort((a, b) => {
    const aLen = a.regex.source.length;
    const bLen = b.regex.source.length;
    return bLen - aLen;
  });

  patterns.forEach(({ regex, replacement }) => {
    formatted = formatted.replace(regex, replacement);
  });

  // Fix nested code tags
  let previous = '';
  let iterations = 0;
  while (previous !== formatted && iterations < 5) {
    previous = formatted;
    iterations++;
    formatted = formatted.replace(
      /<code>([^<]*)<code>([^<]*)<\/code>([^<]*)<\/code>/g,
      '<code>$1$2$3</code>'
    );
  }

  return formatted;
}

function formatQuestion(question) {
  const formatted = { ...question };

  // Clean content first (remove markdown)
  if (formatted.content) {
    formatted.content = cleanCodeContent(formatted.content);
    formatted.content = formatCodeSnippets(formatted.content);
  }

  // Format title
  if (formatted.title) {
    formatted.title = formatCodeSnippets(formatted.title);
  }

  // Format explanation
  if (formatted.explanation) {
    formatted.explanation = cleanCodeContent(formatted.explanation);
    formatted.explanation = formatCodeSnippets(formatted.explanation);
  }

  // Format options
  if (formatted.options && Array.isArray(formatted.options)) {
    formatted.options = formatted.options.map(option => ({
      ...option,
      text: cleanCodeContent(option.text),
      text: formatCodeSnippets(option.text),
      explanation: option.explanation
        ? formatCodeSnippets(option.explanation)
        : option.explanation,
    }));
  }

  return formatted;
}

console.log('🔧 Fixing code formatting in JavaScript questions...\n');

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

console.log(`\n✅ Formatting complete!`);
console.log(`   Total questions: ${questions.length}`);
console.log(`   Questions fixed: ${fixedCount}`);
