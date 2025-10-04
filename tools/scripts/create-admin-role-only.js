/**
 * Create Admin Role Only Script
 * 
 * This script creates the admin role for your existing user.
 * Run this after you've reset the password in Firebase Console.
 * 
 * Usage: node tools/scripts/create-admin-role-only.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

// Firebase configuration
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

async function createAdminRoleOnly() {
  console.log('🔥 Creating admin role for your user...\n');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';

  try {
    console.log('📧 Testing login with your credentials...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Login successful!');
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Create admin document
    console.log('\n📝 Creating admin role in Firestore...');
    const adminDocRef = doc(db, 'admins', user.uid);
    
    const adminData = {
      id: user.uid,
      email: user.email,
      name: user.displayName || 'Admin User',
      role: 'admin',
      permissions: ['all'],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(adminDocRef, adminData);
    console.log('✅ Admin role created in Firestore');

    // Verify setup
    const adminDoc = await getDoc(adminDocRef);
    if (adminDoc.exists()) {
      const adminData = adminDoc.data();
      console.log('\n🎉 Admin setup complete!');
      console.log('📊 Admin Details:');
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Role: ${adminData.role}`);
      console.log(`   Permissions: ${adminData.permissions.join(', ')}`);
      console.log(`   Active: ${adminData.isActive}`);
      
      console.log('\n🔗 Admin Panel: http://localhost:3001/admin/login');
      console.log('📧 Email: afouadsoftwareengineer@gmail.com');
      console.log('🔑 Password: zatonafoushware$8888');
      
      console.log('\n✅ You can now log in to the admin panel!');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.code === 'auth/invalid-credential') {
      console.log('\n💡 Invalid credentials. Please make sure you:');
      console.log('   1. Reset the password in Firebase Console');
      console.log('   2. Used the correct password: zatonafoushware$8888');
      console.log('   3. Wait a few minutes for changes to propagate');
    } else if (error.code === 'auth/user-not-found') {
      console.log('\n💡 User not found. Please check the email address.');
    } else {
      console.log('\n💡 Please check your internet connection and try again.');
    }
  }
}

createAdminRoleOnly();
