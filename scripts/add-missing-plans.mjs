import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore';

// Firebase config (using the same as in the app)
const firebaseConfig = {
  apiKey: "AIzaSyBvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQvQ",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const missingPlans = [
  {
    id: '4-day-plan',
    name: '4 Day Plan',
    duration: 4,
    description: 'Extended preparation with advanced topics',
    difficulty: 'Intermediate',
    totalQuestions: 250,
    dailyQuestions: 63,
    sections: [
      { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 20 },
      { id: 'javascript', name: 'JavaScript', questions: [], weight: 35 },
      { id: 'react', name: 'React', questions: [], weight: 25 },
      { id: 'typescript', name: 'TypeScript', questions: [], weight: 20 }
    ],
    features: [
      'Advanced concepts',
      'Daily practice',
      'TypeScript mastery',
      'React patterns'
    ],
    estimatedTime: '5-6 hours',
    isRecommended: true,
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    id: '5-day-plan',
    name: '5 Day Plan',
    duration: 5,
    description: 'Comprehensive preparation with full coverage',
    difficulty: 'Intermediate',
    totalQuestions: 300,
    dailyQuestions: 60,
    sections: [
      { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 15 },
      { id: 'javascript', name: 'JavaScript', questions: [], weight: 35 },
      { id: 'react', name: 'React', questions: [], weight: 25 },
      { id: 'typescript', name: 'TypeScript', questions: [], weight: 15 },
      { id: 'testing', name: 'Testing', questions: [], weight: 10 }
    ],
    features: [
      'Complete coverage',
      'Testing fundamentals',
      'Advanced patterns',
      'Performance optimization'
    ],
    estimatedTime: '6-7 hours',
    isRecommended: true,
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    id: '6-day-plan',
    name: '6 Day Plan',
    duration: 6,
    description: 'Master-level preparation with expert topics',
    difficulty: 'Advanced',
    totalQuestions: 350,
    dailyQuestions: 58,
    sections: [
      { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 15 },
      { id: 'javascript', name: 'JavaScript', questions: [], weight: 30 },
      { id: 'react', name: 'React', questions: [], weight: 25 },
      { id: 'typescript', name: 'TypeScript', questions: [], weight: 15 },
      { id: 'testing', name: 'Testing', questions: [], weight: 10 },
      { id: 'performance', name: 'Performance', questions: [], weight: 5 }
    ],
    features: [
      'Expert-level topics',
      'Performance mastery',
      'Advanced testing',
      'System design basics'
    ],
    estimatedTime: '7-8 hours',
    isRecommended: true,
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }
];

async function createMissingPlans() {
  try {
    console.log('Creating missing learning plans...');
    
    for (const plan of missingPlans) {
      await setDoc(doc(db, 'learningPlanTemplates', plan.id), plan);
      console.log(`✅ Created ${plan.name}`);
    }
    
    console.log('🎉 All missing plans created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating plans:', error);
    process.exit(1);
  }
}

createMissingPlans();
