/**
 * Admin User Creation Script
 * 
 * This script should be run by a system administrator to create admin users
 * in Firestore. It does NOT hardcode any credentials and requires manual input.
 * 
 * Usage: node scripts/create-admin-user.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const readline = require('readline');

// Firebase configuration - should match your project
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createAdminUser() {
  try {
    console.log('🔐 Admin User Creation Script');
    console.log('=============================\n');
    
    // Get admin details from user input
    const email = await askQuestion('Enter admin email: ');
    const password = await askQuestion('Enter admin password: ');
    const name = await askQuestion('Enter admin name: ');
    const role = await askQuestion('Enter admin role (admin/super-admin): ');
    
    if (!email || !password || !name || !role) {
      throw new Error('All fields are required');
    }
    
    if (!['admin', 'super-admin'].includes(role)) {
      throw new Error('Role must be either "admin" or "super-admin"');
    }
    
    console.log('\n⏳ Creating admin user...');
    
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ User created successfully:', user.uid);
    
    // Update user profile
    await updateProfile(user, {
      displayName: name
    });
    
    console.log('✅ User profile updated successfully');
    
    // Create admin document in Firestore
    const adminData = {
      name: name,
      email: email,
      role: role,
      createdAt: new Date(),
      createdBy: 'system', // You can track who created this admin
      isActive: true
    };
    
    await setDoc(doc(db, 'admins', user.uid), adminData);
    
    console.log('✅ Admin document created in Firestore');
    
    console.log('\n🎉 Admin user created successfully!');
    console.log('=====================================');
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Role:', role);
    console.log('UID:', user.uid);
    console.log('\nThe admin can now login at: http://localhost:3001/admin/login');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n💡 This email is already registered. The user can login directly.');
    } else if (error.code === 'auth/weak-password') {
      console.log('\n💡 Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('\n💡 Invalid email format. Please check the email address.');
    }
  } finally {
    rl.close();
  }
}

// Check if Firebase config is properly set
if (firebaseConfig.apiKey === "your-api-key") {
  console.log('❌ Please set your Firebase configuration in environment variables or update the script.');
  console.log('Required environment variables:');
  console.log('- FIREBASE_API_KEY');
  console.log('- FIREBASE_AUTH_DOMAIN');
  console.log('- FIREBASE_PROJECT_ID');
  console.log('- FIREBASE_STORAGE_BUCKET');
  console.log('- FIREBASE_MESSAGING_SENDER_ID');
  console.log('- FIREBASE_APP_ID');
  process.exit(1);
}

createAdminUser();
