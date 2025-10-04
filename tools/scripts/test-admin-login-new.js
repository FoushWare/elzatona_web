const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function testAdminLogin() {
  console.log('🔥 Testing admin login with new credentials...');
  
  const email = 'admin@elzatona.com';
  const password = 'admin123456';

  try {
    console.log('📧 Attempting login...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Login successful!');
    console.log(`📧 User ID: ${userCredential.user.uid}`);
    console.log(`📧 Email: ${userCredential.user.email}`);

    // Check admin role in Firestore
    console.log('📝 Checking admin role in Firestore...');
    const adminDocRef = doc(db, 'admins', userCredential.user.uid);
    const adminDoc = await getDoc(adminDocRef);
    
    if (adminDoc.exists()) {
      const adminData = adminDoc.data();
      console.log('✅ Admin role found in Firestore:');
      console.log(`   - Role: ${adminData.role}`);
      console.log(`   - Permissions: ${adminData.permissions}`);
      console.log(`   - Active: ${adminData.isActive}`);
    } else {
      console.log('❌ Admin role not found in Firestore');
    }

    console.log(`\n🎉 Admin login test successful!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`🔗 Admin Panel: http://localhost:3001/admin/login`);

  } catch (error) {
    console.error('❌ Login failed:', error.message);
    if (error.code === 'auth/user-not-found') {
      console.log('❌ User not found');
    } else if (error.code === 'auth/wrong-password') {
      console.log('❌ Wrong password');
    } else if (error.code === 'auth/invalid-email') {
      console.log('❌ Invalid email');
    } else if (error.code === 'auth/network-request-failed') {
      console.log('❌ Network error - check your internet connection');
    }
  }
}

testAdminLogin();
