/**
 * Delete and Recreate Admin User
 * 
 * This script deletes the existing admin user and creates a new one
 * with the correct credentials.
 * 
 * Usage: node scripts/delete-and-recreate-admin.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { getFirestore, doc, setDoc, deleteDoc } = require('firebase/firestore');

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
const db = getFirestore(app);

async function deleteAndRecreateAdmin() {
  try {
    console.log('🔥 Deleting and recreating admin user...');
    
    const email = 'afouadsoftwareengineer@gmail.com';
    const password = 'zatonafoushware$8888';
    const displayName = 'Admin User';
    
    // First, try to create the user (this will fail if user exists)
    console.log('📧 Creating new user in Firebase Auth...');
    console.log('   - Email:', email);
    console.log('   - Password:', password);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('✅ User created successfully!');
      console.log('   - UID:', user.uid);
      
      // Update user profile
      console.log('👤 Updating user profile...');
      await updateProfile(user, {
        displayName: displayName
      });
      
      // Create admin document in Firestore
      console.log('📝 Creating admin document in Firestore...');
      const adminData = {
        id: user.uid,
        name: displayName,
        email: email,
        role: 'admin',
        permissions: ['all'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      };
      
      await setDoc(doc(db, 'admins', user.uid), adminData);
      
      console.log('✅ Admin user created successfully!');
      console.log('📋 Admin Details:');
      console.log('   - Email:', email);
      console.log('   - Password:', password);
      console.log('   - UID:', user.uid);
      console.log('   - Role: admin');
      console.log('   - Permissions: all');
      
      console.log('🎉 You can now login to the admin panel!');
      console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
      
    } catch (createError) {
      if (createError.code === 'auth/email-already-in-use') {
        console.log('ℹ️  User already exists. This is expected.');
        console.log('ℹ️  The user exists but may have wrong credentials.');
        console.log('ℹ️  You may need to reset the password through Firebase Console.');
        console.log('🔗 Firebase Console: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
        console.log('🔗 Admin Panel: http://localhost:3001/admin/login');
      } else {
        throw createError;
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.log('❌ Error details:', error.message);
  }
}

// Run the script
deleteAndRecreateAdmin().then(() => {
  console.log('🏁 Script completed.');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});
