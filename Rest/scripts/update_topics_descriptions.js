const fs = require('fs');
const path = require('path');

/**
 * Updates topics.json with improved descriptions for HTML, CSS, and JavaScript
 */

const topicsPath = path.join(__dirname, '../final-questions-v01/topics/topics.json');
let topics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

// Improved descriptions for JavaScript topics
const jsTopicDescriptions = {
  "Basics": "Fundamental JavaScript concepts: variables (var, let, const), hoisting, scope, closures, data types, operators, and control flow",
  "Data Structures": "JavaScript data structures: Arrays, Objects, Sets, Maps, WeakMap, WeakSet, and their methods and use cases",
  "This Binding": "The 'this' keyword: context binding, call/apply/bind methods, arrow functions vs regular functions, and lexical scope",
  "Classes": "ES6+ classes: class syntax, inheritance, static methods, private fields, constructors, and class-based object-oriented programming",
  "ES6+ Features": "Modern JavaScript features: destructuring, spread/rest operators, template literals, default parameters, and enhanced object literals",
  "Prototypes": "JavaScript prototype system: prototype chain, __proto__, Object.create, prototype inheritance, and prototype methods",
  "Generators": "Generator functions: yield keyword, generator objects, iterators, async generators, and use cases for lazy evaluation",
  "Async/Await": "Asynchronous JavaScript: Promises, async/await syntax, Promise methods (all, race, allSettled), error handling, and event loop",
  "Modules": "ES6 modules: import/export syntax, default exports, named exports, dynamic imports, module scope, and module systems"
};

// Update JavaScript topic descriptions
if (topics.categories.JavaScript && topics.categories.JavaScript.topics) {
  Object.keys(topics.categories.JavaScript.topics).forEach(topicName => {
    if (jsTopicDescriptions[topicName]) {
      topics.categories.JavaScript.topics[topicName].description = jsTopicDescriptions[topicName];
    }
  });
}

// Update JavaScript category description
topics.categories.JavaScript.description = "JavaScript - Programming language for web development: core concepts, ES6+ features, async programming, and advanced patterns";

// Update metadata
topics.metadata.lastUpdated = new Date().toISOString();

// Write updated topics
fs.writeFileSync(topicsPath, JSON.stringify(topics, null, 2));

console.log('✅ Updated topics.json with improved descriptions');
console.log(`   JavaScript category: ${Object.keys(topics.categories.JavaScript.topics).length} topics`);
console.log(`   Total categories: ${topics.metadata.totalCategories}`);
console.log(`   Total topics: ${topics.metadata.totalTopics}`);
console.log(`   Total questions: ${topics.metadata.totalQuestions}`);


