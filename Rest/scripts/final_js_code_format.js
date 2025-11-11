const fs = require('fs');
const path = require('path');

/**
 * Final formatting for JavaScript questions
 * Properly formats code blocks and inline code snippets
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/javascript-questions.json');
let questions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));

// Format content (code blocks should be wrapped in <pre><code>)
function formatContent(text) {
  if (!text || typeof text !== 'string') return text;
  
  // Remove all existing malformed code tags
  let cleaned = text
    .replace(/<+code>/g, '')
    .replace(/<\/code>+/g, '')
    .replace(/<<code>/g, '')
    .replace(/code><code>/g, '')
    .replace(/<code><\/code>/g, '')
    .replace(/`/g, '')
    .trim();
  
  // Remove markdown code block markers if present
  cleaned = cleaned.replace(/```javascript\n?/gi, '');
  cleaned = cleaned.replace(/```\n?/g, '');
  
  // If it looks like a code block (has newlines and code-like content), wrap in <pre><code>
  if (cleaned.includes('\n') && (cleaned.includes('function') || cleaned.includes('const') || cleaned.includes('let') || cleaned.includes('var') || cleaned.includes('console'))) {
    // Format inline code snippets within the block
    cleaned = cleaned
      .replace(/\b(var|let|const|function|class|extends|super|this|new|typeof|instanceof|async|await|yield|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|from|as|in|of)\b/gi, '<code>$1</code>')
      .replace(/\b(Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|Date|RegExp|Error|console|window|global|document|Math)\b/gi, '<code>$1</code>')
      .replace(/\b(console\.log|console\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\.parse|JSON\.stringify|Object\.keys|Object\.values|Object\.entries|Object\.assign|Object\.freeze|Object\.seal|Object\.defineProperty|Array\.from|Array\.isArray|Array\.prototype|Array\.map|Array\.filter|Array\.reduce|Array\.forEach|Array\.push|Array\.pop|Array\.slice|Array\.splice)\b/gi, '<code>$1</code>')
      .replace(/\b(===|!==|==|!=|&&|\|\||\.\.\.|=>)\b/g, '<code>$1</code>')
      .replace(/\b(undefined|null|NaN|Infinity|true|false)\b/gi, '<code>$1</code>');
    
    return `<pre><code>${cleaned}</code></pre>`;
  }
  
  // For inline content, just format keywords
  cleaned = cleaned
    .replace(/\b(var|let|const|function|class|extends|super|this|new|typeof|instanceof|async|await|yield|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|from|as|in|of)\b/gi, '<code>$1</code>')
    .replace(/\b(Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|Date|RegExp|Error|console|window|global|document|Math)\b/gi, '<code>$1</code>')
    .replace(/\b(console\.log|console\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\.parse|JSON\.stringify|Object\.keys|Object\.values|Object\.entries|Object\.assign|Object\.freeze|Object\.seal|Object\.defineProperty|Array\.from|Array\.isArray|Array\.prototype|Array\.map|Array\.filter|Array\.reduce|Array\.forEach|Array\.push|Array\.pop|Array\.slice|Array\.splice)\b/gi, '<code>$1</code>')
    .replace(/\b(===|!==|==|!=|&&|\|\||\.\.\.|=>)\b/g, '<code>$1</code>')
    .replace(/\b(undefined|null|NaN|Infinity|true|false)\b/gi, '<code>$1</code>');
  
  return cleaned;
}

// Format text (explanations, options) - inline code only
function formatText(text) {
  if (!text || typeof text !== 'string') return text;
  
  // Remove all existing malformed code tags
  let cleaned = text
    .replace(/<+code>/g, '')
    .replace(/<\/code>+/g, '')
    .replace(/<<code>/g, '')
    .replace(/code><code>/g, '')
    .replace(/<code><\/code>/g, '')
    .replace(/`/g, '')
    .trim();
  
  // Remove markdown code block markers
  cleaned = cleaned.replace(/```javascript\n?/gi, '');
  cleaned = cleaned.replace(/```\n?/g, '');
  
  // Format inline code snippets
  cleaned = cleaned
    .replace(/\b(var|let|const|function|class|extends|super|this|new|typeof|instanceof|async|await|yield|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|from|as|in|of)\b/gi, '<code>$1</code>')
    .replace(/\b(Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|Date|RegExp|Error|console|window|global|document|Math)\b/gi, '<code>$1</code>')
    .replace(/\b(console\.log|console\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\.parse|JSON\.stringify|Object\.keys|Object\.values|Object\.entries|Object\.assign|Object\.freeze|Object\.seal|Object\.defineProperty|Array\.from|Array\.isArray|Array\.prototype|Array\.map|Array\.filter|Array\.reduce|Array\.forEach|Array\.push|Array\.pop|Array\.slice|Array\.splice)\b/gi, '<code>$1</code>')
    .replace(/\b(===|!==|==|!=|&&|\|\||\.\.\.|=>)\b/g, '<code>$1</code>')
    .replace(/\b(undefined|null|NaN|Infinity|true|false)\b/gi, '<code>$1</code>');
  
  // Fix nested code tags
  let previous = '';
  let iterations = 0;
  while (previous !== cleaned && iterations < 5) {
    previous = cleaned;
    iterations++;
    cleaned = cleaned.replace(/<code>([^<]*)<code>([^<]*)<\/code>([^<]*)<\/code>/g, 
      '<code>$1$2$3</code>'
    );
  }
  
  return cleaned;
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

console.log('🔧 Final code formatting for JavaScript questions...\n');

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
console.log(`   Questions formatted: ${fixedCount}`);

// Verify formatting
let hasCodeTags = 0;
questions.forEach(q => {
  if (q.content && q.content.includes('<code>')) hasCodeTags++;
});

console.log(`   Questions with code tags: ${hasCodeTags}/${questions.length}`);


