const fs = require('fs');
const path = require('path');

/**
 * Generates batch scripts to add JavaScript questions (3 per batch)
 * Reads from parsed-questions.json and creates batch scripts
 */

const parsedFile = path.join(__dirname, '../final-questions-v01/javascript/parsed-questions.json');
const questions = JSON.parse(fs.readFileSync(parsedFile, 'utf8'));

// Format code snippets
function formatCode(text) {
  if (!text) return text;
  // Remove markdown code blocks but keep content
  let formatted = text.replace(/```javascript\n?/g, '').replace(/```\n?/g, '').trim();
  
  // Wrap JavaScript keywords and common patterns in <code> tags
  formatted = formatted
    .replace(/\b(var|let|const|function|class|extends|super|this|new|typeof|instanceof|in|of|async|await|yield|Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|undefined|null|NaN|Infinity|true|false|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|default|from|as)\b/g, '<code>$1</code>')
    .replace(/\b(console\.log|console\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\.parse|JSON\.stringify|Object\.keys|Object\.values|Object\.entries|Object\.assign|Object\.freeze|Object\.seal|Object\.defineProperty|Array\.from|Array\.isArray|Array\.prototype|Array\.map|Array\.filter|Array\.reduce|Array\.forEach)\b/g, '<code>$1</code>')
    .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*\s*[=<>!]+|===|!==|==|!=|&&|\|\||\.\.\.|=>|\(\))\b/g, '<code>$1</code>');
  
  return formatted;
}

// Determine topic based on question content
function determineTopic(question) {
  const code = question.code.toLowerCase();
  const title = question.title.toLowerCase();
  
  if (code.includes('class') || code.includes('extends') || code.includes('super')) return 'Classes';
  if (code.includes('promise') || code.includes('async') || code.includes('await')) return 'Async/Await';
  if (code.includes('set') || code.includes('map') || code.includes('weak')) return 'Data Structures';
  if (code.includes('event') || code.includes('addEventListener') || code.includes('target')) return 'Events';
  if (code.includes('prototype') || code.includes('__proto__')) return 'Prototypes';
  if (code.includes('this') || code.includes('bind') || code.includes('call') || code.includes('apply')) return 'This Binding';
  if (code.includes('var') || code.includes('let') || code.includes('const') || code.includes('hoist')) return 'Basics';
  if (code.includes('arrow') || code.includes('=>')) return 'Functions';
  if (code.includes('destructur') || code.includes('spread') || code.includes('...')) return 'ES6+ Features';
  if (code.includes('generator') || code.includes('yield')) return 'Generators';
  if (code.includes('module') || code.includes('import') || code.includes('export')) return 'Modules';
  if (code.includes('proxy') || code.includes('reflect')) return 'Advanced';
  return 'Basics';
}

// Determine difficulty
function determineDifficulty(question) {
  const code = question.code.toLowerCase();
  const title = question.title.toLowerCase();
  
  if (code.includes('proxy') || code.includes('symbol') || code.includes('generator') || code.includes('async generator')) return 'difficult';
  if (code.includes('class') || code.includes('promise') || code.includes('prototype') || code.includes('this')) return 'intermediate';
  return 'intermediate';
}

// Create question object
function createQuestion(parsedQ, batchNum, questionNum) {
  const questionId = `js-0${Math.ceil(parsedQ.num / 3)}-js${String(questionNum).padStart(2, '0')}`;
  const topic = determineTopic(parsedQ);
  const difficulty = determineDifficulty(parsedQ);
  
  // Build options array
  const options = [];
  const optionKeys = ['A', 'B', 'C', 'D'];
  optionKeys.forEach((key, index) => {
    if (parsedQ.options[key]) {
      options.push({
        id: `o${index + 1}`,
        text: formatCode(parsedQ.options[key]),
        isCorrect: key === parsedQ.correctAnswer,
        explanation: key === parsedQ.correctAnswer 
          ? "Correct." 
          : "Incorrect."
      });
    }
  });
  
  return {
    id: questionId,
    title: formatCode(parsedQ.title),
    content: formatCode(parsedQ.code),
    type: "multiple-choice",
    category: "JavaScript",
    topic: topic,
    difficulty: difficulty,
    learningCardId: "core-technologies",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin",
    updatedBy: "admin",
    tags: ["javascript", topic.toLowerCase().replace(/\s+/g, '-'), difficulty],
    explanation: formatCode(parsedQ.explanation),
    points: difficulty === 'difficult' ? 20 : 15,
    options: options,
    hints: [
      "Consider JavaScript execution context and behavior",
      "Think about scope, hoisting, and closures",
      "Remember ES6+ features and their differences from ES5"
    ],
    metadata: {}
  };
}

// Generate batch scripts
const totalBatches = Math.ceil(questions.length / 3);
console.log(`📝 Generating ${totalBatches} batch scripts for ${questions.length} questions...\n`);

