const fs = require('fs');
const path = require('path');

/**
 * Adds JavaScript questions 1-3 (Batch 1)
 */

const questionsFile = path.join(__dirname, '../final-questions-v01/javascript-questions.json');
let existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
let questionCounter = existingQuestions.length + 1;

const getQuestionId = () => `js-0${Math.ceil(1 / 3)}-js${String(questionCounter++).padStart(2, '0')}`;

function formatCode(text) {
  if (!text) return text;
  let formatted = text.replace(/\`\`\`javascript\
?/g, '').replace(/\`\`\`\
?/g, '').trim();
  formatted = formatted
    .replace(/\(var|let|const|function|class|extends|super|this|new|typeof|instanceof|in|of|async|await|yield|Promise|Set|Map|Symbol|Object|Array|String|Number|Boolean|undefined|null|NaN|Infinity|true|false|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|import|export|default|from|as)\/g, '<code>$1</code>')
    .replace(/\(console\\.log|console\\.error|setTimeout|setInterval|clearTimeout|clearInterval|JSON\\.parse|JSON\\.stringify|Object\\.keys|Object\\.values|Object\\.entries|Object\\.assign|Object\\.freeze|Object\\.seal|Object\\.defineProperty|Array\\.from|Array\\.isArray|Array\\.prototype|Array\\.map|Array\\.filter|Array\\.reduce|Array\\.forEach)\/g, '<code>$1</code>')
    .replace(/\([a-zA-Z_$][a-zA-Z0-9_$]*\s*[=<>!]+|===|!==|==|!=|&&|\\|\\||\\.\\.\\.|=>|\\(\\))\/g, '<code>$1</code>');
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

const parsedQuestions = [
  {
    "num": 1,
    "title": "What's the output?",
    "code": "function sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = 'Lydia';\n  let age = 21;\n}\n\nsayHi();",
    "options": {
      "A": "`Lydia` and `undefined`",
      "B": "`Lydia` and `ReferenceError`",
      "C": "`ReferenceError` and `21`",
      "D": "`undefined` and `ReferenceError`"
    },
    "correctAnswer": "D",
    "explanation": "Within the function, we first declare the `name` variable with the `var` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of `undefined`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the `name` variable, so it still holds the value of `undefined`.\n\nVariables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get <i>initialized</i>. They are not accessible before the line we declare (initialize) them. This is called the \"temporal dead zone\". When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`."
  },
  {
    "num": 2,
    "title": "What's the output?",
    "code": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}",
    "options": {
      "A": "`0 1 2` and `0 1 2`",
      "B": "`0 1 2` and `3 3 3`",
      "C": "`3 3 3` and `0 1 2`",
      "D": null
    },
    "correctAnswer": "C",
    "explanation": "Because of the event queue in JavaScript, the `setTimeout` callback function is called _after_ the loop has been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example.\n\nIn the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let` (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will have a new value, and each value is scoped inside the loop."
  },
  {
    "num": 3,
    "title": "What's the output?",
    "code": "const shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2;\n  },\n  perimeter: () => 2 * Math.PI * this.radius,\n};\n\nconsole.log(shape.diameter());\nconsole.log(shape.perimeter());",
    "options": {
      "A": "`20` and `62.83185307179586`",
      "B": "`20` and `NaN`",
      "C": "`20` and `63`",
      "D": "`NaN` and `63`"
    },
    "correctAnswer": "B",
    "explanation": "Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function.\n\nWith arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope (window for example).\n\nSince there is no value `radius` in the scope of the arrow function, `this.radius` returns `undefined` which, when multiplied by `2 * Math.PI`, results in `NaN`."
  }
];

const newQuestions = parsedQuestions.map((parsedQ, index) => {
  const questionId = getQuestionId();
  const topic = determineTopic(parsedQ);
  const difficulty = determineDifficulty(parsedQ);
  
  const options = [];
  const optionKeys = ['A', 'B', 'C', 'D'];
  optionKeys.forEach((key, idx) => {
    if (parsedQ.options[key]) {
      options.push({
        id: `o${idx + 1}`,
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
    tags: ["javascript", topic.toLowerCase().replace(/\\s+/g, '-'), difficulty],
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
console.log(`✅ Added ${newQuestions.length} JavaScript questions (Batch 1: Questions 1-3)`);
console.log(`📊 Total: ${existingQuestions.length} questions`);

