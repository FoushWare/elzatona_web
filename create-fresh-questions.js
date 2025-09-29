#!/usr/bin/env node

/**
 * Fresh Question Generator - Simplified Version
 * Creates 10 questions for each core category
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, getDocs, updateDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvOkBwJ1T3cTToj4XqHn8YqHn8YqHn8Yq",
  authDomain: "elzatona-web.firebaseapp.com",
  projectId: "elzatona-web",
  storageBucket: "elzatona-web.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Core categories with their learning paths
const CATEGORIES = {
  'HTML & CSS': {
    learningPath: 'frontend-basics',
    sector: 'html-fundamentals',
    topics: ['HTML Fundamentals', 'CSS Layout', 'Responsive Design', 'CSS Grid', 'Flexbox']
  },
  'JavaScript (Core)': {
    learningPath: 'javascript-deep-dive',
    sector: 'javascript-fundamentals',
    topics: ['Variables & Scope', 'Functions', 'Async Programming', 'DOM Manipulation', 'ES6+ Features']
  },
  'React': {
    learningPath: 'react-mastery',
    sector: 'react-fundamentals',
    topics: ['Components', 'Hooks', 'State Management', 'Lifecycle', 'Performance']
  },
  'TypeScript': {
    learningPath: 'typescript-essentials',
    sector: 'typescript-essentials',
    topics: ['Types', 'Interfaces', 'Generics', 'Utility Types', 'Advanced Patterns']
  },
  'Performance': {
    learningPath: 'performance-optimization',
    sector: 'performance-optimization',
    topics: ['Bundle Optimization', 'Runtime Performance', 'Caching', 'Lazy Loading', 'Monitoring']
  }
};

// Question templates for each category
const QUESTION_TEMPLATES = {
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
      difficulty: "easy"
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
      difficulty: "medium"
    },
    {
      title: "CSS Grid Layout",
      content: "How do you create a CSS Grid with 3 equal columns?",
      type: "code",
      options: [
        { id: "a", text: "grid-template-columns: 1fr 1fr 1fr;", isCorrect: true },
        { id: "b", text: "grid-template-columns: 3fr;", isCorrect: false },
        { id: "c", text: "grid-columns: 1fr 1fr 1fr;", isCorrect: false },
        { id: "d", text: "grid-template: 1fr 1fr 1fr;", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "grid-template-columns: 1fr 1fr 1fr creates three equal columns using fractional units.",
      difficulty: "medium"
    },
    {
      title: "Responsive Design Breakpoints",
      content: "What is the recommended approach for mobile-first responsive design?",
      type: "open-ended",
      options: [],
      correctAnswers: [],
      explanation: "Mobile-first design starts with styles for mobile devices and uses min-width media queries to progressively enhance for larger screens.",
      difficulty: "easy",
      expectedAnswer: "Start with mobile styles and use min-width media queries to enhance for larger screens"
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
      difficulty: "medium"
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
      difficulty: "easy"
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
      difficulty: "medium"
    },
    {
      title: "CSS Animations vs Transitions",
      content: "When would you use CSS animations instead of transitions?",
      type: "open-ended",
      options: [],
      correctAnswers: [],
      explanation: "Use animations for complex, multi-step effects that need to run automatically or be controlled programmatically. Use transitions for simple state changes triggered by user interaction.",
      difficulty: "hard",
      expectedAnswer: "For complex multi-step effects, automatic animations, or when you need programmatic control"
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
      difficulty: "easy"
    },
    {
      title: "CSS Custom Properties",
      content: "How do you define a CSS custom property (CSS variable)?",
      type: "code",
      options: [
        { id: "a", text: "--variable-name: value;", isCorrect: true },
        { id: "b", text: "var(--variable-name): value;", isCorrect: false },
        { id: "c", text: "$variable-name: value;", isCorrect: false },
        { id: "d", text: "custom-property: value;", isCorrect: false }
      ],
      correctAnswers: ["a"],
      explanation: "CSS custom properties are defined with --variable-name: value; and accessed with var(--variable-name).",
      difficulty: "medium"
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
      difficulty: "medium"
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
      difficulty: "hard"
    },
    {
      title: "Promise vs Async/Await",
      content: "Convert this Promise code to async/await:\n\nfetch('/api/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));",
      type: "code",
      options: [
        { id: "a", text: "async function getData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error(error);\n  }\n}", isCorrect: true },
        { id: "b", text: "function getData() {\n  const response = await fetch('/api/data');\n  const data = await response.json();\n  console.log(data);\n}", isCorrect: false },
        { id: "c", text: "async getData() {\n  const response = await fetch('/api/data');\n  const data = await response.json();\n  console.log(data);\n}", isCorrect: false },
        { id: "d", text: "const getData = async () => {\n  const response = await fetch('/api/data');\n  const data = await response.json();\n  console.log(data);\n}", isCorrect: true }
      ],
      correctAnswers: ["a", "d"],
      explanation: "Both function declarations and arrow functions can be made async. Error handling should be done with try/catch blocks.",
      difficulty: "medium"
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
      difficulty: "hard"
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
      difficulty: "easy"
    },
    {
      title: "Destructuring Assignment",
      content: "How do you destructure an object to extract 'name' and 'age' properties?",
      type: "code",
      options: [
        { id: "a", text: "const { name, age } = person;", isCorrect: true },
        { id: "b", text: "const [name, age] = person;", isCorrect: false },
        { id: "c", text: "const name, age = person;", isCorrect: false },
        { id: "d", text: "const {name: name, age: age} = person;", isCorrect: true }
      ],
      correctAnswers: ["a", "d"],
      explanation: "Object destructuring uses curly braces {} and can use shorthand syntax when property and variable names match.",
      difficulty: "medium"
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
      difficulty: "medium"
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
      difficulty: "medium"
    },
    {
      title: "Module System",
      content: "What is the difference between 'export default' and 'export'?",
      type: "open-ended",
      options: [],
      correctAnswers: [],
      explanation: "export default allows one default export per module and can be imported without curly braces. Named exports require curly braces and can have multiple per module.",
      difficulty: "easy",
      expectedAnswer: "export default is for single default export, export is for named exports that require curly braces"
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
      difficulty: "medium"
    }
  ]
  // Add more categories as needed...
};

// Generate questions for a specific category
function generateQuestionsForCategory(category, count = 10) {
  const questions = [];
  const categoryData = CATEGORIES[category];
  const templates = QUESTION_TEMPLATES[category] || [];
  
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    const topic = categoryData.topics[i % categoryData.topics.length];
    
    const question = {
      title: `${template.title} ${i + 1}`,
      content: template.content,
      type: template.type,
      options: template.options.map(opt => ({
        id: opt.id,
        text: opt.text,
        isCorrect: opt.isCorrect
      })),
      correctAnswers: template.correctAnswers,
      explanation: template.explanation,
      category: category,
      subcategory: topic,
      difficulty: template.difficulty,
      tags: [category.toLowerCase(), topic.toLowerCase().replace(/\s+/g, '-')],
      learningPath: categoryData.learningPath,
      sectionId: categoryData.sector,
      points: template.difficulty === 'easy' ? 1 : template.difficulty === 'medium' ? 2 : 3,
      timeLimit: template.difficulty === 'easy' ? 30 : template.difficulty === 'medium' ? 60 : 90,
      expectedAnswer: template.expectedAnswer,
      isActive: true,
      isComplete: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin'
    };
    
    questions.push(question);
  }
  
  return questions;
}

// Main function to create all questions
async function createAllQuestions() {
  try {
    console.log('🚀 Starting fresh question creation...');
    
    // Clear existing questions first
    console.log('🧹 Clearing existing questions...');
    const existingQuestions = await getDocs(collection(db, 'unifiedQuestions'));
    const deletePromises = [];
    existingQuestions.forEach(doc => {
      deletePromises.push(doc.ref.delete());
    });
    await Promise.all(deletePromises);
    console.log(`✅ Cleared ${existingQuestions.size} existing questions`);
    
    // Create questions for each category
    const allQuestions = [];
    
    for (const category of Object.keys(CATEGORIES)) {
      console.log(`📝 Creating questions for ${category}...`);
      const questions = generateQuestionsForCategory(category, 10);
      allQuestions.push(...questions);
    }
    
    // Add questions to Firestore
    console.log(`💾 Adding ${allQuestions.length} questions to Firestore...`);
    const addPromises = allQuestions.map(question => 
      addDoc(collection(db, 'unifiedQuestions'), question)
    );
    
    const results = await Promise.allSettled(addPromises);
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    console.log(`✅ Successfully created ${successful} questions`);
    if (failed > 0) {
      console.log(`❌ Failed to create ${failed} questions`);
    }
    
    // Update learning path question counts
    console.log('🔄 Updating learning path question counts...');
    for (const [category, data] of Object.entries(CATEGORIES)) {
      const questions = allQuestions.filter(q => q.category === category);
      const learningPathRef = doc(db, 'learningPaths', data.learningPath);
      await updateDoc(learningPathRef, {
        questionCount: questions.length,
        updatedAt: new Date().toISOString()
      });
      console.log(`✅ Updated ${data.learningPath} with ${questions.length} questions`);
    }
    
    console.log('🎉 Question creation completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Total questions created: ${successful}`);
    console.log(`- Categories: ${Object.keys(CATEGORIES).length}`);
    console.log(`- Questions per category: 10`);
    console.log(`- Question types: single, multiple, code, open-ended`);
    
    return { success: true, totalQuestions: successful };
    
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

module.exports = { createAllQuestions, generateQuestionsForCategory };