for (let batch = 0; batch < totalBatches; batch++) {
  const batchStart = batch * 3;
  const batchQuestions = questions.slice(batchStart, batchStart + 3);
  
  if (batchQuestions.length === 0) break;
  
  const batchNum = batch + 1;
  const scriptContent = `const fs = require('fs');
const path = require('path');

/**
 * Adds JavaScript questions ${batchStart + 1}-${Math.min(batchStart + 3, questions.length)} (Batch ${batchNum})
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/javascript-questions.json');
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () => \`js-0\${Math.ceil(${batchStart + 1} / 3)}-js\${String(questionCounter++).padStart(2, '0')}\`;

function formatCode(text) {
  if (!text) return text;
  // Remove markdown code blocks
  let formatted = text.replace(/```javascript/g, '').replace(/```/g, '').trim();
  // Simple keyword wrapping - wrap common JS patterns in code tags
  const keywords = ['var', 'let', 'const', 'function', 'class', 'extends', 'super', 'this', 'new', 'typeof', 'instanceof', 'async', 'await', 'yield', 'Promise', 'Set', 'Map', 'Symbol', 'Object', 'Array', 'String', 'Number', 'Boolean', 'undefined', 'null', 'NaN', 'Infinity', 'true', 'false', 'console.log', 'setTimeout', 'setInterval', 'JSON.parse', 'JSON.stringify'];
  keywords.forEach(kw => {
    const regex = new RegExp('\\\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\\\$&') + '\\\\b', 'g');
    formatted = formatted.replace(regex, '<code>' + kw + '</code>');
  });
  return formatted;
}

function determineTopic(question) {
  const code = question.code.toLowerCase();
  if (code.includes('class') || code.includes('extends') || code.includes('super')) return 'Classes';
  if (code.includes('promise') || code.includes('async') || code.includes('await')) return 'Async/Await';
  if (code.includes('set') || code.includes('map') || code.includes('weak')) return 'Data Structures';
  if (code.includes('event') || code.includes('addEventListener') || code.includes('target')) return 'Events';
  if (code.includes('prototype') || code.includes('__proto__')) return 'Prototypes';
  if (code.includes('this') || code.includes('bind') || code.includes('call') || code.includes('apply')) return 'This Binding';
  if (code.includes('var') || code.includes('let') || code.includes('const') || code.includes('hoist')) return 'Basics';
  if (code.includes('arrow') || code.includes('=>')) return 'Functions';
  if (code.includes('destructur') || code.includes('spread') || code.includes('...')) return 'ES6+ Features';
  if (code.includes('generator') || code.includes('yield')) return 'Generators';
  if (code.includes('module') || code.includes('import') || code.includes('export')) return 'Modules';
  if (code.includes('proxy') || code.includes('reflect')) return 'Advanced';
  return 'Basics';
}

function determineDifficulty(question) {
  const code = question.code.toLowerCase();
  if (code.includes('proxy') || code.includes('symbol') || code.includes('generator') || code.includes('async generator')) return 'difficult';
  if (code.includes('class') || code.includes('promise') || code.includes('prototype') || code.includes('this')) return 'intermediate';
  return 'intermediate';
}

const parsedQuestions = ${JSON.stringify(batchQuestions, null, 2)};

const newQuestions = parsedQuestions.map((parsedQ, index) => {
  const questionId = getQuestionId();
  const topic = determineTopic(parsedQ);
  const difficulty = determineDifficulty(parsedQ);
  
  const options = [];
  const optionKeys = ['A', 'B', 'C', 'D'];
  optionKeys.forEach((key, idx) => {
    if (parsedQ.options[key]) {
      options.push({
        id: \`o\${idx + 1}\`,
        text: formatCode(parsedQ.options[key]),
        isCorrect: key === parsedQ.correctAnswer,
        explanation: key === parsedQ.correctAnswer ? "Correct." : "Incorrect."
      });
    }
  });
  
  return {
    id: questionId,
    title: formatCode(parsedQ.title),
    content: formatCode(parsedQ.code),
    type: "multiple-choice",
    category: "JavaScript",
    topic: topic,
    difficulty: difficulty,
    learningCardId: "core-technologies",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin",
    updatedBy: "admin",
    tags: ["javascript", topic.toLowerCase().replace(/\\\\s+/g, '-'), difficulty],
    explanation: formatCode(parsedQ.explanation),
    points: difficulty === 'difficult' ? 20 : 15,
    options: options,
    hints: [
      "Consider JavaScript execution context and behavior",
      "Think about scope, hoisting, and closures",
      "Remember ES6+ features and their differences from ES5"
    ],
    metadata: {}
  };
});

existingQuestions.push(...newQuestions);
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));
console.log(\`✅ Added \${newQuestions.length} JavaScript questions (Batch ${batchNum}: Questions ${batchStart + 1}-${Math.min(batchStart + 3, questions.length)})\`);
console.log(\`📊 Total: \${existingQuestions.length} questions\`);
`;

  const scriptPath = path.join(__dirname, `add_js_questions_batch${batchNum}.js`);
  fs.writeFileSync(scriptPath, scriptContent);
  console.log(`✅ Created batch ${batchNum} script (questions ${batchStart + 1}-${Math.min(batchStart + 3, questions.length)})`);
}

console.log(`\n✅ Generated ${totalBatches} batch scripts!`);
console.log(`📝 Run them sequentially to add all ${questions.length} questions`);

