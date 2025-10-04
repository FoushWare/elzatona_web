/**
 * First Admin Setup Script
 * 
 * This script helps you create your first admin user for the Elzatona Web application.
 * It uses the Firebase configuration from your project.
 * 
 * Usage: node scripts/setup-first-admin.js
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const readline = require('readline');

// Import Firebase config from your project
const firebaseConfig = require('../libs/data/firebase/src/firebase-config.js').default;

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

async function createFirstAdmin() {
  try {
    console.log('🚀 Elzatona Web - First Admin Setup');
    console.log('====================================\n');
    
    console.log('This script will help you create your first admin user.');
    console.log('Make sure you have Firebase Authentication enabled in your Firebase Console.\n');
    
    // Get admin details from user input
    const email = await askQuestion('Enter admin email: ');
    const password = await askQuestion('Enter admin password (min 6 characters): ');
    const name = await askQuestion('Enter admin name: ');
    
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
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
      role: 'super-admin', // First admin is always super-admin
      createdAt: new Date(),
      createdBy: 'system',
      isActive: true
    };
    
    await setDoc(doc(db, 'admins', user.uid), adminData);
    
    console.log('✅ Admin document created in Firestore');
    
    console.log('\n🎉 First admin user created successfully!');
    console.log('==========================================');
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Role: super-admin');
    console.log('UID:', user.uid);
    console.log('\nYou can now login at: http://localhost:3001/admin/login');
    console.log('\nNext steps:');
    console.log('1. Start your admin server: npx nx serve admin');
    console.log('2. Start your web server: npm run dev');
    console.log('3. Login to admin panel with the credentials above');
    console.log('4. Create learning cards and manage your content');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n💡 This email is already registered.');
      console.log('You can either:');
      console.log('1. Use a different email address');
      console.log('2. Reset the password in Firebase Console');
      console.log('3. Login directly if you know the password');
    } else if (error.code === 'auth/weak-password') {
      console.log('\n💡 Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('\n💡 Invalid email format. Please check the email address.');
    } else if (error.code === 'auth/operation-not-allowed') {
      console.log('\n💡 Email/password authentication is not enabled.');
      console.log('Please enable it in Firebase Console:');
      console.log('1. Go to Authentication > Sign-in method');
      console.log('2. Enable Email/Password provider');
    }
  } finally {
    rl.close();
  }
}

createFirstAdmin();
