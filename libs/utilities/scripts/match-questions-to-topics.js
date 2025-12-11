// Script to match questions to topics and create missing topics
// v1.0

const questions = [
  {
    id: "c3d4e5f6-a1b2-4c5d-8e9f-23456789012a",
    title: "JavaScript Hoisting: var vs let in a function",
    tags: ["javascript", "hoisting", "scope", "var", "let"],
  },
  {
    id: "c3d4e5f6-a1b2-4c5d-8e9f-23456789012b",
    title: "Async Execution and Scoping: var vs let in loops",
    tags: ["javascript", "scope", "var", "let", "asynchronous"],
  },
  {
    id: "a2b3c4d5-e6f7-8g9h-0i1j-23456789013c",
    title: "Arrow Functions and `this` Context in Objects",
    tags: ["javascript", "this", "arrow-functions", "object"],
  },
  {
    id: "b3c4d5e6-f7g8-9h0i-1j2k-3456789014d",
    title: "Type Coercion: Unary Plus and Logical NOT",
    tags: ["javascript", "type-coercion", "operators"],
  },
  {
    id: "c4d5e6f7-g8h9-0i1j-2k3l-456789015e",
    title: "Object Property Access: Dot vs. Bracket Notation",
    tags: ["javascript", "object", "property-access", "error-handling"],
  },
  {
    id: "d5e6f7g8-h9i0-1j2k-3l4m-56789016f",
    title: "Object Reference vs. Value Assignment",
    tags: ["javascript", "object", "reference", "memory"],
  },
  {
    id: "e6f7g8h9-i0j1-2k3l-4m5n-6789017g",
    title: "Equality Operators: `==` vs. `===` with Object Wrappers",
    tags: ["javascript", "equality", "coercion", "object-wrapper"],
  },
  {
    id: "f7g8h9i0-j1k2-3l4m-5n6o-789018h",
    title: "Static Methods in JavaScript Classes",
    tags: ["javascript", "class", "static", "es6", "error-handling"],
  },
  {
    id: "g8h9i0j1-k2l3-4m5n-6o7p-89019i",
    title: "Global Variable Creation via Typo (Sloppy Mode)",
    tags: ["javascript", "scope", "global", "sloppy-mode", "typo"],
  },
  {
    id: "h9i0j1k2-l3m4-5n6o-7p8q-90110j",
    title: "Functions as Objects: Adding Properties",
    tags: ["javascript", "function", "object", "first-class-functions"],
  },
];

// Existing JavaScript topics
const existingTopics = [
  {
    id: "8dcdb2c6-5056-4b47-a5ce-a3cd4a1e20eb",
    name: "Basics",
    slug: "javascript-basics",
    description:
      "Fundamental JavaScript concepts: variables (var, let, const), hoisting, scope, closures, data types, operators, and control flow",
  },
  {
    id: "1b62c368-375b-4df1-aadd-eb0504ae3612",
    name: "This Binding",
    slug: "this-binding",
    description:
      "The 'this' keyword: context binding, call/apply/bind methods, arrow functions vs regular functions, and lexical scope",
  },
  {
    id: "4d2a6785-b6db-4985-953f-f3ba4a388e8e",
    name: "Classes",
    slug: "classes",
    description:
      "ES6+ classes: class syntax, inheritance, static methods, private fields, constructors, and class-based object-oriented programming",
  },
  {
    id: "ea7a64be-4db2-4acd-abdb-13bd93a7218d",
    name: "Data Structures",
    slug: "data-structures",
    description:
      "JavaScript data structures: Arrays, Objects, Sets, Maps, WeakMap, WeakSet, and their methods and use cases",
  },
  {
    id: "2f38feb2-86f3-4ff6-ab47-08e78b5e80c8",
    name: "Async/Await",
    slug: "async-await",
    description:
      "Asynchronous JavaScript: Promises, async/await syntax, Promise methods (all, race, allSettled), error handling, and event loop",
  },
];

