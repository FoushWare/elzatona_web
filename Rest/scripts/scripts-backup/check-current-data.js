// Quick script to check current data in Firebase
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
} = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkCurrentData() {
  console.log('🔍 Checking current data in Firebase...\n');

  const collections = [
    'frontendTasks',
    'problemSolvingTasks',
    'questions',
    'categories',
    'topics',
    'learningCards',
    'learningPlans',
  ];

  for (const collectionName of collections) {
    try {
      const snapshot = await getDocs(
        query(collection(db, collectionName), limit(5))
      );
      console.log(
        `📊 ${collectionName}: ${snapshot.size} documents (showing first 5)`
      );

      if (snapshot.size > 0) {
        snapshot.docs.forEach((doc, index) => {
          const data = doc.data();
          console.log(
            `   ${index + 1}. ${data.title || data.name || data.id || 'Untitled'}`
          );
        });
      }
      console.log('');
    } catch (error) {
      console.log(`❌ Error checking ${collectionName}: ${error.message}`);
    }
  }
}

checkCurrentData().catch(console.error);
