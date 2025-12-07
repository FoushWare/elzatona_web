const fs = require('fs');
const path = require('path');

/**
 * Final cleanup for JavaScript questions formatting
 * Removes all malformed code tags and properly formats code
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/javascript-questions.json'
);
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

// Clean up malformed code tags and text
function cleanMalformed(text) {
  if (!text || typeof text !== 'string') return text;

  // Remove all HTML tags first
  let cleaned = text
    .replace(/<pre[^>]*>/gi, '')
    .replace(/<\/pre>/gi, '')
    .replace(/<code[^>]*>/gi, '')
    .replace(/<\/code>/gi, '')
    .replace(/<+code>/g, '')
    .replace(/<\/code>+/g, '')
    .replace(/<<code>/g, '')
    .replace(/code><code>/g, '')
    .replace(/<code><\/code>/g, '')
    .replace(/code>/g, '')
    .replace(/code</g, '')
    .replace(/`/g, '')
    .replace(/```javascript\n?/gi, '')
    .replace(/```\n?/g, '')
    .trim();

  return cleaned;
}

// Format code snippets properly
function formatCodeSnippets(text) {
  if (!text || typeof text !== 'string') return text;

  // JavaScript keywords and patterns
  const patterns = [
    {
      regex:
        /\b(var|let|const|function|class|extends|super|this|new|typeof|instanceof|async|await|yield|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|from|as|in|of)\b/gi,
      replacement: '<code>$1</code>',
    },
    {
      regex:
        /\b(Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|Date|RegExp|Error|console|window|global|document|Math)\b/gi,
      replacement: '<code>$1</code>',
    },
    {
      regex:
        /\b(console\.log|console\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\.parse|JSON\.stringify|Object\.keys|Object\.values|Object\.entries|Object\.assign|Object\.freeze|Object\.seal|Object\.defineProperty|Array\.from|Array\.isArray|Array\.prototype|Array\.map|Array\.filter|Array\.reduce|Array\.forEach|Array\.push|Array\.pop|Array\.slice|Array\.splice)\b/gi,
      replacement: '<code>$1</code>',
    },
    {
      regex: /\b(===|!==|==|!=|&&|\|\||\.\.\.|=>)\b/g,
      replacement: '<code>$1</code>',
    },
    {
      regex: /\b(undefined|null|NaN|Infinity|true|false)\b/gi,
      replacement: '<code>$1</code>',
    },
  ];

  let formatted = text;

  // Apply patterns
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

// Format content (code blocks)
function formatContent(text) {
  if (!text) return text;

  // Clean first - remove all HTML tags to start fresh
  let cleaned = text
    .replace(/<pre[^>]*>/gi, '')
    .replace(/<\/pre>/gi, '')
    .replace(/<code[^>]*>/gi, '')
    .replace(/<\/code>/gi, '')
    .replace(/<+code>/g, '')
    .replace(/<\/code>+/g, '')
    .replace(/<<code>/g, '')
    .replace(/code><code>/g, '')
    .replace(/<code><\/code>/g, '')
    .replace(/code>/g, '')
    .replace(/code</g, '')
    .replace(/`/g, '')
    .replace(/```javascript\n?/gi, '')
    .replace(/```\n?/g, '')
    .trim();

  // Remove "javascript" label if present at start
  cleaned = cleaned.replace(/^javascript\n?/i, '');

  // If it looks like a code block, wrap in <pre><code>
  if (
    cleaned.includes('\n') &&
    (cleaned.includes('function') ||
      cleaned.includes('const') ||
      cleaned.includes('let') ||
      cleaned.includes('var') ||
      cleaned.includes('console') ||
      cleaned.includes('class'))
  ) {
    // Format keywords within the code block
    cleaned = formatCodeSnippets(cleaned);
    return `<pre><code>${cleaned}</code></pre>`;
  }

  // Otherwise format as inline
  return formatCodeSnippets(cleaned);
}

// Format text (explanations, options)
function formatText(text) {
  if (!text) return text;

  // Clean first
  let cleaned = cleanMalformed(text);

  // Format inline code
  return formatCodeSnippets(cleaned);
}

function formatQuestion(question) {
  const formatted = { ...question };

  if (formatted.content) {
    formatted.content = formatContent(formatted.content);
  }

  if (formatted.title) {
    formatted.title = formatText(formatted.title);
  }

  if (formatted.explanation) {
    formatted.explanation = formatText(formatted.explanation);
  }

  if (formatted.options && Array.isArray(formatted.options)) {
    formatted.options = formatted.options.map(option => ({
      ...option,
      text: formatText(option.text),
      explanation: option.explanation
        ? formatText(option.explanation)
        : option.explanation,
    }));
  }

  return formatted;
}

console.log('🧹 Final cleanup of JavaScript questions formatting...\n');

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

console.log(`✅ Cleanup complete!`);
console.log(`   Total questions: ${questions.length}`);
console.log(`   Questions fixed: ${fixedCount}`);

// Verify
let hasCodeTags = 0;
let hasPreCode = 0;
questions.forEach(q => {
  if (q.content && q.content.includes('<code>')) hasCodeTags++;
  if (q.content && q.content.includes('<pre><code>')) hasPreCode++;
});

console.log(`   Questions with code tags: ${hasCodeTags}/${questions.length}`);
console.log(`   Questions with code blocks: ${hasPreCode}/${questions.length}`);
