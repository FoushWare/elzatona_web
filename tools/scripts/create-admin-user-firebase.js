/**
 * Create Admin User in Firebase
 * 
 * This script creates an admin user in Firebase Authentication and Firestore
 * with the provided credentials.
 * 
 * Usage: node scripts/create-admin-user-firebase.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
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
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdminUser() {
  try {
    console.log('🔥 Creating admin user in Firebase...');
    
    const email = 'afouadsoftwareengineer@gmail.com';
    const password = 'zatonafoushware$8888';
    const displayName = 'Admin User';
    
    // Create user in Firebase Authentication
    console.log('📧 Creating user in Firebase Auth...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ User created successfully:', user.uid);
    
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
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️  User already exists. You can try logging in with the provided credentials.');
    } else if (error.code === 'auth/weak-password') {
      console.log('❌ Password is too weak. Please use a stronger password.');
    } else {
      console.log('❌ Error details:', error.message);
    }
  }
}

// Run the script
createAdminUser().then(() => {
  console.log('🏁 Script completed.');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});