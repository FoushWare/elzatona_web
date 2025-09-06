import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample flashcards data
const sampleFlashcards = [
  // JavaScript Basics
  {
    question: "What is the difference between `let`, `const`, and `var` in JavaScript?",
    answer: "`var` is function-scoped and can be redeclared. `let` is block-scoped and can be reassigned but not redeclared. `const` is block-scoped and cannot be reassigned or redeclared.",
    category: "JavaScript",
    difficulty: "beginner",
    tags: ["variables", "scope", "es6"]
  },
  {
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. It allows for data privacy and function factories.",
    category: "JavaScript",
    difficulty: "intermediate",
    tags: ["closures", "scope", "functions"]
  },
  {
    question: "What is the difference between `==` and `===` in JavaScript?",
    answer: "`==` performs type coercion before comparison, while `===` performs strict comparison without type coercion. `===` is generally preferred for more predictable behavior.",
    category: "JavaScript",
    difficulty: "beginner",
    tags: ["operators", "comparison", "type-coercion"]
  },
  {
    question: "What is the `this` keyword in JavaScript?",
    answer: "`this` refers to the object that is currently executing the function. Its value depends on how the function is called: global context, object method, constructor, or explicit binding.",
    category: "JavaScript",
    difficulty: "intermediate",
    tags: ["this", "context", "objects"]
  },
  {
    question: "What are JavaScript Promises?",
    answer: "Promises are objects representing the eventual completion or failure of an asynchronous operation. They provide a cleaner alternative to callbacks and support chaining with `.then()` and `.catch()`.",
    category: "JavaScript",
    difficulty: "intermediate",
    tags: ["promises", "async", "asynchronous"]
  },

  // React Basics
  {
    question: "What is JSX in React?",
    answer: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript. It gets transpiled to React.createElement() calls and makes component code more readable.",
    category: "React",
    difficulty: "beginner",
    tags: ["jsx", "syntax", "components"]
  },
  {
    question: "What is the difference between props and state in React?",
    answer: "Props are read-only data passed down from parent components. State is internal data that can be modified by the component itself using setState() or useState() hook.",
    category: "React",
    difficulty: "beginner",
    tags: ["props", "state", "data-flow"]
  },
  {
    question: "What are React Hooks?",
    answer: "Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, and custom hooks.",
    category: "React",
    difficulty: "intermediate",
    tags: ["hooks", "functional-components", "state"]
  },
  {
    question: "What is the useEffect hook used for?",
    answer: "useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It runs after every render by default.",
    category: "React",
    difficulty: "intermediate",
    tags: ["useeffect", "side-effects", "lifecycle"]
  },
  {
    question: "What is the Virtual DOM in React?",
    answer: "The Virtual DOM is a JavaScript representation of the real DOM. React uses it to optimize updates by comparing the virtual DOM with the previous version and only updating the parts that changed.",
    category: "React",
    difficulty: "intermediate",
    tags: ["virtual-dom", "performance", "rendering"]
  },

  // CSS Basics
  {
    question: "What is the CSS Box Model?",
    answer: "The CSS Box Model consists of content, padding, border, and margin. It defines how elements are sized and spaced, with the total width/height including all these components.",
    category: "CSS",
    difficulty: "beginner",
    tags: ["box-model", "layout", "spacing"]
  },
  {
    question: "What is the difference between `display: block` and `display: inline`?",
    answer: "Block elements take up the full width of their container and start on a new line. Inline elements only take up as much width as needed and can sit next to other inline elements.",
    category: "CSS",
    difficulty: "beginner",
    tags: ["display", "layout", "positioning"]
  },
  {
    question: "What is CSS Flexbox?",
    answer: "Flexbox is a layout method that allows you to align and distribute space among items in a container, even when their size is unknown or dynamic. It's great for one-dimensional layouts.",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["flexbox", "layout", "alignment"]
  },
  {
    question: "What is CSS Grid?",
    answer: "CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns. It's more powerful than Flexbox for two-dimensional layouts.",
    category: "CSS",
    difficulty: "intermediate",
    tags: ["grid", "layout", "two-dimensional"]
  },
  {
    question: "What is the difference between `margin` and `padding`?",
    answer: "Margin is the space outside an element's border, while padding is the space inside an element's border. Margin affects spacing between elements, padding affects spacing within an element.",
    category: "CSS",
    difficulty: "beginner",
    tags: ["margin", "padding", "spacing"]
  },

  // HTML Basics
  {
    question: "What is semantic HTML?",
    answer: "Semantic HTML uses elements that clearly describe their meaning in a human- and machine-readable way. Examples include `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.",
    category: "HTML",
    difficulty: "beginner",
    tags: ["semantic", "accessibility", "seo"]
  },
  {
    question: "What is the difference between `<div>` and `<span>`?",
    answer: "`<div>` is a block-level element used for grouping and layout, while `<span>` is an inline element used for styling small portions of text or inline content.",
    category: "HTML",
    difficulty: "beginner",
    tags: ["div", "span", "elements"]
  },
  {
    question: "What are HTML5 semantic elements?",
    answer: "HTML5 semantic elements include `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<figure>`, and `<figcaption>`. They provide meaning to the structure of web pages.",
    category: "HTML",
    difficulty: "beginner",
    tags: ["html5", "semantic", "structure"]
  },

  // Advanced Topics
  {
    question: "What is the difference between `null` and `undefined` in JavaScript?",
    answer: "`undefined` means a variable has been declared but not assigned a value. `null` is an assignment value that represents no value or empty value. `null` is an object, `undefined` is a type.",
    category: "JavaScript",
    difficulty: "intermediate",
    tags: ["null", "undefined", "types"]
  },
  {
    question: "What is event delegation in JavaScript?",
    answer: "Event delegation is a technique where you attach a single event listener to a parent element to handle events for multiple child elements. It's useful for dynamic content and improves performance.",
    category: "JavaScript",
    difficulty: "advanced",
    tags: ["events", "delegation", "performance"]
  },
  {
    question: "What is the difference between `map()` and `forEach()` in JavaScript?",
    answer: "`map()` creates a new array with the results of calling a function on every element, while `forEach()` executes a function for each array element but doesn't return a new array.",
    category: "JavaScript",
    difficulty: "intermediate",
    tags: ["arrays", "methods", "functional-programming"]
  },
  {
    question: "What is the purpose of the `key` prop in React lists?",
    answer: "The `key` prop helps React identify which items have changed, been added, or removed. It should be unique among siblings and stable across re-renders for optimal performance.",
    category: "React",
    difficulty: "intermediate",
    tags: ["keys", "lists", "performance", "reconciliation"]
  },
  {
    question: "What is the difference between controlled and uncontrolled components in React?",
    answer: "Controlled components have their value controlled by React state, while uncontrolled components store their own state internally. Controlled components are generally preferred for form handling.",
    category: "React",
    difficulty: "intermediate",
    tags: ["controlled", "uncontrolled", "forms", "state"]
  }
];

async function seedFlashcards() {
  try {
    console.log('🌱 Starting to seed flashcards...');
    
    const flashcardsRef = collection(db, 'flashcards');
    let successCount = 0;
    let errorCount = 0;

    for (const flashcard of sampleFlashcards) {
      try {
        await addDoc(flashcardsRef, {
          ...flashcard,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
        successCount++;
        console.log(`✅ Added flashcard: ${flashcard.question.substring(0, 50)}...`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding flashcard: ${error.message}`);
      }
    }

    console.log(`\n🎉 Seeding complete!`);
    console.log(`✅ Successfully added: ${successCount} flashcards`);
    console.log(`❌ Errors: ${errorCount} flashcards`);
    
    if (successCount > 0) {
      console.log(`\n📊 Summary by category:`);
      const categoryCount = sampleFlashcards.reduce((acc, card) => {
        acc[card.category] = (acc[card.category] || 0) + 1;
        return acc;
      }, {});
      
      Object.entries(categoryCount).forEach(([category, count]) => {
        console.log(`   ${category}: ${count} cards`);
      });
    }

  } catch (error) {
    console.error('💥 Fatal error during seeding:', error);
  }
}

// Run the seeding function
seedFlashcards();