// JavaScript category ID
const JAVASCRIPT_CATEGORY_ID = "c5929620-9e0e-4be6-86e8-4696112a2cd3";

// Function to find matching topic
function findMatchingTopic(question) {
  const titleLower = question.title.toLowerCase();
  const tagsLower = question.tags.map((t) => t.toLowerCase());

  // Specific topic matching logic
  for (const topic of existingTopics) {
    const topicNameLower = topic.name.toLowerCase();

    // Match "This Binding" topic
    if (
      topicNameLower === "this binding" &&
      (tagsLower.includes("this") || titleLower.includes("this"))
    ) {
      return topic;
    }

    // Match "Classes" topic
    if (
      topicNameLower === "classes" &&
      (tagsLower.includes("class") ||
        tagsLower.includes("static") ||
        titleLower.includes("class"))
    ) {
      return topic;
    }

    // Match "Basics" topic for hoisting, scope, var, let (but not if it's about this or classes)
    if (
      topicNameLower === "basics" &&
      (tagsLower.includes("hoisting") ||
        (tagsLower.includes("scope") && !tagsLower.includes("this")) ||
        (tagsLower.includes("var") && !tagsLower.includes("this")) ||
        (tagsLower.includes("let") && !tagsLower.includes("this")) ||
        titleLower.includes("hoisting") ||
        (titleLower.includes("scope") && !titleLower.includes("this")))
    ) {
      // But exclude if it's about this binding or classes
      if (
        !tagsLower.includes("this") &&
        !tagsLower.includes("class") &&
        !titleLower.includes("this") &&
        !titleLower.includes("class")
      ) {
        return topic;
      }
    }

    // Match "Data Structures" for object-related questions (but not this binding or functions as objects)
    if (
      topicNameLower === "data structures" &&
      tagsLower.includes("object") &&
      !tagsLower.includes("this") &&
      !tagsLower.includes("arrow-functions") &&
      !tagsLower.includes("first-class-functions") &&
      !titleLower.includes("this")
    ) {
      return topic;
    }
  }

  return null;
}

// Function to determine topic name for new topics
function getTopicNameForQuestion(question) {
  const tagsLower = question.tags.map((t) => t.toLowerCase());
  const titleLower = question.title.toLowerCase();

  // Type Coercion topics
  if (
    tagsLower.includes("type-coercion") ||
    tagsLower.includes("coercion") ||
    titleLower.includes("coercion") ||
    (tagsLower.includes("equality") && tagsLower.includes("coercion"))
  ) {
    return "Type Coercion";
  }

  // Equality operators (involves coercion)
  if (tagsLower.includes("equality") && !tagsLower.includes("this")) {
    return "Type Coercion";
  }

  // Functions as objects / first-class functions
  if (
    (tagsLower.includes("function") &&
      tagsLower.includes("first-class-functions")) ||
    (tagsLower.includes("function") &&
      tagsLower.includes("object") &&
      titleLower.includes("function"))
  ) {
    return "Functions";
  }

  // Objects (property access, references, etc.)
  if (
    tagsLower.includes("object") &&
    !tagsLower.includes("this") &&
    !tagsLower.includes("arrow-functions") &&
    !tagsLower.includes("first-class-functions") &&
    (tagsLower.includes("property-access") ||
      tagsLower.includes("reference") ||
      tagsLower.includes("memory") ||
      titleLower.includes("object"))
  ) {
    return "Objects";
  }

  return null;
}

// Process questions
const results = questions.map((q) => {
  const matchingTopic = findMatchingTopic(q);

  if (matchingTopic) {
    return {
      questionId: q.id,
      questionTitle: q.title,
      topicId: matchingTopic.id,
      topicName: matchingTopic.name,
      action: "LINK_TO_EXISTING",
    };
  } else {
    const newTopicName = getTopicNameForQuestion(q);
    return {
      questionId: q.id,
      questionTitle: q.title,
      topicName: newTopicName,
      action: "CREATE_NEW",
    };
  }
});

console.log(JSON.stringify(results, null, 2));
