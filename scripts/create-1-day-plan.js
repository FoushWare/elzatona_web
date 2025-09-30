const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, Timestamp } = require('firebase/firestore');

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

async function create1DayPlan() {
  try {
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    const oneDayPlan = {
      id: '1-day-plan',
      name: '1 Day Plan',
      duration: 1,
      description: "Intensive preparation for tomorrow's interview",
      difficulty: 'Beginner',
      totalQuestions: 100,
      dailyQuestions: 100,
      sections: [
        { id: 'html-css', name: 'HTML & CSS', questions: [], weight: 40 },
        { id: 'javascript', name: 'JavaScript', questions: [], weight: 40 },
        { id: 'react', name: 'React', questions: [], weight: 20 },
      ],
      features: ['Quick review', 'Essential concepts', 'Common questions'],
      estimatedTime: '2-3 hours',
      isRecommended: false,
      isActive: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    console.log('📋 Creating 1-day plan...');
    await setDoc(doc(db, 'learningPlanTemplates', '1-day-plan'), oneDayPlan);
    console.log('✅ Successfully created 1-day plan!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

create1DayPlan();

