/**
 * Password Reset Guide Script
 * 
 * This script provides step-by-step instructions to reset your password
 * in Firebase Console and then create the admin role.
 * 
 * Usage: node tools/scripts/reset-password-guide.js
 */

const readline = require('readline');

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

async function resetPasswordGuide() {
  console.log('🔥 Password Reset Guide for Admin User\n');
  
  const email = 'afouadsoftwareengineer@gmail.com';
  const password = 'zatonafoushware$8888';

  console.log('📧 Email: afouadsoftwareengineer@gmail.com');
  console.log('🔑 Desired Password: zatonafoushware$8888\n');

  console.log('🔧 STEP 1: Reset Password in Firebase Console');
  console.log('1. Go to: https://console.firebase.google.com/project/fir-demo-project-adffb/authentication/users');
  console.log('2. Find the user: afouadsoftwareengineer@gmail.com');
  console.log('3. Click on the user to open their details');
  console.log('4. Click "Reset password" or "Edit" button');
  console.log('5. Set the new password to: zatonafoushware$8888');
  console.log('6. Save the changes\n');

  console.log('⏳ After resetting the password, press Enter to continue...');
  await askQuestion('Press Enter after resetting the password...');

  console.log('\n🔧 STEP 2: Testing Login and Creating Admin Role');
  
  // Import Firebase modules
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

  try {
    // Test login
    console.log('Testing login with new password...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Login successful!');
    console.log(`   User ID: ${user.uid}`);
    console.log(`   Email: ${user.email}`);

    // Create admin document
    console.log('\nCreating admin role in Firestore...');
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
      console.log('\n💡 The password might not have been reset yet.');
      console.log('   Please make sure you:');
      console.log('   1. Reset the password in Firebase Console');
      console.log('   2. Wait a few minutes for changes to propagate');
      console.log('   3. Run this script again');
    } else if (error.code === 'auth/user-not-found') {
      console.log('\n💡 User not found. Please check the email address.');
    } else if (error.code === 'auth/network-request-failed') {
      console.log('\n💡 Network error. Please check your internet connection.');
    } else {
      console.log('\n💡 Please check your internet connection and try again.');
    }
  } finally {
    rl.close();
  }
}

resetPasswordGuide();
