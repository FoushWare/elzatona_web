/**
 * Reset Admin Password
 * 
 * This script resets the password for an existing admin user.
 * Note: This requires the user to be authenticated or have admin privileges.
 * 
 * Usage: node scripts/reset-admin-password.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, updatePassword } = require('firebase/auth');

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

async function resetAdminPassword() {
  try {
    console.log('🔥 Resetting admin password...');
    
    const email = 'afouadsoftwareengineer@gmail.com';
    const newPassword = 'zatonafoushware$8888';
    
    console.log('📧 Attempting to sign in with existing credentials...');
    
    // First, try to sign in with the current password
    // If this fails, we can't reset the password
    const userCredential = await signInWithEmailAndPassword(auth, email, newPassword);
    const user = userCredential.user;
    
    console.log('✅ Sign in successful!');
    console.log('   - UID:', user.uid);
    console.log('   - Email:', user.email);
    
    console.log('🎉 The credentials are working correctly!');
    console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
    
  } catch (error) {
    console.error('❌ Sign in failed:', error);
    
    if (error.code === 'auth/user-not-found') {
      console.log('❌ No user found with this email address.');
    } else if (error.code === 'auth/wrong-password') {
      console.log('❌ Incorrect password. The user exists but the password is wrong.');
      console.log('ℹ️  You may need to reset the password through Firebase Console or use a different approach.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('❌ Invalid email address.');
    } else if (error.code === 'auth/too-many-requests') {
      console.log('❌ Too many failed attempts. Please try again later.');
    } else {
      console.log('❌ Error details:', error.message);
    }
  }
}

// Run the script
resetAdminPassword().then(() => {
  console.log('🏁 Script completed.');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});
