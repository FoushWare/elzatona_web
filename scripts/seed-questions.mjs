// v1.0 - Seed Questions Script for Firebase
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  setDoc 
} from 'firebase/firestore';

// Firebase configuration (replace with your config)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample questions data
const sampleQuestions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: [
      "var myVar = 10;",
      "variable myVar = 10;",
      "v myVar = 10;",
      "declare myVar = 10;"
    ],
    correctAnswer: 0,
    explanation: "In JavaScript, variables are declared using the var, let, or const keywords. The var keyword is the traditional way to declare variables.",
    category: "JavaScript",
    difficulty: "easy",
    tags: ["variables", "declaration", "basics"],
    points: 5,
    timeLimit: 30,
    isActive: true
  },
  {
    question: "Which method is used to add an element to the end of an array?",
    options: [
      "push()",
      "append()",
      "add()",
      "insert()"
    ],
    correctAnswer: 0,
    explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
    category: "JavaScript",
    difficulty: "easy",
    tags: ["arrays", "methods", "basics"],
    points: 5,
    timeLimit: 30,
    isActive: true
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      "The current function",
      "The current object",
      "The global object",
      "The parent object"
    ],
    correctAnswer: 1,
    explanation: "The 'this' keyword refers to the object that is currently executing the function. Its value depends on how the function is called.",
    category: "JavaScript",
    difficulty: "medium",
    tags: ["this", "context", "objects"],
    points: 10,
    timeLimit: 45,
    isActive: true
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: [
      "string",
      "number",
      "boolean",
      "float"
    ],
    correctAnswer: 3,
    explanation: "JavaScript has number (not separate int/float), string, boolean, undefined, null, symbol, and object data types. There is no separate 'float' type.",
    category: "JavaScript",
    difficulty: "medium",
    tags: ["data-types", "basics"],
    points: 10,
    timeLimit: 45,
    isActive: true
  },
  {
    question: "What is the output of console.log(typeof null) in JavaScript?",
    options: [
      "null",
      "undefined",
      "object",
      "string"
    ],
    correctAnswer: 2,
    explanation: "This is a well-known quirk in JavaScript. typeof null returns 'object' due to a bug in the original implementation that has been preserved for backward compatibility.",
    category: "JavaScript",
    difficulty: "hard",
    tags: ["typeof", "null", "quirks"],
    points: 20,
    timeLimit: 60,
    isActive: true
  },
  {
    question: "Which React hook is used to manage state in functional components?",
    options: [
      "useState",
      "useEffect",
      "useContext",
      "useReducer"
    ],
    correctAnswer: 0,
    explanation: "useState is the primary hook for managing local state in functional components. It returns a stateful value and a function to update it.",
    category: "React",
    difficulty: "easy",
    tags: ["hooks", "state", "functional-components"],
    points: 5,
    timeLimit: 30,
    isActive: true
  },
  {
    question: "What is the purpose of the useEffect hook?",
    options: [
      "To manage component state",
      "To perform side effects",
      "To handle events",
      "To create refs"
    ],
    correctAnswer: 1,
    explanation: "useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
    category: "React",
    difficulty: "medium",
    tags: ["hooks", "side-effects", "lifecycle"],
    points: 10,
    timeLimit: 45,
    isActive: true
  },
  {
    question: "Which method is used to update state in React class components?",
    options: [
      "this.updateState()",
      "this.setState()",
      "this.modifyState()",
      "this.changeState()"
    ],
    correctAnswer: 1,
    explanation: "setState() is the method used to update the state object in React class components. It schedules an update to the component's state.",
    category: "React",
    difficulty: "medium",
    tags: ["class-components", "state", "methods"],
    points: 10,
    timeLimit: 45,
    isActive: true
  },
  {
    question: "What is JSX in React?",
    options: [
      "A JavaScript extension",
      "A templating language",
      "A syntax extension for JavaScript",
      "A separate programming language"
    ],
    correctAnswer: 2,
    explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It gets compiled to regular JavaScript.",
    category: "React",
    difficulty: "easy",
    tags: ["jsx", "syntax", "basics"],
    points: 5,
    timeLimit: 30,
    isActive: true
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: [
      "text-color",
      "color",
      "font-color",
      "text-style"
    ],
    correctAnswer: 1,
    explanation: "The 'color' property is used to set the color of the text content of an element.",
    category: "CSS",
    difficulty: "easy",
    tags: ["text", "color", "basics"],
    points: 5,
    timeLimit: 30,
    isActive: true
  },
  {
    question: "What does CSS Grid layout provide?",
    options: [
      "One-dimensional layout",
      "Two-dimensional layout",
      "Three-dimensional layout",
      "No layout capabilities"
    ],
    correctAnswer: 1,
    explanation: "CSS Grid provides a two-dimensional grid-based layout system, allowing you to create complex layouts with rows and columns.",
    category: "CSS",
    difficulty: "medium",
    tags: ["grid", "layout", "two-dimensional"],
    points: 10,
    timeLimit: 45,
    isActive: true
  },
  {
    question: "Which CSS property controls the space between elements?",
    options: [
      "spacing",
      "margin",
      "padding",
      "gap"
    ],
    correctAnswer: 1,
    explanation: "The 'margin' property controls the space outside an element's border, creating space between elements.",
    category: "CSS",
    difficulty: "easy",
    tags: ["spacing", "margin", "layout"],
    points: 5,
    timeLimit: 30,
    isActive: true
  }
];

// Sample categories
const sampleCategories = [
  {
    name: "JavaScript",
    description: "Core JavaScript programming concepts and features",
    icon: "🟨",
    color: "#F7DF1E",
    questionCount: 5,
    isActive: true
  },
  {
    name: "React",
    description: "React library for building user interfaces",
    icon: "⚛️",
    color: "#61DAFB",
    questionCount: 4,
    isActive: true
  },
  {
    name: "CSS",
    description: "Cascading Style Sheets for web styling",
    icon: "🎨",
    color: "#1572B6",
    questionCount: 3,
    isActive: true
  },
  {
    name: "HTML",
    description: "HyperText Markup Language for web structure",
    icon: "🌐",
    color: "#E34F26",
    questionCount: 0,
    isActive: true
  },
  {
    name: "Node.js",
    description: "JavaScript runtime for server-side development",
    icon: "🟢",
    color: "#339933",
    questionCount: 0,
    isActive: true
  }
];

async function seedQuestions() {
  try {
    console.log('🌱 Starting to seed questions...');
    
    // Add categories first
    console.log('📁 Adding categories...');
    for (const category of sampleCategories) {
      const categoryRef = await addDoc(collection(db, 'questionCategories'), {
        ...category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`✅ Added category: ${category.name} (ID: ${categoryRef.id})`);
    }

    // Add questions
    console.log('❓ Adding questions...');
    for (const question of sampleQuestions) {
      const questionRef = await addDoc(collection(db, 'questions'), {
        ...question,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`✅ Added question: ${question.question.substring(0, 50)}... (ID: ${questionRef.id})`);
    }

    console.log('🎉 Successfully seeded all questions and categories!');
    console.log(`📊 Total questions: ${sampleQuestions.length}`);
    console.log(`📁 Total categories: ${sampleCategories.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedQuestions().then(() => {
  console.log('✨ Seeding completed successfully!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Seeding failed:', error);
  process.exit(1);
});
