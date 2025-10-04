/**
 * Test Admin Login
 * 
 * This script tests the admin login functionality with the provided credentials.
 * 
 * Usage: node scripts/test-admin-login.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Firebase configuration - using the same config as the project
const firebaseConfig = {
  apiKey: "AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y",
  authDomain: "fir-demo-project-adffb.firebaseapp.com",
  projectId: "fir-demo-project-adffb",
  storageBucket: "fir-demo-project-adffb.firebasestorage.app",
  messagingSenderId: "76366138630",
  appId: "1:76366138630:web:0f3381c2f5a62e0401e287",
  measurementId: "G-XZ5VKFGG4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testAdminLogin() {
  try {
    console.log('🔥 Testing admin login...');
    
    const email = 'afouadsoftwareengineer@gmail.com';
    const password = 'zatonafoushware$8888';
    
    console.log('📧 Attempting login with:', email);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Login successful!');
    console.log('📋 User Details:');
    console.log('   - UID:', user.uid);
    console.log('   - Email:', user.email);
    console.log('   - Display Name:', user.displayName);
    console.log('   - Email Verified:', user.emailVerified);
    
    console.log('🎉 Admin login test passed!');
    console.log('ℹ️  You can now login to the admin panel at http://localhost:3001/admin/login');
    
  } catch (error) {
    console.error('❌ Login failed:', error);
    
    if (error.code === 'auth/user-not-found') {
      console.log('❌ No user found with this email address.');
    } else if (error.code === 'auth/wrong-password') {
      console.log('❌ Incorrect password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('❌ Invalid email address.');
    } else if (error.code === 'auth/too-many-requests') {
      console.log('❌ Too many failed attempts. Please try again later.');
    } else {
      console.log('❌ Error details:', error.message);
    }
  }
}

// Run the test
testAdminLogin().then(() => {
  console.log('🏁 Test completed.');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Test failed:', error);
  process.exit(1);
});
