const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

// Firebase config - using the same config as the app
const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

const testQuestions = [
  {
    title: "What is HTML?",
    content: "Explain what HTML is and its role in web development.",
    difficulty: "Beginner",
    category: "HTML & CSS",
    tags: ["html", "basics", "web-development"],
    type: "conceptual",
    estimatedTime: "2-3 minutes"
  },
  {
    title: "CSS Selectors",
    content: "What are CSS selectors and how do you use them?",
    difficulty: "Beginner",
    category: "HTML & CSS",
    tags: ["css", "selectors", "styling"],
    type: "conceptual",
    estimatedTime: "3-4 minutes"
  },
  {
    title: "JavaScript Variables",
    content: "Explain the difference between var, let, and const in JavaScript.",
    difficulty: "Beginner",
    category: "JavaScript (Core)",
    tags: ["javascript", "variables", "scope"],
    type: "conceptual",
    estimatedTime: "4-5 minutes"
  },
  {
    title: "React Components",
    content: "What are React components and how do you create them?",
    difficulty: "Intermediate",
    category: "React",
    tags: ["react", "components", "jsx"],
    type: "conceptual",
    estimatedTime: "5-6 minutes"
  },
  {
    title: "React Hooks",
    content: "Explain useState and useEffect hooks in React.",
    difficulty: "Intermediate",
    category: "React",
    tags: ["react", "hooks", "state"],
    type: "conceptual",
    estimatedTime: "6-7 minutes"
  },
  {
    title: "JavaScript Promises",
    content: "What are JavaScript promises and how do you handle them?",
    difficulty: "Intermediate",
    category: "JavaScript (Core)",
    tags: ["javascript", "promises", "async"],
    type: "conceptual",
    estimatedTime: "5-6 minutes"
  },
  {
    title: "CSS Flexbox",
    content: "Explain CSS Flexbox and provide examples of its usage.",
    difficulty: "Intermediate",
    category: "HTML & CSS",
    tags: ["css", "flexbox", "layout"],
    type: "conceptual",
    estimatedTime: "4-5 minutes"
  },
  {
    title: "JavaScript Closures",
    content: "What are JavaScript closures and why are they important?",
    difficulty: "Advanced",
    category: "JavaScript (Core)",
    tags: ["javascript", "closures", "scope"],
    type: "conceptual",
    estimatedTime: "7-8 minutes"
  },
  {
    title: "React State Management",
    content: "How do you manage state in React applications?",
    difficulty: "Advanced",
    category: "React",
    tags: ["react", "state", "management"],
    type: "conceptual",
    estimatedTime: "8-10 minutes"
  },
  {
    title: "CSS Grid",
    content: "Explain CSS Grid and how it differs from Flexbox.",
    difficulty: "Intermediate",
    category: "HTML & CSS",
    tags: ["css", "grid", "layout"],
    type: "conceptual",
    estimatedTime: "5-6 minutes"
  }
];

async function addTestQuestions() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('📝 Adding test questions to unified questions collection...');
    
    const questionsRef = collection(db, 'unifiedQuestions');
    
    for (const question of testQuestions) {
      const questionData = {
        ...question,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        isActive: true,
        difficulty: question.difficulty.toLowerCase(),
        category: question.category,
        tags: question.tags || [],
        type: question.type || 'conceptual',
        estimatedTime: question.estimatedTime || '5 minutes'
      };
      
      const docRef = await addDoc(questionsRef, questionData);
      console.log(`✅ Added question: ${question.title} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 Successfully added all test questions!');
    
  } catch (error) {
    console.error('❌ Error adding test questions:', error);
  }
}

addTestQuestions();

