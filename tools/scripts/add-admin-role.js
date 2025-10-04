/**
 * Add Admin Role to Existing User
 * 
 * This script adds admin role to an existing Firebase user in Firestore.
 * 
 * Usage: node scripts/add-admin-role.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

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
const db = getFirestore(app);

async function addAdminRole() {
  try {
    console.log('🔥 Adding admin role to existing user...');
    
    // We need to get the user's UID from Firebase Auth
    // Since we can't authenticate in this script, we'll use a placeholder UID
    // The actual UID will be set when the user logs in
    const email = 'afouadsoftwareengineer@gmail.com';
    const displayName = 'Admin User';
    
    // For now, let's create a document with a placeholder UID
    // The actual UID will be set when the user logs in for the first time
    const placeholderUid = 'admin-user-placeholder';
    
    console.log('📝 Creating admin document in Firestore...');
    const adminData = {
      id: placeholderUid,
      name: displayName,
      email: email,
      role: 'admin',
      permissions: ['all'],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      note: 'This is a placeholder. The actual UID will be set when the user logs in.'
    };
    
    await setDoc(doc(db, 'admins', placeholderUid), adminData);
    
    console.log('✅ Admin role added successfully!');
    console.log('📋 Admin Details:');
    console.log('   - Email:', email);
    console.log('   - Role: admin');
    console.log('   - Permissions: all');
    console.log('   - Note: This is a placeholder document');
    
    console.log('🎉 You can now try logging in to the admin panel!');
    console.log('ℹ️  If login still fails, the user UID needs to be updated in Firestore.');
    
  } catch (error) {
    console.error('❌ Error adding admin role:', error);
    console.log('❌ Error details:', error.message);
  }
}

// Run the script
addAdminRole().then(() => {
  console.log('🏁 Script completed.');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});
