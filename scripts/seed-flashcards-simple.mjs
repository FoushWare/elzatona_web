import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc
} from 'firebase/firestore';

// Load environment variables manually
import { readFileSync } from 'fs';
import { join } from 'path';

try {
  const envPath = join(process.cwd(), '.env.local');
  const envContent = readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    }
  });
} catch (error) {
  console.log('Could not load .env.local file, using system environment variables');
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? 'Set' : 'Missing',
  authDomain: firebaseConfig.authDomain ? 'Set' : 'Missing',
  projectId: firebaseConfig.projectId ? 'Set' : 'Missing',
  storageBucket: firebaseConfig.storageBucket ? 'Set' : 'Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'Set' : 'Missing',
  appId: firebaseConfig.appId ? 'Set' : 'Missing',
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simple sample flashcards (without timestamps)
const sampleFlashcards = [
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
    question: "What is JSX in React?",
    answer: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript. It gets transpiled to React.createElement() calls and makes component code more readable.",
    category: "React",
    difficulty: "beginner",
    tags: ["jsx", "syntax", "components"]
  },
  {
    question: "What is the CSS Box Model?",
    answer: "The CSS Box Model consists of content, padding, border, and margin. It defines how elements are sized and spaced, with the total width/height including all these components.",
    category: "CSS",
    difficulty: "beginner",
    tags: ["box-model", "layout", "spacing"]
  },
  {
    question: "What is semantic HTML?",
    answer: "Semantic HTML uses elements that clearly describe their meaning in a human- and machine-readable way. Examples include `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.",
    category: "HTML",
    difficulty: "beginner",
    tags: ["semantic", "accessibility", "seo"]
  }
];

async function seedFlashcards() {
  try {
    console.log('🌱 Starting to seed flashcards (simple version)...');
    
    const flashcardsRef = collection(db, 'flashcards');
    let successCount = 0;
    let errorCount = 0;

    for (const flashcard of sampleFlashcards) {
      try {
        console.log(`Attempting to add: ${flashcard.question.substring(0, 30)}...`);
        
        const docRef = await addDoc(flashcardsRef, flashcard);
        successCount++;
        console.log(`✅ Added flashcard with ID: ${docRef.id}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding flashcard:`, error.message);
        console.error('Full error:', error);
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
