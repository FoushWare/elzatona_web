#!/usr/bin/env node

/**
 * Create Choice Questions Only
 * Creates 10 single and multiple choice questions for each category
 */

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

// Question data for each category - only single and multiple choice
const QUESTIONS_DATA = {
  'HTML & CSS': [
    {
      title: "HTML Semantic Elements",
      content: "Which HTML5 semantic element should be used to represent the main content of a webpage?",
      type: "single",
      options: [
        { id: "a", text: "<main>", isCorrect: true },
        { id: "b", text: "<content>", isCorrect: false },
        { id: "c", text: "<body>", isCorrect: false },
        { id: "d", text: "<section>", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "The <main> element represents the main content of a webpage and should be used only once per page.",
      difficulty: "easy",
      category: "HTML & CSS",
      subcategory: "HTML Fundamentals",
      learningPath: "frontend-basics",
      sectionId: "html-fundamentals",
      points: 1,
      timeLimit: 30,
      tags: ["html", "html-fundamentals"]
    },
    {
      title: "CSS Flexbox Properties",
      content: "Which CSS property is used to control the alignment of flex items along the main axis?",
      type: "single",
      options: [
        { id: "a", text: "align-items", isCorrect: false },
        { id: "b", text: "justify-content", isCorrect: true },
        { id: "c", text: "flex-direction", isCorrect: false },
        { id: "d", text: "flex-wrap", isCorrect: false }
      ],
      correctAnswers: ["b"],
      explanation: "justify-content controls alignment along the main axis, while align-items controls alignment along the cross axis.",
      difficulty: "medium",
      category: "HTML & CSS",
      subcategory: "Flexbox",
      learningPath: "frontend-basics",
      sectionId: "css-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["css", "flexbox"]
    },
    {
      title: "CSS Grid Layout",
      content: "Which CSS property creates a grid container?",
      type: "single",
      options: [
        { id: "a", text: "display: grid", isCorrect: true },
        { id: "b", text: "display: flex", isCorrect: false },
        { id: "c", text: "display: block", isCorrect: false },
        { id: "d", text: "display: inline-grid", isCorrect: true }
      ],
      correctAnswers: ["a", "d"],
      explanation: "Both 'display: grid' and 'display: inline-grid' create grid containers, with inline-grid being an inline version.",
      difficulty: "medium",
      category: "HTML & CSS",
      subcategory: "CSS Grid",
      learningPath: "frontend-basics",
      sectionId: "css-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["css", "css-grid"]
    },
    {
      title: "Responsive Design Breakpoints",
      content: "What is the recommended approach for mobile-first responsive design?",
      type: "single",
      options: [
        { id: "a", text: "Start with desktop styles and use max-width media queries", isCorrect: false },
        { id: "b", text: "Start with mobile styles and use min-width media queries", isCorrect: true },
        { id: "c", text: "Use only fixed widths", isCorrect: false },
        { id: "d", text: "Use only percentage widths", isCorrect: false }
      ],
      correctAnswers: ["b"],
      explanation: "Mobile-first design starts with styles for mobile devices and uses min-width media queries to progressively enhance for larger screens.",
      difficulty: "easy",
      category: "HTML & CSS",
      subcategory: "Responsive Design",
      learningPath: "frontend-basics",
      sectionId: "css-fundamentals",
      points: 1,
      timeLimit: 30,
      tags: ["css", "responsive-design"]
    },
    {
      title: "CSS Specificity Rules",
      content: "Which selector has the highest specificity: .class, #id, or element?",
      type: "single",
      options: [
        { id: "a", text: ".class", isCorrect: false },
        { id: "b", text: "#id", isCorrect: true },
        { id: "c", text: "element", isCorrect: false },
        { id: "d", text: "They are equal", isCorrect: false }
      ],
      correctAnswers: ["b"],
      explanation: "ID selectors (#id) have higher specificity than class selectors (.class) and element selectors.",
      difficulty: "medium",
      category: "HTML & CSS",
      subcategory: "CSS Fundamentals",
      learningPath: "frontend-basics",
      sectionId: "css-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["css", "css-fundamentals"]
    },
    {
      title: "HTML Form Validation",
      content: "Which HTML5 input type provides built-in email validation?",
      type: "single",
      options: [
        { id: "a", text: "text", isCorrect: false },
        { id: "b", text: "email", isCorrect: true },
        { id: "c", text: "validate", isCorrect: false },
        { id: "d", text: "input-email", isCorrect: false }
      ],
      correctAnswers: ["b"],
      explanation: "The 'email' input type provides built-in validation for email addresses.",
      difficulty: "easy",
      category: "HTML & CSS",
      subcategory: "HTML Fundamentals",
      learningPath: "frontend-basics",
      sectionId: "html-fundamentals",
      points: 1,
      timeLimit: 30,
      tags: ["html", "html-fundamentals"]
    },
    {
      title: "CSS Box Model",
      content: "What does the CSS property 'box-sizing: border-box' do?",
      type: "multiple",
      options: [
        { id: "a", text: "Includes padding and border in the element's total width and height", isCorrect: true },
        { id: "b", text: "Excludes padding and border from the element's total width and height", isCorrect: false },
        { id: "c", text: "Makes the element's width and height equal to its content", isCorrect: false },
        { id: "d", text: "Centers the element horizontally", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "border-box includes padding and border in the element's total width and height, making sizing more predictable.",
      difficulty: "medium",
      category: "HTML & CSS",
      subcategory: "CSS Layout",
      learningPath: "frontend-basics",
      sectionId: "css-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["css", "css-layout"]
    },
    {
      title: "CSS Animations vs Transitions",
      content: "When would you use CSS animations instead of transitions?",
      type: "multiple",
      options: [
        { id: "a", text: "For complex, multi-step effects", isCorrect: true },
        { id: "b", text: "For automatic animations", isCorrect: true },
        { id: "c", text: "For simple state changes", isCorrect: false },
        { id: "d", text: "When you need programmatic control", isCorrect: true }
      ],
      correctAnswers: ["a", "b", "d"],
      explanation: "Use animations for complex, multi-step effects that need to run automatically or be controlled programmatically. Use transitions for simple state changes triggered by user interaction.",
      difficulty: "hard",
      category: "HTML & CSS",
      subcategory: "CSS Advanced Features",
      learningPath: "frontend-basics",
      sectionId: "css-fundamentals",
      points: 3,
      timeLimit: 90,
      tags: ["css", "css-advanced-features"]
    },
    {
      title: "HTML Accessibility",
      content: "Which attribute should be used to provide alternative text for images?",
      type: "single",
      options: [
        { id: "a", text: "alt", isCorrect: true },
        { id: "b", text: "title", isCorrect: false },
        { id: "c", text: "description", isCorrect: false },
        { id: "d", text: "aria-label", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "The 'alt' attribute provides alternative text for images, which is essential for accessibility.",
      difficulty: "easy",
      category: "HTML & CSS",
      subcategory: "HTML Fundamentals",
      learningPath: "frontend-basics",
      sectionId: "html-fundamentals",
      points: 1,
      timeLimit: 30,
      tags: ["html", "accessibility"]
    },
    {
      title: "CSS Custom Properties",
      content: "How do you define a CSS custom property (CSS variable)?",
      type: "single",
      options: [
        { id: "a", text: "--variable-name: value;", isCorrect: true },
        { id: "b", text: "var(--variable-name): value;", isCorrect: false },
        { id: "c", text: "$variable-name: value;", isCorrect: false },
        { id: "d", text: "custom-property: value;", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "CSS custom properties are defined with --variable-name: value; and accessed with var(--variable-name).",
      difficulty: "medium",
      category: "HTML & CSS",
      subcategory: "CSS Advanced Features",
      learningPath: "frontend-basics",
      sectionId: "css-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["css", "css-advanced-features"]
    }
  ],
  'JavaScript (Core)': [
    {
      title: "Variable Declaration",
      content: "What is the difference between 'let' and 'var' in JavaScript?",
      type: "multiple",
      options: [
        { id: "a", text: "let has block scope, var has function scope", isCorrect: true },
        { id: "b", text: "let is not hoisted, var is hoisted", isCorrect: true },
        { id: "c", text: "let can be redeclared, var cannot", isCorrect: false },
        { id: "d", text: "let is only available in ES6+", isCorrect: true }
      ],
      correctAnswers: ["a", "b", "d"],
      explanation: "let has block scope and is not hoisted, while var has function scope and is hoisted. let cannot be redeclared in the same scope.",
      difficulty: "medium",
      category: "JavaScript (Core)",
      subcategory: "Variables & Scope",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["javascript", "variables-scope"]
    },
    {
      title: "Closure Concept",
      content: "What will this code output?\n\nfunction outer() {\n  let x = 10;\n  return function inner() {\n    console.log(x);\n  };\n}\nconst fn = outer();\nfn();",
      type: "single",
      options: [
        { id: "a", text: "10", isCorrect: true },
        { id: "b", text: "undefined", isCorrect: false },
        { id: "c", text: "ReferenceError", isCorrect: false },
        { id: "d", text: "null", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "This demonstrates closure - the inner function has access to the outer function's variables even after the outer function returns.",
      difficulty: "hard",
      category: "JavaScript (Core)",
      subcategory: "Functions",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 3,
      timeLimit: 90,
      tags: ["javascript", "functions"]
    },
    {
      title: "Promise vs Async/Await",
      content: "Which statements about async/await are true?",
      type: "multiple",
      options: [
        { id: "a", text: "async/await is syntactic sugar over Promises", isCorrect: true },
        { id: "b", text: "async functions always return a Promise", isCorrect: true },
        { id: "c", text: "await can only be used inside async functions", isCorrect: true },
        { id: "d", text: "async/await is slower than Promises", isCorrect: false }
      ],
      correctAnswers: ["a", "b", "c"],
      explanation: "async/await is syntactic sugar over Promises, async functions always return a Promise, and await can only be used inside async functions.",
      difficulty: "medium",
      category: "JavaScript (Core)",
      subcategory: "Async Programming",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["javascript", "async-programming"]
    },
    {
      title: "Event Loop Understanding",
      content: "What will be the output order?\n\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');",
      type: "single",
      options: [
        { id: "a", text: "1, 4, 3, 2", isCorrect: true },
        { id: "b", text: "1, 2, 3, 4", isCorrect: false },
        { id: "c", text: "1, 4, 2, 3", isCorrect: false },
        { id: "d", text: "4, 1, 3, 2", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "Synchronous code runs first (1, 4), then microtasks (Promises - 3), then macrotasks (setTimeout - 2).",
      difficulty: "hard",
      category: "JavaScript (Core)",
      subcategory: "Async Programming",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 3,
      timeLimit: 90,
      tags: ["javascript", "async-programming"]
    },
    {
      title: "Array Methods",
      content: "Which array method creates a new array with all elements that pass a test?",
      type: "single",
      options: [
        { id: "a", text: "filter()", isCorrect: true },
        { id: "b", text: "map()", isCorrect: false },
        { id: "c", text: "forEach()", isCorrect: false },
        { id: "d", text: "find()", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "filter() creates a new array with elements that pass the test implemented by the provided function.",
      difficulty: "easy",
      category: "JavaScript (Core)",
      subcategory: "ES6+ Features",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 1,
      timeLimit: 30,
      tags: ["javascript", "es6-features"]
    },
    {
      title: "Destructuring Assignment",
      content: "Which statements about destructuring are true?",
      type: "multiple",
      options: [
        { id: "a", text: "Object destructuring uses curly braces {}", isCorrect: true },
        { id: "b", text: "Array destructuring uses square brackets []", isCorrect: true },
        { id: "c", text: "Destructuring can have default values", isCorrect: true },
        { id: "d", text: "Destructuring only works with objects", isCorrect: false }
      ],
      correctAnswers: ["a", "b", "c"],
      explanation: "Object destructuring uses curly braces {}, array destructuring uses square brackets [], and destructuring can have default values.",
      difficulty: "medium",
      category: "JavaScript (Core)",
      subcategory: "ES6+ Features",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["javascript", "es6-features"]
    },
    {
      title: "DOM Manipulation",
      content: "What is the difference between 'textContent' and 'innerHTML'?",
      type: "multiple",
      options: [
        { id: "a", text: "textContent returns only text, innerHTML returns HTML", isCorrect: true },
        { id: "b", text: "textContent is safer against XSS attacks", isCorrect: true },
        { id: "c", text: "innerHTML can execute scripts", isCorrect: true },
        { id: "d", text: "textContent is faster", isCorrect: true }
      ],
      correctAnswers: ["a", "b", "c", "d"],
      explanation: "textContent is safer and faster as it only handles text, while innerHTML can execute scripts and is vulnerable to XSS.",
      difficulty: "medium",
      category: "JavaScript (Core)",
      subcategory: "DOM Manipulation",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["javascript", "dom-manipulation"]
    },
    {
      title: "Arrow Functions vs Regular Functions",
      content: "Which statements about arrow functions are true?",
      type: "multiple",
      options: [
        { id: "a", text: "Arrow functions don't have their own 'this'", isCorrect: true },
        { id: "b", text: "Arrow functions can't be used as constructors", isCorrect: true },
        { id: "c", text: "Arrow functions don't have 'arguments' object", isCorrect: true },
        { id: "d", text: "Arrow functions are always anonymous", isCorrect: false }
      ],
      correctAnswers: ["a", "b", "c"],
      explanation: "Arrow functions inherit 'this' from the enclosing scope, can't be constructors, and don't have 'arguments'. They can be assigned to variables.",
      difficulty: "medium",
      category: "JavaScript (Core)",
      subcategory: "ES6+ Features",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["javascript", "es6-features"]
    },
    {
      title: "Module System",
      content: "What is the difference between 'export default' and 'export'?",
      type: "single",
      options: [
        { id: "a", text: "export default allows one default export per module, export allows multiple named exports", isCorrect: true },
        { id: "b", text: "export default requires curly braces when importing, export doesn't", isCorrect: false },
        { id: "c", text: "export default can only export functions, export can export anything", isCorrect: false },
        { id: "d", text: "There is no difference between them", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "export default allows one default export per module and can be imported without curly braces. Named exports require curly braces and can have multiple per module.",
      difficulty: "easy",
      category: "JavaScript (Core)",
      subcategory: "ES6+ Features",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 1,
      timeLimit: 30,
      tags: ["javascript", "es6-features"]
    },
    {
      title: "Error Handling",
      content: "What will happen if you don't handle a rejected Promise?",
      type: "single",
      options: [
        { id: "a", text: "The error will be silently ignored", isCorrect: false },
        { id: "b", text: "An unhandled promise rejection warning will be logged", isCorrect: true },
        { id: "c", text: "The program will crash", isCorrect: false },
        { id: "d", text: "The Promise will retry automatically", isCorrect: false }
      ],
      correctAnswers: ["b"],
      explanation: "Unhandled promise rejections will log a warning to the console but won't crash the program.",
      difficulty: "medium",
      category: "JavaScript (Core)",
      subcategory: "Async Programming",
      learningPath: "javascript-deep-dive",
      sectionId: "javascript-fundamentals",
      points: 2,
      timeLimit: 60,
      tags: ["javascript", "async-programming"]
    }
  ]
};

// Create questions via bulk import API
async function createQuestionsBulk(questions) {
  try {
    const response = await fetch(`${BASE_URL}/api/questions/unified`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bulk: true,
        questions: questions
      })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating questions:', error);
    return { success: false, error: error.message };
  }
}

// Main function to create all questions
async function createAllQuestions() {
  try {
    console.log('🚀 Starting choice-only question creation via API...');
    
    // Flatten all questions into a single array
    const allQuestions = [];
    for (const [category, questions] of Object.entries(QUESTIONS_DATA)) {
      allQuestions.push(...questions);
    }
    
    console.log(`📝 Creating ${allQuestions.length} questions total...`);
    console.log(`- HTML & CSS: ${QUESTIONS_DATA['HTML & CSS'].length} questions`);
    console.log(`- JavaScript (Core): ${QUESTIONS_DATA['JavaScript (Core)'].length} questions`);
    console.log(`- Question types: single choice, multiple choice only`);
    
    // Create all questions via bulk import
    const result = await createQuestionsBulk(allQuestions);
    
    if (result.success) {
      console.log('🎉 Question creation completed!');
      console.log(`\n📊 Summary:`);
      console.log(`- Total questions created: ${result.data.success}`);
      console.log(`- Failed: ${result.data.failed}`);
      console.log(`- Categories: ${Object.keys(QUESTIONS_DATA).length}`);
      console.log(`- Questions per category: 10`);
      console.log(`- Question types: single choice, multiple choice only`);
      
      if (result.data.errors && result.data.errors.length > 0) {
        console.log('\n❌ Errors:');
        result.data.errors.forEach(error => console.log(`- ${error}`));
      }
      
      return { success: true, totalQuestions: result.data.success };
    } else {
      console.log('❌ Failed to create questions:', result.error);
      return { success: false, error: result.error };
    }
    
  } catch (error) {
    console.error('❌ Error creating questions:', error);
    return { success: false, error: error.message };
  }
}

// Run the script
if (require.main === module) {
  createAllQuestions().then((result) => {
    if (result.success) {
      console.log('✅ Script completed successfully');
      process.exit(0);
    } else {
      console.log('❌ Script failed:', result.error);
      process.exit(1);
    }
  }).catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = { createAllQuestions };
