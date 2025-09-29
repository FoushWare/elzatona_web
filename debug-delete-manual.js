const { initializeApp } = require('firebase/app');
const { getFirestore, doc, deleteDoc, getDoc } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBvOkBwJ1B5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function manualDelete() {
  try {
    console.log('🔍 Checking if document exists...');
    const planRef = doc(db, 'learningPlanTemplates', 'api-integration');
    const docSnap = await getDoc(planRef);
    
    if (docSnap.exists()) {
      console.log('✅ Document exists, attempting to delete...');
      console.log('Document data:', docSnap.data());
      
      await deleteDoc(planRef);
      console.log('✅ Document deleted successfully');
      
      // Check if it's really gone
      const checkSnap = await getDoc(planRef);
      if (checkSnap.exists()) {
        console.log('❌ Document still exists after deletion!');
      } else {
        console.log('✅ Document confirmed deleted');
      }
    } else {
      console.log('❌ Document does not exist');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

manualDelete();

