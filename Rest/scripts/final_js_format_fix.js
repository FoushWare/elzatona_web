const fs = require('fs');
const path = require('path');

/**
 * Final comprehensive fix for JavaScript questions formatting
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/javascript-questions.json');
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

// Clean all HTML tags and malformed patterns
function deepClean(text) {
  if (!text || typeof text !== 'string') return text;
  
  // Remove all HTML tags completely
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
    // Fix malformed patterns
    .replace(/lete>/g, 'let')
    .replace(/vare>/g, 'var')
    .replace(/undefinedfined/g, 'undefined')
    .replace(/undefinedfinede>ined/g, 'undefined')
    .replace(/ReferenceError</g, 'ReferenceError')
    .replace(/<ReferenceError/g, 'ReferenceError')
    .replace(/<21/g, '21')
    .replace(/<code>/g, '')
    .replace(/<\/code>/g, '')
    .trim();
  
  return cleaned;
}

// Format code snippets
function formatCodeSnippets(text) {
  if (!text || typeof text !== 'string') return text;
  
  const patterns = [
    { regex: /\b(var|let|const|function|class|extends|super|this|new|typeof|instanceof|async|await|yield|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|from|as|in|of)\b/gi, replacement: '<code>$1</code>' },
    { regex: /\b(Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|Date|RegExp|Error|console|window|global|document|Math)\b/gi, replacement: '<code>$1</code>' },
    { regex: /\b(console\.log|console\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\.parse|JSON\.stringify|Object\.keys|Object\.values|Object\.entries|Object\.assign|Object\.freeze|Object\.seal|Object\.defineProperty|Array\.from|Array\.isArray|Array\.prototype|Array\.map|Array\.filter|Array\.reduce|Array\.forEach|Array\.push|Array\.pop|Array\.slice|Array\.splice)\b/gi, replacement: '<code>$1</code>' },
    { regex: /\b(===|!==|==|!=|&&|\|\||\.\.\.|=>)\b/g, replacement: '<code>$1</code>' },
    { regex: /\b(undefined|null|NaN|Infinity|true|false)\b/gi, replacement: '<code>$1</code>' },
    { regex: /\b(ReferenceError|TypeError|SyntaxError)\b/gi, replacement: '<code>$1</code>' },
  ];
  
  let formatted = text;
  
  patterns.forEach(({ regex, replacement }) => {
    formatted = formatted.replace(regex, replacement);
  });
  
  // Fix nested code tags
  let previous = '';
  let iterations = 0;
  while (previous !== formatted && iterations < 5) {
    previous = formatted;
    iterations++;
    formatted = formatted.replace(/<code>([^<]*)<code>([^<]*)<\/code>([^<]*)<\/code>/g, 
      '<code>$1$2$3</code>'
    );
  }
  
  return formatted;
}

// Format content (code blocks)
function formatContent(text) {
  if (!text) return text;
  
  let cleaned = deepClean(text);
  
  // Remove "javascript" label if present
  cleaned = cleaned.replace(/^javascript\n?/i, '');
  
  // If it looks like a code block, wrap in <pre><code>
  if (cleaned.includes('\n') && (cleaned.includes('function') || cleaned.includes('const') || cleaned.includes('let') || cleaned.includes('var') || cleaned.includes('console') || cleaned.includes('class'))) {
    cleaned = formatCodeSnippets(cleaned);
    return `<pre><code>${cleaned}</code></pre>`;
  }
  
  return formatCodeSnippets(cleaned);
}

// Format text (explanations, options)
function formatText(text) {
  if (!text) return text;
  
  let cleaned = deepClean(text);
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
      explanation: option.explanation ? formatText(option.explanation) : option.explanation
    }));
  }
  
  return formatted;
}

console.log('🔧 Final comprehensive formatting fix...\n');

let fixedCount = 0;
questions = questions.map((question) => {
  const original = JSON.stringify(question);
  const formatted = formatQuestion(question);
  const changed = JSON.stringify(formatted) !== original;
  
  if (changed) {
    fixedCount++;
  }
  
  return formatted;
});

fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));

console.log(`✅ Formatting complete!`);
console.log(`   Total questions: ${questions.length}`);
console.log(`   Questions fixed: ${fixedCount}`);

// Verify
let hasCodeTags = 0;
let hasPreCode = 0;
let hasNested = 0;
questions.forEach(q => {
  if (q.content && q.content.includes('<code>')) hasCodeTags++;
  if (q.content && q.content.includes('<pre><code>')) hasPreCode++;
  if (q.content && q.content.match(/<code>[^<]*<code>/)) hasNested++;
});

console.log(`   Questions with code tags: ${hasCodeTags}/${questions.length}`);
console.log(`   Questions with code blocks: ${hasPreCode}/${questions.length}`);
if (hasNested > 0) {
  console.log(`   ⚠️  Questions with nested code tags: ${hasNested}`);
} else {
  console.log(`   ✅ No nested code tags`);
}


